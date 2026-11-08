import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const { chromium } = createRequire(import.meta.url)('playwright');
const output=process.env.SWIGGY_CAPTURE_DIR||'/workspace/swiggy-recordings-final';
const media=path.resolve('public/portfolio/swiggy/media');fs.mkdirSync(output,{recursive:true});fs.mkdirSync(media,{recursive:true});
// Adapted from the handoff walkthrough. Captures real UI actions; no state is seeded.
// Screenshots are edited into step-paced recordings, not recordings of task time.
const PLAN={
 S2:{name:'SW-2041',fault:'Restaurant',dec:'full'},
 S8:{name:'SW-2070',fault:'Restaurant',dec:'partial'},
 S3:{name:'SW-2063',fault:null,dec:'review'},
 S5:{name:'SW-2091',fault:'Customer',dec:'deny'},
 S9:{name:'SW-2078',fault:'Rider',dec:'partial',coupon:'50'}};
const COL=x=>x<56?'rail':x<428?'case':x<1000?'chat':'insights';
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});const out={};
const ONLY=process.argv[2];await Promise.all(Object.keys(PLAN).filter(K=>!ONLY||K===ONLY).map(async K=>{const P=PLAN[K];const dir=path.join(output,`shots-${K}`);fs.mkdirSync(dir,{recursive:true});
 const p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(process.env.SWIGGY_PROTOTYPE_URL||'http://localhost:3000/portfolio/swiggy/prototype/index.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
 await p.evaluate(()=>{const d=document.querySelector('.demo');if(d)d.style.display='none'});
 const log=[];let n=0;const looks=new Set();let lastCol=null,switches=0;
 const shot=async lab=>{n++;await p.screenshot({path:`${dir}/${String(n).padStart(2,'0')}-${lab.replace(/[^a-z0-9]+/gi,'-').slice(0,40)}.png`})};
 const st=()=>p.evaluate(()=>{const s=cur();return s?{sc:s.sc,len:s.beats.length,playing:!!s.playing,ag:!!s.agTyping,gate:atGate(s),next:nextAg(s)!=null,call:!!(s.beats[s.sc]&&s.beats[s.sc].call),wc:!!s.waitCall,ann:s.ann&&s.ann.stage,closed:s.closed,cw:s.closing&&s.closing.wait,closing:!!s.closing,stalk:!!s.stalk,rdone:!!s.rdone,restCall:!!s.restCall,calls:!!(s.calls.cust||s.calls.rest||s.calls.rider)}:null});
 const idle=async(ms=20000)=>{const t0=Date.now();while(Date.now()-t0<ms){const s=await st();if(s&&!s.playing&&!s.ag&&!s.stalk&&!(s.cw)&&!(s.ann==='wait'||s.ann==='pwait'))return;await p.waitForTimeout(250)}};
 const act=async(kind,sel,label,o={})=>{const el=p.locator(sel+':visible').first();if(!await el.count()){log.push({kind:'MISSING',label,sel});return false}
   await el.scrollIntoViewIfNeeded();const r=await el.boundingBox();if(!r)throw Error('No visible bounds for '+label);const col=COL(r.x+r.width/2);if(lastCol&&col!==lastCol)switches++;lastCol=col;
   try{if(kind==='click')await el.click({timeout:4000});else if(kind==='key'){await el.click();await p.keyboard.press(o.key||'Enter')}else if(kind==='type'){await el.click();await p.keyboard.type(o.text)}}catch{log.push({kind:'MISSING',label:label+' (not clickable)',sel});return false}
   log.push({kind,label,col,m:!!o.m,look:o.look||null,keys:kind==='type'?o.text.length:kind==='key'?1:0});if(o.look)looks.add(o.look);await p.waitForTimeout(300);await idle();await shot(label);return true};
 // 1 open ticket
 await p.evaluate(()=>{G.page='home';render()});await act('click',`[data-act="go"][data-arg="${K}"]`,'open ticket',{m:true});
 // 2 evidence
 const nPh=await p.evaluate(()=>cur().photos.length);
 if(nPh){await act('click','[data-act="evopen"]','open evidence',{look:'Customer evidence',m:true});
  for(let i=0;i<nPh;i++){const id=await p.evaluate(()=>{const s=cur();return (s.ov&&s.ov.t==='ev')?s.photos[s.ov.i].id:null});if(!id)break;
   await act('click',`[data-act="agree"][data-arg="${id}|agree"]`,'agree photo '+(i+1),{m:true});
   if(i<nPh-1)await act('click','[data-act="evgo"][data-arg="1"]','next photo')}
  await act('click','[data-act="close"]','close viewer')}
 // 3 conversation loop
 for(let guard=0;guard<30;guard++){const s=await st();if(!s)break;
  if(s.gate==='rest'){await act('click','[data-act="view"][data-arg="rest"]','restaurant tab',{look:'Restaurant tab',m:true});await act('click','#ta','start restaurant chat');{const t0=Date.now();while(Date.now()-t0<40000&&!(await st()).restCall)await p.waitForTimeout(300)}await idle();
    await act('click','[data-act="dd"][data-arg="soe"]','subject of error',{m:true});const o=await p.$('[data-act="ddpick"]');if(o){await act('click','[data-act="ddpick"]','pick SoE')}
    await act('click','[data-act="view"][data-arg="chat"]','back to customer');continue}
  if(s.gate==='rider'){await act('click','[data-act="view"][data-arg="rider"]','rider tab',{look:'Rider tab',m:true});await act('click','#ta','start rider chat');
    if(await p.$('[data-act="rsc"]'))await act('click','[data-act="rsc"]','pick rider question',{m:true});{const t0=Date.now();while(Date.now()-t0<40000&&!(await st()).rdone)await p.waitForTimeout(300)}await idle();
    await act('click','[data-act="dd"][data-arg="rsoe"]','rider subject of error',{m:true});if(await p.$('[data-act="ddpick"]'))await act('click','[data-act="ddpick"]','pick rider SoE');
    await act('click','[data-act="view"][data-arg="chat"]','back to customer');continue}
  if(s.call||s.wc){await act('click','[data-act="call"][data-arg="cust"]','call customer',{m:true});await p.waitForTimeout(2500);await act('click','.cb.end','end call');await idle();continue}
  if(s.next){await act('click','#ta','send scripted line');continue}
  break}
 // 4 decision
 await shot('before decision');
 if(P.fault)await act('click',`[data-act="fault"][data-arg="${P.fault}"]`,'pick fault',{m:true,look:'Decision'});
 await act('click',`[data-act="dec"][data-arg="${P.dec}"]`,'pick action',{m:true,look:'Decision'});
 if(P.coupon)await act('type','#cpnamt','coupon amount',{text:P.coupon,m:true});
 await act('click','[data-act="send"]','send decision message');await idle();
 if((await st()).ann==='push'){await act('click','[data-act="send"]','send final message');await idle()}
 await act('click','[data-act="dd"][data-arg="reason"]','reason dropdown',{m:true});await act('click','[data-act="ddpick"]','pick reason');
 await act('click','[data-act="confirm"]','confirm',{m:true});
 await act('click','[data-act="closeYes"]','close ticket');
 for(let g=0;g<20;g++){const s=await st();if(s.closed)break;if(s.cw){await p.waitForTimeout(500);continue}await act('click','[data-act="send"]','send closing message')}
 await shot('closed');
 const fin=await st();
 out[K]={name:P.name,steps:log.filter(x=>x.kind!=='MISSING').length,keys:log.reduce((a,x)=>a+x.keys,0),mental:log.filter(x=>x.m).length,looks:[...looks],switches,closed:fin.closed,missing:log.filter(x=>x.kind==='MISSING'),errs,log};
 console.log(K,P.name,'steps',out[K].steps,'mental',out[K].mental,'switches',switches,'closed',fin.closed,'missing',out[K].missing.length,errs.join('|')||'ok');
 await p.close();
 const frames=fs.readdirSync(dir).filter(name=>name.endsWith('.png')).sort();
 const concat=path.join(dir,'sequence.ffconcat');
 fs.writeFileSync(concat,frames.map(name=>`file '${path.join(dir,name)}'\nduration 0.85`).join('\n')+`\nfile '${path.join(dir,frames.at(-1))}'\nduration 2\nfile '${path.join(dir,frames.at(-1))}'\n`);
 const slug={S2:'wrong-item',S8:'missing-item',S3:'not-delivered',S5:'quality-complaint',S9:'late-delivery'}[K];
 function encode(args){const r=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y',...args],{encoding:'utf8'});if(r.status)throw Error(r.stderr)}
 encode(['-f','concat','-safe','0','-i',concat,'-vf','fps=10,scale=1200:-2','-c:v','libx264','-threads','2','-pix_fmt','yuv420p','-movflags','+faststart',path.join(media,slug+'.mp4')]);
 encode(['-i',path.join(media,slug+'.mp4'),'-filter_complex','fps=5,scale=960:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=160[p];[b][p]paletteuse=dither=sierra2_4a','-loop','0','-threads','2',path.join(media,slug+'.gif')]);
 fs.copyFileSync(path.join(dir,frames[0]),path.join(media,slug+'.png'));
 }));
const prev={};fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(Object.assign(prev,out),null,1));await b.close();if(Object.values(out).some(v=>!v.closed||v.missing.length||v.errs.length))process.exitCode=1;})().catch(error=>{console.error(error);process.exit(1)});
