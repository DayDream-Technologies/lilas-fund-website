import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Gift } from "lucide-react";
import { assetUrl } from "@/lib/base-path";
import Hero from "@/components/common/Hero";
import Section, { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Lila's Hug of Hope",
  description:
    "Lila's Hug of Hope quilt program provides handmade quilts to families at C.S. Mott Children's Hospital in memory of Lila June Kelley.",
};

export default function HugOfHopePage() {
  return (
    <>
      <Hero
        title="Lila's Hug of Hope"
        subtitle="Sometimes, a sudden hug can change someone's life without any reason."
        compact
      />

      {/* Story */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={assetUrl("/images/misc/hug-of-hope-quilt.svg")}
                alt="Lila's Hug of Hope quilt"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>
            <div className="space-y-5 text-charcoal-light leading-relaxed">
              <p>
                While Lila was in the hospital, I received heartbreaking news that
                Lila&apos;s health was declining, and getting to a point where there
                were limited medical interventions. Having to make heartbreaking
                decisions in the near future was destroying me; I barely had energy to
                stand up.
              </p>
              <p>
                While laying next to Lila, one of her nurses grabbed a blanket,
                wrapped me up, and gave me a sincere hug and told me Lila was lucky to
                have me as her mom.
              </p>
              <p className="font-semibold text-charcoal italic">
                Sometimes, a sudden hug can change someone&apos;s life without any
                reason.
              </p>
              <p>
                I hoped Lila would give me a sign as I did not know what to do&hellip;
                the next day Lila told me she was ready to be my forever angel.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Hope definition */}
      <Section background="rose">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 font-[family-name:var(--font-heading)]">
            Hope
          </h2>
          <p className="text-charcoal-light text-lg leading-relaxed italic">
            To cherish a desire with anticipation: to want something to happen or
            be true.
          </p>
          <div className="mt-6 h-1 w-20 bg-rose-primary rounded-full mx-auto" />
          <p className="text-charcoal-light mt-6 leading-relaxed">
            Hope motivates us to keep going, even when things seem impossible or
            overwhelming. When we have hope, we believe that better days are ahead
            and that we can make positive changes in our lives and in the world
            around us.
          </p>
        </div>
      </Section>

      {/* The Quilts */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 space-y-5 text-charcoal-light leading-relaxed">
              <SectionHeader title="The Quilts" centered={false} />
              <p>
                Lila&apos;s Hug of Hope quilts are handmade by Engelbrecht Makes, crafted
                with love and care in memory of Lila June Kelley (5/13/23 &ndash;
                11/5/23).
              </p>
              <p>
                Lila&apos;s Fund donates Hug of Hope quilts to C.S. Mott
                Children&apos;s Hospital in Memory of Lila. Quilts are also donated to
                fundraisers as silent auction items.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button href="/programs/donate" size="md">
                  <Heart className="w-4 h-4 mr-2" />
                  Donate a Hug of Hope
                </Button>
                <Button href="/events" variant="outline" size="md">
                  <Gift className="w-4 h-4 mr-2" />
                  View Events
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={assetUrl("/images/misc/snuggle-time.svg")}
                alt="Snuggle time with Lila's quilt"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Support */}
      <Section background="cream">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            title="Support Families"
            subtitle="When your child is in the hospital, the smallest gestures can make the biggest difference."
          />
          <p className="text-charcoal-light leading-relaxed mb-8">
            During our six months with Lila at C.S. Mott Children&apos;s Hospital and
            Ronald McDonald House, we learned firsthand how much comfort comes from
            simple things &mdash; a warm cup of coffee during endless nights, a soft
            blanket for exhausted moments, and knowing that others care.
          </p>
          <Button href="/programs/donate" size="lg">
            <Heart className="w-5 h-5 mr-2" />
            Donate Today
          </Button>
        </div>
      </Section>
    </>
  );
}
