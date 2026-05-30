"use client";

import { useState, type FormEvent } from "react";
import { CheckIcon } from "@/components/icons";

type Status = "idle" | "loading" | "success" | "error";

/** "Notify me" waitlist form for Coming Soon products. */
export default function WaitlistForm({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productId, company }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        id="notify"
        className="flex items-center gap-3 rounded-2xl border border-brand-tint bg-brand-tint/60 px-5 py-4 text-sm text-brand"
        role="status"
      >
        <CheckIcon className="h-5 w-5 shrink-0" />
        {message}
      </div>
    );
  }

  return (
    <form id="notify" onSubmit={onSubmit} className="scroll-mt-28" noValidate>
      <p className="mb-3 text-sm text-muted">
        Be first to know when <span className="font-medium text-ink">{productName}</span> launches.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`wl-${productId}`}>
          Email address
        </label>
        <input
          id={`wl-${productId}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          autoComplete="email"
          className="w-full rounded-full border border-line bg-surface px-5 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-brand"
        />
        {/* Honeypot — visually hidden, not announced. */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="hidden"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-full bg-brand px-7 py-3.5 text-xs tracking-widest text-white transition-colors duration-300 hover:bg-gold disabled:opacity-60"
        >
          {status === "loading" ? "Joining…" : "Notify Me"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-danger" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
