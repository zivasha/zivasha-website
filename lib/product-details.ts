import { type Product } from './products';

type Detail = { title: string; intro: string; packaging: string; ingredients: string; note: string };

/** Approved catalogue facts only. Unconfirmed recipe, stock and shelf-life details stay explicit. */
export const productDetails: Record<string, Detail> = {
  'festive-potli-basket': {
    title: 'Dry-Fruit Potli Gift Basket',
    intro: 'A dry-fruit gift in a decorative beige basket, with pink-and-gold and ivory potlis. This format brings individual dry-fruit selections together in a traditional presentation for festive, family or corporate gifting.',
    packaging: 'Decorative basket with individual potlis. Final potli count and fill weights are confirmed with your quotation.',
    ingredients: 'Almonds, cashews, pistachios and raisins, plus dates or mixed seeds. The final selection is confirmed before payment.',
    note: 'Contains tree nuts. Ask for the final ingredient and allergen details for each filled potli.',
  },
  'four-jar-festive-gift': {
    title: 'Four-Jar Dry-Fruit Gift Hamper',
    intro: 'Four glass jars with gold lids sit inside an ornate suitcase-style gift box. Almonds, cashews, pistachios and raisins are presented separately, making it easy to choose a four-variety dry-fruit gift.',
    packaging: 'Four glass jars with gold lids in a fitted presentation box. Confirm the available box design and the weight in each jar when ordering.',
    ingredients: 'Almonds, cashews, pistachios and raisins.',
    note: 'Contains tree nuts. Ask for the final pack labels if you have an ingredient or allergy question.',
  },
  'three-jar-floral-gift': {
    title: 'Three-Jar Floral Dry-Fruit Gift Box',
    intro: 'A pink floral gift box with a rope handle, gold satin and coordinated jar lids. This three-variety assortment brings almonds, cashews and raisins together in one presentation.',
    packaging: 'Three jars in a handled floral box. The catalogue shows an approximate total fill; individual jar weights are confirmed before payment.',
    ingredients: 'Almonds, cashews and raisins.',
    note: 'Contains tree nuts. The complete pack labels can be confirmed with your order.',
  },
  'navy-three-jar-gift': {
    title: 'Navy Three-Jar Dry-Fruit Gift Box',
    intro: 'A navy printed sleeve opens to a gold slide-out tray holding three glass jars. Choose this presentation for a dry-fruit gift featuring almonds, cashews and raisins in separate containers.',
    packaging: 'Navy printed sleeve, gold slide-out tray and three glass jars. Packaging availability and individual fill weights are confirmed on enquiry.',
    ingredients: 'Almonds, cashews and raisins.',
    note: 'Contains tree nuts. Check the final pack labels for complete ingredient and allergen information.',
  },
  'turquoise-gift-tray': {
    title: 'Four-Compartment Dry-Fruit Gift Box — 700 g',
    intro: 'Cashews, almonds, pistachios and raisins are arranged in four gold-lined compartments inside a turquoise presentation box. The 700 g total assortment offers four dry-fruit varieties in one tray.',
    packaging: 'Turquoise presentation box with four gold-lined compartments. The split between varieties is confirmed with your order.',
    ingredients: 'Cashews, almonds, pistachios and raisins.',
    note: 'Contains tree nuts. Please confirm final ingredient labels before ordering for someone with an allergy.',
  },
  'slim-festive-box': {
    title: 'Slim Dry-Fruit Gift Box — 300 g',
    intro: 'A compact pink gift box with four gold-lined sections and 300 g of dry fruits in total. The selection includes almonds, cashews and raisins, with dates or pistachios as the fourth variety.',
    packaging: 'Slim presentation box with four sections. Confirm the fourth variety and individual fill weights when placing your request.',
    ingredients: 'Almonds, cashews and raisins, plus dates or pistachios.',
    note: 'Contains tree nuts. The final assortment and ingredient labels are confirmed before payment.',
  },
  'gond-laddu': {
    title: 'Gond Laddu — 250 g & 500 g Containers',
    intro: 'ZIVASHA Gond Laddu brings together edible gond, nuts, coconut and jaggery. Choose a 250 g or 500 g container for sharing at home or including in a gift selection.',
    packaging: '250 g and 500 g containers. The 500 g price is listed; the 250 g pack is quoted on request.',
    ingredients: 'Key ingredients: edible gond, nuts, coconut and jaggery. This is a product overview, not the complete ingredient declaration.',
    note: 'Contains nuts. Ask us to confirm the complete ingredient list and other allergens before ordering.',
  },
  'khapli-laddu': {
    title: 'Khapli Wheat Laddu — 250 g & 500 g Containers',
    intro: 'A laddu made with khapli wheat, nuts, ghee and jaggery. ZIVASHA offers this mithai in 250 g and 500 g containers, with bulk gifting quotations available on enquiry.',
    packaging: '250 g and 500 g containers. Choose the pack size before adding it to your cart.',
    ingredients: 'Key ingredients: khapli wheat, nuts, ghee and jaggery. Confirm the complete ingredient declaration for your order.',
    note: 'Contains wheat (gluten), nuts and milk ingredients. Khapli wheat is not gluten-free.',
  },
  'seven-seeds-nutri-bar': {
    title: 'Seven Seeds Nutri Bar — 250 g & 500 g Containers',
    intro: 'A seed-filled bar made with seven seeds, oats, dates and nuts. Choose a 250 g or 500 g container for sharing, or enquire about adding the bars to a gift assortment.',
    packaging: '250 g and 500 g containers. The listed pack weight is the total contents, not the weight of one bar.',
    ingredients: 'Key ingredients: seven seeds, oats, dates and nuts. Ask us for the complete seed and ingredient list for your order.',
    note: 'Contains nuts and oats. No gluten-free claim is made; confirm the full allergen information before ordering.',
  },
  'six-tin-gift': {
    title: 'Six-Tin Dry-Fruit Gift Box',
    intro: 'Six individual tins sit in a fitted presentation box. Tell us your preferred dry-fruit selection and quantity so we can confirm the available assortment, packaging and quotation.',
    packaging: 'Fitted gift box with six tins. Final design, assortment and total net weight are confirmed on enquiry.',
    ingredients: 'Dry-fruit selection to be confirmed. The final quotation will specify the contents.',
    note: 'Allergen information depends on the confirmed assortment. Please share any ingredient restrictions with your enquiry.',
  },
  'mixed-celebration-gift': {
    title: 'Mixed Dry-Fruit, Laddu & Nutri-Bar Gift',
    intro: 'Bring dry fruits, laddus and nutri bars into one gift assortment. Share your occasion, quantity and preferred selection, and we will quote the combination with its final contents and packaging.',
    packaging: 'A mixed gift format, with packaging and total net weight selected and confirmed on enquiry.',
    ingredients: 'Dry fruits, laddus and nutri bars according to the agreed assortment.',
    note: 'Allergens depend on the selected products. Any Khapli Laddu included contains wheat (gluten), nuts and milk ingredients.',
  },
  'festive-quartet': {
    title: 'Festive Quartet — Four 100 g Gift Pouches',
    intro: 'Four 100 g standing pouches with a greeting card make up this 400 g gift format. Ask about an assortment of dry-fruit laddus, Gond laddus and Seven Seeds Nutri Bars.',
    packaging: 'Four standing pouches, 100 g each, with a greeting card. Product selection and final presentation are confirmed in the quotation.',
    ingredients: 'Choose from the stated laddu and nutri-bar options; the final assortment determines the ingredient list.',
    note: 'Confirm the complete ingredients and allergens for each chosen product before payment.',
  },
  'diwali-moments': {
    title: 'Diwali Moments — Two 100 g Gift Pouches',
    intro: 'A compact festive gift with two 100 g pouches, a greeting card and two diyas. Enquire with your quantity and preferred products to confirm the available selection and packaging.',
    packaging: 'Two 100 g pouches, one greeting card and two diyas. Food contents total 200 g; final selection is quoted individually.',
    ingredients: 'Pouch contents are selected and confirmed on enquiry.',
    note: 'Ingredient and allergen details depend on the confirmed pouch selection.',
  },
  'festive-mini': {
    title: 'Festive Mini — 100 g Pouch',
    intro: 'Choose a resealable 100 g pouch of dry-fruit laddu, Gond laddu or Seven Seeds Nutri Bar. Outer gift wrapping can be discussed when requesting your quotation.',
    packaging: 'One 100 g resealable pouch. Product choice and any outer wrapping are confirmed on enquiry.',
    ingredients: 'One chosen laddu or nutri-bar option per pouch. Ask for the full ingredient details of your selection.',
    note: 'Allergen information varies by product. Please confirm your chosen option before ordering.',
  },
  'nutri-jar': {
    title: 'Nutri Jar — Seven Seeds Nutri Bars, 250 g',
    intro: 'Seven Seeds Nutri Bars in a compact 250 g jar for gifting or sharing. Ask for the current quotation and available jar presentation before placing an order.',
    packaging: '250 g jar. The image illustrates the container range; the final jar and label are confirmed on enquiry.',
    ingredients: 'Key ingredients: seven seeds, oats, dates and nuts. Confirm the complete ingredient declaration for your order.',
    note: 'Contains nuts and oats. Confirm the full allergen information; no gluten-free claim is made.',
  },
  'nutty-box': {
    title: 'The Nutty Box — 500 g Laddu & Nutri-Bar Assortment',
    intro: 'A 500 g festive assortment of dry-fruit laddus and Seven Seeds Nutri Bars. We confirm the split between products, the packaging and the quotation after receiving your preferences.',
    packaging: '500 g total assortment. Final product quantities and gift packaging are confirmed on enquiry.',
    ingredients: 'Dry-fruit laddus and Seven Seeds Nutri Bars in the agreed selection.',
    note: 'Contains nuts; other allergens depend on the final selection. Ask for the full ingredient details.',
  },
};

