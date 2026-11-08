/* Agent Desk v7.1 prototype · data. Taken unchanged from the iteration-6 prototype (owner's five fictional cases, frozen policy v2.1). */
const GST_RATE=0.05; // 5% GST on restaurant food sold through a delivery platform [Law]

/* Subject list (spec §9). p5 = photo required (P5). range: 'item' = affected items + GST, 'order' = whole order incl. fees, null = no published threshold. */
const SUBJECTS=[
 ['Items','Missing item',{p5:true,range:'item',liable:'Restaurant',tags:['Item absent','Bag/seal intact','Bill shows item']}],
 ['Items','Wrong item',{p5:true,range:'item',liable:'Restaurant',tags:['Different dish','Wrong variant (veg/non-veg, size)']}],
 ['Items','Customisation not followed',{p5:true,range:'item',liable:'Restaurant',tags:['Instruction ignored','Add-on missing']}],
 ['Items','Inadequate quantity',{p5:true,range:'item',liable:'Restaurant',tags:['Short portion','Container under-filled']}],
 ['Quality','Quality or taste',{p5:true,range:'item',liable:'Restaurant',tags:['Cold','Undercooked/burnt','Stale']}],
 ['Quality','Hygiene / foreign object',{p5:true,range:'item',liable:'Restaurant',tags:['Foreign object','Hygiene concern']}],
 ['Packaging','Damaged or spilled',{p5:true,range:'item',liable:'Delivery partner or Swiggy',tags:['Spillage','Container broken','Bag torn']}],
 ['Packaging','Tampered / unsealed',{p5:true,range:'item',liable:'Delivery partner or Swiggy',tags:['Seal broken','Seal missing']}],
 ['Delivery','Not delivered (marked delivered)',{p5:false,range:'order',liable:'Delivery partner or Swiggy'}],
 ['Delivery','Late delivery',{p5:false,range:null,liable:'Delivery partner or Swiggy'}],
 ['Delivery','Delivered to wrong address',{p5:false,range:'order',liable:'Delivery partner (customer if the address was entered wrong)'}],
 ['Delivery','Rider conduct',{p5:false,range:null,liable:'Delivery partner',route:true}],
 ['Payment','Charged, order not placed / charged twice',{p5:false,range:'order',liable:'Swiggy'}],
 ['Payment','Refund for earlier issue not received',{p5:false,range:null,liable:'Swiggy'}],
 ['Payment','Offer or coupon not applied',{p5:false,range:null,liable:'Swiggy'}],
 ['Cancellation','Cancelled by restaurant or Swiggy',{p5:false,range:'order',liable:'Whoever cancelled'}],
 ['Cancellation','Cancellation fee dispute',{p5:false,range:null,liable:'Depends on who cancelled'}]
];
const SUBJ=Object.fromEntries(SUBJECTS.map(r=>[r[1],r[2]]));
const ORIGINAL6=['Missing item','Wrong item','Quality or taste','Damaged or spilled','Not delivered (marked delivered)','Late delivery'];

const HANDBOOK=[
 ['P1','Issue type is in the Subject list','Published types + Borrowed structure'],
 ['P2','Default liability per issue type · shown only in the P1 "i" detail','Published + Borrowed'],
 ['P4','Cash on delivery: reported before marked delivered','Published'],
 ['P5','At least one customer photo (items, quality, packaging subjects)','Hypothetical'],
 ['P6','Within the restaurant\'s agreed refund terms (Full / Partial up to ₹X per order / None)','Owner · Hypothetical'],
 ['P7','Amount within range: affected items + their GST; whole order for non-delivery','Owner'],
 ['P8','Up to ₹500 without review','Hypothetical'],
 ['R1','Marked delivered within 100 m of the drop address','Hypothetical'],
 ['R2','At least 1 in-app call before reporting the customer unreachable','Borrowed (Uber) · call logs Reported'],
 ['R3','Waited at least 7 min at the door before ending the delivery','Borrowed (Uber) · value Hypothetical'],
 ['R4','Rider stages within promised time + 10 min','Hypothetical'],
 ['R5','In-transit incidents reported before marking delivered','Hypothetical'],
 ['T1','Refund above ₹500','Borrowed'],['T2','First-time customer','Borrowed'],['T4','Rider record and customer claim disagree','Hypothetical'],
 ['—','Removed in v2.0: P3 claim window and T3 late filing (the 24 h limit is now an upstream gate)','Owner']
];

/* Templates: only offered for conditions that are not met or unknown (spec §10). */
const TPL={
 P1:'Could you tell me a little more about what went wrong with the order?',
 P4:'Could you confirm whether you paid the delivery partner in cash?',
 P5:'Could you share a clear photo of the item you received, with the bag or bill if you still have it?',
 P6:'I\'m confirming how the refund for this order can be handled. Please give me a moment.',
 P7:'Could you tell me which items were affected, so I refund the right amount?',
 P8:'This refund needs a quick second review. You\'ll hear from us in the app.'
};

const TPL_ONLY={P8:'no'}; // P8's template only fits once the limit is actually exceeded

/* Reason options change with Fault x Action (spec §1). */
const REASONS={
 full:{_:['Evidence supports the claim','Customer clarified in chat'],Restaurant:['Photo shows the issue in the restaurant\'s item','Kitchen order and photo do not match'],Rider:['Trip record supports the claim'],Swiggy:['Platform or payment error'],Customer:['Goodwill refund despite a customer-side cause']},
 partial:{_:['Only part of the order was affected','Refund limited to the affected items'],Restaurant:['Restaurant delay or item issue, part of order'],Rider:['Part of the order damaged in transit'],Swiggy:['Partial platform error'],Customer:['Goodwill partial refund']},
 deny:{_:['Evidence does not show the issue','Order records show it was delivered as ordered'],Customer:['Customer-side cause (address, instructions, availability)'],Restaurant:['Substitution was agreed by the customer'],Rider:[],Swiggy:[]},
 review:{_:['A review trigger fired','Records conflict','Amount above my approval limit','Need more input from the restaurant or rider']}
};

