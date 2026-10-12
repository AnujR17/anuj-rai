"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import styles from "./thread.module.css";

type Point = readonly [number, number];
type Cord = { start: Point; end: Point; color: string; weight: number; phase: number; turns: number; lift: number };

const cords: Cord[] = [
  { start: [100, 277], end: [1070, 198], color: "#273037", weight: 2.2, phase: .2, turns: 2.25, lift: 13 },
  { start: [350, 80], end: [1035, 356], color: "#ce582f", weight: 1.8, phase: 1.7, turns: 2.65, lift: 19 },
  { start: [236, 447], end: [1080, 268], color: "#355daf", weight: 2.1, phase: 3.1, turns: 2.1, lift: 11 },
  { start: [499, 160], end: [530, 350], color: "#697982", weight: 1.5, phase: 2.8, turns: 1.7, lift: 22 },
  { start: [393, 205], end: [615, 199], color: "#273037", weight: 1.7, phase: 4.4, turns: 2.4, lift: 8 },
  { start: [420, 355], end: [541, 171], color: "#ab7557", weight: 1.4, phase: .9, turns: 2.9, lift: 14 },
  { start: [316, 113], end: [578, 325], color: "#435869", weight: 1.5, phase: 5.9, turns: 1.9, lift: 7 },
  { start: [355, 330], end: [605, 278], color: "#df794c", weight: 1.55, phase: 3.8, turns: 2.2, lift: 16 },
  { start: [509, 166], end: [450, 350], color: "#30373e", weight: 1.6, phase: 2.1, turns: 2.5, lift: 12 },
  { start: [340, 332], end: [597, 233], color: "#859099", weight: 1.3, phase: 5.1, turns: 2.75, lift: 9 },
  { start: [355, 185], end: [572, 308], color: "#315bbc", weight: 1.3, phase: 6.3, turns: 1.6, lift: 18 },
];

// Two cubic gestures per length: open loops, turns, and generous negative space.
// No endpoint is pinned. Each strand has its own resting shape.
const gestures: readonly (readonly Point[])[] = [
  [[100,310],[240,310],[205,112],[380,100],[615,83],[435,370],[800,295]],
  [[230,420],[425,425],[205,148],[510,146],[770,144],[650,372],[1080,320]],
  [[150,374],[315,416],[360,256],[560,265],[720,275],[706,465],[975,420]],
  [[320,105],[486,10],[642,70],[620,187],[599,307],[790,200],[936,125]],
  [[282,313],[444,460],[480,335],[475,235],[470,150],[625,140],[735,185]],
  [[366,443],[499,414],[492,312],[645,325],[770,337],[817,290],[850,238]],
  [[175,240],[240,176],[386,245],[392,329],[400,407],[575,435],[640,382]],
  [[405,69],[520,40],[516,211],[673,225],[815,238],[790,90],[997,108]],
  [[535,470],[650,410],[632,380],[650,307],[682,159],[852,161],[896,230]],
  [[767,385],[934,433],[1030,353],[958,274],[858,164],[1030,137],[1084,174]],
  [[785,81],[855,40],[972,92],[924,173],[882,245],[754,211],[710,273]],
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => value * value * (3 - 2 * value);
const mix = (a: number, b: number, value: number) => a + (b - a) * value;

function spline(points: Point[]) {
  let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[Math.max(0, i-1)], b = points[i], c = points[i+1], e = points[Math.min(points.length-1, i+2)];
    d += ` C ${(b[0]+(c[0]-a[0])/6).toFixed(1)} ${(b[1]+(c[1]-a[1])/6).toFixed(1)}, ${(c[0]-(e[0]-b[0])/6).toFixed(1)} ${(c[1]-(e[1]-b[1])/6).toFixed(1)}, ${c[0].toFixed(1)} ${c[1].toFixed(1)}`;
  }
  return d;
}

function cubic(a: Point, b: Point, c: Point, d: Point, t: number): Point {
  const u=1-t;
  return [u*u*u*a[0]+3*u*u*t*b[0]+3*u*t*t*c[0]+t*t*t*d[0], u*u*u*a[1]+3*u*u*t*b[1]+3*u*t*t*c[1]+t*t*t*d[1]];
}

