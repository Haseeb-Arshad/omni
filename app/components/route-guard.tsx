import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { useAuth, usePermissions } from "~/lib/auth-context";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, Loader2 } from "lucide-react";

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredPermission?: string;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function RouteGuard({
  children,
  requireAuth = true,
  requiredPermission,
  fallback,
  redirectTo = "/auth/login",
}: RouteGuardProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { hasPermission } = usePermissions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && requireAuth && !isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, isLoading, requireAuth, navigate, redirectTo]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 text-center"
        >
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-charcoal-300">Authenticating...</p>
        </motion.div>
      </div>
    );
  }

  // Check authentication requirement
  if (requireAuth && !isAuthenticated) {
    return fallback || (
      <div className="min-h-screen bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 text-center max-w-md"
        >
          <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Authentication Required
          </h2>
          <p className="text-charcoal-300 mb-6">
            You need to be logged in to access this page.
          </p>
          <button
            onClick={() => navigate(redirectTo)}
            className="glass-button text-white font-medium w-full"
          >
            Go to Login
          </button>
        </motion.div>
      </div>
    );
  }

  // Check permission requirement
  if (requiredPermission && user && !hasPermission(requiredPermission)) {
    return fallback || (
      <div className="min-h-screen bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 text-center max-w-md"
        >
          <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Access Denied
          </h2>
          <p className="text-charcoal-300 mb-6">
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="glass-button text-white font-medium w-full"
          >
            Go to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}

// Higher-order component for protecting routes
export function withRouteGuard<P extends object>(
  Component: React.ComponentType<P>,
  guardOptions?: Omit<RouteGuardProps, 'children'>
) {
  return function GuardedComponent(props: P) {
    return (
      <RouteGuard {...guardOptions}>
        <Component {...props} />
      </RouteGuard>
    );
  };
}

// Hook for conditional rendering based on permissions
export function useConditionalRender() {
  const { isAuthenticated } = useAuth();
  const { hasPermission } = usePermissions();

  const renderIfAuthenticated = (component: React.ReactNode) => {
    return isAuthenticated ? component : null;
  };

  const renderIfPermission = (permission: string, component: React.ReactNode) => {
    return hasPermission(permission) ? component : null;
  };

  const renderIfRole = (role: string, component: React.ReactNode) => {
    return hasPermission(role) ? component : null;
  };

  return {
    renderIfAuthenticated,
    renderIfPermission,
    renderIfRole,
  };
}