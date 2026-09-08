import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import PageBanner from '@/components/PageBanner';
import ProductCard from '@/components/ProductCard';
import { productImage } from '@/lib/images';
import { laddus } from '@/lib/products';
import { pageOg, productListJsonLd } from '@/lib/seo';
import { wa } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Signature Gond & Dry Fruit Laddus',
  description:
    'Traditional gond laddus with jaggery, desi ghee and premium dry fruits — sweetened the traditional way. Gift jars and festive boxes, ₹425–₹1,149. Delhi NCR delivery.',
  openGraph: pageOg(
    productImage('story-indulge'),
    'A gond laddu broken open, glistening with ghee and roasted nuts',
  ),
};

const ladduLd = productListJsonLd(
  'Signature Gond & Dry Fruit Laddus',
  '/laddus/',
  laddus.map((p) => ({ p, image: productImage(p.slug) })),
);

const why = [
  { b: 'Gond, the winter strength-giver', s: 'Edible gum crystals, roasted in desi ghee the traditional way' },
  { b: 'Jaggery sweetness', s: 'Slow, warm sweetness the way the recipe was written' },
  { b: 'Loaded with dry fruits', s: 'Almonds, cashews and seeds in every bite' },
  { b: 'Freshly made batches', s: 'Small runs, batch-coded, best enjoyed within weeks' },
];

export default function Laddus() {
  return (
    <>
      <JsonLd data={ladduLd} />
      <PageBanner
        eyebrow="Signature Gond & Dry Fruit Laddus"
        title={<>The laddu your grandmother made <em>every winter</em></>}
        lede="Gond roasted in desi ghee, bound with jaggery, packed with premium nuts — a recipe from North Indian winters, made fresh for Diwali, Bhai Dooj and the wedding season."
        image={productImage('story-indulge')}
        alt="A gond laddu broken open, glistening with ghee and roasted nuts"
      >
        <a
          className="btn gold"
          href={wa("Hi Zivasha! I'd like to order Gond Laddus.", 'WEB-laddus')}
          target="_blank"
          rel="noopener"
        >
          Order laddus on WhatsApp
        </a>
      </PageBanner>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Choose your box</p>
            <h2>Three sizes, one recipe</h2>
          </div>
          <div className="cards three">
            {laddus.map((p) => (
              <ProductCard
                key={p.slug}
                p={p}
                category="Gond Laddu"
                waCode="WEB-laddus"
                sizes="(max-width: 720px) 100vw, (max-width: 1120px) 31vw, 342px"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">What makes them special</p>
            <h2>Tradition, ingredient by ingredient</h2>
          </div>
          <div className="commits">
            {why.map((c) => (
              <div key={c.b} className="commit">
                <b>{c.b}</b>
                <span>{c.s}</span>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: 'var(--muted)', marginTop: 24, fontSize: '0.9rem' }}>
            Also inside our Utsav Combo and Signature Utsav gift hampers — laddus and nutribars in
            the same box is a Zivasha exclusive.
          </p>
        </div>
      </section>
    </>
  );
}