// Cache the two compositions once. Live drawing only interpolates their points.
const compositions = cords.map((cord,index) => {
  const collected: Point[]=[], open: Point[]=[];
  for(let i=0;i<=60;i++) {
    const t=i/60;
    const theta = cord.phase + t * Math.PI * 2 * cord.turns;
    const radius = 64 + 25 * Math.sin(theta * 1.7 + cord.phase) + 14 * Math.sin(theta * 3.1);
    const knot: Point = [
      453 + Math.cos(theta) * radius * (1.1 + index * .025) + Math.sin(theta * .73) * 18,
      263 + Math.sin(theta) * radius * .94 + Math.cos(theta * 1.41 + index) * 24,
    ];
    const tail = smooth(clamp(t < .14 ? t / .14 : (1-t) / .16));
    const linear: Point = [mix(cord.start[0],cord.end[0],t), mix(cord.start[1],cord.end[1],t)];
    collected.push([mix(linear[0],knot[0],tail), mix(linear[1],knot[1],tail)]);
    const g=gestures[index], segment=t<.5?0:3, local=t<.5?t*2:(t-.5)*2;
    open.push(cubic(g[segment],g[segment+1],g[segment+2],g[segment+3],local));
  }
  return {collected,open};
});

function geometry(cord: Cord, index: number, progress: number, seconds: number) {
  const opening = smooth(clamp((progress - index * .018) / (1 - index * .018)));
  const {collected,open}=compositions[index];
  const points=collected.map((point,i):Point => {
    const envelope=Math.sin(i/60*Math.PI);
    const breath=(1-opening)*envelope*1.6*Math.sin(seconds/(5+index*.8)+cord.phase+i/20);
    // Turns release with a small travelling bias, then settle into the open gesture.
    const release=Math.sin(opening*Math.PI)*envelope*9*Math.sin(cord.phase+i/15);
    return [mix(point[0],open[i][0],opening)+breath, mix(point[1],open[i][1],opening)+breath*.7+release];
  });
  return spline(points);
}

