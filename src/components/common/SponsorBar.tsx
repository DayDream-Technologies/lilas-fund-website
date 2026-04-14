"use client";

import Image from "next/image";
import { assetUrl } from "@/lib/base-path";

interface Sponsor {
  name: string;
  logo: string;
  url: string | null;
}

interface SponsorBarProps {
  sponsors: Sponsor[];
  /** Optional small uppercase line above the logos (e.g. “Trusted by leading companies”). */
  eyebrow?: string | null;
}

export default function SponsorBar({ sponsors, eyebrow = null }: SponsorBarProps) {
  const doubled = [...sponsors, ...sponsors];

  return (
    <div className="overflow-hidden rounded-2xl border border-cream-dark bg-white py-10 md:py-12 shadow-sm">
      {eyebrow ? (
        <p className="text-center text-[0.9rem] font-semibold uppercase tracking-wide text-charcoal-light/80 mb-8 px-4">
          {eyebrow}
        </p>
      ) : null}

      <div className="overflow-hidden">
        <div className="sponsor-logo-track">
          {doubled.map((sponsor, i) => {
            const logoBlock = (
              <div className="relative flex h-[60px] w-[120px] shrink-0 items-center justify-center md:h-20 md:w-[150px]">
                <Image
                  src={assetUrl(sponsor.logo)}
                  alt={sponsor.name}
                  fill
                  className="object-contain opacity-70 grayscale transition-[filter,opacity] duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  sizes="(max-width: 768px) 120px, 150px"
                />
              </div>
            );

            return sponsor.url ? (
              <a
                key={`${sponsor.name}-${i}`}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                title={sponsor.name}
                className="group block shrink-0"
              >
                {logoBlock}
              </a>
            ) : (
              <div
                key={`${sponsor.name}-${i}`}
                className="group shrink-0"
                title={sponsor.name}
              >
                {logoBlock}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
