import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductMedia from "./ProductMedia";
import QuickAddButton from "./QuickAddButton";
import { ArrowRightIcon } from "@/components/icons";

/**
 * Premium product card. Two states:
 *  - available: price + quick add-to-cart
 *  - coming-soon: prominent badge + "Notify Me" link to the waitlist
 */
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
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_18px_50px_-20px_rgba(169,134,63,0.35)]">
      <Link href={href} className="relative block" aria-label={product.name}>
        <ProductMedia
          product={product}
          priority={priority}
          rounded="rounded-none"
          className="aspect-square"
        />
        {/* status badge */}
        {product.badge && isAvailable && (
          <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-[10px] uppercase tracking-widest text-white">
            {product.badge}
          </span>
        )}
        {!isAvailable && (
          <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-[10px] uppercase tracking-widest text-white backdrop-blur">
            Coming Soon
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow mb-2">{product.category}</p>
        <h3 className="font-serif text-xl font-semibold text-ink">
          <Link href={href} className="transition-colors hover:text-brand">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {product.shortDescription}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="font-serif text-lg font-semibold text-brand">
            {product.priceLabel}
          </span>

          {isAvailable ? (
            <QuickAddButton productId={product.id} />
          ) : (
            <Link
              href={`${href}#notify`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs tracking-widest text-ink transition-colors duration-300 hover:border-gold hover:text-gold"
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
