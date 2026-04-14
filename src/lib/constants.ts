export const SITE_NAME = "Lila's Fund";
export const SITE_TAGLINE = "Providing Love, Hope, and Support";
export const SITE_DESCRIPTION =
  "Lila's Fund is dedicated to keeping the legacy of Lila June Kelley alive while providing love, hope, and support to RMHC families caring for hospitalized children.";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Our Mission", href: "/about/mission" },
      { label: "Meet Lila", href: "/about/meet-lila" },
      { label: "Our Impact", href: "/about/impact" },
    ],
  },
  {
    label: "Programs & Events",
    href: "/programs/donate",
    children: [
      { label: "Ways to Donate", href: "/programs/donate" },
      { label: "Lila's Hug of Hope", href: "/programs/hug-of-hope" },
      { label: "Events", href: "/events" },
    ],
  },
  { label: "Shop", href: "/shop" },
  { label: "Contact Us", href: "/contact" },
];

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/lilasfund",
  twitter: "https://twitter.com/lilasfund",
  instagram: "https://www.instagram.com/lilasfund",
  linkedin: "https://www.linkedin.com/company/lilas-fund",
};

export const DONATION_AMOUNTS = [10, 23, 50, 100];

export const GOOGLE_CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "";
export const GOOGLE_CALENDAR_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY || "";

export const SQUARE_APP_ID = process.env.NEXT_PUBLIC_SQUARE_APP_ID || "";
export const SQUARE_LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || "";

export const IMPACT_STATS = {
  allTimeDonations: [
    { amount: "$13,000", label: "C.S. Mott Children's Hospital Congenital Heart Center" },
    { amount: "$22,988", label: "The Children's Heart Foundation" },
    { amount: "$24,000", label: "Ronald McDonald House Charities WM & AA" },
  ],
  wishListItems: [
    { amount: "415", label: "Swaddles donated to C.S. Mott PCTU" },
    { amount: "329", label: "Toys, books, outfits donated" },
    { amount: "215", label: "Pantry items for RMHC" },
  ],
  rmhcImpact: [
    { amount: "480", label: "Families positively impacted" },
    { amount: "$24,000", label: "Worth of gift cards handed out" },
  ],
};
