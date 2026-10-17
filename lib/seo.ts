import type { Metadata } from 'next';
import { hashedPath } from '@/lib/images';
import type { Product } from '@/lib/products';
import { site } from '@/lib/site';

/**
 * SEO helpers — one place for the Open Graph and JSON-LD shapes every page
 * shares, so search engines (and WhatsApp link previews, our primary share
 * channel) always get complete, consistent signals.
 */

/** Stable @id for the business node declared in the root layout's Organization JSON-LD. */
export const businessId = `${site.domain}/#business`;

/**
 * Full per-page Open Graph object. Next.js merges page metadata into the root
 * layout shallowly — a page that sets `openGraph` replaces the layout's whole
 * object — so this rebuilds every shared field around the page's own image.
 * og:title / og:description fall back to the page's title and description.
 */
export function pageOg(image: string | null, alt: string): Metadata['openGraph'] {
  // Prefer the compressed 1200×630 card scripts/generate-media.mjs derives from
  // the same source image (WhatsApp downloads og:image on every share — keep it
  // ~100KB, not the multi-MB original). ?v= content hash busts caches on change.
  const slug = image?.split('?')[0].replace(/^.*\//, '').replace(/\.[^.]+$/, '');
  const card = slug ? hashedPath(`/og/${slug}.jpg`) : null;
  return {
    siteName: site.name,
    url: './',
    locale: 'en_IN',
    type: 'website',
    images: [
      card
        ? { url: card, width: 1200, height: 630, alt }
        : { url: image ?? hashedPath('/og/og-brand.jpg') ?? '/images/og-brand.jpg', alt },
    ],
  };
}

/** Catalogue product descriptions without unconfirmed prices or stock claims. */
export function productListJsonLd(
  listName: string,
  pagePath: string,
  entries: { p: Product; image: string | null }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    itemListElement: entries.map(({ p, image }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        description: p.desc,
        ...(image ? { image: `${site.domain}${image}` } : {}),
        brand: { '@type': 'Brand', name: site.name },
      },
    })),
  };
}

/** FAQPage node — the q/a pairs must be the same text rendered on the page. */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
