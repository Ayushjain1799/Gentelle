import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig, instagramUrl, whatsappUrl } from "@/lib/config";

const shopLinks = [
  { href: "/products", label: "All Products" },
  { href: "/products/gold-face-wash", label: "Gold Face Wash" },
  { href: "/products/hydrating-serum", label: "Hydrating Serum" },
];

const companyLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
  { href: "/products", label: "Ingredients" },
];

export default function Footer() {
  return (
    <footer className="grain-dark bg-brand-deep text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
        {/* Newsletter band */}
        <div className="mb-14 grid gap-8 rounded-3xl bg-white/5 p-8 md:grid-cols-2 md:items-center md:p-10">
          <div>
            <h2 className="font-serif text-2xl font-semibold md:text-3xl">
              Join the Gentelle ritual
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Early access to launches, skincare notes, and member-only offers.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-serif text-2xl font-semibold tracking-[0.3em]">GENTELLE</p>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
              Premium skincare crafted with clean science, timeless elegance, and a deep respect
              for the skin it touches.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold hover:text-gold-light"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold hover:text-gold-light"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <FooterColumn title="Shop" links={shopLinks} />
          {/* Company */}
          <FooterColumn title="Company" links={companyLinks} />

          {/* Contact */}
          <div>
            <p className="eyebrow mb-5 text-gold-light">Get in Touch</p>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a
                  href={`mailto:${siteConfig.name.toLowerCase()}@gentelle.in`}
                  className="transition-colors hover:text-white"
                >
                  support@gentelle.in
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  +91 {siteConfig.whatsappNumber.slice(2, 7)} {siteConfig.whatsappNumber.slice(7)}
                </a>
              </li>
              <li>@{siteConfig.instagramHandle}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Gentelle. All rights reserved.</p>
          <p className="tracking-wide">Crafted with care · India</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="eyebrow mb-5 text-gold-light">{title}</p>
      <ul className="space-y-3 text-sm text-white/60">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
