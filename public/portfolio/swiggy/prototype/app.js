/* Agent Desk v7.1 prototype · actions, events, timers, boot */
const ACT={
 home(){G.page='home';G.qOpen=false;G.setOpen=false;const s=cur();if(s){s.menu=null;s.ov=null}},
 htab(i){G.homeTab=+i;G.sortOpen=false},
 analytics(){say('Analytics · next phase')},
 planned(){say('Planned for next phase')},
 setp(k){G.setOpen=false;say({report:'Report a problem',lead:'Contact team lead'}[k]+' · next phase')},
 pref(k){G.prefs[k]=G.prefs[k]?0:1},
 prefc(arg){const [k,v]=arg.split('|');G.prefs[k]=v},
 setaway(v){const want=v==='1';if(away!==want)ACT.away()},
 dd(id){G.dd=G.dd===id?null:id},
 ddpick(arg){const i=arg.indexOf('|');const chg=arg.slice(0,i),v=arg.slice(i+1);G.dd=null;applyChange(chg,v)},
 callopen(i){const s=cur();s.callOpen[i]=!s.callOpen[i]},
 cspk(){const s=cur(),w=activeCall(s);if(!w)return false;const c=s.calls[w];c.spk=!c.spk;log('Call audio on '+(c.spk?'speaker':'ear-piece'))},
 sortm(){G.sortOpen=!G.sortOpen},
 sort(k){G.sort=k;G.sortOpen=false;say('Sorted · '+SORTS.find(x=>x[0]===k)[1].split(' · ')[0])},
 rowmenu(k){say('Planned for next phase')},
 evopen(){const s=cur();if(!s.photos.length)return false;s.ov={t:'ev',i:0};log('Opened photo 1 of '+s.photos.length)},
 go(k){if(!S[k])return;const c=cur();if(c){c.ov=null;c.menu=null}A=k;const s=S[k];s.qUnread=false;s.stick=true;s.ov=null;G.page='case';G.q='';G.qOpen=false;G.setOpen=false;if(s.shelved){s.shelved=false;log('Opened from the Shelf · back in Active chats',s)}startChat(s)},
 shelf(){G.page='home';G.homeTab=2;G.qOpen=false;G.setOpen=false},
 settings(){G.setOpen=!G.setOpen;G.qOpen=false},
 away(){away=!away;say(away?'Status · Away':'Status · Online',away?'warn':'ok')},
 ov(t){G.setOpen=false;G.qOpen=false;if(['book','keys','sign','profile','appearance','chatset','help'].includes(t)){G.ov={t};return}const s=cur();if(!s){say('Open a chat first','warn');return}
  if(t.startsWith('rec:')){s.ov={t:'rec',k:t.slice(4)};log('Opened interaction history: '+{cust:'customer',rider:'rider',rest:'restaurant'}[t.slice(4)]);return}
  if(t==='flag'){const w=tgtOf(s);if(s.flags[w]){s.flags[w]=null;log('Report removed for the '+{cust:'customer',rider:'rider',rest:'restaurant'}[w]);say('Report removed');return}s.flagDraft={why:[],note:''}}
  s.ov={t};if(t==='log')log('Opened the audit trail')},
 rectab(k){const s=cur();if(s.ov&&s.ov.t==='rec')s.ov.k=k},
 close(){G.ov=null;G.setOpen=false;G.qOpen=false;const s=cur();if(!s)return;s.ov=null;s.menu=null;s.ovMenu=null;s.rrMenu=null},
 scrim(_,el,e){if(e.target===el){ACT.close();return}return false},
 signout(){G.ov=null;say('Shift ended (prototype)','danger')},
 view(v){const s=cur();s.view=v;s.menu=null;if(v==='chat'){s.unread=0;s.preview='';s.stick=true}else log('Opened '+(v==='rider'?'Rider':'Restaurant')+' view')},
 dock(i){const s=cur();const who=s.view==='rider'?'rider':'rest';if(!hasContact(s,who))return false;const d=s.dock[who];d.tab=+i===1?'trans':'chat';d.open=true},
 dockopen(){const s=cur();const who=s.view==='rider'?'rider':'rest';if(!hasContact(s,who))return false;const d=s.dock[who];d.open=!d.open},
 tog(k){const s=cur();if(k==='pr'){s.open.prClosed=!s.open.prClosed;return}s.open[k]=!s.open[k]},
 pc(k){const s=cur();s.pc[k]=!s.pc[k];if(s.pc[k])log('Opened '+{cust:'customer',rider:'rider',rest:'restaurant'}[k]+' interaction history inline')},
 racc(k){const s=cur();s.ropen[k]=!accOpen(s,k)},
 txn(){const s=cur();s.showTxn=!s.showTxn;log(s.showTxn?'Viewed payment transaction ID':'Hid payment transaction ID')},
 ev(i){const s=cur();s.ov={t:'ev',i:Math.max(0,Math.min(s.photos.length-1,+i||0))};log('Opened photo '+(s.ov.i+1)+' of '+s.photos.length)},
 evnav(d){const s=cur();if(!s.ov||s.ov.t!=='ev')return false;const j=Math.max(0,Math.min(s.photos.length-1,s.ov.i+(+d)));if(j===s.ov.i)return false;s.ov.i=j},
 evgo(j){const s=cur();if(!s.ov||s.ov.t!=='ev')return false;s.ov.i=+j},
 agree(arg){const s=cur();const [id,v]=arg.split('|');const ph=s.photos.find(p=>p.id===id);
  if(s.agree[id]===v){delete s.agree[id];log('Cleared '+v+' on photo "'+ph.label+'"')}
  else{s.agree[id]=v;log((v==='agree'?'Agreed':'Disagreed')+' that photo "'+ph.label+'" shows: '+s.subject);
   if(v==='agree'&&s.ov&&s.ov.t==='ev'&&s.ov.i<s.photos.length-1){const at=s.ov.i;setTimeout(()=>{if(s.ov&&s.ov.t==='ev'&&s.ov.i===at){s.ov.i++;render()}},500)}}},
 ovmenu(id){const s=cur();s.ovMenu=s.ovMenu===id?null:id},
 rrmenu(id){const s=cur();s.rrMenu=s.rrMenu===id?null:id},
 setov(arg){const s=cur();const [id,v]=arg.split(':');const raw=(id[0]==='R'?riderRulesRaw(s):condsRaw(s)).find(c=>c.id===id);const was=(s.override[id]||{}).st||raw.st;
  if(v!==was){if(v===raw.st)delete s.override[id];else s.override[id]={st:v,at:nowHM()};log(id+' changed by agent: '+SN[was]+' → '+SN[v])}},
 menu(m){const s=cur();s.menu=s.menu===m?null:m},
 tpl(id){const s=cur();s.draft=(s.draft?s.draft+' ':'')+TPL[id];s.menu=null;log('Inserted template for '+id);setTimeout(()=>{const t=$('#ta');t&&t.focus()})},
 ta(){const s=cur();if(s.closed||draftOf(s).trim())return false;
  if(s.view==='rider'){if(s.rsel)return false;const L=RSCRIPT[s.key]||[];if(!L.length)return false;if(L.length===1){ACT.rsc(L[0].id);return}s.menu=s.menu==='rider'?null:'rider';return}
  if(s.view==='rest'){if(s.restCall||s.stalk||s.calls.rest)return false;startRestChat(s);return}
  if(s.closing)return false;
  if(!s.playing&&!s.agTyping){pickPath(s);const a=nextAg(s);if(a!=null){s.agTyping=true;s.stick=true;setTimeout(()=>{s.agTyping=false;sendText(s,a);log('Scripted line sent',s);render()},900);return}}
  return false},
 rsc(id){const s=cur();const x=(RSCRIPT[s.key]||[]).find(r=>r.id===id);if(!x)return;s.rsel=id;s.menu=null;dockOnChat(s,'rider');log('Rider chat started: '+x.label);playRider(s,x.beats)},
 send(){const s=cur();const t=draftOf(s).trim();if(!t){if(ACT.ta()===false)say('Type a message first','danger');return}sendText(s,t);if(s.view!=='chat')s.dstick=true},
 call(who){const s=cur();who=who||'cust';const nm={cust:'customer',rider:'rider',rest:'restaurant'}[who];
  if(s.calls[who]){const dur=callT(s.calls[who]);log('Call with '+nm+' ended ('+dur+')');const ended=s.calls[who];s.calls[who]=null;s.lastCallDur=dur;s.callGhost={w:who,c:Object.assign({},ended,{ghost:false,endedAt:dur})};setTimeout(()=>{if(s.callGhost){s.callGhost=null;s.slide=58;render()}},500);
   if(who==='rest'){const existed=hasContact(s,'rest');const p=restPath(s);s.restCall={via:'call',path:p,dur,at:nowHM(),lines:restLines(s,p)};s.smsgs.push({w:'call',who:'restaurant',dur,at:nowHM(),lines:s.restCall.lines});dockOnCall(s,'rest',existed);log('Call record added to the restaurant chat · transcript ready · Subject of Error unlocked')}
   if(who==='rider'){const existed=hasContact(s,'rider');s.rmsgs.push({w:'call',who:'rider',dur,at:nowHM()});s.rcalled=true;dockOnCall(s,'rider',existed);log('Rider Subject of Error unlocked')}
   if(who==='cust'){const b=s.beats[s.sc];if(s.waitCall&&b&&b.call){s.msgs.push({w:'call',who:'customer',dur,at:nowHM(),lines:b.call});s.waitCall=false;s.sc++;s.stick=true;play(s)}else s.msgs.push({w:'call',who:'customer',dur,at:nowHM()})}}
  else{if(activeCall(s))return false;s.calls[who]={start:secs(),vol:3,mute:false,hold:false};log('Call started with '+nm+' · recording')}
  if(who==='cust')s.stick=true;else s.dstick=true},
 cmute(){const s=cur(),w=activeCall(s);if(!w)return false;const c=s.calls[w];c.mute=!c.mute;log('Call '+(c.mute?'muted':'unmuted'))},
 chold(){const s=cur(),w=activeCall(s);if(!w)return false;const c=s.calls[w];c.hold=!c.hold;log('Call '+(c.hold?'put on hold':'resumed'))},
 cvol(){const s=cur(),w=activeCall(s);if(!w)return false;const c=s.calls[w];c.vol=c.vol%3+1},
 holdask(){const s=cur();if(s.decided||s.closed)return false;s.ov={t:'hold'}},
 hold(p){const s=cur();if(!s.ov||s.ov.t!=='hold')return false;s.ov.sel=p;render();setTimeout(()=>{pauseT(s);s.held={by:p,at:nowHM(),t0:secs()};s.ov=null;log('Put on hold · responsible for delay: '+p+' (agent record only)');say('Held · waiting on '+p,'warn');render()},260);return false},
 resume(){const s=cur();s.held=null;runT(s);log('Hold ended by agent (Resume) · timer continues from '+mmss(elapsed(s)));say('Resumed · '+s.no,'ok')},
 flagpick(p){const s=cur();const w=(s.flagDraft.why||[]).slice();const i=w.indexOf(p);if(i>=0)w.splice(i,1);else w.push(p);s.flagDraft=Object.assign({},s.flagDraft,{why:w})},
 flagdo(){const s=cur();const fd=s.flagDraft||{};if(!(fd.why||[]).length)return;const w=tgtOf(s);s.flags[w]={why:fd.why.join(', '),note:(fd.note||'').trim(),at:nowHM()};s.ov=null;log({cust:'Customer',rider:'Rider',rest:'Restaurant'}[w]+' conduct reported: '+s.flags[w].why+(s.flags[w].note?' · note: '+s.flags[w].note:''));say('Report recorded','danger')},
 fault(f){const s=cur();s.fault=s.fault===f?null:f;if(!reasonsFor(s).includes(s.reason))s.reason='';syncAnn(s)},
 dec(d){const s=cur();s.dec=s.dec===d?null:d;if(s.dec==='partial')s.part=partIdx(s);else{s.part=[];s.coupon={on:false,amt:''}}s.reason='';s.cfTry=false;syncAnn(s)},
 part(k){const s=cur();k=+k;s.part=s.part.includes(k)?s.part.filter(x=>x!==k):[...s.part,k]},
 cpn(){const s=cur();s.coupon={on:!s.coupon.on,amt:s.coupon.on?'':s.coupon.amt};if(s.coupon.on)setTimeout(()=>{const x=$('#cpnamt');x&&x.focus()})},
 cancel(){const s=cur();s.dec=null;s.part=[];s.reason='';s.fault=null;s.coupon={on:false,amt:''};s.cfTry=false;syncAnn(s)},
 confirm(){const s=cur();if(decNeed(s)){s.cfTry=true;return}s.coupon.on=+s.coupon.amt>0;decide(s);say('Decision recorded · '+s.decided.label,'ok')},
 closeYes(){const s=cur();s.held=null;const list=closingMsgs(s,s.decided);s.closing={list,i:0,wait:false};s.draft=list[0];s.view='chat';s.stick=true;log('Closing messages loaded ('+list.filter(x=>typeof x==='string').length+')');setTimeout(()=>{const t=$('#ta');t&&t.focus()})},
 reopen(){const s=cur();log(s.closed?'Ticket reopened (demo)':'Decision changed (reopened)');if(s.closed){G.closedDemo.n=Math.max(8,G.closedDemo.n-1)}Object.assign(s,{ann:null,cfTry:false,decided:null,dec:null,part:[],reason:'',fault:null,closed:false,closing:null,report:false,draft:'',coupon:{on:false,amt:''}});runT(s)}
};
const stage=$('#stage');
stage.addEventListener('click',e=>{
 const a=e.target.closest('[data-act]');const act=a?a.dataset.act:null;
 const was=[G.setOpen,G.qOpen,G.sortOpen,G.dd,cur()&&cur().menu,cur()&&cur().ovMenu,cur()&&cur().rrMenu].join();
 if(act!=='settings'&&!e.target.closest('.menu,.setm'))G.setOpen=false;
 if(act!=='sortm'&&act!=='sort')G.sortOpen=false;
 if(act!=='dd'&&act!=='ddpick'&&!e.target.closest('.ddm'))G.dd=null;
 if(!e.target.closest('.search')&&!e.target.closest('.srch'))G.qOpen=false;
 const s=cur();if(s){if(!['menu','tpl','rsc','send'].includes(act)&&!e.target.closest('.rmenu')&&e.target.id!=='ta')s.menu=null;if(act!=='ovmenu'&&act!=='setov')s.ovMenu=null;if(act!=='rrmenu'&&act!=='setov')s.rrMenu=null}
 if(e.target.id==='ta'){if(ACT.ta()!==false)render();else if(was!==[G.setOpen,G.qOpen,G.sortOpen,G.dd,s&&s.menu,s&&s.ovMenu,s&&s.rrMenu].join())render();return}
 if(!a){if(was!==[G.setOpen,G.qOpen,G.sortOpen,G.dd,s&&s.menu,s&&s.ovMenu,s&&s.rrMenu].join())render();return}
 if(a.tagName==='LABEL'||a.closest('label')&&act==='part'){e.preventDefault()}
 const fn=ACT[act];if(!fn){render();return}if(fn(a.dataset.arg,a,e)===false){if(was!==[G.setOpen,G.qOpen,G.sortOpen,G.dd,s&&s.menu,s&&s.ovMenu,s&&s.rrMenu].join())render();return}render()},true);
