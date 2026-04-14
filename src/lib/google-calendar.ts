import { GOOGLE_CALENDAR_API_KEY, GOOGLE_CALENDAR_ID } from "./constants";

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  htmlLink: string;
}

export async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  if (!GOOGLE_CALENDAR_API_KEY || !GOOGLE_CALENDAR_ID) {
    return [];
  }

  const now = new Date().toISOString();
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    GOOGLE_CALENDAR_ID
  )}/events?key=${GOOGLE_CALENDAR_API_KEY}&timeMin=${now}&maxResults=10&singleEvents=true&orderBy=startTime`;

  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();

    return (data.items || []).map((item: Record<string, unknown>) => ({
      id: item.id as string,
      title: (item.summary as string) || "Untitled Event",
      description: (item.description as string) || "",
      location: (item.location as string) || "",
      start: ((item.start as Record<string, string>)?.dateTime ||
        (item.start as Record<string, string>)?.date) as string,
      end: ((item.end as Record<string, string>)?.dateTime ||
        (item.end as Record<string, string>)?.date) as string,
      htmlLink: item.htmlLink as string,
    }));
  } catch {
    return [];
  }
}

export function getCalendarEmbedUrl(): string {
  if (!GOOGLE_CALENDAR_ID) return "";
  return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(
    GOOGLE_CALENDAR_ID
  )}&ctz=America/Detroit&mode=AGENDA`;
}
