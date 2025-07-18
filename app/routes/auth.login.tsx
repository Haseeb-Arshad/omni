import { useState } from "react";
import { Form, Link, useActionData, useNavigation, useSearchParams } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import { authenticateUser, createUserSession, getUserSession } from "~/lib/auth";

// Loader - redirect if already authenticated
export async function loader({ request }: LoaderFunctionArgs) {
  const userSession = await getUserSession(request);
  if (userSession) {
    return redirect("/dashboard");
  }
  return json({});
}

// Action - handle login form submission
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = formData.get("redirectTo") as string || "/dashboard";

  // Validation
  const errors: { email?: string; password?: string; general?: string } = {};

  if (!email || !email.includes("@")) {
    errors.email = "Please enter a valid email address";
  }

  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  // Authenticate user
  try {
    const authResult = await authenticateUser(email, password);
    
    if (!authResult) {
      return json(
        { errors: { general: "Invalid email or password" } },
        { status: 400 }
      );
    }

    // Create session and redirect
    return createUserSession(
      authResult.user.id,
      authResult.token,
      authResult.refreshToken,
      redirectTo
    );
  } catch (error) {
    console.error("Login error:", error);
    return json(
      { errors: { general: "An error occurred. Please try again." } },
      { status: 500 }
    );
  }
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  
  const isSubmitting = navigation.state === "submitting";
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-8"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Lock className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-charcoal-300">Sign in to your account to continue</p>
      </div>

      {actionData?.errors?.general && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-300 text-sm">{actionData.errors.general}</p>
        </motion.div>
      )}

      <Form method="post" className="space-y-6">
        <input type="hidden" name="redirectTo" value={redirectTo} />
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal-200 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal-400" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`glass w-full pl-10 pr-4 py-3 rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 ${
                actionData?.errors?.email ? 'ring-2 ring-red-500/50' : ''
              }`}
              placeholder="Enter your email"
            />
          </div>
          {actionData?.errors?.email && (
            <p className="mt-2 text-sm text-red-400">{actionData.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-charcoal-200 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal-400" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className={`glass w-full pl-10 pr-12 py-3 rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 ${
                actionData?.errors?.password ? 'ring-2 ring-red-500/50' : ''
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 hover:text-charcoal-200 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {actionData?.errors?.password && (
            <p className="mt-2 text-sm text-red-400">{actionData.errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-500 bg-transparent border-charcoal-400 rounded focus:ring-blue-500/50 focus:ring-2"
            />
            <span className="ml-2 text-sm text-charcoal-300">Remember me</span>
          </label>
          <Link
            to="/auth/forgot-password"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </motion.button>
      </Form>

      <div className="mt-8 text-center">
        <p className="text-charcoal-300">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
}