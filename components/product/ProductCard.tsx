import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductMedia from "./ProductMedia";
import QuickAddButton from "./QuickAddButton";
import { ArrowRightIcon } from "@/components/icons";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const isAvailable = product.status === "available";
  const href = `/products/${product.id}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_20px_60px_-20px_rgba(169,134,63,0.3)]">
      {/* Image area — overflow-hidden clips the absolute badges */}
      <div className="relative overflow-hidden">
        <Link href={href} aria-label={product.name}>
          <ProductMedia
            product={product}
            priority={priority}
            rounded="rounded-none"
            className="aspect-square"
          />
        </Link>

        {/* Badges — inside overflow-hidden container, never escape */}
        {product.badge && isAvailable && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-brand px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white shadow-sm">
            {product.badge}
          </span>
        )}
        {!isAvailable && (
          <span className="absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white shadow-sm backdrop-blur-sm" style={{ background: "rgba(28,27,25,0.75)" }}>
            Coming Soon
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="eyebrow mb-1.5 truncate">{product.category}</p>
        <h3 className="font-serif text-lg font-semibold leading-snug text-ink md:text-xl">
          <Link href={href} className="transition-colors hover:text-brand">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="mt-5 flex items-center justify-between gap-2 border-t border-line-soft pt-4">
          <span className="font-serif text-lg font-semibold text-brand">
            {product.priceLabel}
          </span>

          {isAvailable ? (
            <QuickAddButton productId={product.id} />
          ) : (
            <Link
              href={`${href}#notify`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs tracking-widest text-ink transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Notify Me
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