/* ---------- five fictional chats ---------- */
const BASE={
S2:{key:'S2',code:'WI',no:'#2041',order:'SW-2041',date:'Thu 8 Oct',placed:'19:32',restaurant:'Tandoor House',pay:'Prepaid (UPI)',cod:false,first:false,
 cust:{name:'Aman K.',phone:'+91 ••••• ••427'},
 items:[{n:'Paneer butter masala',q:1,p:240,aff:true},{n:'Butter naan',q:2,p:110}],fees:{del:30,pack:15},
 delivered:'20:21',complaint:'20:29',
 tl:[['Placed','19:32'],['Accepted','19:34'],['Prepared','19:52'],['Picked up','19:58'],['Marked delivered','20:21']],
 photos:[{id:'p1',label:'Dish received',sub:'21:09',origin:'Sent in afterwards'}],
 gaps:['Only evidence: 1 customer photo.','Customer photo sent 40 min after the complaint.'],
 rec:{cust:{orders:7,rows:[['14 Sep','Wrong item','₹180','Refunded'],['20 Sep','Late delivery','—','Not upheld'],['29 Aug','Missing item','₹90','Refunded'],['05 Aug','Missing item','—','Not upheld'],['02 Aug','Quality or taste','₹120','Refunded (partial)']],older:[['11 Jun','Missing item','₹60','Refunded']]},
  rider:{name:'Vikram D.',id:'R-118',total:412,rows:[['19 Sep','Damaged or spilled','Liable'],['03 Sep','Late delivery','Not liable']],older:[]},
  rest:{total:1860,rows:[['06 Oct','Wrong item','Upheld'],['01 Oct','Wrong item','Upheld'],['27 Sep','Wrong item','Not upheld']],raised:12,upheld:9,older:[['Jun–Jul','7 wrong-item complaints · 5 upheld','—']]}},
 bot:{at:'20:37',picked:'Wrong item',said:'"I ordered paneer butter masala but got a different curry."',offered:'25% coupon on next order (20:34) · declined'},
 subject:'Wrong item',
 msgs:[{w:'sys',t:'Riya joined',at:'21:03'},{w:'ag',t:"Hi Aman, I'm Riya from Swiggy support. I've read your chat with the bot.",at:'21:03'},{w:'ag',t:'Could you share a photo of the dish you received?',at:'21:05'},{w:'cu',t:'Ok one sec',at:'21:08'},{w:'cu',photo:'p1',at:'21:09'},{w:'cu',t:'This is what came. Not what I ordered.',at:'21:09'}],
 typing:true,replies:["It was some other curry. I don't eat chicken.",'Ok, thank you.'],wait:8*60,reply:192,
 rider:{log:[['Assigned','19:40'],['Accepted','19:41'],['Reached restaurant','19:50'],['Picked up','19:58'],['Reached drop','20:19'],['Marked delivered','20:21']],loc:15,promised:'20:25',stages:'Restaurant prep +3 min · pickup wait 8 min · en route 21 min (planned 22)',riderDelay:-1,contacts:[],incidents:[],unreach:false},
 restv:{accepted:'19:34',est:15,actual:18,handover:'19:58',kot:[['1 × Paneer butter masala','Marked packed 19:51'],['2 × Butter naan','Marked packed 19:51']],instr:'"Less spicy"',subs:[]},
 terms:{type:'full',agreed:'12 Jan 2026'},conflict:false,
 star:{c:'#1882 · 2 Oct',dec:'Full refund · ₹189',fault:'Restaurant',reason:'Photo shows the issue in the restaurant\'s item',msg:"I've refunded ₹189 for the dish that was wrong, including its GST. It will reach your UPI account in 3–5 working days.",fair:4,qa:'12 Oct'}},

S5:{key:'S5',code:'WI',no:'#2057',order:'SW-2057',date:'Thu 8 Oct',placed:'20:02',restaurant:'Wok Express',pay:'Prepaid (card)',cod:false,first:false,
 cust:{name:'Farhan S.',phone:'+91 ••••• ••903'},
 items:[{n:'Chilli paneer (dry)',q:1,p:300,aff:true},{n:'Veg fried rice',q:1,p:180}],fees:{del:25,pack:20},
 delivered:'20:40',complaint:'20:46',
 tl:[['Placed','20:02'],['Accepted','20:03'],['Prepared','20:18'],['Picked up','20:22'],['Marked delivered','20:40']],
 photos:[{id:'p1',label:'Dish received',sub:'20:47',origin:'Sent in bot'},{id:'p2',label:'Bill',sub:'20:59',origin:'Sent in chat'}],
 gaps:['2 customer photos, both sent after the complaint.'],
 rec:{cust:{orders:9,rows:[['21 Sep','Missing item','₹40','Refunded']],older:[]},
  rider:{name:'Sana M.',id:'R-342',total:290,rows:[],older:[]},
  rest:{total:1240,rows:[['03 Oct','Wrong item','Upheld'],['22 Sep','Wrong item','Not upheld']],raised:7,upheld:5,older:[]}},
 bot:{at:'20:49',picked:'Wrong item',said:'"Got gobi manchurian instead of chilli paneer."',offered:'20% coupon (20:48) · declined'},
 subject:'Wrong item',
 msgs:[{w:'cu',photo:'p1',at:'20:47'},{w:'sys',t:'Riya joined',at:'20:58'},{w:'ag',t:"Hi Farhan, I'm Riya. I can see the photo you shared with the bot.",at:'20:58'},{w:'cu',photo:'p2',at:'20:59'},{w:'cu',t:'How long will this take?',at:'21:06'}],
 typing:false,replies:['I never agreed to any replacement.','Ok, thanks.'],wait:400,reply:140,
 rider:{log:[['Assigned','20:08'],['Accepted','20:08'],['Reached restaurant','20:17'],['Picked up','20:22'],['Reached drop','20:38'],['Marked delivered','20:40']],loc:22,promised:'20:42',stages:'Restaurant prep on estimate · pickup wait 5 min · en route 16 min (planned 17)',riderDelay:-1,contacts:[],incidents:[],unreach:false},
 restv:{accepted:'20:03',est:15,actual:15,handover:'20:22',kot:[['1 × Gobi manchurian (replacing Chilli paneer)','Marked packed 20:17'],['1 × Veg fried rice','Marked packed 20:17']],instr:'None',subs:[['Chilli paneer (dry)','Marked out of stock 20:05','Replaced with Gobi manchurian','Customer consent: not recorded']]},
 terms:{type:'partial',cap:250,agreed:'3 Mar 2026'},conflict:false,
 star:{c:'#1915 · 4 Oct',dec:'Full refund · ₹315',fault:'Restaurant',reason:'Kitchen order and photo do not match',msg:"I've refunded ₹315 for the item that was replaced without your agreement. It will reach your card in 5–7 working days.",fair:5,qa:'9 Oct'}},

S3:{key:'S3',code:'ND',no:'#2063',order:'SW-2063',date:'Thu 8 Oct',placed:'20:05',restaurant:'Hyderabadi Handi',pay:'Prepaid (card)',cod:false,first:false,
 cust:{name:'Neha R.',phone:'+91 ••••• ••215'},
 items:[{n:'Chicken biryani (family)',q:1,p:450,aff:true},{n:'Mirchi ka salan',q:1,p:80,aff:true},{n:'Double ka meetha',q:1,p:80,aff:true}],fees:{del:35,pack:20},
 delivered:'20:52',complaint:'20:58',
 tl:[['Placed','20:05'],['Accepted','20:06'],['Prepared','20:24'],['Picked up','20:31'],['Marked delivered','20:52']],
 photos:[],gaps:['No customer photo (not required for non-delivery).','Only system record: marked delivered 20:52, 40 m from the address.'],
 rec:{cust:{orders:22,rows:[],older:[]},
  rider:{name:'Imran H.',id:'R-207',total:388,rows:[['30 Sep','Not delivered','Liable'],['12 Sep','Not delivered','Not liable'],['28 Aug','Late delivery','Not liable']],older:[['22 May','Not delivered','Liable']]},
  rest:{total:2900,rows:[['04 Oct','Quality or taste','Upheld'],['25 Sep','Missing item','Not upheld']],raised:6,upheld:4,older:[]}},
 bot:{at:'21:00',picked:'Order not received',said:'"App says delivered but I never got anything."',offered:'Nothing offered (non-delivery goes to an agent)'},
 subject:'Not delivered (marked delivered)',
 msgs:[{w:'sys',t:'Riya joined',at:'21:00'},{w:'ag',t:"Hi Neha, I'm Riya. I'm checking the delivery record now.",at:'21:01'},{w:'cu',t:'Nobody came to my door. I was home the whole time.',at:'21:02'}],
 typing:false,replies:['The gate guard also says no one came.','Ok.'],wait:195,reply:260,
 rider:{log:[['Assigned','20:12'],['Accepted','20:13'],['Reached restaurant','20:22'],['Picked up','20:31'],['Reached drop','20:50'],['Marked delivered','20:52']],loc:40,promised:'20:50',stages:'Restaurant prep −2 min · pickup wait 9 min · en route 19 min (planned 18)',riderDelay:2,contacts:[['20:50','In-app call to customer','Not answered · 25 s']],incidents:[],unreach:false},
 restv:{accepted:'20:06',est:20,actual:18,handover:'20:31',kot:[['1 × Chicken biryani (family)','Marked packed 20:23'],['1 × Mirchi ka salan','Marked packed 20:23'],['1 × Double ka meetha','Marked packed 20:24']],instr:'"Extra raita"',subs:[]},
 terms:{type:'full',agreed:'20 Nov 2025'},conflict:true,
 star:{c:'#1712 · 26 Sep',dec:'Sent to review',fault:'—',reason:'Records conflict',msg:"Because the delivery record and your account don't match, a senior colleague will review this and update you in the app.",fair:4,qa:'30 Sep'}},

S8:{key:'S8',code:'MI',no:'#2070',order:'SW-2070',date:'Thu 8 Oct',placed:'20:10',restaurant:'Dosa Corner',pay:'Prepaid (UPI)',cod:false,first:false,
 cust:{name:'Kiran P.',phone:'+91 ••••• ••588'},
 items:[{n:'Masala dosa',q:1,p:160,aff:true},{n:'Filter coffee',q:2,p:120}],fees:{del:25,pack:10},
 delivered:'20:50',complaint:'20:55',
 tl:[['Placed','20:10'],['Accepted','20:11'],['Prepared','20:28'],['Picked up','20:33'],['Marked delivered','20:50']],
 photos:[{id:'p1',label:'Bag contents',sub:'20:55',origin:'Sent in bot'}],
 gaps:['Only evidence: 1 customer photo.'],
 rec:{cust:{orders:12,rows:[['18 Aug','Late delivery','₹50','Refunded (partial)'],['02 Sep','Quality or taste','—','Not upheld']],older:[]},
  rider:{name:'Prakash N.',id:'R-511',total:150,rows:[],older:[]},
  rest:{total:980,rows:[['29 Sep','Missing item','Upheld'],['14 Sep','Missing item','Upheld'],['02 Aug','Missing item','Not upheld']],raised:3,upheld:2,older:[]}},
 bot:{at:'20:58',picked:'Missing item',said:'"The dosa is missing, only the coffee came."',offered:'25% coupon (20:57) · declined'},
 subject:'Missing item',
 msgs:[{w:'cu',photo:'p1',at:'20:55'},{w:'sys',t:'Riya joined',at:'21:01'},{w:'ag',t:"Hi Kiran, I'm Riya. I've seen your photo and I'm checking the order records.",at:'21:02'},{w:'cu',t:'Only the coffee came. The bag was stapled shut.',at:'21:04'}],
 typing:false,replies:['So what happens now?','Ok.'],wait:50,reply:280,
 rider:{log:[['Assigned','20:15'],['Accepted','20:15'],['Reached restaurant','20:26'],['Picked up','20:33'],['Reached drop','20:48'],['Marked delivered','20:50']],loc:10,promised:'20:52',stages:'Restaurant prep +2 min · pickup wait 7 min · en route 15 min (planned 16)',riderDelay:-1,contacts:[],incidents:[],unreach:false},
 restv:{accepted:'20:11',est:15,actual:17,handover:'20:33',kot:[['1 × Masala dosa','Marked packed 20:30'],['2 × Filter coffee','Marked packed 20:27']],instr:'"Extra sambar"',subs:[]},
 terms:{type:'none',agreed:'8 Jul 2026'},conflict:false,
 star:{c:'#1874 · 2 Oct',dec:'Full refund · ₹168',fault:'Restaurant',reason:'Photo shows the issue in the restaurant\'s item',msg:"I've refunded ₹168 for the missing dosa, including its GST. It will reach your UPI account in 3–5 working days.",fair:3,qa:'7 Oct'}},

S9:{key:'S9',code:'LD',no:'#2078',order:'SW-2078',date:'Thu 8 Oct',placed:'20:00',restaurant:'Burger Point',pay:'Prepaid (UPI)',cod:false,first:false,
 cust:{name:'Rohit V.',phone:'+91 ••••• ••770'},
 items:[{n:'Classic burger',q:2,p:320,aff:true},{n:'Peri peri fries',q:1,p:100,aff:true}],fees:{del:30,pack:15},
 delivered:'21:05',complaint:'21:07',
 tl:[['Placed','20:00'],['Accepted','20:01'],['Prepared','20:35'],['Picked up','20:36'],['Marked delivered','21:05']],
 photos:[],gaps:['No customer photo (not required for late delivery).'],
 rec:{cust:{orders:30,rows:[['10 Sep','Late delivery','₹60','Refunded (partial)'],['22 Aug','Missing item','—','Not upheld']],older:[]},
  rider:{name:'Deepak S.',id:'R-466',total:520,rows:[['15 Sep','Late delivery','Not liable']],older:[]},
  rest:{total:3100,rows:[['05 Oct','Late delivery','Upheld'],['28 Sep','Late delivery','Upheld'],['20 Sep','Quality or taste','Not upheld']],raised:9,upheld:6,older:[]}},
 bot:{at:'21:08',picked:'Late delivery',said:'"Order came 35 minutes late."',offered:'Nothing offered'},
 subject:'Late delivery',
 msgs:[{w:'sys',t:'Riya joined',at:'21:08'},{w:'ag',t:"Hi Rohit, I'm Riya. I'm sorry your order was late. I'm looking at what happened.",at:'21:08'},{w:'cu',t:'35 minutes late. I want compensation.',at:'21:09'},{w:'ag',t:'Could you tell me if anything in the order was affected, for example cold or spilled?',at:'21:10'},{w:'sys',t:'Rohit went offline',at:'21:10'}],
 typing:false,replies:['Sorry, network issue. The burgers were cold.','Ok.'],wait:240,reply:150,offline:true,
 rider:{log:[['Assigned','20:08'],['Accepted','20:09'],['Reached restaurant','20:18'],['Picked up','20:36'],['Reached drop','21:03'],['Marked delivered','21:05']],loc:20,promised:'20:30',stages:'Restaurant prep +16 min · pickup wait 18 min · en route 27 min (planned 23)',riderDelay:4,contacts:[],incidents:[['20:52','Road closure reported','Route changed']],unreach:false},
 restv:{accepted:'20:01',est:18,actual:34,handover:'20:36',kot:[['2 × Classic burger','Marked packed 20:34'],['1 × Peri peri fries','Marked packed 20:35']],instr:'None',subs:[]},
 terms:{type:'full',agreed:'1 Feb 2026'},conflict:false,
 star:{c:'#1840 · 30 Sep',dec:'Partial refund · ₹105',fault:'Restaurant',reason:'Restaurant delay or item issue, part of order',msg:"I've refunded ₹105 towards the fries and part of the delay. It will reach your UPI account in 3–5 working days.",fair:4,qa:'5 Oct'}}
};
const ORDER=['S2','S5','S3','S8','S9'];

