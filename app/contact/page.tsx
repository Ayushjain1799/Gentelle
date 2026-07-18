import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { WhatsAppIcon, InstagramIcon } from "@/components/icons";
import { whatsappUrl, instagramUrl, siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Gentelle for product questions, orders, or collaborations — on WhatsApp, email, or Instagram.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const channels = [
    {
      title: "WhatsApp",
      detail: "Fastest way to reach us. Chat, order or ask anything.",
      href: whatsappUrl("Hi Gentelle!"),
      cta: "Start a Chat",
      Icon: WhatsAppIcon,
      external: true,
    },
    {
      title: "Email",
      detail: "gentelleskincare@gmail.com",
      href: "mailto:gentelleskincare@gmail.com",
      cta: "Send Email",
      Icon: WhatsAppIcon,
      external: false,
    },
    {
      title: "Instagram",
      detail: `@${siteConfig.instagramHandle}`,
      href: instagramUrl,
      cta: "Follow Us",
      Icon: InstagramIcon,
      external: true,
    },
  ];

  return (
    <>
      <section style={{ paddingTop: "8rem", paddingBottom: "4rem" }} className="bg-sand text-center">
        <p className="eyebrow">Contact Us</p>
        <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight text-ink md:text-7xl">
          We&apos;d Love to Hear From You
        </h1>
        <div className="divider-gold center mt-6" />
        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted">
          Questions, orders, collaborations or just a hello — our team is always happy to connect.
        </p>
      </section>

      <section className="wrap" style={{ maxWidth: "56rem", paddingTop: "4rem", paddingBottom: "5rem" }}>
        <div className="grid gap-5 sm:grid-cols-3">
          {channels.map((c) => (
            <div
              key={c.title}
              className="flex flex-col rounded-3xl border border-line bg-surface p-7 transition-colors hover:border-gold/50"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-tint text-brand">
                <c.Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 font-serif text-lg font-semibold text-ink">{c.title}</h2>
              <p className="mt-1.5 flex-1 text-sm text-muted">{c.detail}</p>
              <a
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="mt-6 inline-block rounded-full bg-brand px-5 py-2.5 text-xs tracking-widest text-white transition-colors hover:bg-gold"
              >
                {c.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand/40 py-16 md:py-20">
        <div className="wrap" style={{ maxWidth: "36rem" }}>
          <div className="mb-10 text-center">
            <p className="eyebrow">Direct Message</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-ink md:text-4xl">
              Send Us a Message
            </h2>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
