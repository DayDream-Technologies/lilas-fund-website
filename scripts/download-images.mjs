/**
 * Image Download Script for Lila's Fund Website
 *
 * This script helps download images from the existing Wix site.
 * Run with: node scripts/download-images.mjs
 *
 * INSTRUCTIONS:
 * 1. Visit each page on lilasfund.org
 * 2. Right-click images and "Save Image As" to the appropriate folder:
 *    - public/images/team/       -> Team member photos
 *    - public/images/sponsors/   -> Sponsor logos
 *    - public/images/events/     -> Event photos
 *    - public/images/lila/       -> Photos of Lila's journey
 *    - public/images/products/   -> Shop product photos
 *    - public/images/misc/       -> Other images (family photo, quilts, etc.)
 *    - public/images/logo.png    -> Main logo
 *
 * FILE NAMING CONVENTION:
 *
 * Team photos (public/images/team/):
 *   julie-kelley.jpg
 *   korey-kelley.jpg
 *   amelia-kelley.jpg
 *   lila-kelley.jpg
 *
 * Sponsor logos (public/images/sponsors/):
 *   go-pro-llc.png, edward-jones.png, iuecwa-local.png,
 *   premier-granite.png, north-kent-well.png, kelley-group.png,
 *   jbk.png, weingartz.png, altitude.png, firekeepers.png,
 *   cs-tool.png, whitecaps.png, apex.png, bobs-discount.png,
 *   north-end-tire.png, g2-inc.png, mister-carwash.png,
 *   drake.png, wmk9.png, lewis-farms.png
 *
 * Lila's journey (public/images/lila/):
 *   lila-portrait.jpg, ultrasound.jpg, born.jpg, discharge.jpg,
 *   hospital-return.jpg, fighting.jpg, surgery.jpg, ecmo.jpg,
 *   holding.jpg, angel.jpg
 *
 * Products (public/images/products/):
 *   quarter-zip-pullover.jpg, womens-golf-polo.jpg,
 *   mens-golf-polo.jpg, long-sleeve-shirt.jpg,
 *   chuck-a-puck-ls.jpg, youth-heart-month-tee.jpg,
 *   youth-long-sleeve-tee.jpg, youth-long-sleeve-tee-premium.jpg,
 *   trucker-cap.jpg
 *
 * Events (public/images/events/):
 *   cornhole-tournament.jpg, poker-run-florida.jpg,
 *   golf-outing-kalamazoo.jpg, poker-run-michigan.jpg,
 *   heart-walk.jpg, golf-outing-gr.jpg
 *
 * Misc (public/images/misc/):
 *   kelley-family.jpg, mission-photo.jpg,
 *   hug-of-hope-quilt.jpg, snuggle-time.jpg
 *
 * Logo (public/images/):
 *   logo.png
 */

import fs from "fs";
import path from "path";
import https from "https";

const BASE = "public/images";

const placeholders = {
  "logo.png": { w: 200, h: 200, text: "Lila's Fund Logo" },
  "team/julie-kelley.jpg": { w: 400, h: 400, text: "Julie Kelley" },
  "team/korey-kelley.jpg": { w: 400, h: 400, text: "Korey Kelley" },
  "team/amelia-kelley.jpg": { w: 400, h: 400, text: "Amelia Kelley" },
  "team/lila-kelley.jpg": { w: 400, h: 400, text: "Lila Kelley" },
  "lila/lila-portrait.jpg": { w: 400, h: 400, text: "Lila Portrait" },
  "misc/kelley-family.jpg": { w: 900, h: 500, text: "Kelley Family" },
  "misc/mission-photo.jpg": { w: 600, h: 750, text: "Mission" },
  "misc/hug-of-hope-quilt.jpg": { w: 600, h: 600, text: "Hug of Hope Quilt" },
  "misc/snuggle-time.jpg": { w: 600, h: 450, text: "Snuggle Time" },
};

function createPlaceholderSvg(w, h, text) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect fill="#F5EDE0" width="${w}" height="${h}"/>
  <rect fill="#D4708A" opacity="0.15" width="${w}" height="${h}" rx="8"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
    fill="#D4708A" font-family="system-ui,sans-serif" font-size="${Math.max(14, Math.min(w, h) / 12)}" font-weight="600">
    ${text}
  </text>
  <text x="50%" y="${h / 2 + Math.min(w, h) / 8}" dominant-baseline="middle" text-anchor="middle"
    fill="#9B8EC1" font-family="system-ui,sans-serif" font-size="${Math.max(10, Math.min(w, h) / 20)}">
    ${w}×${h} — Replace with real image
  </text>
</svg>`;
}

console.log("Creating placeholder images...\n");

for (const [filePath, { w, h, text }] of Object.entries(placeholders)) {
  const fullPath = path.join(BASE, filePath.replace(/\.(jpg|png)$/, ".svg"));
  const dir = path.dirname(fullPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, createPlaceholderSvg(w, h, text));
  console.log(`  Created: ${fullPath}`);
}

console.log(
  "\nPlaceholder SVGs created. Replace them with real images from lilasfund.org."
);
console.log("See the file naming convention above for expected filenames.\n");
