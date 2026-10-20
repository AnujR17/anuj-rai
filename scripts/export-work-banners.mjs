import { createRequire } from 'node:module';
const loadModule = createRequire(import.meta.url);
const { chromium } = loadModule('playwright');
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const base = process.env.PORTFOLIO_URL || 'http://localhost:3000';
const slugs = ['medicine-app','swiggy-agent-workflow','two-wheeler-dashboard','toki','india-in-orbit','gandhinagar-roundabouts','medtimer','myalumnus'];
(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1800, height: 1200 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  fs.mkdirSync(path.join(scriptDirectory, '../public/portfolio/banners'), { recursive: true });
  for (const slug of slugs) {
    await page.goto(`${base}/work/${slug}`, { waitUntil: 'networkidle' });
    const art = page.locator('[data-project-artwork]');
    await page.addStyleTag({ content: '.site-header { display: none !important; } [data-project-artwork] { position: fixed !important; top: 0 !important; left: 0 !important; width: 1600px !important; height: 900px !important; z-index: 99999; } [data-project-artwork] > div { border-radius: 0; }' });
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all(Array.from(document.querySelector('[data-project-artwork]').querySelectorAll('img')).map(i => i.decode())); });
    await art.screenshot({ path: path.join(scriptDirectory, `../public/portfolio/banners/${slug}.png`) });
    console.log(`Exported ${slug}: 1600 × 900`);
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
