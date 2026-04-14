/**
 * GitHub Pages project sites are served under https://<user>.github.io/<repo>/.
 * `basePath` fixes `/_next` and `Link`, but `next/image` src for files in `public/`
 * must be prefixed manually for static export.
 */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export function assetUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
