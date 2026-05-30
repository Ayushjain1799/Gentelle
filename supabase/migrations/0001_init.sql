-- ============================================================
-- Gentelle — initial schema
-- Run in the Supabase SQL editor (or via the Supabase CLI).
-- ============================================================

-- Orders placed through Razorpay checkout.
create table if not exists public.orders (
  id                   uuid primary key default gen_random_uuid(),
  razorpay_order_id    text not null unique,
  razorpay_payment_id  text,
  amount               integer not null,          -- in paise
  currency             text not null default 'INR',
  status               text not null default 'created'
                         check (status in ('created', 'paid', 'failed')),
  items                jsonb not null,            -- [{ productId, name, quantity, priceInPaise }]
  customer_name        text not null,
  customer_email       text not null,
  customer_phone       text not null,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create index if not exists orders_email_idx on public.orders (customer_email);
create index if not exists orders_status_idx on public.orders (status);

-- Notify-me / launch waitlist for "Coming Soon" products.
create table if not exists public.waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  product_id  text not null,
  created_at  timestamptz not null default now(),
  unique (email, product_id)
);

create index if not exists waitlist_product_idx on public.waitlist (product_id);

-- Contact form submissions.
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  subject     text,
  message     text not null,
  created_at  timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Row Level Security
-- All three tables are written only by the server using the
-- service role key (which bypasses RLS). We enable RLS and add
-- NO public policies, so anonymous/auth clients cannot read or
-- write these tables directly.
-- ------------------------------------------------------------
alter table public.orders enable row level security;
alter table public.waitlist enable row level security;
alter table public.contact_messages enable row level security;

-- Keep updated_at fresh on orders.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists orders_touch_updated_at on public.orders;
create trigger orders_touch_updated_at
  before update on public.orders
  for each row execute function public.touch_updated_at();
