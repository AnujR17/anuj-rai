import { createRequire } from "node:module";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
const { chromium } = createRequire(import.meta.url)("playwright");
const base = process.env.PORTFOLIO_URL || "http://localhost:3001";
const out = process.env.REVIEW_DIR || "/workspace/swiggy-case-review";
const ids = ["research", "insights", "concept", "design", "outcome"];
fs.mkdirSync(out, { recursive: true });

async function verify() {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium", args: ["--no-sandbox"] });
  const errors = [];
  const context = await browser.newContext();
  context.on("page", page => page.on("pageerror", error => errors.push(error.message)));
  const page = await context.newPage();
  let layouts = 0, stagePositions = 0;
  for (const width of [1440, 1024, 768, 390, 320]) {
    const height = width > 700 ? 1000 : 844;
    await page.setViewportSize({ width, height });
    assert.equal((await page.goto(base + "/work/swiggy-agent-workflow", { waitUntil: "networkidle" })).status(), 200);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.locator('[aria-label="Case study stages"] a').count(), 5);
    assert.equal(await page.locator("video").count(), 8);
    assert.equal(await page.locator('video[autoplay]').count(), 0);
    assert.equal(await page.locator('a[download]').count(), 8);
    await page.locator('article img').evaluateAll(async images => Promise.all(images.map(image => { image.loading = 'eager'; return image.decode().catch(() => {}); })));
    assert.deepEqual(await page.locator('article img').evaluateAll(images => images.filter(image => !image.naturalWidth).map(image => image.src)), []);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width}`);
    for (const id of ids) {
      await page.locator("#" + id).evaluate(element => scrollTo({ top: element.getBoundingClientRect().top + scrollY - 60, behavior: "instant" }));
      await page.waitForFunction(id => document.querySelector('[aria-label="Case study stages"] [aria-current="location"]')?.getAttribute("href") === "#" + id, id);
      if (width > 700) {
        const box = await page.locator('[aria-label="Case study stages"]').boundingBox();
        assert.ok(box.y >= 0 && box.y + box.height <= height, `Stage index offscreen at ${id}/${width}`);
        const inset = await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--section-bottom")));
        // CSS uses clamp; compare with the section inset's evaluated formula.
        const expectedBottom = Number.isFinite(inset) ? inset : Math.max(40, Math.min(64, height * .06));
        assert.ok(Math.abs(height - box.y - box.height - expectedBottom) < 2, `Wrong bottom baseline at ${id}/${width}`);
        const copy = await page.locator("#" + id + " p").first().boundingBox();
        assert.ok(box.x + box.width < copy.x, `Navigation overlaps copy at ${width}`);
        stagePositions++;
      }
    }
    await page.locator("#design").evaluate(e => scrollTo({ top: e.offsetTop, behavior: "instant" }));
    await page.screenshot({ path: path.join(out, `swiggy-design-${width}.png`), fullPage: false });
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: path.join(out, `swiggy-opening-${width}.png`) });
    const tabs = page.getByRole('tablist', { name: 'Swiggy design iterations' });
    await tabs.getByRole('tab').first().focus();await page.keyboard.press('ArrowRight');
    assert.equal(await tabs.getByRole('tab').nth(1).getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('#version-panel-1').isVisible(), true);
    await page.keyboard.press('End');assert.equal(await page.locator('#version-panel-3').isVisible(), true);
    await page.keyboard.press('Home');assert.equal(await page.locator('#version-panel-0').isVisible(), true);
    await page.locator('#concept').evaluate(e => scrollTo({top:e.getBoundingClientRect().top+scrollY-24,behavior:'instant'}));
    await page.screenshot({path:path.join(out,`swiggy-evolution-${width}.png`)});
    layouts++;
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + "/work/swiggy-agent-workflow", { waitUntil: "networkidle" });
  for (const detail of await page.locator("details").all()) await detail.evaluate(e => e.open = true);
  assert.equal(await page.locator("table").first().locator("tbody tr").count(), 16);
  assert.match(await page.locator("table").first().innerText(), /Minor, disputed/);
  assert.match(await page.locator("article").innerText(), /Claude/);
  const media = page.locator("video").first();
  await media.evaluate(v => v.play());
  await page.waitForFunction(() => document.querySelector("video").currentTime > .15);
  await media.evaluate(v => v.pause());
  assert.equal(await media.evaluate(v => v.paused), true);
  for (const slug of ["wrong-item", "missing-item", "not-delivered", "quality-complaint", "late-delivery"]) {
    const response = await page.request.get(`${base}/portfolio/swiggy/media/${slug}.gif`);
    assert.equal(response.status(), 200);
    assert.match(response.headers()["content-type"], /image\/gif/);
    assert.ok((await response.body()).length > 10000);
  }
  for (const id of ['evidence','parties','decision']) {
    const file='public/portfolio/swiggy/motion/'+id;
    const spec=JSON.parse(fs.readFileSync(file+'.json','utf8'));
    const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-select_streams','v:0','-show_entries','stream=width,height,r_frame_rate,nb_frames','-show_entries','format=duration','-of','json',file+'.mp4'],{encoding:'utf8'}));
    assert.equal(probe.streams[0].width,1600);assert.equal(probe.streams[0].height,900);
    assert.equal(probe.streams[0].r_frame_rate,'30/1');
    assert.ok(Math.abs(Number(probe.format.duration)-spec.duration)<.06,'Narration clipped: '+id);
    assert.equal(Number(probe.streams[0].nb_frames),spec.renderedFrames);
    assert.equal(spec.sourceSeekVerified,true,'Source video seeking not verified: '+id);
    assert.ok(spec.chapters.length>=4&&spec.chapters.some((chapter,index)=>index&&chapter.camera.some((value,axis)=>value!==spec.chapters[0].camera[axis])),'Camera is static: '+id);
    const response=await page.request.get(base+'/portfolio/swiggy/motion/'+id+'.gif');assert.equal(response.status(),200);assert.match(response.headers()['content-type'],/image\/gif/);
  }
  await page.goto(base + "/work/swiggy-agent-workflow/prototype", { waitUntil: "networkidle" });
  assert.match(await page.locator("article > p").innerText(), /Calls, refunds and reports are simulated/);
  const frame = page.frameLocator("iframe");
  await frame.locator('[data-act="go"][data-arg="S2"]').click();
  assert.match(await frame.locator("body").innerText(), /SW-2041/);
  assert.equal(await frame.locator("body").evaluate(() => document.fonts.check("400 14px Inter") && document.fonts.check("500 14px Inter") && document.fonts.check("600 14px Inter")), true);

  // Normal motion is essential: reduced-motion-only checks hid the original bug.
  for (const width of [1440, 768]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base + "/work/medicine-app", { waitUntil: "networkidle" });
    await page.waitForSelector('.lf-main[data-enhanced="true"]');
    for (const id of ids) {
      await page.locator("#" + id).evaluate(e => scrollTo({ top: e.getBoundingClientRect().top + scrollY - 60, behavior: "instant" }));
      await page.waitForTimeout(80);
      const nav = page.locator(".lf-stage-index");
      assert.equal(await nav.getAttribute("data-visible"), "true");
      const box = await nav.boundingBox();
      assert.ok(box.y >= 0 && box.y + box.height <= 1000, `Medicine index offscreen at ${id}/${width}`);
      assert.equal(await page.locator(".route-entry").evaluate(e => getComputedStyle(e).translate), "none");
      assert.equal(await nav.locator('[aria-current="location"]').getAttribute("href"), "#" + id);
      stagePositions++;
    }
    await page.screenshot({ path: path.join(out, `medicine-index-${width}.png`) });
  }

  const plain = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const fallback = await plain.newPage();
  await fallback.goto(base + "/work/swiggy-agent-workflow", { waitUntil: "networkidle" });
  assert.equal(await fallback.locator('[aria-label="Case study stages"] a').count(), 5);
  assert.equal(await fallback.locator('[role="tabpanel"]').count(),4);
  for(const panel of await fallback.locator('[role="tabpanel"]').all())assert.equal(await panel.isVisible(),true,'Wireframes require JavaScript');
  await fallback.locator('[aria-label="Case study stages"] a[href="#outcome"]').click();
  assert.equal(new URL(fallback.url()).hash, "#outcome");
  const findings = fallback.locator("details").filter({ has: fallback.locator("summary", { hasText: "Read all 16" }) });
  await findings.locator("summary").click();
  assert.equal(await findings.getAttribute("open"), "");
  assert.equal(await fallback.locator('video[autoplay]').count(), 0);
  await plain.close();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base + "/work", { waitUntil: "networkidle" });
  await page.waitForSelector('[data-work-enhanced="true"]');
  await page.keyboard.press("Home"); await page.keyboard.press("ArrowDown");
  await page.locator('[data-work-project="swiggy-agent-workflow"]').click();
  await page.waitForURL("**/work/swiggy-agent-workflow");
  assert.equal(await page.locator('[data-work-enhanced="true"]').count(), 0);
  await page.mouse.wheel(0, 700); await page.waitForTimeout(100);
  assert.ok(await page.evaluate(() => scrollY) > 0, "Case remains natively scrollable after Work");
  assert.deepEqual(errors, []);
  await browser.close();

  const provenance = JSON.parse(fs.readFileSync("public/portfolio/swiggy/provenance.json", "utf8"));
  for (const [file, hash] of Object.entries(provenance.source_sha256)) {
    if (file === "index.html") continue;
    const bytes = fs.readFileSync("public/portfolio/swiggy/prototype/" + file);
    assert.equal(crypto.createHash("sha256").update(bytes).digest("hex"), hash, "Original file changed: " + file);
  }
  const result = { passed: true, layouts, stagePositions, runtimeErrors: errors, checks: ["five-stage responsive reading layout and loaded original images", "four-version comparison with keyboard navigation and no-JavaScript access", "three complete 30fps camera/text films with untruncated narration and GIF responses", "five complete ticket references", "optional media playback and pause", "sixteen-findings disclosure and policy-version conflict", "playable local prototype and original font weights", "normal-motion shared and Meditimer indices", "native no-JavaScript links and disclosures", "Work-to-case navigation and scroll cleanup", "original source SHA-256 hashes"] };
  fs.writeFileSync(path.join(out, "verification.json"), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result));
}
verify().catch(error => { console.error(error); process.exit(1); });
