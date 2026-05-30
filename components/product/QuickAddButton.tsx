"use client";

import { useCart } from "@/lib/cart/CartContext";
import { CartIcon } from "@/components/icons";

/** Compact add-to-cart used on product cards for available items. */
export default function QuickAddButton({
  productId,
  label = "Add to Cart",
}: {
  productId: string;
  label?: string;
}) {
  const { add } = useCart();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        add(productId, 1);
      }}
      className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-xs tracking-widest text-white transition-colors duration-300 hover:bg-gold"
    >
      <CartIcon className="h-4 w-4" />
      {label}
    </button>
  );
}
