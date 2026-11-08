/* Agent Desk v7.1 prototype · engine (ported from iteration 6; policy values are the frozen v2.1 working set — Hypothetical / Borrowed, not Swiggy's published policy) */
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const rs=n=>'₹'+Number(n).toLocaleString('en-IN');
const T=s=>{const p=String(s).split(':').map(Number);return p[0]*60+p[1]};
const HM=m=>{m=Math.floor(((m%1440)+1440)%1440);return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0')};
const T0=Date.now();
const secs=()=>(Date.now()-T0)/1000;
function nowHM(){const c=S&&S[A];return HM(T((c&&c.nowBase)||'21:12')+secs()/60)}
const gst=x=>Math.round(x*GST_RATE);
const mmss=x=>{x=Math.max(0,Math.floor(Math.abs(x)));return Math.floor(x/60)+':'+String(x%60).padStart(2,'0')};
const ini=n=>n.split(/\s+/).map(w=>w[0]).join('').replace(/[^A-Za-z]/g,'').slice(0,2).toUpperCase();
const first=n=>n.split(' ')[0];

/* queue order and starting waits follow the approved Figma frame (SW-2041 35:00 · SW-2070 14:09 · SW-2063 12:09 · SW-2091 6:09 · SW-2078 4:09) */
const QUEUE=['S2','S8','S3','S5','S9'];
const WAIT0={S2:35*60+2,S8:14*60+37,S3:12*60+51,S5:6*60+18,S9:4*60+44}; /* varied seconds so the ticking timers don't read as one clock */

let S={},A=null,away=false,toast='',toastType='',toastT=null;
const G={page:'home',homeTab:0,q:'',qOpen:false,setOpen:false,ov:null,closedDemo:{n:8,avgS:700,ratings:6,ratingAvg:4.3,unrated:2},signedIn:'09:02',
 prefs:{lang:'English (US)',spelling:1,grammar:1,style:1,autocorrect:0,caps:0,domain:1,mixed:0,nums:1,theme:'Light',text:'Default',density:'Comfortable',motion:0}};

function beatsFor(k,p){const sp=SCRIPT[k]||{};let x=sp[p]||sp[1]||[];if(typeof x==='string')x=sp[x];return JSON.parse(JSON.stringify(x))}
function fresh(k){const b=JSON.parse(JSON.stringify(BASE[k]));
 Object.assign(b,{botSubject:b.subject,subjChanged:false,open:{tl:false,chg:false,ev:false},override:{},ovMenu:null,view:'chat',unread:0,preview:'',
  dec:null,part:[],fault:null,reason:'',decided:null,closing:null,closed:false,held:null,report:false,flags:{cust:null,rider:null,rest:null},flagDraft:{why:[],note:''},
  log:[],started:false,rsoe:'',rcalled:false,tAcc:0,tRun:null,agTyping:false,shelved:false,rdraft:'',sdraft:'',smsgs:[],stalk:false,coupon:{on:false,amt:''},ann:null,cfTry:false,
  draft:'',menu:null,ov:null,qUnread:k!=='S2'&&k!=='S3',waitAt:-(WAIT0[k]||0),openAt:0,stick:true,offline:!!b.offline,calls:{cust:null,rider:null,rest:null},agree:{},showTxn:false,
  path:1,beats:beatsFor(k,1),sc:0,playing:false,waitCall:false,rmsgs:[],rsel:null,rdone:false,rtyping:false,ropen:{},restCall:null,soe:'',dock:{rider:{open:false,tab:'chat'},rest:{open:false,tab:'chat'}},rrMenu:null,typing:false,callOpen:{},callGhost:null,
  pc:{cust:false,rider:false,rest:false}});
 return b}
function resetAll(){S={};ORDER.forEach(k=>S[k]=fresh(k))}
resetAll();
const cur=()=>A?S[A]:null;
function startChat(s){if(s.started)return;s.started=true;s.openAt=secs();s.tAcc=0;s.tRun=secs();log('Agent opened the case · chat timer started',s)}
function log(t,s){(s||cur()).log.push({at:nowHM(),t})}
/* toast types: '' neutral (grey) · 'ok' confirmation (green) · 'warn' caution (amber) · 'danger' alert (red) */
function say(t,type){toast=t;toastType=type||'';clearTimeout(toastT);toastT=setTimeout(()=>{toast='';render()},2600)}

/* ---------- facts and checks ---------- */
const itemsTotal=s=>s.items.reduce((a,i)=>a+i.p,0);
const fees=s=>s.fees.del+s.fees.pack;
const paid=s=>{const it=itemsTotal(s);return it+gst(it)+fees(s)+(s.tip||0)};
const orderValue=s=>{const it=itemsTotal(s);return it+gst(it)+fees(s)};
const affTotal=s=>s.items.filter(i=>i.aff).reduce((a,i)=>a+i.p,0);
const subj=s=>SUBJ[s.subject];
function fullValue(s){if(subj(s).range==='order')return orderValue(s);const a=affTotal(s)||itemsTotal(s);return a+gst(a)+fees(s)}
function rangeOf(s){const r=subj(s).range;if(!r)return null;return fullValue(s)}
function amt(s){
 if(!s.dec||s.dec==='review')return null;
 if(s.dec==='deny')return 0;
 if(s.dec==='full')return fullValue(s);
 if(s.dec==='partial'){if(!s.part.length)return s.coupon.on?0:null;return s.part.reduce((a,i)=>a+s.items[i].p,0)}
 return null}
const SN={met:'met',no:'not met',unk:'unknown',na:'N/A'};
const SL={met:'Met',no:'Not met',unk:'Unknown',na:'N/A'};
const agreedN=s=>s.photos.filter(p=>s.agree[p.id]==='agree').length;
function condsRaw(s){
 const out=[],a=amt(s),sj=subj(s),t=s.terms;
 out.push({id:'P1',nm:'Issue type',st:'met',f:s.subjChanged?'Changed by agent':'From bot',fl:s.subject+(s.subjChanged?' · changed by agent':' · from bot')});
 if(s.cod){const bf=T(s.complaint)<T(s.delivered);out.push({id:'P4',nm:'COD timing',st:bf?'met':'no',f:bf?'Reported before delivery':'Reported after delivery',fl:'Reported '+s.complaint+(bf?', before':', after')+' marked delivered '+s.delivered+(bf?'':' (cash already paid)')})}
 if(!sj.p5)out.push({id:'P5',nm:'Evidence',st:'na',f:'No photo required',fl:'No photo required for '+s.subject.toLowerCase()});
 else{const n=s.photos.length,ag=agreedN(s),dg=s.photos.filter(p=>s.agree[p.id]==='disagree').length,pl=n+' customer photo'+(n>1?'s':'');
  out.push({id:'P5',nm:'Evidence',st:!n?'no':ag?'met':dg===n?'no':'unk',f:!n?'No photo yet':ag?'Agreed on '+ag+' of '+n:dg===n?'Disagreed':'Not reviewed',fl:!n?'No customer photo yet':ag?pl+' · you agreed on '+ag:dg===n?pl+' · you disagreed with '+(n>1?'all':'it'):pl+' · not reviewed yet'})}
 let p6;
 if(t.type==='full')p6={st:'met',f:'Full refunds',fl:'Restaurant terms: full refunds'};
 else if(t.type==='none')p6={st:'no',f:'No refunds',fl:'Restaurant terms: no refunds · cost would fall on Swiggy'};
 else if(a==null)p6={st:'unk',f:'Cap '+rs(t.cap)+' · no amount yet',fl:'Terms: max '+rs(t.cap)+' per order · amount not chosen'};
 else p6=a<=t.cap?{st:'met',f:'Within cap '+rs(t.cap),fl:rs(a)+' within restaurant cap '+rs(t.cap)}:{st:'no',f:'Above cap '+rs(t.cap),fl:rs(a)+' is '+rs(a-t.cap)+' above restaurant cap '+rs(t.cap)};
 out.push(Object.assign({id:'P6',nm:'Restaurant terms'},p6));
 return out}
function conds(s){return condsRaw(s).map(c=>{const o=s.override[c.id];return o?Object.assign({},c,{orig:c.st,st:o.st,by:o.at}):c})}
const ORDST={met:0,no:1,unk:2,na:3};
function stepDeltas(s){const r=s.rider;let prev=0;return r.log.map((x,i)=>{const cum=T(x[1])-T(r.plan[i]),d=cum-prev;prev=cum;return d})}
const riderStageDelay=s=>{const d=stepDeltas(s);return d[2]+d[4]+d[5]};
function riderRulesRaw(s){const r=s.rider,out=[],rd=riderStageDelay(s);
 out.push({id:'R1',nm:'Delivered at address',st:r.loc<=100?'met':'no',f:'~'+r.loc+' m from drop',fl:'Rider ~'+r.loc+' m from drop address at marking · limit 100 m'});
 out.push({id:'R2',nm:'Called before unreachable',st:r.unreach?(r.contacts.length?'met':'no'):'na',f:r.unreach?r.contacts.length+' call'+(r.contacts.length===1?'':'s')+' logged':'Not reported unreachable',fl:r.unreach?r.contacts.length+' call(s) logged':'Rider did not report the customer unreachable'});
 out.push({id:'R3',nm:'Waited at door',st:r.unreach?'unk':'na',f:r.unreach?'Wait not recorded':'Not reported unreachable',fl:r.unreach?'Wait time not recorded':'Rider did not report the customer unreachable'});
 out.push({id:'R4',nm:'On time',st:rd<=10?'met':'no',f:(rd>0?'+'+rd:rd)+' min at rider steps',fl:'Delay added at rider steps '+(rd>0?'+'+rd:rd)+' min (from the activity log) · grace 10 min'});
 out.push({id:'R5',nm:'Incidents in time',st:r.incidents.length?(r.incidents.every(i=>T(i[0])<=T(s.delivered))?'met':'no'):'na',f:r.incidents.length?r.incidents.length+' logged before delivered':'No incidents',fl:r.incidents.length?r.incidents.length+' incident(s) logged before marked delivered':'No incidents logged'});
 return out}
function riderRules(s){return riderRulesRaw(s).map((x,i)=>{const o=s.override[x.id];return Object.assign({i},x,o?{orig:x.st,st:o.st,by:o.at}:{})}).sort((a,b)=>(+a.id.slice(1))-(+b.id.slice(1)))} /* rules listed in number order (R1, R2 …), like Policy checks */
function trigs(s){const t=[];const a=amt(s);
 if(a!=null&&a>500)t.push(['T1','High value '+rs(a)]);
 if(s.first)t.push(['T2','First-time customer']);
 if(s.conflict)t.push(['T4','Conflicting records']);
 return t}
function costLine(s){const c=costLine0(s);if(c&&!c.dim&&s.dec==='partial'&&s.coupon.on&&+s.coupon.amt>0)c.txt+=' · coupon '+rs(+s.coupon.amt)+' (Swiggy, Hypothetical)';return c}
function costLine0(s){const a=amt(s);
 if(!s.dec||s.dec==='review')return null;
 if(s.dec==='deny')return {txt:'No refund · no cost moved'};
 if(a==null)return null;
 if(!s.fault)return {txt:'Choose a fault to see who pays',dim:true};
 const t=s.terms;
 if(s.fault==='Restaurant'){
  if(t.type==='full')return {txt:'Restaurant '+rs(a)+' (terms: full refunds)'};
  if(t.type==='none')return {txt:'Swiggy '+rs(a)+' (restaurant terms: no refunds)'};
  return a<=t.cap?{txt:'Restaurant '+rs(a)+' (within cap '+rs(t.cap)+')'}:{txt:'Restaurant '+rs(t.cap)+' (agreed cap) · Swiggy '+rs(a-t.cap)+' (above cap)'}}
 return {txt:{Rider:'Delivery partner '+rs(a)+' (v1.3 mapping, Inferred)',Swiggy:'Swiggy '+rs(a),Customer:'Swiggy '+rs(a)+' (goodwill, Inferred)'}[s.fault]}}
function reasonsFor(s){if(!s.dec)return [];const R=REASONS[s.dec];return [...(s.fault&&R[s.fault]||[]),...R._,'Other (see audit trail)']}
const recSum={
 cust:s=>{const c=s.rec.cust,r=c.rows;return {up:c.up!=null?c.up:r.filter(x=>x[3].startsWith('Refunded')).length,raised:c.raised!=null?c.raised:r.length,tot:c.orders}},
 rider:s=>{const c=s.rec.rider,r=c.rows;return {up:c.up!=null?c.up:r.filter(x=>x[2]==='Liable').length,raised:c.raised!=null?c.raised:r.length,tot:c.total}},
 rest:s=>({up:s.rec.rest.upheld,raised:s.rec.rest.raised,tot:s.rec.rest.total})};
const rating=(s,k)=>{const g=k==='rider'?s.rec.rider.rating:s.rec.rest.rating;if(g!=null)return g;const x=recSum[k](s);const pct=x.tot?100*x.up/x.tot:0;return Math.max(1,Math.min(4.9,Math.round((5-0.62*pct)*10)/10))};
const packedT=s=>s.restv.kot.map(x=>(/(\d\d:\d\d)/.exec(x[1])||[])[1]).filter(Boolean).sort((a,b)=>T(a)-T(b)).pop()||s.restv.handover;
const LAB={cust:['Customer','Refunded','Raised','Orders'],rider:['Rider','Liable','Complaints','Deliveries'],rest:['Restaurant','Upheld','Complaints','Orders']};
const MON={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
const dayN=d=>{const m=/^(\d{1,2}) ([A-Z][a-z]{2})$/.exec(d||'');return m?Math.round(Date.UTC(2026,MON[m[2]],+m[1])/864e5):null};
function withDur(rows){const r=rows.slice().sort((a,b)=>(dayN(b[0])||0)-(dayN(a[0])||0));
 return r.map((x,i)=>{const a=dayN(x[0]),b=i+1<r.length?dayN(r[i+1][0]):null;return {row:x,dur:a!=null&&b!=null?'+'+(a-b):'–'}})}
const UP=o=>/^Refunded$|^Liable$|^Upheld$/.test(o)?1:/partial/.test(o)?0.5:0;

/* ---------- closing messages ---------- */
function findings(s){const F=FIND[s.key]||{};if(s.restCall&&F['r'+s.restCall.path])return F['r'+s.restCall.path];if(s.rsel&&F['d'+s.rsel])return F['d'+s.rsel];return F._||''}
const DENYTXT={'Evidence does not match':"what you've shared doesn't show the issue you reported",'Evidence is not enough to support the claim':"there isn't enough evidence to confirm the issue",'Customer-side cause (address, instructions, availability)':'the order was handed over as your delivery instructions asked','Evidence does not show the issue':"what you've shared doesn't show the issue",'Order records show it was delivered as ordered':'the order records show it was delivered as ordered','Substitution was agreed by the customer':'the replacement item was agreed with you'};
const WHY={'Records conflict':"Because the restaurant's account and what you've shared don't match",'Restaurant policy not met':"Because this refund falls outside the restaurant's agreed refund terms",'Amount above my approval limit':"Because this refund amount needs a senior colleague's approval",'Need more input from the restaurant or rider':"Because I need more input from the restaurant or the delivery partner"};
/* Closing sequence: the agent never sends more than two closing messages in a row; the customer answers in between.
   Groups are [agent lines], each followed by a short customer reply. Empty groups (and their reply) are skipped.
   Filler replies are scripted per case (tone follows each customer's chat) and are Hypothetical. */
const CFILL={S2:{find:'Okay.',amt:'Okay, thanks.',deny:"But it really wasn't what I ordered.",wait:'How long will that take?'},
 S8:{find:'Hmm, okay.',amt:'Fine, thanks.',deny:'Hmm.',wait:'How long will that take?'},
 S3:{find:'Okay.',amt:'Okay, thank you.',deny:"That's not what happened.",wait:'How long will this take?'},
 S5:{find:'Hmm.',amt:'Fine.',deny:'Seriously?',wait:'How long?'},
 S9:{find:'Okay.',amt:'Alright.',deny:'Hmm.',wait:'How long will that take?'}};
/* ---------- decision announcement (before Confirm) ----------
   Picking an action (with a fault, or Send Review) loads a draft that tells the customer what the agent is doing.
   The customer replies with a scripted filler (Hypothetical). On pushback the agent says the decision is final
   (accept it, or it can go to someone else for review); the customer then answers. The decision never changes,
   and none of this blocks Confirm. [agree?, first reply, reply after "this is final"] */
const ANN={
 S2:{full:[1,'Okay, thank you.'],partial:[0,'Only the curry? The whole meal was ruined.','No, it is fine. Go ahead.'],deny:[0,"But it really wasn't what I ordered.","Fine. Just close it."],review:[1,'Okay.']},
 S8:{full:[1,'Okay, thanks.'],partial:[1,'Okay, fine.'],deny:[0,'The vadas never came. How is that my fault?','No. Just leave it.'],review:[0,"Why can't you just sort it now?",'Okay, I will wait.']},
 S3:{full:[1,'Okay. Thank you.'],partial:[0,'Partial? I got nothing at all.','Fine, go ahead.'],deny:[0,"That's not what happened. I never got the food.",'No, forget it.'],review:[0,'How long will this take?','Okay.']},
 S5:{full:[1,'Fine.'],partial:[1,'Hmm, okay.'],deny:[0,'Seriously? It was inedible.','Whatever. Close it.'],review:[1,'Okay.']},
 S9:{full:[1,'Alright, thanks.'],partial:[1,'Okay, that works.'],deny:[0,'It came over an hour late.','Fine.'],review:[1,'Alright.']}};
const affOf=s=>s.items.filter(i=>i.aff).map(i=>i.n.replace(/ \(.*\)$/,'').toLowerCase()).join(' and ');
/* partial refund: the affected items are understood, so they are always included */
const partIdx=s=>{const PI=s.items.map((i,k)=>[i,k]).filter(x=>x[0].aff);return (PI.length?PI:s.items.map((i,k)=>[i,k])).map(x=>x[1])};
/* what still blocks Confirm: a fault (shown at once), then a reason (shown only after Confirm is tried) */
const decNeed=s=>!s.dec?'dec':(s.dec!=='review'&&!s.fault)?'fault':!s.reason?'reason':'';
function annText(s){const n=first(s.cust.name),a=amt(s),cp=+s.coupon.amt>0?+s.coupon.amt:0;
 const why={Restaurant:'the restaurant made an error with your order',Rider:'the delivery partner made an error with your order',Swiggy:'this was an error on our side',Customer:"what we've checked doesn't show an error with the order"}[s.fault]||"of what we've checked";
 if(s.dec==='review')return `${n}, I'm passing your case to a senior colleague for a second review, with everything we've discussed.`;
 if(s.dec==='full')return `${n}, since ${why}, I'm going ahead with a full refund of ${rs(a)}.`;
 if(s.dec==='partial')return `${n}, since ${why}, I'm going ahead with a partial refund of ${rs(a)} for the ${affOf(s)}${cp?`, plus a ${rs(cp)} coupon for your next order`:''}.`;
 return `${n}, ${s.fault==='Customer'?"what we've checked doesn't show an error with the order, so":"based on what we've checked,"} I'm not able to offer a refund on this order.`}
function pushText(s){const n=first(s.cust.name);
 if(s.dec==='review')return `I understand, ${n}. The records don't match, so this can't be decided in chat; a senior colleague has to check it. You'll get an update in the app.`;
 return `I understand, ${n}. This is the final decision based on what we have, and I can't change it here. You can accept it, or I can send your case to someone else for review.`}
const annKey=s=>s.dec+'|'+(s.fault||'')+'|'+(+s.coupon.amt||0);
function syncAnn(s){if(s.closed||s.decided||s.closing)return;
 const ready=s.dec&&(s.dec==='review'||s.fault);const A0=s.ann;
 if(A0&&(A0.stage==='wait'||A0.stage==='pwait'))return;
 if(!ready){if(A0&&A0.stage==='draft'){if(s.draft===A0.gen)s.draft='';s.ann=null}return}
 const k=annKey(s);if(A0&&A0.stage!=='draft'&&A0.key.split('|')[0]===s.dec&&A0.key.split('|')[1]===(s.fault||''))return;
 const t=annText(s);if(!A0||A0.stage!=='draft'||s.draft===A0.gen||!s.draft.trim())s.draft=t;
 const fresh=!A0||A0.stage!=='draft';s.ann={stage:'draft',gen:t,key:k};if(fresh){s.view='chat';s.stick=true;log('Decision message loaded in the Customer chat',s)}}
function annSent(s){const st=s.ann.stage,R=(ANN[s.key]||{})[s.dec]||[1,'Okay.'];s.ann.stage=st==='draft'?'wait':'pwait';
 log(st==='draft'?'Decision explained to the customer':'Told the customer the decision is final',s);
 setTimeout(()=>{s.typing=true;render();setTimeout(()=>{s.typing=false;s.msgs.push({w:'cu',t:st==='draft'?R[1]:(R[2]||'Okay.'),at:nowHM()});s.stick=true;s.qUnread=s!==cur();
  if(st==='draft'&&!R[0]&&!s.closing&&!s.closed){s.ann.stage='push';if(!s.draft.trim())s.draft=pushText(s);log('Customer pushed back · decision unchanged',s)}else s.ann.stage='done';render()},1500)},300)}
function closingMsgs(s,d){const n=first(s.cust.name),a=d.amount,pay=s.pay.replace(/Prepaid \((.*)\)/,'$1'),F=findings(s),ak=ACK[s.key]||{},fl=CFILL[s.key]||{find:'Okay.',amt:'Okay, thanks.',deny:'Hmm.',wait:'How long will that take?'};
 const aff=s.items.filter(i=>i.aff).map(i=>i.n.replace(/ \(.*\)$/,'').toLowerCase()).join(' and ');
 const seq=groups=>{const out=[];groups.forEach(([lines,reply])=>{const L=lines.filter(Boolean);if(!L.length)return;out.push(...L);if(reply)out.push({c:reply})});return out};
 if(d.type==='review'&&s.flags.cust)return seq([
  [[`${n}, I've noted your concern about the ${aff}, along with everything shared in this chat and on the call.`,
    `Your issue has been carried forward to a senior team for review. You'll get an update in the app.`],ak.review||'Ok.'],
  [[`I'm closing this chat now. Take care, ${n}.`]]]);
 if(d.type==='full'||d.type==='partial'){const sorry={Rider:"I'm sorry this happened. We've shared the details with the delivery team so it is less likely to happen again.",Restaurant:"I'm sorry this happened. We've shared the details with the restaurant so it is less likely to happen again.",Swiggy:"I'm sorry your order reached you late and cold.",Customer:"I'm sorry for the trouble."}[d.fault]||"I'm sorry this happened.";
  return seq([
  [[`Thank you for your patience, ${n}. I've checked your order and everything you shared.`,F],fl.find],
  [[a?`I've processed a refund of ${rs(a)}${d.type==='full'?(subj(s).range==='order'?' for the whole order, including taxes and charges':' for the '+aff+', including taxes and charges'):' for the '+d.items.map(x=>x.replace(/^\d+ × /,'').toLowerCase()).join(' and ')}. It will reach your ${pay} account in 3–5 working days.`:'',
    d.coupon?`I've also added a ${rs(d.coupon)} coupon to your account for your next order.`:''],fl.amt],
  [[sorry,`Is there anything else I can help you with today?`],ak.refund||"No, that's all. Thanks."],
  [[`You're welcome, ${n}. I'm closing this chat now. Take care!`]]])}
 if(d.type==='deny')return seq([
  [[`Thank you for your patience, ${n}. I've checked the order records and what you shared.`,F],fl.find],
  [[`Because ${DENYTXT[d.reason]||'of this'}, I'm not able to process a refund for this order.`],fl.deny],
  [[`If you have anything more to share, you can raise it again from Help in the app.`,`Is there anything else I can help you with?`],ak.deny||'Ok.'],
  [[`I understand, ${n}. I'm closing this chat now. Take care.`]]]);
 return seq([
  [[`Thank you for your patience, ${n}.`,F],fl.find],
  [[`${WHY[d.reason]||'To make sure this is handled correctly'}, I've passed your case to a senior colleague for a second review, with everything we discussed.`],fl.wait],
  [[`You'll get an update in the app once the review is done.`,`Is there anything else I can help you with in the meantime?`],ak.review||'No. Please make sure it gets sorted.'],
  [[`I will, ${n}. I'm closing this chat now. Take care.`]]])}

/* ---------- timers ---------- */
const STD_SECS=300;
const elapsed=s=>(s.tAcc||0)+(s.tRun!=null?secs()-s.tRun:0);
function pauseT(s){if(s.tRun!=null){s.tAcc=(s.tAcc||0)+secs()-s.tRun;s.tRun=null}}
function runT(s){if(s.tRun==null&&s.started&&!s.closed)s.tRun=secs()}
const callT=c=>mmss(secs()-c.start);
function wait(k){const s=S[k];if(s.closed)return '✓';const w=Math.max(0,secs()-s.waitAt);return Math.floor(w/60)+':'+String(Math.floor(w%60)).padStart(2,'0')}
const tgtOf=s=>s.view==='rider'?'rider':s.view==='rest'?'rest':'cust';
const draftOf=s=>({cust:s.draft,rider:s.rdraft,rest:s.sdraft})[tgtOf(s)]||'';
const activeCall=s=>['cust','rider','rest'].find(w=>s.calls[w]);
const isPrio=s=>!!s.prio&&!s.closed;
/* Chat / Transcription dock rule: it exists for a party only after a finished call or a message with that party.
   First message → dock appears expanded on Chat. Call ended → Transcription selected; a dock that appears for the first time stays collapsed. */
const hasContact=(s,w)=>w==='rest'?!!(s.restCall||s.smsgs.length):!!(s.rsel||s.rmsgs.length||s.rcalled);
function dockOnChat(s,w){const d=s.dock[w];d.tab='chat';d.open=true;s.dstick=true}
function dockOnCall(s,w,existed){const d=s.dock[w];d.tab='trans';if(!existed)d.open=false}
const curFlag=s=>s.flags[tgtOf(s)];
const ratingCol=r=>r>=4?'ok':r>=3?'warn':'danger'; /* Hypothetical bands: ≥4.0 good, 3.0–3.9 average, <3.0 poor */
const hmTxt=m=>m>=60?Math.floor(m/60)+'h '+String(m%60).padStart(2,'0')+'m':m+'m';
const heldTxt=k=>{const s=S[k];if(!s.held)return '—';const x=Math.max(0,Math.floor(secs()-s.held.t0));return Math.floor(x/60)+'m '+String(x%60).padStart(2,'0')+'s'};
const SORTS=[['time-desc','Time · longest wait first'],['time-asc','Time · shortest wait first'],['az','Issue type · A → Z'],['za','Issue type · Z → A'],['prio','Priority first']];
G.sort='time-desc';G.sortOpen=false;
function sortRows(rows){const w=r=>r.k?S[r.k].waitAt:0,sj=r=>(r.t1||'').split(' · ')[1]||'';const by={'time-desc':(a,b)=>w(a)-w(b),'time-asc':(a,b)=>w(b)-w(a),az:(a,b)=>sj(a).localeCompare(sj(b)),za:(a,b)=>sj(b).localeCompare(sj(a)),prio:(a,b)=>((b.pr?1:0)-(a.pr?1:0))||w(a)-w(b)}[G.sort];return by?rows.slice().sort(by):rows}
const queueList=()=>QUEUE.filter(k=>!S[k].shelved);
function shelfList(){return SHELF.map(x=>Object.assign({demo:true},x)).concat(ORDER.filter(k=>S[k].shelved).map(k=>({k,no:S[k].no,subject:S[k].subject,by:S[k].held?S[k].held.by:'—',since:S[k].held?S[k].held.at:''})))}

/* ---------- script engine ---------- */
function decide(s){const a=amt(s);const lab={full:'Full refund',partial:'Partial refund',deny:'Deny',review:'Sent to review'}[s.dec];
 const cl=costLine(s);const items=s.dec==='partial'?s.part.map(i=>s.items[i].q+' × '+s.items[i].n):s.items.filter(i=>i.aff).map(i=>i.q+' × '+i.n);
 s.decided={type:s.dec,label:lab,amount:a,fault:s.fault,cost:cl&&!cl.dim?cl.txt:'',reason:s.reason,at:nowHM(),items,coupon:s.dec==='partial'&&s.coupon.on?+s.coupon.amt:0};
 log('Decision: '+lab+(a?' '+rs(a):'')+(s.decided.coupon?' + coupon '+rs(s.decided.coupon):'')+(s.fault?' · fault '+s.fault:'')+' · reason: '+s.reason+' · conditions '+conds(s).map(c=>c.id+' '+SN[c.st]).join(', '),s);
 if(s.dec==='review')log('Audit trail attached for reviewer'+(s.flags.cust?' · includes report: '+s.flags.cust.why:''),s)}
function gateOK(s,g){return g==='rest'?!!s.restCall:g==='rider'?!!(s.rsel&&s.rdone):true}
function resolveGate(s){const b=s.beats[s.sc];if(b&&b.gate&&gateOK(s,b.gate)){const key=b.gate==='rest'?s.restCall.path:s.rsel;const br=b.then[key]||b.then[Object.keys(b.then)[0]];s.beats.splice(s.sc,1,...JSON.parse(JSON.stringify(br)));log('Customer chat continues: tell the customer what the '+(b.gate==='rest'?'restaurant':'rider')+' said',s)}}
function atGate(s){const b=s.beats[s.sc];return b&&b.gate&&!gateOK(s,b.gate)?b.gate:null}
function scriptDone(s){resolveGate(s);return s.sc>=s.beats.length&&!s.playing&&!s.waitCall}
function pickPath(s){if(s.key!=='S2'||s.sc!==0)return;const n=s.photos.length,dg=s.photos.filter(p=>s.agree[p.id]==='disagree').length,p=n&&dg===n?2:1;if(p!==s.path){s.path=p;s.beats=beatsFor('S2',p);log('Chat follows your photo review',s)}}
function restPath(s){const ag=agreedN(s),dg=s.photos.filter(p=>s.agree[p.id]==='disagree').length;
 if(s.key==='S2')return ag&&!dg?1:ag&&dg?3:2;if(s.key==='S8')return ag&&!dg?2:1;return 1}
function restLines(s,p){const R0=RCALL[s.key]||{};let L=R0[p]||R0[1]||[];if(typeof L==='string')L=R0[L];return L}
function startRestChat(s){const p=restPath(s),L=restLines(s,p);let i=0;s.stalk=false;dockOnChat(s,'rest');log('Chat with restaurant started',s);
 const step=()=>{const l=L[i++];if(!l){s.stalk=false;s.restCall={via:'chat',path:p,at:nowHM(),lines:L};log('Chat with restaurant finished · Subject of Error unlocked',s);render();return}
  if(l[0]==='Agent')setTimeout(()=>{s.smsgs.push({w:'ag',t:l[1],at:nowHM()});s.dstick=true;render();step()},600);
  else{s.stalk=true;s.dstick=true;render();setTimeout(()=>{s.stalk=false;s.smsgs.push({w:'rs',t:l[1],at:nowHM()});s.dstick=true;render();step()},1400)}};
 s.stalk=true;step()}
function nextAg(s){resolveGate(s);const b=s.beats[s.sc];return b&&b.a!=null?b.a:null}
function play(s){if(s.playing)return;s.playing=true;
 const step=()=>{const b=s.beats[s.sc];const fn=first(s.cust.name);
  if(!b||b.a!=null||b.call||b.gate){s.playing=false;s.typing=false;if(b&&b.call&&!s.waitCall){s.waitCall=true;log('Customer asked for a call',s)}render();return}
  if(b.c!=null){s.typing=true;render();setTimeout(()=>{s.typing=false;s.msgs.push({w:'cu',t:b.c,at:nowHM()});s.stick=true;s.qUnread=s!==cur();if(s.view!=='chat'){s.unread++;s.preview=b.c}if(s.held){log('Customer replied while held · hold ended · timer resumes',s);s.held=null;runT(s)}s.sc++;step()},1500)}
  else if(b.off){setTimeout(()=>{s.offline=true;s.msgs.push({w:'sys',t:fn+' went offline',at:nowHM()});log('Customer went offline',s);s.stick=true;s.sc++;step()},900)}
  else if(b.on){setTimeout(()=>{s.offline=false;s.msgs.push({w:'sys',t:fn+' is back online',at:nowHM()});if(s.held){s.held=null;runT(s);log('Customer back online · hold ended · timer resumes',s)}else log('Customer back online',s);s.stick=true;s.sc++;step()},1100)}
  else{s.sc++;step()}};
 setTimeout(step,450)}
function playRider(s,beats){let i=0;
 const step=()=>{const b=beats[i++];if(!b){s.rtyping=false;s.rdone=true;log('Rider chat finished',s);render();return}
  if(b.a!=null){setTimeout(()=>{s.rmsgs.push({w:'ag',t:b.a,at:nowHM()});s.dstick=true;render();step()},600)}
  else{s.rtyping=true;s.dstick=true;render();setTimeout(()=>{s.rtyping=false;s.rmsgs.push({w:'rd',t:b.r,at:nowHM()});s.dstick=true;render();step()},1400)}};
 step()}
function sendText(s,t){const tg=tgtOf(s);
 if(tg==='rider'){const first=!hasContact(s,'rider');s.rmsgs.push({w:'ag',t,at:nowHM()});s.rdraft='';if(first||s.dock.rider.tab!=='chat')dockOnChat(s,'rider');log('Message to rider',s);return}
 if(tg==='rest'){const first=!hasContact(s,'rest');s.smsgs.push({w:'ag',t,at:nowHM()});s.sdraft='';if(first||s.dock.rest.tab!=='chat')dockOnChat(s,'rest');log('Message to restaurant',s);return}
 const isAnn=!s.closing&&!!s.ann&&(s.ann.stage==='draft'||s.ann.stage==='push');
 if(!s.closing&&!isAnn)pickPath(s);
 const wasScript=!s.closing&&!isAnn&&nextAg(s)!=null;
 s.msgs.push({w:'ag',t,at:nowHM()});
 s.typing=false;s.draft='';s.stick=true;
 if(s.held){log('Hold ended: agent replied · timer resumes',s);s.held=null;runT(s)}
 if(s.closing){const L=s.closing.list;s.closing.i++;log('Sent closing message',s);const nx=L[s.closing.i];
  if(nx==null)closeTicket(s);
  else if(typeof nx==='object'){s.closing.wait=true;s.typing=true;setTimeout(()=>{s.typing=false;s.msgs.push({w:'cu',t:nx.c,at:nowHM()});s.closing.i++;s.closing.wait=false;s.draft=L[s.closing.i]||'';s.stick=true;s.qUnread=s!==cur();render()},1500)}
  else s.draft=nx}
 if(isAnn)annSent(s);
 if(wasScript){s.sc++;play(s)}}
function closeTicket(s){s.closed=true;pauseT(s);s.closedAt=nowHM();s.closing=null;s.draft='';s.rdraft='';s.sdraft='';s.ann=null; /* a closed ticket keeps no unsent drafts */log('Ticket closed after the customer replied',s);
 if(s.decided.type==='full'||s.decided.type==='partial'){s.report=true;log('Report sent to restaurant Partner app (restaurant-relevant facts only)',s)}
 G.closedDemo.n++;G.closedDemo.avgS=((G.closedDemo.avgS*(G.closedDemo.n-1))+elapsed(s))/G.closedDemo.n;
 say('Ticket closed · '+s.no,'ok')}
/* Hypothetical filler rows so the records pop-up lists every complaint in the 90-day total (real rows first, generated ones older) */
const MONN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function genRows(s,k,real){const C=recSum[k](s);const need=C.raised-real.length;if(need<=0)return real;let seed=0;for(const ch of s.key+k)seed=(seed*31+ch.charCodeAt(0))>>>0;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 const types=k==='rider'?['Late delivery','Not delivered (marked delivered)','Damaged or spilled','Rider conduct']:['Missing item','Wrong item','Late delivery','Quality or taste','Damaged or spilled','Customisation not followed','Inadequate quantity'];
 const upReal=real.filter(r=>UP(k==='cust'?r[3]:r[2])>=1).length;let upLeft=Math.max(0,C.up-upReal);const anchor=dayN(s.date.replace(/^\w+ /,''))||Math.round(Date.UTC(2026,9,8)/864e5);
 const out=[];const days=[];for(let i=0;i<need;i++)days.push(anchor-1-Math.floor(rnd()*88));days.sort((a,b)=>b-a);
 for(let i=0;i<need;i++){const d=new Date(days[i]*864e5);const date=d.getUTCDate()+' '+MONN[d.getUTCMonth()];const type=types[Math.floor(rnd()*types.length)];const up=upLeft>0&&rnd()<(upLeft/(need-i));if(up)upLeft--;
  if(k==='cust')out.push([date,type,up?'₹'+(60+Math.floor(rnd()*6)*30):'—',up?(rnd()<0.25?'Refunded (partial)':'Refunded'):'Not upheld']);else if(k==='rider')out.push([date,type,up?'Liable':'Not liable']);else out.push([date,type,up?'Upheld':'Not upheld'])}
 return real.concat(out)}
