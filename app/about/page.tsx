import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn the story behind Gentelle — a premium Indian skincare brand built on clean science, honest ingredients, and timeless elegance.",
};

const values = [
  {
    title: "Quality",
    body: "Every ingredient is selected for efficacy and safety. We never use fillers or misleading actives.",
    icon: "✦",
  },
  {
    title: "Simplicity",
    body: "A streamlined routine that actually works. No 12-step confusion — just what your skin truly needs.",
    icon: "◇",
  },
  {
    title: "Transparency",
    body: "Full ingredient lists, honest claims, and real science. We believe you deserve to know exactly what touches your skin.",
    icon: "○",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#FAF7F2]">
      {/* Hero */}
      <section className="bg-[#F0EAE0] pt-40 pb-24 px-6 md:px-10 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[#B8963E] mb-5">
          About Gentelle
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-[#1A1A1A] leading-tight max-w-4xl mx-auto">
          Luxury Skincare
          <br />
          Crafted With Purpose
        </h1>
        <div className="section-divider mt-8" />
        <p className="mt-8 text-base md:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-8">
          Gentelle was created with a singular mission — to make premium skincare that is
          accessible, honest, and deeply effective for Indian skin.
        </p>
      </section>

      {/* Story */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#B8963E] mb-6">
                Our Story
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] leading-tight mb-6">
                More Than a
                <br />
                Routine
              </h2>
              <div className="w-10 h-px bg-[#B8963E] mb-8" />
              <p className="text-base text-[#6B6B6B] leading-8 mb-6">
                At Gentelle, we believe skincare should be more than a routine — it should
                be a moment of self-care, a small daily ritual that connects you to yourself.
              </p>
              <p className="text-base text-[#6B6B6B] leading-8">
                We started by asking a simple question: why does premium skincare have to
                mean unpronounceable ingredients and inaccessible prices? Gentelle is our
                answer — formulations that combine modern cosmetic science with clean,
                effective actives, presented with the elegance they deserve.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-64 h-64 rounded-full bg-[#B8963E]/6 blur-3xl" />
              <Image
                src="/products/mainpage.png"
                alt="Gentelle skincare products — our story"
                width={520}
                height={520}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="relative object-contain w-full drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 bg-[#F0EAE0]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-[#B8963E] mb-4">
              Our Values
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A]">
              What We Stand For
            </h2>
            <div className="section-divider mt-6" />
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-3xl p-10 border border-[#E4D9CC] hover:shadow-lg hover:border-[#B8963E] transition-all duration-500"
              >
                <span className="text-[#B8963E] text-3xl font-serif">{v.icon}</span>
                <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A] mt-6 mb-4">
                  {v.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-7">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#2C4A35] text-center px-6">
        <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF5A] mb-6">
          Experience Gentelle
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-10">
          Ready to Begin?
        </h2>
        <Link href="/products">
          <button className="bg-white text-[#2C4A35] text-sm tracking-widest px-10 py-4 rounded-full hover:bg-[#B8963E] hover:text-white transition-all duration-300">
            Explore the Collection
          </button>
        </Link>
      </section>
    </main>
  );
}
