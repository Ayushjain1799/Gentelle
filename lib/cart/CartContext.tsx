"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Product } from "@/lib/products";

const STORAGE_KEY = "gentelle_cart_v1";

export type CartLine = { productId: string; quantity: number };
export type CartLineWithProduct = CartLine & { product: Product };

type State = { lines: CartLine[] };

type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; productId: string; quantity: number }
  | { type: "setQty"; productId: string; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "clear" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines };
    case "add": {
      const existing = state.lines.find((l) => l.productId === action.productId);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.productId === action.productId
              ? { ...l, quantity: Math.min(20, l.quantity + action.quantity) }
              : l,
          ),
        };
      }
      return {
        lines: [...state.lines, { productId: action.productId, quantity: action.quantity }],
      };
    }
    case "setQty": {
      if (action.quantity <= 0) {
        return { lines: state.lines.filter((l) => l.productId !== action.productId) };
      }
      return {
        lines: state.lines.map((l) =>
          l.productId === action.productId
            ? { ...l, quantity: Math.min(20, action.quantity) }
            : l,
        ),
      };
    }
    case "remove":
      return { lines: state.lines.filter((l) => l.productId !== action.productId) };
    case "clear":
      return { lines: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLineWithProduct[];
  count: number;
  subtotalPaise: number;
  subtotalLabel: string;
  add: (productId: string, quantity?: number) => void;
  setQty: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        const valid = parsed.filter((l) => getProduct(l.productId));
        dispatch({ type: "hydrate", lines: valid });
      }
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  // Persist whenever lines change (after hydration).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      /* storage may be unavailable */
    }
  }, [state.lines, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLineWithProduct[] = state.lines
      .map((l) => {
        const product = getProduct(l.productId);
        return product ? { ...l, product } : null;
      })
      .filter((l): l is CartLineWithProduct => l !== null);

    const count = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotalPaise = lines.reduce(
      (sum, l) => sum + (l.product.priceInPaise ?? 0) * l.quantity,
      0,
    );

    return {
      lines,
      count,
      subtotalPaise,
      subtotalLabel: formatINR(subtotalPaise),
      add: (productId, quantity = 1) => {
        dispatch({ type: "add", productId, quantity });
        setIsOpen(true);
      },
      setQty: (productId, quantity) => dispatch({ type: "setQty", productId, quantity }),
      remove: (productId) => dispatch({ type: "remove", productId }),
      clear: () => dispatch({ type: "clear" }),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [state.lines, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function formatINR(paise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}
