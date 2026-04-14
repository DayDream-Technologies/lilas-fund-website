"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";

export default function CartContents() {
  const { lines, subtotal, setQuantity, removeLine } = useCart();

  if (lines.length === 0) {
    return (
      <div className="text-center py-12 max-w-lg mx-auto">
        <p className="text-charcoal-light text-lg mb-6">Your cart is empty.</p>
        <Button href="/shop/">Browse the shop</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <ul className="divide-y divide-cream-dark border border-cream-dark rounded-2xl bg-white overflow-hidden">
        {lines.map((line) => (
          <li
            key={line.key}
            className="flex flex-col sm:flex-row sm:items-center gap-4 p-5"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-charcoal">{line.name}</p>
              <p className="text-sm text-charcoal-light">
                Size {line.sizeLabel} · ${line.unitPrice.toFixed(2)} each
              </p>
            </div>
            <div className="flex items-center gap-3 sm:justify-end">
              <label className="sr-only" htmlFor={`qty-${line.key}`}>
                Quantity for {line.name}
              </label>
              <input
                id={`qty-${line.key}`}
                type="number"
                min={1}
                max={99}
                value={line.quantity}
                onChange={(e) => {
                  const n = parseInt(e.target.value, 10);
                  if (!Number.isNaN(n)) setQuantity(line.key, n);
                }}
                className="w-16 rounded-lg border border-cream-dark px-2 py-1.5 text-center text-sm font-medium text-charcoal"
              />
              <p className="w-24 text-right font-semibold text-charcoal tabular-nums">
                ${(line.unitPrice * line.quantity).toFixed(2)}
              </p>
              <button
                type="button"
                onClick={() => removeLine(line.key)}
                className="p-2 rounded-lg text-charcoal-light hover:text-rose-primary hover:bg-cream transition-colors"
                aria-label={`Remove ${line.name} from cart`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-xl font-bold text-charcoal">
          Subtotal{" "}
          <span className="text-rose-primary tabular-nums">
            ${subtotal.toFixed(2)}
          </span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button href="/shop/" variant="outline">
            Continue shopping
          </Button>
          <Button href="/shop/checkout/">Checkout</Button>
        </div>
      </div>
    </div>
  );
}
