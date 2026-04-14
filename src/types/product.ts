/**
 * Maps UI size labels (e.g. "M", "YS") to Printful catalog variant IDs.
 * Replace placeholder values with IDs from your Printful dashboard or Store Products API.
 */
export type PrintfulVariantMap = Record<string, number>;

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
  category: string;
  printfulVariantIds: PrintfulVariantMap;
}

export function getPrintfulVariantId(
  product: Product,
  size: string
): number | undefined {
  return product.printfulVariantIds[size];
}
