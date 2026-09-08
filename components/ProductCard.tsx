import Image from 'next/image';
import { ProductArt } from '@/components/brand/ProductArt';
import { blurProps, productImage } from '@/lib/images';
import { inr, type Product } from '@/lib/products';
import { wa } from '@/lib/site';

type Props = {
  p: Product;
  category: string;
  /** 'corporate' shows B2B framing for ex-GST prices; 'retail' (default) keeps it buyer-friendly. */
  context?: 'retail' | 'corporate';
  /** Responsive srcset hint — default matches the standard .cards grid; 3-card grids pass their own. */
  sizes?: string;
  /** WhatsApp source tag for the card's order link (grammar in instagram/TRACKING.md). */
  waCode?: string;
};

export default function ProductCard({
  p,
  category,
  context = 'retail',
  sizes = '(max-width: 686px) 100vw, (max-width: 1120px) 46vw, 342px',
  waCode = 'WEB-shop',
}: Props) {
  const msg = `Hi Zivasha! I'd like to order the ${p.name} (${category}, ${p.weight}, ${inr(p.price)}). Please share availability.`;
  const photo = productImage(p.slug);
  const note =
    p.priceNote === 'ex-GST'
      ? context === 'corporate'
        ? 'ex-GST · B2B list'
        : '+ GST · single boxes welcome'
      : 'MRP incl. GST';
  return (
    <article className="card">
      {photo ? (
        <div className="card-photo">
          <Image src={photo} alt={`${p.name} — ${category}`} fill sizes={sizes} quality={60} {...blurProps(photo)} />
          {p.badge && <span className="badge overlay">{p.badge}</span>}
        </div>
      ) : (
        <>
          <div className="card-art" aria-hidden="true">
            <ProductArt art={p.art} />
          </div>
          {/* outside the aria-hidden art so screen readers hear it; .card is position:relative */}
          {p.badge && <span className="badge overlay">{p.badge}</span>}
        </>
      )}
      <div className="card-body">
        <h3>{p.name}</h3>
        <p className="desc">{p.desc}</p>
        <div className="price-row">
          <span className="price">{inr(p.price)}</span>
          <span className="price-note">{note}</span>
          <span className="weight">{p.weight}</span>
        </div>
        <a className="btn small" href={wa(msg, waCode)} target="_blank" rel="noopener">
          Order on WhatsApp
        </a>
      </div>
    </article>
  );
}
