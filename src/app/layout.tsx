import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.lilasfund.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lila's Fund | Support for Families with Hospitalized Children",
    template: "%s | Lila's Fund",
  },
  description:
    "Lila's Fund is dedicated to keeping the legacy of Lila June Kelley alive while providing love, hope, and support to RMHC families caring for hospitalized children.",
  keywords: [
    "Lila's Fund",
    "nonprofit",
    "Ronald McDonald House",
    "congenital heart disease",
    "hospital families",
    "charity",
    "donate",
  ],
  openGraph: {
    title: "Lila's Fund | Providing Love, Hope, and Support",
    description:
      "Supporting families with hospitalized children through love, hope, and essential resources.",
    url: siteUrl,
    siteName: "Lila's Fund",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
