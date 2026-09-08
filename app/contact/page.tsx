import type { Metadata } from 'next';
import EnquiryForm from '@/components/EnquiryForm';
import PageBanner from '@/components/PageBanner';
import { productImage } from '@/lib/images';
import { pageOg } from '@/lib/seo';
import { site, waGeneric } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Zivasha — order on WhatsApp, corporate gifting enquiries, Delhi NCR delivery. We reply the same day.',
  openGraph: pageOg(
    productImage('story-pantry'),
    'A Zivasha jar tipped on its side, spilling almonds and pistachios beside a lit brass diya',
  ),
};

export default function Contact() {
  return (
    <>
      <PageBanner
        eyebrow="Contact"
        title={<>Talk to a person, <em>not a ticket</em></>}
        lede="WhatsApp is the fastest way to reach us — we reply the same day, usually within the hour."
        image={productImage('story-pantry')}
        alt="A Zivasha jar tipped on its side, spilling almonds and pistachios beside a lit brass diya"
      >
        <a className="btn gold" href={waGeneric('WEB-contact')} target="_blank" rel="noopener">
          WhatsApp {site.whatsappDisplay}
        </a>
      </PageBanner>

      <section className="section">
        <div className="wrap">
          <div className="split">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Reach us</h2>
              <ul className="checklist">
                <li>
                  <strong>WhatsApp / Phone:</strong>{' '}
                  <a href={waGeneric('WEB-contact')} target="_blank" rel="noopener">
                    {site.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <strong>Email:</strong> <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <strong>Delivery area:</strong> {site.serviceArea}. Bulk corporate deliveries to a
                  single address anywhere in NCR; retail orders by courier.
                </li>
                <li>
                  <strong>Corporate terms:</strong> 50% advance with PO, balance before dispatch.
                  Logo customisation closes {site.customisationCutoff}; final Diwali dispatch{' '}
                  {site.finalDispatch}.
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow">Enquiry form</p>
              <h2>Corporate &amp; bulk enquiry</h2>
              <p className="form-note" style={{ marginBottom: 12 }}>
                Ordering for home? WhatsApp is fastest — the form below is built for corporate and
                bulk orders, but personal orders are welcome too.
              </p>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
