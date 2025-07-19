import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  // For now, return an empty service worker script
  // In the future, you can implement actual service worker functionality
  const swContent = `
// Empty service worker
// This file exists to prevent 404 errors when browsers request /sw.js
console.log('Service worker loaded');

// Basic installation
self.addEventListener('install', function(event) {
  console.log('Service worker installed');
  self.skipWaiting();
});

// Basic activation
self.addEventListener('activate', function(event) {
  console.log('Service worker activated');
  return self.clients.claim();
});
  `;

  return new Response(swContent, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "public, max-age=0", // Don't cache service worker
    },
  });
}
