import type { Metadata } from 'next';
import Link from 'next/link';
import { site, wa } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pay a confirmed order',
  description: 'Confirm your ZIVASHA order on WhatsApp, then pay the agreed amount through our Razorpay payment page.',
  robots: { index: false, follow: true },
};

export default function Payment() {
  return <>
    <section className="page-hero">
      <p className="eyebrow">Ordering &amp; payment</p>
      <h1>Your order, <em>ready to confirm.</em></h1>
      <p>Agree your products, quantity, delivery and final total with ZIVASHA on WhatsApp before making a payment.</p>
    </section>
    <section className="section">
      <div className="wrap narrow payment-panel">
        <ol className="order-steps">
          <li><strong>Confirm the order</strong><span>We confirm availability, packaging, ingredients, taxes and delivery charges.</span></li>
          <li><strong>Pay the agreed total</strong><span>Continue to the Razorpay page named <b>Zivasha</b>. Enter only the amount confirmed for your order and add your order reference in the note.</span></li>
          <li><strong>Share the reference</strong><span>Send your payment reference on WhatsApp. We verify receipt and confirm the next steps for your order.</span></li>
        </ol>
        <a className="btn gold payment-primary" href={site.paymentUrl} target="_blank" rel="noopener noreferrer">Continue to Razorpay ↗</a>
        <p className="form-note">Opens razorpay.me/@zivasha in a new tab. Payments are entered on Razorpay; ZIVASHA does not collect your card details on this website.</p>
        <a className="btn ghost" href={wa('Hi ZIVASHA! Please confirm my order and final payable amount before I pay.', 'WEB-payment')} target="_blank" rel="noopener noreferrer">Confirm my order on WhatsApp</a>
        <p>Need to choose a gift first? <Link href="/shop/">Explore the collection</Link>.</p>
      </div>
    </section>
  </>;
}
