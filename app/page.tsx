import Image from "next/image";
import Link from "next/link";

const trustItems = [
  "Clean Ingredients",
  "Dermatologist Tested",
  "Cruelty Free",
  "Made in India",
];

const featuredProducts = [
  {
    name: "Gold Face Wash",
    tagline: "Gentle foaming cleanser with 24K gold extract",
    price: "₹399",
    image: "/products/gold.png",
    badge: "Best Seller",
  },
  {
    name: "Hydrating Serum",
    tagline: "Lightweight hyaluronic serum for all-day glow",
    price: "₹899",
    image: "/products/serum.png",
    badge: "New Launch",
  },
  {
    name: "Night Repair Cream",
    tagline: "Deep nourishment while your skin regenerates",
    price: "₹1,299",
    image: "/products/gold.png",
    badge: null,
  },
];

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <circle cx="20" cy="20" r="16" />
        <path d="M14 20c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6" strokeLinecap="round" />
        <circle cx="20" cy="20" r="2" fill="currentColor" />
      </svg>
    ),
    title: "Clean Science",
    body: "Every formula is backed by cosmetic science — no fillers, no compromise.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 8c0 0-10 8-10 16a10 10 0 0020 0C30 16 20 8 20 8z" />
        <path d="M20 22v-6" strokeLinecap="round" />
        <circle cx="20" cy="24" r="1.5" fill="currentColor" />
      </svg>
    ),
    title: "Skin First",
    body: "Formulated for the Indian climate — humidity, pollution, and all.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="14" width="24" height="18" rx="3" />
        <path d="M14 14V11a6 6 0 0112 0v3" strokeLinecap="round" />
        <circle cx="20" cy="23" r="2.5" />
        <path d="M20 25.5v2.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Transparent",
    body: "Full ingredient lists. No hidden actives, no misleading claims.",
  },
];

const testimonials = [
  {
    quote:
      "The Gold Face Wash is unlike anything I've tried. My skin feels clean but never stripped — it actually glows.",
    name: "Priya M.",
    location: "Mumbai",
  },
  {
    quote:
      "I was skeptical about the serum price but after two weeks my dark spots visibly faded. Worth every rupee.",
    name: "Ananya S.",
    location: "Bengaluru",
  },
  {
    quote:
      "Gentelle feels like a luxury European brand but made for Indian skin. The packaging alone is stunning.",
    name: "Riya K.",
    location: "Delhi",
  },
];

