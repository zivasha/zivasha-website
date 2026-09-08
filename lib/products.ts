import type { ArtKind } from '@/components/brand/ProductArt';

export type Product = {
  slug: string;
  name: string;
  desc: string;
  weight: string;
  price: number;
  priceNote: 'ex-GST' | 'MRP';
  badge?: string;
  art: ArtKind;
};

/**
 * All prices come from the consolidated business plan (Sept 2026).
 * Hampers are corporate list prices ex-GST (B2B from 25 boxes, slab discounts
 * from 50); laddus, nutribars and pouches are retail MRP inclusive of GST.
 */

export const hampers: Product[] = [
  {
    slug: 'aarambh',
    art: 'hamper3',
    name: 'Aarambh',
    desc: '3-jar hamper — California almonds, cashews, and roasted-salted pistachios or cranberries.',
    weight: '~300 g',
    price: 649,
    priceNote: 'ex-GST',
    badge: 'Entry gift',
  },
  {
    slug: 'utsav-volume',
    art: 'hamper4',
    name: 'Utsav',
    desc: '4-jar hamper — almonds, cashews, roasted-salted pistachios, and cranberry or anjeer.',
    weight: '~475 g',
    price: 1150,
    priceNote: 'ex-GST',
  },
  {
    slug: 'parampara-core',
    art: 'hamper4',
    name: 'Parampara',
    desc: '4-jar hamper — NPX 18/20 almonds, W240 cashews, Iranian pistachios, Medjool dates.',
    weight: '500 g',
    price: 1800,
    priceNote: 'ex-GST',
    badge: 'Corporate favourite',
  },
  {
    slug: 'signature',
    art: 'hamper5',
    name: 'Signature',
    desc: '5-jar hamper — Mamra almonds, premium cashews, Akbari pistachios, Afghan anjeer, Medjool dates.',
    weight: '500 g',
    price: 2200,
    priceNote: 'ex-GST',
    badge: 'Flagship',
  },
  {
    slug: 'utsav-combo',
    art: 'combo',
    name: 'Utsav Combo',
    desc: 'Parampara 4-jar hamper + 4 Signature Gond Laddus + 2 Seven Seeds Nutribars.',
    weight: '~840 g',
    price: 2199,
    priceNote: 'ex-GST',
    badge: 'Only at Zivasha',
  },
  {
    slug: 'signature-utsav',
    art: 'combo',
    name: 'Signature Utsav',
    desc: 'The Signature hamper + 6 Gond Laddus + 4 Seven Seeds Nutribars — the complete gift.',
    weight: '~1 kg',
    price: 2899,
    priceNote: 'ex-GST',
    badge: 'Grandest',
  },
];

export const laddus: Product[] = [
  {
    slug: 'laddu-jar',
    art: 'laddu',
    name: 'Gift Jar of 4',
    desc: 'Signature Gond & Dry Fruit Laddus — gond, jaggery, desi ghee and premium nuts.',
    weight: '~250 g',
    price: 425,
    priceNote: 'MRP',
  },
  {
    slug: 'laddu-box-8',
    art: 'laddu',
    name: 'Box of 8',
    desc: 'The family box — traditional winter nourishment, sweetened with jaggery.',
    weight: '~500 g',
    price: 749,
    priceNote: 'MRP',
    badge: 'Most gifted',
  },
  {
    slug: 'laddu-box-12',
    art: 'laddu',
    name: 'Festive Box of 12',
    desc: 'The celebration box for Diwali, Bhai Dooj and weddings.',
    weight: '~800 g',
    price: 1149,
    priceNote: 'MRP',
  },
];

export const nutribars: Product[] = [
  {
    slug: 'bar-single',
    art: 'bar',
    name: 'Single Bar',
    desc: 'Pumpkin, sunflower, flax, chia, sesame, watermelon and hemp seeds. Healthy indulgence, zero junk.',
    weight: '1 bar',
    price: 70,
    priceNote: 'MRP',
  },
  {
    slug: 'bar-6',
    art: 'bar',
    name: 'Pack of 6',
    desc: 'A week of clean snacking — desk drawer, gym bag, school tiffin.',
    weight: '6 bars',
    price: 420,
    priceNote: 'MRP',
  },
  {
    slug: 'bar-12',
    art: 'bar',
    name: 'Pack of 12',
    desc: 'The office box — corporate wellness packs available on request.',
    weight: '12 bars',
    price: 799,
    priceNote: 'MRP',
    badge: 'Office pack',
  },
];

