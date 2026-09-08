'use client';

/**
 * Custom next/image loader for the static export.
 *
 * The site ships as pure static files (next.config `output: 'export'`), which
 * disables Next's request-time image optimizer — so <Image> instead points at
 * Netlify's Image CDN, which resizes on the fly and negotiates AVIF/WebP per
 * browser. The `?v=` content-hash in our src values rides along inside `url`,
 * so cache busting on image replacement keeps working end to end.
 *
 * In local dev there is no Netlify edge — serve the original file untouched
 * (bigger, but correct; run `npx netlify dev` to exercise the CDN locally).
 */
export default function netlifyImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (process.env.NODE_ENV === 'development') return src;
  const params = new URLSearchParams({ url: src, w: String(width), q: String(quality ?? 75) });
  return `/.netlify/images?${params.toString()}`;
}