/* ===== third iteration additions =====
   plan  = planned time per activity-log step [Hypothetical]; the log shows (+N) red if later, (−N) green if earlier.
   locs  = rider distance in metres at each location step (restaurant for reached/picked up, drop address for reached drop/marked delivered); null = no location for that step.
   parties = the star case's own party records [raised, upheld, total], compared with the current case. */
const EXTRA3={
 S2:{plan:['19:40','19:41','19:48','19:55','20:20','20:25'],locs:[null,null,12,8,25,15],parties:{cust:[4,3,8],rider:[4,2,500],rest:[11,8,1700]}},
 S5:{plan:['20:08','20:09','20:18','20:20','20:37','20:42'],locs:[null,null,10,6,30,22],parties:{cust:[2,1,15],rider:[0,0,310],rest:[9,5,1300]}},
 S3:{plan:['20:12','20:13','20:21','20:28','20:46','20:50'],locs:[null,null,14,9,35,40],parties:{cust:[1,0,18],rider:[3,1,400],rest:[2,1,1500]},call:95},
 S8:{plan:['20:15','20:16','20:25','20:30','20:47','20:52'],locs:[null,null,5,7,12,10],parties:{cust:[6,4,10],rider:[0,0,200],rest:[3,2,900]}},
 S9:{plan:['20:08','20:09','20:17','20:19','20:28','20:30'],locs:[null,null,18,11,24,20],parties:{cust:[2,1,25],rider:[1,0,480],rest:[8,6,2800]}}
};
Object.keys(EXTRA3).forEach(k=>{const x=EXTRA3[k],b=BASE[k];b.rider.plan=x.plan;b.rider.locs=x.locs;b.star.parties=x.parties;if(x.call)b.call=x.call});

