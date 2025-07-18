/**
 * Enhanced server entry point with improved error handling and performance monitoring
 */

import { PassThrough } from "node:stream";

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { reportError, startPerformanceTimer } from "./lib/monitoring";

const ABORT_DELAY = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext: AppLoadContext
) {
  const timer = startPerformanceTimer(`Request: ${request.url}`);
  
  // Add security headers
  responseHeaders.set("X-Frame-Options", "DENY");
  responseHeaders.set("X-Content-Type-Options", "nosniff");
  responseHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
  
  const isBot = isbot(request.headers.get("user-agent") || "");
  
  const handleRequestPromise = isBot
    ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext)
    : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
    
  return handleRequestPromise
    .then((response) => {
      timer.end();
      return response;
    })
    .catch((error) => {
      timer.end();
      reportError(error, { 
        context: `Request handling for ${request.url}`,
        userAgent: request.headers.get("user-agent"),
        method: request.method,
      });
      throw error;
    });
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reportError(error, { 
            context: `Bot request shell error for ${request.url}`,
            userAgent: request.headers.get("user-agent"),
            method: request.method,
          });
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            reportError(error, { 
              context: `Bot request streaming error for ${request.url}`,
              userAgent: request.headers.get("user-agent"),
              method: request.method,
            });
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reportError(error, { 
            context: `Browser request shell error for ${request.url}`,
            userAgent: request.headers.get("user-agent"),
            method: request.method,
          });
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            reportError(error, { 
              context: `Browser request streaming error for ${request.url}`,
              userAgent: request.headers.get("user-agent"),
              method: request.method,
            });
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
