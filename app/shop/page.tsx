import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import PageBanner from '@/components/PageBanner';
import ProductCard from '@/components/ProductCard';
import { productImage } from '@/lib/images';
import { hampers, laddus, nutribars, pouches } from '@/lib/products';
import { pageOg, productListJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Shop — Hampers, Laddus, Nutribars & Dry Fruits',
  description:
    'Shop Zivasha: dry fruit gift hampers from ₹649, Signature Gond Laddus, Seven Seeds Nutribars and premium dry fruit pouches. Order on WhatsApp, delivered across Delhi NCR.',
  openGraph: pageOg(
    productImage('col-basket'),
    'A Zivasha wicker hamper wrapped in cellophane with a gold bow',
  ),
};

const catalogueLd = productListJsonLd(
  'Zivasha Catalogue — Hampers, Laddus, Nutribars & Dry Fruit Pouches',
  '/shop/',
  [...hampers, ...laddus, ...nutribars, ...pouches].map((p) => ({
    p,
    image: productImage(p.slug),
  })),
);

const sections = [
  {
    id: 'hampers',
    eyebrow: 'Gift hampers',
    title: 'Hampers, ₹649 – ₹2,899',
    note: 'Prices + GST · single boxes welcome, final price confirmed on WhatsApp · B2B from 25 boxes with free logo sleeve, slab discounts from 50',
    items: hampers,
    cat: 'Gift Hamper',
  },
  {
    id: 'laddus',
    eyebrow: 'Signature Gond & Dry Fruit Laddus',
    title: 'The laddu range',
    note: 'MRP inclusive of GST',
    items: laddus,
    cat: 'Gond Laddu',
  },
  {
    id: 'nutribars',
    eyebrow: 'Seven Seeds Nutribar',
    title: 'The nutribar range',
    note: 'MRP inclusive of GST',
    items: nutribars,
    cat: 'Seven Seeds Nutribar',
  },
  {
    id: 'pouches',
    eyebrow: 'The dry fruit pantry',
    title: 'Thirteen pouches, ₹299 – ₹1,199',
    note: 'MRP inclusive of GST · resealable freshness pouches · from everyday almonds to rare Mamra',
    items: pouches,
    cat: 'Dry Fruit Pouch',
  },
];

export default function Shop() {
  return (
    <>
      <JsonLd data={catalogueLd} />
      <PageBanner
        eyebrow="The Zivasha Shop"
        title={<>Everything we make, <em>in one place</em></>}
        lede="Pick what you love, tap “Order on WhatsApp”, and we confirm availability, delivery date and payment on chat — usually within the hour."
        image={productImage('col-basket')}
        alt="A Zivasha wicker hamper wrapped in cellophane with a gold bow"
      />

      {sections.map((s, i) => (
        <section key={s.id} id={s.id} className={i % 2 ? 'section alt' : 'section'}>
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">{s.eyebrow}</p>
              <h2>{s.title}</h2>
              <p>{s.note}</p>
            </div>
            <div className={s.items.length === 3 ? 'cards three' : 'cards'}>
              {s.items.map((p) => (
                <ProductCard
                  key={p.slug}
                  p={p}
                  category={s.cat}
                  {...(s.items.length === 3
                    ? { sizes: '(max-width: 720px) 100vw, (max-width: 1120px) 31vw, 342px' }
                    : {})}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
