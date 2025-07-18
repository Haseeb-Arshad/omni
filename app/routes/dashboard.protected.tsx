import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle, AlertTriangle } from "lucide-react";
import { requirePermission } from "~/lib/auth-middleware";

// This route requires 'write' permission
export async function loader({ request }: LoaderFunctionArgs) {
  const auth = await requirePermission(request, 'write');
  
  return json({
    user: auth.user,
    message: "You have access to this protected route!",
    requiredPermission: 'write',
  });
}

export default function ProtectedRoute() {
  const { user, message, requiredPermission } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="glass-card p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-green-400" />
            </div>
          </motion.div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Protected Route Access Granted
          </h1>
          
          <p className="text-charcoal-300 text-lg mb-8">
            {message}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass rounded-lg p-4">
              <Lock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Required Permission</h3>
              <p className="text-charcoal-300 text-sm">
                <code className="bg-charcoal-800 px-2 py-1 rounded text-blue-300">
                  {requiredPermission}
                </code>
              </p>
            </div>
            
            <div className="glass rounded-lg p-4">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Your Role</h3>
              <p className="text-charcoal-300 text-sm">
                <code className="bg-charcoal-800 px-2 py-1 rounded text-green-300 capitalize">
                  {user.role}
                </code>
              </p>
            </div>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-green-300 font-medium">Access Granted</p>
                <p className="text-green-400 text-sm">
                  Your role ({user.role}) has the required '{requiredPermission}' permission.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-left space-y-3">
            <h3 className="text-white font-semibold">User Information:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal-300">Name:</span>
                <span className="text-white">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-300">Email:</span>
                <span className="text-white">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-300">Role:</span>
                <span className="text-white capitalize">{user.role}</span>
              </div>
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 mt-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Permission System Demo</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-charcoal-300">Route-level permission checking</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-charcoal-300">Server-side authentication middleware</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-charcoal-300">Role-based access control</span>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <span className="text-charcoal-300">Automatic redirect for unauthorized access</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}