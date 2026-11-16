import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const { chromium } = createRequire(import.meta.url)('playwright');
const base = process.env.PORTFOLIO_URL || 'http://localhost:3000';
const out = process.env.REVIEW_DIR || '/workspace/swiggy-typography-review';
const widths = [1600, 1440, 1366, 1280, 1100, 1024, 900, 768, 700, 430, 390, 375, 360, 320];
fs.mkdirSync(out, { recursive: true });

// Measure actual word ranges, including inline content, after font loading.
function measure(elements) {
  return elements.filter(e => e.getBoundingClientRect().height > 0).map(e => {
    const lines = [];
    let wordId = 0;
    const walker = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
    for (let node; (node = walker.nextNode());) {
      for (const match of node.textContent.matchAll(/\S+/g)) {
        const range = document.createRange();
        range.setStart(node, match.index); range.setEnd(node, match.index + match[0].length);
        const key = wordId++;
        for (const r of range.getClientRects()) {
          if (!r.width || !r.height) continue;
          let line = lines.find(l => Math.abs(l.y - r.y) < 2);
          if (!line) { line = { y: r.y, words: [], keys: new Set(), left: r.left, right: r.right, gaps: [] }; lines.push(line); }
          if (!line.keys.has(key)) {
            if (line.words.length) line.gaps.push(Math.max(0, r.left - line.right));
            line.words.push(match[0]); line.keys.add(key);
          }
          line.left = Math.min(line.left, r.left); line.right = Math.max(line.right, r.right);
        }
      }
    }
    const style = getComputedStyle(e), last = lines.at(-1);
    return { text: e.textContent.trim(), lines: lines.length, lastWords: last?.words || [], lastRatio: last ? (last.right - last.left) / e.getBoundingClientRect().width : 1, width: e.getBoundingClientRect().width, alignment: style.textAlign, gapEm: Math.max(0, ...lines.flatMap(l => l.gaps)) / parseFloat(style.fontSize) };
  });
}

const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
const errors = [], layouts = [], orphanFailures = [];
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base + '/work/swiggy-agent-workflow', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.locator('article details').evaluateAll(elements => elements.forEach(e => { e.open = true; }));
  for (const width of widths) {
    await page.setViewportSize({ width, height: width > 700 ? 900 : 844 });
    const all = new Map();
    const collect = async locator => { for (const item of await locator.evaluateAll(measure)) all.set(item.text, item); };
    await collect(page.locator('article p, article dd'));
    for (const name of ['Swiggy design iterations', 'Support scenarios']) {
      const tabs = page.getByRole('tablist', { name }).getByRole('tab');
      for (const tab of await tabs.all()) {
        await tab.click();
        const id = await tab.getAttribute('aria-controls');
        await collect(page.locator('#' + id + ' p'));
      }
    }
    const paragraphs = [...all.values()];
    const orphans = paragraphs.filter(p => p.lines > 1 && p.lastWords.length === 1);
    orphanFailures.push(...orphans.map(p => ({ width, text: p.text })));
    assert.ok(paragraphs.every(p => !p.alignment.includes('justify')), 'Justified spacing introduced');
    assert.ok(paragraphs.every(p => p.gapEm < .75), 'Stretched inter-word spacing at ' + width);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    const hero = await page.locator('h1').evaluate(e => { const r = e.getBoundingClientRect(); return { bottom: r.bottom + scrollY, height: r.height, lineHeight: parseFloat(getComputedStyle(e).lineHeight) }; });
    assert.ok(hero.bottom <= (width > 700 ? 900 : 844));
    assert.ok(hero.height <= hero.lineHeight + 1, 'Project title wraps at ' + width);
    layouts.push({ width, paragraphs: paragraphs.length, orphanEndings: orphans.length, maximumWordGapEm: Math.max(...paragraphs.map(p => p.gapEm)), veryShortEndings: paragraphs.filter(p => p.lines > 2 && p.lastRatio < .2).length });
  }
  await page.close();
  const plainLayouts = [];
  for (const width of [390, 320]) {
    const plain = await browser.newPage({ viewport: { width, height: 844 }, javaScriptEnabled: false });
    await plain.goto(base + '/work/swiggy-agent-workflow', { waitUntil: 'networkidle' });
    await plain.evaluate(() => document.fonts.ready);
    await plain.locator('article details').evaluateAll(elements => elements.forEach(e => { e.open = true; }));
    const paragraphs = await plain.locator('article p, article dd').evaluateAll(measure);
    const plainOrphans = paragraphs.filter(p => p.lines > 1 && p.lastWords.length === 1);
    orphanFailures.push(...plainOrphans.map(p => ({ width, noJavaScript: true, text: p.text })));
    assert.equal(await plain.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    plainLayouts.push({ width, paragraphs: paragraphs.length, orphanEndings: plainOrphans.length });
    await plain.close();
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(orphanFailures, [], 'Stranded final words in the rendered case');
  const result = { passed: true, layouts, noJavaScript: plainLayouts, runtimeErrors: errors, checks: ['actual rendered line endings at fourteen widths', 'all four version and five scenario paragraphs', 'no stranded final words in paragraphs or metadata', 'single-line project title within the first fold', 'natural word spacing without justification', 'native typography and complete content without JavaScript'] };
  fs.writeFileSync(out + '/typography-verification.json', JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify(result));
} finally { await browser.close(); }
