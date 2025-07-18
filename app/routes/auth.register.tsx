import { useState } from "react";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { getUserSession } from "~/lib/auth";

// Loader - redirect if already authenticated
export async function loader({ request }: LoaderFunctionArgs) {
  const userSession = await getUserSession(request);
  if (userSession) {
    return redirect("/dashboard");
  }
  return json({});
}

// Action - handle registration form submission
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validation
  const errors: { 
    name?: string; 
    email?: string; 
    password?: string; 
    confirmPassword?: string;
    general?: string;
  } = {};

  if (!name || name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!email || !email.includes("@")) {
    errors.email = "Please enter a valid email address";
  }

  if (!password || password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  // Register user (this would typically call your backend API)
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return json(
        { errors: { general: errorData.message || "Registration failed" } },
        { status: 400 }
      );
    }

    // Registration successful - redirect to login with success message
    return redirect("/auth/login?message=registration-success");
  } catch (error) {
    console.error("Registration error:", error);
    return json(
      { errors: { general: "An error occurred. Please try again." } },
      { status: 500 }
    );
  }
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  
  const isSubmitting = navigation.state === "submitting";

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
          className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <User className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-charcoal-300">Join us and start managing your conversations</p>
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
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-charcoal-200 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal-400" />
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className={`glass w-full pl-10 pr-4 py-3 rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 ${
                actionData?.errors?.name ? 'ring-2 ring-red-500/50' : ''
              }`}
              placeholder="Enter your full name"
            />
          </div>
          {actionData?.errors?.name && (
            <p className="mt-2 text-sm text-red-400">{actionData.errors.name}</p>
          )}
        </div>

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
              autoComplete="new-password"
              required
              className={`glass w-full pl-10 pr-12 py-3 rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 ${
                actionData?.errors?.password ? 'ring-2 ring-red-500/50' : ''
              }`}
              placeholder="Create a password"
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

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-charcoal-200 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal-400" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              className={`glass w-full pl-10 pr-12 py-3 rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 ${
                actionData?.errors?.confirmPassword ? 'ring-2 ring-red-500/50' : ''
              }`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 hover:text-charcoal-200 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {actionData?.errors?.confirmPassword && (
            <p className="mt-2 text-sm text-red-400">{actionData.errors.confirmPassword}</p>
          )}
        </div>

        <div className="flex items-start">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="w-4 h-4 text-blue-500 bg-transparent border-charcoal-400 rounded focus:ring-blue-500/50 focus:ring-2 mt-1"
          />
          <label htmlFor="terms" className="ml-3 text-sm text-charcoal-300">
            I agree to the{" "}
            <Link to="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
              Privacy Policy
            </Link>
          </label>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Create Account
            </>
          )}
        </motion.button>
      </Form>

      <div className="mt-8 text-center">
        <p className="text-charcoal-300">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}