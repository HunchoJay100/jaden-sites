import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MOCKUP_DIR = path.resolve(process.env.HOME, 'consultmd');
const OUT_DIR = path.resolve(process.env.HOME, 'jaden-sites/images/consultmd-demo');

fs.mkdirSync(OUT_DIR, { recursive: true });

const targets = [
  { file: 'mockup-dashboard-v5.html', out: 'dashboard.png' },
  { file: 'mockup-articles-v5.html', out: 'articles-list.png' },
  { file: 'mockup-article-reader-v5.html', out: 'article-reader.png' },
  { file: 'mockup-my-build-v3.html', out: 'my-build.png' },
  { file: 'mockup-timeline-v5.html', out: 'timeline.png' },
  { file: 'mockup-budget-v5.html', out: 'budget.png' },
  { file: 'mockup-subs-v5.html', out: 'subs.png' },
  { file: 'mockup-forms-v5.html', out: 'forms.png' },
  { file: 'mockup-materials-v5.html', out: 'materials.png' },
];

const browser = await puppeteer.launch({
  headless: 'new',
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
});

for (const t of targets) {
  const src = path.join(MOCKUP_DIR, t.file);
  if (!fs.existsSync(src)) {
    console.warn(`SKIP (missing): ${t.file}`);
    continue;
  }
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('file://' + src, { waitUntil: 'networkidle0' });
  // Allow web fonts to settle
  await new Promise(r => setTimeout(r, 600));
  const dest = path.join(OUT_DIR, t.out);
  await page.screenshot({ path: dest, type: 'png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
  console.log(`OK: ${t.file} -> ${dest}`);
  await page.close();
}

await browser.close();
console.log('\nDone.');
