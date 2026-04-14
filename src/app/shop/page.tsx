import type { Metadata } from "next";
import { Heart } from "lucide-react";
import Hero from "@/components/common/Hero";
import Section, { SectionHeader } from "@/components/ui/Section";
import ProductGrid from "@/components/shop/ProductGrid";
import Button from "@/components/ui/Button";
import products from "@/data/products.json";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Support Lila's Fund Mission by shopping our collection. Each sale supports families with children receiving care at local hospitals.",
};

export default function ShopPage() {
  return (
    <>
      <Hero
        title="Shop"
        subtitle="Support Lila's Fund Mission — a tribute filled with love and purpose!"
        compact
      />

      {/* Intro */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-charcoal-light leading-relaxed">
            Each sale supports families with children receiving care at local
            hospitals, as proceeds are turned into gift cards for families staying at
            Ronald McDonald House Charities of West Michigan and Ann Arbor to help
            ease any financial burdens.
          </p>
        </div>
      </Section>

      {/* Products */}
      <Section background="cream">
        <SectionHeader title="Explore the Collection" />
        <ProductGrid products={products} />
      </Section>

      {/* CTA */}
      <Section background="charcoal" className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
          Prefer to Donate Directly?
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
          Every contribution, big or small, helps us support families in need.
        </p>
        <Button href="/programs/donate" size="lg">
          <Heart className="w-5 h-5 mr-2" />
          Donate Today
        </Button>
      </Section>
    </>
  );
}
