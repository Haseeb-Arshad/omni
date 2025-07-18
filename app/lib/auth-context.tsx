import { createContext, useContext, useEffect, useState } from "react";
import { useLoaderData, useRevalidator } from "@remix-run/react";
import type { User } from "./auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

export function AuthProvider({ children, initialUser = null }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const revalidator = useRevalidator();

  const isAuthenticated = !!user;

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // The server will handle setting the session cookie and redirecting
        // We just need to revalidate to get the updated user data
        revalidator.revalidate();
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await fetch('/auth/logout', {
        method: 'POST',
      });
      
      setUser(null);
      // Redirect will be handled by the server
      window.location.href = '/auth/login';
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = () => {
    revalidator.revalidate();
  };

  // Update user when loader data changes
  useEffect(() => {
    if (initialUser !== user) {
      setUser(initialUser);
    }
  }, [initialUser, user]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for checking permissions
export function usePermissions() {
  const { user } = useAuth();
  
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    const rolePermissions = {
      admin: ['read', 'write', 'delete', 'manage_users', 'manage_settings'],
      user: ['read', 'write'],
      viewer: ['read'],
    };
    
    return rolePermissions[user.role]?.includes(permission) || false;
  };

  const requirePermission = (permission: string): boolean => {
    const hasAccess = hasPermission(permission);
    if (!hasAccess) {
      throw new Error(`Permission denied: ${permission}`);
    }
    return true;
  };

  return {
    hasPermission,
    requirePermission,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    isViewer: user?.role === 'viewer',
  };
}