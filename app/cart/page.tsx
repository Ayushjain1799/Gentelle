"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart/CartContext";
import { PlusIcon, MinusIcon } from "@/components/icons";

export default function CartPage() {
  const { lines, count, subtotalLabel, setQty, remove } = useCart();

  return (
    <div className="wrap" style={{ maxWidth: "56rem", paddingTop: "7rem", paddingBottom: "5rem" }}>
      <h1 className="font-serif text-4xl font-semibold text-ink md:text-5xl">Your Cart</h1>
      <div className="divider-gold mt-5" />

      {count === 0 ? (
        <div className="mt-12 rounded-3xl border border-line bg-surface p-12 text-center">
          <p className="text-muted">Your cart is currently empty.</p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-full bg-brand px-8 py-3.5 text-xs tracking-widest text-white transition-colors hover:bg-gold"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
          <ul className="divide-y divide-line">
            {lines.map((line) => (
              <li key={line.productId} className="flex gap-5 py-6">
                <div
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl"
                  style={{ background: `${line.product.accent}22` }}
                >
                  <Image
                    src={line.product.image}
                    alt={line.product.name}
                    width={96}
                    height={96}
                    sizes="96px"
                    className="h-full w-full object-contain p-2"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <Link
                      href={`/products/${line.productId}`}
                      className="font-serif text-lg font-semibold text-ink hover:text-brand"
                    >
                      {line.product.name}
                    </Link>
                    <span className="font-serif font-semibold text-brand">{line.product.priceLabel}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{line.product.category}</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="inline-flex items-center rounded-full border border-line">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(line.productId, line.quantity - 1)}
                        className="grid h-9 w-9 place-items-center rounded-full hover:text-gold"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm tabular-nums">{line.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQty(line.productId, line.quantity + 1)}
                        className="grid h-9 w-9 place-items-center rounded-full hover:text-gold"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.productId)}
                      className="text-xs text-faint underline-offset-2 hover:text-danger hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-3xl border border-line bg-surface p-7">
            <h2 className="font-serif text-lg font-semibold text-ink">Summary</h2>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="text-ink">{subtotalLabel}</span>
            </div>
            <p className="mt-2 text-xs text-faint">Taxes included. Shipping at checkout.</p>
            <Link
              href="/checkout"
              className="mt-6 block rounded-full bg-brand py-4 text-center text-sm tracking-widest text-white transition-colors hover:bg-gold"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/products"
              className="mt-3 block text-center text-xs tracking-widest text-muted hover:text-brand"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
