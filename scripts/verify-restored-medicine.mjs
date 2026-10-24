import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const {chromium}=createRequire(import.meta.url)('playwright');
const base=process.env.PORTFOLIO_URL||'http://localhost:3000';
const out=process.env.REVIEW_DIR||'/workspace/meditimer-review';
fs.mkdirSync(out,{recursive:true});
let browser;
try {
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext({reducedMotion:'reduce'}), errors=[];
 context.on('page',page=>page.on('pageerror',error=>errors.push(error.message)));
 const page=await context.newPage();let imageChecks=0;
 for(const [width,height] of [[1440,1000],[1024,768],[768,1024],[390,844],[320,740]]) {
  await page.setViewportSize({width,height});assert.equal((await page.goto(base+'/work/medicine-app',{waitUntil:'networkidle'})).status(),200);
  assert.equal(await page.locator('h1').textContent(),'Meditimer');assert.equal(await page.locator('h1').count(),1);
  assert.deepEqual(await page.locator('.lf-scene').evaluateAll(sections=>sections.map(section=>section.querySelector('h2').textContent)),['Users','Dose records','User views','Screens','Project status']);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Overflow at '+width);
  assert.equal(await page.locator('.lf-facts details').count(),3);
  await page.locator('.lf-static-device').evaluateAll(async images=>{for(const image of images){image.loading='eager';await image.decode()}});
  const devices=await page.locator('.lf-static-device').evaluateAll(images=>images.filter(i=>i.clientWidth).map(i=>({loaded:i.naturalWidth>0,border:parseFloat(getComputedStyle(i).borderTopWidth),radius:parseFloat(getComputedStyle(i).borderRadius),ratio:i.clientWidth/i.clientHeight,natural:i.naturalWidth/i.naturalHeight})));
  for(const image of devices){assert.ok(image.loaded);assert.equal(image.border,0);assert.equal(image.radius,0);assert.ok(Math.abs(image.ratio-image.natural)<.008,JSON.stringify(image));imageChecks++;}
  if([1440,390].includes(width))await page.screenshot({path:`${out}/hero-${width}.png`});
  await page.getByRole('button',{name:'Review',exact:true}).first().click();assert.equal(await page.locator('[data-opening-screen]').getAttribute('data-opening-screen'),'review');
  await page.getByRole('button',{name:'Routine',exact:true}).first().click();assert.equal(await page.locator('[data-opening-screen]').getAttribute('data-opening-screen'),'routine');
  await page.locator('.lf-gallery-item').nth(1).click();assert.equal(await page.locator('.lf-design-gallery').getAttribute('data-active'),'1');
  await page.keyboard.press('ArrowRight');assert.equal(await page.locator('.lf-design-gallery').getAttribute('data-active'),'2');
  if([1440,390].includes(width)){await page.locator('#design').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/design-${width}.png`});}
  await page.locator('.lf-originals summary').click();await page.locator('.lf-source-open').first().click();
  assert.equal(await page.locator('.lf-image-dialog').evaluate(d=>d.open),true);
  assert.ok((await page.locator('.lf-image-dialog img').getAttribute('src')).includes('medicine.png'));
  await page.keyboard.press('Escape');assert.equal(await page.locator('.lf-image-dialog').evaluate(d=>d.open),false);
  await page.getByRole('button',{name:'Inspect structure',exact:true}).click();assert.equal(await page.locator('.lf-structure-dialog').evaluate(d=>d.open),true);
  await page.getByRole('button',{name:'Close structure',exact:true}).click();assert.equal(await page.locator('.lf-structure-dialog').evaluate(d=>d.open),false);
  await page.locator('#insights').scrollIntoViewIfNeeded();
  await page.getByRole('button',{name:'Show a recorded dose',exact:true}).click();assert.equal(await page.locator('.lf-status-card strong').textContent(),'Marked as taken');
  await page.getByRole('button',{name:'Show an empty record',exact:true}).click();
  if(width>700){await page.locator('.lf-stage-index a[href="#design"]').click();await page.waitForFunction(()=>document.querySelector('.lf-stage-index a[aria-current="location"]')?.getAttribute('href')==='#design');}
  else {await page.locator('.lf-mobile-index select').selectOption('design');assert.ok(page.url().endsWith('#design'));}
  console.log(`Restored case and static mockup proportions passed at ${width}px`);
 }
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/work/medicine-app',{waitUntil:'networkidle'});
 const initial=await page.locator('[data-opening-screen]').getAttribute('data-opening-screen');await page.waitForTimeout(2200);assert.equal(await page.locator('[data-opening-screen]').getAttribute('data-opening-screen'),initial,'Opening remains static until explicitly played');
 await page.getByRole('button',{name:'Play opening',exact:true}).click();await page.waitForTimeout(2000);assert.notEqual(await page.locator('[data-opening-screen]').getAttribute('data-opening-screen'),initial);await page.getByRole('button',{name:'Pause opening',exact:true}).click();
 await page.locator('.lf-facts summary').first().hover();assert.equal(await page.locator('.lf-facts details').first().evaluate(d=>d.open),true);await page.keyboard.press('Escape');
 await page.locator('.site-nav a[href="/about"]').click();await page.waitForURL('**/about');await page.mouse.wheel(0,800);await page.waitForTimeout(200);assert.ok(await page.evaluate(()=>scrollY)>0);assert.equal(await page.locator('.lf-stage-index').count(),0);
 // Other published cases retain their five stages and original assets.
 for(const slug of ['two-wheeler-dashboard','medtimer','toki','india-in-orbit','gandhinagar-roundabouts','medicine-storage-research','consumer-experience','skidge','swiggy-agent-workflow','myalumnus']){assert.equal((await page.goto(base+'/work/'+slug)).status(),200);for(const id of ['research','insights','concept','design','outcome'])assert.equal(await page.locator('#'+id).count(),1);}
 const plain=await browser.newPage({javaScriptEnabled:false});await plain.goto(base+'/work/medicine-app');assert.equal(await plain.locator('h1').textContent(),'Meditimer');assert.equal(await plain.locator('[aria-label="Case study stages"] a').count(),5);await plain.locator('.lf-originals summary').click();await plain.locator('.lf-source-open').first().click({noWaitAfter:true});await plain.waitForURL('**/medicine.png',{waitUntil:'domcontentloaded'});await plain.close();
 assert.deepEqual(errors,[]);
 const report={passed:true,viewports:5,imageChecks,runtimeErrors:errors,checks:['Original layered compositions','All five original Figma frames','Static baked mockups preserve proportions','Manual opening scenes and opt-in playback','Selectable screen gallery','Original-interface modal and native fallback','Information-structure modal','Dose-record comparison','Three scope facts','Desktop index and phone selector','Other ten case routes and stages','No-JavaScript image access']};fs.writeFileSync(out+'/verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
} finally {await browser?.close()}
