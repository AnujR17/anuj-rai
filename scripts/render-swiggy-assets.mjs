import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const {chromium}=createRequire(import.meta.url)('playwright');
const root=path.resolve('public/portfolio/swiggy');
const image=file=>'data:image/png;base64,'+fs.readFileSync(file).toString('base64');
const font='data:font/ttf;base64,'+fs.readFileSync('/workspace/swiggy-motion-assets/dm-sans.ttf').toString('base64');
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
try{
 const page=await browser.newPage({viewport:{width:1600,height:900},deviceScaleFactor:1});
 const workspace=image(path.join(root,'media/wrong-item.png')),evidence=image(path.join(root,'evolution/evidence-clean.png'));
 await page.setContent(`<!doctype html><meta charset="utf-8"><style>@font-face{font-family:DM;src:url('${font}')}*{box-sizing:border-box}body{margin:0;width:1600px;height:900px;overflow:hidden;background:#1c1917;color:#f7f7f2;font-family:DM,sans-serif}.name{position:absolute;left:80px;top:75px;font-size:28px}.title{position:absolute;left:76px;top:158px;font-size:106px;line-height:.98;letter-spacing:-.055em}.workspace{position:absolute;left:500px;top:118px;width:1030px;height:auto;border-radius:8px;box-shadow:0 24px 80px #0006}.evidence{position:absolute;left:80px;top:453px;width:550px;height:382px;overflow:hidden;border-radius:13px;box-shadow:0 20px 65px #0005}.evidence img{position:absolute;width:1100px;height:auto;left:-275px;top:-153px}</style><div class="name">Swiggy</div><div class="title">Agent<br>Desk</div><img class="workspace" src="${workspace}" alt="Original Agent Desk workspace"><div class="evidence"><img src="${evidence}" alt="Original evidence viewer detail"></div>`);
 await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(root,'cover.png')});
 fs.copyFileSync(path.join(root,'cover.png'),'public/portfolio/banners/swiggy-agent-workflow.png');
 for(const [name,source,x,y,width,height]of[
  ['decision-v2','wireframe-2.png',1000,800,440,100],['decision-v3','wireframe-3.png',1000,800,440,100],
  ['policy-v1','wireframe-1.png',1000,44,440,670],['context-v3','wireframe-3.png',1000,44,440,560],
  ['evidence-detail','evidence-review.png',360,200,720,500],['rider-detail','rider-records.png',428,95,570,630],
  ['decision-detail','decision-record.png',1000,460,440,440],['star-detail','star-case.png',930,80,510,770]
 ]){
  await page.setViewportSize({width,height});await page.setContent(`<!doctype html><style>*{box-sizing:border-box}body{margin:0;width:${width}px;height:${height}px;overflow:hidden}img{position:absolute;left:${-x}px;top:${-y}px;width:1440px;height:auto;max-width:none}</style><img src="${image(path.join(root,'evolution',source))}">`);
  await page.screenshot({path:path.join(root,'evolution',name+'.png')});
 }
 console.log('Exported original-screen crops and 1600 × 900 Swiggy cover.');
}finally{await browser.close()}
