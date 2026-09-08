# Zivasha Website

Next.js 15 + React 19 on Node (latest stack) — brand site for zivasha.in, WhatsApp-first ordering.

## Analytics (built in, off by default)

Copy `.env.example` to `.env.local` (or set the same vars in Vercel) and fill:

- `NEXT_PUBLIC_GA_ID` — GA4 measurement ID → page views + a `whatsapp_click` event on every
  WhatsApp CTA (the site's real conversion), with the page path and button label.
- `NEXT_PUBLIC_META_PIXEL_ID` — Meta Pixel → `PageView` + `Contact` events, ready for the
  click-to-WhatsApp ad campaigns in the marketing plan (live 11 Oct).

Until the IDs are set, nothing loads — zero tracking, zero cookie weight. Use the marketing plan's
UTM convention on all ad links so GA4 attributes WhatsApp clicks per campaign. Server-side needs
later (lead capture API, WhatsApp Cloud API webhooks) go under `app/api/` — the project runs on
the standard Next.js Node runtime, not a static export.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (.next/)
npm start          # serve the production build on Node
```

## Deploy (Vercel — recommended, free)

1. Push this folder to a GitHub repo, import it at vercel.com — Next.js is auto-detected and runs
   on the Node runtime (API routes under `app/api/` will just work when you add them).
2. Add the custom domain `zivasha.in` in Vercel → follow its DNS instructions at your registrar.
   (For a purely static host you would need to re-add `output: 'export'` to next.config.mjs and
   give up API routes.)

## ⚠️ Before launch checklist

- [ ] **WhatsApp number** — `lib/site.ts` currently carries the number printed in the draft
      brochure (+91 98001 39991), which may be an AI-generated placeholder. Verify it is really
      yours or replace it. Every order button on the site depends on it.
- [ ] **Email** — `hello@zivasha.in` must actually exist (set up email hosting or change it).
- [ ] **Instagram/LinkedIn URLs** — update in `lib/site.ts` once handles are claimed.
- [ ] **FSSAI + GSTIN** — fill `fssaiNumber` and `gstin` in `lib/site.ts` the day they arrive;
      the footer renders them automatically. Do NOT launch product ordering claims that require a
      licence before it exists — until then the corporate page's "FSSAI licence documents" line in
      the de-risk pack should be read as "provided with quotes once issued".
- [ ] **Photography** — the site now uses an owned vector illustration system (no AI-image
      placeholders). When professional product photos exist, add them alongside the illustrations
      on product cards and the hero; `public/images/og-brand.jpg` (OpenGraph preview) should also
      be replaced with a real photo then.
- [ ] **Prices** — sourced from the consolidated business plan (Sept 2026). If any COGS moves,
      update `lib/products.ts` (single source of truth for every price on the site).
- [ ] **NABL report** — set `nablReportUrl` in `lib/site.ts` the day the lab report arrives; the
      corporate page's de-risk copy upgrades itself from "booked" to "report in hand".
- [ ] **Label claims** — "no added sugar", "high fibre", "no preservatives" and similar are
      regulated nutrient-content claims (FSSAI Advertising & Claims Regulations 2018). They were
      deliberately kept OFF the site. Reinstate any of them only after the chosen co-packer's
      formulation and printed label substantiate the exact claim.

## Performance

The site is built to score high on Core Web Vitals out of the box:

- **Every page is statically prerendered** — served as HTML from Vercel's CDN, no server work
  per request.
- **Images**: `next/image` everywhere → responsive srcsets, lazy-loading below the fold, AVIF/WebP
  (~50% smaller than JPEG), 31-day optimized-image cache. Source files are pre-shrunk by
  `scripts/optimize-images.sh` — always run it after adding photos.
- **Fonts**: self-hosted and subset via `next/font` (zero third-party requests), trimmed to only
  the weights the CSS uses, `display: swap` so text never blocks.
- **JS**: ~100 kB shared First Load (the React/Next runtime); pages add ≤2 kB each. No analytics
  or third-party scripts load until their env keys are set — and then only `afterInteractive`.
- Keep it fast: don't add npm packages to pages without checking bundle impact
  (`npm run build` prints per-route sizes), keep hero images ≤1920px, and run Lighthouse on the
  deployed Vercel URL (local `npm run dev` is unrepresentative).

## Where things live

- `lib/site.ts` — contact details, season dates, compliance numbers (single source of truth)
- `lib/products.ts` — every SKU and price on the site (each SKU names its `art` illustration)
- `app/` — one folder per page (Home, corporate-gifting, shop, laddus, nutribars, our-story, contact)
- `components/` — header, footer, product card, enquiry form, WhatsApp floating button
- `components/brand/` — the vector brand system: `Logo.tsx` (mark + lockups) and
  `ProductArt.tsx` (per-category product illustrations + hero scene)
- `../brand-assets/` (repo level, outside the site) — standalone SVG logo files for use outside
  the site (social avatars, print reference). They render the wordmark in Cinzel where available
  (Georgia fallback); for print-final vectors, have a designer convert the text to outlines once.
