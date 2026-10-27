import type { MetadataRoute } from 'next';
import posts from '@/lib/blog-posts.json';
import { site } from '@/lib/site';
import { products } from '@/lib/products';
import { productPath } from '@/lib/product-details';

export const dynamic = 'force-static'; // required by output: 'export'

/**
 * Served at /sitemap.xml. URLs keep the trailing slash to match canonicals
 * (next.config `trailingSlash: true`) — mixed forms would split index signals.
 * Omit lastModified when an actual content-edit date is not recorded. A rebuild
 * alone is not a meaningful page update; article dates come from editorial data.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: 'shop', priority: 0.9 },
    { path: 'gift-hampers', priority: 0.9 },
    { path: 'corporate-gifting', priority: 0.9 },
    { path: 'laddus', priority: 0.8 },
    { path: 'nutribars', priority: 0.8 },
    { path: 'our-story', priority: 0.6 },
    { path: 'contact', priority: 0.6 },
    { path: 'blogs', priority: 0.7 },
  ];
  return [...routes.map(({ path, priority }) => ({
    url: path ? `${site.domain}/${path}/` : `${site.domain}/`,
    priority,
  })), ...products.map(product => ({url:site.domain+productPath(product.slug), priority:0.8})), ...posts.map(post => ({ url: `${site.domain}/blogs/${post.slug}/`, lastModified: new Date(post.updatedAt), priority: 0.7 }))];
}
