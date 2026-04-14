"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/types/product";

export interface CartLine {
  key: string;
  productId: string;
  variantId: number;
  name: string;
  sizeLabel: string;
  unitPrice: number;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addLine: (product: Product, size: string, qty?: number) => boolean;
  setQuantity: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "lilas-fund-cart-v1";

function loadInitial(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(loadInitial());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addLine = useCallback((product: Product, size: string, qty = 1) => {
    const variantId = product.printfulVariantIds[size];
    if (variantId == null) {
      return false;
    }
    const key = `${product.id}-${variantId}`;
    setLines((prev) => {
      const i = prev.findIndex((l) => l.key === key);
      if (i >= 0) {
        const next = [...prev];
        next[i] = {
          ...next[i],
          quantity: next[i].quantity + qty,
        };
        return next;
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          variantId,
          name: product.name,
          sizeLabel: size,
          unitPrice: product.price,
          quantity: qty,
        },
      ];
    });
    return true;
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    if (quantity < 1) {
      setLines((prev) => prev.filter((l) => l.key !== key));
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.key === key ? { ...l, quantity } : l))
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((s, l) => s + l.quantity, 0),
    [lines]
  );
  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0),
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      itemCount,
      subtotal,
      addLine,
      setQuantity,
      removeLine,
      clear,
    }),
    [lines, itemCount, subtotal, addLine, setQuantity, removeLine, clear]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
