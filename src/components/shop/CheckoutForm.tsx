"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  getCheckoutApiUrl,
  submitCheckout,
  type CheckoutRecipient,
} from "@/lib/checkout-api";
import Button from "@/components/ui/Button";

const emptyRecipient: CheckoutRecipient = {
  name: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state_code: "",
  country_code: "US",
  zip: "",
};

export default function CheckoutForm() {
  const { lines, subtotal, clear } = useCart();
  const [recipient, setRecipient] = useState<CheckoutRecipient>(emptyRecipient);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orderRef, setOrderRef] = useState<string | null>(null);

  const configured = Boolean(getCheckoutApiUrl());

  const handleChange = (field: keyof CheckoutRecipient, value: string) => {
    setRecipient((r) => ({ ...r, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatus("submitting");

    const items = lines.map((l) => ({
      variant_id: l.variantId,
      quantity: l.quantity,
    }));

    const result = await submitCheckout({ recipient, items });

    if (result.ok) {
      clear();
      setOrderRef(
        result.printfulOrderId != null
          ? String(result.printfulOrderId)
          : result.externalId ?? null
      );
      setStatus("success");
      setRecipient(emptyRecipient);
      return;
    }

    setStatus("error");
    setErrorMessage(result.error);
  };

  if (lines.length === 0 && status !== "success") {
    return (
      <div className="text-center py-12 max-w-lg mx-auto">
        <p className="text-charcoal-light text-lg mb-6">
          Your cart is empty. Add items before checkout.
        </p>
        <Button href="/shop/">Go to shop</Button>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="max-w-lg mx-auto text-center py-8">
        <h2 className="text-2xl font-bold text-charcoal font-[family-name:var(--font-heading)] mb-3">
          Thank you!
        </h2>
        <p className="text-charcoal-light mb-2">
          Your order has been submitted for fulfillment.
        </p>
        {orderRef && (
          <p className="text-sm text-charcoal mb-6">Order reference: {orderRef}</p>
        )}
        <Button href="/shop/">Back to shop</Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {!configured && (
        <p className="mb-6 p-4 rounded-xl bg-cream border border-cream-dark text-sm text-charcoal">
          Checkout API URL is not set. Add{" "}
          <code className="text-xs bg-white px-1 py-0.5 rounded">
            NEXT_PUBLIC_CHECKOUT_API_URL
          </code>{" "}
          to your environment and deploy the serverless handler (see
          PRINTFUL_SETUP.md in the repository). You can still review this form
          locally.
        </p>
      )}

      <div className="mb-8 p-4 rounded-xl bg-white border border-cream-dark">
        <p className="font-semibold text-charcoal mb-2">Order summary</p>
        <ul className="text-sm text-charcoal-light space-y-1 mb-3">
          {lines.map((l) => (
            <li key={l.key} className="flex justify-between gap-4">
              <span>
                {l.name} × {l.quantity}{" "}
                <span className="text-charcoal/70">({l.sizeLabel})</span>
              </span>
              <span className="tabular-nums">
                ${(l.unitPrice * l.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-lg font-bold text-charcoal border-t border-cream-dark pt-3">
          Total{" "}
          <span className="text-rose-primary tabular-nums">
            ${subtotal.toFixed(2)}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="co-name"
            className="block text-sm font-semibold text-charcoal mb-1"
          >
            Full name
          </label>
          <input
            id="co-name"
            required
            value={recipient.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full rounded-lg border border-cream-dark px-3 py-2 text-charcoal"
            autoComplete="name"
          />
        </div>
        <div>
          <label
            htmlFor="co-email"
            className="block text-sm font-semibold text-charcoal mb-1"
          >
            Email
          </label>
          <input
            id="co-email"
            type="email"
            required
            value={recipient.email ?? ""}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full rounded-lg border border-cream-dark px-3 py-2 text-charcoal"
            autoComplete="email"
          />
        </div>
        <div>
          <label
            htmlFor="co-phone"
            className="block text-sm font-semibold text-charcoal mb-1"
          >
            Phone <span className="font-normal text-charcoal-light">(optional)</span>
          </label>
          <input
            id="co-phone"
            type="tel"
            value={recipient.phone ?? ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full rounded-lg border border-cream-dark px-3 py-2 text-charcoal"
            autoComplete="tel"
          />
        </div>
        <div>
          <label
            htmlFor="co-address1"
            className="block text-sm font-semibold text-charcoal mb-1"
          >
            Address line 1
          </label>
          <input
            id="co-address1"
            required
            value={recipient.address1}
            onChange={(e) => handleChange("address1", e.target.value)}
            className="w-full rounded-lg border border-cream-dark px-3 py-2 text-charcoal"
            autoComplete="address-line1"
          />
        </div>
        <div>
          <label
            htmlFor="co-address2"
            className="block text-sm font-semibold text-charcoal mb-1"
          >
            Address line 2 <span className="font-normal text-charcoal-light">(optional)</span>
          </label>
          <input
            id="co-address2"
            value={recipient.address2 ?? ""}
            onChange={(e) => handleChange("address2", e.target.value)}
            className="w-full rounded-lg border border-cream-dark px-3 py-2 text-charcoal"
            autoComplete="address-line2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="co-city"
              className="block text-sm font-semibold text-charcoal mb-1"
            >
              City
            </label>
            <input
              id="co-city"
              required
              value={recipient.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="w-full rounded-lg border border-cream-dark px-3 py-2 text-charcoal"
              autoComplete="address-level2"
            />
          </div>
          <div>
            <label
              htmlFor="co-state"
              className="block text-sm font-semibold text-charcoal mb-1"
            >
              State / Province code
            </label>
            <input
              id="co-state"
              required
              placeholder="e.g. MI"
              value={recipient.state_code}
              onChange={(e) =>
                handleChange("state_code", e.target.value.toUpperCase())
              }
              className="w-full rounded-lg border border-cream-dark px-3 py-2 text-charcoal uppercase"
              maxLength={6}
              autoComplete="address-level1"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="co-zip"
              className="block text-sm font-semibold text-charcoal mb-1"
            >
              ZIP / Postal code
            </label>
            <input
              id="co-zip"
              required
              value={recipient.zip}
              onChange={(e) => handleChange("zip", e.target.value)}
              className="w-full rounded-lg border border-cream-dark px-3 py-2 text-charcoal"
              autoComplete="postal-code"
            />
          </div>
          <div>
            <label
              htmlFor="co-country"
              className="block text-sm font-semibold text-charcoal mb-1"
            >
              Country code
            </label>
            <input
              id="co-country"
              required
              placeholder="US"
              value={recipient.country_code}
              onChange={(e) =>
                handleChange("country_code", e.target.value.toUpperCase())
              }
              className="w-full rounded-lg border border-cream-dark px-3 py-2 text-charcoal uppercase"
              maxLength={2}
              autoComplete="country"
            />
          </div>
        </div>

        {errorMessage && (
          <p className="text-sm text-red-600" role="alert">
            {errorMessage}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button href="/shop/cart/" variant="outline">
            Back to cart
          </Button>
          <Button
            type="submit"
            disabled={status === "submitting"}
            className="sm:flex-1"
          >
            {status === "submitting" ? "Placing order…" : "Place order"}
          </Button>
        </div>
      </form>
    </div>
  );
}
