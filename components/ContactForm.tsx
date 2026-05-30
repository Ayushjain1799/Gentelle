"use client";

import { useState, type FormEvent } from "react";
import { CheckIcon } from "@/components/icons";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", company: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setFeedback(data.message || "Thanks for reaching out.");
        setForm({ name: "", email: "", subject: "", message: "", company: "" });
      } else {
        setStatus("error");
        setFeedback(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl border border-brand-tint bg-brand-tint/60 px-6 py-5 text-sm text-brand"
        role="status"
      >
        <CheckIcon className="h-5 w-5 shrink-0" />
        {feedback}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Your name</span>
          <input
            required
            value={form.name}
            onChange={set("name")}
            placeholder="Your name"
            autoComplete="name"
            className="form-input"
          />
        </label>
        <label className="block">
          <span className="sr-only">Email address</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="Email address"
            autoComplete="email"
            className="form-input"
          />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">Subject</span>
        <input
          value={form.subject}
          onChange={set("subject")}
          placeholder="Subject (optional)"
          className="form-input"
        />
      </label>
      <label className="block">
        <span className="sr-only">Message</span>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={set("message")}
          placeholder="How can we help?"
          className="form-input resize-none"
        />
      </label>
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.company}
        onChange={set("company")}
        className="hidden"
      />

      {status === "error" && (
        <p className="text-sm text-danger" role="alert">
          {feedback}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-brand py-4 text-sm tracking-widest text-white transition-colors hover:bg-gold disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
