import type { Metadata } from "next";
import { Heart, CalendarDays } from "lucide-react";
import Hero from "@/components/common/Hero";
import Section, { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import EventCalendar from "@/components/events/EventCalendar";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Join us at upcoming Lila's Fund events including golf outings, cornhole tournaments, poker runs, and the Congenital Heart Walk.",
};

export default function EventsPage() {
  return (
    <>
      <Hero
        title="Events"
        subtitle="From golf outings and cornhole tournaments to memorial rides and heart walks, each event brings our community together to raise funds and awareness for families in need."
        compact
      />

      {/* Upcoming Events */}
      <Section background="white">
        <SectionHeader
          title="Upcoming Events"
          subtitle="Join us at our upcoming events to support families caring for hospitalized children."
        />
        <div className="max-w-4xl mx-auto">
          <UpcomingEvents />
        </div>
      </Section>

      {/* Google Calendar */}
      <Section background="cream">
        <SectionHeader
          title="Event Calendar"
          subtitle="View all of our events in calendar format. Subscribe to stay up to date."
        />
        <div className="max-w-4xl mx-auto">
          <EventCalendar />
        </div>
      </Section>

      {/* Want to help? */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            title="Can't Make an Event?"
            subtitle="There are other ways to support our mission."
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/programs/donate" size="lg">
              <Heart className="w-5 h-5 mr-2" />
              Donate Today
            </Button>
            <Button href="/shop" variant="outline" size="lg">
              Shop Our Store
            </Button>
          </div>
        </div>
      </Section>

      {/* Host an event */}
      <Section background="charcoal" className="text-center">
        <CalendarDays className="w-12 h-12 text-rose-light mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
          Want to Host an Event?
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
          If you&apos;d like to organize a fundraiser or event to benefit Lila&apos;s Fund,
          we&apos;d love to hear from you. Contact us to get started.
        </p>
        <Button href="/contact" variant="primary" size="lg">
          Contact Us
        </Button>
      </Section>
    </>
  );
}
