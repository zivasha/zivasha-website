/** @type {import('next').NextConfig} */
const nextConfig = {
  // Full static export: every page is a plain HTML file served straight from
  // Netlify's CDN edge (~50ms TTFB) instead of through a serverless function
  // (1-4s cold starts, measured Sep 2026). The site has no server code —
  // ordering is WhatsApp links — so nothing is lost. If API routes are ever
  // needed (integrated payments), use Netlify Functions alongside, or drop
  // back to the runtime by removing `output` here and `publish` in netlify.toml.
  // NOTE: headers() is unsupported in export mode — cache policy lives in
  // public/_headers now (same values, Netlify syntax).
  output: 'export',
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    // Export mode disables Next's request-time optimizer; Netlify's Image CDN
    // takes its place (resizing + AVIF/WebP negotiation at the edge) via the
    // custom loader. deviceSizes/imageSizes still shape the generated srcsets.
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    // Only the qualities pages actually request (Next 15 requires them allow-listed).
    qualities: [60, 65, 75],
    // Breakpoints tuned to the design's real rendered widths (cards ≈342px,
    // chapter media ≈510px, hero up to 2400px) — fewer, better-fitting variants.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 2400],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
  },
};

export default nextConfig;
