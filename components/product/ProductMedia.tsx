import Image from "next/image";
import type { Product } from "@/lib/products";

/**
 * Elevated framing for product photography. Wraps the existing PNG in a
 * soft gradient stage with a glow tuned to each product's accent color,
 * plus a subtle botanical motif. Designed so real photography can be
 * dropped in later with no layout change.
 */
export default function ProductMedia({
  product,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
  className = "",
  rounded = "rounded-3xl",
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{
        background: `linear-gradient(150deg, ${product.accent}22 0%, var(--color-sand) 55%, var(--color-surface) 100%)`,
      }}
    >
      {/* accent glow */}
      <div
        className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl opacity-60"
        style={{ background: product.accent }}
        aria-hidden
      />
      {/* botanical hairline motif */}
      <svg
        className="pointer-events-none absolute bottom-3 left-3 h-16 w-16 opacity-20"
        viewBox="0 0 64 64"
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="1"
        aria-hidden
      >
        <path d="M52 12C24 12 12 24 12 52M12 52c20-2 34-14 38-36" strokeLinecap="round" />
      </svg>

      <div className="relative flex items-center justify-center p-8">
        <Image
          src={product.image}
          alt={`${product.name} — ${product.tagline}`}
          width={420}
          height={420}
          priority={priority}
          sizes={sizes}
          className="h-auto w-full max-w-[280px] object-contain drop-shadow-xl"
        />
      </div>
    </div>
  );
}
