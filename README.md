# Lila's Fund Website

Official website for Lila's Fund, a nonprofit dedicated to keeping the legacy of Lila June Kelley alive while providing love, hope, and support to families caring for hospitalized children.

## Tech Stack

- **Framework**: Next.js 16 with App Router (static export)
- **Styling**: Tailwind CSS v4 with custom design system
- **Icons**: Lucide React + custom social SVGs
- **Animations**: Framer Motion
- **Payments**: Square (donations + shop)
- **Events**: Google Calendar API
- **Contact Form**: Formspree
- **Deployment**: GitHub Pages via GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

Static files are generated in the `out/` directory.

## Configuration

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

See the setup guides for detailed instructions:

- [SQUARE_MIGRATION.md](SQUARE_MIGRATION.md) - Setting up Square for donations and shop
- [GOOGLE_CALENDAR_SETUP.md](GOOGLE_CALENDAR_SETUP.md) - Setting up Google Calendar for events

## Images

Placeholder SVG images are included. Replace them with real images from the original site:

```bash
node scripts/download-images.mjs
```

See `scripts/download-images.mjs` for the full file naming convention.

## Deployment

The site auto-deploys to GitHub Pages when pushing to `main`. Configure these GitHub Secrets:

| Secret | Description |
|--------|-------------|
| `GOOGLE_CALENDAR_ID` | Google Calendar ID |
| `GOOGLE_CALENDAR_API_KEY` | Google Calendar API key |
| `SQUARE_APP_ID` | Square Application ID |
| `SQUARE_LOCATION_ID` | Square Location ID |

## Project Structure

```
src/
  app/                  # Next.js App Router pages
    about/              # About Us, Mission, Meet Lila, Impact
    contact/            # Contact form
    events/             # Google Calendar events
    programs/           # Donate, Hug of Hope
    shop/               # Product store
  components/           # Reusable React components
    common/             # Hero, TeamMember, SponsorBar
    donations/          # DonationForm, FundCard
    events/             # EventCard, EventCalendar, UpcomingEvents
    layout/             # Header, Footer
    shop/               # ProductCard, ProductGrid
    ui/                 # Button, Card, Section, AnimatedCounter, etc.
  data/                 # Static JSON data files
  lib/                  # Utility functions and constants
public/
  images/               # Site images (replace placeholders)
```
