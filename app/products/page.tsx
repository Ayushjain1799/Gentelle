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
      <section className="bg-sand px-5 pb-16 pt-32 text-center md:px-10 md:pt-40">
        <p className="eyebrow">Our Collection</p>
        <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight text-ink md:text-7xl">
          Luxury Skincare
        </h1>
        <div className="divider-gold center mt-6" />
        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Each product is formulated with a single purpose — to make your skin healthier, more
          radiant, and completely confident.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={(i % 3) * 80}>
              <ProductCard product={product} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
