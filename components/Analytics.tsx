'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Analytics loader — inert until measurement IDs are set in the environment
 * (see .env.example). When live, every click on a WhatsApp link fires a
 * `whatsapp_click` event to GA4 and a `Contact` event to Meta — the site's
 * primary conversion.
 */
export default function Analytics() {
  const enabled = Boolean(GA_ID || PIXEL_ID);
  useEffect(() => {
    if (!enabled) return;
    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement).closest?.('a[href*="wa.me"]');
      if (!a) return;
      const label = a.textContent?.trim().slice(0, 80) || 'whatsapp';
      window.gtag?.('event', 'whatsapp_click', {
        link_label: label,
        page_path: window.location.pathname,
      });
      window.fbq?.('track', 'Contact', { content_name: label });
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [enabled]);

  // Inert without measurement IDs — no listeners, no scripts.
  if (!enabled) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
          <Script id="ga4" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      {PIXEL_ID && (
        <Script id="meta-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