/* ===== fourth iteration additions (owner's change list, 17 Oct 2026) =====
   photos: id, label, at (time sent), src (Camera / Gallery, Hypothetical data), via (bot / chat).
   tip: amount the customer tipped the rider at checkout (0 = none). Tip is never part of a refund.
   txn: payment transaction reference (fictional). collected: time the customer collected the order (null = not collected). */
const EXTRA4={
 S2:{photos:[{id:'p2',label:'Dish received',at:'20:31',src:'Camera',via:'bot'},{id:'p3',label:'Bill',at:'20:32',src:'Gallery',via:'bot'},{id:'p1',label:'Dish close-up',at:'21:09',src:'Gallery',via:'chat'}],tip:20,txn:'UPI ref 4821 9930 1127',collected:'20:20'},
 S5:{photos:[{id:'p1',label:'Dish received',at:'20:47',src:'Camera',via:'bot'},{id:'p2',label:'Bill',at:'20:59',src:'Gallery',via:'chat'}],tip:0,txn:'Card txn 7Y2K-88QD-14',collected:'20:39'},
 S3:{photos:[],tip:25,txn:'Card txn 3M9P-20LX-77',collected:null},
 S8:{photos:[{id:'p1',label:'Bag contents',at:'20:55',src:'Camera',via:'bot'}],tip:0,txn:'UPI ref 5530 1874 0042',collected:'20:49'},
 S9:{photos:[],tip:30,txn:'UPI ref 6612 0457 9831',collected:'21:04'}
};
Object.keys(EXTRA4).forEach(k=>{const x=EXTRA4[k],b=BASE[k];Object.assign(b,x);});
/* No prototype scenario uses a stock / substitution change (owner, 17 Oct). */
BASE.S5.restv.subs=[];BASE.S5.restv.kot[0]=['1 × Chilli paneer (dry)','Marked packed 20:17'];

/* ===== fifth iteration (owner's scenario list, 19 Oct 2026) =====
   Only what the owner's scenarios state, or what follows directly from them, changes. All orders and people stay fictional. */

/* P7 and P8 retired from Policy Conditions (owner, 17 Oct): they only changed after Fault and the action were picked. */
HANDBOOK.splice(HANDBOOK.findIndex(r=>r[0]==='P7'),2);
HANDBOOK.splice(HANDBOOK.length-1,0,['—','Retired in v2.1: P7 amount in range and P8 approval limit (they only change after Fault and the action are picked)','Owner · 17 Oct']);
delete TPL.P7; delete TPL.P8;

/* Reasons the five scripted paths need (added to the existing lists, nothing removed) */
REASONS.full.Restaurant.push('Restaurant confirmed the error on call');
REASONS.full.Rider.push('Rider confirmed the order was not handed over');
REASONS.deny.Customer.push('Evidence does not match','Evidence is not enough to support the claim');
REASONS.review._.push('Customer flagged for inappropriate conduct');

/* Subject of Error: recorded by the agent after the call with the restaurant (Restaurant view, under Agreed refund terms) */
const SOE=['Wrong dish packed','Wrong variant packed','Item not packed','Order swapped with another order','No error found by restaurant'];

/* ---------- S2 · Wrong item ---------- */
Object.assign(BASE.S2,{
 photos:BASE.S2.photos.filter(p=>p.id!=='p3'),           // Photo Evidence 02 (Bill) removed
 typing:false,replies:[],
 tl:BASE.S2.tl.map(r=>r[0]==='Prepared'?['Prepared','19:42']:r)});
BASE.S2.rec.cust={orders:12,rows:[['14 Sep','Wrong item','₹180','Refunded']],older:[]};
Object.assign(BASE.S2.rec.rest,{raised:37,upheld:15});
BASE.S2.restv.actual=8;                                   // Food ready (+3) → (−7) against the 15 min estimate

/* ---------- S3 · Not delivered ---------- */
BASE.S3.rec.cust={orders:37,rows:[['26 Sep','Missing item','₹90','Refunded'],['09 Sep','Late delivery','₹40','Refunded (partial)'],['20 Aug','Quality or taste','—','Not upheld']],older:[]};
Object.assign(BASE.S3.rec.rider,{total:413,raised:41,up:14,rating:2.9});
Object.assign(BASE.S3.rec.rest,{raised:176,upheld:32});
Object.assign(BASE.S3,{typing:false,replies:[]});
BASE.S3.rider.contacts=[];                                // contact attempts empty
/* Pickup step +2 → +7 and Reached drop +1 → +11; actual times kept, planned times and promised time recomputed so the brackets match */
BASE.S3.rider.plan=['20:12','20:13','20:21','20:23','20:31','20:35'];BASE.S3.rider.promised='20:35';
BASE.S3.rider.locs=[null,null,14,9,50,40];                      // reached drop 35 m → 50 m

/* ---------- S8 · Missing item ---------- */
Object.assign(BASE.S8.rec.rest,{total:1560,raised:69,upheld:18});
Object.assign(BASE.S8,{typing:false,replies:[]});
BASE.S8.photos[0].label='Bag contents (coffee only)';

/* ---------- S9 · Late delivery ---------- */
BASE.S9.rec.cust.orders=12;BASE.S9.rec.rest.total=857;
Object.assign(BASE.S9,{typing:false,replies:[],
 photos:[{id:'p1',label:'Bag contents (no fries)',at:'21:07',src:'Camera',via:'bot'}],
 tl:[['Placed','20:00'],['Accepted','20:01'],['Prepared','20:19'],['Picked up','20:27'],['Marked delivered','21:05']]});
