import Link from "next/link";
import Logo from "@/components/Logo";
import NewsletterForm from "@/components/NewsletterForm";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig, instagramUrl, whatsappUrl } from "@/lib/config";

const shopLinks = [
  { href: "/products", label: "All Products" },
  { href: "/products/gold-face-wash", label: "Gold Glow Face Wash" },
  { href: "/products/hydrating-serum", label: "Hydrating Serum" },
];

const companyLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
  { href: "/products", label: "Ingredients" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-espresso)" }} className="text-white">
      {/* Newsletter band — warm sand strip */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="wrap" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
          <div className="grid gap-8 rounded-2xl p-8 md:grid-cols-2 md:items-center md:p-10" style={{ background: "var(--color-espresso-mid)" }}>
            <div>
              <p className="eyebrow" style={{ color: "var(--color-gold-light)" }}>Join the Ritual</p>
              <h2 className="mt-3 font-serif text-2xl font-semibold md:text-3xl">
                Early access to every drop
              </h2>
              <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                New launches, skincare notes, and member-only offers — delivered quietly.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-serif text-3xl font-semibold">
              <Logo />
            </p>
            <p className="mt-5 max-w-xs text-sm leading-7" style={{ color: "rgba(255,255,255,0.5)" }}>
              Premium skincare crafted with clean science, timeless elegance, and a deep respect
              for the skin it touches.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer-social-icon grid h-10 w-10 place-items-center rounded-full transition-colors"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="footer-social-icon grid h-10 w-10 place-items-center rounded-full transition-colors"
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
            <p className="eyebrow mb-5" style={{ color: "var(--color-gold-light)" }}>Get in Touch</p>
            <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              <li>
                <a
                  href={`mailto:support@gentelleskincare.com`}
                  className="transition-colors hover:text-white"
                >
                  support@gentelleskincare.com
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

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs sm:flex-row" style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)" }}>
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
      <p className="eyebrow mb-5" style={{ color: "var(--color-gold-light)" }}>{title}</p>
      <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
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
