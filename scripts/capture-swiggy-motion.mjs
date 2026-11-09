import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const { chromium } = createRequire(import.meta.url)('playwright');
const out=process.env.SWIGGY_MOTION_DIR||'/workspace/swiggy-motion-assets';
const base=process.env.SWIGGY_PROTOTYPE_URL||'http://localhost:3000/portfolio/swiggy/prototype/index.html';
fs.mkdirSync(path.join(out,'raw'),{recursive:true});

async function capture(browser,id){
 const context=await browser.newContext({viewport:{width:1440,height:900},recordVideo:{dir:path.join(out,'raw'),size:{width:1440,height:900}}});
 const born=Date.now(),page=await context.newPage(),events=[],errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.addInitScript(()=>document.addEventListener('DOMContentLoaded',()=>{
  const style=document.createElement('style');style.textContent='html,body,body *{cursor:none!important}.film-cursor{position:fixed;left:0;top:0;width:22px;height:27px;z-index:2147483647;pointer-events:none;filter:drop-shadow(0 2px 2px #0004)}.film-cursor[data-down=true]{filter:drop-shadow(0 0 5px #cf3518)}';document.head.append(style);
  const cursor=document.createElement('div');cursor.className='film-cursor';cursor.innerHTML='<svg viewBox="0 0 22 27"><path d="M2 1v21l5.5-5 4.5 9 4-2-4.5-8h8z" fill="white" stroke="#202020" stroke-width="1.5"/></svg>';document.body.append(cursor);
  document.addEventListener('pointermove',e=>cursor.style.transform=`translate(${e.clientX}px,${e.clientY}px)`);
  document.addEventListener('pointerdown',()=>cursor.dataset.down='true');document.addEventListener('pointerup',()=>cursor.dataset.down='false');
 }));
 await page.goto(base);await page.evaluate(()=>document.fonts.ready);await page.locator('.demo').evaluate(e=>e.style.display='none');
 let mouse={x:400,y:550};
 async function point(selector){
  const el=page.locator(selector+':visible').first();await el.waitFor({state:'visible'});const r=await el.boundingBox();const target={x:r.x+r.width/2,y:r.y+r.height/2};
  for(let i=1;i<=24;i++){const t=i/24,e=t*t*(3-2*t);await page.mouse.move(mouse.x+(target.x-mouse.x)*e,mouse.y+(target.y-mouse.y)*e);await page.waitForTimeout(16)}
  mouse=target;return el;
 }
 async function click(selector,label){const el=await point(selector);await page.waitForTimeout(180);await el.click();events.push({at:(Date.now()-born)/1000,label,x:mouse.x,y:mouse.y});await page.waitForTimeout(450)}
 const idle=()=>page.waitForFunction(()=>{const s=cur();return !s.playing&&!s.agTyping&&!s.stalk&&!(s.ann&&['wait','pwait'].includes(s.ann.stage))},{},{timeout:30000});
 await click('[data-act="go"][data-arg="S2"]','Open wrong-item ticket');
 if(id==='decision'){
  // Establish the same photo-review branch described by the case study.
  // These are visible UI actions, before the decision clip's pre-roll ends.
  await click('[data-act="evopen"]','Review evidence before contacting restaurant');
  const photos=await page.evaluate(()=>cur().photos.map(photo=>photo.id));
  for(let i=0;i<photos.length;i++){
   await click('[data-act="evgo"][data-arg="'+i+'"]','Inspect photo '+(i+1));
   await click('[data-act="agree"][data-arg="'+photos[i]+'|agree"]','Agree photo '+(i+1));
  }
  await click('[data-act="close"]','Return from evidence review');
  // Replay the supplied conversation through actual UI controls before the clip.
  for(let n=0;n<24;n++){
   await idle();const s=await page.evaluate(()=>({gate:atGate(cur()),next:nextAg(cur())!=null}));
   if(s.gate==='rest'){
    await click('[data-act="view"][data-arg="rest"]','Contact restaurant');await click('#ta','Start restaurant chat');
    await page.waitForFunction(()=>cur().restCall,{},{timeout:40000});await idle();await click('[data-act="dd"][data-arg="soe"]','Subject of error');await click('[data-act="ddpick"]','Record subject');await click('[data-act="view"][data-arg="chat"]','Return to customer');continue;
   }
   if(s.next){await click('#ta','Continue scripted conversation');continue}break;
  }
 }
 await page.mouse.move(450,550);mouse={x:450,y:550};await page.waitForTimeout(500);
 const lead=(Date.now()-born)/1000;
 const mark=()=>Number(((Date.now()-born)/1000-lead).toFixed(2));
 const chapters=[];
 if(id==='evidence'){
  chapters.push({at:mark(),title:'Start with what the customer sent',detail:'The complaint is a claim. The photo is a record to inspect.',camera:[720,450,.715]});await page.waitForTimeout(1500);
  await click('[data-act="evopen"]','Open customer evidence');chapters.push({at:mark(),title:'Open the evidence, with its origin and time',detail:'Source and submission time stay alongside the photo.',camera:[720,455,1.12]});await page.waitForTimeout(1800);
  await click('[data-act="agree"][data-arg$="|agree"]','Record first observation');await click('[data-act="evgo"][data-arg="1"]','Inspect the second photo');
  chapters.push({at:mark(),title:'Review each image before recording an observation',detail:'Agree is an agent action. It is not an authenticity score.',camera:[720,595,1.45]});await page.waitForTimeout(1500);await click('[data-act="agree"][data-arg$="|agree"]','Record second observation');await click('[data-act="close"]','Return to case');
  chapters.push({at:mark(),title:'An evidence status changes. The outcome stays open.',detail:'Fault and action are still unselected.',camera:[1210,795,1.7]});await page.waitForTimeout(3300);
 }else if(id==='parties'){
  chapters.push({at:mark(),title:'Keep the conversation. Change the context.',detail:'Customer, rider and restaurant remain in the same case.',camera:[720,450,.715]});await page.waitForTimeout(1200);
  await click('[data-act="view"][data-arg="rest"]','Inspect restaurant view');chapters.push({at:mark(),title:'Restaurant records have a place beside the chat',detail:'The record helps investigation. It does not choose fault.',camera:[710,340,1.5]});await page.waitForTimeout(2700);
  await click('[data-act="view"][data-arg="rider"]','Inspect rider view');chapters.push({at:mark(),title:'Inspect this delivery, not a predicted outcome',detail:'Trip events and rider checks remain available for review.',camera:[710,335,1.75]});await page.waitForTimeout(2800);
  chapters.push({at:mark(),title:'Return to the customer without leaving the case',detail:'The party investigation remains part of the same conversation.',camera:[710,430,1.02]});
  await click('[data-act="view"][data-arg="chat"]','Return to customer');await point('[data-act="holdask"]');chapters.push({at:mark(),title:'Hold belongs beside the conversation timer',detail:'A pause in the conversation is separate from a refund outcome.',camera:[875,75,1.7]});await page.waitForTimeout(1300);await click('[data-act="holdask"]','Put on hold');await click('[data-act="hold"][data-arg="Restaurant"]','Record who the agent is waiting on');
  chapters.push({at:mark(),title:'Record the wait without changing party history',detail:'This is an agent-only wait record, not a blame label.',camera:[875,75,1.7]});await page.waitForTimeout(2600);
 }else{
  chapters.push({at:mark(),title:'The agent chooses fault and outcome',detail:'Nothing is selected on the agent’s behalf.',camera:[1215,800,1.55]});await page.waitForTimeout(1500);
  await click('[data-act="fault"][data-arg="Restaurant"]','Choose fault');await click('[data-act="dec"][data-arg="full"]','Choose full refund');
  chapters.push({at:mark(),title:'The choice creates a draft, not a recommendation',detail:'The agent can inspect the explanation before sending.',camera:[715,838,1.2]});await page.waitForTimeout(2600);
  await click('[data-act="send"]','Send decision explanation');await idle();
  if(await page.evaluate(()=>cur().ann?.stage==='push')){await click('[data-act="send"]','Send final explanation');await idle()}
  chapters.push({at:mark(),title:'Explain the decision in the conversation',detail:'The customer replies are scripted in this concept.',camera:[710,575,1.02]});await page.waitForTimeout(2100);
  await click('[data-act="dd"][data-arg="reason"]','Choose a reason');await click('[data-act="ddpick"]','Record reason');
  chapters.push({at:mark(),title:'Keep the reason with the decision',detail:'The chosen action and its reason form a reviewable record.',camera:[1210,744,1.4]});await page.waitForTimeout(1800);await click('[data-act="confirm"]','Confirm decision');
  chapters.push({at:mark(),title:'Confirmation records the chosen action',detail:'This prototype does not execute payments. The reply field still needs more room.',camera:[1130,760,1.18]});await page.waitForTimeout(3000);
 }
 const duration=mark();await context.close();const video=await page.video().path();
 const raw=path.join(out,id+'-raw.mp4');const encoded=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-ss',String(lead),'-i',video,'-t',String(duration),'-vf','fps=30','-c:v','libx264','-threads','2','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',raw],{encoding:'utf8'});if(encoded.status)throw Error(encoded.stderr);
 fs.writeFileSync(path.join(out,id+'.json'),JSON.stringify({id,duration,chapters,events:events.filter(e=>e.at>=lead).map(e=>({...e,at:e.at-lead})),errors,method:'Continuous browser capture with real UI actions; explanatory camera and text added in editing'},null,2));
 if(errors.length)throw Error(errors.join('\n'));console.log(id,duration+'s',chapters.length+' chapters');
}
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const selected=process.argv.slice(2);const ids=selected.length?selected:['evidence','parties','decision'];
if(ids.some(id=>!['evidence','parties','decision'].includes(id)))throw Error('Choose evidence, parties or decision');
try{await Promise.all(ids.map(id=>capture(browser,id)))}finally{await browser.close()}
