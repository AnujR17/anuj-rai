import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright');
const base = process.env.PORTFOLIO_URL || 'http://localhost:3000';
const referenceFile = process.env.WORK_REFERENCE_FILE;
assert.ok(referenceFile, 'Set WORK_REFERENCE_FILE to the user-supplied banners.html');
const out = process.env.REVIEW_DIR || '/workspace/portfolio-motion-review';
fs.mkdirSync(out, { recursive: true });
const slugs = ['medicine-app','swiggy-agent-workflow','two-wheeler-dashboard','toki','india-in-orbit','gandhinagar-roundabouts','medtimer','myalumnus'];
const frames = [0, .25, .49, .5, .51, .75, 1, 3.4, 7];
let browser, referenceServer;
const near = (a,b,message,tolerance=1) => assert.ok(Math.abs(a-b)<=tolerance,`${message}: ${a} vs ${b}`);
try {
 const html=fs.readFileSync(referenceFile);
 referenceServer=createServer((_request,response)=>{response.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});response.end(html)});
 await new Promise(resolve=>referenceServer.listen(0,'127.0.0.1',resolve));
 const referenceURL=`http://127.0.0.1:${referenceServer.address().port}/banners.html`;
 browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
 const errors=[], comparisons=[];let desktopPitch=0;
 const context=await browser.newContext({reducedMotion:'reduce'});
 context.on('page',p=>p.on('pageerror',e=>errors.push(e.message)));
 const ref=await context.newPage(), page=await context.newPage();
 const phase=()=>page.locator('[data-work-enhanced]').getAttribute('data-phase').then(Number);
 const snapshot=(p,reference)=>p.evaluate(isReference=>{
  const tiles=[...document.querySelectorAll(isReference?'.poster-tile':'[data-work-project]')];
  const labels=[...document.querySelectorAll(isReference?'.poster-label':'[data-work-label]')];
  return tiles.map((tile,i)=>{
   const rect=tile.getBoundingClientRect(), label=labels[i].getBoundingClientRect();
   return {x:rect.x,y:rect.y,width:rect.width,height:rect.height,visible:getComputedStyle(tile).visibility,selected:tile.getAttribute('aria-current'),opacity:Number(labels[i].style.opacity),labelRight:label.right,labelCenterY:label.y+label.height/2,labelBottom:label.bottom};
  });
 },reference);
 for(const [width,height] of [[1440,1000],[1024,768],[820,1180],[390,844],[320,740]]) {
  await Promise.all([ref.setViewportSize({width,height}),page.setViewportSize({width,height})]);
  await ref.goto(referenceURL);await ref.waitForSelector('body.ready');
  await page.goto(base+'/work',{waitUntil:'networkidle'});await page.waitForSelector('[data-work-enhanced="true"]');
  await page.evaluate(async()=>{await document.fonts.ready;await document.querySelector('[data-work-project] img').decode()});
  assert.deepEqual(await page.locator('[data-work-project]').evaluateAll(tiles=>tiles.map(t=>t.dataset.workProject)),slugs);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const pitch=await ref.evaluate(()=>posterLayout().pitch);if(width===1440)desktopPitch=pitch;
  for(const target of frames) {
   await ref.evaluate(value=>window.selectPoster(value,{immediate:true,manual:false}),target);
   const before=await phase();
   if(Math.abs(target-before)>.00001)await page.mouse.wheel(0,(target-before)*pitch/.8);
   await page.waitForFunction(value=>Math.abs(Number(document.querySelector('[data-work-enhanced]').dataset.phase)-value)<.00001,target);
   const expected=await snapshot(ref,true), actual=await snapshot(page,false);
   for(let i=0;i<slugs.length;i++) {
    for(const property of ['x','y','width','height'])near(actual[i][property],expected[i][property],`${width}px phase ${target} tile ${i} ${property}`);
    assert.equal(actual[i].visible,expected[i].visible);
    // Wheel input and direct reference selection can straddle the exact half-step by machine precision.
    if(Math.abs(target%1-.5)>.00001)assert.equal(actual[i].selected,expected[i].selected);
    near(actual[i].opacity,expected[i].opacity,'Title crossfade',.0001);
    if(actual[i].opacity>.005&&actual[i].visible==='visible') {
     if(width>700){near(actual[i].x-actual[i].labelRight,24,'Desktop title gap');near(actual[i].labelCenterY,actual[i].y+actual[i].height/2,'Desktop title center');}
     else near(actual[i].y-actual[i].labelBottom,16,'Phone title gap');
    }
   }
   comparisons.push({width,height,phase:target,tiles:8});
   if([1440,390].includes(width)&&[0,.5,1].includes(target))await Promise.all([ref.screenshot({path:`${out}/reference-${width}-${target}.png`}),page.screenshot({path:`${out}/work-${width}-${target}.png`})]);
  }
  console.log(`Reference geometry and title fades match at ${width}px`);
 }
 // Selecting a neighbouring cover grows it; selecting the active cover opens its case.
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/work',{waitUntil:'networkidle'});await page.waitForSelector('[data-work-enhanced="true"]');
 await page.locator('[data-work-project]').nth(1).click();
 assert.ok(page.url().endsWith('/work'));near(await phase(),1,'Neighbour click selects');
 await page.waitForTimeout(250);assert.equal(await page.locator('.navigation-progress').count(),0,'Selecting a cover does not start navigation');
 await page.locator('[data-work-project]').nth(1).click();await page.waitForURL('**/swiggy-agent-workflow');
 assert.equal(await page.locator('h1').textContent(),'Swiggy agent workflow');
 await page.locator('.site-nav a[href="/work"]').click();await page.waitForSelector('[data-work-enhanced="true"]');
 // Keyboard selection moves focus with the selected project.
 await page.locator('[data-work-project]').first().focus();await page.keyboard.press('ArrowRight');
 near(await phase(),1,'Keyboard selection');await page.waitForFunction(()=>document.activeElement?.getAttribute('data-work-project')==='swiggy-agent-workflow');assert.equal(await page.locator('[data-work-project="swiggy-agent-workflow"]').evaluate(el=>el===document.activeElement),true);
 await page.keyboard.press('End');near(await phase(),7,'Finite last project');
 await page.mouse.move(5,100);await page.mouse.wheel(0,9000);near(await phase(),7,'No loop at last project');assert.equal(await page.evaluate(()=>scrollY),0);
 await page.locator('.site-nav a[href="/work"]').click();near(await phase(),0,'Work link returns to the first cover');
 await page.keyboard.press('Home');await page.mouse.wheel(0,-9000);near(await phase(),0,'No loop before first project');
 // Dragging changes phase continuously and does not follow the cover link.
 const cover=await page.locator('[data-work-project] img').first().boundingBox();
 await page.mouse.move(cover.x+cover.width/2,cover.y+cover.height/2);await page.mouse.down();await page.mouse.move(cover.x+cover.width/2,cover.y+cover.height/2-120,{steps:8});await page.mouse.up();
 assert.ok(await phase()>.3);assert.ok(page.url().endsWith('/work'));
 // Global touch uses direct movement and leaves horizontal gestures alone.
 await page.keyboard.press('Home');
 await page.evaluate(()=>{
  const emit=(name,x,y)=>{const p=new Touch({identifier:9,target:document.body,clientX:x,clientY:y});dispatchEvent(new TouchEvent(name,{touches:[p],bubbles:true,cancelable:true}))};
  emit('touchstart',10,600);emit('touchmove',10,300);dispatchEvent(new TouchEvent('touchend',{touches:[],bubbles:true}));
 });
 await page.waitForFunction(()=>Number(document.querySelector('[data-work-enhanced]').dataset.phase)>.5);
 await page.locator('.site-nav a[href="/about"]').click();await page.waitForURL('**/about');await page.waitForSelector('[data-work-enhanced]',{state:'detached'});await page.mouse.wheel(0,1000);await page.waitForTimeout(200);assert.ok(await page.evaluate(()=>scrollY)>0);
 // Initial hold, uniform autoplay speed and hover pause, with a controlled clock.
 const auto=await browser.newPage({viewport:{width:1440,height:1000}});
 auto.on('pageerror',e=>errors.push(e.message));
 await auto.clock.install({time:new Date('2026-10-21T00:00:00Z')});await auto.clock.pauseAt(new Date('2026-10-21T00:00:01Z'));
 await auto.goto(base+'/work',{waitUntil:'networkidle'});await auto.waitForSelector('[data-work-enhanced="true"]');await auto.evaluate(async()=>{await document.fonts.ready;await document.querySelector('[data-work-project] img').decode()});
 await auto.mouse.move(5,100);await auto.clock.runFor(2000);
 near(Number(await auto.locator('[data-work-enhanced]').getAttribute('data-phase')),0,'Initial hold',.00001);
 let box=await auto.locator('[data-work-project] img').first().boundingBox();await auto.mouse.move(box.x+box.width/2,box.y+box.height/2);await auto.clock.runFor(4000);
 near(Number(await auto.locator('[data-work-enhanced]').getAttribute('data-phase')),0,'Hover pauses countdown',.00001);
 await auto.mouse.move(5,100);await auto.clock.runFor(2100);
 const start=Number(await auto.locator('[data-work-enhanced]').getAttribute('data-phase'));assert.ok(start>.15&&start<.25);
 await auto.clock.runFor(1000);const after=Number(await auto.locator('[data-work-enhanced]').getAttribute('data-phase'));near(after-start,.18,'Reference autoplay speed',.005);
 box=await auto.locator('[data-work-project] img').first().boundingBox();await auto.mouse.move(box.x+box.width/2,box.y+box.height/2);await auto.clock.runFor(2000);
 near(Number(await auto.locator('[data-work-enhanced]').getAttribute('data-phase')),after,'Hover pauses movement',.00001);
 // Manual wheel movement still eases while hover pauses autoplay.
 await auto.mouse.wheel(0,desktopPitch/.8);await auto.waitForTimeout(20);await auto.clock.runFor(180);
 const midway=Number(await auto.locator('[data-work-enhanced]').getAttribute('data-phase'));
 assert.ok(midway-after>.5&&midway-after<.75,'Wheel movement eases rather than snapping');
 await auto.clock.runFor(1400);near(Number(await auto.locator('[data-work-enhanced]').getAttribute('data-phase')),after+1,'Wheel reaches its target',.002);
 await auto.close();
 // Essential project links still work without JavaScript.
 const plain=await browser.newPage({javaScriptEnabled:false});await plain.goto(base+'/work');assert.equal(await plain.locator('[data-work-project]').count(),8);
 await plain.locator('[data-work-project="myalumnus"]').click({noWaitAfter:true});await plain.waitForURL('**/myalumnus',{waitUntil:'domcontentloaded'});assert.equal(await plain.locator('h1').textContent(),'My Alumnus');await plain.close();
 assert.deepEqual(errors,[]);
 fs.writeFileSync(out+'/verification.json',JSON.stringify({passed:true,comparisonScenes:comparisons.length,tileComparisons:comparisons.length*8,comparisons,runtimeErrors:errors,checks:['Reference scaling and trajectories','Title positions and crossfades','Adjacent-cover selection','Active-cover navigation','Keyboard and finite endpoints','Mouse drag without navigation','Global touch','Route cleanup','Initial hold and hover pause','Autoplay at 0.18 projects/second','No-JavaScript links']},null,2));
 console.log(`Passed ${comparisons.length} reference scenes, ${comparisons.length*8} tile comparisons and Work interactions`);
} finally { await browser?.close();if(referenceServer)await new Promise(resolve=>referenceServer.close(resolve)); }
