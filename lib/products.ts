export type Product = { slug: string; image?: string; name: string; desc: string; weight: string; kind: string; allergens?: string; };
export const products: Product[] = [
  {
    "slug": "festive-potli-basket",
    "image": "festive-potli-basket",
    "name": "The Festive Potli Basket",
    "desc": "Traditional pink-and-gold and ivory potlis in a beige decorative basket. Almonds, cashews, pistachios, raisins, plus dates or mixed seeds.",
    "weight": "Approx. 750–850 g total",
    "kind": "hamper"
  },
  {
    "slug": "four-jar-festive-gift",
    "image": "four-jar-festive-gift",
    "name": "The Four-Jar Festive Gift",
    "desc": "Four glass jars with gold lids in an ornate suitcase-style presentation box. Almonds, cashews, pistachios and raisins.",
    "weight": "Approx. 750–800 g total",
    "kind": "hamper"
  },
  {
    "slug": "three-jar-floral-gift",
    "image": "three-jar-floral-gift",
    "name": "The Three-Jar Floral Gift",
    "desc": "A pink floral box with gold satin, coordinated jar lids and a rope handle. Almonds, cashews and raisins.",
    "weight": "Approx. 600–650 g total",
    "kind": "hamper"
  },
  {
    "slug": "navy-three-jar-gift",
    "image": "navy-three-jar-gift",
    "name": "The Navy Three-Jar Gift",
    "desc": "A navy printed sleeve, gold slide-out tray and three glass jars. Almonds, cashews and raisins.",
    "weight": "Approx. 700–750 g total",
    "kind": "hamper"
  },
  {
    "slug": "turquoise-gift-tray",
    "image": "turquoise-gift-tray",
    "name": "The Turquoise Gift Tray",
    "desc": "A turquoise presentation box with four gold-lined compartments for cashews, almonds, pistachios and raisins.",
    "weight": "700 g total",
    "kind": "hamper"
  },
  {
    "slug": "slim-festive-box",
    "image": "slim-festive-box",
    "name": "The Slim Festive Box",
    "desc": "A slim pink box with four gold-lined sections. Almonds, cashews, raisins, plus dates or pistachios.",
    "weight": "300 g total",
    "kind": "hamper"
  },
  {
    "slug": "gond-laddu",
    "image": "gond-laddu",
    "name": "Gond Laddu",
    "desc": "Edible gond, nuts and coconut, sweetened with jaggery and khajoor (dates). No white sugar added. For everyday snack moments or sharing.",
    "weight": "250 g or 500 g container",
    "kind": "mithai"
  },
  {
    "slug": "khapli-laddu",
    "image": "khapli-laddu",
    "name": "Khapli Laddu",
    "desc": "Traditional khapli wheat, nut and ghee laddus, sweetened with jaggery. No white sugar added. A flavour to enjoy with your tea break.",
    "weight": "250 g or 500 g container",
    "kind": "mithai",
    "allergens": "Contains wheat (gluten), nuts and milk ingredients."
  },
  {
    "slug": "seven-seeds-nutri-bar",
    "image": "seven-seeds-nutri-bar",
    "name": "Seven Seeds Nutri Bar",
    "desc": "Seven seeds, oats and nuts, sweetened with jaggery and khajoor (dates). No white sugar added. Read the complete ingredients and allergens; child-specific age and texture suitability has not been established.",
    "weight": "250 g or 500 g container",
    "kind": "nutribar"
  },
  {
    "slug": "six-tin-gift",
    "name": "The Six-Tin Gift",
    "desc": "Six individual tins in a fitted presentation box. Dry-fruit assortment, total net weight and packaging are confirmed on enquiry.",
    "weight": "Net weight confirmed on enquiry",
    "kind": "format"
  },
  {
    "slug": "mixed-celebration-gift",
    "name": "The Mixed Celebration Gift",
    "desc": "Dry fruits, laddus and nutri bars in one gift assortment. Share your occasion and preferred selection; we confirm the contents and packaging.",
    "weight": "Contents and net weight confirmed on enquiry",
    "kind": "format"
  },
  {
    "slug": "festive-quartet",
    "name": "Festive Quartet",
    "desc": "Four standing pouches with a greeting card. Choose from dry-fruit laddus, Gond laddus and seven-seed nutri bars.",
    "weight": "4 × 100 g pouches",
    "kind": "format"
  },
  {
    "slug": "diwali-moments",
    "name": "Diwali Moments",
    "desc": "A compact festive gift with two pouches, a greeting card and two diyas.",
    "weight": "2 × 100 g pouches",
    "kind": "format"
  },
  {
    "slug": "festive-mini",
    "name": "Festive Mini",
    "desc": "A resealable pouch of dry-fruit laddu, Gond laddu or seven-seed nutri bar. Outer gift wrapping is available on enquiry.",
    "weight": "100 g pouch",
    "kind": "format"
  },
  {
    "slug": "nutri-jar",
    "image": "seven-seeds-nutri-bar",
    "name": "Nutri Jar",
    "desc": "Seven-seed nutri bars in a compact jar for gifting or sharing. Image illustrates the container range.",
    "weight": "250 g jar",
    "kind": "format"
  },
  {
    "slug": "nutty-box",
    "name": "The Nutty Box",
    "desc": "Dry-fruit laddus and seven-seed nutri bars in one festive assortment. Final selection and packaging are confirmed on WhatsApp.",
    "weight": "500 g assortment",
    "kind": "format"
  }
];
export const hampers = products.filter(p => p.kind === 'hamper');
export const laddus = products.filter(p => p.kind === 'mithai');
export const nutribars = products.filter(p => p.kind === 'nutribar');
export const giftingFormats = products.filter(p => p.kind === 'format');
