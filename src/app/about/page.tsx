import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/common/Hero";
import Section, { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Card, { CardBody } from "@/components/ui/Card";
import TeamMember from "@/components/common/TeamMember";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";
import { Heart, Target, Eye } from "lucide-react";
import { assetUrl } from "@/lib/base-path";
import team from "@/data/team.json";
import testimonials from "@/data/testimonials.json";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the Kelley family and how Lila's Fund was born from love to help families with hospitalized children.",
};

const aboutCards = [
  {
    icon: Heart,
    title: "Our Mission",
    description:
      "We are committed to providing comfort, hope, and resources to those facing challenging circumstances.",
    href: "/about/mission",
  },
  {
    icon: Eye,
    title: "Meet Lila",
    description:
      "Through sharing Lila's journey, we celebrate her life and the profound impact she had on everyone who knew her.",
    href: "/about/meet-lila",
  },
  {
    icon: Target,
    title: "Our Impact",
    description:
      "Lila's Fund has been instrumental in providing crucial support to families during their most challenging times.",
    href: "/about/impact",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Us"
        subtitle="Lila's Fund is dedicated to keeping the legacy of Lila June Kelley alive while providing love, hope, and support to RMHC families caring for hospitalized children."
        compact
      />

      {/* Quick Nav Cards */}
      <Section background="white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutCards.map((card) => (
            <Card key={card.title}>
              <CardBody className="text-center p-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-rose-primary/10 flex items-center justify-center">
                  <card.icon className="w-7 h-7 text-rose-primary" />
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-2 font-[family-name:var(--font-heading)]">
                  {card.title}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed mb-5">
                  {card.description}
                </p>
                <Button href={card.href} variant="outline" size="sm">
                  Learn More
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* The Kelley Family Story */}
      <Section background="cream">
        <SectionHeader title="The Kelley Family" />
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative h-64 md:h-80">
              <Image
                src={assetUrl("/images/misc/kelley-family.svg")}
                alt="The Kelley Family"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
            <div className="p-8 md:p-12 space-y-5 text-charcoal-light leading-relaxed">
              <p>
                We are the Kelley family &mdash; a hard-working, blue-collar family whose
                lives were forever changed when our daughter Lila came into this world.
                Like most families, we NEVER imagined we would one day be founders of a
                nonprofit. We were simply parents loving our child, navigating a journey
                we never expected, and learning firsthand how powerful compassion and
                community can be during life&apos;s most difficult moments.
              </p>
              <p>
                After Lila&apos;s passing, we knew we wanted to keep her memory alive in a
                way that brought light to others walking a similar path. Lila&apos;s Fund
                was born from our love for her and our desire to give back the same hope,
                love, and support that carried us through our darkest days. What began as
                a way to honor Lila has become a mission that has helped heal our hearts,
                thanks to the overwhelming support of donors, volunteers, and families
                who believe in Lila&apos;s legacy.
              </p>
              <p>
                Lila&apos;s big sister, Amelia, plays a special role in our journey.
                Though she is still very young and may not fully understand the mission
                behind Lila&apos;s Fund, she knows that helping what she calls
                &ldquo;sister&apos;s friends&rdquo; &mdash; families staying in the hospital and at
                Ronald McDonald House &mdash; is very important. Whether she&apos;s picking out
                snacks at the grocery store for families staying at the House, proudly
                giving gifts to patients at the hospital, or helping mom with events, her
                simple acts of kindness remind us that even the smallest gestures can
                bring comfort to families facing overwhelming circumstances.
              </p>
              <p>
                Through Lila&apos;s Fund, we want families to know they are not alone. We
                want to offer the same hope and encouragement that was given to us and
                gently remind them that, even in the hardest moments, &ldquo;this too
                shall pass.&rdquo; By helping others through Lila&apos;s legacy, we keep
                her memory close and her love alive in everything we do.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section background="white">
        <SectionHeader title="Meet The Team" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section background="rose">
        <SectionHeader title="Gratitude From Families" />
        <TestimonialCarousel testimonials={testimonials} />
      </Section>
    </>
  );
}
