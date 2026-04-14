import { Heart, Calendar, HandHeart, Users } from "lucide-react";
import Hero from "@/components/common/Hero";
import Section, { SectionHeader } from "@/components/ui/Section";
import Card, { CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import TeamMember from "@/components/common/TeamMember";
import SponsorBar from "@/components/common/SponsorBar";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import testimonials from "@/data/testimonials.json";
import team from "@/data/team.json";
import sponsors from "@/data/sponsors.json";

const missionCards = [
  {
    icon: Heart,
    title: "Our Mission",
    description:
      "We are committed to providing comfort, hope, and resources to those facing challenging circumstances.",
    href: "/about/mission",
    cta: "Read More",
  },
  {
    icon: Calendar,
    title: "Our Events",
    description:
      "From golf outings to cornhole tournaments, each event brings our community together to raise funds and awareness.",
    href: "/events",
    cta: "View Events",
  },
  {
    icon: HandHeart,
    title: "Get Involved",
    description:
      "Volunteer, participate, or donate. Every contribution helps us spread love, hope, and support to families in need.",
    href: "/programs/donate",
    cta: "Donate Now",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero
        title="Providing Love, Hope, and Support"
        subtitle="Lila's Fund is dedicated to keeping the legacy of Lila June Kelley alive while providing love, hope, and support to RMHC families caring for hospitalized children."
        ctaText="Meet Lila"
        ctaHref="/about/meet-lila"
        secondaryCtaText="Our Impact"
        secondaryCtaHref="/about/impact"
      />

      {/* Mission Cards */}
      <Section background="white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missionCards.map((card) => (
            <Card key={card.title}>
              <CardBody className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-rose-primary/10 flex items-center justify-center">
                  <card.icon className="w-8 h-8 text-rose-primary" />
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3 font-[family-name:var(--font-heading)]">
                  {card.title}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed mb-6">
                  {card.description}
                </p>
                <Button href={card.href} variant="outline" size="sm">
                  {card.cta}
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* Founder Message */}
      <Section background="rose">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="The Face Behind the Mission"
            subtitle="A message from Julie Kelley, CEO of Lila's Fund"
          />
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-charcoal-light leading-relaxed">
              <p>
                As we take a moment to reflect on our achievements over the past few
                years, I want to sincerely express my gratitude to everyone who has
                supported Lila&apos;s Fund. Your contributions have empowered us to help
                families during their challenging times and have allowed us to spread
                Love, Hope, and Support with many more families.
              </p>
              <p className="mt-4">
                Your trust in our vision and commitment to our mission has been
                invaluable. Whether you are a supporter of our events, have recently
                donated, or even just reached out to say how Lila&apos;s Fund has made a
                positive impact on your journey, your contributions and engagement have
                made a remarkable impact.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div>
                <p className="font-bold text-charcoal text-lg">Julie Kelley</p>
                <p className="text-rose-primary text-sm font-medium">
                  CEO, Lila&apos;s Fund
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Button href="/about" variant="outline" size="sm">
                Read More
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Upcoming Events */}
      <Section background="white">
        <SectionHeader
          title="Upcoming Events"
          subtitle="Join us at our upcoming events to help raise funds and awareness for families in need."
        />
        <UpcomingEvents limit={3} />
        <div className="text-center mt-10">
          <Button href="/events" variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            View All Events
          </Button>
        </div>
      </Section>

      {/* Impact Banner */}
      <Section background="charcoal">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
            2025 Impact Report Now Available
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Our 2025 Impact Report highlights the progress we made over the past year,
            celebrating key milestones, community impact, and the meaningful work behind
            our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="https://www.lilasfund.org/_files/ugd/477d58_81c0c5e71ea7410b8a7fd60d63066834.pdf"
              external
              variant="primary"
              size="lg"
            >
              View 2025 Annual Report
            </Button>
            <Button href="/about/impact" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-charcoal">
              <Users className="w-4 h-4 mr-2" />
              Our Impact
            </Button>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section background="cream">
        <SectionHeader
          title="Gratitude From Families"
          subtitle="Hear from the families whose lives have been touched by Lila's Fund."
        />
        <TestimonialCarousel testimonials={testimonials} />
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

      {/* Sponsors */}
      <Section background="cream">
        <SectionHeader
          title="Our Supporters"
          subtitle="We express our heartfelt gratitude to all of our sponsors for their generous support."
        />
        <SponsorBar sponsors={sponsors} />
      </Section>

      {/* CTA */}
      <Section background="rose" className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 font-[family-name:var(--font-heading)]">
          Help Us Make a Difference
        </h2>
        <p className="text-charcoal-light text-lg max-w-2xl mx-auto mb-8">
          &ldquo;We can&apos;t help everyone, but everyone can help someone.&rdquo;
          &mdash; Ronald Reagan
        </p>
        <Button href="/programs/donate" size="lg">
          <Heart className="w-5 h-5 mr-2" />
          Donate Today
        </Button>
      </Section>
    </>
  );
}
