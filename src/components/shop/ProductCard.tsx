"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { assetUrl } from "@/lib/base-path";
import { ShoppingBag } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  const { addLine } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    const ok = addLine(product, selectedSize, 1);
    if (ok) {
      setJustAdded(true);
      window.setTimeout(() => setJustAdded(false), 2000);
    }
  };

  return (
    <Card>
      <div className="relative aspect-square bg-cream-dark">
        <Image
          src={assetUrl(product.image)}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-charcoal text-lg mb-1">{product.name}</h3>
        <p className="text-rose-primary font-bold text-xl mb-3">
          ${product.price.toFixed(2)}
        </p>

        {product.sizes.length > 1 && (
          <div className="mb-4">
            <label className="block text-xs font-semibold text-charcoal-light mb-2 uppercase tracking-wide">
              Size
            </label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedSize === size
                      ? "bg-charcoal text-white"
                      : "bg-cream text-charcoal hover:bg-cream-dark"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Button
            type="button"
            size="sm"
            className="w-full"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            {justAdded ? "Added to cart" : "Add to cart"}
          </Button>
          <Link
            href="/shop/cart/"
            className="text-center text-sm text-charcoal-light hover:text-rose-primary transition-colors"
          >
            View cart
          </Link>
        </div>
      </div>
    </Card>
  );
}
