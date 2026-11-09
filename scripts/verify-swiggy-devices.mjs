import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const { chromium }=createRequire(import.meta.url)('playwright');
const base=process.env.PORTFOLIO_URL||'http://localhost:3000';
const out=process.env.REVIEW_DIR||'/workspace/swiggy-device-review';
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const errors=[];
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/work/swiggy-agent-workflow',{waitUntil:'networkidle'});
 assert.equal(await page.locator('[data-device-motion]').count(),8);
 assert.equal(await page.locator('[data-device-motion] [data-device-scene]').count(),8);
 assert.equal(await page.locator('video[autoplay]').count(),0);
 const tabs=page.getByRole('tablist',{name:'Support scenarios'});
 await tabs.getByRole('tab').first().focus();await page.keyboard.press('ArrowRight');
 assert.equal(await tabs.getByRole('tab').nth(1).getAttribute('aria-selected'),'true');
 assert.equal(await page.locator('#scenario-panel-missing-item').isVisible(),true);
 await page.keyboard.press('End');assert.equal(await page.locator('#scenario-panel-late-delivery').isVisible(),true);
 await page.keyboard.press('Home');assert.equal(await page.locator('#scenario-panel-wrong-item').isVisible(),true);
 const scene=page.locator('[data-device-motion="evidence"]'),video=scene.locator('video');
 await scene.scrollIntoViewIfNeeded();
 await scene.getByRole('button',{name:/^Play /}).click();
 await video.evaluate(v=>new Promise(resolve=>{if(v.currentTime>.2)resolve();else v.addEventListener('timeupdate',function ontime(){if(v.currentTime>.2){v.removeEventListener('timeupdate',ontime);resolve()}},{passive:true})}));
 assert.equal(await video.evaluate(v=>v.paused),false);
 assert.ok(Math.abs(await video.evaluate(v=>v.videoWidth/v.videoHeight)-1.6)<.001);
 await scene.getByRole('button',{name:/^Pause /}).click();assert.equal(await video.evaluate(v=>v.paused),true);
 await video.evaluate(v=>v.currentTime=5);
 await scene.getByRole('button',{name:/^Restart /}).click();
 assert.ok(await video.evaluate(v=>v.currentTime)<1.5);
 await scene.getByRole('button',{name:/^View .* fullscreen$/}).click();
 await page.waitForFunction(()=>document.fullscreenElement?.tagName==='VIDEO');
 assert.equal(await video.evaluate(v=>v.controls),true);
 await page.evaluate(()=>document.exitFullscreen());
 await page.waitForFunction(()=>!document.fullscreenElement);
 assert.equal(await video.evaluate(v=>v.controls),false);
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
 await page.waitForFunction(()=>document.querySelector('[data-device-motion="evidence"] video').paused);
 const sizes=[];
 for(const width of [1440,768,390,320]){
  await page.setViewportSize({width,height:1000});
  for(const id of ['evidence','parties','decision']){
   const root=page.locator('[data-device-motion="'+id+'"]');
   await root.scrollIntoViewIfNeeded();
   const geometry=await root.locator('[data-device-scene]').evaluate(e=>({fits:e.scrollWidth<=e.clientWidth,width:e.getBoundingClientRect().width}));
   assert.ok(geometry.fits,'Mockup overflows at '+id+'/'+width);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Page overflows at '+width);
   if([1440,390].includes(width))await page.screenshot({path:out+'/'+id+'-'+width+'.png'});
   sizes.push({width,id});
  }
 }
 await page.close();
 const plain=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false,reducedMotion:'reduce'});
 await plain.goto(base+'/work/swiggy-agent-workflow',{waitUntil:'networkidle'});
 for(const panel of await plain.locator('[id^="scenario-panel-"]').all())assert.equal(await panel.isVisible(),true);
 for(const control of await plain.locator('[data-device-motion] video').all())assert.equal(await control.evaluate(v=>v.controls),true,'No-JavaScript native controls missing');
 assert.equal(await plain.locator('video[autoplay]').count(),0);
 assert.equal(await plain.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await plain.close();
 assert.deepEqual(errors,[]);
 const result={passed:true,sizes,runtimeErrors:errors,checks:['eight media scenes in physical device mockups','scenario tabs: keyboard, selected content and no-JavaScript fallback','play, pause and restart','fullscreen with native controls, restored on exit','automatic pause when scrolled out of view','original 8:5 source proportions','four viewport widths without overflow','no autoplay, including reduced motion','native video controls without JavaScript']};
 fs.writeFileSync(out+'/devices-verification.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
} finally { await browser.close(); }
