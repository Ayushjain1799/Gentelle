"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart/CartContext";
import { isPaymentsEnabled, whatsappUrl } from "@/lib/config";
import { CheckIcon } from "@/components/icons";

type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

type Status = "idle" | "processing" | "success" | "error";

export default function CheckoutClient() {
  const { lines, count, subtotalLabel, clear } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onPay(e: FormEvent) {
    e.preventDefault();
    setError("");
    setStatus("processing");

    try {
      const orderRes = await fetch("/api/checkout/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((l) => ({ productId: l.productId, quantity: l.quantity })),
          customer: form,
        }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok || !order.ok) {
        throw new Error(order.error || "Could not start checkout.");
      }

      const loaded = await loadRazorpay();
      if (!loaded || !window.Razorpay) {
        throw new Error("Could not load the payment gateway.");
      }

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Gentelle",
        description: "Luxury Skincare",
        order_id: order.orderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#2F4A3A" },
        modal: { ondismiss: () => setStatus("idle") },
        handler: async (response) => {
          const verifyRes = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verify = await verifyRes.json();
          if (verifyRes.ok && verify.ok) {
            clear();
            setStatus("success");
          } else {
            setStatus("error");
            setError("Payment could not be verified. If you were charged, contact support.");
          }
        },
      });
      rzp.open();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  // ---- Success ----
  if (status === "success") {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-line bg-surface p-10 text-center">
        <span className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-brand-tint text-brand">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h2 className="font-serif text-2xl font-semibold text-ink">Thank you for your order</h2>
        <p className="mt-3 text-sm text-muted">
          A confirmation is on its way. Your Gentelle ritual is being prepared with care.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-block rounded-full bg-brand px-8 py-3.5 text-xs tracking-widest text-white transition-colors hover:bg-gold"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // ---- Empty cart ----
  if (count === 0) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-line bg-surface p-10 text-center">
        <h2 className="font-serif text-2xl font-semibold text-ink">Your cart is empty</h2>
        <p className="mt-3 text-sm text-muted">Add a product to begin checkout.</p>
        <Link
          href="/products"
          className="mt-8 inline-block rounded-full bg-brand px-8 py-3.5 text-xs tracking-widest text-white transition-colors hover:bg-gold"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
      {/* Customer details */}
      <div>
        <h2 className="font-serif text-2xl font-semibold text-ink">Checkout</h2>
        <p className="mt-2 text-sm text-muted">Enter your details to complete the order.</p>

        {!isPaymentsEnabled && (
          <div className="mt-6 rounded-2xl border border-gold/40 bg-gold-soft/50 p-5 text-sm text-ink">
            <p className="font-medium">Online payments are launching soon.</p>
            <p className="mt-1 text-muted">
              You can still place this order over WhatsApp and we&apos;ll confirm it personally.
            </p>
            <a
              href={whatsappUrl(
                `Hi Gentelle, I'd like to order: ${lines
                  .map((l) => `${l.quantity}× ${l.product.name}`)
                  .join(", ")} (${subtotalLabel}).`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-full bg-brand px-6 py-3 text-xs tracking-widest text-white transition-colors hover:bg-gold"
            >
              Order via WhatsApp
            </a>
          </div>
        )}

        <form onSubmit={onPay} className="mt-6 space-y-4" noValidate>
          <Field label="Full name">
            <input
              required
              value={form.name}
              onChange={set("name")}
              autoComplete="name"
              className="form-input"
              placeholder="Your name"
            />
          </Field>
          <Field label="Email address">
            <input
              required
              type="email"
              value={form.email}
              onChange={set("email")}
              autoComplete="email"
              className="form-input"
              placeholder="you@example.com"
            />
          </Field>
          <Field label="Phone number">
            <input
              required
              type="tel"
              value={form.phone}
              onChange={set("phone")}
              autoComplete="tel"
              className="form-input"
              placeholder="10-digit mobile number"
            />
          </Field>

          {error && (
            <p className="text-sm text-danger" role="alert">
              {error}
            </p>
          )}

          {isPaymentsEnabled && (
            <button
              type="submit"
              disabled={status === "processing"}
              className="w-full rounded-full bg-brand py-4 text-sm tracking-widest text-white transition-colors hover:bg-gold disabled:opacity-60"
            >
              {status === "processing" ? "Processing…" : `Pay ${subtotalLabel}`}
            </button>
          )}
          <p className="text-center text-xs text-faint">
            Secured by Razorpay · Your details are encrypted in transit.
          </p>
        </form>
      </div>

      {/* Order summary */}
      <aside className="h-fit rounded-3xl border border-line bg-surface p-6">
        <h3 className="font-serif text-lg font-semibold text-ink">Order Summary</h3>
        <ul className="mt-5 space-y-4">
          {lines.map((l) => (
            <li key={l.productId} className="flex items-center gap-4">
              <div
                className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg"
                style={{ background: `${l.product.accent}22` }}
              >
                <Image
                  src={l.product.image}
                  alt={l.product.name}
                  width={56}
                  height={56}
                  sizes="56px"
                  className="h-full w-full object-contain p-1.5"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">{l.product.name}</p>
                <p className="text-xs text-muted">Qty {l.quantity}</p>
              </div>
              <span className="text-sm text-ink">{l.product.priceLabel}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
          <span className="text-sm text-muted">Total</span>
          <span className="font-serif text-xl font-semibold text-brand">{subtotalLabel}</span>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-muted">{label}</span>
      {children}
    </label>
  );
}
