import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Coffee, Gift, DollarSign } from "lucide-react";
import { assetUrl } from "@/lib/base-path";
import Hero from "@/components/common/Hero";
import Section, { SectionHeader } from "@/components/ui/Section";
import Card, { CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "The mission of Lila's Fund is to ease the emotional and financial burdens of families with hospitalized children.",
};

const programs = [
  {
    icon: DollarSign,
    title: "Gift Cards for Families",
    description:
      "When funds are available, we provide $25-$50 gift cards to ALL families staying at Ronald McDonald House Charities of West Michigan and Ann Arbor, helping relieve everyday expenses during extended hospital stays.",
  },
  {
    icon: Coffee,
    title: "Cups of Kindness",
    description:
      "Through our Cups of Kindness coffee program in the C.S. Mott Children's Hospital Congenital Heart Center Family Lounges, we offer fresh coffee and tea to bring moments of comfort during long, difficult days.",
  },
  {
    icon: Gift,
    title: "Wish List Items",
    description:
      "We supply essential wish list items for the Ronald McDonald House and C.S. Mott Children's Hospital to support families' daily needs and bring a sense of normalcy during challenging times.",
  },
  {
    icon: Heart,
    title: "Hug of Hope Quilts",
    description:
      "Handmade quilts donated to C.S. Mott Children's Hospital in memory of Lila, providing warmth and comfort to families during their most difficult moments.",
  },
];

export default function MissionPage() {
  return (
    <>
      <Hero
        title="Our Mission"
        subtitle="Making a Difference"
        compact
      />

      {/* Mission Statement */}
      <Section background="white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-charcoal leading-relaxed font-[family-name:var(--font-heading)]">
            Lila&apos;s Fund is dedicated to easing the emotional and financial
            burdens of families with hospitalized children.
          </p>
          <div className="mt-6 h-1 w-20 bg-rose-primary rounded-full mx-auto" />
        </div>
      </Section>

      {/* Detailed Mission */}
      <Section background="cream">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={assetUrl("/images/misc/mission-photo.svg")}
                alt="Lila's Fund supporting families"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>
            <div className="space-y-5 text-charcoal-light leading-relaxed">
              <p>
                Our commitment extends beyond basic needs; we strive to nurture the
                spirits of families navigating difficult times. By providing gift
                cards, monetary donations, fresh coffee in the family lounges, and
                essential wish list items, we ensure that no family must bear the
                weight of added stress while caring for a loved one.
              </p>
              <p>
                Spreading Love, Hope, and Support, we empower families to focus on
                what truly matters: being together during life&apos;s most challenging
                moments.
              </p>
              <p>
                We cannot express enough gratitude to our supporters! Their generosity
                and commitment to our mission has truly transformed lives and inspired
                hope where it was once lost.
              </p>
              <blockquote className="border-l-4 border-rose-primary pl-6 py-2 italic text-charcoal">
                In Lila&apos;s memory, we share hope, compassion, and kindness when they
                are needed most.
              </blockquote>
            </div>
          </div>
        </div>
      </Section>

      {/* Programs */}
      <Section background="white">
        <SectionHeader
          title="Programs & Support"
          subtitle="At Lila's Fund, we spread Love, Hope, and Support to families facing unimaginable challenges."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <Card key={program.title}>
              <CardBody className="p-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-rose-primary/10 flex items-center justify-center">
                    <program.icon className="w-7 h-7 text-rose-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-charcoal mb-2">
                      {program.title}
                    </h3>
                    <p className="text-charcoal-light text-sm leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section background="rose" className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 font-[family-name:var(--font-heading)]">
          Join Us in Making a Difference
        </h2>
        <p className="text-charcoal-light text-lg max-w-2xl mx-auto mb-8">
          Together, we can transform moments of despair into moments of love and
          connection.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/programs/donate" size="lg">
            <Heart className="w-5 h-5 mr-2" />
            Donate Now
          </Button>
          <Button href="/about/meet-lila" variant="outline" size="lg">
            Meet Lila
          </Button>
        </div>
      </Section>
    </>
  );
}
