/* Agent Desk v7.1 prototype · renderers. Geometry follows the Figma v7.1 library one-to-one (cap-top text positions, 1-px rules outside bands). */
const CAPH={10:7,10.5:8,11:8,12:9,13:9,14:10,16:12,18:13,24:17};
const KSZ={r10:10,sb10:10,m10:10,r105:10.5,caps:10.5,r11:11,m11:11,sb11:11,r12:12,m12:12,sb12:12,r13:13,m13:13,sb13:13,r14:14,m14:14,sb14:14,sb16:16,sb18:18,sb24:24};
const LH={r13:20,r13w:19,r12:16,r11:16,m13:16,sb13:18};
const cap=k=>CAPH[KSZ[k]||13];
const cy=(top,h,c)=>top+Math.ceil((h-c)/2);
const px=v=>Math.round(v*100)/100+'px';
const MEAS=document.createElement('canvas').getContext('2d');
function lines(text,font,width){MEAS.font=font;const words=String(text).split(' ');let n=1,cur='';for(const w of words){const t=cur?cur+' '+w:w;if(MEAS.measureText(t).width>width&&cur){n++;cur=w}else cur=t}return n}
function Ctx(ox,oy,w){return {ox:ox||0,oy:oy||0,w:w||1440}}
const C0=Ctx(0,0,1440);
const FILL={bubble:'--bubble',agentInk:'--agent',hover:'--hover',ph:'--ph'};
const col=k=>k?('var('+(FILL[k]||'--'+k)+')'):'';
const ICON_MIC_OFF=ICONS.mic.replace('</g></g></svg>','<path d="M4 4L20 20"/></g></g></svg>');
const svg=k=>k==='mic-off'?ICON_MIC_OFF:k==='select-chevron'?ICONS['chevron-down']:(ICONS[k]||'');
/* icon button: a 30 × 30, radius-8 hover box centred on the icon (rule: every clickable icon gets the same box) */
const IB=(c,x,y,sz,k,o)=>{o=o||{};const bx=x+sz/2-15,by=y+sz/2-15;return Rc(c,bx,by,30,30,{r:o.round?999:8,f:o.f,act:o.act,arg:o.arg,cls:'ibx'+(o.cls?' '+o.cls:'')+(o.f?' filled':''),title:o.title,inner:Ic(Ctx(bx,by,30),x,y,sz,k,o.col),disabled:o.disabled})};
/* custom dropdown field (opens a menu drawn by menus()) */
const DDS={};
function DD(c,id,x,y,w,o){o=o||{};DDS[id]={x,y,w,opts:o.opts,val:o.val,groups:o.groups,chg:o.chg,up:o.up,list:o.list};const open=G.dd===id;const dis=!!o.dis;return `<button class="sel dd${dis?' dis':''}${o.val?'':' ph'}${open?' open':''}" data-act="dd" data-arg="${id}" style="position:absolute;left:${px(x-c.ox)};top:${px(y-c.oy)};width:${w}px"${dis?' disabled':''}><span class="t r13" style="position:static">${esc(o.val||o.ph||'Select')}</span><span class="chev ic${open?' rot':''}">${svg('chevron-down')}</span></button>`}
const attrs=o=>(o.act?` data-act="${o.act}"${o.arg!=null?` data-arg="${esc(o.arg)}"`:''}`:'')+(o.title?` title="${esc(o.title)}"`:'')+(o.id?` id="${o.id}"`:'')+(o.attr||'');
/* cap-top text. x,y are cap-top-left (al R: right edge, al C: centre). k = style key, c = colour key. o: {al,w,trunc,lh,inner,runs,o,act,arg,title,cls,id} */
function Tx(c,x,y,s,k,cl,o){o=o||{};k=k||'r13';const f=KSZ[k.replace(/w$/,'')]||13;const inner=o.inner!=null?o.inner:esc(s);
 let st=`top:${px(y-c.oy)};`;
 if(o.al==='R')st+=`right:${px(c.w-(x-c.ox))};text-align:right;`;else if(o.al==='C')st+=`left:${px(x-c.ox)};transform:translateX(-50%);text-align:center;`;else st+=`left:${px(x-c.ox)};`;
 if(o.o!=null)st+=`opacity:${o.o};`;if(o.col)st+=`color:${o.col};`;
 const kk=k.replace(/w$/,'');
 if(o.w){const L=o.trunc?20:(o.lh||LH[k]||20);const top=(L-1.211*f)/2+0.242*f,bot=L-top-0.7275*f;st+=`width:${px(o.w)};line-height:${L}px;margin-top:${px(-top)};margin-bottom:${px(-bot)};`;if(o.al==='C')st=st.replace(/left:[^;]+;transform:translateX\(-50%\);text-align:center;/,`left:${px(x-c.ox-o.w/2)};text-align:center;`);else if(o.al==='R')st=st.replace(/right:[^;]+;text-align:right;/,`left:${px(x-c.ox-o.w)};text-align:right;`);
  if(o.trunc)st+='white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
  return `<${o.act?'button':'span'} class="tw ${kk} ${cl||'ink'} ${o.cls||''}" style="${st}"${attrs(o)}>${inner}</${o.act?'button':'span'}>`}
 return `<${o.act?'button':'span'} class="t ${kk} ${cl||'ink'} ${o.cls||''}" style="${st}"${attrs(o)}>${inner}</${o.act?'button':'span'}>`}
/* rectangle / box. o: {f,fo,s:[k,t],r,e,o,cls,act,arg,title,inner,id,attr} */
function Rc(c,x,y,w,h,o){o=o||{};let st=`left:${px(x-c.ox)};top:${px(y-c.oy)};width:${px(w)};height:${px(h)};`;
 if(o.f)st+=`background:${col(o.f)};`;if(o.fo!=null)st+=`opacity:${o.fo};`;
 if(o.s)st+=`box-shadow:inset 0 0 0 ${o.s[1]||1}px ${col(o.s[0])};`;
 if(o.r!=null)st+=`border-radius:${Array.isArray(o.r)?o.r.map(v=>v+'px').join(' '):o.r+'px'};`;
 if(o.e==='xs')st+=`box-shadow:${o.s?`inset 0 0 0 ${o.s[1]||1}px ${col(o.s[0])},`:''}var(--sh-xs);`;else if(o.e==='modal')st+=`box-shadow:${o.s?`inset 0 0 0 1px ${col(o.s[0])},`:''}var(--sh-modal);`;else if(o.e==='ring2')st+=`box-shadow:0 0 0 2px #fff;`;else if(o.e==='ring2xs')st+='box-shadow:0 0 0 2px #fff,var(--sh-xs);';
 if(o.o!=null)st+=`opacity:${o.o};`;if(o.st)st+=o.st;
 const tag=o.tag||(o.act?'button':'div');return `<${tag} class="rc ${o.cls||''}" style="${st}"${attrs(o)}${o.disabled?' disabled':''}>${o.inner||''}</${tag}>`}
const Hr=(c,x,y,w,k,o)=>Rc(c,x,y,w,1,Object.assign({f:k||'lineS',cls:'rule'},o||{}));
function Ic(c,x,y,s,k,cl,o){o=o||{};return `<span class="ic ${o.cls||''}" style="left:${px(x-c.ox)};top:${px(y-c.oy)};width:${s}px;height:${s}px;${cl?`color:${col(cl)};`:''}${o.o!=null?`opacity:${o.o};`:''}"${attrs(o)}>${svg(k)}</span>`}
/* status dot 22 px */
/* status dot: ring 0.875px; no white halo when stacked.
   Inner marks: tick and cross are drawn lines at GLYPH_W = the stroke weight of the "?" (Inter SemiBold 11px, about 1.25px); unknown = "?", not applicable = "!" (typed, same weight). */
