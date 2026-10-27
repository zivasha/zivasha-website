import type { Metadata } from 'next';
import Link from 'next/link';
import ComingSoonGifts from '@/components/ComingSoonGifts';
import SeasonNotice from '@/components/SeasonNotice';
import JsonLd from '@/components/JsonLd';
import { faqJsonLd, pageOg } from '@/lib/seo';
import { waBulk } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Gift Hampers for Corporate, Festive & Personal Gifting',
  description: 'Explore dry-fruit gift hampers and preview a wider gifting range coming soon. Submit individual order requests on our website; contact WhatsApp for bulk enquiries.',
  openGraph: pageOg('/images/gift-hampers-coming-soon.webp', 'ZIVASHA gift hamper collection coming soon; product photographs with AI-edited styling'),
};
const faqs = [
  { q: 'What types of gift hampers can I explore?', a: 'Our current collection includes dry-fruit hampers in jar, basket, tray and box formats. A broader range of decorative tray sets, keepsake pieces, potlis and pouches is coming soon. Preview designs are not yet open for orders.' },
  { q: 'How do I choose a hamper for my budget?', a: 'For individual purchases, browse the dry-fruit collection and submit an order request on our website. For bulk gifting, share your occasion, preferred design, quantity, budget, delivery pincode and required date on WhatsApp. Availability, final taxes, delivery charges and total are confirmed before payment.' },
  { q: 'Can I enquire about corporate or bulk gifting?', a: 'Yes. Share the number of recipients, delivery locations and any branding requirements. Customisation, minimum quantities, samples, stock and dispatch timing are checked for the selected design before a quotation is confirmed.' },
  { q: 'Are mithai and the coming-soon gift sets available now?', a: 'Mithai new orders are closed until after Diwali; the reopening date is not confirmed. Dry-fruit-only gift hamper enquiries remain open, subject to stock, packaging and delivery confirmation. Check standalone Nutri Bar and mixed-hamper availability separately. The new decorative gifting range is a preview only.' },
];
export default function GiftHampers() {
  return <>
    <JsonLd data={faqJsonLd(faqs)}/>
    <section className="page-hero"><p className="eyebrow">For celebrations, thank-yous &amp; everyday gestures</p><h1>Gift hampers,<br/><em>thoughtfully chosen.</em></h1><p>Find a gift that suits your occasion and the person receiving it. Explore dry-fruit hampers today, with more decorative gifts and keepsake formats coming soon.</p><div className="hero-ctas center"><Link className="btn" href="/shop/#hampers">Explore dry-fruit hampers</Link><a className="btn ghost" href="#coming-soon">Preview the new range</a></div></section>
    <ComingSoonGifts showLink={false}/>
    <section className="section alt"><div className="wrap everyday-grid"><article><p className="eyebrow">Available for enquiry</p><h2>Dry-fruit gift hampers</h2><p>Explore jar gifts, festive baskets, trays and boxes for family, friends, teams and clients. Check the selected hamper’s contents, approximate net weight and allergens. Availability and delivery are confirmed for your design and location.</p><Link className="text-link" href="/shop/#hampers">Browse the dry-fruit collection ↗</Link></article><article><p className="eyebrow">For your people</p><h2>Corporate &amp; occasion gifting</h2><p>Start with your requirement: gift type, quantity, budget, delivery pincodes and date. Tell us about branding or individual delivery needs so we can check what is possible.</p><Link className="text-link" href="/corporate-gifting/">Plan corporate gifting ↗</Link></article></div></section>
    <section className="section"><div className="wrap narrow"><div className="section-head"><h2>Before choosing your gift hamper</h2></div><div className="gift-faq">{faqs.map(f => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div><a className="btn" href={waBulk('WEB-gift-hampers')} target="_blank" rel="noopener noreferrer">Bulk enquiries on WhatsApp ↗</a></div></section>
    <section className="boutique-bulk wrap"><div><p className="eyebrow">Explore our food collection</p><h2>Gond Laddu &amp; Seven Seeds Nutri Bar</h2><p>Read the product details, ingredients and allergens. Current availability is confirmed before ordering.</p></div><div className="hero-ctas"><Link className="btn ghost" href="/shop/gond-laddu/">Gond Laddu</Link><Link className="btn ghost" href="/shop/seven-seeds-nutri-bar/">Seven Seeds Nutri Bar</Link></div></section>
    <div className="wrap"><SeasonNotice/></div>
  </>;
}
