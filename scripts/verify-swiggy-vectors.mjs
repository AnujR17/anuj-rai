import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';

const { chromium } = createRequire(import.meta.url)('playwright');
const base = process.env.PORTFOLIO_URL || 'http://localhost:3000';
const out = process.env.REVIEW_DIR || '/workspace/swiggy-vector-review';
const ids = ['architecture', 'refund-cost', 'findings', 'mental-model', 'stakeholders'];
const errors = [];
const widths = [1440, 1024, 768, 390, 320];
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base + '/work/swiggy-agent-workflow', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('[data-vector-study]').count(), ids.length);
  assert.equal(await page.locator('a[download][href$=".svg"]').count(), ids.length);
  const layouts = [];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 });
    for (const id of ids) {
      const root = page.locator(`[data-vector-study="${id}"]`);
      await root.scrollIntoViewIfNeeded();
      const image = root.locator('img');
      await image.evaluate(image => image.decode());
      const geometry = await image.evaluate(e => {
        const r = e.getBoundingClientRect();
        return { source: e.currentSrc, naturalWidth: e.naturalWidth, naturalHeight: e.naturalHeight, width: r.width, height: r.height };
      });
      assert.ok(geometry.naturalWidth > 0);
      assert.ok(geometry.source.endsWith(id + (width <= 1100 ? '-mobile' : '') + '.svg'));
      assert.ok(Math.abs(geometry.width / geometry.height - geometry.naturalWidth / geometry.naturalHeight) < .001, 'Vector distorted');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      const link = root.getByRole('link', { name: /^Open / });
      await link.focus();
      assert.equal(await link.evaluate(e => e === document.activeElement), true);
      await page.locator('#' + (id === 'architecture' ? 'concept' : id === 'findings' ? 'outcome' : ['mental-model', 'stakeholders'].includes(id) ? 'research' : 'design')).evaluate(e => scrollTo({ top: e.getBoundingClientRect().top + scrollY - 90, behavior: 'instant' }));
      if (width > 700) {
        const nav = await page.locator('[aria-label="Case study stages"]').boundingBox();
        assert.ok(nav.y >= 0 && nav.y + nav.height < 1000, 'Bottom-left stage labels offscreen');
      }
      await root.scrollIntoViewIfNeeded();
      await link.evaluate(e => e.blur());
      if ([1440, 390, 320].includes(width)) await page.screenshot({ path: `${out}/${id}-${width}.png` });
      layouts.push({ width, id, source: geometry.source.split('/').pop() });
    }
  }
  const contrast = await page.locator('[data-accent-scene] p').first().evaluate(e => {
    const rgb = v => v.match(/[\d.]+/g).slice(0, 3).map(Number);
    const luminance = a => a.map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
    const front = luminance(rgb(getComputedStyle(e).color));
    const back = luminance(rgb(getComputedStyle(e.closest('[data-accent-scene]')).backgroundColor));
    return (Math.max(front, back) + .05) / (Math.min(front, back) + .05);
  });
  assert.ok(contrast >= 4.5);
  const pdf = await page.request.get(base + '/portfolio/swiggy/agent-desk-handbook-v1.0.pdf');
  assert.equal(pdf.status(), 200);
  assert.equal(crypto.createHash('sha256').update(await pdf.body()).digest('hex'), 'a126e603fd8293cfcd823038fda274353bb7d5c436c4f90ed499faf92f593d4f');

  // Open the original vectors independently: text must remain inside each artboard.
  for (const id of ids) for (const suffix of ['', '-mobile']) {
    const file = `${id}${suffix}.svg`;
    const source = fs.readFileSync('public/portfolio/swiggy/diagrams/' + file, 'utf8');
    assert.match(source, /data:font\/woff2;base64,/);
    assert.doesNotMatch(source, /<image\b/);
    await page.goto(base + '/portfolio/swiggy/diagrams/' + file, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    assert.deepEqual(await page.evaluate(() => {
      const box = document.documentElement.viewBox.baseVal;
      return [...document.querySelectorAll('text')].filter(e => { const r = e.getBBox(); return r.x < -1 || r.y < -1 || r.x + r.width > box.width + 1 || r.y + r.height > box.height + 1; }).map(e => e.textContent);
    }), [], 'Text clipped in ' + file);
  }
  await page.close();
  const plain = await browser.newPage({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  await plain.goto(base + '/work/swiggy-agent-workflow', { waitUntil: 'networkidle' });
  for (const image of await plain.locator('[data-vector-study] img').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(e => e.decode());
    assert.equal(await image.isVisible(), true);
    assert.ok(await image.evaluate(e => e.currentSrc.endsWith('-mobile.svg')));
  }
  assert.equal(await plain.locator('a[download][href$=".svg"]').count(), ids.length);
  await plain.close();
  assert.deepEqual(errors, []);
  const result = { passed: true, layouts, accentTextContrast: contrast, runtimeErrors: errors, checks: ['five explanatory SVG studies and responsive source selection at five widths', 'undistorted vector proportions and no overflow', 'native keyboard access and SVG downloads', 'all ten standalone SVG artboards without clipped text', 'embedded DM Sans and no raster content', 'handbook matches uploaded source SHA-256', 'unchanged stage labels remain inside the desktop viewport', 'readable accent text contrast', 'static diagrams without JavaScript'] };
  fs.writeFileSync(out + '/vectors-verification.json', JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify(result));
} finally { await browser.close(); }
