import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUserIfAuthenticated } from "~/lib/auth-middleware";
import { AuthProvider } from "~/lib/auth-context";

import "./tailwind.css";

// Theme Context
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Performance monitoring
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// Loader to provide global authentication state
export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getCurrentUserIfAuthenticated(request);
  return json({ user });
}

export const meta: MetaFunction = () => [
  { title: "Omni Dashboard" },
  { name: "description", content: "Modern AI-powered dashboard for conversation management" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
  { name: "theme-color", content: "#1a1a1a" },
  { property: "og:title", content: "Omni Dashboard" },
  { property: "og:description", content: "Modern AI-powered dashboard for conversation management" },
  { property: "og:type", content: "website" },
];

// Theme Provider Component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Get theme from localStorage or default to system
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Resolve system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateResolvedTheme = () => {
      if (theme === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setResolvedTheme(theme);
      }
    };

    updateResolvedTheme();
    mediaQuery.addEventListener('change', updateResolvedTheme);

    return () => mediaQuery.removeEventListener('change', updateResolvedTheme);
  }, [theme]);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolvedTheme);
    
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, resolvedTheme]);

  const handleSetTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Global Error Boundary Component
function GlobalErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {error.status} {error.statusText}
            </h1>
            <p className="text-gray-300 mb-6">
              {error.status === 404 
                ? "The page you're looking for doesn't exist."
                : "Something went wrong. Please try again later."
              }
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors duration-200 backdrop-blur-sm border border-white/20"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Unexpected Error</h1>
          <p className="text-gray-300 mb-6">
            Something went wrong. Our team has been notified.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors duration-200 backdrop-blur-sm border border-white/20"
            >
              Reload Page
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full bg-transparent hover:bg-white/10 text-gray-300 px-6 py-2 rounded-lg transition-colors duration-200 border border-white/10"
            >
              Go Back
            </button>
          </div>
          {process.env.NODE_ENV === 'development' && error instanceof Error && (
            <details className="mt-6 text-left">
              <summary className="text-sm text-gray-400 cursor-pointer">Error Details</summary>
              <pre className="mt-2 text-xs text-red-300 bg-red-900/20 p-3 rounded overflow-auto">
                {error.stack}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* Performance monitoring script */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'GA_MEASUREMENT_ID');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        {/* Development tools */}
        {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Performance monitoring for development
                if (typeof window !== 'undefined') {
                  window.addEventListener('load', () => {
                    if ('performance' in window) {
                      const perfData = performance.getEntriesByType('navigation')[0];
                      console.log('Page Load Performance:', {
                        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                        totalTime: perfData.loadEventEnd - perfData.fetchStart
                      });
                    }
                  });
                }
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}

export default function App() {
  const { user } = useLoaderData<typeof loader>();
  
  return (
    <AuthProvider initialUser={user}>
      <Outlet />
    </AuthProvider>
  );
}

export function ErrorBoundary() {
  return <GlobalErrorBoundary />;
}
