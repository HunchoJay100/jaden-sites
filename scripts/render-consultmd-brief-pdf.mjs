import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HOME = process.env.HOME;
const INPUT = 'file://' + path.resolve(HOME, 'jaden-sites/consultmd-demo-brief.html');
const OUTPUT = path.resolve(HOME, 'jaden-sites/consultmd-demo-brief.pdf');

console.log('Launching headless Chromium...');
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--font-render-hinting=none'],
});

const page = await browser.newPage();
await page.setViewport({ width: 816, height: 1056, deviceScaleFactor: 2 });

console.log('Loading brief HTML...');
await page.goto(INPUT, { waitUntil: 'networkidle0', timeout: 60000 });

console.log('Waiting for fonts and images to fully resolve...');
await page.evaluateHandle('document.fonts.ready');
// Belt-and-suspenders settle delay
await new Promise(r => setTimeout(r, 1200));

console.log('Generating PDF (letter, no margins, backgrounds on)...');
await page.pdf({
  path: OUTPUT,
  format: 'Letter',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  preferCSSPageSize: true,
});

await browser.close();

const stat = fs.statSync(OUTPUT);
console.log(`\nDone. ${OUTPUT}`);
console.log(`Size: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);
