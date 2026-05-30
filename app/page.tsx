import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/product/ProductCard";
import ProductMedia from "@/components/product/ProductMedia";
import AddToCart from "@/components/product/AddToCart";
import { LeafIcon, ShieldIcon, SparkleIcon, DropletIcon } from "@/components/icons";
import { getFeaturedProducts, getProduct } from "@/lib/products";
import { whatsappUrl } from "@/lib/config";

const trust = ["Clean Ingredients", "Dermatologist Tested", "Cruelty Free", "Made in India"];

const pillars = [
  { icon: LeafIcon, title: "Clean Science", body: "Backed by cosmetic science — no fillers, no compromise." },
  { icon: ShieldIcon, title: "Barrier First", body: "Formulated to protect and strengthen your skin barrier." },
  { icon: DropletIcon, title: "Climate-Tuned", body: "Built for Indian humidity, pollution and everyday wear." },
  { icon: SparkleIcon, title: "Transparent", body: "Full ingredient lists. Honest claims. Real results." },
];

const ingredients = [
  { name: "24K Gold", role: "Radiance & luminosity" },
  { name: "Hyaluronic Acid", role: "Deep, lasting hydration" },
  { name: "Niacinamide", role: "Clarity & even tone" },
  { name: "Ceramides", role: "Barrier repair" },
  { name: "Bakuchiol", role: "Gentle smoothing" },
  { name: "Aloe Vera", role: "Calm & soothe" },
];

const testimonials = [
  { quote: "My skin feels clean but never stripped — it actually glows. Nothing else compares.", name: "Priya M.", location: "Mumbai" },
  { quote: "After two weeks my dark spots visibly faded. Worth every rupee.", name: "Ananya S.", location: "Bengaluru" },
  { quote: "Feels like a luxury European brand, but made for Indian skin. The packaging alone is stunning.", name: "Riya K.", location: "Delhi" },
];

