# Zivasha Photography Brief & Prompt Pack

The professional way to get top-notch, real-looking product images that all belong to ONE
catalogue. Use this two ways: (a) paste the prompts into ChatGPT/Midjourney to generate
photorealistic images today, and/or (b) hand this document to the photographer for the real
shoot — it is a standard shot list.

**Why the old images looked odd:** they were one-off generations — different surfaces, different
light, different angles, text baked into the render. Consistency is what reads as "professional".
Every prompt below shares one master scene, so the whole site looks like a single shoot.

---

## 1. The Zivasha look (master style — prepend to EVERY prompt)

> Professional food product photography for a luxury Indian festive gifting catalogue. Warm
> cream marble surface, soft diffused window light from the left, deep forest-green linen runner,
> a small brass diya and two scattered rose petals as subtle props, muted warm background with
> gentle falloff. Full-frame camera, 50mm lens, f/4, gentle 15-degree high angle. Rich natural
> colour palette of cream, antique gold and deep green. Photorealistic, ultra detailed, crisp
> focus on the product. No text, no lettering, no logos, no watermark, no people, no hands.

**Rules that keep the set consistent:**
- Same aspect ratio per slot (table below). Product cards are **4:3**, minimum 1600×1200.
- In Midjourney: generate all shots in one session, reuse `--seed` from your favourite frame and
  `--ar 4:3 --style raw`. In ChatGPT: after the first good image, say "same scene, same surface,
  same lighting, same angle — now with …" for each subsequent product.
- **Never let the AI render label text.** Ask for plain deep-green sleeves/labels with no
  printing. Composite the real logo afterwards (files in `public/brand/`) in Canva/Figma — 2
  minutes per image, and it's YOUR actual logo, pixel-crisp.
- Reject any frame where jars/laddus look physically wrong (floating lids, merged nuts,
  impossible reflections). Generate 4, keep 1. The reject rate is the professional part.

## 2. Shot list — file name → prompt subject