const DOT_W=1.5*14/24, GLYPH_W=1.25;
const dotMark=(d,cl)=>`<svg class="ic" viewBox="0 0 22 22" style="left:0;top:0;width:22px;height:22px;color:${col(cl)}"><path d="${d}" fill="none" stroke="currentColor" stroke-width="${GLYPH_W}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const DOT_PATH={met:'M6.92 11.58L9.25 13.92L15.08 8.08',notmet:'M15.08 6.92L6.92 15.08M15.08 15.08L6.92 6.92',na:'M7 11H15'};
function Dot(c,x,y,kind,o){o=o||{};const k=kind==='no'?'notmet':kind==='unk'?'unknown':kind;
 const map={met:['okS','ok'],notmet:['dangerS','danger'],unknown:['warnS','warn'],na:['surface','ink3']}[k]||['surface','ink3'];
 const inner=(k==='met'||k==='notmet')?dotMark(DOT_PATH[k],map[1]):Tx(Ctx(0,0,22),11,cy(0,22,8),k==='unknown'?'?':'!','sb11',map[1],{al:'C'});
 return Rc(c,x,y,22,22,{f:map[0],r:999,s:[map[1],DOT_W],e:'xs',cls:'sdot '+k+(o.ring?' ring':''),inner,title:o.title,act:o.act,arg:o.arg})}
const dotsRow=(c,right,y,kinds)=>{let h='';let rx=right-22;for(let i=kinds.length-1;i>=0;i--){h+=Dot(c,rx,y,kinds[i],{ring:true});rx-=12}return h};
/* chips / buttons laid out by CSS (auto width) */
const chip=(label,o)=>{o=o||{};return `<button class="chip ${o.cls||''}${o.on?' on':''}${o.fill?' fill':''}${o.outl?' outl':''}" style="${o.st||''}"${attrs(o)}${o.dis?' disabled':''}>${esc(label)}</button>`};
const tabsRow=(c,x,y,labels,active,act,extra)=>`<div class="tabs" style="position:absolute;left:${px(x-c.ox)};top:${px(y-c.oy)}">${labels.map((l,i)=>`<button class="tab${i===active?' on':''}" data-act="${act}" data-arg="${esc(l.v!=null?l.v:i)}">${esc(l.t||l)}${extra&&extra[i]?extra[i]:''}</button>`).join('')}</div>`;
const keycap=(k,dark)=>`<span class="kc${dark?' dark':''}">${esc(k)}</span>`;
const base=t=>t+25;
/* section header: t = content top; returns html. o:{count,chev,dots,cr,act,arg,open,icon,title}*/
function secHead(c,x,t,w,icon,title,o){o=o||{};const cr=o.cr||(x+w-16);let h='';
 if(o.act)h+=Rc(c,x,t,w,41,{act:o.act,arg:o.arg,cls:'hit',title:o.title});
 if(icon)h+=Ic(c,x+16,t+13,15,icon);
 h+=Tx(c,icon?x+39:x+16,t+16,title,'sb13','ink',{inner:esc(title)+(o.count?`<span class="m13 ink3" style="margin-left:6px">${esc(o.count)}</span>`:'')});
 let chevX=null;if(o.chev){chevX=cr-10-14;h+=Ic(c,chevX,t+14,14,'chevron-down','ink',{cls:o.open?'rot':''})}
 if(o.dots&&o.dots.length)h+=dotsRow(c,chevX!=null?chevX-10:cr-10,t+10,o.dots);
 return h}
function tableHead(c,x,w,capY,cols,caps){const top=capY-8;let h=Hr(c,x,top+24,w,'lineS');for(let i=0;i<cols.length;i++)h+=Tx(c,cols[i],capY,caps[i],'caps','ink3');return {h,rule:top+24}}
const avatarOf=s=>({cust:{ini:ini(s.cust.name),name:s.cust.name,tint:'violetS',ink:'violet'},rider:{ini:ini(s.rec.rider.name),name:s.rec.rider.name,tint:'infoS',ink:'info',rating:rating(s,'rider')},rest:{ini:ini(s.restaurant),name:s.restaurant,tint:'warnS',ink:'warn',rating:rating(s,'rest')}});
const TOP=52,HDR=96;

/* ================= top bar ================= */
function topbar(){const c=C0;let h=Rc(c,0,0,1440,50,{f:'surface'})+Rc(c,0,50,1440,2,{f:'line'});
 if(G.page==='home')h+=`<img src="photos/brand-mark.png" alt="Swiggy" title="Agent workspace" style="position:absolute;left:14px;top:12px;width:27px;height:27px;border-radius:8px;display:block">`; /* owner-supplied black-and-white Swiggy mark, clipped to the radius-8 tile */else h+=IB(c,16,16,18,'home',{act:'home',title:'My Workspace'});
 h+=Rc(c,72,12,27,27,{f:'violetS',r:999,inner:Tx(Ctx(72,12,27),85.5,cy(12,27,9),'RS','sb12','violet',{al:'C'})});
 h+=Rc(c,91,31,9,9,{f:away?'ink3':'live',r:999,e:'ring2',title:away?'Away':'Online'});
 h+=Rc(c,66,6,89,38,{r:8,act:'away',cls:'hit',title:away?'Status: Away · click to go online':'Status: Online · click to set Away'});
 h+=Tx(c,107,21,'Riya S.','m13','ink'); /* no chevron: the name area toggles Online / Away */
 const q=G.q||'';
 h+=`<div class="search" style="position:absolute;left:1071px;top:10px">${Ic(Ctx(1071,10,280),1081,19,13,'search','ink3')}<input id="hq" type="text" placeholder="Search orders, customers" value="${esc(q)}" autocomplete="off" spellcheck="false"><span class="keys" style="position:absolute;right:6px;top:5px">${keycap('⌘')}${keycap('K')}</span></div>`;
 h+=IB(c,1368,18,15,'book',{act:'ov',arg:'book',title:'Policy handbook'});
 h+=IB(c,1401,18,15,'gear',{act:'settings',title:'Settings',cls:G.setOpen?'on':''});
 return h}
/* ================= sidebar ================= */
function sidebar(){const c=C0;const L=queueList().filter(k=>!S[k].closed);const n=L.length; /* closed cases leave the side panel; they return on Reopen */
 if(G.page==='home')return '';
 let h=Rc(c,0,TOP,54,848,{f:'surface'})+Rc(c,54,TOP,2,848,{f:'line'})+Hr(c,0,HDR,54,'line');
 h+=Ic(c,16,TOP+16,18,'chats');
 h+=Rc(c,29,TOP+7,17,17,{f:'act',r:999,e:'ring2',inner:Tx(Ctx(29,TOP+7,17),37.5,cy(TOP+7,17,7),String(n),'sb10','onAct',{al:'C'})});
 for(let i=0;i<L.length;i++){const k=L[i],s=S[k];const y0=TOP+72+65*i;const act=k===A&&G.page!=='home';
  h+=Rc(c,4,y0-8,48,48,{r:12,act:'go',arg:k,cls:'hit qpill'+(act?' act':''),title:s.no+' · '+s.subject+(s.closed?' · closed':s.held?' · held':'')});
  h+=Tx(c,28,y0,s.code,'sb12',act?'ink':'ink3',{al:'C',cls:s.closed?'strike':''});
  h+=Tx(c,28,y0+17,wait(k),act?'sb10':'r10',act?'ink':'ink3',{al:'C',attr:` data-wait="${k}"`});
  if(act)h+=Rc(c,14,y0+30,28,2,{f:isPrio(s)?'rec':'ink'});
  else if(isPrio(s))h+=Rc(c,22,y0+30,12,2,{f:'rec'});
  if(s.qUnread&&!act&&!s.closed)h+=Rc(c,33,y0-5,8,8,{f:'focus',r:999,e:'ring2'});else if(s.held)h+=Rc(c,33,y0-5,8,8,{f:'hold',r:999,e:'ring2'})}
 const SH=shelfList();
 h+=Hr(c,0,850,54,'line')+Rc(c,0,851,54,49,{act:'shelf',cls:'hit',title:'Shelf · '+SH.length,inner:Ic(Ctx(0,851,54),13,868,16,'shelf')+Rc(Ctx(0,851,54),25,862,17,17,{f:'act',r:999,inner:Tx(Ctx(25,862,17),33.5,cy(862,17,7),String(SH.length),'m10','onAct',{al:'C'})})});
 return h}
/* ================= left column ================= */
function partyRows(s,k,all){const C=recSum[k](s);const cap=r=>all?r:r.slice(0,5);const full=(real)=>genRows(s,k,real);
 if(k==='cust'){const rows=cap(withDur(full(s.rec.cust.rows.concat(s.rec.cust.older||[]))));return {rows:rows.map(x=>[x.dur,x.row[1],UP(x.row[3])]),total:[C.raised+' complaint'+(C.raised===1?'':'s'),C.up+' refunded']}}
 if(k==='rider'){const rows=cap(withDur(full(s.rec.rider.rows.concat(s.rec.rider.older||[]))));return {rows:rows.map(x=>[x.dur,x.row[1],UP(x.row[2])]),total:[C.raised+' complaint'+(C.raised===1?'':'s'),C.up+' liable']}}
 const rows=cap(withDur(full(s.rec.rest.rows.concat(s.rec.rest.older.filter(r=>dayN(r[0])!=null)))));return {rows:rows.map(x=>[x.dur,x.row[1],UP(x.row[2])]),total:[C.raised+' complaints',C.up+' upheld']}}
function recordsTable(c,x,w,capY,rows){const cols=[x+10,x+Math.round(w*0.381),x+Math.round(w*0.7265)];const th=tableHead(c,x,w,capY,cols,['DURATION','COMPLAINT','FINDING']);let h=th.h;const rule=th.rule;let lastBase=rule+13+9;
 for(let i=0;i<rows.length;i++){const [d,cm,up]=rows[i];const yy=rule+13+22*i;h+=Rc(c,c.ox===0&&c.w===720?0:x-16,yy-7,c.ox===0&&c.w===720?720:w+32,22,{cls:'rowhit'})+Tx(c,cols[0],yy,d,'r12')+Tx(c,cols[1],yy,cm,'r12')+Rc(c,cols[2],yy-3,15,15,up===1?{f:'act',r:999}:up===0.5?{r:999,s:['act',1],st:'background:linear-gradient(90deg,var(--act) 50%,transparent 50%)'}:{s:['lineS',1],r:999});lastBase=yy+9}
 if(!rows.length){h+=Tx(c,cols[0],rule+13,'Nothing within 90 days','r12','ink3');lastBase=rule+13+9}
 return {h,rule,lastBase,cols}}
function totalRow(c,x,w,cols,r,total){let h=Hr(c,x,r,w,'lineS');const capY=r+1+12;h+=Tx(c,cols[0],capY,'Total','sb12')+Tx(c,cols[1],capY,total[0],'sb12')+Tx(c,cols[2],capY,total[1],'sb12');return {h,bottom:capY+9+12}}
function leftBody(s){const W=370,c=Ctx(0,0,W);let h='';const R=354;
 let t=0;h+=secHead(c,0,t,W,'receipt','Order details');
 let y=base(t)+26;
 const payV=s.showTxn?s.txn:s.pay;
 const rows=[['ID',s.order,'sb13'],['Date & time',s.date+', '+s.placed],['Restaurant',s.restaurant],['Payment',payV,'r13',1],['Complaint',s.complaint]];
 rows.forEach((r,i)=>{const yy=y+22*i;
  if(r[3])h+=Tx(c,16,yy,r[0],'r13','ink3',{inner:esc(r[0])+`<span class="ic i13" style="position:relative;display:inline-block;vertical-align:top;margin:-2px 0 0 8px;color:${s.showTxn?'var(--ink)':'var(--ink3)'}">${svg('eye')}</span>`,act:'txn',title:s.showTxn?'Hide transaction ID':'Show transaction ID (logged)'});
  else h+=Tx(c,16,yy,r[0],'r13','ink3');
  h+=Tx(c,R,yy,r[1],r[2]||'r13','ink',{al:'R'})});
 y+=22*4+40;
 s.items.forEach((it,i)=>{const yy=y+22*i;const b=it.aff;h+=Tx(c,16,yy,it.q+' × '+it.n,b?'sb13':'r13',b?'ink':'ink3',{w:260,trunc:1,lh:9})+Tx(c,R,yy,rs(it.p),b?'sb13':'r13',b?'ink':'ink3',{al:'R'})});
 y+=22*(s.items.length-1)+37;
 const it=itemsTotal(s);const chg=[['Item total',it],['GST 5%',gst(it)],['Delivery fee',s.fees.del],['Packaging',s.fees.pack]].concat(s.tip?[['Tip to rider',s.tip]]:[]);
 h+=Rc(c,0,y-12,W,33,{act:'tog',arg:'chg',cls:'hit',title:'Charges and tip'})+Tx(c,16,y,'Charges and tip','m12','ink3')+Ic(c,330,y-3,14,'chevron-down','ink',{cls:s.open.chg?'rot':''});
 if(s.open.chg){let yy=y+26;chg.forEach((r,i)=>{h+=Tx(c,16,yy+22*i,r[0],'r12','ink3')+Tx(c,R,yy+22*i,rs(r[1]),'r12','ink2',{al:'R'})});y=yy+22*(chg.length-1)}
 y+=37;h+=Tx(c,16,y,'Paid','m14')+Tx(c,R,y,rs(paid(s)),'r14','ink',{al:'R'});
 let r=y+10+16;h+=Hr(c,0,r,W);t=r+1;
 /* Timeline */
 h+=secHead(c,0,t,W,'activity','Order timeline',{cr:R,chev:true,act:'tog',arg:'tl',open:s.open.tl});
 if(s.open.tl){let yy=base(t)+26;const tl=s.tl.concat([['Complaint',s.complaint,1]]);tl.forEach((e,i)=>{h+=Tx(c,16,yy+22*i,e[0],e[2]?'sb13':'r13',e[2]?'ink':'ink3')+Tx(c,R,yy+22*i,e[1],e[2]?'sb13':'r13','ink',{al:'R'})});r=yy+22*(tl.length-1)+9+16}else r=t+41;
 h+=Hr(c,0,r,W);t=r+1;
 /* Evidence */
 const ph=s.photos;const dots=ph.map(p=>s.agree[p.id]==='agree'?'met':s.agree[p.id]==='disagree'?'notmet':'na');
 if(!ph.length)h+=Rc(c,0,t,W,41,{f:'sunken',cls:'evdis',title:'No customer photo for this case'});
 h+=secHead(c,0,t,W,'image-outline','Customer evidence',{cr:R,dots,count:ph.length?'('+ph.length+')':'',act:ph.length?'evopen':null,title:ph.length?'Open the customer photos':'No customer photo for this case'});if(!ph.length)h=h.replace(/(<span class="t sb13 )ink( [^"]*"[^>]*>Evidence)/,'$1ink3$2');
 if(false){let yy=base(t)+26;if(!ph.length){h+=Tx(c,16,yy,'No customer photo for this case','r13','ink3');r=yy+9+16}
  else{ph.forEach((p,i)=>{const y0=yy+92*i;const src=(PHOTO_SRC[s.key]||{})[p.id];h+=Rc(c,16,y0-4,120,72,{r:8,f:'sunken',act:'ev',arg:i,cls:'thumb',title:'Open photo '+(i+1),inner:src?`<img src="${src.replace('.jpg','-thumb.jpg')}" alt="">`:''});
   h+=Tx(c,148,y0,p.label,'sb13','ink',{w:200,trunc:1,lh:9})+Tx(c,148,y0+22,'Sent '+p.at+' · '+p.src+' · via '+(p.via==='bot'?'bot':'chat'),'r12','ink3')+Tx(c,148,y0+44,s.agree[p.id]==='agree'?'Agreed':s.agree[p.id]==='disagree'?'Disagreed':'Not reviewed','m12',s.agree[p.id]==='agree'?'ok':s.agree[p.id]==='disagree'?'danger':'ink3')});r=yy+92*(ph.length-1)+68+16}}
 else r=t+41;
 h+=Hr(c,0,r,W);t=r+1;
 /* Interaction history (was Party records) */
 h+=secHead(c,0,t,W,'users','Interaction history',{cr:R,chev:true,act:'tog',arg:'pr',open:!s.open.prClosed});
 if(!s.open.prClosed){let yy=base(t)+26;
  const P=[['cust','Customer',s.cust.name,(x=>[['Raised: ',x.raised],'Refunded: '+x.up,'Orders: '+x.tot.toLocaleString('en-IN')])(recSum.cust(s))],
   ['rider','Rider',s.rec.rider.name+' · '+s.rec.rider.id,(x=>[['Liable: ',x.up],'Complaints: '+x.raised,'Deliveries: '+x.tot.toLocaleString('en-IN')])(recSum.rider(s))],
   ['rest','Restaurant',s.restaurant,(x=>[['Upheld: ',x.up],'Complaints: '+x.raised,'Orders: '+x.tot.toLocaleString('en-IN')])(recSum.rest(s))]];
  for(const [k,nm,sub,st] of P){const open=s.pc[k];
   h+=Rc(c,0,yy-12,W,48,{act:'pc',arg:k,cls:'hit',title:nm+' · '+sub});
   h+=Tx(c,16,yy,nm,'sb13')+Ic(c,330,yy-3,14,'chevron-down','ink',{cls:open?'rot':''});
   h+=Tx(c,16,yy+17,'','r12','ink2',{inner:st.map((x,i)=>`<span style="margin-right:16px">${Array.isArray(x)?esc(x[0])+'<b class="sb12 ink">'+esc(x[1])+'</b>':esc(x)}</span>`).join('')});
   let yn=yy+60;
   if(open){const d=partyRows(s,k);const rt=recordsTable(c,16,339,yy+17+9+16+8,d.rows);h+=rt.h;const tr=totalRow(c,16,339,rt.cols,rt.lastBase+13,d.total);h+=tr.h;
    h+=`<button class="btn sec" style="position:absolute;left:16px;top:${px(tr.bottom+16)}" data-act="ov" data-arg="rec:${k}">View more</button>`;yn=tr.bottom+16+31+34}
   yy=yn}
  r=yy-60+17+9+16}
 else r=t+41;
 return {h,height:r+1}}
function leftColumn(s){const c=C0;let h=Rc(c,56,TOP,370,848,{f:'surface'})+Rc(c,426,TOP,2,848,{f:'line'});
 h+=Rc(c,56,TOP,370,44,{f:'surface'})+Tx(c,72,69,s.subject,'sb14')+Hr(c,56,HDR,370,'line');
 const b=leftBody(s);h+=`<div class="scroll" id="leftScroll" style="position:absolute;left:56px;top:97px;width:370px;height:803px"><div style="position:relative;height:${b.height}px">${b.h}</div></div>`;return h}

/* ================= chat column ================= */
/* Dock spacing standard (rider / restaurant Chat and Transcription): first item 16 from the top rule; system line to system line 12;
   system line to message / transcript 16; message / transcript to system line 20; messages 4 (same sender) or 8. System lines are cap-trimmed. */
const DK={first:16,ss:12,sc:16,cs:20};
function bubblesHTML(s,msgs,o){o=o||{};let h='';let prev=null;const fn=o.fn||first(s.cust.name);
 const sysMt=()=>o.std?(prev==null?DK.first-8:prev==='sys'?DK.ss:DK.cs):(prev==null?20:prev==='sys'?12:20);
 msgs.forEach((m,i)=>{
  if(m.w==='sys'){const t=/^Riya joined/.test(m.t)?'You joined':m.t+(m.at?' · '+m.at:'');h+=`<div class="sysl" style="margin-top:${sysMt()}px">${Tx(Ctx(0,0,0),0,0,t,'r11','ink3',{cls:'sysln'})}</div>`;prev='sys';return}
  const mt=prev==null?(o.std?DK.first-8:0):prev==='sys'?(o.std?DK.sc:26):prev==='card'?8:(prev===m.w?4:8);
  if(m.w==='call'){if(o.onWhite||!m.lines){h+=`<div class="sysl" style="margin-top:${sysMt()}px">${Tx(Ctx(0,0,0),0,0,'Call with '+(m.who||'customer')+' · '+m.dur+' · '+m.at,'r11','ink3',{cls:'sysln'})}</div>`;prev='sys';return}
   const open=!!(s.callOpen||{})[i];h+=`<div class="tcard${open?' open':''}" style="margin-top:${prev==null?8:8}px"><button class="th" data-act="callopen" data-arg="${i}" title="Call with ${esc(m.who||'customer')} · ${esc(m.dur)} · ${esc(m.at)}"><span class="t m13" style="position:static">Transcription</span><span class="ic">${svg('chevron-down')}</span></button>${open?`<div class="trule"></div><div class="trans">${m.lines.map(l=>`<div class="ln"><span class="sp t sb12 ${l[0]==='Agent'?'agent':'ink'}" style="position:static">${esc(l[0])}</span><span class="tx">${esc(l[1])}</span></div>`).join('')}</div>`:''}</div>`;prev='card';return}
  const ag=m.w==='ag';
  if(m.photo){const k=s.photos.findIndex(p=>p.id===m.photo),p=s.photos[k];const src=(PHOTO_SRC[s.key]||{})[m.photo];
   h+=`<div class="bub photo ${ag?'ag':'cu'}${o.onWhite?' onwhite':''}" style="margin-top:${mt}px"><span class="phw" data-act="ev" data-arg="${k}"><img src="${src?src.replace('.jpg','-thumb.jpg'):''}" alt="${esc(p?p.label:'photo')}"><span class="phl">Click to View Evidence</span></span>${s.agree[m.photo]==='agree'?'<span class="cap t m10 ok" style="left:10px;bottom:7px;position:absolute">Agreed</span>':s.agree[m.photo]==='disagree'?'<span class="cap t m10 danger" style="left:10px;bottom:7px;position:absolute">Disagreed</span>':''}<span class="cap t r105 ink3" style="right:10px;bottom:7px;position:absolute">${esc(m.at)}</span></div>`;prev=m.w;return}
  h+=`<div class="bub ${ag?'ag':'cu'}${o.onWhite?' onwhite':''}" style="margin-top:${mt}px"><span class="tx">${esc(m.t)}</span><span class="at">${esc(m.at)}</span></div>`;prev=m.w});
 return h}
function chatHeader(s){const c=C0;let h=Rc(c,428,TOP,570,44,{f:'surface'})+Hr(c,428,HDR,570,'line');
 const v={chat:0,rider:1,rest:2}[s.view];
 h+=tabsRow(c,440,TOP+7,[{t:'Customer',v:'chat'},{t:'Rider',v:'rider'},{t:'Restaurant',v:'rest'}],v,'view',[s.view!=='chat'&&s.unread?'<span class="ub"></span>':'',null,null]);
 const el=elapsed(s),warn=el>=STD_SECS&&!s.closed;
 h+=`<div class="timer" style="position:absolute;right:${1440-922}px;top:${TOP+8}px" title="${s.closed?'Ticket closed · total time on this chat':s.held?'On hold · waiting on '+esc(s.held.by)+' · timer paused':'Time on this chat · turns amber after 5 min'}"><span class="ic" style="position:static;width:15px;height:15px;color:${warn?'var(--warn)':'var(--ink3)'}">${svg('timer')}</span><span class="t sb12 ${warn?'warn':'ink'}" style="position:static" data-clock="1">${mmss(el)}</span></div>`;
 h+=IB(c,934,TOP+15,14,s.held?'pause-fill':'pause',{act:s.held?'resume':'holdask',title:s.held?'Held · waiting on '+s.held.by+' since '+s.held.at+' · click to resume':'Put on hold',col:s.held?'onAct':null,f:s.held?'hold':null});
 const fg=curFlag(s),who=tgtOf(s),whoN={cust:'customer',rider:'rider',rest:'restaurant'}[who];
 h+=IB(c,969,TOP+15,14,fg?'flag-fill':'flag',{act:'ov',arg:'flag',title:fg?'Reported: '+fg.why+' · click to remove':'Report '+whoN+' conduct',col:fg?'onAct':null,f:fg?'danger':null});
 return h}
function nameBar(c,p,t){let h=Rc(c,428,t,570,52,{f:'surface'})+Hr(c,428,t+52,570,'lineS');
 h+=Rc(c,444,t+12,28,28,{f:p.tint,r:999,inner:Tx(Ctx(444,t+12,28),458,cy(t+12,28,8),p.ini,'sb11',p.ink,{al:'C'})})+Tx(c,482,cy(t,52,10),p.name,'sb14');
 if(p.rating!=null)h+=Tx(c,983,cy(t,52,10)+1,p.rating.toFixed(1),'sb12',ratingCol(p.rating),{al:'R',inner:`<span class="ic" style="position:relative;display:inline-block;width:14px;height:14px;vertical-align:top;margin:-3px 4px 0 0;color:inherit">${svg('star-fill')}</span>${p.rating.toFixed(1)}`,title:'Average rating '+p.rating.toFixed(1)+' of 5 · green ≥ 4.0, amber 3.0–3.9, red < 3.0 (Hypothetical bands)'});
 return h}
function aiSummary(c,s,t){const titleCap=t+16;const rows=[['Customer said',s.bot.said],['Bot offered',s.bot.offered]];const r=titleCap+9+26+22+9+16;
 let h=Rc(c,428,t,570,r-t,{f:'surface'})+Rc(c,428,r,570,2,{f:'lineS'});
 h+=Ic(c,444,t+13,15,'sparkle')+Tx(c,467,titleCap,'AI Summary','sb13');
 const botMin=Math.max(1,T(s.bot.at)-T(s.complaint)),botImgs=s.photos.filter(p=>p.via==='bot').length;
 h+=Tx(c,983,titleCap+1,'','m11','ink3',{al:'R',inner:`<span style="display:inline-flex;gap:20px"><span title="Bot conversation length"><span class="ic i13" style="position:relative;display:inline-block;vertical-align:top;margin:-2px 4px 0 0">${svg('clock')}</span>${botMin} min</span><span title="Images the customer sent to the bot"><span class="ic i13" style="position:relative;display:inline-block;vertical-align:top;margin:-2px 4px 0 0">${svg('image')}</span>${botImgs}</span></span>`});
 const y=titleCap+9+26;rows.forEach((x,i)=>{h+=Tx(c,444,y+22*i,x[0],'r13','ink3')+Tx(c,566,y+22*i,x[1],'r13','ink',{w:417,trunc:1})});
 return {h,bottom:r+2}}
function replyPanel(c,s,top,o){o=o||{};let h=Hr(c,428,top,570,'line')+Rc(c,428,top+1,570,900-top-1,{f:'surface'});let y=top+1+13;
 if(o.closing){const L=s.closing.list,A1=L.filter(x=>typeof x==='string').length,done=L.slice(0,s.closing.i).filter(x=>typeof x==='string').length;
  h+=Rc(c,444,y,539,37,{f:'head',s:['lineS',1],r:8})+Tx(c,457,cy(y,37,9),s.closing.wait?first(s.cust.name)+' is replying…':'Closing message '+(done+1)+' of '+A1,'sb12');
  for(let i=0;i<A1;i++){const dx=444+539-13-14-17*(A1-1-i);h+=Rc(c,dx,y+16,14,5,{f:i<done?'act':i===done?'focus':'lineS',r:2})}
  y+=37+8}
 const tgt=tgtOf(s),ac=activeCall(s);const fn=first(s.cust.name);const g=tgt==='cust'?atGate(s):null;
 const ph=s.closed?'Ticket closed · Reopen the case to chat':tgt==='rider'?(s.rsel||!(RSCRIPT[s.key]||[]).length?'Message the rider…':'Click to start the chat with the rider, or type your own…')
  :tgt==='rest'?(s.restCall||s.stalk?'Message the restaurant…':'Click to start the chat with the restaurant, or call…')
  :s.closing?(s.closing.wait?fn+' is replying…':'Press Enter or Send to send this closing message')
  :g?`Check with the ${g==='rest'?'restaurant':'rider'} first (Rider / Restaurant tab), or type a reply`
  :nextAg(s)?'Click to send the next line, or type your own…':'Type a reply…';
 h+=`<div class="rbar${tgt!=='cust'?' rider':''}${s.closed?' off':''}" style="position:absolute;left:444px;top:${px(top+1+13+(o.closing?45:0))}">`;
 if(tgt==='cust')h+=`<button class="ib" style="left:5px" data-act="menu" data-arg="tpl" title="Question templates"${s.closed?' disabled':''}>${svg('query')}</button><button class="ib" style="left:40px" data-act="call" data-arg="cust" title="Call customer"${ac||s.closed?' disabled':''}>${svg('phone')}</button>`;
 else h+=`<button class="ib" style="left:6px" data-act="call" data-arg="${tgt}" title="Call ${tgt==='rider'?'rider':'restaurant'}"${ac||s.closed?' disabled':''}>${svg('phone')}</button>`;
 h+=`<input id="ta" type="text" placeholder="${esc(ph)}" value="${s.closed?'':esc(draftOf(s))}" autocomplete="off" spellcheck="false"${s.closed?' disabled':''}><button class="send" data-act="send" title="Send"${s.closed?' disabled':''}>${svg('send')}</button></div>`;
 return h}
function callBar(c,s,w,r){const cc=s.calls[w]||(s.callGhost&&s.callGhost.c)||(w==='ghost'?{vol:3,ghost:true,endedAt:s.lastCallDur}:{vol:3});let h=Hr(c,428,r,570,'lineS')+Rc(c,428,r+1,570,900-r-1,{f:'surface'});const t=r+1,H=900-r-1;h=`<div class="cbar${cc.ghost?' ghost':''}" style="position:absolute;left:0;top:0;width:1440px;height:900px;pointer-events:none">`+h;
 h+=Tx(c,444,cy(t,H,12),cc.start!=null?callT(cc):(cc.endedAt||'0:00'),'sb16','ink',{attr:cc.start!=null?` data-call="${w}"`:''})+Rc(c,496,cy(t,H,8),8,8,{f:'rec',r:999,cls:'recdot'})+Tx(c,510,cy(t,H,8),'REC','sb11','danger');
 const bx=428+570-16-132,by=cy(t,H,30);const B=[[cc.mute?'mic-fill':'mic',16,'cmute',cc.mute?'Unmute':'Mute',cc.mute],[cc.hold?'pause-fill':'pause',16,'chold',cc.hold?'Resume call':'Hold call',cc.hold],[cc.spk?'volume-fill':'volume',16,'cspk',cc.spk?'Speaker on · click for ear-piece':'Speaker · play the call on this computer',cc.spk],['phone-end',17,'call','End call',false]];
 B.forEach(([ic,sz,act,title,on],i)=>{h+=Rc(c,bx+34*i,by,30,30,{r:8,act,arg:act==='call'?w:null,cls:'cb'+(on?' on':'')+(act==='call'?' end':''),title,inner:Ic(Ctx(bx+34*i,by,30),bx+34*i+(30-sz)/2,by+(30-sz)/2,sz,ic,null,{cls:'i0'})+(act==='call'?Ic(Ctx(bx+34*i,by,30),bx+34*i+(30-sz)/2,by+(30-sz)/2,sz,'phone-end-fill',null,{cls:'i1'}):'')})});
 return h+'</div>'}
function accHead(c,t,title,count,o){o=o||{};let h=Rc(c,428,t,570,41,{act:'racc',arg:o.key,cls:'hit'})+Tx(c,444,t+16,title,'sb13','ink',{inner:esc(title)+(count?`<span class="m13 ink3" style="margin-left:6px">${esc(count)}</span>`:'')})+Ic(c,969,t+14,14,'chevron-down','ink',{cls:o.open?'rot':''});
 if(o.dots&&o.dots.length)h+=dotsRow(c,959,t+10,o.dots);return h}
const ACC_DEF={log:true,accept:true};
const accOpen=(s,key)=>s.ropen[key]!=null?s.ropen[key]:!!ACC_DEF[key];
const dChip=(d,plan)=>d==null?'':`<span class="m11 ${d>0?'danger':'ok'}" style="margin-left:6px" title="planned ${plan||''}">(${d===0?'0':d>0?'+'+d:'−'+Math.abs(d)})</span>`;
function riderBody(s,c,t){const r=s.rider,D=stepDeltas(s),RR=riderRules(s);let h='';
 const o1=accOpen(s,'log');h+=accHead(c,t,'Trip log','('+r.log.length+')',{key:'log',open:o1});
 if(o1){const th=tableHead(c,444,539,base(t)+26,[444,761,895],['STEP','ORDER TIMELINE','LOCATION']);h+=th.h;const y=th.rule+13;
  r.log.forEach((x,i)=>{const yy=y+22*i;const L=r.locs[i];h+=Tx(c,444,yy,x[0],'r13')+Tx(c,761,yy,x[1],'r13','ink',{inner:esc(x[1])+dChip(D[i],r.plan[i])})+Tx(c,895,yy,L==null?'–':'~'+L+' m','r13')});
  t=y+22*(r.log.length-1)+9+16}else t+=41;
 h+=Hr(c,428,t,570);t+=1;
 const o2=accOpen(s,'contacts');h+=accHead(c,t,'Attempts to reach customer',r.contacts.length?'('+r.contacts.length+')':'',{key:'contacts',open:o2});
 if(o2){if(r.contacts.length){const th=tableHead(c,444,539,base(t)+26,[444,632,790],['TIME','ANSWERED','DURATION']);h+=th.h;const y=th.rule+13;
   r.contacts.forEach((x,i)=>{const yy=y+22*i;const ans=/^Answered/.test(x[2])?'Yes':/Not answered/.test(x[2])?'No':'—',du=(/(\d+\s*s)\b/.exec(x[2])||[])[1]||'—';h+=Tx(c,444,yy,x[0],'r12')+Tx(c,632,yy,ans,'r12')+Tx(c,790,yy,du,'r12',{})+Tx(c,860,yy,x[1],'r12','ink3',{w:123,trunc:1,lh:9})});t=y+22*(r.contacts.length-1)+9+16}
  else{h+=Tx(c,444,base(t)+26,'No calls or messages to the customer logged','r13','ink3');t=base(t)+26+9+16}}else t+=41;
 h+=Hr(c,428,t,570);t+=1;
 const o3=accOpen(s,'inc');h+=accHead(c,t,'Incidents reported',r.incidents.length?'('+r.incidents.length+')':'',{key:'inc',open:o3});
 if(o3){let y=base(t)+26;if(r.incidents.length){r.incidents.forEach((x,i)=>{const txt=x[1]+' · '+x[2];const L=lines(txt,'400 13px Inter',475);h+=Tx(c,444,y,x[0],'r13')+Tx(c,508,y,txt,'r13','ink',{w:475,lh:20});y+=9+(L-1)*20+13});t=y-13+16}else{h+=Tx(c,444,y,'No incidents reported during the trip','r13','ink3');t=y+9+16}}else t+=41;
 h+=Hr(c,428,t,570);t+=1;
 const o4=accOpen(s,'rules');h+=accHead(c,t,'Rider checks','',{key:'rules',open:o4,dots:RR.map(x=>x.st)});
 if(o4){let top=t+41;RR.forEach((x,i)=>{if(i){h+=Hr(c,444,top,539,'lineF');top+=1}const open=s.rrMenu===x.id;
   h+=Rc(c,428,top,570,37,{act:'rrmenu',arg:x.id,cls:'hit',title:x.by?'Original value: '+SN[x.orig]+' · changed by agent '+x.by:'Change status (logged)'})+Dot(c,444,cy(top,37,22),x.st)+Tx(c,478,top+14,x.id+' '+x.nm,'sb13','ink',{inner:esc(x.id+' '+x.nm)+`<span class="r13 ink3" style="margin-left:8px">${esc(x.f)}</span>`+(x.by?`<span class="r11 info" style="margin-left:8px">changed ${esc(x.by)}</span>`:''),w:505,trunc:1,lh:9,title:x.fl});
   top+=37;if(open){h+=`<div class="tabs" style="position:absolute;left:${478-c.ox}px;top:${px(top+7-c.oy)};gap:8px">${['met','no','na'].map(v=>chip(SL[v],{on:x.st===v,act:'setov',arg:x.id+':'+v})).join('')}</div>`;top+=42}});t=top+8}else t+=41;
 return {h,t}}
function restBody(s,c,t){const v=s.restv,expReady=HM(T(v.accepted)+v.est),ready=HM(T(v.accepted)+v.actual);let h='';
 const o1=accOpen(s,'accept');h+=accHead(c,t,'Preparation timeline','',{key:'accept',open:o1});
 if(o1){const th=tableHead(c,444,539,base(t)+26,[444,632,790],['STEP','ORDER TIMELINE','NOTE']);h+=th.h;const y=th.rule+13;
  const rows=[['Order received',s.placed,null,null,'-'],['Accepted',v.accepted,null,null,(T(v.accepted)-T(s.placed))+' min after received'],['Food ready',ready,v.actual-v.est,expReady,'own estimate '+v.est+' min'],['Order packed',packedT(s),null,null,'last item marked packed'],['Handed to rider',v.handover,null,null,'rider reached '+s.rider.log[2][1]]];
  rows.forEach((x,i)=>{const yy=y+22*i;h+=Tx(c,444,yy,x[0],'r13')+Tx(c,632,yy,x[1],'r13','ink',{inner:esc(x[1])+(x[2]!=null?dChip(x[2],x[3]):'')})+Tx(c,790,yy,x[4],'r12','ink3')});t=y+22*4+9+16}else t+=41;
 h+=Hr(c,428,t,570);t+=1;
 const o2=accOpen(s,'kot');h+=accHead(c,t,'Kitchen order ticket (KOT)','('+v.kot.length+')',{key:'kot',open:o2});
 if(o2){let y=base(t)+26;v.kot.forEach((x,i)=>{const L=lines(x[0],'400 13px Inter',380);h+=Tx(c,444,y,x[0],'r13','ink',{w:380,lh:20})+Tx(c,983,y,x[1],'r12','ink3',{al:'R'});y+=9+(L-1)*20+13});t=y-13+16}else t+=41;
 h+=Hr(c,428,t,570);t+=1;
 const instrN=v.instr&&v.instr!=='None'?1:0;const o3=accOpen(s,'instr');h+=accHead(c,t,'Special instructions',instrN?'(1)':'',{key:'instr',open:o3});
 if(o3){const y=base(t)+26;h+=Tx(c,444,y,v.instr,'r13',instrN?'ink':'ink3');t=y+9+16}else t+=41;
 h+=Hr(c,428,t,570);t+=1;
 const o4=accOpen(s,'subs');h+=accHead(c,t,'Item substitutions',v.subs.length?'('+v.subs.length+')':'',{key:'subs',open:o4});
 if(o4){if(v.subs.length){const th=tableHead(c,444,539,base(t)+26,[444,560,676,820,930],['ITEM','CHANGE','REPLACED WITH','CONSENT','TIME']);h+=th.h;const y=th.rule+13;v.subs.forEach((x,i)=>{const yy=y+22*i;h+=Tx(c,444,yy,x[0],'r12','ink',{w:110,trunc:1,lh:9})+Tx(c,560,yy,x[1],'r12','ink',{w:110,trunc:1,lh:9})+Tx(c,676,yy,x[2],'r12','ink',{w:138,trunc:1,lh:9})+Tx(c,820,yy,x[3],'r12','ink',{w:104,trunc:1,lh:9})+Tx(c,930,yy,x[4]||'—','r12')});t=y+22*(v.subs.length-1)+9+16}
  else{const y=base(t)+26;h+=Tx(c,444,y,'No changes recorded','r13','ink3');t=y+9+16}}else t+=41;
 h+=Hr(c,428,t,570);t+=1;
 return {h,t}}
function chatColumn(s){const c=C0;let h=Rc(c,428,TOP,570,848,{f:'canvas'})+Rc(c,998,TOP,2,848,{f:'line'})+chatHeader(s);
 const ac=activeCall(s)||(s.callGhost&&s.callGhost.w);const party=s.view!=='chat';const who0=s.view==='rider'?'rider':'rest';
 const contacted=party&&hasContact(s,who0);
 /* bottom stack */
 let yb=900;let callTop=null;if(ac){callTop=yb-58;yb=callTop}
 const closing=s.view==='chat'&&s.closing&&s.closing.i<s.closing.list.length;
 const replyTop=yb-(closing?112:66);yb=replyTop;
 let subjTop=null,dockTop=null;const dk=party?s.dock[who0]:null;const dockOpen=contacted&&dk.open;const dockH=!contacted?0:dockOpen?237:46;
 if(party){if(contacted){subjTop=yb-57;yb=subjTop}else subjTop=yb;dockTop=yb-dockH;yb=dockTop}
 if(!party){const AV=avatarOf(s).cust;h+=nameBar(c,AV,HDR+1);const ai=aiSummary(c,s,HDR+1+53);h+=ai.h;const b=ai.bottom;
  const inner=bubblesHTML(s,s.msgs)+(s.typing?`<div class="typing" style="margin-top:8px"><i></i><i></i><i></i></div>`:'')+(s.agTyping?`<div class="typing ag" style="margin-top:8px;margin-left:auto;background:var(--bubble)"><i></i><i></i><i></i></div>`:'')+(s.waitCall&&!s.calls.cust?`<div class="sysl" style="margin-top:20px">${Tx(Ctx(0,0,0),0,0,first(s.cust.name)+' asked for a call · use the phone icon beside the reply box','r11','ink3',{cls:'sysln'})}</div>`:'')+'';
  h+=`<div class="msgs scroll" id="msgs" style="top:${b}px;height:${replyTop-b}px"><div style="padding-bottom:16px">${inner}</div></div>`;h+='<div class="bstack" id="bstack">'}
 else{const who=s.view==='rider'?'rider':'rest';const AV=avatarOf(s)[who];
  h+=nameBar(c,AV,HDR+1);const pv=Ctx(428,HDR+1+53,570);const pb=who==='rider'?riderBody(s,pv,HDR+1+53):restBody(s,pv,HDR+1+53);const ph=pb.h;const t=pb.t;
  h+=`<div class="scroll" id="pview" style="position:absolute;left:428px;top:150px;width:570px;height:${dockTop-150}px;background:var(--surface)"><div style="position:relative;height:${Math.max(t-150,dockTop-150)+24}px">${ph}</div></div>`;
  /* dock (only after a call or a message with this party) */
  h+='<div class="bstack" id="bstack">';
  if(contacted){
  h+=Rc(c,428,dockTop,570,2,{f:'line'})+Rc(c,428,dockTop+2,570,subjTop-dockTop-2,{f:'surface'});
  const dt=dockTop+2;const tabs=['Chat','Transcription'];const ti=dk.tab==='trans'?1:0;
  h+=Rc(c,428,dt,570,44,{act:'dockopen',cls:'hit nohov',title:dockOpen?'Collapse':'Expand'});
  h+=tabsRow(c,444,dt+7,tabs,ti,'dock');
  h+=Ic(c,969,dt+15,14,'chevron-down','ink',{cls:dockOpen?'':'rot'});
  if(dockOpen){h+=Hr(c,444,dt+44,539,'lineS');
   let inner='';
   if(dk.tab==='trans'){const nm=who==='rider'?'rider':'restaurant';const M=who==='rider'?s.rmsgs:s.smsgs;const callM=M.find(m=>m.w==='call');const chatM=M.find(m=>m.w==='ag'||m.w==='rd'||m.w==='rs');
    const sysl=(t,mt)=>`<div class="sysl" style="margin-top:${mt}px">${Tx(Ctx(0,0,0),0,0,t,'r11','ink3',{cls:'sysln'})}</div>`;
    const L=who==='rest'&&s.restCall&&s.restCall.via==='call'?s.restCall.lines:null;
    let parts=[];if(chatM)parts.push({at:chatM.at,sys:1,html:mt=>sysl('Chat with '+nm+' · '+chatM.at,mt)});
    if(callM){const lines=L?`<div class="trans" style="padding-top:${DK.sc}px;padding-bottom:0">${L.map(l=>`<div class="ln"><span class="sp t sb12 ${l[0]==='Agent'?'agent':'ink'}" style="position:static">${esc(l[0])}</span><span class="tx">${esc(l[1])}</span></div>`).join('')}</div>`:(who==='rider'?sysl('No scripted transcript for the rider call in this prototype',DK.ss):'');parts.push({at:callM.at,sys:!L,html:mt=>sysl('Call with '+nm+' · '+callM.dur+' · '+callM.at,mt)+lines})}
    parts.sort((a,b)=>T(a.at)-T(b.at));
    inner=parts.length?parts.map((p,i)=>p.html(i===0?DK.first:parts[i-1].sys?DK.ss:DK.cs)).join('')+'<div style="height:16px"></div>':`<div class="trans">${Tx(Ctx(0,0,0),0,0,s.calls[who==='rider'?'rider':'rest']?'Recording… the transcript appears when the call ends.':'No transcript yet. Call or chat with the '+nm+' first.','r13','ink3',{cls:'sysln'})}</div>`}
   else{const M=who==='rider'?s.rmsgs:s.smsgs;const nm=who==='rider'?first(s.rec.rider.name):s.restaurant;
    inner=`<div class="dkw" style="padding:8px 16px 16px">${M.length?bubblesHTML(s,M.map(m=>m.w==='rd'||m.w==='rs'?Object.assign({},m,{w:'cu'}):m),{onWhite:true,std:true}):`<div class="sysl" style="margin-top:4px;text-align:left">${Tx(Ctx(0,0,0),0,0,who==='rider'?`No messages with ${nm} yet. Click the reply box below to start.`:`No messages with ${nm} yet. Click the reply box below to start, or call.`,'r13','ink3',{cls:'sysln'})}</div>`}${(who==='rider'?s.rtyping:s.stalk)?`<div class="typing onwhite" style="margin-top:8px;background:var(--canvas)"><i></i><i></i><i></i></div>`:''}</div>`}
   h+=`<div class="scroll" id="dockScroll" style="position:absolute;left:428px;top:${dt+45}px;width:570px;height:${subjTop-dt-45}px">${inner}</div>`}
  }
  /* subject row */
  if(contacted){const ok=who==='rest'?!!s.restCall:(s.rdone||s.rcalled);const val=who==='rest'?s.soe:s.rsoe;const opts=who==='rest'?SOE:RSOE;const dis=!ok||!!s.decided;
  h+=Hr(c,428,subjTop,570,'line')+Rc(c,428,subjTop+1,570,56,{f:'surface'});
  h+=DD(c,who==='rest'?'soe':'rsoe',444,subjTop+14,539,{val,opts,ph:ok?'Subject of Error':'Subject of Error · available after the call or chat',chg:who==='rest'?'soe':'rsoe',dis,up:true,list:true})}
 }
 h+=replyPanel(c,s,replyTop,{closing});
 h+='</div>';
 if(ac)h+=callBar(c,s,ac,callTop);else if(s.slide)h+=callBar(c,s,'ghost',842);
 /* menus above the reply bar */
 if(s.menu==='tpl'&&!party){const Cc=conds(s).filter(x=>(x.st==='no'||x.st==='unk')&&TPL[x.id]&&(!TPL_ONLY[x.id]||TPL_ONLY[x.id]===x.st));
  h+=`<div class="rmenu" style="bottom:${900-replyTop+8}px"><span class="cap t caps">Question templates</span>${Cc.length?Cc.map(x=>`<button class="opt" data-act="tpl" data-arg="${x.id}" title="${x.id} ${esc(x.nm)} · ${SN[x.st]}">${esc(TPL[x.id])}</button>`).join(''):'<span class="opt none t caps ink3">All conditions are met. No queries needed.</span>'}</div>`}
 if(s.menu==='rider'&&s.view==='rider'){const L=RSCRIPT[s.key]||[];h+=`<div class="rmenu" style="bottom:${900-replyTop+8}px"><span class="cap t caps">Prototype · pick the rider's account</span>${L.map(x=>`<button class="opt" data-act="rsc" data-arg="${x.id}">${esc(x.label)}</button>`).join('')}</div>`}
 return h}

