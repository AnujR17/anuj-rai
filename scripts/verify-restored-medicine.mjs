import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const { chromium } = createRequire(import.meta.url)('playwright');
const base = process.env.PORTFOLIO_URL || 'http://localhost:3000';
const out = process.env.REVIEW_DIR || '/workspace/meditimer-review';
fs.mkdirSync(out, { recursive: true });
const stages = ['research', 'insights', 'concept', 'design', 'outcome'];
const cases = ['two-wheeler-dashboard', 'medtimer', 'toki', 'india-in-orbit', 'gandhinagar-roundabouts', 'medicine-storage-research', 'consumer-experience', 'skidge', 'swiggy-agent-workflow', 'myalumnus'];
let browser;

try {
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
  const context = await browser.newContext({ reducedMotion: 'reduce', ignoreHTTPSErrors: true });
  const errors = [];
  context.on('page', page => page.on('pageerror', error => errors.push(error.message)));
  const page = await context.newPage();
  let imageChecks = 0;

  for (const [width, height] of [[1440, 1000], [1024, 768], [768, 1024], [390, 844], [320, 740]]) {
    await page.setViewportSize({ width, height });
    assert.equal((await page.goto(base + '/work/medicine-app', { waitUntil: 'networkidle' })).status(), 200);
    assert.equal(await page.locator('h1').textContent(), 'Meditimer');
    assert.equal(await page.locator('h1').count(), 1);
    assert.deepEqual(await page.locator('.lf-scene').evaluateAll(sections => sections.map(section => section.id)), stages);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width}px`);
    assert.equal(await page.locator('.lf-facts details').count(), 3);
    const heroImage = page.locator('#hero .lf-opening-visual img');
    assert.equal(await heroImage.count(), 1);
    await heroImage.evaluate(image => image.decode());
    assert.match(decodeURIComponent(await heroImage.evaluate(image => image.currentSrc)), width > 700 ? /hero\.webp/ : /scan\.webp/);
    assert.deepEqual(await page.locator('#hero').evaluate(hero => [
      getComputedStyle(hero).backgroundColor,
      getComputedStyle(hero.querySelector('.lf-motion-visual')).backgroundColor,
    ]), Array(2).fill(width > 700 ? 'rgb(234, 234, 234)' : 'rgb(235, 235, 235)'));
    assert.equal(await page.locator('#hero video, #hero .lf-motion-toggle').count(), 0);
    assert.deepEqual(await page.locator('.lf-stage-index a').allTextContents(), ['Research', 'Insights', 'Concept', 'Design', 'Outcome']);
    const stageNav = page.locator('.lf-stage-index');
    await page.locator('.lf-main[data-enhanced="true"]').waitFor({ state: 'attached' });
    await stageNav.waitFor({ state: 'hidden' });
    assert.equal(await page.locator('#insights .lf-history-pair img').count(), 2);
    assert.doesNotMatch(await page.locator('#design').innerText(), /Design tools/i);
    assert.doesNotMatch(await page.locator('article').innerText(), /No update yet|Sources and credits|A prototype for the next conversation/i);
    assert.equal(await page.locator('.lf-motion video').count(), 0, 'Reduced motion starts with still images');
    await page.locator('.lf-static-device').evaluateAll(async images => { for (const image of images) { image.loading = 'eager'; await image.decode(); } });
    const devices = await page.locator('.lf-static-device').evaluateAll(images => images.filter(image => image.clientWidth).map(image => ({
      loaded: image.naturalWidth > 0,
      border: parseFloat(getComputedStyle(image).borderTopWidth),
      radius: parseFloat(getComputedStyle(image).borderRadius),
      ratio: image.clientWidth / image.clientHeight,
      natural: image.naturalWidth / image.naturalHeight,
    })));
    for (const image of devices) {
      assert.ok(image.loaded);
      assert.equal(image.border, 0);
      assert.equal(image.radius, 0);
      assert.ok(Math.abs(image.ratio - image.natural) < 0.008, JSON.stringify(image));
      imageChecks++;
    }
    if ([1440, 390].includes(width)) await page.screenshot({ path: `${out}/hero-${width}.png` });
    await page.locator('#overview').evaluate(section => section.scrollIntoView({ behavior: 'instant' }));
    await page.waitForFunction(() => document.querySelector('#research').getBoundingClientRect().top > 120);
    await stageNav.waitFor({ state: 'hidden' });
    await page.locator('#research').evaluate(async section => {
      window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top - 30, behavior: 'instant' });
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    });
    assert.equal(await stageNav.isVisible(), false);
    await page.locator('#research').evaluate(section => section.scrollIntoView({ behavior: 'instant' }));
    await stageNav.waitFor({ state: 'visible' });
    assert.equal(await page.locator('.lf-mobile-index').isVisible(), false);
    const indexBox = await stageNav.boundingBox();
    assert.ok(indexBox.x < width / 4 && height - indexBox.y - indexBox.height < 80);
    assert.ok(indexBox.x + indexBox.width <= width && indexBox.y + indexBox.height <= height);
    if (width <= 700) assert.equal(indexBox.height, 44, 'Mobile stage links fit in one row');
    if ([1440, 390, 320].includes(width)) await page.screenshot({ path: `${out}/research-${width}.png` });

    await page.locator('.lf-gallery-item').nth(1).click();
    assert.equal(await page.locator('.lf-design-gallery').getAttribute('data-active'), '1');
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('.lf-design-gallery').getAttribute('data-active'), '2');
    await page.getByRole('link', { name: 'View screen full size' }).click();
    assert.equal(await page.locator('.lf-image-dialog').evaluate(dialog => dialog.open), true);
    assert.ok((await page.locator('.lf-image-dialog img').getAttribute('src')).includes('reminders-screen.png'));
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.lf-image-dialog').evaluate(dialog => dialog.open), false);
    await page.getByRole('button', { name: 'Inspect structure' }).click();
    assert.equal(await page.locator('.lf-structure-dialog').evaluate(dialog => dialog.open), true);
    await page.getByRole('button', { name: 'Close structure' }).click();
    assert.equal(await page.locator('.lf-structure-dialog').evaluate(dialog => dialog.open), false);
    await page.locator('#insights').evaluate(section => section.scrollIntoView({ behavior: 'instant' }));
    if ([1440, 390].includes(width)) await page.screenshot({ path: `${out}/insights-${width}.png` });
    await stageNav.getByRole('link', { name: 'Design' }).click();
    await page.waitForURL(url => url.hash === '#design');
    await page.waitForFunction(() => document.querySelector('.lf-stage-index a[aria-current="location"]')?.getAttribute('href') === '#design');
    console.log(`Responsive case and interactions passed at ${width}px`);
  }

  await page.goto(base + '/work/medicine-app', { waitUntil: 'networkidle' });
  assert.match(await page.locator('#research').innerText(), /24 survey responses/);
  assert.equal(await page.locator('#outcome h2').textContent(), 'What’s next');
  assert.match(await page.locator('#outcome').innerText(), /complete app and test it in daily use/);
  assert.doesNotMatch(await page.locator('#outcome').innerText(), /prototype|design steps/i);
  assert.doesNotMatch(await page.locator('article').innerText(), /developed the app independently/);
  await page.close();

  const animated = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference', ignoreHTTPSErrors: true });
  animated.on('pageerror', error => errors.push(error.message));
  await animated.goto(base + '/work/medicine-app', { waitUntil: 'networkidle' });
  assert.equal(await animated.locator('#hero video').count(), 0, 'Opening stays still');
  assert.equal(await animated.locator('.lf-feature-grid video').count(), 2, 'Supporting sequences play when motion is allowed');
  await animated.getByRole('button', { name: 'Pause record a dose animation' }).click();
  assert.equal(await animated.locator('.lf-feature-grid video').count(), 1);
  for (const slug of cases) {
    assert.equal((await animated.goto(base + '/work/' + slug)).status(), 200);
    for (const id of stages) assert.equal(await animated.locator('#' + id).count(), 1);
  }
  await animated.close();

  const plainContext = await browser.newContext({ javaScriptEnabled: false, ignoreHTTPSErrors: true });
  const plain = await plainContext.newPage();
  await plain.goto(base + '/work/medicine-app');
  assert.equal(await plain.locator('h1').textContent(), 'Meditimer');
  assert.equal(await plain.locator('[aria-label="Case study stages"] a').count(), 5);
  await plain.getByRole('link', { name: 'View screen full size' }).press('Enter');
  await plain.waitForURL('**/scan-screen.png', { waitUntil: 'domcontentloaded' });
  await plainContext.close();
  assert.deepEqual(errors, []);

  const report = { passed: true, viewports: 5, imageChecks, runtimeErrors: errors, checks: ['Stage navigation starts at Research', 'Responsive flattened mockups', 'Original static opening and matched background', 'Pauseable supporting sequences and reduced motion', 'Keyboard gallery and full-size screen fallback', 'Information structure dialog', 'Original caregiver-history screens', 'What’s next copy', 'Other case routes', 'No-JavaScript image access'] };
  fs.writeFileSync(out + '/verification.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
} finally {
  await browser?.close();
}
