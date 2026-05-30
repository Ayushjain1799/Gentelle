import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/gentelle_skincare",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/917509400769",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A2E22] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid md:grid-cols-3 gap-16">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl tracking-[0.3em] font-semibold text-white mb-5">
              GENTELLE
            </p>
            <p className="text-sm text-[#9DB8A0] leading-7 max-w-xs">
              Premium skincare crafted with clean science, timeless elegance, and a
              deep respect for the skin it touches.
            </p>
            <div className="flex gap-4 mt-8">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-[#9DB8A0] hover:text-[#D4AF5A] transition-colors duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF5A] mb-6">
              Navigate
            </p>
            <nav className="flex flex-col gap-4">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-[#9DB8A0] hover:text-white transition-colors duration-300"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF5A] mb-6">
              Get in Touch
            </p>
            <div className="flex flex-col gap-4 text-sm text-[#9DB8A0]">
              <a
                href="mailto:support@gentelle.in"
                className="hover:text-white transition-colors duration-300"
              >
                support@gentelle.in
              </a>
              <a
                href="https://wa.me/917509400769"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                +91 75094 00769
              </a>
              <p className="text-[#9DB8A0]">@gentelle_skincare</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#5A7A62]">
          <p>© 2026 Gentelle. All rights reserved.</p>
          <p className="tracking-wide">Made with care · India</p>
        </div>
      </div>
    </footer>
  );
}
