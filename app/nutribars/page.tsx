import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import PageBanner from '@/components/PageBanner';
import ProductCard from '@/components/ProductCard';
import { productImage } from '@/lib/images';
import { nutribars } from '@/lib/products';
import { pageOg, productListJsonLd } from '@/lib/seo';
import { wa } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Seven Seeds Nutribar — Seed Snack Bars',
  description:
    'Seven Seeds Nutribar: pumpkin, sunflower, flax, chia, sesame, watermelon and hemp seeds in one clean bar. Singles, 6-packs, 12-packs and corporate wellness boxes.',
  openGraph: pageOg(
    productImage('bar-single'),
    'A Zivasha seed bar propped against its deep-green wrapper, seeds glistening',
  ),
};

const barLd = productListJsonLd(
  'Seven Seeds Nutribars',
  '/nutribars/',
  nutribars.map((p) => ({ p, image: productImage(p.slug) })),
);

const seeds = [
  { b: 'Pumpkin', s: 'Known for zinc and magnesium' },
  { b: 'Sunflower', s: 'A classic source of vitamin E' },
  { b: 'Flax', s: 'Prized for omega-3 and lignans' },
  { b: 'Chia', s: 'The fibre-dense little giant' },
  { b: 'Sesame', s: 'Calcium-rich, nutty depth' },
  { b: 'Watermelon', s: 'Delicate, protein-rich kernels' },
  { b: 'Hemp', s: 'Complete plant protein' },
];

export default function Nutribars() {
  return (
    <>
      <JsonLd data={barLd} />
      <PageBanner
        eyebrow="Seven Seeds Nutribar"
        title={<>Small bar. <em>Big goodness.</em></>}
        lede="Seven nutrient-rich seeds pressed into one clean bar — healthy indulgence, zero junk. The snack that earns its place in a desk drawer."
        image={productImage('bar-single')}
        alt="A Zivasha seed bar propped against its deep-green wrapper, seeds glistening"
      >
        <a
          className="btn gold"
          href={wa("Hi Zivasha! I'd like to order Seven Seeds Nutribars.", 'WEB-bars')}
          target="_blank"
          rel="noopener"
        >
          Order nutribars on WhatsApp
        </a>
      </PageBanner>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">The seven</p>
            <h2>Every seed, pulling its weight</h2>
          </div>
          <div className="commits tight">
            {seeds.map((s) => (
              <div key={s.b} className="commit">
                <b>{s.b}</b>
                <span>{s.s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Choose your pack</p>
            <h2>Singles to office boxes</h2>
            <p>
              Companies: nutribar wellness packs make an excellent year-round employee gift — ask us
              about bulk pricing.
            </p>
          </div>
          <div className="cards three">
            {nutribars.map((p) => (
              <ProductCard
                key={p.slug}
                p={p}
                category="Seven Seeds Nutribar"
                waCode="WEB-bars"
                sizes="(max-width: 720px) 100vw, (max-width: 1120px) 31vw, 342px"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
