import type { Metadata } from "next";
import { Heart } from "lucide-react";
import Hero from "@/components/common/Hero";
import Section, { SectionHeader } from "@/components/ui/Section";
import DonationForm from "@/components/donations/DonationForm";
import FundCard from "@/components/donations/FundCard";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Ways to Donate",
  description:
    "Support Lila's Fund by donating to help families with hospitalized children. Choose from our General Fund, Hug of Hope, Cups of Kindness, or Swaddle Drive.",
};

const funds = [
  {
    name: "Hug of Hope Fund",
    description:
      "Support our quilt program that provides handmade quilts to families at C.S. Mott Children's Hospital, offering warmth and comfort during their most difficult moments.",
    icon: "heart" as const,
    href: "#hug-of-hope-fund",
  },
  {
    name: "Cups of Kindness Fund",
    description:
      "Help us provide Keurig coffee machines, coffee, and tea to the family lounges at the C.S. Mott Congenital Heart Center, extending comfort during long hospital stays.",
    icon: "coffee" as const,
    href: "#cups-of-kindness-fund",
  },
  {
    name: "Swaddle Drive Fund",
    description:
      "Every baby deserves comfort in the hospital. Support our swaddle drive to collect and donate swaddle blankets to C.S. Mott Children's Hospital newborns.",
    icon: "baby" as const,
    href: "#swaddle-drive-fund",
  },
];

export default function DonatePage() {
  return (
    <>
      <Hero
        title="Ways to Donate"
        subtitle="Keeping Lila's Legacy Alive"
        compact
      />

      {/* Intro */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center space-y-5 text-charcoal-light leading-relaxed">
          <p className="text-lg">
            During our six months caring for Lila in the hospital, we learned that
            hope often comes in the simplest forms &mdash; a warm blanket during long
            nights and a cup of coffee to keep going. These small comforts made an
            enormous difference in our most challenging moments.
          </p>
          <p>
            Your donation helps us continue Lila&apos;s legacy by ensuring no family
            goes without these essential comforts when they need them most.
          </p>
        </div>
      </Section>

      {/* Main Donation Form */}
      <Section background="cream">
        <SectionHeader
          title="Donate Today"
          subtitle="By donating $23 monthly, you support families for the average 23-day RMHC stay."
        />
        <div className="max-w-lg mx-auto">
          <DonationForm />
        </div>
      </Section>

      {/* Fund-Specific Options */}
      <Section background="white">
        <SectionHeader
          title="Support a Specific Program"
          subtitle="Choose a fund that speaks to your heart."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {funds.map((fund) => (
            <FundCard key={fund.name} {...fund} />
          ))}
        </div>
      </Section>

      {/* Hug of Hope Fund */}
      <Section background="cream" id="hug-of-hope-fund">
        <div className="max-w-lg mx-auto">
          <h3 className="text-2xl font-bold text-charcoal mb-6 text-center font-[family-name:var(--font-heading)]">
            Hug of Hope Fund
          </h3>
          <DonationForm
            fundName="Hug of Hope"
            fundDescription="Support our quilt program providing handmade quilts to families at C.S. Mott Children's Hospital."
          />
        </div>
      </Section>

      {/* Cups of Kindness Fund */}
      <Section background="white" id="cups-of-kindness-fund">
        <div className="max-w-lg mx-auto">
          <h3 className="text-2xl font-bold text-charcoal mb-6 text-center font-[family-name:var(--font-heading)]">
            Cups of Kindness Fund
          </h3>
          <DonationForm
            fundName="Cups of Kindness"
            fundDescription="Lila's Fund has partnered with SAP Reality to provide Keurig coffee machines, coffee, and tea to the family lounges at the C.S. Mott Congenital Heart Center."
          />
        </div>
      </Section>

      {/* Swaddle Drive Fund */}
      <Section background="cream" id="swaddle-drive-fund">
        <div className="max-w-lg mx-auto">
          <h3 className="text-2xl font-bold text-charcoal mb-6 text-center font-[family-name:var(--font-heading)]">
            Swaddle Drive Fund
          </h3>
          <DonationForm
            fundName="Swaddle Drive"
            fundDescription="Every baby deserves to look cute while in the hospital. Help us collect swaddle blankets to give to C.S. Mott Children's Hospital."
          />
        </div>
      </Section>

      {/* Other Ways */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            title="Other Ways to Help"
            subtitle="Can't donate right now? There are other ways to support our mission."
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/events" variant="outline" size="lg">
              Attend an Event
            </Button>
            <Button href="/shop" variant="outline" size="lg">
              Shop Our Store
            </Button>
            <Button href="/contact" variant="ghost" size="lg">
              Volunteer
            </Button>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="charcoal" className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
          Every Dollar Makes a Difference
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
          100% of your donation goes toward supporting families with hospitalized
          children. Together, we can keep Lila&apos;s legacy alive.
        </p>
        <Button href="/programs/donate" variant="primary" size="lg">
          <Heart className="w-5 h-5 mr-2" />
          Donate Now
        </Button>
      </Section>
    </>
  );
}