/* ================= insights + decision ================= */
function insightsBody(s,c,bottom){let h='';let t=HDR+1;
 h+=Tx(c,1016,cy(t,51,9),'Issue type','r12','ink3'); /* label 59 + 15 gap → field at 1090 */const selY=cy(t,51,31);
 h+=DD(c,'subject',1090,selY,334,{val:s.subject,groups:[...new Set(SUBJECTS.map(r=>r[0]))].map(g=>({g,opts:SUBJECTS.filter(r=>r[0]===g).map(r=>r[1])})),chg:'subject',dis:!!s.decided,list:true});
 let r=t+51;h+=Hr(c,1000,r,440,'lineS');t=r+1;
 if(subj(s).route){h+=Tx(c,1016,t+14,'Conduct complaints are handled by the safety team. The case will be transferred; you still resolve any refund part. Routing is logged.','r12','warn',{w:408,lh:16});r=t+14+16*3;h+=Hr(c,1000,r,440,'lineS');t=r+1}
 /* record summary */
 h+=secHead(c,1000,t,440,'records','History summary');const capY=base(t)+26,valY=capY+26,subY=valY+29,divY=subY+23,rowBase=divY+23;
 const X=[1016,1167,1318];const TL=[['CUSTOMER',(x=>x.raised+'/'+x.up)(recSum.cust(s)),'Raised/Refunded','Orders',recSum.cust(s).tot,'cust'],['RIDER',(x=>x.up+'/'+x.raised)(recSum.rider(s)),'Liable/Complaints','Deliveries',recSum.rider(s).tot,'rider'],['RESTAURANT',(x=>x.up+'/'+x.raised)(recSum.rest(s)),'Upheld/Complaints','Orders',recSum.rest(s).tot,'rest']];
 TL.forEach((x,i)=>{const xx=X[i];h+=Rc(c,xx-8,capY-10,122,rowBase-capY+20,{act:'ov',arg:'rec:'+x[5],cls:'hit',r:8,title:'Open '+x[0].toLowerCase()+' records'})+Tx(c,xx,capY,x[0],'caps','ink3')+Tx(c,xx,valY,x[1],'sb24')+Tx(c,xx,subY,x[2],'r11','ink3')+Hr(c,xx,divY,106,'lineS')+Tx(c,xx,rowBase-8,x[3],'r11','ink3',{inner:esc(x[3])+`<span class="sb13 ink" style="margin-left:6px;position:relative;top:-1px">${x[4].toLocaleString('en-IN')}</span>`})});
 r=rowBase+16;h+=Hr(c,1000,r,440,'lineS');t=r+1;
 /* policy conditions */
 const C=conds(s),TR=trigs(s);const open=!!s.open.pol;
 h+=secHead(c,1000,t,440,'shield-check','Policy checks',{cr:1424,chev:true,dots:C.map(x=>x.st),act:'tog',arg:'pol',open});
 if(open){let top=t+41;C.forEach((x,i)=>{if(i){h+=Hr(c,1016,top,408,'lineF');top+=1}const na=x.st==='na'&&!x.by;const om=s.ovMenu===x.id;
   h+=Rc(c,1000,top,440,37,{act:na?null:'ovmenu',arg:x.id,cls:'hit',title:na?'Not applicable':x.by?'Original value: '+SN[x.orig]+' · changed by agent '+x.by:'Change status (logged)'})+Dot(c,1016,cy(top,37,22),x.st)+Tx(c,1050,top+14,x.id+' '+x.nm,'sb13','ink',{inner:esc(x.id+' '+x.nm)+`<span class="r13 ink3" style="margin-left:8px">${esc(x.f)}</span>`+(x.by?`<span class="r11 info" style="margin-left:8px">changed ${esc(x.by)}</span>`:''),w:374,trunc:1,lh:9,title:(x.fl||x.f)+(HB(x.id)?' · '+HB(x.id):'')});
   top+=37;if(om){h+=`<div class="tabs" style="position:absolute;left:${1050-c.ox}px;top:${px(top+7-c.oy)};gap:8px">${['met','no'].map(v=>chip(SL[v],{on:x.st===v,act:'setov',arg:x.id+':'+v})).join('')}</div>`;top+=42}});
  if(TR.length){h+=Hr(c,1016,top,408,'lineF');top+=1;h+=Tx(c,1016,top+14,'Triggers','sb13','ink',{inner:'Triggers'+TR.map(x=>`<span class="r13 ink3" style="margin-left:8px">${x[0]} ${esc(x[1])}</span>`).join('')});top+=37}
  r=top+4}else r=t+41;
 h+=Hr(c,1000,r,440,'lineS');t=r+1;
 /* timeline by party */
 h+=secHead(c,1000,t,440,'activity','Events by party');const th=tableHead(c,1016,408,base(t)+26,[1024,1110,1223,1336],['TIME','CUSTOMER','RIDER','RESTAURANT']);h+=th.h;
 const rr=s.rider,v=s.restv,prep=(s.tl.find(x=>x[0]==='Prepared')||[])[1];
 const ev=[[s.placed,0,'Placed'],[v.accepted,2,'Accepted'],[rr.log[1][1],1,'Accepted'],[prep,2,'Prepared'],[packedT(s),2,'Order packed'],[rr.log[2][1],1,'Reached'],[rr.log[3][1],1,'Pick-up'],[rr.log[4][1],1,'Reached'],[s.delivered,1,'Marked delivered']].filter(e=>e[0]).map((e,i)=>e.concat(i)).sort((a,b)=>T(a[0])-T(b[0])||a[3]-b[3]);
 let y=th.rule+13;ev.forEach((e,i)=>{h+=Rc(c,1000,y+22*i-7,440,22,{cls:'rowhit'})+Tx(c,1024,y+22*i,e[0],'r12')+Tx(c,[1110,1223,1336][e[1]],y+22*i,e[2],'r12')});
 const end=y+22*(ev.length-1)+9+24;
 return {h,height:end-HDR-1}}
