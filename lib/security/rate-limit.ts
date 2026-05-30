/**
 * Lightweight in-memory fixed-window rate limiter.
 *
 * Good enough for a single server instance and for blunting abuse/bots.
 * For multi-instance production scale, swap the store for Upstash Redis
 * (@upstash/ratelimit) — the call sites do not need to change.
 */

type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

// Opportunistic cleanup so the map cannot grow unbounded.
let lastSweep = Date.now();
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, bucket] of store) {
    if (bucket.resetAt <= now) store.delete(key);
  }
}

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  retryAfter: number; // seconds
};

/**
 * @param key      Unique caller key (e.g. `contact:1.2.3.4`).
 * @param limit    Max requests per window.
 * @param windowMs Window length in milliseconds.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = store.get(key);
  if (!bucket || bucket.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, retryAfter: 0 };
  }

  if (bucket.count >= limit) {
    return {
      success: false,
      remaining: 0,
      retryAfter: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { success: true, remaining: limit - bucket.count, retryAfter: 0 };
}

/** Best-effort client IP from proxy headers. */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
