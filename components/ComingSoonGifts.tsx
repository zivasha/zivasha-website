import Image from 'next/image';
import Link from 'next/link';

export default function ComingSoonGifts({ showLink = true }: { showLink?: boolean }) {
  return <section className="section gift-preview" id="coming-soon" aria-labelledby="gift-preview-title">
    <div className="wrap">
      <div className="boutique-section-heading"><div><p className="eyebrow">Coming soon · A wider gifting collection</p><h2 id="gift-preview-title">A new world of gifting.</h2></div>{showLink && <Link className="text-link" href="/gift-hampers/">Explore gift hampers ↗</Link>}</div>
      <p className="gift-preview-intro">Gift hampers for different styles, occasions and budgets. We’re preparing decorative tray sets, keepsake pieces, potlis and pouches alongside our dry-fruit gifting collection.</p>
      <figure className="gift-preview-figure"><Image src="/images/gift-hampers-coming-soon.webp" width={1536} height={1024} unoptimized sizes="(max-width: 700px) 100vw, 1160px" alt="Coming soon: decorative tray gifts, pink potli hampers and mint-green jar gift sets, shown with AI-edited backgrounds and styling"/><figcaption>Preview based on product photographs with AI-edited backgrounds and styling. Final products, contents, materials and availability will be confirmed before launch.</figcaption></figure>
      <p className="gift-preview-status">This new range is a preview and is not yet open for orders. Launch date and prices will be announced when confirmed.</p>
    </div>
  </section>;
}