export function ThreadStudy() {
  const svg = useRef<SVGSVGElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const drag = useRef<{x:number;amount:number} | null>(null);
  const target = useRef(0), current = useRef(0), elapsed = useRef(0);
  const [amount, setAmount] = useState(0), [paused, setPaused] = useState(false);
  const id = useId().replaceAll(":", "");

  useEffect(() => {
    const element = svg.current;
    if (!element) return;
    const surface=canvas.current;
    const context=surface?.getContext("2d");
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const groups = [...element.querySelectorAll<SVGGElement>("[data-cord]")];
    const paths = groups.map(group=>[...group.querySelectorAll("path")]);
    const shadows=groups.map(group=>group.querySelector("[data-shadow]"));
    let frame = 0, last = 0, lastPaint = 0, visible = false, disposed = false;
    const draw = (seconds: number) => {
      const drawings=cords.map((cord,index)=>geometry(cord,index,current.current,seconds));
      if(context && surface) {
        context.clearRect(0,0,1160,560);
        context.lineCap="round";context.lineJoin="round";
        const shapes=drawings.map(d=>new Path2D(d));
        cords.forEach((cord,index)=>{
          const lift=mix(cord.lift,4,current.current);
          context.save();context.translate(-lift*.85,lift*1.7);
          context.strokeStyle="#223141";
          // Two translucent strokes soften the cast shadow without per-cord blur filters.
          context.globalAlpha=.055;context.lineWidth=cord.weight+4;context.stroke(shapes[index]);
          context.globalAlpha=.12;context.lineWidth=cord.weight+.7;context.stroke(shapes[index]);
          context.restore();
        });
        cords.forEach((cord,index)=>{
          context.globalAlpha=1;context.strokeStyle=cord.color;context.lineWidth=cord.weight;context.stroke(shapes[index]);
          context.save();context.translate(-.25,-.35);context.strokeStyle="#fffdf4";context.globalAlpha=.34;context.lineWidth=.38;context.stroke(shapes[index]);context.restore();
        });
        element.parentElement?.setAttribute("data-ready", "true");
      } else {
      cords.forEach((cord, index) => {
        const d = drawings[index];
        paths[index].forEach(path => path.setAttribute("d", d));
        const lift = mix(cord.lift, 4, current.current);
        shadows[index]?.setAttribute("transform", `translate(${(-lift*.85).toFixed(1)},${(lift*1.7).toFixed(1)})`);
      });
      }
      element.dataset.unwind = current.current.toFixed(3);
    };
    const resize=()=>{
      if(!surface || !context)return;
      const bounds=element.getBoundingClientRect(),density=Math.min(window.devicePixelRatio || 1,2);
      surface.width=Math.round(bounds.width*density);surface.height=Math.round(bounds.height*density);
      context.setTransform(surface.width/1160,0,0,surface.height/560,0,0);
      draw(elapsed.current);
    };
    const sizeObserver=new ResizeObserver(resize);
    sizeObserver.observe(element);
    resize();
    const tick = (now: number) => {
      if (disposed || !visible || document.hidden || media.matches) { frame=0; last=0; return; }
      const dt = last ? now-last : 0;
      last = now;
      if (!paused) elapsed.current += dt / 1000;
      current.current += (target.current-current.current) * (1-Math.exp(-dt/280));
      if (Math.abs(current.current-target.current) < .0005) current.current=target.current;
      const settled = (paused || current.current===1) && current.current===target.current;
      const moving=current.current!==target.current;
      if (moving || now-lastPaint > 50 || settled) {
        draw(elapsed.current);
        lastPaint=now;
      }
      if (settled) { frame=0; return; }
      frame=window.requestAnimationFrame(tick);
    };
    const reconcile = () => {
      if (disposed) return;
      window.cancelAnimationFrame(frame); frame=0; last=0;
      if (media.matches) { current.current=target.current; draw(0); }
      else if (visible && !document.hidden && (!paused || current.current!==target.current)) {
        frame=window.requestAnimationFrame(tick);
      }
    };
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;reconcile();});
    observer.observe(element);
    media.addEventListener("change",reconcile);document.addEventListener("visibilitychange",reconcile);
    const input = () => { if(media.matches){current.current=target.current;draw(0);} else if(visible && !document.hidden && !frame) { last=0; frame=window.requestAnimationFrame(tick); } };
    element.addEventListener("unwind",input);
    return ()=>{disposed=true;window.cancelAnimationFrame(frame);observer.disconnect();sizeObserver.disconnect();media.removeEventListener("change",reconcile);document.removeEventListener("visibilitychange",reconcile);element.removeEventListener("unwind",input);};
  },[paused]);

  function change(value: number) {
    target.current=value/100;
    setAmount(value);
    svg.current?.dispatchEvent(new Event("unwind"));
  }

  return <div className={styles.study}>
    <div className={styles.artwork}
      onPointerDown={event=>{if(event.button!==0)return;drag.current={x:event.clientX,amount};event.currentTarget.setPointerCapture(event.pointerId);}}
      onPointerMove={event=>{if(!drag.current)return;const width=event.currentTarget.getBoundingClientRect().width;change(Math.round(Math.max(0,Math.min(100,drag.current.amount+(event.clientX-drag.current.x)/width*180))));}}
      onPointerUp={event=>{drag.current=null;event.currentTarget.releasePointerCapture(event.pointerId);}}
      onPointerCancel={()=>{drag.current=null;}}
      onLostPointerCapture={()=>{drag.current=null;}}>
    <canvas ref={canvas} className={styles.canvas} aria-hidden="true" />
    <svg ref={svg} viewBox="0 0 1160 560" className={styles.cords} fill="none" aria-hidden="true" data-unwind="0">
      <defs>
        <filter id={id+"-shadow"} filterUnits="userSpaceOnUse" x="-80" y="-80" width="1320" height="760"><feGaussianBlur stdDeviation="1.5" /></filter>
      </defs>
      {cords.map((cord,index)=>{const d=geometry(cord,index,0,0);return <g key={index} data-cord={index} strokeLinecap="round" strokeLinejoin="round">
        <path data-shadow d={d} stroke="#223141" strokeOpacity=".25" strokeWidth={cord.weight+.7} filter={`url(#${id}-shadow)`} transform={`translate(${-cord.lift*.85},${cord.lift*1.7})`} />
        <path d={d} stroke={cord.color} strokeWidth={cord.weight} />
        <path d={d} stroke="#fffdf4" strokeOpacity=".34" strokeWidth=".38" transform="translate(-.25,-.35)" />
      </g>;})}
    </svg>
    </div>
    <div className={styles.interaction}>
      <div className={styles.pull}><input id={id+"-pull"} type="range" min="0" max="100" step="1" value={amount} onChange={event=>change(Number(event.target.value))} aria-label="Unwind the skein" /></div>
      <button type="button" className={styles.unwind} onClick={()=>change(amount>50?0:100)}>{amount>50?"Gather again":"Let it unfold"}<ArrowRight size={14} aria-hidden="true"/></button>
      <button type="button" className={styles.pause} onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={paused?"Resume ambient motion":"Pause ambient motion"}>{paused?<Play size={12} aria-hidden="true"/>:<Pause size={12} aria-hidden="true"/>}</button>
    </div>
  </div>;
}

export function ThreadMark({kind="open",className=""}:{kind?:"open"|"turn"|"anchor";className?:string}) {
  const paths={open:"M8 37C42 37 49 8 75 8C100 8 94 57 70 50C48 43 75 25 106 26C141 27 160 47 200 39C233 32 263 35 292 35",turn:"M4 21C49 21 61 43 91 43C116 43 118 7 94 7C66 7 62 57 121 57C180 57 198 21 257 21H297",anchor:"M3 30C67 30 69 52 116 52C169 52 182 20 230 20H291"};
  return <svg className={className} viewBox="0 0 300 66" fill="none" aria-hidden="true"><path d={paths[kind]} stroke="#39638e" strokeWidth="1.2" strokeLinecap="round"/>{kind==="anchor"&&<circle cx="291" cy="20" r="2.5" fill="#cc603c"/>}</svg>;
}
