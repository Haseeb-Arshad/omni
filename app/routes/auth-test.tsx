import type { MetaFunction } from "@remix-run/node";
import { AuthTest } from "~/components/auth-test";

export const meta: MetaFunction = () => {
  return [
    { title: "Authentication Test - Omni Dashboard" },
    { name: "description", content: "Test the authentication system functionality" },
  ];
};

export default function AuthTestRoute() {
  return <AuthTest />;
}