export default function Home() {
  const featured = getFeaturedProducts();
  const hero = getProduct("gold-face-wash")!;

  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden bg-canvas">
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 bg-sand/60 lg:block [clip-path:polygon(22%_0,100%_0,100%_100%,4%_100%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36 lg:grid-cols-2">
          <div>
            <p className="eyebrow fade-in-up">Luxury Skincare · Est. 2024</p>
            <h1 className="fade-in-up delay-100 mt-6 font-serif text-5xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Gentle Care.
              <br />
              <span className="gold-shimmer">Elevated</span> Ritual.
            </h1>
            <p className="fade-in-up delay-200 mt-7 max-w-md text-base leading-relaxed text-muted md:text-lg">
              Premium skincare crafted for modern lifestyles — clean actives that blend elegance,
              science and everyday care.
            </p>
            <div className="fade-in-up delay-300 mt-9 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="rounded-full bg-brand px-8 py-4 text-sm tracking-widest text-white transition-colors duration-300 hover:bg-gold"
              >
                Explore Collection
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-brand px-8 py-4 text-sm tracking-widest text-brand transition-all duration-300 hover:bg-brand hover:text-white"
              >
                Our Story
              </Link>
            </div>
            <div className="fade-in-up delay-400 mt-12 flex flex-wrap gap-x-6 gap-y-3">
              {trust.map((t) => (
                <span key={t} className="flex items-center gap-2 text-xs tracking-wide text-muted">
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="fade-in relative flex justify-center">
            <div className="relative w-full max-w-md">
              <div
                className="absolute inset-0 -z-10 rounded-[2.5rem] blur-3xl"
                style={{ background: "radial-gradient(circle at 60% 40%, rgba(200,169,104,0.35), transparent 70%)" }}
                aria-hidden
              />
              <div className="overflow-hidden rounded-[2.5rem] border border-line bg-gradient-to-br from-sand to-surface p-8">
                <Image
                  src="/products/mainpage.png"
                  alt="Gentelle luxury skincare collection"
                  width={600}
                  height={600}
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="h-auto w-full object-contain drop-shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-5 -left-3 rounded-2xl border border-line bg-surface/95 px-5 py-3 shadow-lg backdrop-blur sm:-left-6">
                <p className="text-[10px] uppercase tracking-widest text-gold">Best Seller</p>
                <p className="font-serif text-sm font-semibold text-ink">Gold Face Wash · ₹399</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── TRUST MARQUEE ───────────── */}
      <div className="overflow-hidden border-y border-line bg-brand py-4">
        <div className="flex w-max gap-12 [animation:marquee_24s_linear_infinite]">
          {Array.from({ length: 6 }).flatMap(() => trust).map((t, i) => (
            <span key={i} className="text-xs uppercase tracking-[0.35em] text-gold-light">
              {t} &nbsp;·
            </span>
          ))}
        </div>
      </div>

      {/* ───────────── BESTSELLER SPOTLIGHT ───────────── */}
      <section className="bg-canvas py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-2">
          <Reveal>
            <ProductMedia product={hero} priority sizes="(max-width: 1024px) 90vw, 45vw" />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">The Hero Product</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-ink md:text-5xl">
              {hero.name}
            </h2>
            <div className="divider-gold mt-5" />
            <p className="mt-6 text-base leading-8 text-muted">{hero.description}</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {hero.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-ink">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-5">
              <span className="font-serif text-3xl font-semibold text-brand">{hero.priceLabel}</span>
              <span className="text-xs text-faint">Taxes included · Free shipping over ₹499</span>
            </div>
            <div className="mt-7">
              <AddToCart productId={hero.id} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── FEATURED COLLECTION ───────────── */}
      <section className="bg-sand/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="text-center">
            <p className="eyebrow">Featured Collection</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-ink md:text-5xl">
              Discover Your Ritual
            </h2>
            <div className="divider-gold center mt-6" />
          </Reveal>
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} priority={i === 0} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="rounded-full border border-brand px-8 py-3.5 text-sm tracking-widest text-brand transition-all duration-300 hover:bg-brand hover:text-white"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── INGREDIENTS ───────────── */}
      <section className="bg-canvas py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="text-center">
            <p className="eyebrow">Clean by Design</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-ink md:text-5xl">
              Ingredients That Earn Their Place
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted">
              No fillers, no guesswork. Every active is chosen for what it does for your skin.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ingredients.map((ing, i) => (
              <Reveal key={ing.name} delay={i * 60}>
                <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-gold/50">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                    <LeafIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-serif text-base font-semibold text-ink">{ing.name}</p>
                    <p className="text-sm text-muted">{ing.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── BENEFITS / PILLARS ───────────── */}
      <section className="bg-sand/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="text-center">
            <p className="eyebrow">Why Gentelle</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-ink md:text-5xl">
              Skincare with Integrity
            </h2>
            <div className="divider-gold center mt-6" />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="h-full rounded-3xl border border-line bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-tint text-brand">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── BRAND STORY ───────────── */}
      <section className="bg-canvas py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-10 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-[2.5rem] border border-line bg-gradient-to-br from-brand-tint to-surface p-10">
              <Image
                src="/products/serum.png"
                alt="Gentelle formulation philosophy"
                width={560}
                height={560}
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="h-auto w-full object-contain drop-shadow-xl"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Our Philosophy</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-ink md:text-5xl">
              Beauty Through Simplicity
            </h2>
            <div className="divider-gold mt-6" />
            <p className="mt-6 text-base leading-8 text-muted">
              Gentelle was born from a belief that great skin doesn&apos;t need a cabinet full of
              products — it needs the right ones, carefully formulated and honestly made.
            </p>
            <p className="mt-4 text-base leading-8 text-muted">
              We obsess over every ingredient, texture and moment your skin meets ours. That
              obsession is what makes Gentelle different.
            </p>
            <Link
              href="/about"
              className="mt-9 inline-block rounded-full bg-brand px-8 py-4 text-sm tracking-widest text-white transition-colors duration-300 hover:bg-gold"
            >
              Read Our Story
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────────── TESTIMONIALS ───────────── */}
      <section className="grain-dark bg-brand py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="text-center">
            <p className="eyebrow text-gold-light">What They Say</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-white md:text-5xl">
              Loved by Real Skin
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <figure className="h-full rounded-3xl border border-white/10 bg-white/5 p-8">
                  <div className="font-serif text-3xl leading-none text-gold-light">&ldquo;</div>
                  <blockquote className="mt-3 text-sm leading-7 text-white/85">{t.quote}</blockquote>
                  <figcaption className="mt-6 border-t border-white/10 pt-5">
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="mt-0.5 text-xs text-white/50">{t.location}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── FINAL CTA ───────────── */}
      <section className="bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <p className="eyebrow">Begin Your Ritual</p>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-ink md:text-6xl">
              Your Skin Deserves the Best
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
              Explore premium skincare designed to elevate every step of your daily ritual.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="rounded-full bg-brand px-10 py-4 text-sm tracking-widest text-white transition-colors duration-300 hover:bg-gold"
              >
                Shop the Collection
              </Link>
              <a
                href={whatsappUrl("Hi Gentelle, I'd like some skincare advice.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-brand px-10 py-4 text-sm tracking-widest text-brand transition-all duration-300 hover:bg-brand hover:text-white"
              >
                Get Advice on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
