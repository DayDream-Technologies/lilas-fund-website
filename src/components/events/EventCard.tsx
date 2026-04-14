import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";
import Button from "../ui/Button";
import Card, { CardBody } from "../ui/Card";

interface EventCardProps {
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  ticketUrl?: string;
  type?: string;
  image?: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getDaysUntil(dateStr: string): number {
  const now = new Date();
  const event = new Date(dateStr + "T00:00:00");
  const diff = event.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function EventCard({
  title,
  date,
  time,
  location,
  description,
  ticketUrl,
  type,
}: EventCardProps) {
  const daysUntil = getDaysUntil(date);
  const isPast = daysUntil < 0;

  return (
    <Card className={`${isPast ? "opacity-60" : ""}`}>
      <CardBody className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 flex flex-col items-center justify-center bg-rose-primary/10 rounded-xl p-4 min-w-[100px]">
            <span className="text-3xl font-bold text-rose-primary">
              {new Date(date + "T00:00:00").getDate()}
            </span>
            <span className="text-sm font-medium text-rose-dark uppercase">
              {new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "short" })}
            </span>
            <span className="text-xs text-charcoal-light">
              {new Date(date + "T00:00:00").getFullYear()}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                {type && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gold-light text-charcoal mb-2 uppercase tracking-wide">
                    {type}
                  </span>
                )}
                <h3 className="text-xl font-bold text-charcoal mb-2">{title}</h3>
              </div>
              {!isPast && daysUntil <= 30 && (
                <span className="flex-shrink-0 px-3 py-1 text-xs font-bold rounded-full bg-rose-primary text-white">
                  {daysUntil === 0 ? "Today!" : `${daysUntil} days`}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-charcoal-light mb-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(date)}
              </span>
              {time && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {time}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {location}
              </span>
            </div>

            <p className="text-charcoal-light text-sm leading-relaxed mb-4">
              {description}
            </p>

            {ticketUrl && !isPast && (
              <Button href={ticketUrl} size="sm" external>
                <ExternalLink className="w-4 h-4 mr-2" />
                {type === "walk" ? "Join the Walk" : "Get Tickets"}
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
