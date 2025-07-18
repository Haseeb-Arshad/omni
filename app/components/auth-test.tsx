import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth, usePermissions } from "~/lib/auth-context";
import { 
  Shield, 
  Lock, 
  User, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Eye,
  EyeOff,
  LogIn,
  LogOut
} from "lucide-react";

export function AuthTest() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  const { hasPermission, isAdmin, isUser, isViewer } = usePermissions();
  const [showTestLogin, setShowTestLogin] = useState(false);
  const [testCredentials, setTestCredentials] = useState({
    email: "test@example.com",
    password: "password123"
  });

  const permissions = ['read', 'write', 'delete', 'manage_users', 'manage_settings'];

  const handleTestLogin = async () => {
    const success = await login(testCredentials.email, testCredentials.password);
    if (!success) {
      alert("Login failed - this is expected in demo mode");
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-950 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="glass-card p-6">
          <h1 className="text-3xl font-bold text-white mb-2">Authentication System Test</h1>
          <p className="text-charcoal-300">
            Comprehensive test of the authentication system and route protection
          </p>
        </div>

        {/* Authentication Status */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Authentication Status
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                {isAuthenticated ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400" />
                )}
                <span className="text-white font-medium">
                  {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
                </span>
              </div>
              
              {isLoading && (
                <div className="flex items-center gap-2 text-blue-400">
                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </div>
              )}
            </div>
            
            <div>
              {isAuthenticated && user ? (
                <div className="space-y-2">
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
              ) : (
                <p className="text-charcoal-400">No user data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Role Information */}
        {isAuthenticated && (
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Role Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`glass rounded-lg p-4 ${isAdmin ? 'ring-2 ring-red-400' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-red-400" />
                  <span className="text-white font-medium">Admin</span>
                </div>
                <p className="text-sm text-charcoal-300">
                  {isAdmin ? 'You are an admin' : 'You are not an admin'}
                </p>
              </div>
              
              <div className={`glass rounded-lg p-4 ${isUser ? 'ring-2 ring-blue-400' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">User</span>
                </div>
                <p className="text-sm text-charcoal-300">
                  {isUser ? 'You are a user' : 'You are not a user'}
                </p>
              </div>
              
              <div className={`glass rounded-lg p-4 ${isViewer ? 'ring-2 ring-green-400' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Viewer</span>
                </div>
                <p className="text-sm text-charcoal-300">
                  {isViewer ? 'You are a viewer' : 'You are not a viewer'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Permissions Test */}
        {isAuthenticated && (
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Permission Testing
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {permissions.map((permission) => {
                const hasAccess = hasPermission(permission);
                return (
                  <div
                    key={permission}
                    className={`glass rounded-lg p-4 ${
                      hasAccess ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {hasAccess ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                      <span className="text-white font-medium capitalize">
                        {permission.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-charcoal-300">
                      {hasAccess ? 'Access granted' : 'Access denied'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Authentication Actions */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Authentication Actions</h2>
          
          {!isAuthenticated ? (
            <div className="space-y-4">
              <button
                onClick={() => setShowTestLogin(!showTestLogin)}
                className="glass-button text-white font-medium flex items-center gap-2"
              >
                {showTestLogin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showTestLogin ? 'Hide' : 'Show'} Test Login
              </button>
              
              {showTestLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4 pt-4 border-t border-charcoal-700"
                >
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-300 font-medium">Demo Mode</span>
                    </div>
                    <p className="text-yellow-200 text-sm">
                      This is a demo. The login will fail unless you have a backend API configured.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal-200 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={testCredentials.email}
                        onChange={(e) => setTestCredentials(prev => ({ ...prev, email: e.target.value }))}
                        className="glass w-full px-3 py-2 rounded-lg text-white placeholder-charcoal-400"
                        placeholder="Enter email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-200 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={testCredentials.password}
                        onChange={(e) => setTestCredentials(prev => ({ ...prev, password: e.target.value }))}
                        className="glass w-full px-3 py-2 rounded-lg text-white placeholder-charcoal-400"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={handleTestLogin}
                    disabled={isLoading}
                    className="glass-button text-white font-medium flex items-center gap-2 disabled:opacity-50"
                  >
                    <LogIn className="w-4 h-4" />
                    Test Login
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="glass-button text-white font-medium flex items-center gap-2 hover:bg-red-500/20"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          )}
        </div>

        {/* Route Testing Links */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Route Protection Testing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/dashboard"
              className="glass-button text-white font-medium text-center block"
            >
              Dashboard (Auth Required)
            </a>
            <a
              href="/dashboard/protected"
              className="glass-button text-white font-medium text-center block"
            >
              Protected Route (Write Permission)
            </a>
          </div>
          <p className="text-charcoal-400 text-sm mt-4">
            These links will test route-level authentication and permission checking.
          </p>
        </div>
      </motion.div>
    </div>
  );
}