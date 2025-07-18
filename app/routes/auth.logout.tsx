import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { logout } from "~/lib/auth";

// Handle both GET and POST requests for logout
export async function loader({ request }: LoaderFunctionArgs) {
  return logout(request);
}

export async function action({ request }: ActionFunctionArgs) {
  return logout(request);
}