function applyChange(c,v){if(c==='lang'){G.prefs.lang=v;return}const s=cur();if(!s)return;
 if(c==='reason')s.reason=v;
 if(c==='soe'){s.soe=v;log('Subject of Error recorded: '+(s.soe||'cleared'))}
 if(c==='rsoe'){s.rsoe=v;log('Rider Subject of Error recorded: '+(s.rsoe||'cleared'))}
 if(c==='subject'){const old=s.subject;s.subject=v;s.subjChanged=s.subject!==s.botSubject;s.override={};log('Subject changed: '+old+' → '+s.subject+' (conditions re-run)');if(SUBJ[s.subject].route)log('Rider conduct: case routed to the safety team for the conduct part')}}
stage.addEventListener('change',e=>{const el=e.target;const c=el.dataset.chg;if(!c||!cur())return;applyChange(c,el.value);render()});
stage.addEventListener('input',e=>{const s=cur();const id=e.target.id;
 if(id==='hq'){G.q=e.target.value;G.qOpen=true;G.setOpen=false;render();return}
 if(!s)return;
 if(id==='ta'){const v=e.target.value;if(s.view==='rider')s.rdraft=v;else if(s.view==='rest')s.sdraft=v;else s.draft=v;return}
 if(id==='cpnamt'){s.coupon.amt=e.target.value;const g=s.ann&&s.ann.stage==='draft'&&s.draft===s.ann.gen;syncAnn(s);const t=$('#ta');if(g&&t&&tgtOf(s)==='cust')t.value=s.draft;return}
 if(id==='flagnote'){s.flagDraft.note=e.target.value;const fd=s.flagDraft,b=stage.querySelector('[data-act="flagdo"]');if(b)b.disabled=!((fd.why||[]).length&&(!(fd.why||[]).includes('Other')||fd.note.trim()))}});
