import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to Gentelle for product questions, orders, or collaborations. We're available on WhatsApp, email, and Instagram.",
};

const channels = [
  {
    title: "WhatsApp",
    description: "Fastest way to reach us. Chat, order, or ask product questions.",
    action: { label: "Start a Chat", href: "https://wa.me/917509400769", external: true },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
  {
    title: "Email",
    description: "support@gentelle.in · gentelleskincare@gmail.com",
    action: { label: "Send Email", href: "mailto:support@gentelle.in", external: false },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
  {
    title: "Instagram",
    description: "Follow our journey @gentelle_skincare for skincare tips and launches.",
    action: { label: "Visit Instagram", href: "https://instagram.com/gentelle_skincare", external: true },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <main className="bg-[#FAF7F2]">
      {/* Hero */}
      <section className="bg-[#F0EAE0] pt-40 pb-24 px-6 md:px-10 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[#B8963E] mb-5">
          Contact Us
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-[#1A1A1A] leading-tight">
          We&apos;d Love to
          <br />
          Hear From You
        </h1>
        <div className="section-divider mt-8" />
        <p className="mt-8 text-base text-[#6B6B6B] max-w-xl mx-auto leading-8">
          Questions, orders, collaborations, or just a hello — our team is always happy to connect.
        </p>
      </section>

      {/* Channels */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid sm:grid-cols-3 gap-8">
            {channels.map((c) => (
              <div
                key={c.title}
                className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#E4D9CC] hover:border-[#B8963E] hover:shadow-lg transition-all duration-500 flex flex-col"
              >
                <div className="text-[#2C4A35] mb-5">{c.icon}</div>
                <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] mb-3">{c.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-7 flex-1">{c.description}</p>
                <a
                  href={c.action.href}
                  target={c.action.external ? "_blank" : undefined}
                  rel={c.action.external ? "noopener noreferrer" : undefined}
                  className="inline-block mt-8"
                >
                  <button className="bg-[#2C4A35] text-white text-xs tracking-widest px-6 py-3 rounded-full hover:bg-[#B8963E] transition-colors duration-300">
                    {c.action.label}
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-24 bg-[#F0EAE0]">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.4em] text-[#B8963E] mb-4">
              Direct Message
            </p>
            <h2 className="font-serif text-4xl font-semibold text-[#1A1A1A]">
              Send Us a Message
            </h2>
          </div>

          <form
            action="mailto:support@gentelle.in"
            method="post"
            encType="text/plain"
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full bg-white px-5 py-4 rounded-2xl border border-[#E4D9CC] text-sm text-[#1A1A1A] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#2C4A35] transition-colors duration-300"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full bg-white px-5 py-4 rounded-2xl border border-[#E4D9CC] text-sm text-[#1A1A1A] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#2C4A35] transition-colors duration-300"
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full bg-white px-5 py-4 rounded-2xl border border-[#E4D9CC] text-sm text-[#1A1A1A] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#2C4A35] transition-colors duration-300"
            />

            <textarea
              name="message"
              placeholder="Your message…"
              rows={6}
              required
              className="w-full bg-white px-5 py-4 rounded-2xl border border-[#E4D9CC] text-sm text-[#1A1A1A] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#2C4A35] transition-colors duration-300 resize-none"
            />

            <button
              type="submit"
              className="w-full bg-[#2C4A35] text-white text-sm tracking-widest py-4 rounded-2xl hover:bg-[#B8963E] transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
