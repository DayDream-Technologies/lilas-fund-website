import type { Metadata } from "next";
import { Heart, FileText } from "lucide-react";
import Hero from "@/components/common/Hero";
import Section, { SectionHeader } from "@/components/ui/Section";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Button from "@/components/ui/Button";
import { IMPACT_STATS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "See how Lila's Fund has provided crucial support to families at Ronald McDonald House Charities and C.S. Mott Children's Hospital.",
};

export default function ImpactPage() {
  return (
    <>
      <Hero
        title="Our Impact"
        subtitle="Spreading Love, Hope & Support!"
        compact
      />

      {/* Intro */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center space-y-5 text-charcoal-light leading-relaxed">
          <p className="text-lg">
            Lila&apos;s Fund has been instrumental in providing crucial support to
            families during their most challenging times. Our mission is clear: to
            ease the burdens of those staying at the Ronald McDonald House
            Charities (RMHC) while caring for their sick children.
          </p>
          <p>
            Through your generous contributions and unwavering support, we have been
            able to achieve remarkable results.
          </p>
        </div>
      </Section>

      {/* 2025 Event Contributions */}
      <Section background="cream">
        <SectionHeader title="A Milestone Year" subtitle="Our contributions from our 2025 events" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 text-center shadow-md">
            <div className="text-4xl font-bold text-rose-primary mb-2">$14,000</div>
            <p className="text-charcoal-light text-sm">
              To Ronald McDonald House Charities of Western Michigan &amp; Ann Arbor
              for family gift cards
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-md">
            <div className="text-4xl font-bold text-rose-primary mb-2">$12,644</div>
            <p className="text-charcoal-light text-sm">
              To The Children&apos;s Heart Foundation via the Congenital Heart Walk
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-md">
            <div className="text-4xl font-bold text-rose-primary mb-2">$2,500</div>
            <p className="text-charcoal-light text-sm">
              Supporting the Cups of Kindness program at C.S. Mott Congenital Heart
              Center
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-md">
            <div className="text-4xl font-bold text-rose-primary mb-2">$2,150</div>
            <p className="text-charcoal-light text-sm">
              Supporting our random acts of kindness program
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-2xl p-8 text-center shadow-md">
            <div className="text-4xl font-bold text-lavender mb-2">200</div>
            <p className="text-charcoal-light text-sm">
              Swaddles collected to provide warmth and comfort to newborns
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-md">
            <div className="text-4xl font-bold text-lavender mb-2">544</div>
            <p className="text-charcoal-light text-sm">
              Essential wish list items donated to RMHC &amp; C.S. Mott Children&apos;s Hospital
            </p>
          </div>
        </div>
      </Section>

      {/* All Time Donations */}
      <Section background="white">
        <SectionHeader title="All Time Donations" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {IMPACT_STATS.allTimeDonations.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.amount}
              label={stat.label}
            />
          ))}
        </div>
      </Section>

      {/* Wish List Items */}
      <Section background="cream">
        <SectionHeader title="All Time Wish List Items" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {IMPACT_STATS.wishListItems.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.amount}
              label={stat.label}
            />
          ))}
        </div>
      </Section>

      {/* RMHC Impact */}
      <Section background="white">
        <SectionHeader title="Lila's Fund at RMHC" subtitle="West Michigan & Ann Arbor" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {IMPACT_STATS.rmhcImpact.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.amount}
              label={stat.label}
            />
          ))}
        </div>
      </Section>

      {/* Looking Ahead */}
      <Section background="cream">
        <div className="max-w-3xl mx-auto text-center space-y-5 text-charcoal-light leading-relaxed">
          <SectionHeader title="Looking Ahead" />
          <p>
            As we continue to honor Lila&apos;s memory, our goal is to expand our
            reach and assist even more families in need. We are committed to
            strengthening our partnerships and increasing our impact, ensuring that
            no family has to face their journey alone.
          </p>
          <p>
            Together, we are creating a legacy of love, hope, and support. Thank you
            for being a part of this incredible journey and for helping us make a
            meaningful difference in the lives of so many.
          </p>
        </div>
      </Section>

      {/* Annual Report + CTA */}
      <Section background="charcoal" className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
          2025 Impact Report
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
          Our 2025 Impact Report highlights the progress we made over the past year,
          celebrating key milestones and community impact.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            href="https://www.lilasfund.org/_files/ugd/477d58_81c0c5e71ea7410b8a7fd60d63066834.pdf"
            external
            size="lg"
          >
            <FileText className="w-5 h-5 mr-2" />
            View Annual Report
          </Button>
          <Button
            href="/programs/donate"
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-charcoal"
          >
            <Heart className="w-5 h-5 mr-2" />
            Support Our Mission
          </Button>
        </div>
      </Section>
    </>
  );
}
