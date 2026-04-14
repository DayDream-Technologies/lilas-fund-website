import { type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "cream" | "white" | "rose" | "charcoal";
}

const bgClasses = {
  cream: "bg-cream",
  white: "bg-white",
  rose: "bg-rose-primary/5",
  charcoal: "bg-charcoal text-white",
};

export default function Section({
  children,
  className = "",
  id,
  background = "cream",
}: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${bgClasses[background]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className = "",
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-charcoal-light max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-1 w-20 bg-rose-primary rounded-full ${centered ? "mx-auto" : ""}`} />
    </div>
  );
}
