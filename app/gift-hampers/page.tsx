import type { Metadata } from 'next';
import Link from 'next/link';
import ComingSoonGifts from '@/components/ComingSoonGifts';
import SeasonNotice from '@/components/SeasonNotice';
import JsonLd from '@/components/JsonLd';
import { faqJsonLd, pageOg } from '@/lib/seo';
import { waBulk } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Dry-Fruit Gift Hampers: Compare Boxes, Jars & Trays',
  description: 'Compare ZIVASHA dry-fruit boxes, jar gifts and trays by contents and total net weight. Submit individual order requests online or enquire on WhatsApp for bulk gifting.',
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
    <section className="section" aria-labelledby="compare-hampers">
      <div className="wrap">
        <div className="section-head"><p className="eyebrow">From our dry-fruit catalogue</p><h2 id="compare-hampers">A compact box or a jar hamper?</h2><p>Compare the named design, contents and total net weight. All six dry-fruit catalogue formats remain subject to stock, packaging and delivery confirmation.</p></div>
        <div className="everyday-grid">
          <article><p className="eyebrow">300 g total</p><h3>Slim Festive Box</h3><p>A compact pink box with four sections: almonds, cashews and raisins, plus dates or pistachios. Confirm the fourth variety and individual fill weights; the 300 g is for the whole assortment.</p><Link className="text-link" href="/shop/slim-festive-box/">View the 300 g Slim Festive Box ↗</Link></article>
          <article><p className="eyebrow">Approx. 700–750 g total</p><h3>Navy Three-Jar Gift</h3><p>Almonds, cashews and raisins in three glass jars, held in a navy sleeve and gold slide-out tray. The stated net weight covers all three jars together; individual jar weights require confirmation.</p><Link className="text-link" href="/shop/navy-three-jar-gift/">View the Navy Three-Jar Gift ↗</Link></article>
        </div>
        <p>Both assortments contain tree nuts. Check the complete pack labels for ingredient and allergen questions. <Link className="text-link" href="/shop/#hampers">Compare all six dry-fruit formats ↗</Link></p>
      </div>
    </section>
    <ComingSoonGifts showLink={false}/>
    <section className="section alt"><div className="wrap everyday-grid"><article><p className="eyebrow">Available for enquiry</p><h2>Dry-fruit gift hampers</h2><p>Explore jar gifts, festive baskets, trays and boxes for family, friends, teams and clients. Check the selected hamper’s contents, approximate net weight and allergens. Availability and delivery are confirmed for your design and location.</p><Link className="text-link" href="/shop/#hampers">Browse the dry-fruit collection ↗</Link></article><article><p className="eyebrow">For your people</p><h2>Corporate &amp; occasion gifting</h2><p>Start with your requirement: gift type, quantity, budget, delivery pincodes and date. Tell us about branding or individual delivery needs so we can check what is possible.</p><Link className="text-link" href="/corporate-gifting/">Plan corporate gifting ↗</Link></article></div></section>
    <section className="section"><div className="wrap narrow"><div className="section-head"><h2>Before choosing your gift hamper</h2></div><div className="gift-faq">{faqs.map(f => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div><a className="btn" href={waBulk('WEB-gift-hampers')} target="_blank" rel="noopener noreferrer">Bulk enquiries on WhatsApp ↗</a></div></section>
    <section className="boutique-bulk wrap"><div><p className="eyebrow">Explore our food collection</p><h2>Gond Laddu &amp; Seven Seeds Nutri Bar</h2><p>Read the product details, ingredients and allergens. Current availability is confirmed before ordering.</p></div><div className="hero-ctas"><Link className="btn ghost" href="/shop/gond-laddu/">Gond Laddu</Link><Link className="btn ghost" href="/shop/seven-seeds-nutri-bar/">Seven Seeds Nutri Bar</Link></div></section>
    <div className="wrap"><SeasonNotice/></div>
  </>;
}