BASE.S9.msgs.unshift({w:'cu',photo:'p1',at:'21:07'});
BASE.S9.items.forEach(i=>i.aff=true);
Object.assign(BASE.S9.restv,{actual:18,handover:'20:27',kot:[['2 × Classic burger','Marked packed 20:19'],['1 × Peri peri fries','Marked packed 20:20']]}); // Food ready delay removed
Object.assign(BASE.S9.rider,{log:[['Assigned','20:08'],['Accepted','20:12'],['Reached restaurant','20:24'],['Picked up','20:27'],['Reached drop','21:03'],['Marked delivered','21:05']],
 contacts:[['20:40','In-app call to customer','Answered · 35 s · told about the delay'],['21:03','In-app call to customer','Answered · 15 s · at the gate']],
 incidents:[['20:45','Heavy traffic and a road closure near the flyover','Route changed']]});

/* ---------- S5 · Quality or taste (new; replaces the second wrong-item chat) ----------
   Past midnight, cash on delivery, snacks ordered to go with drinks. The customer is abusive to the rider and to the agent. */
BASE.S5={key:'S5',code:'QT',no:'#2091',order:'SW-2091',date:'Sat 10 Oct',placed:'00:38',restaurant:'Chakhna Junction',pay:'Cash on delivery',cod:true,first:false,
 cust:{name:'Vikas T.',phone:'+91 ••••• ••316'},
 items:[{n:'Chicken 65',q:1,p:260,aff:true},{n:'Masala peanuts',q:1,p:120},{n:'Masala papad',q:2,p:100},{n:'Soda (750 ml)',q:2,p:80}],fees:{del:45,pack:15},
 delivered:'01:18',complaint:'01:31',
 tl:[['Placed','00:38'],['Accepted','00:40'],['Prepared','00:58'],['Picked up','01:03'],['Marked delivered','01:18']],
 photos:[{id:'p1',label:'Table and glass (no food visible)',at:'01:33',src:'Gallery',via:'chat'}],
 gaps:[],
 rec:{cust:{orders:24,rows:[['22 Sep','Late delivery','—','Not upheld'],['03 Sep','Missing item','₹80','Refunded']],older:[]},
  rider:{name:'Arjun P.',id:'R-233',total:520,rows:[['30 Sep','Late delivery','Not liable'],['12 Sep','Damaged or spilled','Liable']],raised:6,up:1,older:[]},
  rest:{total:2400,rows:[['05 Oct','Quality or taste','Upheld'],['28 Sep','Missing item','Not upheld']],raised:30,upheld:8,older:[]}},
 bot:{at:'01:36',picked:'Quality or taste',said:'"Chicken 65 was stale and smelly. Total waste of money."',offered:'20% coupon (01:35) · declined'},
 subject:'Quality or taste',
 msgs:[{w:'cu',t:'Chicken was stale. Refund my money NOW.',at:'01:32'},{w:'cu',photo:'p1',at:'01:33'},{w:'sys',t:'Riya joined',at:'01:40'}],
 typing:false,replies:[],wait:150,reply:240,nowBase:'01:42',
 rider:{log:[['Assigned','00:44'],['Accepted','00:45'],['Reached restaurant','00:55'],['Picked up','01:03'],['Reached drop','01:12'],['Marked delivered','01:18']],loc:15,promised:'01:15',stages:'',riderDelay:3,
  contacts:[],incidents:[['01:16','Customer was abusive at handover and delayed paying cash','Paid after 4 min']],unreach:false,
  plan:['00:44','00:45','00:54','00:58','01:10','01:15'],locs:[null,null,8,6,20,15]},
 restv:{accepted:'00:40',est:18,actual:18,handover:'01:03',kot:[['1 × Chicken 65','Marked packed 00:59'],['1 × Masala peanuts','Marked packed 00:57'],['2 × Masala papad','Marked packed 00:58'],['2 × Soda (750 ml)','Marked packed 00:56']],instr:'"Extra onion, make it spicy"',subs:[]},
 terms:{type:'partial',cap:200,agreed:'14 Apr 2026'},conflict:false,
 tip:0,txn:'Cash collected by rider · 01:22',collected:null};

/* Ratings (5-star average). Not given by the owner → standardised from Interaction history: 5 − 0.62 × upheld/liable rate (%), so S3's rider (14 of 413 = 3.4%) lands on the owner's 2.9. [Hypothetical] */

/* ---------- customer chat scripts: the agent's next line is sent when the reply box is clicked; customer lines follow ----------
   beat types: a = agent · c = customer · photo · off / on = customer offline / back · call = waits until the agent calls the customer and ends the call */
const SCRIPT={
 S2:{1:[{a:"Thank you, Aman. I can see the photos. Was the whole dish different, or just the gravy?"},
     {c:"The whole thing. It's a chicken curry, there's bone in it. I don't eat chicken."},
     {a:"I'm really sorry about that. I'm checking with the restaurant now. Please stay with me for a couple of minutes."},
     {c:"Ok. Please hurry, I haven't eaten."}],
     2:[{a:"Thank you, Aman. The photos show a red gravy with paneer cubes. Could you tell me what is different from what you ordered?"},
     {c:"It just tastes different. I'm sure it's not paneer butter masala."},
     {a:"I understand. Is there anything else in the order that looks wrong?"},
     {c:"No, only the curry."}],
     3:'1'},
 S8:{1:[{a:"I'm sorry, Kiran. When the bag reached you, was the staple or seal intact, or did it look opened?"},
     {c:"Intact! Stapled shut, exactly like it left the restaurant. Are you saying I'm lying?"},
     {a:"Not at all. I need to check every step. Do you have a photo of the bill, or of the stapled bag before you opened it?"},
     {c:"I opened it to eat, obviously. Who photographs a bag before opening it?? I paid ₹329 and got two coffees."},
     {a:"I understand. I'm calling the restaurant now to check how your order was packed."},
     {c:"Fine. But I'm not letting this go."}],2:'1'},
 S3:{1:[{a:"I'm sorry, Neha. Could you confirm your address and a landmark near your gate?"},
     {c:"Flat 402, Tower B, Green Meadows, near the main gate. The gate guard also says no one came."},
     {a:"Thank you. I'm checking with the delivery partner now."},
     {c:"Ok. Please do it quickly."}],2:'1'},
 S9:{1:[{a:"Are you still there, Rohit?"},{on:1},
     {c:"Sorry, network issue. The burgers were cold, and the fries aren't even in the bag. I sent a photo."},
     {a:"I can see the photo. Was the bag sealed when it reached you, or did it look opened?"},
     {c:"The sticker seal was torn on one side! It came 35 minutes late AND opened. What is going on with your delivery guys?"},
     {a:"I'm sorry, Rohit. I'm checking the delivery partner's trip record right now."},
     {c:"Check whatever you want. I want my money back."}]},
 S5:{1:[{a:"Hi Vikas, I'm Riya from Swiggy support. I'm sorry the chicken wasn't right. I can see your photo."},
     {a:"This photo shows a table and a glass, but I can't see the Chicken 65. Could you send a photo of the food itself?"},
     {c:"What more proof do you want? I'm telling you it's stale."},
     {a:"I understand. A clear photo of the dish helps me check this quickly."},
     {off:1},
     {a:"Hi Vikas, are you still there? I'll keep this chat open for a few minutes."},
     {on:1},{c:"CALL ME. Right now. I'm not typing all this."},
     {call:[['Agent','Hello Vikas, this is Riya from Swiggy support.'],['Customer','Abe sun, ch***ya samjha hai kya? Paise wapas kar!'],['Agent','Sir, I want to help you. Please speak respectfully.'],['Customer','B***d*k*, tum log sab chor ho. Tera m******r kar dunga.'],['Agent','Sir, I am ending this call. We can continue on chat.']]},
     {c:"Phone kaat diya? M**********d, refund de warna dekh lena."},
     {c:"Tum log ki aisi ki taisi, ch***yo."}]}};

