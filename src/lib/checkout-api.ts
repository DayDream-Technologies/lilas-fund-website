/**
 * Contract for POST `${NEXT_PUBLIC_CHECKOUT_API_URL}` (serverless that calls Printful).
 * @see serverless/printful-order/create-order.js
 */

export interface CheckoutRecipient {
  name: string;
  email?: string;
  phone?: string;
  address1: string;
  address2?: string;
  city: string;
  state_code: string;
  country_code: string;
  zip: string;
}

export interface CheckoutLineItem {
  variant_id: number;
  quantity: number;
}

export interface CheckoutRequestBody {
  recipient: CheckoutRecipient;
  items: CheckoutLineItem[];
}

export interface CheckoutSuccessResponse {
  ok: true;
  printfulOrderId?: number;
  externalId?: string;
  message?: string;
}

export interface CheckoutErrorResponse {
  ok: false;
  error: string;
  details?: unknown;
}

export type CheckoutResponse = CheckoutSuccessResponse | CheckoutErrorResponse;

export function getCheckoutApiUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_CHECKOUT_API_URL?.trim();
  return url || undefined;
}

export async function submitCheckout(
  body: CheckoutRequestBody
): Promise<CheckoutResponse> {
  const url = getCheckoutApiUrl();
  if (!url) {
    return {
      ok: false,
      error:
        "Checkout is not configured. Set NEXT_PUBLIC_CHECKOUT_API_URL in your environment.",
    };
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    const errMsg =
      typeof data.error === "string"
        ? data.error
        : `Request failed (${res.status})`;
    return { ok: false, error: errMsg, details: data };
  }

  if (data.ok === false) {
    return {
      ok: false,
      error: String(data.error ?? "Unknown error"),
      details: data,
    };
  }

  return {
    ok: true,
    printfulOrderId:
      typeof data.printfulOrderId === "number"
        ? data.printfulOrderId
        : undefined,
    externalId:
      typeof data.externalId === "string" ? data.externalId : undefined,
    message: typeof data.message === "string" ? data.message : undefined,
  };
}
