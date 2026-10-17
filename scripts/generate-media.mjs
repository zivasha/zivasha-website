#!/usr/bin/env node
/**
 * Prebuild media pipeline (npm run build → prebuild hook):
 *
 * 1. OG cards — 1200×630 cover-cropped, compressed JPEGs in public/og/ for the
 *    slugs pageOg() (lib/seo.ts) and the root layout actually reference, so
 *    WhatsApp/social previews download ~100KB instead of a multi-MB original.
 * 2. LQIP map — a 14px-wide JPEG of every public/products/ image, base64-encoded
 *    into lib/lqip.json for next/image blur placeholders (lib/images.ts).
 *
 * Idempotent: an output is only regenerated when it is missing or older than
 * its source, so repeat builds cost milliseconds.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const productsDir = path.join(root, 'public', 'products');
const ogDir = path.join(root, 'public', 'og');
const lqipPath = path.join(root, 'lib', 'lqip.json');

const exts = ['jpg', 'jpeg', 'webp', 'png'];

/** Slugs passed to pageOg() across app/*/ /*page.tsx — keep in sync with the pages. */
const ogSlugs = [
  'four-jar-festive-gift',
  'festive-potli-basket',
  'gond-laddu',
  'khapli-laddu',
  'seven-seeds-nutri-bar',
  'col-basket', // /shop/
  'story-origin', // /our-story/
  'story-gifting', // /corporate-gifting/
  'story-pantry', // /contact/
  'story-indulge', // /laddus/
  'bar-single', // /nutribars/
];

function findSource(slug) {
  for (const ext of exts) {
    const p = path.join(productsDir, `${slug}.${ext}`);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function isFresh(out, src) {
  return fs.existsSync(out) && fs.statSync(out).mtimeMs > fs.statSync(src).mtimeMs;
}

async function makeOg(src, out) {
  if (isFresh(out, src)) return false;
  // Step quality down if a busy image lands over the ~120KB budget.
  for (const quality of [72, 64, 56]) {
    const buf = await sharp(src)
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();
    if (buf.length <= 120 * 1024 || quality === 56) {
      fs.writeFileSync(out, buf);
      return true;
    }
  }
  return true; // unreachable
}

async function main() {
  fs.mkdirSync(ogDir, { recursive: true });

  // ---- 1. OG cards ----
  const jobs = ogSlugs
    .map((slug) => ({ slug, src: findSource(slug) }))
    .filter((j) => j.src !== null);
  jobs.push({ slug: 'og-brand', src: path.join(root, 'public', 'images', 'og-brand.jpg') });

  let made = 0;
  for (const { slug, src } of jobs) {
    if (!fs.existsSync(src)) continue;
    const out = path.join(ogDir, `${slug}.jpg`);
    if (await makeOg(src, out)) {
      made++;
      const kb = Math.round(fs.statSync(out).size / 1024);
      console.log(`og: ${slug}.jpg (${kb}KB)`);
    }
  }

  // ---- 2. LQIP map ----
  const sources = fs
    .readdirSync(productsDir)
    .filter((f) => exts.includes(path.extname(f).slice(1).toLowerCase()))
    .sort();
  const newestSrc = Math.max(...sources.map((f) => fs.statSync(path.join(productsDir, f)).mtimeMs));
  const lqipFresh = fs.existsSync(lqipPath) && fs.statSync(lqipPath).mtimeMs > newestSrc;

  if (!lqipFresh) {
    const map = {};
    for (const f of sources) {
      const slug = f.replace(/\.[^.]+$/, '');
      const buf = await sharp(path.join(productsDir, f)).resize(14).jpeg({ quality: 40 }).toBuffer();
      map[slug] = `data:image/jpeg;base64,${buf.toString('base64')}`;
    }
    fs.writeFileSync(lqipPath, JSON.stringify(map, null, 2) + '\n');
    console.log(`lqip: ${sources.length} placeholders → lib/lqip.json`);
  }

  console.log(`generate-media: ${made} og card(s) written, lqip ${lqipFresh ? 'fresh' : 'rebuilt'}`);
}

main().catch((err) => {
  console.error('generate-media failed:', err);
  process.exit(1);
});