/* ---------- rider chat scripts (Rider view): clicking the reply box offers these; choosing one plays it ---------- */
const RSCRIPT={
 S3:[{id:'A',path:1,label:'Rider admits he did not hand it over',beats:[{a:"Hi Imran, this is Riya from Swiggy support about order SW-2063. The customer says she didn't receive it. Who did you hand it to?"},
     {r:"Ma'am, the society gate was closed and I was late for my next order."},{r:"I marked it delivered from outside the gate and left the bag on the guard cabin ledge. Nobody took it from me."},
     {a:"So it wasn't handed to the customer or to the guard?"},{r:"No ma'am. Sorry."}]},
    {id:'B',path:2,label:'Rider says he followed the customer\'s instruction',beats:[{a:"Hi Imran, this is Riya from Swiggy support about order SW-2063. The customer says she didn't receive it. Who did you hand it to?"},
     {r:"Ma'am, the delivery note said 'Leave with security, don't call'."},{r:"I gave it to the guard at the main gate at 20:52 and marked it delivered there."},
     {a:"Did the guard take it from you?"},{r:"Yes, he kept it in his cabin. The note told me not to call her."}]}],
 S9:[{id:'A',path:1,label:'Ask the rider about the delay and the torn seal',beats:[{a:"Hi Deepak, Riya from support about order SW-2078. The customer says the bag seal was torn and the fries were missing."},
     {r:"Ma'am, traffic was very bad near the flyover, I was stuck for 25 minutes."},{r:"The bag fell from the stand once when I braked. The seal tore and I pressed it back. Sorry."},
     {a:"Thank you for telling me."}]}],
 S5:[{id:'A',path:1,label:'Ask the rider about the handover',beats:[{a:"Hi Arjun, Riya from support about order SW-2091. You reported an issue at the handover?"},
     {r:"Yes ma'am. He was drunk and shouting, used bad words, and kept me waiting 4 minutes for the cash."},{r:"The food was sealed and hot when I gave it."},
     {a:"Thank you, Arjun. I've noted it."}]}]};

/* ---------- restaurant call (Restaurant view): what the restaurant says, per path ---------- */
const RCALL={
 S2:{1:[['Agent','Hi, this is Riya from Swiggy support about order SW-2041, paneer butter masala.'],['Restaurant','Yes, I can see it.'],['Agent','The customer received a chicken curry instead and shared photos.'],['Restaurant','Sorry, two orders were packed at the same counter around 19:50. The bags got swapped.'],['Agent','Thank you. I will note it.']],
     2:[['Agent','Hi, this is Riya from Swiggy support about order SW-2041.'],['Restaurant','Our ticket shows paneer butter masala, packed and sealed at 19:51.'],['Agent','Thank you, noted.']],
     3:[['Agent','Hi, this is Riya from Swiggy support about order SW-2041, paneer butter masala.'],['Restaurant','Our ticket shows paneer butter masala, packed and sealed at 19:51.'],['Agent','The customer says a chicken curry arrived and shared photos.'],['Restaurant','We did not make any chicken curry for this order. We don\'t accept this claim.'],['Agent','Understood. I will record your response.']]},
 S8:{1:[['Agent','Hi, Riya from Swiggy support about order SW-2070. The customer says the masala dosa was missing.'],['Restaurant','Our ticket shows 1 masala dosa and 2 filter coffees, all marked packed by 20:30.'],['Restaurant','I packed this bag myself and stapled it with the bill. Nothing was missing from our side.'],['Agent','Thank you, noted.']],
     2:[['Agent','Hi, Riya from Swiggy support about order SW-2070. The customer says the masala dosa was missing.'],['Restaurant','Let me check… sorry ma\'am, the dosa was ready but left on the counter.'],['Restaurant','Our packer marked it packed by mistake. It is our error.'],['Agent','Thank you for confirming.']]},
 S3:{1:[['Agent','Hi, Riya from support about SW-2063.'],['Restaurant','The order was handed to the rider at 20:31, all items packed.']],2:'1'},
 S9:{1:[['Agent','Hi, Riya from support about SW-2078.'],['Restaurant','Food was ready at 20:19. The rider picked it up at 20:27 with the seal intact.']]},
 S5:{1:[['Agent','Hi, Riya from support about SW-2091.'],['Restaurant','Chicken 65 was fried fresh at 00:58 and sealed. No complaint from our side.']]}};

/* ---------- paths: the scripted branches a case-study viewer can follow (demo guide, outside the agent screen) ---------- */
const PATHS={
 S2:[{t:'Photos agreed → restaurant admits the error',end:'Restaurant · Full refund · "Photo shows the issue in the restaurant\'s item"',steps:['agreeAll','chat','restCall','soe:Order swapped with another order','dec:Restaurant|full|Photo shows the issue in the restaurant\'s item','closed']},
     {t:'Photos disagreed → policy conditions change',end:'Customer · Deny · "Evidence does not match"',steps:['disagreeAll','chat','dec:Customer|deny|Evidence does not match','closed']},
     {t:'Photos agreed → restaurant denies on the call',end:'Send to review · "Records conflict"',steps:['agreeAll','chat','restCall','soe:No error found by restaurant','dec:|review|Records conflict','closed']}],
 S3:[{t:'Rider admits the order was not handed over',end:'Rider · Full refund · "Rider confirmed the order was not handed over"',steps:['chat','rider:A','dec:Rider|full|Rider confirmed the order was not handed over','closed']},
     {t:'Rider followed the customer\'s instruction',end:'Customer · Deny · "Customer-side cause (address, instructions, availability)"',steps:['chat','rider:B','dec:Customer|deny|Customer-side cause (address, instructions, availability)','closed']}],
 S8:[{t:'Restaurant finds no error → evidence not enough',end:'Customer · Deny · "Evidence is not enough to support the claim"',steps:['agreeAll','chat','restCall','soe:No error found by restaurant','dec:Customer|deny|Evidence is not enough to support the claim','closed']},
     {t:'Restaurant admits the dosa was not packed',end:'Restaurant · Full refund · "Restaurant confirmed the error on call"',steps:['agreeAll','chat','restCall','soe:Item not packed','dec:Restaurant|full|Restaurant confirmed the error on call','closed']}],
 S9:[{t:'Delays and a torn seal on the trip',end:'Rider · Full refund · "Trip record supports the claim"',steps:['agreeAll','chat','rider:A','dec:Rider|full|Trip record supports the claim','closed']}],
 S5:[{t:'Abuse on call and chat → flag → review',end:'Customer · Send to review · "Customer flagged for inappropriate conduct"',steps:['disagreeAll','chat','flag','dec:Customer|review|Customer flagged for inappropriate conduct','closed']}]};

/* ===== fifth iteration · revision 2 (owner's change list, 19 Oct 2026) =====
   Branches now come only from the agent's own actions (no path guide):
   · S2 Wrong item: agree both photos → restaurant admits · agree one, disagree one → restaurant denies · disagree both → no call needed
   · S8 Missing item: agree the photo → restaurant admits · disagree → restaurant says the combo was packed in full
   · S3 Not delivered: the rider's account (prototype choice in the Rider chat)
   After a call or chat with the restaurant or rider, the customer chat continues: the agent tells the customer what was found. The decision unlocks only after that. */

