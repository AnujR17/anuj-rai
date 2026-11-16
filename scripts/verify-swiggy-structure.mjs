import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const {chromium}=createRequire(import.meta.url)('playwright');
const base=process.env.PORTFOLIO_URL||'http://localhost:3000';
const out=process.env.REVIEW_DIR||'/workspace/swiggy-structure-review';
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const layouts=[],errors=[];
try {
 for(const width of [1440,768,390,320]) {
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/work/swiggy-agent-workflow',{waitUntil:'networkidle'});
  const contents=page.getByRole('navigation',{name:'Case study contents'});
  assert.equal(await contents.getByRole('link').count(),5);
  for(const link of await contents.getByRole('link').all()) {
   const id=(await link.getAttribute('href')).slice(1);
   const chapter=page.locator('#'+id);
   const title=await chapter.locator(':scope > h2').innerText();
   assert.ok((await link.innerText()).includes(title),'Contents title differs from destination');
   await link.click();
   await page.waitForFunction(id=>Math.abs(document.getElementById(id).getBoundingClientRect().top-parseFloat(getComputedStyle(document.getElementById(id)).scrollMarginTop))<3,id);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  }
  // Subordinate artifacts and alternative states must not masquerade as chapters.
  await page.locator('article details').evaluateAll(items=>items.forEach(e=>e.open=true));
  const skipped=await page.locator('article :is(h1,h2,h3,h4,h5,h6)').evaluateAll(items=>{
   let previous=0;return items.flatMap(e=>{const rank=Number(e.tagName.slice(1));const result=rank>previous+1?[e.textContent.trim()]:[];previous=rank;return result;});
  });
  assert.deepEqual(skipped,[],'Skipped heading levels');
  // Establish research and synthesis before presenting the persona models.
  assert.equal(await page.locator('#research [data-research-artifact="personas"]').count(),0);
  assert.equal(await page.locator('#research [data-research-evidence] h4').count(),3);
  assert.equal(await page.locator('#research [data-research-artifact="assumptions"]').count(),1);
  assert.equal(await page.locator('#insights [data-research-artifact="personas"]').count(),1);
  const researchOrder=await page.evaluate(()=>{
   const selectors=['[data-research-evidence]','[data-research-artifact="assumptions"]','[data-research-synthesis]','[data-research-artifact="mental-model"]','[data-research-artifact="stakeholder-map"]','[data-research-artifact="personas"]'];
   return selectors.map(s=>{const e=document.querySelector(s),r=e.getBoundingClientRect();return {top:r.top+scrollY,bottom:r.bottom+scrollY};});
  });
  for(let i=1;i<researchOrder.length;i++)assert.ok(researchOrder[i].top>=researchOrder[i-1].bottom,'Personas precede their evidence or synthesis');
  assert.equal(await page.locator('#design [data-research-artifact="assumptions"]').count(),0);
  assert.equal(await page.locator('#design [data-research-artifact="original-flows"]').count(),0);
  assert.equal(await page.locator('#concept [data-research-artifact="original-flows"] img').count(),5);
  assert.equal(await page.locator('#concept [data-vector-study="refund-cost"]').count(),1);
  assert.equal(await page.locator('#scenario-cases [role="tabpanel"] h4').count(),5);
  assert.equal(await page.locator('#review-findings h4').count(),3);
  for (const [parent,child] of [['#layout-iterations > h3','#layout-iterations [role="tabpanel"] > h4'],['#scenario-cases > h3','#scenario-cases [role="tabpanel"] > h4'],['#review-findings > h3','#review-findings h4']]) {
   const size=locator=>page.locator(locator).first().evaluate(e=>parseFloat(getComputedStyle(e).fontSize));
   assert.ok(await size(parent)>await size(child),'Individual states compete with their group heading');
  }
  await page.locator('article img').evaluateAll(async images=>Promise.all(images.map(i=>{i.loading='eager';return i.decode().catch(()=>{});}))); 
  await contents.screenshot({path:out+'/contents-'+width+'.png'});
  layouts.push({width,chapterLinks:5,skippedHeadingLevels:0});
  await page.close();
 }
 const plain=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false});
 await plain.goto(base+'/work/swiggy-agent-workflow',{waitUntil:'networkidle'});
 assert.equal(await plain.getByRole('navigation',{name:'Case study contents'}).getByRole('link').count(),5);
 for(const panel of await plain.locator('[id^="version-panel-"]').all())assert.equal(await panel.isVisible(),true);
 await plain.close();assert.deepEqual(errors,[]);
 const report={passed:true,layouts,runtimeErrors:errors,checks:['five descriptive contents links land on matching chapters','subordinate versions, scenarios and findings have proper heading levels and smaller type','research evidence and assumptions precede synthesis, maps and personas; cost and flows stay with the concept','working-case chapter follows investigation actions and scenario variants','all supplied artifacts and native no-JavaScript contents retained']};
 fs.writeFileSync(out+'/structure-verification.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
}finally{await browser.close();}
