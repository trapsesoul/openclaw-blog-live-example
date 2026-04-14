import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const configText = fs.readFileSync(path.join(root, 'astro.config.mjs'), 'utf8');

const baseMatch = configText.match(/base:\s*['"]([^'"]+)['"]/);
const siteMatch = configText.match(/site:\s*['"]([^'"]+)['"]/);

const base = normalizeBase(baseMatch?.[1] ?? '/');
const site = siteMatch?.[1] ?? '';
const siteOrigin = site ? new URL(site).origin : '';

const failures = [];

for (const htmlFile of walk(distDir).filter((f) => f.endsWith('.html'))) {
  const content = fs.readFileSync(htmlFile, 'utf8');
  const hrefs = [...content.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (isExternalLike(href)) continue;
    if (!href.startsWith('/')) continue;

    const pathname = new URL(`https://dummy${href}`).pathname;
    if (base !== '/' && pathname !== base && !pathname.startsWith(`${base}/`)) {
      failures.push(`[HTML base mismatch] ${rel(htmlFile)} -> ${href}`);
      continue;
    }

    const withinBase = base === '/' ? pathname : pathname.slice(base.length) || '/';
    const target = toDistPath(withinBase);
    if (!fs.existsSync(target)) {
      failures.push(`[HTML missing target] ${rel(htmlFile)} -> ${href}`);
    }
  }
}

const rssFile = path.join(distDir, 'rss.xml');
if (fs.existsSync(rssFile) && siteOrigin) {
  const rss = fs.readFileSync(rssFile, 'utf8');
  const links = [...rss.matchAll(/<link>([^<]+)<\/link>/g)].map((m) => m[1]);
  for (const link of links) {
    if (!link.startsWith(siteOrigin)) continue;
    const pathname = new URL(link).pathname;
    if (base !== '/' && pathname !== `${base}/` && !pathname.startsWith(`${base}/`)) {
      failures.push(`[RSS base mismatch] ${link}`);
    }
  }
}

if (failures.length) {
  console.error('Broken internal link checks failed:\n');
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}

console.log('Link check passed.');

function normalizeBase(input) {
  if (!input || input === '/') return '/';
  const withLeading = input.startsWith('/') ? input : `/${input}`;
  return withLeading.endsWith('/') ? withLeading.slice(0, -1) : withLeading;
}

function isExternalLike(href) {
  return (
    href.startsWith('#') ||
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('javascript:') ||
    href.startsWith('data:')
  );
}

function toDistPath(p) {
  const clean = p.split('?')[0].split('#')[0];
  if (clean === '/' || clean === '') return path.join(distDir, 'index.html');
  if (path.extname(clean)) return path.join(distDir, clean.replace(/^\//, ''));
  return path.join(distDir, clean.replace(/^\//, ''), 'index.html');
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function rel(p) {
  return path.relative(root, p);
}