/* ---------- renamed people and food (owner: "change the names of people and food items for each scenario") ---------- */
const RENAME=[['Paneer butter masala','Kadai paneer'],['paneer butter masala','kadai paneer'],['Butter naan','Garlic naan'],
 ['Chicken biryani (family)','Mutton dum biryani'],['Mirchi ka salan','Bagara baingan'],['Double ka meetha','Qubani ka meetha'],
 ['Classic burger','Crispy veg burger'],['Peri peri fries','Masala fries'],
 ['Chicken 65','Chicken lollipop'],['Masala peanuts','Peanut chaat'],['Masala papad','Roasted papad'],['Soda (750 ml)','Club soda (750 ml)'],
 ['Aman K.','Siddharth M.'],['Aman','Siddharth'],['Vikram D.','Manoj B.'],['Neha R.','Pooja S.'],['Neha','Pooja'],['Imran H.','Salim K.'],['Imran','Salim'],
 ['Kiran P.','Ananya G.'],['Kiran','Ananya'],['Prakash N.','Ravi T.'],['Rohit V.','Karan J.'],['Rohit','Karan'],['Deepak S.','Naveen R.'],['Deepak','Naveen'],
 ['Vikas T.','Rajat B.'],['Vikas','Rajat'],['Arjun P.','Kunal D.'],['Arjun','Kunal']];
const renameDeep=o=>{if(typeof o==='string'){RENAME.forEach(([a,b])=>{o=o.split(a).join(b)});return o}
 if(Array.isArray(o))return o.map(renameDeep);if(o&&typeof o==='object'){Object.keys(o).forEach(k=>o[k]=renameDeep(o[k]));return o}return o};

/* ---------- S2 · Wrong item: a different paneer-free veg curry instead of a chicken curry ---------- */
BASE.S2.bot.said='"I ordered kadai paneer but got a different curry."';
SCRIPT.S2={1:[{a:"Thank you, Siddharth. I can see the photos. Was the whole dish different, or just the gravy?"},
     {c:"The whole thing. It's malai kofta, there's no paneer in it at all."},
     {a:"I'm really sorry about that. I'm checking with the restaurant now. Please stay with me for a couple of minutes."},
     {c:"Ok. Please hurry, I haven't eaten."},
     {gate:'rest',then:{
      1:[{a:"I've spoken to the restaurant. Two orders were packed at the same counter around 19:50, and they've confirmed the bags got swapped."},{c:"So someone else got my kadai paneer? Unbelievable."},{a:"I'm sorry. I'm recording this now, please give me a moment."}],
      3:[{a:"I've spoken to the restaurant. They say their ticket shows kadai paneer, packed and sealed at 19:51, and they don't accept that a different dish was sent."},{c:"What? I sent you the photos. It's clearly not paneer."},{a:"I understand. Your photos and the restaurant's record don't match, so let me record both. Please give me a moment."}],
      2:[{a:"I've spoken to the restaurant. Their ticket shows kadai paneer, packed and sealed at 19:51."},{c:"Ok. So what now?"},{a:"Let me record this. Please give me a moment."}]}}],
 2:[{a:"Thank you, Siddharth. The photos show a dark gravy with paneer cubes and capsicum. Could you tell me what is different from what you ordered?"},
     {c:"It just tastes different. I'm sure it's not kadai paneer."},
     {a:"I understand. Is there anything else in the order that looks wrong?"},
     {c:"No, only the curry."}],3:'1'};
RCALL.S2={1:[['Agent','Hi, this is Riya from Swiggy support about order SW-2041, kadai paneer.'],['Restaurant','Yes, I can see it.'],['Agent','The customer received malai kofta instead and shared photos.'],['Restaurant','Sorry, two orders were packed at the same counter around 19:50. The bags got swapped.'],['Agent','Thank you. I will note it.']],
 2:[['Agent','Hi, this is Riya from Swiggy support about order SW-2041.'],['Restaurant','Our ticket shows kadai paneer, packed and sealed at 19:51.'],['Agent','Thank you, noted.']],
 3:[['Agent','Hi, this is Riya from Swiggy support about order SW-2041, kadai paneer.'],['Restaurant','Our ticket shows kadai paneer, packed and sealed at 19:51.'],['Agent','The customer says malai kofta arrived and shared photos.'],['Restaurant','We did not send malai kofta with this order. We don\'t accept this claim.'],['Agent','Understood. I will record your response.']]};

/* ---------- S3 · Not delivered: starts fresh (no call already running) ---------- */
delete BASE.S3.call;
SCRIPT.S3={1:[{a:"I'm sorry, Pooja. Could you confirm your address and a landmark near your gate?"},
     {c:"Flat 402, Tower B, Green Meadows, near the main gate. The gate guard also says no one came."},
     {a:"Thank you. I'm checking with the delivery partner now."},
     {c:"Ok. Please do it quickly."},
     {gate:'rider',then:{
      A:[{a:"I've spoken to the delivery partner. He says the society gate was closed, so he left the bag on the guard cabin ledge and marked the order delivered from outside the gate, without handing it to anyone."},{c:"So he just left my food outside? I want my money back."},{a:"I'm sorry, Pooja. I'm recording this now, please give me a moment."}],
      B:[{a:"I've spoken to the delivery partner. He says your delivery note asked him to leave the order with security and not to call you, so he handed it to the guard at the main gate at 20:52."},{c:"I did add that note. I'll check with the guard again, but I still don't have my food."},{a:"I understand. Let me record what I've found. Please give me a moment."}]}}]};
RSCRIPT.S3[0].label='He left the bag at the guard cabin, not handed over';
RSCRIPT.S3[1].label='He handed it to the guard, as the delivery note asked';

/* ---------- S8 · Missing item: a combo, so the photo is easy to agree or disagree with ---------- */
Object.assign(BASE.S8,{
 items:[{n:'Udupi tiffin combo (rava dosa, 2 medu vada, kesari bath)',q:1,p:220,aff:true},{n:'Badam milk',q:1,p:60}],
 photos:[{id:'p1',label:'Combo box · vada compartment empty, oil stains in it',at:'20:55',src:'Camera',via:'bot'}],
 bot:Object.assign(BASE.S8.bot,{said:'"My combo came without the vadas."'}),
 msgs:[{w:'cu',photo:'p1',at:'20:55'},{w:'sys',t:'Riya joined',at:'21:01'},{w:'ag',t:"Hi Ananya, I'm Riya. I've seen your photo and I'm checking the order records.",at:'21:02'},{w:'cu',t:'The vadas are missing from my combo. The bag was stapled shut.',at:'21:04'}]});
