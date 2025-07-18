/**
 * Enhanced client entry point with error handling and performance monitoring
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { reportError, initializeWebVitalsMonitoring, startPerformanceTimer } from "./lib/monitoring";

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  reportError(event.reason, {
    type: 'unhandledrejection',
    url: window.location.href,
  });
});

// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  reportError(event.error, {
    type: 'uncaught_error',
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    url: window.location.href,
  });
});

// Initialize performance monitoring
initializeWebVitalsMonitoring();

// Enhanced hydration with error boundary
function hydrateApp() {
  const hydrationTimer = startPerformanceTimer('Client Hydration');
  
  try {
    startTransition(() => {
      hydrateRoot(
        document,
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
      );
      
      // End timing after hydration completes
      setTimeout(() => {
        hydrationTimer.end();
      }, 0);
    });
  } catch (error) {
    hydrationTimer.end();
    reportError(error, {
      type: 'hydration_error',
      url: window.location.href,
    });
    
    // Fallback: show a basic error message
    document.body.innerHTML = `
      <div style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        color: white;
        font-family: system-ui, -apple-system, sans-serif;
        text-align: center;
        padding: 20px;
      ">
        <div>
          <h1 style="font-size: 24px; margin-bottom: 16px;">Application Error</h1>
          <p style="margin-bottom: 20px; opacity: 0.8;">
            The application failed to load. Please refresh the page.
          </p>
          <button 
            onclick="window.location.reload()" 
            style="
              background: rgba(255, 255, 255, 0.1);
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: white;
              padding: 12px 24px;
              border-radius: 8px;
              cursor: pointer;
              font-size: 16px;
            "
          >
            Reload Page
          </button>
        </div>
      </div>
    `;
  }
}

// Initialize the app
hydrateApp();
