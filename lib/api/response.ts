/**
 * Standardized JSON responses for route handlers.
 * Keeps error shapes consistent and avoids leaking internals to clients.
 */

import { logger } from "./logger";

type Json = Record<string, unknown>;

const securityHeaders = {
  "Content-Type": "application/json",
  "X-Content-Type-Options": "nosniff",
  "Cache-Control": "no-store",
};

export function ok(data: Json = {}, status = 200) {
  return new Response(JSON.stringify({ ok: true, ...data }), {
    status,
    headers: securityHeaders,
  });
}

export function fail(message: string, status = 400, extra?: Json) {
  return new Response(JSON.stringify({ ok: false, error: message, ...extra }), {
    status,
    headers: securityHeaders,
  });
}

export function tooMany(retryAfterSeconds: number) {
  return new Response(
    JSON.stringify({ ok: false, error: "Too many requests. Please slow down." }),
    {
      status: 429,
      headers: { ...securityHeaders, "Retry-After": String(retryAfterSeconds) },
    },
  );
}

/** Wrap a handler so unexpected throws become a safe 500 (and are logged). */
export function withErrorHandling(
  handler: (req: Request) => Promise<Response>,
) {
  return async (req: Request): Promise<Response> => {
    try {
      return await handler(req);
    } catch (err) {
      logger.error("Unhandled route error", {
        route: new URL(req.url).pathname,
        error: err instanceof Error ? err.message : String(err),
      });
      return fail("Something went wrong. Please try again.", 500);
    }
  };
}
