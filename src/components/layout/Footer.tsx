import Link from "next/link";
import Image from "next/image";
import { Heart, Mail } from "lucide-react";
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from "../ui/SocialIcons";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.svg"
                alt="Lila's Fund"
                width={45}
                height={45}
                className="rounded-full"
              />
              <span className="text-xl font-bold font-[family-name:var(--font-heading)]">
                Lila&apos;s Fund
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Keeping the legacy of Lila June Kelley alive while providing love, hope,
              and support to families caring for hospitalized children.
            </p>
            <div className="flex gap-3">
              <SocialIcon href={SOCIAL_LINKS.facebook} icon={<FacebookIcon className="w-4 h-4" />} label="Facebook" />
              <SocialIcon href={SOCIAL_LINKS.twitter} icon={<TwitterIcon className="w-4 h-4" />} label="Twitter" />
              <SocialIcon href={SOCIAL_LINKS.instagram} icon={<InstagramIcon className="w-4 h-4" />} label="Instagram" />
              <SocialIcon href={SOCIAL_LINKS.linkedin} icon={<LinkedinIcon className="w-4 h-4" />} label="LinkedIn" />
            </div>
          </div>

          {/* Navigation columns */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-rose-light">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-rose-light">
              Programs
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/programs/donate" className="text-white/60 hover:text-white text-sm transition-colors">
                  Ways to Donate
                </Link>
              </li>
              <li>
                <Link href="/programs/hug-of-hope" className="text-white/60 hover:text-white text-sm transition-colors">
                  Lila&apos;s Hug of Hope
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-white/60 hover:text-white text-sm transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-white/60 hover:text-white text-sm transition-colors">
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-rose-light">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@lilasfund.org"
                  className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@lilasfund.org
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/programs/donate"
                className="inline-flex items-center gap-2 bg-rose-primary hover:bg-rose-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
              >
                <Heart className="w-4 h-4" />
                Support Our Mission
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Lila&apos;s Fund. All rights reserved.
          </p>
          <p className="text-white/40 text-xs flex items-center gap-1">
            Lila&apos;s legacy lives on in every family we uplift
            <Heart className="w-3 h-3 text-rose-primary" />
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full bg-white/10 hover:bg-rose-primary flex items-center justify-center transition-colors"
    >
      {icon}
    </a>
  );
}
