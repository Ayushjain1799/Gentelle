"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-xl shadow-[0_1px_0_#E4D9CC]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl tracking-[0.3em] text-[#2C4A35] font-semibold"
          >
            GENTELLE
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10 text-sm tracking-wide text-[#2C4A35]">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative group py-1 font-medium hover:text-[#B8963E] transition-colors duration-300"
              >
                {l.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#B8963E] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link href="/products" className="hidden md:block">
              <button className="bg-[#2C4A35] text-white text-sm tracking-widest px-6 py-2.5 rounded-full hover:bg-[#B8963E] transition-colors duration-300">
                Shop Now
              </button>
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-px bg-[#2C4A35] transition-all duration-300 ${
                  open ? "rotate-45 translate-y-2.5" : ""
                }`}
              />
              <span
                className={`block w-6 h-px bg-[#2C4A35] transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-px bg-[#2C4A35] transition-all duration-300 ${
                  open ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#FAF7F2] shadow-2xl flex flex-col pt-24 px-8 transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-serif text-2xl text-[#2C4A35] hover:text-[#B8963E] transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-12">
            <Link href="/products" onClick={() => setOpen(false)}>
              <button className="w-full bg-[#2C4A35] text-white tracking-widest py-3 rounded-full hover:bg-[#B8963E] transition-colors duration-300">
                Shop Now
              </button>
            </Link>
          </div>

          <div className="mt-auto pb-10 text-xs text-[#6B6B6B] tracking-widest">
            GENTELLE © 2026
          </div>
        </div>
      </div>
    </>
  );
}
