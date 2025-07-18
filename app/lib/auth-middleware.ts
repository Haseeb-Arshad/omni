import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getUserSession, getCurrentUser, refreshAuthToken, commitSession, getSession } from "./auth";
import type { User } from "./auth";

export interface AuthenticatedRequest {
  user: User;
  session: {
    userId: string;
    token: string;
    refreshToken: string;
    expiresAt: number;
  };
}

// Middleware to require authentication for loaders
export async function requireAuthLoader(
  { request }: LoaderFunctionArgs,
  redirectTo?: string
): Promise<AuthenticatedRequest> {
  const userSession = await getUserSession(request);
  
  if (!userSession) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams([
      ["redirectTo", redirectTo || url.pathname + url.search],
    ]);
    throw redirect(`/auth/login?${searchParams}`);
  }

  // Check if token is expired and try to refresh
  if (Date.now() > userSession.expiresAt - 60000) { // Refresh 1 minute before expiry
    const refreshResult = await refreshAuthToken(userSession.refreshToken);
    
    if (refreshResult) {
      // Update session with new tokens
      const session = await getSession(request);
      session.set("token", refreshResult.token);
      session.set("refreshToken", refreshResult.refreshToken);
      session.set("expiresAt", refreshResult.expiresAt);
      
      // Update userSession object
      userSession.token = refreshResult.token;
      userSession.refreshToken = refreshResult.refreshToken;
      userSession.expiresAt = refreshResult.expiresAt;
      
      // Note: In a real app, you'd want to set the updated cookie in the response
      // This is a simplified version for demonstration
    } else {
      // Refresh failed, redirect to login
      throw redirect("/auth/login");
    }
  }

  const user = await getCurrentUser(userSession.token);
  
  if (!user) {
    throw redirect("/auth/login");
  }

  return {
    user,
    session: userSession,
  };
}

// Middleware to require authentication for actions
export async function requireAuthAction(
  { request }: ActionFunctionArgs,
  redirectTo?: string
): Promise<AuthenticatedRequest> {
  return requireAuthLoader({ request } as LoaderFunctionArgs, redirectTo);
}

// Middleware to require specific permissions
export async function requirePermission(
  request: Request,
  permission: string,
  redirectTo?: string
): Promise<AuthenticatedRequest> {
  const authRequest = await requireAuthLoader({ request } as LoaderFunctionArgs, redirectTo);
  
  const rolePermissions = {
    admin: ['read', 'write', 'delete', 'manage_users', 'manage_settings'],
    user: ['read', 'write'],
    viewer: ['read'],
  };
  
  const userPermissions = rolePermissions[authRequest.user.role] || [];
  
  if (!userPermissions.includes(permission)) {
    throw new Response("Forbidden", { status: 403 });
  }
  
  return authRequest;
}

// Middleware to require admin role
export async function requireAdmin(
  request: Request,
  redirectTo?: string
): Promise<AuthenticatedRequest> {
  const authRequest = await requireAuthLoader({ request } as LoaderFunctionArgs, redirectTo);
  
  if (authRequest.user.role !== 'admin') {
    throw new Response("Forbidden - Admin access required", { status: 403 });
  }
  
  return authRequest;
}

// Optional authentication middleware (doesn't redirect if not authenticated)
export async function optionalAuth(request: Request): Promise<AuthenticatedRequest | null> {
  try {
    return await requireAuthLoader({ request } as LoaderFunctionArgs);
  } catch (error) {
    // If it's a redirect (authentication required), return null instead
    if (error instanceof Response && error.status === 302) {
      return null;
    }
    throw error;
  }
}

// Utility to check if user is authenticated without throwing
export async function isAuthenticated(request: Request): Promise<boolean> {
  try {
    await requireAuthLoader({ request } as LoaderFunctionArgs);
    return true;
  } catch {
    return false;
  }
}

// Utility to get current user if authenticated
export async function getCurrentUserIfAuthenticated(request: Request): Promise<User | null> {
  try {
    const authRequest = await requireAuthLoader({ request } as LoaderFunctionArgs);
    return authRequest.user;
  } catch {
    return null;
  }
}

// Higher-order function to wrap loaders with authentication
export function withAuth<T extends LoaderFunctionArgs | ActionFunctionArgs>(
  handler: (args: T & { auth: AuthenticatedRequest }) => Promise<Response>
) {
  return async (args: T): Promise<Response> => {
    const auth = await requireAuthLoader(args as LoaderFunctionArgs);
    return handler({ ...args, auth });
  };
}

// Higher-order function to wrap loaders with permission checking
export function withPermission<T extends LoaderFunctionArgs | ActionFunctionArgs>(
  permission: string,
  handler: (args: T & { auth: AuthenticatedRequest }) => Promise<Response>
) {
  return async (args: T): Promise<Response> => {
    const auth = await requirePermission(args.request, permission);
    return handler({ ...args, auth });
  };
}

// Higher-order function to wrap loaders with admin requirement
export function withAdmin<T extends LoaderFunctionArgs | ActionFunctionArgs>(
  handler: (args: T & { auth: AuthenticatedRequest }) => Promise<Response>
) {
  return async (args: T): Promise<Response> => {
    const auth = await requireAdmin(args.request);
    return handler({ ...args, auth });
  };
}