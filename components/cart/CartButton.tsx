"use client";

import { useCart } from "@/lib/cart/CartContext";
import { CartIcon } from "@/components/icons";

export default function CartButton({ className = "" }: { className?: string }) {
  const { count, openCart } = useCart();
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart${count ? `, ${count} item${count > 1 ? "s" : ""}` : ""}`}
      className={`relative grid h-10 w-10 place-items-center rounded-full text-brand transition-colors hover:text-gold ${className}`}
    >
      <CartIcon className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gold px-1 text-[10px] font-semibold leading-none text-white">
          {count}
        </span>
      )}
    </button>
  );
}
