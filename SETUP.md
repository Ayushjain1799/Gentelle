# Gentelle — Setup & Operations

A production-grade Next.js 16 storefront for the Gentelle skincare brand:
e-commerce checkout (Razorpay), waitlist + contact persistence (Supabase),
SEO, security headers, and a luxury design system.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** design system (`app/globals.css`)
- **Supabase** (Postgres) for orders, waitlist, contact
- **Razorpay** for payments (REST + HMAC verification, no SDK)
- **Zod** validation · in-memory rate limiting · structured logging

## 1. Install

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev
```

The site runs fully **without** any keys — payments show a "Coming Soon"
WhatsApp-order fallback, and form submissions are logged instead of stored.
Add credentials to unlock the full flow.

## 2. Supabase (persistence)

1. Create a project at [supabase.com](https://supabase.com).
2. **Project Settings → API** → copy the **Project URL** and **service_role** key.
3. Set in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```
4. Run the migration: open **SQL Editor**, paste
   `supabase/migrations/0001_init.sql`, and run it. This creates the
   `orders`, `waitlist`, and `contact_messages` tables with RLS enabled.

## 3. Razorpay (payments)

1. In the [Razorpay dashboard](https://dashboard.razorpay.com) → **Settings →
   API Keys**, generate keys (use **Test Mode** first).
2. Set in `.env.local`:
   ```
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxx
   RAZORPAY_KEY_SECRET=xxx
   ```
3. **Webhook** (recommended): Settings → Webhooks → add
   `https://<your-domain>/api/webhooks/razorpay`, subscribe to
   `payment.captured` and `payment.failed`, set a secret, then:
   ```
   RAZORPAY_WEBHOOK_SECRET=xxx
   ```
4. Switch to live keys when ready. The "Add to Cart / Buy Now" flow becomes
   active automatically once `NEXT_PUBLIC_RAZORPAY_KEY_ID` is present.

### Payment flow

```
Cart → /checkout → POST /api/checkout/order  (server re-prices, creates RZP order)
     → Razorpay Checkout widget
     → POST /api/checkout/verify  (HMAC signature check, marks order paid)
     → success screen
Razorpay → POST /api/webhooks/razorpay  (raw-body signature check, source of truth)
```

## 4. Public links

```
NEXT_PUBLIC_WHATSAPP_NUMBER=917509400769
NEXT_PUBLIC_INSTAGRAM_HANDLE=gentelle_skincare
NEXT_PUBLIC_SITE_URL=https://gentelle.in
```

## 5. Scripts

```bash
npm run dev     # local dev
npm run build   # production build (also runs typecheck)
npm run lint    # eslint
npm start       # serve the production build
```

## 6. Deploy (Vercel)

1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. Add every variable from `.env.example` in **Project → Settings → Environment
   Variables**.
3. Deploy. Set the Razorpay webhook URL to the deployed domain.

## Project map

```
app/
  page.tsx                 Home (hero, spotlight, ingredients, benefits, story, reviews)
  products/                Listing + [id] detail (JSON-LD, SSG)
  cart/ checkout/          Cart page + Razorpay checkout
  about/ contact/          Brand pages (contact wired to API)
  api/                     contact · waitlist · checkout/* · webhooks/razorpay
  sitemap.ts robots.ts     SEO
components/                Navbar, Footer, cart/*, product/*, checkout/*, icons
lib/
  products.ts              Single source of truth for the catalogue
  config.ts env.server.ts  Public config / server-only secrets
  cart/                    Cart context (localStorage)
  api/ security/ validation/ razorpay/ supabase/   Backend libs
supabase/migrations/       SQL schema
SECURITY.md                Security posture & hardening notes
```
