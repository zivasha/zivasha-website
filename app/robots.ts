import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export const dynamic = 'force-static'; // required by output: 'export'

/** Served at /robots.txt — everything crawlable, sitemap advertised. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
