import type { Metadata } from "next";
import Hero from "@/components/common/Hero";
import Section from "@/components/ui/Section";
import CartContents from "@/components/shop/CartContents";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review your Lila's Fund shop cart before checkout. Proceeds support families at RMHC.",
};

export default function CartPage() {
  return (
    <>
      <Hero title="Cart" subtitle="Review your items" compact />
      <Section background="cream">
        <CartContents />
      </Section>
    </>
  );
}