export default function Home() {
  return (
    <main>
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-[#FAF7F2] overflow-hidden">
        {/* Decorative background shape */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[#F0EAE0] -skew-x-6 translate-x-12 hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p className="fade-in-up text-xs uppercase tracking-[0.4em] text-[#B8963E] font-medium mb-6">
                Luxury Skincare · Est. 2024
              </p>

              <h1 className="fade-in-up delay-100 font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#1A1A1A] leading-[1.1] tracking-tight">
                Gentle Care.
                <br />
                <span className="gold-shimmer">Elevated</span>
                <br />
                Ritual.
              </h1>

              <p className="fade-in-up delay-200 mt-8 text-base md:text-lg text-[#6B6B6B] leading-relaxed max-w-md">
                Premium skincare crafted for modern lifestyles. Thoughtfully formulated
                with clean actives that blend elegance, science, and everyday care.
              </p>

              <div className="fade-in-up delay-300 flex flex-wrap gap-4 mt-10">
                <Link href="/products">
                  <button className="bg-[#2C4A35] text-white text-sm tracking-widest px-8 py-4 rounded-full hover:bg-[#B8963E] transition-colors duration-300">
                    Explore Collection
                  </button>
                </Link>
                <Link href="/about">
                  <button className="border border-[#2C4A35] text-[#2C4A35] text-sm tracking-widest px-8 py-4 rounded-full hover:bg-[#2C4A35] hover:text-white transition-all duration-300">
                    Our Story
                  </button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="fade-in-up delay-400 flex flex-wrap gap-6 mt-14">
                {trustItems.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-[#6B6B6B] tracking-wide">
                    <span className="w-1 h-1 rounded-full bg-[#B8963E] inline-block" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="fade-in flex justify-center relative">
              <div className="absolute inset-0 bg-[#B8963E]/5 rounded-[40px] blur-3xl scale-90" />
              <Image
                src="/products/mainpage.png"
                alt="Gentelle luxury skincare hero product"
                width={580}
                height={580}
                priority
                sizes="(max-width: 768px) 90vw, 50vw"
                className="relative object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE TRUST BAR ───────────────────────────────────── */}
      <div className="bg-[#2C4A35] py-4 overflow-hidden">
        <div className="flex gap-16 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {[...Array(4)].flatMap(() => trustItems).map((item, i) => (
            <span key={i} className="text-xs tracking-[0.35em] text-[#D4AF5A] uppercase shrink-0">
              {item} &nbsp;·
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURED PRODUCTS ───────────────────────────────────── */}
      <section className="py-28 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-[#B8963E] mb-4">
              Featured Collection
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A]">
              Discover Our Essentials
            </h2>
            <div className="section-divider mt-6" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.name}
                href={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group"
              >
                <div className="bg-white rounded-3xl overflow-hidden border border-[#E4D9CC] hover:border-[#B8963E] hover:shadow-[0_8px_40px_rgba(184,150,62,0.12)] transition-all duration-500">
                  {/* Image area */}
                  <div className="relative bg-[#F0EAE0] p-8">
                    {product.badge && (
                      <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase bg-[#2C4A35] text-white px-3 py-1 rounded-full">
                        {product.badge}
                      </span>
                    )}
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="w-full h-56 object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-[#1A1A1A]">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#6B6B6B] leading-relaxed">
                      {product.tagline}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="font-serif text-lg font-semibold text-[#2C4A35]">
                        {product.price}
                      </span>
                      <span className="text-xs tracking-widest text-[#B8963E] group-hover:translate-x-1 transition-transform duration-300">
                        View →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <button className="border border-[#2C4A35] text-[#2C4A35] text-sm tracking-widest px-8 py-3.5 rounded-full hover:bg-[#2C4A35] hover:text-white transition-all duration-300">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ───────────────────────────────────────── */}
      <section className="py-28 bg-[#F0EAE0]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-[#B8963E] mb-4">
              Why Gentelle
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A]">
              Skincare with Integrity
            </h2>
            <div className="section-divider mt-6" />
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-[#E4D9CC] hover:bg-white hover:shadow-lg transition-all duration-500"
              >
                <div className="text-[#2C4A35] mb-6">{p.icon}</div>
                <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY SPLIT ────────────────────────────────────── */}
      <section className="py-28 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-48 h-48 rounded-full bg-[#B8963E]/8 blur-3xl" />
              <Image
                src="/products/serum.png"
                alt="Gentelle serum — clean formulation philosophy"
                width={560}
                height={560}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="relative object-contain w-full drop-shadow-xl"
              />
            </div>

            {/* Text side */}
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#B8963E] mb-6">
                Our Philosophy
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] leading-tight mb-8">
                Beauty Through
                <br />
                Simplicity
              </h2>
              <div className="w-12 h-px bg-[#B8963E] mb-8" />
              <p className="text-base text-[#6B6B6B] leading-8 mb-6">
                Gentelle was born from a belief that great skin doesn&apos;t need a
                cabinet full of products. It needs the right ones — carefully formulated,
                honestly made.
              </p>
              <p className="text-base text-[#6B6B6B] leading-8">
                We obsess over every ingredient, every texture, every moment your skin
                comes into contact with ours. That obsession is what makes Gentelle different.
              </p>

              <Link href="/about" className="inline-block mt-10">
                <button className="bg-[#2C4A35] text-white text-sm tracking-widest px-8 py-4 rounded-full hover:bg-[#B8963E] transition-colors duration-300">
                  Read Our Story
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────── */}
      <section className="py-28 bg-[#2C4A35]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF5A] mb-4">
              What They Say
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white">
              Loved by Real Skin
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white/8 border border-white/10 rounded-3xl p-8 hover:bg-white/12 transition-all duration-500"
              >
                <p className="text-[#D4AF5A] text-2xl font-serif mb-4">&ldquo;</p>
                <p className="text-[#E8E0D5] text-sm leading-7">{t.quote}</p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-[#9DB8A0] text-xs mt-1">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────── */}
      <section className="py-32 bg-[#F0EAE0]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#B8963E] mb-6">
            Begin Your Ritual
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-semibold text-[#1A1A1A] leading-tight mb-8">
            Your Skin Deserves
            <br />
            the Best
          </h2>
          <p className="text-base text-[#6B6B6B] leading-relaxed mb-12 max-w-xl mx-auto">
            Explore our collection of premium skincare designed to elevate every step
            of your daily ritual.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products">
              <button className="bg-[#2C4A35] text-white text-sm tracking-widest px-10 py-4 rounded-full hover:bg-[#B8963E] transition-colors duration-300">
                Shop the Collection
              </button>
            </Link>
            <a
              href="https://wa.me/917509400769"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border border-[#2C4A35] text-[#2C4A35] text-sm tracking-widest px-10 py-4 rounded-full hover:bg-[#2C4A35] hover:text-white transition-all duration-300">
                Get Advice on WhatsApp
              </button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