const HB=id=>{const r=HANDBOOK.find(x=>x[0]===id);return r?r[1]:''};
function decisionArea(s){const c=C0;let h='';const Hh=[];let H=0;
 /* build content with y relative to the rule+1 */
 const el=[];const push=(f)=>el.push(f);
 if(s.closed){const d=s.decided;H=213;const t=900-H;h+=Hr(c,1000,t-1,440,'line')+Rc(c,1000,t,440,H,{f:'surface'});
  /* closed: green icon + title, then "₹X refunded · Fault by Y", actions, report link last (grey, no underline) */
  h+=Tx(c,1220,t+40,'','sb13','ok',{al:'C',inner:`<span class="ic" style="position:relative;display:inline-block;width:16px;height:16px;vertical-align:top;margin:-4px 8px 0 0;color:var(--ok)">${svg('check-circle')}</span>Ticket closed · ${esc(s.closedAt)}`});
  const what=d.type==='review'?'Sent to review':d.type==='deny'?'No refund':`<b class="sb12">${rs(d.amount||0)}</b> refunded`+(d.coupon?` + ${rs(d.coupon)} coupon`:'');
  h+=Tx(c,1220,t+65,'','r12','ink3',{al:'C',w:408,trunc:1,inner:what+(d.fault?' · Fault by '+esc(d.fault):''),title:d.label+' · '+d.reason});
  h+=`<div style="position:absolute;left:1000px;top:${t+97}px;width:440px;display:flex;justify-content:center;gap:20px;align-items:center"><button class="btn sec" style="width:124px" data-act="ov" data-arg="log">View audit trail</button><button class="lnk m13 ink3" data-act="reopen">Reopen (demo)</button></div>`;
  if(s.report)h+=Tx(c,1220,t+164,'Report sent to '+s.restaurant+' (Partner app) · view','r12','ink3',{al:'C',act:'ov',arg:'report',cls:'rptl',title:'View the report sent to the restaurant'});
  return h}
 if(s.decided){const d=s.decided;H=213;const t=900-H;h+=Hr(c,1000,t-1,440,'line')+Rc(c,1000,t,440,H,{f:'surface'});
  h+=Tx(c,1220,t+56,'','sb13','ok',{al:'C',inner:`<span class="ic" style="position:relative;display:inline-block;width:16px;height:16px;vertical-align:top;margin:-4px 8px 0 0;color:var(--ok)">${svg('check-circle')}</span>Decision recorded`});
  const sub=d.type==='review'?'Sent to review · '+d.reason:d.type==='deny'?'No refund · '+d.reason:(d.amount?rs(d.amount)+' ':'')+(d.type==='full'?'full refund':'partial refund')+(d.fault?' by '+d.fault:'')+(d.coupon?' + '+rs(d.coupon)+' coupon':'');
  h+=Tx(c,1220,t+81,'','r12','ink3',{al:'C',inner:(d.amount&&d.type!=='review'&&d.type!=='deny'?`<b class="sb12">${rs(d.amount)}</b> `+esc(sub.replace(rs(d.amount)+' ','')):esc(sub)),title:d.cost?'Cost: '+d.cost:''});
  const n=closingMsgs(s,d).filter(x=>typeof x==='string').length;
  if(s.closing)h+=Tx(c,1220,t+106,'Closing messages loaded in the Customer chat · send each with Enter','r11','ink3',{al:'C'});
  h+=`<div style="position:absolute;left:1000px;top:${t+131}px;width:440px;display:flex;justify-content:center;gap:20px;align-items:center"><button class="btn pri m13" style="width:124px" data-act="${s.closing?'view':'closeYes'}" data-arg="chat" title="${s.closing?'Go to the Customer chat':'Loads '+n+' closing messages into the Customer chat; you send each one'}">${s.closing?'Go to chat':'Close ticket'}</button><button class="lnk m13 ink3" data-act="reopen">Change decision</button></div>`;return h}
 /* open decision */
 const lock=false,gt=atGate(s);scriptDone(s);
 const a=amt(s),cl=costLine(s),R=reasonsFor(s);
  const PI=s.items.map((i,k)=>[i,k]).filter(x=>x[0].aff),PL=PI.length?PI:s.items.map((i,k)=>[i,k]);
 /* measure: f = fault cap at 20; buttons at f+27 (31); then blocks */
 let y=20+9+27+31; // bottom of action row rel. to content top (= 87)
 let items=null,cpn=null,sel=null,cost=null,cf=null;
 if(s.dec==='partial'){cpn=y+19;y=cpn+15;} /* partial: items are understood (no item rows); coupon is optional, no checkbox */
 if(s.dec){sel=(s.dec==='partial'?y+7+8:y+10);y=sel+31;if(cl){cost=y+14;y=cost+9}cf=y+22;y=cf+31}
 H=y+(s.dec?17:14);const t=900-H;
 h+=Hr(c,1000,t-1,440,'line')+Rc(c,1000,t,440,H,{f:'surface'});
 const f=t+20;
 h+=`<div class="dec${lock?' locked':''}" style="position:absolute;left:1000px;top:${t}px;width:440px;height:${H}px">`;
 const lc=Ctx(1000,t,440);
 h+=Tx(lc,1016,f,'At fault','sb13','ink');
 h+=`<div class="tabs" style="position:absolute;right:16px;top:${f-9-t}px;gap:0">${['Customer','Restaurant','Rider','Swiggy'].map(x=>chip(x,{on:s.fault===x,act:'fault',arg:x,dis:lock})).join('')}</div>`;
 h+=`<div style="position:absolute;left:16px;top:${f+27-t}px;display:flex;gap:10px">${[['full','Full Refund'],['partial','Partial'],['deny','Deny'],['review','Send Review']].map(d=>`<button class="btn dact${s.dec===d[0]?' pri':''}" style="width:94px" data-act="dec" data-arg="${d[0]}"${lock?' disabled':''}>${d[1]}</button>`).join('')}</div>`;
 if(lock)h+=Rc(lc,1000,t,440,H,{cls:'lockhit',title:gt?`Check with the ${gt==='rest'?'restaurant':'rider'}, then tell ${first(s.cust.name)} what you found. The decision unlocks after that.`:'Unlocks when the conversation with the customer is complete'});
 if(s.dec==='partial'){h+=`<span class="t r13" style="left:16px;top:${cpn+3}px">Coupon on next order</span>`;
  h+=`<span class="t r13" style="right:100px;top:${cpn+3}px;text-align:right">₹</span><div class="amt" style="position:absolute;right:16px;top:${cpn-7}px;width:80px;height:29px"><input id="cpnamt" type="number" min="1" step="1" placeholder="amount" value="${esc(s.coupon.amt)}"></div>`}
 if(s.dec){h+=DD(lc,'reason',1016,t+sel,408,{val:s.reason,opts:R,ph:'Select a reason',chg:'reason',up:true});
  if(cl)h+=Tx(lc,1024,t+cost,'','r12',cl.dim?'ink3':'ink2',{inner:(a!=null&&s.dec!=='deny'?`<b class="sb12 ink">${rs(a)}</b> ${s.dec==='full'?'incl. GST and charges':'item price'+(s.part.length>1?'s':'')+' only'} · `:'')+esc(cl.txt),w:400,trunc:1,title:'Cost: '+cl.txt});
  const nd=decNeed(s),ok=!nd;const msg=nd==='fault'?'Choose a fault.':(nd==='reason'&&s.cfTry)?'Choose a reason.':''; /* reason prompt only after the inactive Confirm is clicked */
  h+=`<div style="position:absolute;left:16px;top:${cf}px;display:flex;gap:10px"><button class="btn pri${ok?'':' dis'}" style="width:124px" data-act="confirm">Confirm</button><button class="btn sec${ok?'':' off'}" style="width:124px" data-act="cancel">Cancel</button></div>`;
  if(msg)h+=Tx(lc,1424,t+cf+11,msg,'r12','warn',{al:'R',id:'cfmsg'})}
 h+='</div>';return h}
