import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductMedia from "@/components/product/ProductMedia";
import ProductCard from "@/components/product/ProductCard";
import AddToCart from "@/components/product/AddToCart";
import WaitlistForm from "@/components/product/WaitlistForm";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { products, getProduct } from "@/lib/products";
import { siteConfig } from "@/lib/config";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: {
      title: `${product.name} | Gentelle`,
      description: product.shortDescription,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const isAvailable = product.status === "available";
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  const fillRelated = related.length
    ? related
    : products.filter((p) => p.id !== product.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `${siteConfig.url}${product.image}`,
    description: product.description,
    brand: { "@type": "Brand", name: "Gentelle" },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/products/${product.id}`,
      priceCurrency: "INR",
      price: product.priceInPaise ? (product.priceInPaise / 100).toFixed(2) : "0",
      availability: isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="wrap" style={{ maxWidth: "72rem", paddingTop: "7rem", paddingBottom: "5rem" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-xs text-muted">
          <Link href="/" className="transition-colors hover:text-brand">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/products" className="transition-colors hover:text-brand">Shop</Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <ProductMedia product={product} priority sizes="(max-width: 768px) 90vw, 45vw" />
            {product.gallery && product.gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {product.gallery.slice(1).map((src) => (
                  <div key={src} className="aspect-square overflow-hidden rounded-2xl border border-line bg-surface">
                    <Image
                      src={src}
                      alt={`${product.name} — additional view`}
                      width={420}
                      height={420}
                      sizes="(max-width: 768px) 30vw, 15vw"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="eyebrow">{product.tagline}</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-ink md:text-5xl">
              {product.name}
            </h1>
            <div className="divider-gold mt-5" />
            <p className="mt-6 text-sm leading-8 text-muted">{product.description}</p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-ink">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-5">
              <span className="font-serif text-3xl font-semibold text-brand">
                {product.priceLabel}
              </span>
              {isAvailable && (
                <span className="text-xs text-faint">Taxes included · Free shipping over ₹499</span>
              )}
            </div>

            <div className="mt-8">
              {isAvailable ? (
                <AddToCart productId={product.id} />
              ) : (
                <div className="rounded-2xl border border-line bg-surface p-6">
                  <p className="mb-1 inline-flex rounded-full bg-ink/85 px-3 py-1 text-[10px] uppercase tracking-widest text-white">
                    Coming Soon
                  </p>
                  <div className="mt-4">
                    <WaitlistForm productId={product.id} productName={product.name} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ingredients + How to use */}
        <div className="mt-20 grid gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-ink">Key Ingredients</h2>
            <div className="divider-gold mt-4" />
            <ul className="mt-6 space-y-4">
              {product.ingredients.map((ing) => (
                <li key={ing.name} className="flex justify-between gap-4 border-b border-line pb-4">
                  <span className="font-medium text-ink">{ing.name}</span>
                  <span className="text-right text-sm text-muted">{ing.role}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-2xl font-semibold text-ink">How to Use</h2>
            <div className="divider-gold mt-4" />
            <ol className="mt-6 space-y-4">
              {product.howToUse.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-tint text-xs font-semibold text-brand">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-7 text-muted">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>

      {/* Related */}
      <section className="bg-sand/40 py-16 md:py-20">
        <div className="wrap">
          <h2 className="text-center font-serif text-3xl font-semibold text-ink">You May Also Like</h2>
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {fillRelated.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
