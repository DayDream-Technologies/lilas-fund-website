import type { Metadata } from "next";
import Hero from "@/components/common/Hero";
import Section from "@/components/ui/Section";
import CheckoutForm from "@/components/shop/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Shipping details and order submission for Lila's Fund merchandise.",
};

export default function CheckoutPage() {
  return (
    <>
      <Hero title="Checkout" subtitle="Shipping & order details" compact />
      <Section background="cream">
        <CheckoutForm />
      </Section>
    </>
  );
}
