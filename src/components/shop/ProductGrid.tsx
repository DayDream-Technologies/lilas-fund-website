"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "apparel", label: "Apparel" },
  { key: "youth", label: "Youth" },
  { key: "accessories", label: "Accessories" },
];

export default function ProductGrid({ products }: { products: Product[] }) {
  const [category, setCategory] = useState("all");

  const filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              category === cat.key
                ? "bg-rose-primary text-white shadow-md"
                : "bg-white text-charcoal hover:bg-cream-dark"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
