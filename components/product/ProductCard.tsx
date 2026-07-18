import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
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
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface transition-all duration-500 hover:-translate-y-1"
      style={{
        border: "1px solid var(--color-line)",
        boxShadow: "0 2px 16px -4px rgba(26,25,23,0.06)",
      }}
    >
      {/* ── Image block ── */}
      <Link
        href={href}
        aria-label={`View ${product.name}`}
        className="relative block overflow-hidden"
        style={{ background: "linear-gradient(160deg, var(--color-sand) 0%, var(--color-surface) 100%)" }}
      >
        {product.imageStyle === "scene" ? (
          <div className="aspect-square w-full">
            <Image
              src={product.image}
              alt={`${product.name}`}
              width={420}
              height={420}
              priority={priority}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center" style={{ padding: "2rem", minHeight: "260px" }}>
            <Image
              src={product.image}
              alt={`${product.name}`}
              width={320}
              height={320}
              priority={priority}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              className="h-auto w-full object-contain transition-transform duration-700 group-hover:scale-105"
              style={{ maxWidth: "220px", maxHeight: "220px", filter: "drop-shadow(0 8px 24px rgba(26,25,23,0.14))" }}
            />
          </div>
        )}

        {/* Badge — lives inside the overflow-hidden image block */}
        {isAvailable && product.badge && (
          <span
            className="absolute left-3 top-3 rounded-full text-white"
            style={{
              background: "var(--color-brand)",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "0.25rem 0.75rem",
              fontWeight: 500,
            }}
          >
            {product.badge}
          </span>
        )}
        {!isAvailable && (
          <span
            className="absolute left-3 top-3 rounded-full text-white"
            style={{
              background: "rgba(26,25,23,0.72)",
              backdropFilter: "blur(8px)",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "0.25rem 0.75rem",
              fontWeight: 500,
            }}
          >
            Coming Soon
          </span>
        )}
      </Link>

      {/* ── Details block ── */}
      <div
        className="flex flex-1 flex-col"
        style={{ padding: "1.25rem 1.5rem 1.5rem" }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--color-gold)",
            fontWeight: 500,
            marginBottom: "0.5rem",
          }}
        >
          {product.category}
        </p>

        <h3
          className="font-serif font-semibold leading-snug"
          style={{ fontSize: "1.15rem", color: "var(--color-ink)", marginBottom: "0.375rem" }}
        >
          <Link href={href} className="transition-colors hover:text-brand">
            {product.name}
          </Link>
        </h3>

        <p
          className="flex-1 leading-relaxed"
          style={{
            fontSize: "0.825rem",
            color: "var(--color-muted)",
            marginBottom: "1.25rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.shortDescription}
        </p>

        {/* Price + CTA row */}
        <div
          className="flex items-center justify-between gap-2"
          style={{
            borderTop: "1px solid var(--color-line-soft)",
            paddingTop: "1rem",
          }}
        >
          <span
            className="font-serif font-semibold"
            style={{ fontSize: "1.2rem", color: "var(--color-brand)" }}
          >
            {product.priceLabel}
          </span>

          {isAvailable ? (
            <QuickAddButton productId={product.id} />
          ) : (
            <Link
              href={`${href}#notify`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full transition-colors duration-300"
              style={{
                border: "1px solid var(--color-line)",
                padding: "0.4rem 1rem",
                fontSize: "0.7rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-ink)",
              }}
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
