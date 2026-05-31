"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import CartButton from "@/components/cart/CartButton";
import { InstagramIcon } from "@/components/icons";
import { instagramUrl } from "@/lib/config";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-canvas/95 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl"
            : "bg-gradient-to-b from-canvas/80 to-transparent backdrop-blur-[2px]"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10">
          {/* Mobile: hamburger */}
          <button
            type="button"
            className="flex flex-col gap-1.5 p-2 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`block h-px w-6 bg-brand transition-all duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-brand transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-brand transition-all duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-lg font-semibold tracking-[0.3em] text-brand md:text-xl"
          >
            GENTELLE
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-10 text-sm tracking-wide text-brand md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative py-1 font-medium transition-colors duration-300 hover:text-gold"
              >
                {l.label}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-1 md:gap-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Gentelle on Instagram"
              className="hidden h-10 w-10 place-items-center rounded-full text-brand transition-colors hover:text-gold md:grid"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <CartButton />
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/30 backdrop-blur-sm transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute left-0 top-0 flex h-full w-72 flex-col bg-canvas px-8 pt-24 shadow-2xl transition-transform duration-500 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-serif text-2xl text-brand transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
          >
            <InstagramIcon className="h-5 w-5" /> @gentelle_skincare
          </a>
        </div>
      </div>
    </>
  );
}
