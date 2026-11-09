import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const { chromium } = createRequire(import.meta.url)('playwright');
const base=process.env.PORTFOLIO_URL||'http://localhost:3000';
const scratch=process.env.SWIGGY_DEVICE_EXPORT_DIR||'/workspace/swiggy-device-exports';
const fps=8;
const ids=process.argv.slice(2).length?process.argv.slice(2):['evidence','parties','decision'];
if(ids.some(id=>!['evidence','parties','decision'].includes(id)))throw Error('Choose evidence, parties or decision');
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
try {
 for(const id of ids){
  const dir=path.join(scratch,id);fs.mkdirSync(dir,{recursive:true});
  const page=await browser.newPage({viewport:{width:1600,height:1200},deviceScaleFactor:1,reducedMotion:'reduce'});
  await page.goto(base+'/work/swiggy-agent-workflow',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const root=page.locator('[data-device-motion="'+id+'"]');
  await root.scrollIntoViewIfNeeded();
  const duration=await root.locator('video').evaluate(async video=>{video.load();await new Promise((resolve,reject)=>{video.addEventListener('loadeddata',resolve,{once:true});video.addEventListener('error',reject,{once:true})});video.pause();return video.duration});
  const frames=Math.ceil(duration*fps);
  for(let i=0;i<frames;i++){
   await root.locator('video').evaluate(async(video,t)=>{const target=Math.min(t,video.duration-.04);if(Math.abs(video.currentTime-target)>.003)await new Promise(resolve=>{video.addEventListener('seeked',resolve,{once:true});video.currentTime=target});await new Promise(resolve=>requestAnimationFrame(resolve))},i/fps);
   await root.locator('[data-device-scene]').screenshot({path:path.join(dir,String(i).padStart(4,'0')+'.png'),animations:'disabled'});
  }
  const out='public/portfolio/swiggy/device/'+id+'-mockup.gif';
  execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate',String(fps),'-i',path.join(dir,'%04d.png'),'-vf','scale=1080:-1:flags=lanczos,split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=3','-loop','0',out]);
  fs.writeFileSync('public/portfolio/swiggy/device/'+id+'-mockup.json',JSON.stringify({id,source:id+'.mp4',method:'Deterministic video seeks inside the rendered CSS device mockup',fps,frames,duration,sourceUI:'Original fictional Agent Desk v7.1',device:'Editorial mockup, not a photograph of deployed hardware'},null,2)+'\n');
  console.log(id,frames+' frames',Math.round(fs.statSync(out).size/1024)+' KB');
  await page.close();
 }
} finally { await browser.close(); }
