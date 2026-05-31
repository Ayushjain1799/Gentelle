import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse the full Gentelle collection — luxury skincare crafted with clean science for radiant, confident skin.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <section className="bg-sand text-center" style={{ paddingTop: "8rem", paddingBottom: "4rem" }}>
        <div className="wrap">
          <p className="eyebrow">Our Collection</p>
          <h1 className="font-serif font-semibold leading-tight text-ink" style={{ marginTop: "1rem", fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
            Luxury Skincare
          </h1>
          <div className="divider-gold center" style={{ marginTop: "1.5rem" }} />
          <p className="text-muted" style={{ marginTop: "1.75rem", maxWidth: "32rem", marginInline: "auto", lineHeight: 1.8, fontSize: "1.0625rem" }}>
            Each product is formulated with a single purpose — to make your skin healthier, more
            radiant, and completely confident.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
        <div className="wrap">
          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))" }}>
            {products.map((product, i) => (
              <Reveal key={product.id} delay={(i % 3) * 80}>
                <ProductCard product={product} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
