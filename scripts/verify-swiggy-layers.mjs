import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright');
const base = process.env.PORTFOLIO_URL || 'http://localhost:3000';
const out = process.env.REVIEW_DIR || '/workspace/swiggy-layer-review';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
const errors = [], folds = [], contrasts = [];
const rect = e => { const r = e.getBoundingClientRect(); return { x:r.x, y:r.y, right:r.right, bottom:r.bottom, width:r.width, height:r.height }; };
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.on('pageerror', e => errors.push(e.message));
  for (const [width, height] of [[1440,900],[1366,768],[1280,720],[1024,768],[390,844],[375,667],[320,568],[844,390]]) {
    await page.setViewportSize({ width, height });
    await page.goto(base + '/work/swiggy-agent-workflow', { waitUntil:'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const title = await page.locator('h1').evaluate(rect);
    const artwork = await page.locator('[data-layered-hero] [data-device]').evaluate(rect);
    for (const box of [title, artwork]) assert.ok(box.y >= 0 && box.bottom <= height + 1 && box.x >= -1 && box.right <= width + 1, 'First-fold content clipped at ' + width + '/' + height);
    assert.ok(artwork.bottom <= title.y, 'Artwork obscures the title');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.equal(await page.locator('body').evaluate(e => getComputedStyle(e).backgroundColor), 'rgb(255, 255, 255)');
    assert.equal(await page.locator('.site-header').evaluate(e => getComputedStyle(e).backgroundColor), 'rgb(255, 255, 255)');
    folds.push({ width, height, titleBottom:title.bottom, artworkBottom:artwork.bottom });
    await page.screenshot({ path:out + '/hero-' + width + '.png' });
  }
  for (const width of [1440,768,390,320]) {
    await page.setViewportSize({ width, height:1000 });
    const feature = page.locator('[data-accent-scene]');
    assert.equal(await feature.count(), 1);
    assert.equal(await feature.evaluate(e => getComputedStyle(e).backgroundColor), 'rgb(255, 245, 238)');
    for (const image of await feature.locator('img:visible').all()) { await image.evaluate(e => { e.loading = 'eager'; }); await image.evaluate(e => e.decode()); }
    for (const link of await page.locator('[data-layered-workspace] a').all()) {
      await link.focus(); assert.equal(await link.evaluate(e => e === document.activeElement), true);
      assert.equal((await page.request.get(new URL(await link.getAttribute('href'), base).href)).status(), 200);
    }
    for (const id of ['evidence','parties','decision']) {
      const scene = page.locator('[data-interaction-scene="' + id + '"]');
      await scene.scrollIntoViewIfNeeded();
      const media = await scene.locator('[data-device-scene]').evaluate(rect);
      const parent = await scene.evaluate(rect);
      assert.ok(media.width >= parent.width * .95, 'Interaction is too small at ' + id + '/' + width);
      assert.equal(await scene.locator('[data-device]').getAttribute('data-device'), 'browser');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    }
    assert.equal(await page.locator('[data-research-artifact="design-criteria"] li').count(), 6);
    assert.equal(await page.locator('[data-research-artifact="design-criteria"] li').first().isVisible(), true);
    // The left index remains readable on both sides of the single neutral band.
    if (width > 700) for (const edge of ['top','bottom']) {
      await feature.evaluate((e, edge) => scrollTo({ top:scrollY + e.getBoundingClientRect()[edge] - 700, behavior:'instant' }), edge);
      const checks = await page.evaluate(() => {
        const bounds = document.querySelector('[data-accent-scene]').getBoundingClientRect();
        const lum = v => v.match(/[\d.]+/g).slice(0,3).map(Number).map(v => v/255).map(v => v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
        return [...document.querySelectorAll('nav[aria-label="Case study stages"] a')].map(e => {
          const r=e.getBoundingClientRect(), middle=r.y+r.height/2;
          const bg=middle>=bounds.top&&middle<bounds.bottom?getComputedStyle(document.querySelector('[data-accent-scene]')).backgroundColor:'rgb(255,255,255)';
          const a=lum(getComputedStyle(e).color), b=lum(bg);
          return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
        });
      });
      assert.ok(checks.every(v => v>=4.5)); contrasts.push({width,edge,minimum:Math.min(...checks)});
    }
  }
  // Exercise actual client navigation as well as a direct other-case load.
  await page.getByRole('link', {name:/Next project/}).click();
  await page.waitForURL('**/work/two-wheeler-dashboard');
  await page.waitForFunction(() => !document.querySelector('[data-swiggy-case]'));
  assert.equal(await page.locator('body').evaluate(e=>getComputedStyle(e).backgroundColor), 'rgb(247, 247, 242)');
  // The white surface must disappear when the case is left, without JS cleanup.
  assert.equal((await page.goto(base + '/work/medicine-app', {waitUntil:'networkidle'})).status(), 200);
  assert.equal(await page.locator('body').evaluate(e=>getComputedStyle(e).backgroundColor), 'rgb(247, 247, 242)');
  await page.close();
  const plain = await browser.newPage({ viewport:{width:320,height:568}, javaScriptEnabled:false });
  await plain.goto(base + '/work/swiggy-agent-workflow', {waitUntil:'networkidle'});
  assert.equal(await plain.locator('body').evaluate(e=>getComputedStyle(e).backgroundColor), 'rgb(255, 255, 255)');
  for (const panel of await plain.locator('[id^="version-panel-"]').all()) assert.equal(await panel.isVisible(),true);
  assert.equal(await plain.locator('[data-device-motion] video[controls]').count(),8);
  await plain.close(); assert.deepEqual(errors,[]);
  const report={passed:true,folds,contrasts,runtimeErrors:errors,checks:['white case and header, including no-JavaScript','complete laptop and one-line title in eight first-fold sizes','one light orange emphasis with readable stage links','full-reading-width window mockups','six visible screen-selection criteria','keyboard/full-size source access','other case background preserved','native media and all versions without JavaScript']};
  fs.writeFileSync(out+'/layers-verification.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
} finally { await browser.close(); }
