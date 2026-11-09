import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const { chromium } = createRequire(import.meta.url)('playwright');
const base = process.env.PORTFOLIO_URL || 'http://localhost:3000';
const out = process.env.REVIEW_DIR || '/workspace/swiggy-layer-review';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
const errors = [];
const viewports = [[1440, 900], [1366, 768], [1280, 720], [1024, 768], [390, 844], [375, 667], [320, 568], [844, 390]];
const foldResults = [];
const rect = e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, right: r.right, bottom: r.bottom, width: r.width, height: r.height }; };
const intersects = (a, b) => a.x < b.right && a.right > b.x && a.y < b.bottom && a.bottom > b.y;

try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  for (const [width, height] of viewports) {
    await page.setViewportSize({ width, height });
    await page.goto(base + '/work/swiggy-agent-workflow', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const title = await page.locator('h1').evaluate(rect);
    const laptop = await page.locator('[data-layered-hero] [data-device="laptop"]').evaluate(rect);
    const evidence = await page.locator('[data-layered-hero] a').last().evaluate(rect);
    for (const [name, box] of Object.entries({ title, laptop, evidence })) {
      assert.ok(box.y >= 0 && box.bottom <= height + 1, name + ' outside the first fold at ' + width + 'x' + height);
      assert.ok(box.x >= -1 && box.right <= width + 1, name + ' outside viewport at ' + width + 'x' + height);
    }
    assert.ok(!intersects(title, laptop) && !intersects(title, evidence), 'Artwork obscures the title');
    assert.ok(intersects(laptop, evidence), 'Hero source detail detached from the workspace at ' + width + 'x' + height);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    foldResults.push({ width, height, titleBottom: title.bottom, artworkBottom: Math.max(laptop.bottom, evidence.bottom) });
    await page.screenshot({ path: out + '/hero-' + width + 'x' + height + '.png' });
  }

  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    const workspace = page.locator('[data-layered-workspace]');
    await workspace.scrollIntoViewIfNeeded();
    const back = await workspace.locator('[data-layer-depth="back"]').evaluate(rect);
    const front = await workspace.locator('[data-layer-depth="front"]').evaluate(rect);
    assert.ok(intersects(back, front), 'Source record does not overlap its workspace at ' + width);
    for (const link of await workspace.locator('a').all()) {
      await link.focus();
      assert.equal(await link.evaluate(e => e === document.activeElement), true);
      const response = await page.request.get(new URL(await link.getAttribute('href'), base).href);
      assert.equal(response.status(), 200);
      assert.match(response.headers()['content-type'], /image\/png/);
    }
    assert.equal(await workspace.locator('[data-layer-depth="front"]').evaluate(e => getComputedStyle(e).animationName), 'none');
    for (const selector of ['[data-layered-workspace]', '[data-version-stack]', '[data-interaction-scene="evidence"]', '[data-interaction-scene="parties"]', '[data-interaction-scene="decision"]']) {
      const section = page.locator(selector).filter({ visible: true }).first();
      await section.scrollIntoViewIfNeeded();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Layered section overflows at ' + width);
      if ([1440, 390].includes(width)) await page.screenshot({ path: out + '/' + selector.replace(/[^a-z-]/g, '') + '-' + width + '.png' });
    }
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const motionSupported = await page.evaluate(() => CSS.supports('animation-timeline:view()'));
  if (motionSupported) {
    const workspace = page.locator('[data-layered-workspace]');
    const at = async position => {
      await workspace.evaluate((e, position) => scrollTo({ top: e.getBoundingClientRect().top + scrollY - innerHeight * position, behavior: 'instant' }), position);
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      return workspace.locator('[data-layer-depth="front"]').evaluate(e => getComputedStyle(e).translate);
    };
    assert.notEqual(await at(.8), await at(.1), 'Scroll-linked source plane does not move');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await workspace.locator('[data-layer-depth="front"]').evaluate(e => getComputedStyle(e).animationName), 'none');
  }

  const contrast = await page.locator('[data-interaction-scene="decision"] button').first().evaluate(e => {
    const rgb = value => value.match(/[\d.]+/g).slice(0, 3).map(Number);
    const luminance = channels => channels.map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
    const foreground = luminance(rgb(getComputedStyle(e).color));
    const background = luminance(rgb(getComputedStyle(e.closest('[data-interaction-scene]')).backgroundColor));
    return (Math.max(foreground, background) + .05) / (Math.min(foreground, background) + .05);
  });
  assert.ok(contrast >= 4.5, 'Ink-scene controls have insufficient contrast');
  await page.close();

  const plain = await browser.newPage({ viewport: { width: 375, height: 667 }, javaScriptEnabled: false, reducedMotion: 'reduce' });
  await plain.goto(base + '/work/swiggy-agent-workflow', { waitUntil: 'networkidle' });
  const title = await plain.locator('h1').evaluate(rect);
  assert.ok(title.bottom <= 667);
  for (const panel of await plain.locator('[id^="version-panel-"]').all()) assert.equal(await panel.isVisible(), true);
  for (const link of await plain.locator('[data-layered-workspace] a').all()) assert.equal(await link.isVisible(), true);
  assert.equal(await plain.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await plain.close();
  assert.deepEqual(errors, []);
  const result = { passed: true, foldResults, layeredWidths: [1440, 768, 390, 320], motionSupported, inkControlContrast: contrast, runtimeErrors: errors, checks: ['title, complete laptop and source detail in one fold at eight viewports', 'hero overlap without obscuring the title', 'source-record overlap and keyboard access to full-size originals', 'all five layer compositions without horizontal overflow', 'scroll-linked depth with a static reduced-motion fallback', 'ink-scene control contrast', 'native source access and all versions without JavaScript'] };
  fs.writeFileSync(out + '/layers-verification.json', JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify(result));
} finally {
  await browser.close();
}
