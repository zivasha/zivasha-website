'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    __reveals?: () => void;
  }
}

/**
 * Scroll-reveal re-trigger for client-side navigations. The engine itself is
 * an inline script at the end of <body> (see layout.tsx) so first-paint
 * reveals don't wait for hydration; this component only re-runs it when the
 * route changes and new [data-reveal] elements enter the DOM.
 */
export default function Reveals() {
  const pathname = usePathname();

  useEffect(() => {
    window.__reveals?.();
  }, [pathname]);

  return null;
}
