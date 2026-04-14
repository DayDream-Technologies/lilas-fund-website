"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { assetUrl } from "@/lib/base-path";
import Button from "../ui/Button";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src={assetUrl("/images/logo.svg")}
              alt="Lila's Fund"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-charcoal font-[family-name:var(--font-heading)]">
                Lila&apos;s Fund
              </span>
              <span className="block text-xs text-rose-primary font-medium -mt-0.5">
                Love, Hope &amp; Support
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.children && setOpenDropdown(link.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-charcoal hover:text-rose-primary transition-colors rounded-lg hover:bg-cream-dark/50"
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {link.children && openDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-cream-dark py-2 min-w-[200px]">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-charcoal hover:text-rose-primary hover:bg-cream transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button href="/programs/donate" size="sm">
              <Heart className="w-4 h-4 mr-1.5" />
              Donate
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-cream-dark transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-charcoal" />
            ) : (
              <Menu className="w-6 h-6 text-charcoal" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 z-40 transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-charcoal/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <nav className="relative bg-white shadow-xl mx-4 mt-2 rounded-2xl p-6 max-h-[calc(100vh-6rem)] overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="mb-1">
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-base font-medium text-charcoal hover:text-rose-primary hover:bg-cream rounded-lg transition-colors"
              >
                {link.label}
              </Link>
              {link.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-8 py-2.5 text-sm text-charcoal-light hover:text-rose-primary hover:bg-cream rounded-lg transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="mt-4 pt-4 border-t border-cream-dark">
            <Button href="/programs/donate" className="w-full" onClick={() => setMobileOpen(false)}>
              <Heart className="w-4 h-4 mr-1.5" />
              Donate Now
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