stage.addEventListener('mousemove',e=>{const w=e.target.closest('.pvw .img');if(!w)return;const img=w.querySelector('img');if(!img)return;const r=w.getBoundingClientRect();const x=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*100,y=Math.max(0,Math.min(1,(e.clientY-r.top)/r.height))*100;img.style.transformOrigin=x+'% '+y+'%';img.style.transform='scale(2.2)'});
stage.addEventListener('mouseout',e=>{const w=e.target.closest('.pvw .img');if(!w||w.contains(e.relatedTarget))return;const img=w.querySelector('img');if(img)img.style.transform=''});
stage.addEventListener('focusin',e=>{if(e.target.id==='hq'){G.qOpen=true;render()}});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'){G.dd=null;ACT.close();render();return}
 if((e.metaKey||e.ctrlKey)&&(e.key==='k'||e.key==='K')){e.preventDefault();G.qOpen=true;render();const h=$('#hq');h&&h.focus();return}
 if(e.altKey&&(e.key==='ArrowDown'||e.key==='ArrowUp')){e.preventDefault();const L=queueList();const i=Math.max(0,L.indexOf(A));ACT.go(L[(i+(e.key==='ArrowDown'?1:L.length-1))%L.length]);render();return}
 if(!cur()||G.page==='home')return;
 if(e.altKey&&['1','2','3'].includes(e.key)){e.preventDefault();ACT.view({1:'chat',2:'rider',3:'rest'}[e.key]);render()}
 if(e.altKey&&(e.key==='l'||e.key==='L')){e.preventDefault();ACT.ov('log');render()}
 if(cur().ov&&cur().ov.t==='ev'&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){e.preventDefault();ACT.evnav(e.key==='ArrowLeft'?-1:1);render();return}
 if(e.key==='Enter'&&document.activeElement&&document.activeElement.id==='ta'){e.preventDefault();ACT.send();render()}});
