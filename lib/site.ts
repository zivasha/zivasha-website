export const site = {
  name: 'ZIVASHA',
  legalName: 'Phoeniix AgriNexa Ventures',
  domain: 'https://zivasha.in',
  tagline: 'Tradition · Nourished · Gifted',
  motto: 'Rooted in Tradition. Made for Today.',
  // Confirmed by Sumit 2026-09-08 (replaced the draft-brochure placeholder).
  whatsapp: '919773695862',
  whatsappDisplay: '+91 97736 95862',
  email: 'hello@zivasha.in',
  serviceArea: 'Delhi NCR — Delhi, Gurgaon, Noida, Ghaziabad, Faridabad',
  instagram: 'https://www.instagram.com/zivashaofficial/',
  paymentUrl: 'https://razorpay.me/@zivasha',
  catalogueUrl: '/catalogue/ZIVASHA-Catalogue.pdf',
  mithaiCutoff: '20 October 2026',
  mithaiCutoffShort: '20 October',
  orderNotice: 'Mithai orders close 20 October and reopen after Diwali. Dry-fruit-only hamper enquiries remain open, including last-minute requests, subject to stock and delivery confirmation.',
  linkedin: '', // add when the company page exists
  // Compliance: leave empty until each is in hand — the site renders the
  // corresponding claims only when set. Never claim a licence, report or
  // formulation before it exists (FSSAI Advertising & Claims Regulations).
  fssaiNumber: '',
  gstin: '',
  nablReportUrl: '', // set to the PDF link the day the lab report arrives
};

/**
 * Build a WhatsApp click-to-chat link with a prefilled message.
 * `code` is a source tag (grammar in instagram/TRACKING.md) appended as " [WEB-…]"
 * so the team can tell from the chat's opening message which surface it came from.
 */
export function wa(message: string, code?: string): string {
  const text = code ? `${message} [${code}]` : message;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const waGeneric = (code = 'WEB-site') =>
  wa('Hi Zivasha! I would like to place an order.', code);

export const waCorporate = (code = 'WEB-corp') =>
  wa('Hi Zivasha! I am enquiring about corporate Diwali gifting. Company: ___ | Approx. units: ___ | City: ___', code);
