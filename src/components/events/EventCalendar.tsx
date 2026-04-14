"use client";

import { getCalendarEmbedUrl } from "@/lib/google-calendar";

export default function EventCalendar() {
  const embedUrl = getCalendarEmbedUrl();

  if (!embedUrl) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        <p className="text-charcoal-light">
          Google Calendar integration will be available once configured.
          See <code className="bg-cream-dark px-2 py-1 rounded text-sm">GOOGLE_CALENDAR_SETUP.md</code> for instructions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <iframe
        src={embedUrl}
        className="w-full h-[500px] border-0"
        title="Lila's Fund Events Calendar"
      />
    </div>
  );
}