function insights(s){const c=C0;let h=Rc(c,1000,TOP,440,848,{f:'canvas'})+Rc(c,1000,TOP,440,44,{f:'surface'})+Tx(c,1016,69,'Insights and decision','sb14')+IB(c,1409,TOP+15,15,'history',{act:'ov',arg:'log',title:'Audit trail ('+s.log.length+')'})+Hr(c,1000,HDR,440,'line');
 const dec=decisionArea(s);const m=/top:(\d+)px;width:440px;height/.exec(dec)||/top:(\d+)px/.exec(dec);const bottom=m?+m[1]-1:807;
 const ib=insightsBody(s,Ctx(1000,HDR+1,440),bottom);
 h+=`<div class="scroll" id="insScroll" style="position:absolute;left:1000px;top:97px;width:440px;height:${bottom-97}px;background:var(--surface)"><div style="position:relative;height:${ib.height}px">${ib.h}</div></div>`+dec;return h}

/* ================= home ================= */
function homePage(){const c=C0;let h=Rc(c,0,TOP,1440,848,{f:'surface'});
 const titleCap=TOP+84;h+=Tx(c,216,titleCap,'My Workspace','sb18')+IB(c,1199,titleCap-1,15,'bar-chart',{act:'analytics',title:'Analytics · planned for the next phase'});
 const tileY=titleCap+13+24,tileH=51;const D=G.closedDemo;const avg=Math.round(D.avgS);
 const tiles=[[Math.floor(avg/60)+'m '+String(avg%60).padStart(2,'0')+'s','Avg. Case Handling Time','Across '+D.n+' closed cases · from first open to case closed'],[D.ratingAvg.toFixed(1)+'/5','Avg. Customer Rating','From '+D.ratings+' customer ratings · '+D.unrated+' closed cases not rated']];
 tiles.forEach((x,i)=>{const X=216+510*i;h+=Rc(c,X,tileY,498,tileH,{f:'surface',s:['lineS',1],r:8})+`<div style="position:absolute;left:${X+16}px;top:${tileY+13}px;display:flex;align-items:flex-start;gap:20px"><span class="t sb24" style="position:static;margin-top:4px">${esc(x[0])}</span><span style="display:flex;flex-direction:column;gap:8px"><span class="t sb13" style="position:static">${esc(x[1])}</span><span class="t r11 ink3" style="position:static">${esc(x[2])}</span></span></div>`});
 const tabY=tileY+tileH+39;h+=tabsRow(c,216,tabY,['Assigned','On hold','Shelved','Closed'],G.homeTab,'htab')+IB(c,1199,cy(tabY,31,15),15,'settings',{act:'sortm',title:'Sort',cls:G.sortOpen?'on':''});
 /* sort dropdown · same pattern as the search dropdown: card 280 wide, radius 16, 11 padding, rows 44 with a 6-inset radius-10 hover, 31 icon box + title / caption; right edge on the trigger's hover box, 6 below it */
 const SM={'time-desc':['sort-desc','Longest wait first','Oldest assigned on top'],'time-asc':['sort-asc','Shortest wait first','Newest assigned on top'],az:['sort-az','Issue type A → Z','Alphabetical by issue'],za:['sort-za','Issue type Z → A','Reverse alphabetical'],prio:['prio','Priority first','Then longest wait']};
 /* width = 6 inset + 11 + 31 box + 10 gap + 112 longest title + 11 + 6 inset = 188; the current sort keeps the hover fill */
 if(G.sortOpen){const bt=Math.round(cy(tabY,31,15)+7.5+15)+6;h+=`<div class="srch sortm" style="left:${1222-188}px;top:${bt}px;width:188px">${SORTS.map(x=>{const m=SM[x[0]];const on=G.sort===x[0];return `<div class="it${on?' on':''}" data-act="sort" data-arg="${x[0]}"><span class="bx">${svg(m[0])}</span><span class="a t sb13">${esc(m[1])}</span></div>`}).join('')}</div>`}
 const lineY=tabY+31+7;h+=Hr(c,216,lineY,1008);const row0=lineY+1+10;
 let rows=[];const mk=k=>{const s=S[k];return {k,ini:s.code,t1:s.order+' · '+s.subject.replace(' (marked delivered)',''),t2:s.cust.name+' · '+s.restaurant,tm:wait(k),un:s.qUnread&&!s.closed,pr:isPrio(s),held:s.held}};
 if(G.homeTab===0)rows=QUEUE.filter(k=>!S[k].closed&&!S[k].held&&!S[k].shelved).map(mk);
 else if(G.homeTab===1)rows=QUEUE.filter(k=>S[k].held&&!S[k].shelved&&!S[k].closed).map(k=>Object.assign(mk(k),{tm:heldTxt(k)}));
 else if(G.homeTab===3)rows=QUEUE.filter(k=>S[k].closed).map(k=>Object.assign(mk(k),{tm:S[k].closedAt,un:false,pr:false}));
 else rows=shelfList().map(x=>({k:x.k,ini:(x.subject.split(/\s+/).map(w=>w[0]).join('').slice(0,2)).toUpperCase(),t1:(x.k?S[x.k].order:x.no)+' · '+x.subject,t2:'Held since '+(x.since||'—'),by:x.by,tm:x.since?hmTxt(Math.max(1,(T(nowHM())-T(x.since)+1440)%1440)):'—',demo:x.demo}));
 rows=sortRows(rows);
 if(!rows.length)h+=Tx(c,720,Math.round(lineY+1+(900-lineY)/4)-4,['No assigned chats right now.','Nothing on hold.','Nothing on the Shelf.','No closed tickets yet in this shift.'][G.homeTab],'r13','ink3',{al:'C'});
 rows.forEach((r,i)=>{const y=row0+47*i;
  h+=Rc(c,216,y-6,1008,44,{r:10,tag:'div',cls:'hrowhit',act:r.k?'go':'planned',arg:r.k||'',title:r.demo?'Shelved case (demo) · opening is planned for the next phase':r.t1,inner:`<button class="dots" data-act="rowmenu" data-arg="${r.k||''}" title="Case actions" style="left:971px;top:7px"><i></i><i></i><i></i></button>`});
  h+=Rc(c,226,y,32,32,{f:'sunken',r:8,inner:Tx(Ctx(226,y,32),242,cy(y,32,9),r.ini,'sb12','ink',{al:'C'})});
  h+=Tx(c,268,y+4,r.t1,'sb13')+Tx(c,268,y+20,r.t2,'r11','ink3');
  if(G.homeTab===2)h+=Tx(c,982,cy(y,32,9),r.by,'m13','ink3');
  h+=Tx(c,1151,cy(y,32,9),r.tm,'m13','ink3',{al:'R',attr:r.k&&G.homeTab===0?` data-wait="${r.k}"`:r.k&&G.homeTab===1?` data-held="${r.k}"`:''});
  if(r.un)h+=Rc(c,248,y+2,8,8,{f:'focus',r:999,e:'ring2'});if(r.pr)h+=Rc(c,236,y+28,12,2,{f:'rec'});
  if(r.held&&G.homeTab===1)h+=Tx(c,982,cy(y,32,9),'Waiting on '+r.held.by,'m13','ink3');
  });
 return h}

