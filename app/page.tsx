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
  { name: "Gold Powder", role: "Radiance & luminosity" },
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
        <div
          className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 lg:block"
          style={{
            background: "linear-gradient(160deg, var(--color-sand) 0%, var(--color-canvas) 100%)",
            clipPath: "polygon(22% 0, 100% 0, 100% 100%, 4% 100%)",
          }}
          aria-hidden
        />
        {/* hero inner — .wrap gives reliable horizontal padding */}
        <div
          className="wrap relative grid items-center gap-12 lg:grid-cols-2"
          style={{ paddingTop: "8rem", paddingBottom: "4rem" }}
        >
          <div>
            <p className="eyebrow fade-in-up">Luxury Skincare · Est. 2024</p>
            <h1
              className="fade-in-up delay-100 font-serif font-semibold leading-[1.08] tracking-tight text-ink"
              style={{ marginTop: "1.5rem", fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Gentle Care.
              <br />
              <span className="gold-shimmer">Elevated</span> Ritual.
            </h1>
            <p
              className="fade-in-up delay-200 text-muted"
              style={{ marginTop: "1.75rem", maxWidth: "28rem", fontSize: "1.0625rem", lineHeight: 1.75 }}
            >
              Premium skincare crafted for modern lifestyles — clean actives that blend elegance,
              science and everyday care.
            </p>
            <div className="fade-in-up delay-300" style={{ marginTop: "2.25rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Link href="/products" className="btn-primary">
                Explore Collection
              </Link>
              <Link href="/about" className="btn-outline">
                Our Story
              </Link>
            </div>
            <div className="fade-in-up delay-400" style={{ marginTop: "3rem", display: "flex", flexWrap: "wrap", gap: "0.75rem 1.5rem" }}>
              {trust.map((t) => (
                <span key={t} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", letterSpacing: "0.04em", color: "var(--color-muted)" }}>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--color-gold)", flexShrink: 0 }} />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="fade-in relative flex justify-center">
            <div className="relative w-full" style={{ maxWidth: "28rem" }}>
              <div
                className="absolute inset-0 -z-10 rounded-[2.5rem] blur-3xl"
                style={{ background: "radial-gradient(circle at 60% 40%, rgba(200,169,104,0.3), transparent 70%)" }}
                aria-hidden
              />
              <div
                className="overflow-hidden rounded-[2.5rem]"
                style={{
                  border: "1px solid var(--color-line)",
                  boxShadow: "0 40px 90px -40px rgba(26,25,23,0.4)",
                }}
              >
                <Image
                  src="/products/gold-glow-styled.png"
                  alt="Gentelle Gold Glow Face Wash — radiance boosting daily cleanser"
                  width={627}
                  height={627}
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="h-auto w-full object-cover"
                />
              </div>
              <div
                className="absolute rounded-2xl"
                style={{
                  bottom: "-1.25rem",
                  left: "-1rem",
                  border: "1px solid var(--color-line)",
                  background: "rgba(255,255,255,0.95)",
                  padding: "0.75rem 1.25rem",
                  boxShadow: "0 8px 32px -8px rgba(26,25,23,0.14)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <p style={{ fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-gold)" }}>Best Seller</p>
                <p className="font-serif" style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-ink)" }}>Gold Glow Face Wash · ₹399</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── TRUST MARQUEE ───────────── */}
      <div className="overflow-hidden border-y border-line bg-brand" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
        <div style={{ display: "flex", width: "max-content", animation: "marquee 24s linear infinite" }}>
          {Array.from({ length: 6 }).flatMap(() => trust).map((t, i) => (
            <span key={i} style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.35em", color: "var(--color-gold-light)", marginRight: "3rem", whiteSpace: "nowrap" }}>
              {t} &nbsp;·
            </span>
          ))}
        </div>
      </div>

      {/* ───────────── BESTSELLER SPOTLIGHT ───────────── */}
      <section className="bg-canvas" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <ProductMedia product={hero} priority sizes="(max-width: 1024px) 90vw, 45vw" />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">The Hero Product</p>
            <h2 className="font-serif font-semibold text-ink" style={{ marginTop: "1rem", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              {hero.name}
            </h2>
            <div className="divider-gold" style={{ marginTop: "1.25rem" }} />
            <p className="text-muted" style={{ marginTop: "1.5rem", lineHeight: 2, fontSize: "1rem" }}>{hero.description}</p>
            <ul className="grid gap-3" style={{ marginTop: "1.75rem" }}>
              {hero.benefits.map((b) => (
                <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontSize: "0.875rem", color: "var(--color-ink)" }}>
                  <span style={{ marginTop: "0.4rem", width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-gold)", flexShrink: 0 }} />
                  {b}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <span className="font-serif font-semibold text-brand" style={{ fontSize: "1.875rem" }}>{hero.priceLabel}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--color-faint)" }}>Taxes included · Free shipping over ₹499</span>
            </div>
            <div style={{ marginTop: "1.75rem" }}>
              <AddToCart productId={hero.id} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── FEATURED COLLECTION ───────────── */}
      <section style={{ background: "var(--color-sand)", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="wrap">
          <Reveal className="text-center">
            <p className="eyebrow">Featured Collection</p>
            <h2 className="font-serif font-semibold text-ink" style={{ marginTop: "1rem", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Discover Your Ritual
            </h2>
            <div className="divider-gold center" style={{ marginTop: "1.5rem" }} />
          </Reveal>
          <div className="grid gap-6" style={{ marginTop: "3.5rem", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))" }}>
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} priority={i === 0} />
              </Reveal>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: "3rem" }}>
            <Link href="/products" className="btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── INGREDIENTS ───────────── */}
      <section className="bg-canvas" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="wrap">
          <Reveal className="text-center">
            <p className="eyebrow">Clean by Design</p>
            <h2 className="font-serif font-semibold text-ink" style={{ marginTop: "1rem", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Ingredients That Earn Their Place
            </h2>
            <p className="text-muted" style={{ marginTop: "1.25rem", maxWidth: "36rem", marginInline: "auto", lineHeight: 2 }}>
              No fillers, no guesswork. Every active is chosen for what it does for your skin.
            </p>
          </Reveal>
          <div className="grid gap-4" style={{ marginTop: "3.5rem", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))" }}>
            {ingredients.map((ing, i) => (
              <Reveal key={ing.name} delay={i * 60}>
                <div
                  className="flex items-center gap-4 rounded-2xl bg-surface transition-colors"
                  style={{ padding: "1.25rem", border: "1px solid var(--color-line)" }}
                >
                  <span
                    className="grid shrink-0 place-items-center rounded-full text-brand"
                    style={{ width: "2.75rem", height: "2.75rem", background: "var(--color-brand-tint)" }}
                  >
                    <LeafIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-serif font-semibold text-ink" style={{ fontSize: "0.9375rem" }}>{ing.name}</p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--color-muted)" }}>{ing.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── BENEFITS / PILLARS ───────────── */}
      <section style={{ background: "var(--color-sand)", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="wrap">
          <Reveal className="text-center">
            <p className="eyebrow">Why Gentelle</p>
            <h2 className="font-serif font-semibold text-ink" style={{ marginTop: "1rem", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Skincare with Integrity
            </h2>
            <div className="divider-gold center" style={{ marginTop: "1.5rem" }} />
          </Reveal>
          <div className="grid gap-5" style={{ marginTop: "3.5rem", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))" }}>
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div
                  className="h-full rounded-3xl bg-surface transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                  style={{ padding: "1.75rem", border: "1px solid var(--color-line)" }}
                >
                  <span
                    className="grid place-items-center rounded-2xl text-brand"
                    style={{ width: "3rem", height: "3rem", background: "var(--color-brand-tint)" }}
                  >
                    <p.icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-serif font-semibold text-ink" style={{ marginTop: "1.5rem", fontSize: "1.15rem" }}>{p.title}</h3>
                  <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", lineHeight: 1.7, color: "var(--color-muted)" }}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── BRAND STORY ───────────── */}
      <section className="bg-canvas" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div
              className="overflow-hidden rounded-[2.5rem]"
              style={{ border: "1px solid var(--color-line)", background: "linear-gradient(145deg, var(--color-brand-tint) 0%, var(--color-surface) 100%)", padding: "2.5rem" }}
            >
              <Image
                src="/products/serum.png"
                alt="Gentelle formulation philosophy"
                width={560}
                height={560}
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="h-auto w-full object-contain"
                style={{ filter: "drop-shadow(0 12px 32px rgba(26,25,23,0.12))" }}
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Our Philosophy</p>
            <h2 className="font-serif font-semibold leading-tight text-ink" style={{ marginTop: "1rem", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Beauty Through Simplicity
            </h2>
            <div className="divider-gold" style={{ marginTop: "1.5rem" }} />
            <p className="text-muted" style={{ marginTop: "1.5rem", lineHeight: 2 }}>
              Gentelle was born from a belief that great skin doesn&apos;t need a cabinet full of
              products — it needs the right ones, carefully formulated and honestly made.
            </p>
            <p className="text-muted" style={{ marginTop: "1rem", lineHeight: 2 }}>
              We obsess over every ingredient, texture and moment your skin meets ours. That
              obsession is what makes Gentelle different.
            </p>
            <Link href="/about" className="btn-primary" style={{ marginTop: "2.25rem" }}>
              Read Our Story
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────────── TESTIMONIALS ───────────── */}
      <section className="grain-dark bg-brand" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="wrap">
          <Reveal className="text-center">
            <p className="eyebrow" style={{ color: "var(--color-gold-light)" }}>What They Say</p>
            <h2 className="font-serif font-semibold text-white" style={{ marginTop: "1rem", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Loved by Real Skin
            </h2>
          </Reveal>
          <div className="grid gap-6" style={{ marginTop: "3.5rem", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))" }}>
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <figure
                  className="h-full rounded-3xl"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", padding: "2rem" }}
                >
                  <div className="font-serif text-gold-light" style={{ fontSize: "2rem", lineHeight: 1 }}>&ldquo;</div>
                  <blockquote style={{ marginTop: "0.75rem", fontSize: "0.875rem", lineHeight: 1.75, color: "rgba(255,255,255,0.82)" }}>{t.quote}</blockquote>
                  <figcaption style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.25rem" }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#fff" }}>{t.name}</p>
                    <p style={{ marginTop: "0.125rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>{t.location}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── FINAL CTA ───────────── */}
      <section style={{ background: "var(--color-sand-deep)", paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div className="wrap text-center" style={{ maxWidth: "48rem" }}>
          <Reveal>
            <p className="eyebrow">Begin Your Ritual</p>
            <h2 className="font-serif font-semibold leading-tight text-ink" style={{ marginTop: "1.25rem", fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}>
              Your Skin Deserves the Best
            </h2>
            <p className="text-muted" style={{ marginTop: "1.5rem", maxWidth: "28rem", marginInline: "auto", lineHeight: 1.75 }}>
              Explore premium skincare designed to elevate every step of your daily ritual.
            </p>
            <div style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              <Link href="/products" className="btn-primary">
                Shop the Collection
              </Link>
              <a
                href={whatsappUrl("Hi Gentelle, I'd like some skincare advice.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
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
