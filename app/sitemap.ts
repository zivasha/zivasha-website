import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export const dynamic = 'force-static'; // required by output: 'export'

/**
 * Served at /sitemap.xml. URLs keep the trailing slash to match canonicals
 * (next.config `trailingSlash: true`) — mixed forms would split index signals.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: 'shop', priority: 0.9 },
    { path: 'corporate-gifting', priority: 0.9 },
    { path: 'laddus', priority: 0.8 },
    { path: 'nutribars', priority: 0.8 },
    { path: 'our-story', priority: 0.6 },
    { path: 'contact', priority: 0.6 },
  ];
  return routes.map(({ path, priority }) => ({
    url: path ? `${site.domain}/${path}/` : `${site.domain}/`,
    lastModified: new Date(),
    priority,
  }));
}
