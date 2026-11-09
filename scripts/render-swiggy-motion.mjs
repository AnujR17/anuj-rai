import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
const { chromium }=createRequire(import.meta.url)('playwright');
const out=path.resolve('public/portfolio/swiggy/motion');fs.mkdirSync(out,{recursive:true});
const base=process.env.SWIGGY_DIRECTOR_URL||'http://localhost:8767',fps=30;
function encode(args){const r=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y',...args],{encoding:'utf8'});if(r.status)throw Error(r.stderr)}
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
try{
 await Promise.all((process.env.SWIGGY_MOTION_IDS||'evidence,parties,decision').split(',').map(async id=>{
  const p=await browser.newPage({viewport:{width:1600,height:900}}),errors=[];p.on('pageerror',error=>errors.push(error.message));
  await p.goto(base+'/studio.html?id='+id);const spec=await p.evaluate(()=>window.directorReady);
  await p.evaluate(()=>window.seekDirector(0));await p.screenshot({path:path.join(out,id+'.png')});
  // Deterministic camera/text frames avoid wall-clock drift under rendering load.
  const encoder=spawn('ffmpeg',['-hide_banner','-loglevel','error','-y','-f','image2pipe','-vcodec','png','-framerate',String(fps),'-i','pipe:0','-c:v','libx264','-threads','2','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',path.join(out,id+'.mp4')]);
  let errorText='';encoder.stderr.on('data',data=>errorText+=data);const finished=once(encoder,'close');
  const frames=Math.ceil(spec.duration*fps);
  for(let frame=0;frame<frames;frame++){
   await p.evaluate(t=>window.seekDirector(t),frame/fps);const bytes=await p.screenshot({type:'png'});
   if(!encoder.stdin.write(bytes))await once(encoder.stdin,'drain');
  }
  encoder.stdin.end();const [code]=await finished;if(code)throw Error(errorText);
  await p.close();
  encode(['-i',path.join(out,id+'.mp4'),'-filter_complex','fps=12,scale=960:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=160[p];[b][p]paletteuse=dither=bayer:bayer_scale=3:diff_mode=rectangle','-threads','2','-loop','0',path.join(out,id+'.gif')]);
  fs.writeFileSync(path.join(out,id+'.json'),JSON.stringify({...spec,editing:'Continuous source recording; editorial camera and text rendered at deterministic 30 fps. Final state held for reading. Not a user-test recording.',renderedFrames:frames,renderedFps:fps,sourceSeekVerified:true,errors},null,2));
  if(errors.length)throw Error(errors.join('\n'));console.log(id+': '+frames+' camera/text frames, MP4 and GIF rendered');
 }));
}finally{await browser.close()}
