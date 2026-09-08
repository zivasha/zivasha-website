import type { Metadata } from 'next';
import Link from 'next/link';
import { ZivashaLockup } from '@/components/brand/Logo';
import { site, wa } from '@/lib/site';

/**
 * The Instagram bio landing page ("link in bio"). Kept first-party so GA4 sees
 * the visit (the bio URL carries UTMs — see instagram/TRACKING.md); deliberately
 * not in the sitemap and noindexed — it exists for social traffic, not search.
 */
export const metadata: Metadata = {
  title: 'Links',
  description: 'Zivasha — order on WhatsApp, corporate gifting, this season’s hampers.',
  robots: { index: false, follow: true },
};

export default function Links() {
  return (
    <section className="section">
      <div className="wrap links-col">
        <ZivashaLockup height={52} tone="light" tagline />
        <p className="eyebrow">Diwali 2026 · Delhi NCR</p>
        <a className="btn gold links-btn" href={wa('Hi Zivasha! I would like to place an order.', 'IG-BIO')} target="_blank" rel="noopener">
          Order on WhatsApp
        </a>
        <Link className="btn ghost links-btn" href="/corporate-gifting/">
          Corporate &amp; bulk gifting
        </Link>
        <Link className="btn ghost links-btn" href="/shop/">
          This season&rsquo;s hampers
        </Link>
        <Link className="btn ghost links-btn" href="/our-story/">
          Our story
        </Link>
        <p className="links-note">
          Logo customisation closes {site.customisationCutoffShort} · Final Diwali dispatch{' '}
          {site.finalDispatchShort}
        </p>
      </div>
    </section>
  );
}
