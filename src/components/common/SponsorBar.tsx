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
}

export default function SponsorBar({ sponsors }: SponsorBarProps) {
  const doubled = [...sponsors, ...sponsors];

  return (
    <div className="overflow-hidden">
      <div className="flex animate-scroll gap-12 items-center">
        {doubled.map((sponsor, i) => {
          const img = (
            <div className="flex-shrink-0 w-28 h-16 relative grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
              <Image
                src={assetUrl(sponsor.logo)}
                alt={sponsor.name}
                fill
                className="object-contain"
                sizes="112px"
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
            >
              {img}
            </a>
          ) : (
            <div key={`${sponsor.name}-${i}`} title={sponsor.name}>
              {img}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
