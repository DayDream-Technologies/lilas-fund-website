import { SQUARE_APP_ID, SQUARE_LOCATION_ID } from "./constants";

/**
 * Generates a Square Online Checkout URL for a donation.
 * In production, you'd create a checkout link via the Square API.
 * For a static site, we redirect to a pre-configured Square payment link.
 */
export function getDonationCheckoutUrl(
  amount: number,
  fundName: string = "General Fund"
): string {
  if (!SQUARE_APP_ID) {
    return "#donate";
  }
  const params = new URLSearchParams({
    amount: amount.toString(),
    fund: fundName,
  });
  return `https://checkout.square.site/merchant/${SQUARE_LOCATION_ID}/checkout?${params}`;
}

export function getProductCheckoutUrl(productId: string): string {
  if (!SQUARE_APP_ID) {
    return "#shop";
  }
  return `https://checkout.square.site/merchant/${SQUARE_LOCATION_ID}/checkout?item=${productId}`;
}

export function isSquareConfigured(): boolean {
  return Boolean(SQUARE_APP_ID && SQUARE_LOCATION_ID);
}
