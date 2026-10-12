"use client";

import { useEffect, useId, useRef } from "react";
import { clamp, mix, projectedPath, strands } from "./skein-geometry";
import styles from "./thread.module.css";

type Renderer = ReturnType<typeof import("./SkeinRenderer").createSkeinRenderer>;

export function ThreadStudy() {
  const host = useRef<HTMLButtonElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const target = useRef(0), amount = useRef(0);
  const look = useRef({ x: 0, y: 0 });
  const request = useRef<() => void>(() => {});
  const drag = useRef<{ x: number; amount: number; moved: boolean } | null>(null);
  const manual = useRef(false), dragged = useRef(false);
  const id = useId().replaceAll(":", "");

  function change(progress: number) {
    target.current = clamp(progress);
    host.current?.setAttribute("aria-pressed", String(target.current > .5));
    host.current?.setAttribute("aria-label", target.current > .5 ? "Gather the threads" : "Unwind the threads");
    request.current();
  }

  useEffect(() => {
    const element = host.current, surface = canvas.current;
    if (!element || !surface) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const paths = [...element.querySelectorAll<SVGPathElement>("[data-strand]")];
    const shadows = [...element.querySelectorAll<SVGPathElement>("[data-shadow-strand]")];
    let renderer: Renderer | null = null, loading = false, disposed = false, visible = false;
    let frame = 0, last = 0, x = 0, y = 0, lost = false;

    function draw() {
      if (renderer && !lost) renderer.render(amount.current, x, y);
      else paths.forEach((path, i) => {
        const d = projectedPath(i, amount.current);
        path.setAttribute("d", d); shadows[i].setAttribute("d", d);
      });
      element!.dataset.unwind = amount.current.toFixed(3);
    }
    function tick(now: number) {
      frame = 0;
      if (disposed || !visible || document.hidden) { last = 0; return; }
      const dt = last ? now - last : 16;
      last = now;
      const easing = media.matches ? 1 : 1 - Math.exp(-dt / 240);
      amount.current = mix(amount.current, target.current, easing);
      x = mix(x, media.matches ? 0 : look.current.x, easing);
      y = mix(y, media.matches ? 0 : look.current.y, easing);
      const settled = Math.abs(amount.current - target.current) < .0005 && Math.abs(x - look.current.x) < .0005 && Math.abs(y - look.current.y) < .0005;
      if (Math.abs(amount.current - target.current) < .0005) amount.current = target.current;
      draw();
      if (!settled && !media.matches) frame = requestAnimationFrame(tick);
      else last = 0;
    }
    function schedule() {
      if (disposed) return;
      if (media.matches) { amount.current = target.current; x = 0; y = 0; draw(); return; }
      if (visible && !document.hidden && !frame) frame = requestAnimationFrame(tick);
    }
    function resize() {
      const bounds = element!.getBoundingClientRect();
      if (bounds.width && bounds.height) renderer?.resize(bounds.width, bounds.height);
      draw();
    }
    async function load() {
      if (loading || renderer || disposed) return;
      loading = true;
      try {
        const rendererModule = await import("./SkeinRenderer");
        if (disposed) return;
        renderer = rendererModule.createSkeinRenderer(surface!);
        resize();
        element!.dataset.ready = "true";
        element!.dataset.renderer = "webgl";
      } catch {
        // Content and the SVG remain usable if WebGL is unavailable.
        element!.dataset.renderer = "svg";
        draw();
      }
    }
    function reconcile() {
      cancelAnimationFrame(frame); frame = 0; last = 0;
      schedule();
    }
    function scroll() {
      if (manual.current) return;
      const section = element!.closest("section")!;
      const rect = section.getBoundingClientRect();
      const progress = clamp(-rect.top / (rect.height * .8));
      target.current = progress;
      element!.setAttribute("aria-pressed", String(progress > .5));
      element!.setAttribute("aria-label", progress > .5 ? "Gather the threads" : "Unwind the threads");
      schedule();
    }
    function contextLost(event: Event) {
      if (disposed) return;
      event.preventDefault(); lost = true;
      delete element!.dataset.ready;
      draw();
    }
    function contextRestored() {
      if (disposed) return;
      // Redraw after Three has rebuilt its context in the other restoration listener.
      window.setTimeout(() => {
        if (disposed) return;
        lost = false; resize(); element!.dataset.ready = "true";
      }, 0);
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) { void load(); scroll(); }
      reconcile();
    });
    const sizes = new ResizeObserver(resize);
    observer.observe(element); sizes.observe(element);
    request.current = schedule;
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("visibilitychange", reconcile);
    media.addEventListener("change", reconcile);
    surface.addEventListener("webglcontextlost", contextLost);
    surface.addEventListener("webglcontextrestored", contextRestored);
    return () => {
      disposed = true; request.current = () => {};
      cancelAnimationFrame(frame); observer.disconnect(); sizes.disconnect();
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("visibilitychange", reconcile);
      media.removeEventListener("change", reconcile);
      surface.removeEventListener("webglcontextlost", contextLost);
      surface.removeEventListener("webglcontextrestored", contextRestored);
      renderer?.dispose();
    };
  }, []);

  return <button ref={host} type="button" className={styles.study} aria-label="Unwind the threads" aria-pressed="false" data-unwind="0"
    onClick={event => { if (dragged.current && event.detail !== 0) { dragged.current = false; return; } manual.current = true; change(target.current > .5 ? 0 : 1); }}
    onPointerDown={event => { if (event.button !== 0) return; dragged.current = false; drag.current = { x: event.clientX, amount: target.current, moved: false }; event.currentTarget.setPointerCapture(event.pointerId); }}
    onPointerMove={event => {
      const bounds = event.currentTarget.getBoundingClientRect();
      look.current = { x: (event.clientX - bounds.left) / bounds.width * 2 - 1, y: (event.clientY - bounds.top) / bounds.height * 2 - 1 };
      if (drag.current && Math.abs(event.clientX - drag.current.x) > 7) {
        drag.current.moved = true; manual.current = true;
        change(drag.current.amount + (event.clientX - drag.current.x) / bounds.width * 1.8);
      } else request.current();
    }}
    onPointerUp={event => { dragged.current = drag.current?.moved ?? false; drag.current = null; event.currentTarget.releasePointerCapture(event.pointerId); }}
    onPointerCancel={() => { drag.current = null; dragged.current = true; }}
    onLostPointerCapture={() => { drag.current = null; }}
    onPointerLeave={() => { look.current = { x: 0, y: 0 }; request.current(); }}>
    <svg viewBox="0 0 800 600" className={styles.fallback} fill="none" aria-hidden="true">
      <defs><filter id={id + "shadow"}><feGaussianBlur stdDeviation="2" /></filter></defs>
      <g stroke="#344936" strokeWidth="3" opacity=".15" transform="translate(15,24)" filter={`url(#${id}shadow)`}>{strands.map((_, i) => <path data-shadow-strand={i} key={i} d={projectedPath(i, 0)} />)}</g>
      {strands.map((strand, i) => <path data-strand={i} key={i} d={projectedPath(i, 0)} stroke={strand.color} strokeWidth={strand.radius * 2.3} strokeLinecap="round" strokeLinejoin="round" />)}
    </svg>
    <canvas ref={canvas} className={styles.canvas} aria-hidden="true" />
  </button>;
}