BASE.S8.cust.name='Ananya G.';BASE.S8.rec.rider.name='Ravi T.';
BASE.S8.rec.cust={orders:20,raised:12,up:4,rows:[['30 Sep','Missing item','₹90','Refunded'],['12 Sep','Missing item','—','Not upheld'],['02 Sep','Quality or taste','—','Not upheld'],['18 Aug','Late delivery','₹50','Refunded (partial)']],older:[]};
BASE.S8.restv.kot=[['1 × Udupi tiffin combo (rava dosa, 2 medu vada, kesari bath)','Marked packed 20:30'],['1 × Badam milk','Marked packed 20:27']];
BASE.S8.star.msg="I've refunded ₹168 for the missing vadas, including GST. It will reach your UPI account in 3–5 working days.";
SCRIPT.S8={1:[{a:"I'm sorry, Ananya. When the bag reached you, was the staple or seal intact, or did it look opened?"},
     {c:"Intact! Stapled shut, exactly like it left the restaurant. Are you saying someone took my vadas out?"},
     {a:"Not at all. I need to check every step. Do you have a photo of the bag before you opened it, or of the bill?"},
     {c:"Who photographs a bag before opening it?? The vada compartment was empty. I paid ₹329 and got half a combo."},
     {a:"I understand. I'm checking with the restaurant now about how your combo was packed."},
     {c:"Fine. But I'm not letting this go."},
     {gate:'rest',then:{
      2:[{a:"I've spoken to the restaurant. They checked and confirmed the medu vadas were left out of your combo by mistake."},{c:"Finally! So I'll get my money back?"},{a:"I'm recording this now. Please give me a moment."}],
      1:[{a:"I've spoken to the restaurant. They say your combo was packed in full, with both vadas, and stapled shut with the bill at 20:30."},{c:"So you're calling me a liar? I'm telling you there were no vadas!"},{a:"I understand you're upset. I'm recording everything you've told me. Please give me a moment."}]}}]};
RCALL.S8={1:[['Agent','Hi, Riya from Swiggy support about order SW-2070. The customer says the medu vadas were missing from her Udupi tiffin combo.'],['Restaurant','Our ticket shows 1 Udupi tiffin combo and 1 badam milk, all marked packed by 20:30.'],['Restaurant','I packed this combo myself: rava dosa, two vadas and kesari bath, stapled with the bill. Nothing was missing from our side.'],['Agent','Thank you, noted.']],
 2:[['Agent','Hi, Riya from Swiggy support about order SW-2070. The customer says the medu vadas were missing from her Udupi tiffin combo.'],['Restaurant','Let me check… sorry ma\'am, the vadas were still in the fryer when the combo box was closed.'],['Restaurant','Our packer marked it packed by mistake. It is our error.'],['Agent','Thank you for confirming.']]};

/* ---------- S9 · Late delivery: everything arrived, but late and cold (traffic) → Swiggy · Partial ---------- */
BASE.S9.photos=[{id:'p1',label:'Burgers and fries · cold, all items there',at:'21:07',src:'Camera',via:'bot'}];
SCRIPT.S9={1:[{a:"Are you still there, Karan?"},{on:1},
     {c:"Sorry, network issue. The burgers were cold and the fries were soggy. I sent a photo."},
     {a:"I can see the photo, thank you. Was anything missing or damaged, or was it all there but cold?"},
     {c:"Everything was there, just cold. It came 35 minutes late! What is going on with your delivery guys?"},
     {a:"I'm sorry, Karan. I'm checking with the delivery partner right now."},
     {c:"Check whatever you want. I want compensation."},
     {gate:'rider',then:{A:[{a:"I've checked with the delivery partner. He was stuck in heavy traffic and a road closure near the flyover for about 25 minutes, and he called you at 20:40 to tell you about the delay."},{c:"Yes, he called. But I still paid full price for cold food."},{a:"I understand. Let me sort this out for you now."}]}}]};
RSCRIPT.S9=[{id:'A',path:1,label:'Ask the rider about the delay',beats:[{a:"Hi Naveen, Riya from support about order SW-2078. The customer says the order came late and cold."},
     {r:"Ma'am, traffic was very bad near the flyover, and there was a road closure. I was stuck for about 25 minutes."},{r:"I called the customer at 20:40 to tell him. The bag was sealed when I handed it over."},
     {a:"Thank you for telling me."}]}];
REASONS.partial.Swiggy.push('Delay outside anyone\'s control (traffic, weather)');
REASONS.review._.push('Restaurant policy not met');

/* ---------- S5 · Quality or taste ---------- */
/* (closing messages for a flagged customer are written in the logic file: the issue is carried forward, no "thank you for your patience") */

/* ---------- facts the agent tells the customer in the closing messages, per branch (owner: "if there is a reason, it should be mentioned") ---------- */
const FIND={
 S2:{r1:"The restaurant has confirmed that two orders were packed at the same counter and the bags got swapped.",
     r3:"The restaurant says its ticket shows kadai paneer, packed and sealed at 19:51, and it doesn't accept that a different dish was sent, while your photos show a different dish.",
     r2:"The restaurant's ticket shows kadai paneer, packed and sealed at 19:51.",
     _:"The photos you shared show paneer cubes and capsicum in a dark gravy, which matches the kadai paneer you ordered."},
 S3:{dA:"The delivery partner has confirmed he left your order at the guard cabin and marked it delivered from outside the gate, without handing it to anyone.",
     dB:"The delivery partner says your delivery note asked him to leave the order with security and not to call you. He handed it to the guard at the main gate at 20:52, which is where the note asked for it to go."},
 S8:{r2:"The restaurant has confirmed the medu vadas were left out of your combo by mistake.",
     r1:"The restaurant says your combo was packed in full, with both vadas, and stapled shut with the bill at 20:30. Your bag also reached you stapled, and your photo shows the vada compartment with oil stains in it, so I can't confirm the vadas were missing."},
 S9:{dA:"Your order was delayed by heavy traffic and a road closure near the flyover. The delivery partner was held up for about 25 minutes and called you at 20:40 to let you know."}};
/* how the customer acknowledges the last closing question, so the chat ends only once they know */
const ACK={S2:{deny:"Ok. I still think it's wrong, but fine.",review:"Ok. Please make sure it gets sorted.",refund:"No, that's all. Thanks."},
 S3:{deny:"Fine. I'll speak to the guard.",refund:"No, that's all. Thank you."},
 S8:{deny:"This is ridiculous. Fine.",review:"Ok, I'll wait for the update.",refund:"No, that's all."},
 S9:{refund:"No, that's it. Thanks."},
 S5:{review:"Whatever. Just give my money back."}};

/* apply the renames everywhere the scenarios are written */
renameDeep(BASE);renameDeep(SCRIPT);renameDeep(RSCRIPT);renameDeep(RCALL);

/* ===== fifth iteration · revision 3 (owner's change list, 20 Oct 2026) ===== */
/* Priority cases (owner): safety threat, serious incident, immediate danger, order in progress needing intervention, time-sensitive delivery problem.
   In the prototype: Not delivered and Late delivery. */
BASE.S3.prio=true;BASE.S9.prio=true;
/* Shelf: chats held for 30 min in a row move here automatically. These entries are fictional demo cases. */
const SHELF=[{no:'#2019',subject:'Damaged or spilled',by:'Restaurant',since:'20:05'},
 {no:'#2024',subject:'Refund for earlier issue not received',by:'Customer',since:'20:21'},
 {no:'#2030',subject:'Missing item',by:'Rider',since:'20:34'}];

/* ===== fifth iteration · revision 4 (20 Oct 2026) ===== */
/* Rider Subject of Error: recorded by the agent after a call or chat with the rider (Rider view, docked with the Rider chat). Options are Hypothetical. */
const RSOE=['Order not handed over','Handed over as the delivery note asked','Handed to someone other than the customer','Delay in transit (traffic, weather, road closure)','Damaged or spilled in transit','No error found by rider'];


const PHOTO_SRC={S2:{p2:'photos/2041-1.jpg',p1:'photos/2041-2.jpg'},S8:{p1:'photos/2070-1.jpg'},S9:{p1:'photos/2078-1.jpg'},S5:{p1:'photos/2091-1.jpg'},S3:{}};
