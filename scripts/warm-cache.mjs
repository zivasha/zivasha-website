#!/usr/bin/env node
/**
 * Post-deploy cache warmer. The Netlify Image CDN transforms each image
 * variant on first request (~300-800ms for that one visitor); this script
 * pays that cost up front for every variant referenced in the built HTML,
 * in both AVIF and WebP, plus the pages themselves.
 *
 * Run after each deploy that changes images or pages:
 *   node scripts/warm-cache.mjs            # warms https://zivasha.in
 *   node scripts/warm-cache.mjs <base-url> # warms another deploy
 */
import fs from 'node:fs';
import path from 'node:path';

const BASE = (process.argv[2] || 'https://zivasha.in').replace(/\/$/, '');
const OUT = path.join(process.cwd(), 'out');

if (!fs.existsSync(OUT)) {
  console.error('out/ not found — run `npm run build` first.');
  process.exit(1);
}

const htmlFiles = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) htmlFiles.push(p);
  }
})(OUT);

const imageUrls = new Set();
const pageUrls = new Set();
for (const f of htmlFiles) {
  const rel = '/' + path.relative(OUT, f).replace(/index\.html$/, '').replace(/\.html$/, '');
  pageUrls.add(rel);
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(/\/\.netlify\/images\?[^"'\s]+/g)) {
    imageUrls.add(m[0].replaceAll('&amp;', '&'));
  }
}

const accepts = ['image/avif,image/webp,*/*', 'image/webp,*/*'];
let done = 0, failed = 0;
const targets = [
  ...[...pageUrls].map((u) => ({ url: u, accept: null })),
  ...[...imageUrls].flatMap((u) => accepts.map((accept) => ({ url: u, accept }))),
];
console.log(`Warming ${pageUrls.size} pages + ${imageUrls.size} image variants x${accepts.length} on ${BASE} …`);

// modest concurrency — warm, don't hammer
const CONCURRENCY = 6;
async function worker(queue) {
  for (;;) {
    const t = queue.shift();
    if (!t) return;
    try {
      const res = await fetch(BASE + t.url, {
        headers: t.accept ? { accept: t.accept } : {},
        redirect: 'follow',
      });
      if (res.ok) done++;
      else { failed++; console.error(`  ${res.status} ${t.url.slice(0, 100)}`); }
      await res.arrayBuffer(); // drain so the CDN actually caches the body
    } catch (e) {
      failed++; console.error(`  ERR ${t.url.slice(0, 100)}: ${e.message}`);
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, () => worker(targets)));
console.log(`Done: ${done} warmed, ${failed} failed.`);
process.exit(failed > done ? 1 : 0);
