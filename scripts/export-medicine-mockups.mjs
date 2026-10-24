import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const {chromium}=createRequire(import.meta.url)('playwright');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../public/portfolio/screens');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:600,height:1300},deviceScaleFactor:2});for(const name of ['capture','review','routine','medicine','caregiver']){const image=fs.readFileSync(root+'/'+name+'.png').toString('base64');await p.setContent('<style>*{box-sizing:border-box}body{margin:40px;background:transparent}.device{width:420px;padding:9px;border:1px solid #939391;border-radius:46px;background:linear-gradient(110deg,#888 0%,#232323 8%,#111 55%,#777 100%);box-shadow:inset 0 0 0 2px #1c1c1c}.device img{display:block;width:100%;height:auto;border-radius:36px;background:#fafafa}</style><div class="device"><img src="data:image/png;base64,'+image+'"></div>');await p.locator('img').evaluate(i=>i.decode());await p.locator('.device').screenshot({path:root+'/'+name+'-mockup.png',omitBackground:true});console.log(name+' mockup exported')};await b.close()})().catch(e=>{console.error(e);process.exit(1)});
