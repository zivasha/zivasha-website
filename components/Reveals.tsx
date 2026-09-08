'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Scroll-reveal engine: elements carrying [data-reveal] fade-rise into view
 * the first time they enter the viewport. Respects prefers-reduced-motion
 * (CSS disables the transition; elements are simply visible).
 */
export default function Reveals() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]:not(.revealed)'));
    if (els.length === 0) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('revealed'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