/* ================= overlays ================= */
function modal(title,w,h,inner,o){o=o||{};const top=o.top!=null?o.top:Math.round((900-h)/2);return `<div class="modal" style="left:${Math.round((1440-w)/2)}px;top:${top}px;width:${w}px;height:${h}px" role="dialog">${title!=null?Tx(Ctx(0,0,w),20,24,title,'sb16'):''}${IB(Ctx(0,0,w),w-32,24,12,'x',{act:'close',title:'Close',cls:'mx',round:true})}${inner}</div>`}
function btnPair(w,y,a,b,o){o=o||{};const x=Math.round((w-258)/2);return `<div class="pair" style="left:${x}px;top:${y}px"><button class="btn ${o.aSecondary?'sec':o.danger?'danger':'pri'}${o.aOn?' on':''}" data-act="${o.aAct}"${o.aArg!=null?` data-arg="${esc(o.aArg)}"`:''}${o.disabled?' disabled':''}>${esc(a)}</button><button class="btn sec${o.bOn?' on':''}${o.disabled?' off':''}" data-act="${o.bAct}"${o.bArg!=null?` data-arg="${esc(o.bArg)}"`:''}>${esc(b)}</button></div>`}
function overlay(){const s=cur(),o=G.ov||(s&&s.ov);if(!o)return '';const c=Ctx(0,0,720);let inner='',h=0,title='',extra='';
 if(o.t==='ev'){const i=o.i,ph=s.photos[i],n=s.photos.length,ag=s.agree[ph.id];const src=(PHOTO_SRC[s.key]||{})[ph.id];title='Evidence photo';
  inner=`<div class="pvw"><div class="img">${src?`<img src="${src}" alt="${esc(ph.label)}">`:Tx(Ctx(68,60,584),360,195,ph.label,'r13','ink2',{al:'C'})}</div>${IB(c,29,201,18,'chevron-left',{act:'evnav',arg:'-1',cls:'nav'+(i===0?' off':''),title:'Previous photo',round:true})}${IB(c,673,201,18,'chevron-right',{act:'evnav',arg:'1',cls:'nav'+(i===n-1?' off':''),title:'Next photo',round:true})}`;
  if(n>1)inner+=`<div class="pg">${s.photos.map((p,j)=>`<i class="${j===i?'cur':''}" data-act="evgo" data-arg="${j}"></i>`).join('')}</div>`;
  const th=tableHead(c,20,680,388,[31,159,256,435],['ISSUE','SOURCE','TIME OF DELIVERY','PHOTO SENT AFTER DELIVERY']);inner+=th.h;const vals=[s.subject,ph.src,s.delivered,'(+'+(T(ph.at)-T(s.delivered))+') min'];vals.forEach((v,k)=>{inner+=Tx(c,[31,159,256,435][k],417,v,'r13')});
  inner+=btnPair(720,448,'Agree','Disagree',{aSecondary:ag!=='agree',aOn:ag==='agree',bOn:ag==='disagree',aAct:'agree',aArg:ph.id+'|agree',bAct:'agree',bArg:ph.id+'|disagree'})+'</div>';h=499}
 else if(o.t==='log'){title='Audit trail';h=560;const rows=s.log;const n=rows.length;
  inner=`<div class="cl"><div class="list scroll" id="logList" style="top:60px"><div style="padding:3px 0 12px">${rows.map((l,i)=>`<div class="e"><span class="t r12 ink3" style="left:30px;top:5px;position:absolute">${esc(l.at)}</span><span class="nd"></span><span class="tw r13" style="position:static;display:block;width:580px;line-height:20px;margin-top:-5.3px;margin-bottom:-5.3px">${esc(l.t)}</span></div>`).join('')}</div></div></div>`}
 else if(o.t==='book'){title='Policy handbook';h=560;const rows=HANDBOOK.filter(r=>r[0]!=='—');
  inner=`<div class="hb"><div class="list scroll">${rows.map(r=>`<div class="r"><span class="t sb13" style="left:11px;top:14px">${esc(r[0])}</span><span class="tw r13" style="position:static;display:block;width:581px;line-height:20px;margin-top:-5.3px;margin-bottom:-5.3px">${esc(r[1])}</span></div>`).join('')}</div></div>`}
 else if(o.t==='keys'){title='Keyboard shortcuts';const SC=[[['Alt','+','↓','/','↑'],'Next / previous chat'],[['Alt','+','1','/','2','/','3'],'Customer chat / Rider / Restaurant'],[['Enter'],'Send reply'],[['Alt','+','L'],'Audit trail'],[['←','/','→'],'Previous / next photo in the photo viewer'],[['Esc'],'Close pop-up']];
  inner=`<div style="position:absolute;left:0;top:54px;width:720px">${SC.map(([k,d])=>`<div class="lrow"><span class="keys" style="position:absolute;left:11px;top:8px">${k.map(x=>x==='+'||x==='/'?`<span class="pl">${x}</span>`:keycap(x,true)).join('')}</span><span class="t r13" style="left:161px;top:14px;position:absolute">${esc(d)}</span></div>`).join('')}</div>`;h=54+37*SC.length+20}
 else if(o.t==='sign'){title='End your shift?';const D=G.closedDemo;const mins=Math.floor(secs()/60)+198;
  inner=`<div style="position:absolute;left:0;top:54px;width:720px"><div class="lrow"><span class="t r12 ink2" style="left:10px;top:14px;position:absolute">Signed in since</span><span class="t sb13" style="right:10px;top:14px;position:absolute">${Math.floor(mins/60)}h ${String(mins%60).padStart(2,'0')}m</span><span class="t r13 ink3" style="right:80px;top:14px;position:absolute">${G.signedIn}</span></div><div class="lrow"><span class="t r12 ink2" style="left:10px;top:14px;position:absolute">Today’s summary</span><span style="position:absolute;right:10px;top:14px;display:flex;gap:24px"><span class="t caps ink3" style="position:static">Closed <b class="sb13 ink" style="letter-spacing:0;margin-left:10px">${D.n}</b></span><span class="t caps ink3" style="position:static">On hold <b class="sb13 ink" style="letter-spacing:0;margin-left:10px">${QUEUE.filter(k=>S[k].held).length+2}</b></span><span class="t caps ink3" style="position:static">Shelved <b class="sb13 ink" style="letter-spacing:0;margin-left:10px">${shelfList().length}</b></span></span></div></div>`+btnPair(720,145,'Sign Out','Cancel',{danger:true,aAct:'signout',bAct:'close'});h=196}
 else if(o.t==='report'){title='Restaurant report';const d=s.decided;const rows=[['Order',s.order+' · '+s.date+', '+s.placed],['Items affected',d.items.join(', ')],['Issue',s.subject],['Decision',d.label+' · '+rs(d.amount)+' · reason: '+d.reason],['Your times','accepted '+s.restv.accepted+' · prep '+s.restv.actual+' min (estimate '+s.restv.est+') · handover '+s.restv.handover],['Evidence',s.photos.length?s.photos.length+' customer photo(s) attached':'No photo'],['Cost split',d.cost||'—']];
  inner=`<div style="position:absolute;left:0;top:54px;width:720px">${rows.map(r=>`<div class="lrow"><span class="t sb13" style="left:11px;top:14px;position:absolute">${esc(r[0])}</span>${Tx(Ctx(0,0,720),161,14,r[1],'r13','ink',{w:519,trunc:1})}</div>`).join('')}</div>`;h=54+37*rows.length+20}
 else if(o.t==='flag'){title='Report · '+{cust:'customer',rider:'rider',rest:'restaurant'}[tgtOf(s)];const fd=s.flagDraft,W=fd.why||[],ok=W.length&&(!W.includes('Other')||(fd.note||'').trim());
  inner=`<div class="flag"><span class="sub t m12 ink3">Select all that may apply.</span><div class="chips">${['Abusive language in chat','Abusive language on call','Threats or harassment','Other'].map(p=>chip(p,{on:W.includes(p),act:'flagpick',arg:p})).join('')}</div><span class="nl t m12 ink3">Note ${W.includes('Other')?'(Required)':'(Optional)'}</span><div class="nf"><textarea id="flagnote" placeholder="What was said or done, briefly">${esc(fd.note||'')}</textarea></div>${btnPair(720,235,'Confirm','Cancel',{disabled:!ok,aAct:'flagdo',bAct:'close'})}</div>`;h=286}
 else if(o.t==='hold'){title='Put on hold';inner=`<div class="hold"><span class="q t sb13">Who is responsible for the delay?</span><div class="chips">${['Customer','Rider','Restaurant'].map(p=>chip(p,{on:o.sel===p,act:'hold',arg:p})).join('')}</div></div>`;h=135}
 else if(o.t==='rec'){const k=o.k;const d=partyRows(s,k,true);const L=[['cust','Customer'],['rider','Rider'],['rest','Restaurant']];h=560;
  inner=`<div class="tabs" style="position:absolute;left:20px;top:20px">${L.map(x=>`<button class="tab${x[0]===k?' on':''}" data-act="rectab" data-arg="${x[0]}">${x[1]}</button>`).join('')}</div><span class="t r13 ink3" style="left:${20+2+L.length*0+ (k==='cust'?300:k==='rider'?300:300)}px;top:30px;position:absolute;display:none"></span>`;
  const cols=[30,20+Math.round(680*0.381),20+Math.round(680*0.7265)];const th=tableHead(c,20,680,72,cols,['DURATION','COMPLAINT','FINDING']);inner+=th.h;const rule=th.rule;const n=d.rows.length;
  const rowsH=d.rows.map(([dd,cm,up],i)=>{const yy=13+22*i;return Rc(Ctx(0,0,720),0,yy-7,720,22,{cls:'rowhit'})+Tx(Ctx(0,0,720),cols[0],yy,dd,'r12')+Tx(Ctx(0,0,720),cols[1],yy,cm,'r12')+Rc(Ctx(0,0,720),cols[2],yy-3,15,15,up===1?{f:'act',r:999}:up===0.5?{r:999,s:['act',1],st:'background:linear-gradient(90deg,var(--act) 50%,transparent 50%)'}:{s:['lineS',1],r:999})}).join('');
  inner+=`<div class="scroll" id="recList" style="position:absolute;left:0;top:${rule+1}px;width:720px;height:${506-rule-1}px"><div style="position:relative;height:${13+22*n+4}px">${n?rowsH:Tx(Ctx(0,0,720),cols[0],13,'Nothing within 90 days','r12','ink3')}</div></div>`;
  const tr=totalRow(c,20,680,cols,560-20-33-1,d.total);inner+=tr.h.replace('>Total<','title="Rows beyond the real case records are Hypothetical filler">Total<');title=null}
 /* ---- settings pop-ups (720 wide, title 20/24, content from 54, rows = .lrow 37 + 1 rule, side margin 20, text inset 10) ---- */
 else if(['profile','appearance','chatset','help'].includes(o.t)){const P=G.prefs;
  const tg=(k,on)=>`<button class="tgl${on?' on':''}" data-act="pref" data-arg="${k}" title="${on?'On':'Off'}" style="position:absolute;right:10px;top:10px"><i></i></button>`;
  const lbl=(t,sub)=>`<span class="t r13" style="left:10px;top:14px;position:absolute">${esc(t)}${sub?`<span class="r13 ink3" style="margin-left:8px">${esc(sub)}</span>`:''}</span>`;
  const chips=(k,opts)=>`<div class="tabs" style="position:absolute;right:0;top:5px;gap:0">${opts.map(v=>chip(v,{on:P[k]===v,act:'prefc',arg:k+'|'+v})).join('')}</div>`;
  const sec=(cap,rows)=>`<div class="scap"><span class="t caps ink3" style="left:30px;top:15px;position:absolute">${esc(cap)}</span></div><div class="sgrp">${rows.join('')}</div>`;
  const row=x=>`<div class="lrow">${x}</div>`;let body='',w=720;
  if(o.t==='chatset'){title='Chat settings';
   const H0=54+33+37+8+33+37*4+8+33+37*4+20; /* .lrow is 37 incl. its rule */const mt=Math.round((900-H0)/2);const cm=Ctx(380,mt+54+33,680); /* the field sits inside its .lrow (modal x 20, y 87) */
   body=sec('Language',[row(lbl('Reply language')+DD(cm,'lang',380+410,mt+54+33+3,260,{val:P.lang,opts:[P.lang].concat(['Bengali','English (UK)','English (US)','Hindi','Marathi','Tamil','Telugu'].filter(x=>x!==P.lang)),chg:'lang',list:true}))])
    +'<div style="height:8px"></div>'+sec('General',[['spelling','Spelling'],['grammar','Grammar'],['style','Style'],['autocorrect','Autocorrect']].map(([k,t])=>row(lbl(t)+tg(k,P[k]))))
    +'<div style="height:8px"></div>'+sec('Ignore options',[['caps','Ignore all-caps words'],['domain','Ignore domain names'],['mixed','Ignore words with mixed case'],['nums','Ignore words with numbers']].map(([k,t])=>row(lbl(t)+tg(k,P[k]))));h=H0}
  else if(o.t==='appearance'){title='Appearance';
   body=sec('Display',[row(lbl('Theme')+chips('theme',['Light','Dark','System'])),row(lbl('Text size')+chips('text',['Default','Large'])),row(lbl('Density')+chips('density',['Comfortable','Compact'])),row(lbl('Reduce motion')+tg('motion',P.motion))]);h=54+33+37*4+20}
  else if(o.t==='profile'){title='Manage profile';
   body=`<div style="position:relative;height:64px;margin:0 20px;border-bottom:1px solid var(--lineF)"><span style="position:absolute;left:10px;top:10px;width:44px;height:44px;border-radius:999px;background:var(--violetS);display:flex;align-items:center;justify-content:center"><span class="t sb14 violet" style="position:static">RS</span></span><span class="t sb14" style="left:66px;top:19px;position:absolute">Riya S.</span><span class="t r12 ink3" style="left:66px;top:38px;position:absolute">Support agent · ${away?'Away':'Online'}</span></div>`
    +`<div class="sgrp">${[row(lbl('Display name')+`<span class="t r13" style="right:10px;top:14px;position:absolute">Riya S.</span>`),row(lbl('Status')+`<div class="tabs" style="position:absolute;right:0;top:5px;gap:0">${chip('Online',{on:!away,act:'setaway',arg:'0'})}${chip('Away',{on:!!away,act:'setaway',arg:'1'})}</div>`),row(lbl('Signed in')+`<span class="t r13" style="right:10px;top:14px;position:absolute">${G.signedIn}</span>`),row(lbl('Agent ID')+`<span class="t r13" style="right:10px;top:14px;position:absolute">AG-0417</span>`)].join('')}</div>`;h=54+64+37*4+20}
  else{title='Help';const HL=[['book','Policy handbook','Refund, evidence and blocking rules','ov','book'],['keyboard','Keyboard shortcuts','Move between chats faster','ov','keys'],['flag','Report a problem','Tell the product team what broke','setp','report'],['users','Contact team lead','Ask for help on a live case','setp','lead']];
   body=`<div style="position:relative">${HL.map((x,i)=>`<div style="position:relative;height:${i?38:37}px">${i?'<div style="position:absolute;left:20px;right:20px;top:0;height:1px;background:var(--lineF)"></div>':''}<div class="rowhit hit" data-act="${x[3]}" data-arg="${x[4]}" style="position:absolute;left:0;right:0;top:${i?1:0}px;height:37px"></div>${Ic(Ctx(0,0,720),30,(i?1:0)+11,15,x[0])}<span class="t sb13" style="left:55px;top:${(i?1:0)+14}px;position:absolute">${esc(x[1])}<span class="r13 ink3" style="margin-left:8px">${esc(x[2])}</span></span>${Ic(Ctx(0,0,720),676,(i?1:0)+12,14,'chevron-right','ink3')}</div>`).join('')}</div>`;h=54+37+38*3+20}
  inner=`<div style="position:absolute;left:0;top:54px;width:${w}px">${body}</div>`}
 else return '';
 return `<div id="scrim" data-act="scrim">${modal(title,720,h,inner)}</div>`}
