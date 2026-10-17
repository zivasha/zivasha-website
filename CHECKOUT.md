# ZIVASHA checkout

The site is a Next.js static export on Netlify. `netlify/functions/razorpay-checkout.mjs` runs server-side; no Razorpay secret belongs in the browser, a NEXT_PUBLIC variable, the repository or a build log.

## Current order flow

1. Customers add priced or quotation-only products to the persistent cart.
2. The cart displays a 5% GST estimate on the nine confirmed food products. Delivery remains individually quoted. Unpriced packs are not counted as free.
3. The customer submits the website form. Netlify Forms stores `zivasha-order-request` and notifies hello@zivasha.in. Treat submitted prices as customer-supplied estimates: verify against `lib/cart.ts` before quoting.
4. The owner confirms assortment, availability, taxes and delivery. No amount is charged from an unconfirmed cart.
5. A trusted operator issues one Razorpay order for that final approved quotation. Its signed website payment link opens Standard Checkout. The server retrieves the amount from Razorpay and verifies both the signature and captured status. A callback, screenshot or authorised-only payment is not treated as received.

## Secure configuration

Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` as Netlify environment variables for production **Functions** only, after owner approval. Do not expose live credentials to Deploy Previews or browser code. Redeploy after setting variables. Use separate test credentials in an isolated test environment for end-to-end simulation before taking live payments.

The integration wizard provides credentials, but enabling a key does not itself confirm an order or a payment. There is no public endpoint that accepts a customer-entered charge amount.

## Issue a confirmed payment link

Prepare a private JSON file outside the public output containing `ownerConfirmed: true`, a unique `reference` (6–40 letters, digits, `_` or `-`), `description` (up to 200 characters), and integer paise fields `subtotalPaise`, `gstPaise`, `deliveryPaise`, `deliveryGstPaise`. All four amounts must be explicit; use zero only when that amount has actually been confirmed as zero. Check the applicable GST registration, classification, state split and invoice particulars before issuing an actual tax invoice.

With keys supplied securely through the process environment:

```
node scripts/issue-checkout.mjs /absolute/path/confirmed-quote.json
node scripts/issue-checkout.mjs /absolute/path/confirmed-quote.json --issue
```

The first command only previews. The second creates an **unpaid** order and a seven-day link, or reuses an identical existing receipt. It does not charge a card. Send the resulting link only for the approved quotation. Never issue the same reference concurrently. After any timeout inspect Razorpay before retrying. Payment and refund records remain authoritative in Razorpay; verify fulfilment there if the customer closes the site before the callback. There is no automatic fulfilment or refund in this release.

## Tax basis checked 17 October 2026

[CBIC Notification 9/2025–Integrated Tax (Rate), Schedule I](https://courier.cbic.gov.in/ECCS/advisory/2025/NOTIFICATION%20NO.%209_2025-INTEGRATED%20TAX%20(RATE)%20-1759486719.pdf) lists 5% for relevant dried nuts/fruit (0801, 0802, 0804, 0806, 0813), cereal preparations (1904), prepared fruit/nuts (2008), sweetmeats and other relevant food preparations (2106). Nutri-bar classification must match its actual formulation and supplier invoice. Food-only hampers with ordinary packaging use an estimated 5%; custom combinations containing non-food gifts require individual assessment under [CGST section 8](https://taxinformation.cbic.gov.in/content-page/explore-act/1000277/1000001). Final GST and transport treatment are confirmed on the quotation; the website does not invent a GSTIN or a state split.

## Validation

```
node --test scripts/test-checkout.mjs
npm run build
```

Check mobile cart, quantities, pack selection, subtotal/tax rounding, order-request delivery and payment states. An order request is not a paid order. Keep bulk discounts customer-specific and preserve the mithai-only 20 October cutoff.
