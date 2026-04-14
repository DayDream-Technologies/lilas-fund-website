"use client";

import { useState } from "react";
import Image from "next/image";
import { assetUrl } from "@/lib/base-path";
import { ShoppingBag } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { getProductCheckoutUrl } from "@/lib/square";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

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

        <Button
          href={getProductCheckoutUrl(product.id)}
          external
          size="sm"
          className="w-full"
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Buy Now
        </Button>
      </div>
    </Card>
  );
}
