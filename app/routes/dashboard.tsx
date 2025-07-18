import { Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireAuth, getCurrentUser } from "~/lib/auth";
import { AuthProvider } from "~/lib/auth-context";
import { DashboardLayout } from "~/components/dashboard-layout";
import type { User } from "~/lib/auth";

// Loader - require authentication and load user data
export async function loader({ request }: LoaderFunctionArgs) {
  const userSession = await requireAuth(request);
  const user = await getCurrentUser(userSession.token);
  
  if (!user) {
    // If we can't get user data, the token might be invalid
    throw new Response("Unauthorized", { status: 401 });
  }
  
  return json({ user });
}

export default function DashboardLayoutRoute() {
  const { user } = useLoaderData<typeof loader>();
  
  return (
    <AuthProvider initialUser={user as User}>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AuthProvider>
  );
}