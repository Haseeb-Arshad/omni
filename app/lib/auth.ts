import { redirect } from "@remix-run/node";
import { createCookieSessionStorage } from "@remix-run/node";

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user' | 'viewer';
}

export interface AuthSession {
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: number;
}

// Session storage configuration
const sessionSecret = process.env.SESSION_SECRET || "default-secret-key";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === "production",
  },
});

// Session management utilities
export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function commitSession(session: any) {
  return sessionStorage.commitSession(session);
}

export async function destroySession(session: any) {
  return sessionStorage.destroySession(session);
}

// Authentication utilities
export async function createUserSession(
  userId: string,
  token: string,
  refreshToken: string,
  redirectTo: string = "/dashboard"
) {
  const session = await sessionStorage.getSession();
  const expiresAt = Date.now() + (60 * 60 * 24 * 7 * 1000); // 7 days
  
  session.set("userId", userId);
  session.set("token", token);
  session.set("refreshToken", refreshToken);
  session.set("expiresAt", expiresAt);
  
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function getUserSession(request: Request): Promise<AuthSession | null> {
  const session = await getSession(request);
  const userId = session.get("userId");
  const token = session.get("token");
  const refreshToken = session.get("refreshToken");
  const expiresAt = session.get("expiresAt");
  
  if (!userId || !token || !refreshToken || !expiresAt) {
    return null;
  }
  
  // Check if session is expired
  if (Date.now() > expiresAt) {
    return null;
  }
  
  return {
    userId,
    token,
    refreshToken,
    expiresAt,
  };
}

export async function requireAuth(request: Request, redirectTo?: string) {
  const userSession = await getUserSession(request);
  
  if (!userSession) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams([
      ["redirectTo", redirectTo || url.pathname + url.search],
    ]);
    throw redirect(`/auth/login?${searchParams}`);
  }
  
  return userSession;
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/auth/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

// Token refresh utility
export async function refreshAuthToken(refreshToken: string): Promise<{
  token: string;
  refreshToken: string;
  expiresAt: number;
} | null> {
  try {
    // This would typically call your backend API
    const response = await fetch(`${process.env.API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return {
      token: data.token,
      refreshToken: data.refreshToken,
      expiresAt: Date.now() + (data.expiresIn * 1000),
    };
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
}

// User data fetching
export async function getCurrentUser(token: string): Promise<User | null> {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      return null;
    }
    
    return response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

// Login utility
export async function authenticateUser(email: string, password: string): Promise<{
  user: User;
  token: string;
  refreshToken: string;
} | null> {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      return null;
    }
    
    return response.json();
  } catch (error) {
    console.error('Authentication failed:', error);
    return null;
  }
}

// Permission checking utilities
export function hasPermission(user: User, permission: string): boolean {
  const rolePermissions = {
    admin: ['read', 'write', 'delete', 'manage_users', 'manage_settings'],
    user: ['read', 'write'],
    viewer: ['read'],
  };
  
  return rolePermissions[user.role]?.includes(permission) || false;
}

export function requirePermission(user: User, permission: string) {
  if (!hasPermission(user, permission)) {
    throw new Response("Forbidden", { status: 403 });
  }
}