function menus(){let h='';const s=cur();
 /* settings menu: the Sort dropdown pattern (card radius 16, 11 padding, 44 rows inset 6, 31 icon box, sb13 label, grey hover, no selection).
    width 200 (owner: halved back from 400); right edge on the icon box (1424), top = box bottom + 6 */
 if(G.setOpen){const SET=[['user-circle','Manage profile','ov','profile'],['palette','Appearance','ov','appearance'],['chats','Chat settings','ov','chatset'],['keyboard','Keyboard shortcuts','ov','keys'],['query','Help','ov','help'],['logout','Sign out','ov','sign']];
  h+=`<div class="srch sortm setm" style="left:${1424-200}px;top:47px;width:200px">${SET.map(x=>`<div class="it${x[3]==='sign'?' dgr':''}" data-act="${x[2]}" data-arg="${x[3]}"><span class="bx">${svg(x[0])}</span><span class="a t sb13">${esc(x[1])}</span></div>`).join('')}</div>`}
 if(G.qOpen){const q=(G.q||'').trim().toLowerCase();const hits=QUEUE.filter(k=>{const x=S[k];return !q||(x.order+' '+x.no+' '+x.cust.name+' '+x.restaurant+' '+x.subject).toLowerCase().includes(q)});
  h+=`<div class="srch">${hits.length?hits.map(k=>{const x=S[k];return `<div class="it" data-act="go" data-arg="${k}"><span class="bx">${svg('receipt')}</span><span class="a t sb13">${esc(x.order+' · '+x.subject.replace(' (marked delivered)',''))}</span><span class="b t r11 ink3">${esc(x.cust.name+' · '+x.restaurant)}</span></div>`}).join(''):`<span class="none t r12 ink3" style="position:static;padding:0 17px">No match in today’s orders</span>`}</div>`}
 /* finalised dropdown pattern (text-only variant): card = field width, radius 16, 11 padding, rows 44 with 6 inset + radius 10, text 13 SB black at 11 / 17 in the row, current value keeps the grey fill, 6 gap from the field, max 8 rows then scroll */
 if(G.dd&&DDS[G.dd]&&DDS[G.dd].list){const d=DDS[G.dd];let opts=d.groups?d.groups.flatMap(g=>g.opts).slice().sort((a,b)=>a.localeCompare(b,'en',{sensitivity:'base'})):(d.opts||[]); /* flat lists without group captions: current value first, then A → Z */
  if(d.groups&&d.val&&opts.includes(d.val))opts=[d.val].concat(opts.filter(o=>o!==d.val));const vis=Math.min(opts.length,8);const Hm=vis*44+22;const up=d.up||d.y+31+6+Hm>880;const top=up?d.y-6-Hm:d.y+31+6;
  h+=`<div class="srch ddl scroll" id="ddList" style="left:${d.x}px;top:${top}px;width:${d.w}px;height:${Hm}px">${opts.map(o=>`<div class="it${o===d.val?' on':''}" data-act="ddpick" data-arg="${esc(d.chg)}|${esc(o)}"><span class="a t sb13">${esc(o)}</span></div>`).join('')}</div>`}
 else if(G.dd&&DDS[G.dd]){const d=DDS[G.dd];const rows=[];if(d.groups)d.groups.forEach(g=>{rows.push({cap:g.g});g.opts.forEach(o=>rows.push({o}))});else(d.opts||[]).forEach(o=>rows.push({o}));
  const Hm=Math.min(rows.reduce((a,r)=>a+(r.cap?30:37),0)+12,420);const up=d.up||d.y+31+4+Hm>880;const top=up?d.y-4-Hm:d.y+31+4;
  h+=`<div class="menu ddm scroll" style="left:${d.x}px;top:${top}px;width:${d.w}px;height:${Hm}px">${rows.map(r=>r.cap?`<div class="ddcap"><span class="t caps ink3" style="position:static">${esc(r.cap)}</span></div>`:`<div class="ddrow${r.o===d.val?' on':''}" data-act="ddpick" data-arg="${esc(d.chg)}|${esc(r.o)}"><span class="t ${r.o===d.val?'m13':'r13'}" style="position:static">${esc(r.o)}</span>${r.o===d.val?`<span class="ic" style="position:static;width:14px;height:14px">${svg('check')}</span>`:''}</div>`).join('')}</div>`}
 if(toast)h+=`<div class="toast ${toastType||''}">${esc(toast)}</div>`;
 return h}

