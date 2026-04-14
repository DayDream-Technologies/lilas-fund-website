import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/common/Hero";
import Section, { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { Heart } from "lucide-react";
import { assetUrl } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "Meet Lila",
  description:
    "Meet Lila June Kelley (5/13/23 - 11/5/23). Her courage and spirit inspire everything we do at Lila's Fund.",
};

const timeline = [
  {
    date: "February 6, 2023",
    title: "A Special Diagnosis",
    content:
      "At our 20-week ultrasound we found out we were having another little girl \u2014 a special heart warrior. Lila was diagnosed with Mosaic Trisomy 16 and a complex Congenital Heart Defect (CHD) including Pulmonary Atresia, Right Aortic Arch, Complete AVSD, and several other conditions.",
    image: "/images/lila/placeholder.svg",
  },
  {
    date: "May 13, 2023",
    title: "Lila's Journey Begins",
    content:
      "At 35 weeks, Lila June Kelley entered the world weighing 3lbs 8oz and 15 inches. She spent her first month in the NICU at C.S. Mott Children's Hospital. She hit her goal weight of 4lbs 8oz and was ready for her first procedure: stenting her PDA.",
    image: "/images/lila/placeholder.svg",
  },
  {
    date: "July 10, 2023",
    title: "Discharge Day",
    content:
      "After weeks of recovery from an emergency open-chest surgery needed when her vessel spasmed during her first procedure, Lila was finally well enough to come home. She needed time to grow before her first planned open-heart surgery.",
    image: "/images/lila/placeholder.svg",
  },
  {
    date: "July 27, 2023",
    title: "Back to the Hospital",
    content:
      "Lila was not acting like herself. We were rushed back to the PCTU at C.S. Mott Children's Hospital via ambulance. She had the rhinovirus and was also found to have a rare Morgagni diaphragmatic hernia. The Ronald McDonald House Charities welcomed us with open arms.",
    image: "/images/lila/placeholder.svg",
  },
  {
    date: "August 13, 2023",
    title: "A Fighter Through and Through",
    content:
      "While recovering from the rhinovirus, Lila went into respiratory failure and was intubated. She was diagnosed with cerebral hypoxia which led to a stroke and seizures. Despite this, she recovered remarkably well.",
    image: "/images/lila/placeholder.svg",
  },
  {
    date: "September 15, 2023",
    title: "Critical Surgery",
    content:
      "Lila's right lung collapsed because her intestines had moved into her chest cavity. Despite high risks given her CHD and respiratory status, she went through surgery and did well during the procedure.",
    image: "/images/lila/placeholder.svg",
  },
  {
    date: "September 29 \u2013 October 10, 2023",
    title: "ECMO & Recovery",
    content:
      "Lila was placed on ECMO, a form of life support. After a procedure to upsize her shunt, she came off ECMO. The road was long \u2014 on and off the ventilator, a kinked shunt that required stenting \u2014 but she kept fighting.",
    image: "/images/lila/placeholder.svg",
  },
  {
    date: "October 15, 2023",
    title: "A Precious Moment",
    content:
      "For the first time in 32 days, we got to hold our girl. That moment was everything.",
    image: "/images/lila/placeholder.svg",
  },
  {
    date: "November 5, 2023",
    title: "Forever Our Angel",
    content:
      "After being diagnosed with Airway Malacia and Bronchus Suis, and with limited medical interventions remaining, Lila passed away peacefully in our arms. She will forever be our heart warrior, our inspiration, and our angel.",
    image: "/images/lila/placeholder.svg",
  },
];

export default function MeetLilaPage() {
  return (
    <>
      <Hero
        title="Meet Lila June Kelley"
        subtitle="5/13/23 \u2013 11/5/23"
        compact
      />

      {/* Intro */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden shadow-xl ring-4 ring-rose-light">
            <Image
              src={assetUrl("/images/lila/lila-portrait.svg")}
              alt="Lila June Kelley"
              fill
              className="object-cover"
              sizes="192px"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4 font-[family-name:var(--font-heading)]">
            Heart Warrior. Angel. Inspiration.
          </h2>
          <p className="text-charcoal-light text-lg leading-relaxed">
            Through sharing Lila&apos;s journey, we celebrate her life and the profound
            impact she had on everyone who knew her. Her legacy continues to inspire
            others and reminds us of the preciousness of every moment.
          </p>
        </div>
      </Section>

      {/* Timeline */}
      <Section background="cream">
        <SectionHeader title="Lila's Journey" />

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-rose-light/50 -translate-x-1/2" />

          {timeline.map((entry, i) => (
            <div
              key={entry.date}
              className={`relative flex flex-col md:flex-row gap-8 mb-16 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot on timeline */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-rose-primary rounded-full border-4 border-cream -translate-x-1/2 mt-2 z-10" />

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-rose-primary/10 text-rose-primary mb-3">
                  {entry.date}
                </span>
                <h3 className="text-xl font-bold text-charcoal mb-2 font-[family-name:var(--font-heading)]">
                  {entry.title}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  {entry.content}
                </p>
              </div>

              {/* Image placeholder */}
              <div className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={assetUrl(entry.image)}
                    alt={entry.title}
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Gratitude */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader title="Thank You" />
          <div className="space-y-5 text-charcoal-light leading-relaxed">
            <p>
              Never in a million years would we have thought that we would be taking
              care of our own critically ill child. We are beyond grateful for having a
              HUGE support system during this difficult time.
            </p>
            <p>
              THANK YOU to C.S. Mott Children&apos;s Hospital for doing everything in
              their power to give Lila the best shot at life, along with the nurses and
              doctors who cared for Lila in the most loving way.
            </p>
            <p>
              THANK YOU to Ronald McDonald House Charities of Ann Arbor for the
              generosity to let us call their home our home while we cared for Lila.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="charcoal" className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
          Keep Lila&apos;s Legacy Alive
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
          Lila&apos;s legacy lives on in every family we uplift, every heart we warm,
          and every hope we inspire.
        </p>
        <Button href="/programs/donate" size="lg">
          <Heart className="w-5 h-5 mr-2" />
          Support Our Mission
        </Button>
      </Section>
    </>
  );
}
