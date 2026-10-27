const mithaiOrderNotice = 'Mithai orders are closed until after Diwali.';
const dryFruitOrderNotice = 'Dry-fruit hampers remain open, subject to availability and delivery confirmation.';

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
  mithaiOrderNotice,
  dryFruitOrderNotice,
  orderNotice: `${mithaiOrderNotice} ${dryFruitOrderNotice}`,
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
  wa('Hi ZIVASHA! I have a bulk enquiry or need help with an existing order.', code);

export const waBulk = (code = 'WEB-bulk') =>
  wa('Hi ZIVASHA! I have a bulk enquiry. Product/design: ___ | Quantity: ___ | Delivery pincode: ___ | Required date: ___', code);

export const waCorporate = (code = 'WEB-corp') =>
  wa('Hi Zivasha! I am enquiring about corporate Diwali gifting. Company: ___ | Approx. units: ___ | City: ___', code);