/* ================= render ================= */
function render(){const st=$('#stage');const keep={};['leftScroll','msgs','insScroll','pview','dockScroll','logList'].forEach(id=>{const e=document.getElementById(id);if(e)keep[id]=e.scrollTop});
 const fa=document.activeElement,faId=fa&&fa.id,sel=fa&&fa.selectionStart;
 let h=topbar();
 if(G.page==='home'||!A)h+=homePage()+sidebar();else{const s=cur();h+=sidebar()+leftColumn(s)+chatColumn(s)+insights(s)}
 h+=overlay()+menus();
 st.innerHTML=h;
 ['leftScroll','insScroll','pview','dockScroll','logList'].forEach(id=>{const e=document.getElementById(id);if(e&&keep[id]!=null)e.scrollTop=keep[id]});
 const m=document.getElementById('msgs');if(m){const s=cur();if(s&&s.stick){m.scrollTop=m.scrollHeight;s.stick=false}else if(keep.msgs!=null)m.scrollTop=keep.msgs}
 const d=document.getElementById('dockScroll');if(d&&cur()&&cur().dstick){d.scrollTop=d.scrollHeight;cur().dstick=false}
 const dl=document.getElementById('ddList');if(dl&&!dl.dataset.k){const on=dl.querySelector('.it.on');if(on&&on.offsetTop+44>dl.clientHeight)dl.scrollTop=on.offsetTop-dl.clientHeight/2+22}
 const sc=cur();if(sc&&sc.slide){const bs=document.getElementById('bstack');if(bs&&bs.animate)bs.animate([{transform:'translateY(-'+sc.slide+'px)'},{transform:'translateY(0)'}],{duration:320,easing:'cubic-bezier(.2,.7,.2,1)'});const gh=document.querySelector('.cbar.ghost');if(gh&&gh.animate)gh.animate([{transform:'translateY(0)',opacity:1},{transform:'translateY(58px)',opacity:0}],{duration:320,easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'});sc.slide=0}
 if(faId){const e=document.getElementById(faId);if(e&&!e.disabled){e.focus({preventScroll:true});if(sel!=null&&e.setSelectionRange)try{e.setSelectionRange(e.value.length,e.value.length)}catch(_){}}}}