export const productPath = (slug: string) => `/shop/${slug}/`;
export const productCategory = (p: Product) => p.kind === 'hamper' ? 'Dry-fruit gift hampers' : p.kind === 'mithai' ? 'Mithai' : p.kind === 'nutribar' ? 'Nutri bars' : 'Gifting formats';

export function productFaqs(p: Product) {
  const answer = p.kind === 'mithai'
    ? 'Mithai orders for this Diwali close on 20 October 2026 and reopen after Diwali. The reopening date is not yet confirmed.'
    : p.kind === 'hamper' || p.slug === 'six-tin-gift'
      ? 'Dry-fruit-only hamper enquiries remain open, including last-minute festive requests, subject to stock, packaging availability and delivery confirmation.'
      : 'Please confirm the deadline for your selected nutri-bar or mixed gift order with ZIVASHA. Availability and delivery are confirmed before payment.';
  return [
    {q: 'How do I order this product?', a: 'Choose your pack and quantity, add it to the cart and submit an order request. ZIVASHA confirms availability, GST, delivery charges and the final total before sending a secure Razorpay payment link.'},
    {q: 'Can I order in bulk?', a: 'Yes, you can request a bulk quotation. Share the product, number of packs, delivery city or pincode and required date. Any discount or custom packaging is confirmed individually.'},
    {q: 'Where is delivery available?', a: 'Our delivery focus is Delhi NCR. For other locations, ask us to confirm delivery feasibility, charges and the required date before payment.'},
    {q: 'What is the festive order deadline?', a: answer},
    {q: 'Where can I check shelf life and storage?', a: 'Check the final product label for storage instructions and best-before information. Ask us to confirm these details before ordering; we do not assume a shelf life for an unconfirmed batch.'},
  ];
}
