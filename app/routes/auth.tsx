import { Outlet } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Authentication - Omni Dashboard" },
    { name: "description", content: "Sign in to your Omni Dashboard account" },
  ];
};

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}