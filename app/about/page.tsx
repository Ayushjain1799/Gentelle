import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { LeafIcon, SparkleIcon, ShieldIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Gentelle — a premium Indian skincare brand built on clean science, honest ingredients, and timeless elegance.",
  alternates: { canonical: "/about" },
};

const values = [
  { Icon: SparkleIcon, title: "Quality", body: "Every ingredient is selected for efficacy and safety. No fillers, no shortcuts." },
  { Icon: LeafIcon, title: "Simplicity", body: "A streamlined routine that actually works — just what your skin truly needs." },
  { Icon: ShieldIcon, title: "Transparency", body: "Full ingredient lists, honest claims, and real science you can trust." },
];

const stats = [
  { value: "100%", label: "Cruelty-free" },
  { value: "0", label: "Hidden fillers" },
  { value: "₹399", label: "Accessible luxury" },
];

export default function AboutPage() {
  return (
    <>
      <section style={{ paddingTop: "8rem", paddingBottom: "5rem" }} className="bg-sand text-center">
        <p className="eyebrow">About Gentelle</p>
        <h1 className="mx-auto mt-4 max-w-4xl font-serif text-5xl font-semibold leading-tight text-ink md:text-7xl">
          Luxury Skincare, Crafted With Purpose
        </h1>
        <div className="divider-gold center mt-7" />
        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted md:text-lg">
          Gentelle was created with a singular mission — to make premium skincare that is
          accessible, honest, and deeply effective for Indian skin.
        </p>
      </section>

      <section className="bg-canvas py-20 md:py-28">
        <div className="wrap grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-ink md:text-5xl">
              More Than a Routine
            </h2>
            <div className="divider-gold mt-5" />
            <p className="mt-6 text-base leading-8 text-muted">
              At Gentelle, we believe skincare should be more than a routine — it should be a moment
              of self-care, a small daily ritual that connects you to yourself.
            </p>
            <p className="mt-4 text-base leading-8 text-muted">
              We started by asking a simple question: why does premium skincare have to mean
              unpronounceable ingredients and inaccessible prices? Gentelle is our answer —
              formulations that pair modern cosmetic science with clean, effective actives,
              presented with the elegance they deserve.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-3xl font-semibold text-brand">{s.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-[2.5rem] border border-line bg-gradient-to-br from-brand-tint to-surface p-10">
              <Image
                src="/products/mainpage.png"
                alt="Gentelle skincare collection"
                width={560}
                height={560}
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="h-auto w-full object-contain drop-shadow-xl"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand/40 py-20 md:py-28">
        <div className="wrap">
          <Reveal className="text-center">
            <p className="eyebrow">Our Values</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-ink md:text-5xl">
              What We Stand For
            </h2>
            <div className="divider-gold center mt-6" />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="h-full rounded-3xl border border-line bg-surface p-9">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-tint text-brand">
                    <v.Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-serif text-2xl font-semibold text-ink">{v.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grain-dark bg-brand px-5 py-24 text-center">
        <p className="eyebrow text-gold-light">Experience Gentelle</p>
        <h2 className="mt-5 font-serif text-4xl font-semibold text-white md:text-5xl">
          Ready to Begin?
        </h2>
        <Link
          href="/products"
          className="mt-9 inline-block rounded-full bg-white px-10 py-4 text-sm tracking-widest text-brand transition-colors hover:bg-gold hover:text-white"
        >
          Explore the Collection
        </Link>
      </section>
    </>
  );
}
