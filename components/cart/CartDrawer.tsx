"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart/CartContext";
import { CloseIcon, PlusIcon, MinusIcon, CartIcon } from "@/components/icons";

export default function CartDrawer() {
  const { lines, count, subtotalLabel, isOpen, closeCart, setQty, remove } = useCart();

  // Lock scroll + close on Escape while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-canvas shadow-2xl transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-serif text-lg font-semibold text-ink">
            Your Cart {count > 0 && <span className="text-muted">({count})</span>}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:text-gold"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-sand text-muted">
              <CartIcon className="h-7 w-7" />
            </span>
            <p className="text-sm text-muted">Your cart is empty.</p>
            <Link
              href="/products"
              onClick={closeCart}
              className="rounded-full bg-brand px-6 py-3 text-xs tracking-widest text-white transition-colors hover:bg-gold"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {lines.map((line) => (
                <li key={line.productId} className="flex gap-4 py-5">
                  <div
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl"
                    style={{ background: `${line.product.accent}22` }}
                  >
                    <Image
                      src={line.product.image}
                      alt={line.product.name}
                      width={80}
                      height={80}
                      sizes="80px"
                      className="h-full w-full object-contain p-2"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <p className="font-serif text-sm font-semibold text-ink">
                        {line.product.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => remove(line.productId)}
                        className="text-xs text-faint underline-offset-2 hover:text-danger hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-xs text-muted">{line.product.priceLabel}</p>
                    <div className="mt-auto flex items-center gap-2 pt-2">
                      <div className="inline-flex items-center rounded-full border border-line">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => setQty(line.productId, line.quantity - 1)}
                          className="grid h-8 w-8 place-items-center rounded-full hover:text-gold"
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => setQty(line.productId, line.quantity + 1)}
                          className="grid h-8 w-8 place-items-center rounded-full hover:text-gold"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-line px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted">Subtotal</span>
                <span className="font-serif text-lg font-semibold text-ink">
                  {subtotalLabel}
                </span>
              </div>
              <p className="mb-4 text-xs text-faint">
                Taxes included. Shipping calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block rounded-full bg-brand py-4 text-center text-sm tracking-widest text-white transition-colors hover:bg-gold"
              >
                Proceed to Checkout
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