/* one-second tick: timers only, no re-render */
setInterval(()=>{document.querySelectorAll('[data-wait]').forEach(el=>{el.textContent=wait(el.dataset.wait)});document.querySelectorAll('[data-held]').forEach(el=>{el.textContent=heldTxt(el.dataset.held)});
 const s=cur();if(!s)return;const c=document.querySelector('[data-clock]');if(c){const el=elapsed(s);c.textContent=mmss(el);if(el>=STD_SECS&&!s.closed&&!c.classList.contains('warn')){c.classList.add('warn')}}
 document.querySelectorAll('[data-call]').forEach(el=>{const cc=s.calls[el.dataset.call];if(cc)el.textContent=callT(cc)})},1000);
/* fit the 1440×900 stage to the viewport */
function fit(){const w=innerWidth,h=innerHeight;const k=Math.min(w/1440,h/900);stage.style.transform='scale('+k+')';stage.style.left=Math.round((w-1440*k)/2)+'px';stage.style.top=Math.round((h-900*k)/2)+'px'}
addEventListener('resize',fit);fit();
/* demo bar */
const demo=document.createElement('div');demo.className='demo';demo.innerHTML='<span class="dstrip"><span class="demo-note">Prototype · Agent Desk v7.1 · frozen policy v2.1 (Hypothetical / Borrowed) · 5 scripted cases</span><button class="db" data-demo="reset">Reset all five chats</button><button class="db" data-demo="one">Reset this chat</button></span><button class="dtog" data-demo="tog" title="Prototype controls">⋯</button>';
document.body.appendChild(demo);
demo.addEventListener('click',e=>{const b=e.target.closest('[data-demo]');if(!b)return;if(b.dataset.demo==='tog'){demo.classList.toggle('open');return}if(b.dataset.demo==='reset'){resetAll();A=null;G.page='home';G.homeTab=0;render();say('All chats reset');render()}else{if(!A){say('Open a chat first');render();return}S[A]=fresh(A);S[A].qUnread=false;startChat(S[A]);render();say('Chat reset');render()}});
render();
if(document.fonts&&document.fonts.load){Promise.all(['400 13px Inter','500 13px Inter','600 13px Inter'].map(f=>document.fonts.load(f))).then(()=>render()).catch(()=>{})}
