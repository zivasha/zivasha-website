import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import Analytics from '@/components/Analytics';
import Reveals from '@/components/Reveals';
import Header from '@/components/Header';
import {CartProvider} from '@/components/CartProvider';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import { site } from '@/lib/site';
import { hashedPath } from '@/lib/images';
import './globals.css';
import './ivory-boutique.css';

// Variable fonts: one file per family/style covers every weight the CSS uses
// (serif italics power the editorial display accents on the storytelling pages)
// — 4 preloaded font files instead of 9 static ones.
const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
});
const body = Manrope({ subsets: ['latin'], weight: 'variable', display: 'swap', variable: '--font-body' });

export const viewport: Viewport = {
  themeColor: '#f8f3e9', // --cream, single light theme
};

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: 'ZIVASHA — Everyday Laddus, Nutri Bars & Dry-Fruit Gifts',
    template: '%s | Zivasha',
  },
  description:
    'Gond Laddu, Khapli Laddu and Seven Seeds Nutri Bar for everyday snack moments. Sweetened with jaggery, no white sugar added. Explore ingredients, pack sizes and dry-fruit gifts.',
  // './' resolves per-route against metadataBase → every page gets its own canonical + og:url
  alternates: { canonical: './' },
  openGraph: {
    siteName: 'Zivasha',
    url: './',
    // Compressed 1200×630 variant (prebuild script) keeps WhatsApp previews fast;
    // falls back to the original before the first prebuild run.
    images: [
      {
        url: hashedPath('/og/four-jar-festive-gift.jpg') ?? '/products/four-jar-festive-gift.jpg',
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
  '@type': 'Organization',
  '@id': `${site.domain}/#business`,
  name: 'Zivasha',
  slogan: site.motto,
  url: site.domain,
  logo: `${site.domain}/images/zivasha-logo.png`,
  image: `${site.domain}/products/four-jar-festive-gift.jpg`,
  email: site.email,
  telephone: `+${site.whatsapp}`,
  areaServed: ['Delhi', 'Gurgaon', 'Noida', 'Ghaziabad', 'Faridabad'],
  ...(sameAs.length ? { sameAs } : {}),
  description:
    'Traditional Gond and Khapli laddus, Seven Seeds Nutri Bar and dry-fruit gifts for everyday moments and occasions. A brand of Phoeniix AgriNexa Ventures, with a Delhi NCR delivery focus.',
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
      <body className={`${serif.variable} ${body.variable}`}>
        {/* JS marker gates the scroll-reveal hiding CSS — without JS everything stays visible */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <Reveals />
        <CartProvider><Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppFab /></CartProvider>
        {/* Scroll-reveal engine as an inline script so above-fold reveals fire at
            first paint instead of waiting ~2-4s for React hydration on slow
            connections (this was the main Speed Index cost). Runs when the HTML
            finishes parsing; <Reveals /> re-invokes it on client-side navigation. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__reveals=function(){var els=document.querySelectorAll('[data-reveal]:not(.revealed)');if(!els.length)return;if(!('IntersectionObserver' in window)){els.forEach(function(el){el.classList.add('revealed')});return}var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target)}})},{threshold:0.15,rootMargin:'0px 0px -40px 0px'});els.forEach(function(el){io.observe(el)})};window.__reveals();`,
          }}
        />
      </body>
    </html>
  );
}
