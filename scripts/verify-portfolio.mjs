import { createRequire } from 'node:module';
const loadModule = createRequire(import.meta.url);
const { chromium } = loadModule('playwright');
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base = process.env.PORTFOLIO_URL || 'http://localhost:3000';
const selected = ['medicine-app','swiggy-agent-workflow','two-wheeler-dashboard','toki','india-in-orbit','gandhinagar-roundabouts','medtimer','myalumnus'];
const cases = [...selected, 'medicine-storage-research','consumer-experience','skidge'];
const stages = ['research','insights','concept','design','outcome'];
const out = process.env.REVIEW_DIR || '/workspace/portfolio-review';
fs.mkdirSync(out, {recursive:true});
(async () => {
 const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
 const errors=[]; let layoutChecks=0;
 const context=await browser.newContext({reducedMotion:'reduce'});
 context.on('page',p=>p.on('pageerror',e=>errors.push(e.message)));
 const page=await context.newPage();
 for(const width of [1440,1024,768,390,320]) {
  await page.setViewportSize({width,height:width>700?1000:844});
  for(const route of ['/work',...cases.map(s=>'/work/'+s)]) {
   const response=await page.goto(base+route,{waitUntil:'networkidle'});
   assert.equal(response.status(),200,route);
   await page.evaluate(()=>scrollTo(0,0));
   assert.equal(await page.locator('h1').count(),1,route+' h1');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route+' overflow '+width);
   assert.ok(await page.locator('nav[aria-label="Main navigation"]').isVisible());
   if(route==='/work') {
    await page.waitForSelector('[data-work-enhanced="true"]');
    assert.deepEqual(await page.locator('[data-work-project]').evaluateAll(rows=>rows.map(r=>r.dataset.workProject)),selected);
    const title=await page.locator('h1').boundingBox();
    assert.ok(title.y>600,'Work stays bottom-left');
    const first=await page.locator('[data-work-project] img').first().boundingBox();
    assert.ok(first.y>76 && first.y+first.height<844,'First banner fully visible');
    assert.equal(await page.locator('body > footer').isVisible(),false);
    await page.mouse.move(5,120);await page.mouse.wheel(0,1500);
    assert.equal(await page.evaluate(()=>scrollY),0);
    assert.ok(Number(await page.locator('[data-work-enhanced]').getAttribute('data-project'))>0,'Global wheel moves projects');
    await page.keyboard.press('End');
    assert.equal(await page.locator('[data-work-enhanced]').getAttribute('data-project'),'7');
    await page.mouse.wheel(0,5000);
    assert.equal(await page.evaluate(()=>scrollY),0);
    assert.equal(await page.locator('[data-work-enhanced]').getAttribute('data-project'),'7');
    await page.keyboard.press('Home');
    await page.mouse.wheel(0,-5000);
    assert.equal(await page.locator('[data-work-enhanced]').getAttribute('data-project'),'0');
    await page.locator('[data-work-project="toki"]').focus();
    assert.equal(await page.locator('[data-work-enhanced]').getAttribute('data-project'),'3','Offscreen keyboard focus selects project');
    assert.ok((await page.locator('[data-work-project="toki"]').boundingBox()).y>76);
   } else {
    assert.equal(await page.locator('[aria-label="Case study stages"] a').count(),5);
    for(const stage of stages) assert.equal(await page.locator('#'+stage).count(),1);
    await page.locator('article img').evaluateAll(async imgs=>Promise.all(imgs.map(i=>{i.loading='eager';return i.decode().catch(()=>{})})));
    const invalid=await page.locator('article img').evaluateAll(imgs=>imgs.filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src));
    assert.deepEqual(invalid,[],route+' images');
    assert.equal(await page.locator('body > footer').isVisible(),true);
    // All overview prose and story paragraphs share a left reading alignment.
    const xs=await page.locator('article > div').first().locator('p').first().evaluate(el=>el.getBoundingClientRect().left);
    const storyX=await page.locator('#research p').first().evaluate(el=>el.getBoundingClientRect().left);
    assert.ok(Math.abs(xs-storyX)<3,route+' reading alignment');
   }
   layoutChecks++;
  }
  console.log(`Layout checks passed at ${width}px`);
 }
 await page.setViewportSize({width:1440,height:1000});
 await page.goto(base+'/work/medicine-app',{waitUntil:'networkidle'});
 const disclosure=page.locator('[aria-label="Project numbers"] details').first();
 await disclosure.locator('summary').hover();assert.equal(await disclosure.getAttribute('open'),'');
 await page.mouse.move(5,120);
 await disclosure.locator('summary').focus();await page.keyboard.press('Enter');
 assert.equal(await disclosure.getAttribute('open'),'');
 await page.locator('[aria-label="Case study stages"] a[href="#design"]').click();
 assert.equal(await page.locator('[aria-current="location"]').last().textContent(),'Design');
 assert.ok((await page.locator('#design').boundingBox()).y>=0);
 // Client navigation releases the Work-only scroll handling and returns it cleanly.
 await page.locator('.site-nav a[href="/work"]').click();
 await page.waitForSelector('[data-work-enhanced="true"]');
 await page.locator('.site-nav a[href="/about"]').click();
 await page.waitForURL('**/about');
 await page.mouse.wheel(0,1000); await page.waitForTimeout(250);
 assert.ok(await page.evaluate(()=>scrollY)>0,'About scroll restored');
 assert.equal(await page.locator('body > footer').isVisible(),true);
 await page.locator('.site-nav a[href="/work"]').click();
 await page.waitForSelector('[data-work-enhanced="true"]');
 assert.equal(await page.evaluate(()=>scrollY),0);
 // Reduced motion keeps the initial cover still.
 const still=await page.locator('[data-work-project]').first().boundingBox();await page.waitForTimeout(3400);
 assert.ok(Math.abs((await page.locator('[data-work-project]').first().boundingBox()).y-still.y)<1);
 // Touch gestures work over the title/empty area, not just the image.
 await page.evaluate(()=>{
  const start=new Touch({identifier:1,target:document.body,clientX:10,clientY:550});
  dispatchEvent(new TouchEvent('touchstart',{touches:[start],bubbles:true}));
  const end=new Touch({identifier:1,target:document.body,clientX:10,clientY:100});
  dispatchEvent(new TouchEvent('touchmove',{touches:[end],bubbles:true,cancelable:true}));
  dispatchEvent(new TouchEvent('touchend',{touches:[],bubbles:true}));
 });
 assert.ok(Number(await page.locator('[data-work-enhanced]').getAttribute('data-project'))>0);
 // Default motion has a real initial hold and hover pauses both hold and flow.
 const auto=await browser.newPage({viewport:{width:1440,height:1000}});
 auto.on('pageerror',e=>errors.push(e.message));
 await auto.goto(base+'/work',{waitUntil:'networkidle'});await auto.waitForSelector('[data-work-enhanced="true"]');
 await auto.evaluate(async()=>{await document.fonts.ready;await document.querySelector('[data-work-project] img').decode()});
 await auto.mouse.move(5,120);const initial=await auto.locator('[data-work-project]').first().boundingBox();
 await auto.waitForTimeout(1200);assert.ok(Math.abs((await auto.locator('[data-work-project]').first().boundingBox()).y-initial.y)<1,'Initial hold');
 {const box=await auto.locator('[data-work-project] img').first().boundingBox();await auto.mouse.move(box.x+box.width/2,box.y+box.height/2);}
 await auto.waitForTimeout(3300);assert.ok(Math.abs((await auto.locator('[data-work-project]').first().boundingBox()).y-initial.y)<1,'Hover pauses initial hold');
 await auto.mouse.move(5,120);await auto.waitForTimeout(3000);
 assert.ok((await auto.locator('[data-work-project]').first().boundingBox()).y<initial.y-5,'Autoplay moves after hold');
 {const box=await auto.locator('[data-work-project] img').first().boundingBox();await auto.mouse.move(box.x+box.width/2,box.y+box.height/2);}await auto.waitForTimeout(700);
 const paused=await auto.locator('[data-work-project]').first().boundingBox();await auto.waitForTimeout(900);
 assert.ok(Math.abs((await auto.locator('[data-work-project]').first().boundingBox()).y-paused.y)<1,'Hover pauses flow');
 await auto.close();
 console.log('Work interactions passed');
 // No-JavaScript routes retain every case link and native number disclosure.
 const plain=await browser.newContext({javaScriptEnabled:false});const fallback=await plain.newPage();
 await fallback.goto(base+'/work');assert.equal(await fallback.locator('[data-work-project]').count(),8);
 await fallback.locator('[data-work-project="myalumnus"]').click({noWaitAfter:true});await fallback.waitForURL('**/myalumnus',{waitUntil:'domcontentloaded'});
 assert.equal(await fallback.locator('h1').textContent(),'My Alumnus');
 assert.equal(await fallback.locator('[aria-label="Case study stages"] a').count(),5);
 const detail=fallback.locator('[aria-label="Project numbers"] details').first();await detail.locator('summary').click();assert.equal(await detail.getAttribute('open'),'');
 await plain.close();
 assert.equal((await page.goto(base+'/work/not-a-project')).status(),404);
 // Final review captures contain production assets and no development chrome.
 for(const width of [1440,390]) {await page.setViewportSize({width,height:width===1440?1000:844});for(const [name,route] of [['work','/work'],['case','/work/medicine-app'],['myalumnus','/work/myalumnus'],['home','/']]){await page.goto(base+route,{waitUntil:'networkidle'});await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${out}/${name}-${width}.png`});}}
 assert.deepEqual(errors,[],'Runtime errors');
 await browser.close();
 fs.writeFileSync(out+'/verification.json',JSON.stringify({passed:true,layoutChecks,caseRoutes:cases,workProjects:selected,runtimeErrors:errors,checks:['global wheel and touch','keyboard and offscreen focus','finite endpoints','initial hold','hover pause','reduced motion','client-navigation cleanup','native no-JavaScript links and disclosures','404','image loading','shared alignment']},null,2));
 console.log(`Passed ${layoutChecks} route/width layouts, all 11 cases, and Work interaction checks`);
})().catch(error=>{console.error(error);process.exit(1)});
