export const site = {
  name: 'Zivasha',
  legalName: 'Zivasha',
  domain: 'https://zivasha.in',
  tagline: 'Tradition · Nourished · Gifted',
  motto: 'Rooted in Tradition. Made for Today.',
  // ⚠️ REPLACE BEFORE LAUNCH — carried over from the draft brochure; verify this
  // number is actually yours (it may be a placeholder) before the site goes live.
  whatsapp: '919800139991',
  whatsappDisplay: '+91 98001 39991',
  email: 'hello@zivasha.in',
  serviceArea: 'Delhi NCR — Delhi, Gurgaon, Noida, Ghaziabad, Faridabad',
  instagram: '', // set to https://instagram.com/zivasha.in once the handle is claimed — the footer link renders automatically
  linkedin: '', // add when the company page exists
  // Compliance: leave empty until each is in hand — the site renders the
  // corresponding claims only when set. Never claim a licence, report or
  // formulation before it exists (FSSAI Advertising & Claims Regulations).
  fssaiNumber: '',
  gstin: '',
  nablReportUrl: '', // set to the PDF link the day the lab report arrives
  // Season gates (Diwali 2026)
  customisationCutoff: '15 October 2026',
  customisationCutoffShort: '15 Oct',
  finalDispatch: '1 November 2026',
  finalDispatchShort: '1 Nov',
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