Save each finished image into `public/products/` with EXACTLY this file name (jpg/webp/png),
run `bash scripts/optimize-images.sh`, then `npm run build` — the site upgrades that slot
automatically (vector art remains the fallback wherever a photo doesn't exist yet).

### Hampers (product cards, 4:3)

| File | Prompt subject (append to master style) |
|---|---|
| `aarambh.jpg` | A compact cream rigid gift box, lid off and leaning behind, holding THREE small glass jars with brushed-gold lids: whole almonds, whole cashews, roasted salted pistachios. A plain deep-green paper band around the box, no printing. |
| `utsav-volume.jpg` | A cream rigid gift box with FOUR glass jars with gold lids: almonds, cashews, roasted pistachios, and ruby-red dried cranberries. Plain deep-green band, gold ribbon loosely draped. |
| `parampara-core.jpg` | An elegant cream gift box with FOUR glass jars with gold lids: large almonds, jumbo cashews, vivid green pistachios, and glossy Medjool dates. Deep-green band, thin gold ribbon bow. |
| `signature.jpg` | A luxurious cream-and-gold rigid box with FIVE glass jars: slender Mamra almonds, jumbo cashews, deep-green Akbari pistachios, dried figs, Medjool dates. Silk deep-green band, double gold ribbon — the flagship, slightly more dramatic light. |
| `utsav-combo.jpg` | A wide cream gift box: four gold-lidded jars of dry fruits at the back, and in front a row of four golden-brown gond laddus studded with nuts plus two wrapped seed bars with plain green wrappers. |
| `signature-utsav.jpg` | The grandest arrangement: five jars of premium dry fruits, six golden gond laddus on a small brass tray inside the box, four seed bars — abundant, overflowing festive luxury. |

### Gond laddus (4:3)

| File | Prompt subject |
|---|---|
| `laddu-jar.jpg` | A round glass jar with a gold lid holding four golden-brown gond laddus, visibly studded with almond slivers, cashew pieces and edible gum crystals, jaggery-toned. One laddu outside the jar on a small brass plate, broken open to show the nutty interior. |
| `laddu-box-8.jpg` | A deep-green box with a cream interior holding eight gond laddus in two rows of four, in gold paper cups. Warm, homely, abundant. |
| `laddu-box-12.jpg` | A large festive cream box with twelve gond laddus in gold cups, three rows of four, a diya glowing beside it — celebration scale. |

### Seven Seeds Nutribar (4:3)

| File | Prompt subject |
|---|---|
| `bar-single.jpg` | One rectangular seed bar, unwrapped, propped against its plain deep-green wrapper. Macro-level detail: pumpkin, sunflower, flax, chia, sesame and watermelon seeds bound in a glossy amber layer. |
| `bar-6.jpg` | Six seed bars in plain deep-green wrappers stacked in a loose pyramid on the marble, one unwrapped in front showing the seed texture. |
| `bar-12.jpg` | A cream office box open with twelve green-wrapped seed bars standing in two neat rows, one bar lying unwrapped in front — clean, desk-ready. |

### Dry fruit pouches (4:3)

| File | Prompt subject |
|---|---|
| `almond-500.jpg` | A kraft-cream stand-up pouch with a plain deep-green label (no printing), whole California almonds spilling from the open top onto the marble. |
| `cashew-500.jpg` | Same pouch, creamy whole cashews spilling out, a brass scoop half-filled beside it. |
| `pista-250.jpg` | Same pouch, roasted salted pistachios in shell spilling out, a few split shells showing green kernels. |
| `anjeer-250.jpg` | Same pouch, dried figs tumbling out, one fig halved showing the honeyed amber interior. |
| `mamra-250.jpg` | Same pouch, slender curved Mamra almonds spilling out onto a small brass plate — extra dramatic light, this is the premium pouch. |
| `walnut-250.jpg` | Same pouch, light golden walnut halves spilling out, two whole walnuts beside. |
| `medjool-400.jpg` | Same pouch, plump glossy Medjool dates, one split showing the caramel flesh. |
| `apricot-250.jpg` | Same pouch, orange-amber dried apricots scattered. |
| `cranberry-250.jpg` | Same pouch, ruby dried cranberries in a loose drift. |
| `raisin-black-250.jpg` | Same pouch, dark seedless black raisins spilling. |
| `makhana-100.jpg` | Same pouch, ivory puffed makhana tumbling out, feather-light feel. |
| `seeds-mix-250.jpg` | Same pouch, a mixed cascade of pumpkin, sunflower, flax, chia, sesame and watermelon seeds. |
| `festive-mix-250.jpg` | Same pouch, a rich trail mix of almonds, cashews, pistachios, raisins and cranberries. |

### Site slots

| File | Ratio | Prompt subject |
|---|---|---|
| `hero.jpg` | 4:3, min 1920px | The full range in one frame: the five-jar Signature hamper centre, a brass plate of gond laddus front-left, two green-wrapped seed bars leaning front-right, one pouch behind — the master scene at its richest, diya lit, shallow depth. |
| `lifestyle-1.jpg` | ~8:3 wide crop ok | Overhead flat-lay: brass bowls of almonds, cashews, pistachios, figs and dates arranged on the green linen with marigold petals and two diyas — festive abundance. |
| `lifestyle-2.jpg` | 4:3 | A gift hamper being presented across a table, warm bokeh diya lights behind — the giving moment (hands OK here, no faces). |
| `lifestyle-3.jpg` | 4:3 | Macro texture: a slow cascade of mixed nuts and seeds falling onto marble, frozen mid-air, warm light. |
| `og-brand.jpg` (in `public/images/`) | 1200×630 | Replace the current AI logo card with a crop of `hero.jpg` once it exists — this is what WhatsApp/LinkedIn show when the site is shared. |

## 3. Honest rule for product images

Generated images are a **launch-phase stand-in**: corporate buyers confirm against a real sample
box, so your own site is fine short-term. But before Amazon/Flipkart listings or heavy retail ad
spend, product-card images must show the REAL product (marketplaces reject mismatches, and a
buyer who receives something visibly different can complain). The plan's Sep 22 photography
top-up shoot uses this same document as its shot list — real photos then replace the generated
ones file-for-file, zero code changes.

## 4. Workflow recap

1. Generate/shoot → save with the exact file names above into `public/products/`.
2. `bash scripts/optimize-images.sh` (resizes to web weight, strips huge files).
3. `npm run build` — every slot with a photo upgrades automatically; the rest keep vector art.

## 5. Instagram annex — 22 Sep shoot additions (priority order)

The website's 1:1 slug replacements above stay the core brief. The shoot ALSO supplies the
Instagram season (strategy in `../instagram/STRATEGY.md` §12). In priority order:

1. **Verticals of every hero in-camera** — shoot 4:5 AND 9:16 framings of the hero scene,
   all six hampers, laddu box-8 and the bar 6-pack. The AI library is 4:3 only (a 9:16 crop
   falls below 1080px); real verticals permanently close the gap and unlock Stories/Reels ad
   placements (25–40% cheaper CPM than feed).
2. **Hands** — giving a hamper across the table, untying the ribbon, lifting a jar to the
   light, breaking a laddu. No faces needed. Zero human presence exists in the current
   library; hands are the trust signal renders can't fake.
3. **Phone b-roll of packing, 10–15 clips × 15–60s** — sleeve on, ribbon tie, jar fill, seal,
   hampers stacking. Any partner's phone, highest quality setting, steady hands. This is the
   season's entire reel supply and the paid window's only motion creative.
4. **Real macro textures** — laddu break-open, gond crackle, seed detail on the bar.
5. Optional: founder/team frame at the packing table (one honest wide shot).
6. If feasible: an hour at **Khari Baoli** — the 300-year claim over real market frames is
   the strongest heritage content the brand can own. (Mamra close-ups here also fix the one
   SKU AI can't render.)

**Contract terms:** same-week delivery of a 15-file priority-selects batch covering items 1–3
(these gate the 15 Oct paid window); the full edited library may follow at normal pace.

**Slip insurance:** backup date 25–27 Sep held with the photographer; if both slip, a partner
phone-shoot against items 1–3 satisfies the real-photo rule for paid — professional files
replace it 1:1 whenever they land. Social files go to `../photo-library/social/` (naming:
`YYYYMMDD_ig_<format>_<subject>_vNN`), website slugs to `public/products/` as above.
