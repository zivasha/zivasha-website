import type { Metadata, Viewport } from 'next';
import { Cinzel, Cormorant_Garamond, Source_Sans_3 } from 'next/font/google';
import Analytics from '@/components/Analytics';
import Reveals from '@/components/Reveals';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import { site } from '@/lib/site';
import { hashedPath } from '@/lib/images';
import './globals.css';

// Variable fonts: one file per family/style covers every weight the CSS uses
// (serif italics power the editorial display accents on the storytelling pages)
// — 4 preloaded font files instead of 9 static ones.
const display = Cinzel({ subsets: ['latin'], weight: 'variable', display: 'swap', variable: '--font-display' });
const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
});
const body = Source_Sans_3({ subsets: ['latin'], weight: 'variable', display: 'swap', variable: '--font-body' });

export const viewport: Viewport = {
  themeColor: '#f7f1e3', // --cream, single light theme
};

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: 'Zivasha — Premium Dry Fruits, Gift Hampers, Gond Laddus & Seed Bars | Delhi NCR',
    template: '%s | Zivasha',
  },
  description:
    'Premium dry fruit gift hampers, Signature Gond Laddus and Seven Seeds Nutribars. Corporate Diwali gifting with logo customisation across Delhi NCR. Order on WhatsApp.',
  // './' resolves per-route against metadataBase → every page gets its own canonical + og:url
  alternates: { canonical: './' },
  openGraph: {
    siteName: 'Zivasha',
    url: './',
    // Compressed 1200×630 variant (prebuild script) keeps WhatsApp previews fast;
    // falls back to the original before the first prebuild run.
    images: [
      {
        url: hashedPath('/og/og-brand.jpg') ?? '/images/og-brand.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  // og:image + title/description carry over; the card type makes X/Twitter render them large.
  twitter: { card: 'summary_large_image' },
  // Keep Safari/Chrome from auto-linking prices and pincodes as phone numbers.
  formatDetection: { telephone: false },
  // Google Search Console "HTML tag" verification — set the env var in Vercel,
  // redeploy, click Verify. (DNS verification works too; then this stays unset.)
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

// Social profiles feed sameAs only once the handles exist (empty strings in
// lib/site.ts until claimed) — schema should never point at dead URLs.
const sameAs = [site.instagram, site.linkedin].filter(Boolean);

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${site.domain}/#business`,
  name: 'Zivasha',
  slogan: site.motto,
  url: site.domain,
  logo: `${site.domain}/icon.svg`,
  image: `${site.domain}/images/og-brand.jpg`,
  email: site.email,
  telephone: `+${site.whatsapp}`,
  priceRange: '₹70 – ₹2,899',
  areaServed: ['Delhi', 'Gurgaon', 'Noida', 'Ghaziabad', 'Faridabad'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Delhi',
    addressRegion: 'DL',
    addressCountry: 'IN',
  },
  ...(sameAs.length ? { sameAs } : {}),
  description:
    'Premium dry fruits, gift hampers, gond laddus and seed snack bars. Corporate and festive gifting, Delhi NCR.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline body script adds class="js" before React
    // hydrates (JS-detection gate for reveal animations) — an expected, deliberate
    // mismatch on this one element only.
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          </>
        )}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <link rel="dns-prefetch" href="https://connect.facebook.net" />
        )}
      </head>
      <body className={`${display.variable} ${serif.variable} ${body.variable}`}>
        {/* JS marker gates the scroll-reveal hiding CSS — without JS everything stays visible */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <Reveals />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
