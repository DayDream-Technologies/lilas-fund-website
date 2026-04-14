"use client";

import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { fetchCalendarEvents, type CalendarEvent } from "@/lib/google-calendar";
import staticEvents from "@/data/events.json";

interface StaticEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  ticketUrl: string;
  type: string;
  image: string;
}

export default function UpcomingEvents({ limit }: { limit?: number }) {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetchCalendarEvents().then(setCalendarEvents);
  }, []);

  const events: StaticEvent[] = (staticEvents as StaticEvent[])
    .filter((e) => new Date(e.date + "T00:00:00") >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const displayEvents = limit ? events.slice(0, limit) : events;

  const hasCalendarEvents = calendarEvents.length > 0;

  return (
    <div className="space-y-6">
      {hasCalendarEvents &&
        calendarEvents.slice(0, limit).map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            date={event.start.split("T")[0]}
            location={event.location}
            description={event.description}
            ticketUrl={event.htmlLink}
          />
        ))}

      {!hasCalendarEvents &&
        displayEvents.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            time={event.time !== "TBD" ? event.time : undefined}
            location={event.location}
            description={event.description}
            ticketUrl={event.ticketUrl}
            type={event.type}
            image={event.image}
          />
        ))}

      {displayEvents.length === 0 && !hasCalendarEvents && (
        <p className="text-center text-charcoal-light py-8">
          No upcoming events at this time. Check back soon!
        </p>
      )}
    </div>
  );
}
