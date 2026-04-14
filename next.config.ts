import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/**
 * GitHub Pages project sites are served at https://<user>.github.io/<repo>/
 * Set NEXT_PUBLIC_BASE_PATH=/<repo-name> when building for that deploy so
 * /_next, fonts, and /public assets resolve correctly.
 */
const rawBase = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath = rawBase === "/" ? "" : rawBase;

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
