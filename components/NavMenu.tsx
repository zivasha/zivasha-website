'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

// prefetch stays on only for the two conversion routes; the rest load on tap.
const links = [
  { href: '/shop/', label: 'The collection', prefetch: true },
  { href: '/corporate-gifting/', label: 'Corporate gifting', prefetch: true },
  { href: '/our-story/', label: 'Our story', prefetch: false },
  { href: '/blogs/', label: 'Blogs', prefetch: false },
  { href: '/contact/', label: 'Contact', prefetch: false },
];

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Close ✕' : 'Menu ☰'}
      </button>
      <nav id="main-nav" className={open ? 'nav open' : 'nav'} aria-label="Main">
        {links.map((l) => {
          const active = pathname === l.href || pathname === l.href.replace(/\/$/, '') || pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              prefetch={l.prefetch}
              className={active ? 'active' : undefined}
              aria-current={active ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          );
        })}

      </nav>
    </>
  );
}