/**
 * Pouch range expanded Sept 2026 (reference: full-catalogue dry fruit brands).
 * The first four SKUs carry plan-costed prices; the rest are priced from the
 * Sept-2026 Khari Baoli wholesale research at a ≥40% GM target — VERIFY each
 * against actual purchase invoices before printing MRP labels (35% GM floor).
 */
export const pouches: Product[] = [
  {
    slug: 'almond-500',
    art: 'pouch',
    name: 'California Almonds',
    desc: 'Everyday premium almonds, resealable pouch.',
    weight: '500 g',
    price: 649,
    priceNote: 'MRP',
  },
  {
    slug: 'mamra-250',
    art: 'pouch',
    name: 'Mamra Almonds',
    desc: 'The rare, oil-rich almond prized for generations — the connoisseur’s choice.',
    weight: '250 g',
    price: 1199,
    priceNote: 'MRP',
    badge: 'Rare & premium',
  },
  {
    slug: 'cashew-500',
    art: 'pouch',
    name: 'Whole Cashews',
    desc: 'Creamy whole cashews, resealable pouch.',
    weight: '500 g',
    price: 699,
    priceNote: 'MRP',
  },
  {
    slug: 'pista-250',
    art: 'pouch',
    name: 'Roasted Salted Pistachios',
    desc: 'Lightly salted, roasted in-shell pistachios.',
    weight: '250 g',
    price: 649,
    priceNote: 'MRP',
  },
  {
    slug: 'walnut-250',
    art: 'pouch',
    name: 'Walnut Kernels',
    desc: 'Light, fresh-cracked halves — packed in small batches for freshness.',
    weight: '250 g',
    price: 599,
    priceNote: 'MRP',
  },
  {
    slug: 'anjeer-250',
    art: 'pouch',
    name: 'Premium Anjeer',
    desc: 'Soft, honey-sweet dried figs.',
    weight: '250 g',
    price: 499,
    priceNote: 'MRP',
  },
  {
    slug: 'medjool-400',
    art: 'pouch',
    name: 'Medjool Dates',
    desc: 'The king of dates — plump, caramel-soft, naturally sweet.',
    weight: '400 g',
    price: 749,
    priceNote: 'MRP',
    badge: 'Bestseller abroad',
  },
  {
    slug: 'apricot-250',
    art: 'pouch',
    name: 'Dried Apricots',
    desc: 'Sun-dried Turkish apricots — tangy-sweet, no added sugar needed by nature.',
    weight: '250 g',
    price: 449,
    priceNote: 'MRP',
  },
  {
    slug: 'cranberry-250',
    art: 'pouch',
    name: 'Dried Cranberries',
    desc: 'Ruby-red, tart-sweet — for snacking, salads and baking.',
    weight: '250 g',
    price: 349,
    priceNote: 'MRP',
  },
  {
    slug: 'raisin-black-250',
    art: 'pouch',
    name: 'Black Raisins',
    desc: 'Seedless Afghan-style black raisins — deep, winey sweetness.',
    weight: '250 g',
    price: 299,
    priceNote: 'MRP',
  },
  {
    slug: 'makhana-100',
    art: 'pouch',
    name: 'Makhana (Fox Nuts)',
    desc: 'Feather-light lotus seeds — the classic fasting and evening snack.',
    weight: '100 g',
    price: 299,
    priceNote: 'MRP',
  },
  {
    slug: 'seeds-mix-250',
    art: 'pouch',
    name: 'Seven Seeds Mix',
    desc: 'The Nutribar’s seven seeds, loose — pumpkin, sunflower, flax, chia, sesame, watermelon, hemp.',
    weight: '250 g',
    price: 399,
    priceNote: 'MRP',
  },
  {
    slug: 'festive-mix-250',
    art: 'pouch',
    name: 'Festive Trail Mix',
    desc: 'Almonds, cashews, pistachios, raisins and cranberries — the celebration handful.',
    weight: '250 g',
    price: 499,
    priceNote: 'MRP',
  },
];

export const slabPricing = [
  { qty: '25 – 49 boxes', discount: 'List price', note: 'Free logo sleeve from 25 boxes' },
  { qty: '50 – 99 boxes', discount: '− 8%', note: '' },
  { qty: '100 – 249 boxes', discount: '− 12%', note: '' },
  { qty: '250 – 499 boxes', discount: '− 18%', note: '' },
  { qty: '500+ boxes', discount: '− 22%', note: 'Signature tier capped at −18%' },
];

export const slabExceptions =
  'Aarambh stays a flat ₹649 at every quantity (excluded from slab discounts) · Signature caps at −18%.';

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;
