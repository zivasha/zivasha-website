'use client';

import { useState } from 'react';
import { hampers, inr } from '@/lib/products';
import { site, wa } from '@/lib/site';

/**
 * Enquiry form. Submitting composes a structured WhatsApp message —
 * no backend needed, and the enquiry lands where the team actually sells.
 */
export default function EnquiryForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get('website')) return; // honeypot
    const msg = [
      'Hi Zivasha! Gifting enquiry:',
      `Name: ${f.get('name')}`,
      `Company: ${f.get('company') || '— (personal order)'}`,
      `Phone: ${f.get('phone')}`,
      `Approx. units: ${f.get('units')}`,
      `Interested tier: ${f.get('tier')}`,
      `Notes: ${f.get('notes') || '—'}`,
    ].join('\n');
    window.open(wa(msg, 'WEB-form'), '_blank', 'noopener');
    setSent(true);
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" hidden aria-hidden="true" />
      <div className="form-row">
        <div>
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="company">Company (if corporate)</label>
          <input id="company" name="company" autoComplete="organization" />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label htmlFor="phone">Phone / WhatsApp</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="units">Approximate units</label>
          <select id="units" name="units" defaultValue="50–99">
            <option>Under 25 / personal order</option>
            <option>25–49</option>
            <option>50–99</option>
            <option>100–249</option>
            <option>250–499</option>
            <option>500+</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="tier">Interested tier</label>
        <select id="tier" name="tier" defaultValue={`${hampers[2].name} — ${inr(hampers[2].price)}`}>
          {hampers.map((h) => (
            <option key={h.slug}>{`${h.name} — ${inr(h.price)}`}</option>
          ))}
          <option>Laddus / Nutribars</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <div>
        <label htmlFor="notes">Anything else? (logo customisation, delivery date…)</label>
        <textarea id="notes" name="notes" rows={3} />
      </div>
      <button className="btn gold" type="submit">
        Send enquiry on WhatsApp
      </button>
      {sent && (
        <p className="form-note" role="status">
          WhatsApp should have opened with your enquiry — press send there and we’ll reply the same
          day with a quote and a sample-box offer.
        </p>
      )}
      <p className="form-note">
        Prefer email? Write to <a href={`mailto:${site.email}`}>{site.email}</a>. Corporate terms:
        50% advance with PO, balance before dispatch. Logo customisation closes{' '}
        {site.customisationCutoff}.
      </p>
    </form>
  );
}
