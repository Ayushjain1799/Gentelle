# Security Overview — Gentelle

This document summarizes the security posture of the Gentelle storefront and
how to harden it further before public launch.

## Secrets & environment

- All secrets are read **server-side only** via `lib/env.server.ts`, which begins
  with `import "server-only"` — importing it from a client bundle fails the build.
- `NEXT_PUBLIC_*` values are the only ones exposed to the browser (site URL,
  WhatsApp/Instagram handles, and the Razorpay **public** key id, which is meant
  to be public).
- `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, and
  `SUPABASE_SERVICE_ROLE_KEY` never reach the client.
- `.env.local` is git-ignored; only `.env.example` (no values) is committed.

## HTTP security headers

Set globally in `next.config.ts` (`headers()`), so they apply to every response
while keeping pages statically rendered:

| Header | Value |
| --- | --- |
| `Content-Security-Policy` | locked to `'self'` + Razorpay origins |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera/mic/geo/topics disabled |
| `Cross-Origin-Opener-Policy` | `same-origin` |

HTTPS is enforced via HSTS + the CSP `upgrade-insecure-requests` directive.

### CSP note & strict upgrade path

The CSP currently allows `'unsafe-inline'` for scripts/styles. This is required
for Next.js's hydration bootstrap and inline style attributes **while keeping
pages statically generated**. React escapes output by default and the only use
of `dangerouslySetInnerHTML` is the JSON-LD block, which is unicode-escaped.

For a stricter, nonce-based CSP (no `'unsafe-inline'`), add a `proxy.ts`
(Next 16's middleware) that generates a per-request nonce — note this forces
**dynamic rendering** on all pages. See
`node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`.

## API security

Every route handler (`app/api/**`) applies:

- **Input validation** with zod schemas (`lib/validation/schemas.ts`); invalid
  payloads return `422` without touching the DB or payment provider.
- **Rate limiting** (`lib/security/rate-limit.ts`) keyed by client IP. Swap the
  in-memory store for Upstash Redis for multi-instance scale.
- **Sanitization** (`lib/security/sanitize.ts`): control-char stripping, length
  caps, email normalization.
- **Bot honeypots** on the contact, waitlist, and newsletter forms.
- **Safe error handling** (`withErrorHandling`) — unexpected throws become a
  generic `500`; internals are logged, never returned to the client.
- `Cache-Control: no-store` + `X-Content-Type-Options: nosniff` on responses.

## Payments (Razorpay)

- Order amounts are **re-priced on the server** from `lib/products.ts`. Client
  prices are never trusted.
- Payment signatures are verified with HMAC-SHA256 using a **timing-safe**
  comparison (`lib/razorpay/server.ts`).
- Webhooks verify the `x-razorpay-signature` against the **raw** request body
  before any state change.
- Only `available` products with a server-known price can be purchased.

## Database (Supabase)

- Writes happen only through the server with the service role key.
- RLS is **enabled** on all tables with **no public policies**, so anonymous and
  authenticated clients cannot read or write them directly (`supabase/migrations`).

## Recommended before launch

- Move rate limiting to Upstash Redis (or similar) for horizontal scale.
- Add a WAF / bot protection at the edge (e.g. Vercel/Cloudflare).
- Configure the Razorpay webhook and rotate keys from test → live.
- Consider the nonce-based strict CSP if compliance requires removing
  `'unsafe-inline'`.
