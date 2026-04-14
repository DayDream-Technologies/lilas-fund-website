import Button from "../ui/Button";

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  overlay?: boolean;
  compact?: boolean;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  overlay = true,
  compact = false,
}: HeroProps) {
  return (
    <div
      className={`relative flex items-center justify-center ${
        compact ? "min-h-[40vh]" : "min-h-[70vh]"
      }`}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70" />
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-primary via-lavender to-rose-dark" />
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {(ctaText || secondaryCtaText) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctaText && ctaHref && (
              <Button href={ctaHref} size="lg" variant="primary">
                {ctaText}
              </Button>
            )}
            {secondaryCtaText && secondaryCtaHref && (
              <Button
                href={secondaryCtaHref}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-charcoal"
              >
                {secondaryCtaText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
