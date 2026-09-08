import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="page-hero">
      <p className="eyebrow">Lost in the pantry</p>
      <h1>
        This shelf is <em>empty</em>
      </h1>
      <p>
        The page you were after has been moved, renamed, or never existed — but everything good is
        still exactly where it should be.
      </p>
      <div className="hero-ctas center">
        <Link className="btn gold" href="/">
          Back home
        </Link>
        <Link className="btn ghost" href="/shop/">
          Browse the shop
        </Link>
      </div>
    </section>
  );
}
