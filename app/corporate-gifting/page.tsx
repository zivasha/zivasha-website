import type { Metadata } from 'next';
import EnquiryForm from '@/components/EnquiryForm';
import JsonLd from '@/components/JsonLd';
import PageBanner from '@/components/PageBanner';
import ProductCard from '@/components/ProductCard';
import { productImage } from '@/lib/images';
import { hampers, slabExceptions, slabPricing } from '@/lib/products';
import { faqJsonLd, pageOg, productListJsonLd } from '@/lib/seo';
import { site, waCorporate } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Corporate Diwali Gifts Delhi NCR — Bulk Dry Fruit Hampers',
  description:
    'Corporate Diwali gifting in Delhi NCR: premium dry fruit hampers ₹649–₹2,899, free logo sleeve from 25 boxes, published slab pricing, 50% advance terms. Enquire on WhatsApp.',
  openGraph: pageOg(
    productImage('story-gifting'),
    'The Zivasha deep-green trunk hamper with brass clasps, jars and laddus inside',
  ),
};

const hamperLd = productListJsonLd(
  'Corporate Diwali Gift Hampers',
  '/corporate-gifting/',
  hampers.map((p) => ({ p, image: productImage(p.slug) })),
);

// Written to answer the questions procurement teams actually search for —
// each q/a renders on the page AND ships as FAQPage JSON-LD (they must match).
// Compliance rule applies here too: no licence/lab/nutrition claims.
const faqs = [
  {
    q: 'What is the minimum order for corporate Diwali hampers?',
    a: 'There is no minimum — single boxes are welcome at list price. The free logo sleeve starts at 25 boxes, and slab discounts start at 50 boxes, up to 22% off at 500+.',
  },
  {
    q: 'Can you put our company logo on the hampers?',
    a: `Yes. Every order of 25 boxes or more includes a free logo sleeve, and we share a free mockup for sign-off before anything is printed. Logo customisation for Diwali 2026 closes on ${site.customisationCutoff}.`,
  },
  {
    q: 'Which areas do you deliver to?',
    a: `We deliver across Delhi NCR — Delhi, Gurgaon, Noida, Ghaziabad and Faridabad. Final Diwali dispatch is ${site.finalDispatch}, so every order arrives before Dhanteras.`,
  },
  {
    q: 'Can we see a sample before placing a bulk order?',
    a: 'Yes — we hand-deliver a sample box to your office before you commit, along with the full documentation pack for your procurement team.',
  },
  {
    q: 'What are the payment terms?',
    a: 'Standard terms are a 50% advance with your purchase order and the balance before dispatch. Pricing is published — the slab table above is the actual discount, no quote-chasing.',
  },
  {
    q: 'What do the hampers cost?',
    a: 'The corporate range runs ₹649 – ₹2,899 per box ex-GST — from the entry Aarambh 3-jar hamper to the flagship Signature Utsav combo with gond laddus and seed bars inside.',
  },
];

// Compliance-gated lines: the unhedged claims render only once the document
// actually exists (set nablReportUrl / fssaiNumber / gstin in lib/site.ts).
const derisk = [
  site.nablReportUrl
    ? 'Independent NABL lab report for the season’s sourcing lots — aflatoxin, moisture, microbiology'
    : 'Independent NABL lab testing booked for the season’s sourcing lots — the report is shared with every buyer the day it arrives',
  site.fssaiNumber && site.gstin
    ? 'FSSAI licence and GST registration documents with every quote'
    : 'FSSAI licence and GST registration copies shared with every quote the day each is issued (both applications in process)',
  'A sample box hand-delivered to your office before you commit',
  'Free mockup of the sleeve with your logo before printing',
  'Written delivery commitment and a named WhatsApp contact',
  'Standard terms: 50% advance with PO, balance before dispatch — no surprises',
];

export default function CorporateGifting() {
  return (
    <>
      <JsonLd data={hamperLd} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageBanner
        eyebrow="Corporate & Bulk Gifting · Diwali 2026"
        title={<>Hampers your clients remember. Terms procurement <em>approves</em>.</>}
        lede="Client gifting, dealer gifting, doctor gifting and employee gifting across Delhi NCR — published pricing, logo customisation from 25 boxes, and documentation that de-risks the decision."
        image={productImage('story-gifting')}
        alt="The Zivasha deep-green trunk hamper with brass clasps, jars and laddus inside"
      >
        <a className="btn gold" href={waCorporate('WEB-corp')} target="_blank" rel="noopener">
          Enquire on WhatsApp
        </a>
        <a className="btn ghost on-dark" href="#enquiry">
          Send an enquiry
        </a>
      </PageBanner>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">The range</p>
            <h2>Six hampers, ₹649 – ₹2,899</h2>
            <p>All prices ex-GST corporate list. The combo hampers — with Gond Laddus and Seven
              Seeds Nutribars inside — are exclusive to Zivasha.</p>
          </div>
          <div className="cards">
            {hampers.map((p) => (
              <ProductCard key={p.slug} p={p} category="Corporate Hamper" context="corporate" waCode="WEB-corp" />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="split">
            <div>
              <p className="eyebrow">Published slab pricing</p>
              <h2>No quote-chasing. The discounts are right here.</h2>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>Quantity</th>
                      <th>Discount</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slabPricing.map((s) => (
                      <tr key={s.qty}>
                        <td>{s.qty}</td>
                        <td>{s.discount}</td>
                        <td>{s.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="form-note" style={{ margin: '10px 0 0' }}>
                {slabExceptions}
              </p>
              <div className="gate-strip">
                <div className="gate-chip">
                  <b>{site.customisationCutoff}</b>
                  <span>Logo customisation closes</span>
                </div>
                <div className="gate-chip">
                  <b>{site.finalDispatch}</b>
                  <span>Final Diwali dispatch — arrives before Dhanteras</span>
                </div>
              </div>
            </div>
            <div>
              <p className="eyebrow">Why buyers trust us</p>
              <h2>The de-risk pack, with every order</h2>
              <ul className="checklist">
                {derisk.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <div className="section-head">
            <p className="eyebrow">Before you ask</p>
            <h2>
              The questions every buyer asks, <em>answered</em>
            </h2>
          </div>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="enquiry">
        <div className="wrap narrow">
          <div className="section-head">
            <p className="eyebrow">Start the conversation</p>
            <h2>Get a quote and a sample box</h2>
            <p>Tell us roughly what you need — we reply the same day.</p>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
