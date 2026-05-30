"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart/CartContext";
import { PlusIcon, MinusIcon, CartIcon } from "@/components/icons";

/** Full add-to-cart control for the product detail page. */
export default function AddToCart({ productId }: { productId: string }) {
  const { add, openCart } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(20, q + 1));

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {/* Quantity stepper */}
      <div className="inline-flex items-center rounded-full border border-line bg-surface">
        <button
          type="button"
          onClick={dec}
          aria-label="Decrease quantity"
          className="grid h-12 w-12 place-items-center rounded-full text-ink transition-colors hover:text-gold disabled:opacity-40"
          disabled={qty <= 1}
        >
          <MinusIcon className="h-4 w-4" />
        </button>
        <span className="w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">
          {qty}
        </span>
        <button
          type="button"
          onClick={inc}
          aria-label="Increase quantity"
          className="grid h-12 w-12 place-items-center rounded-full text-ink transition-colors hover:text-gold disabled:opacity-40"
          disabled={qty >= 20}
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => add(productId, qty)}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-sm tracking-widest text-white transition-colors duration-300 hover:bg-brand-dark"
      >
        <CartIcon className="h-4 w-4" />
        Add to Cart
      </button>

      <button
        type="button"
        onClick={() => {
          add(productId, qty);
          openCart();
          router.push("/checkout");
        }}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-brand px-8 py-4 text-sm tracking-widest text-brand transition-all duration-300 hover:bg-gold hover:border-gold hover:text-white"
      >
        Buy Now
      </button>
    </div>
  );
}
