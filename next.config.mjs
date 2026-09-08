/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standard Next.js build (Node runtime): all pages prerender statically today,
  // and API routes / server features can be added under app/api when needed.
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    // Serve modern formats (AVIF ≈ 50% smaller than JPEG) with responsive srcsets.
    formats: ['image/avif', 'image/webp'],
    // Product/lifestyle photos change only via redeploy — cache optimized copies for 31 days.
    minimumCacheTTL: 2678400,
    // Only the qualities pages actually request (Next 15 requires them allow-listed).
    qualities: [60, 65, 75],
    // Breakpoints tuned to the design's real rendered widths (cards ≈342px,
    // chapter media ≈510px, hero up to 2400px) — fewer, better-fitting variants.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 2400],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
  },
  async headers() {
    return [
      {
        // Originals are content-addressed by ?v=md5 (lib/images.ts) — immutable is safe.
        source: '/products/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // OG variants carry the same ?v= hashes (lib/seo.ts).
        source: '/og/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};

export default nextConfig;
