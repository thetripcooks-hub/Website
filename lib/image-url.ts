/**
 * Helpers for requesting appropriately-sized, format-negotiated images
 * directly from the CDNs we source images from, instead of handing
 * multi-megabyte originals straight to consumers that can't handle them
 * (e.g. social-share crawlers, which will silently drop an og:image that's
 * too large/slow to fetch rather than error visibly).
 */

type ContentfulOptions = {
  width?: number;
  quality?: number;
  format?: "webp" | "avif" | "jpg" | "png";
};

export function contentfulUrl(
  url: string,
  { width, format = "jpg", quality = 75 }: ContentfulOptions = {},
): string {
  if (!url) return url;
  if (!url.includes("ctfassets.net")) return url;

  try {
    const parsed = new URL(url, "https:");
    if (width) parsed.searchParams.set("w", String(width));
    parsed.searchParams.set("fm", format);
    parsed.searchParams.set("q", String(quality));
    return parsed.toString();
  } catch {
    return url;
  }
}
