"use client";
import { useEffect, useRef } from "react";

export function Doodle() {
  const canvas = useRef<HTMLCanvasElement>(null),
    cursor = useRef<HTMLSpanElement>(null),
    clear = useRef<() => void>(() => {});
  useEffect(() => {
    const el = canvas.current!;
    const ctx = el.getContext("2d")!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    type Point = { x: number; y: number; t: number };
    let trails: Point[][] = [],
      strokes: Point[][] = [],
      active: Point[] | null = null,
      trail: Point[] = [],
      frame = 0;
    const resize = () => {
      const r = el.getBoundingClientRect();
      const d = devicePixelRatio || 1;
      el.width = r.width * d;
      el.height = r.height * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    clear.current = () => {
      strokes = [];
      trails = [];
      trail = [];
      active = null;
      ctx.clearRect(0, 0, el.width, el.height);
    };
    const point = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      return {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        t: performance.now(),
      };
    };
    const down = (e: PointerEvent) => {
      if (e.pointerType === "touch" || e.button !== 0) return;
      active = [point(e)];
      strokes.push(active);
      if (strokes.length > 60) strokes.shift();
      el.setPointerCapture(e.pointerId);
    };
    const showCursor = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const p = point(e);
      cursor.current!.style.left = `${p.x}px`;
      cursor.current!.style.top = `${p.y}px`;
      cursor.current!.hidden = false;
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      showCursor(e);
      const p = point(e);
      if (active) {
        active.push(p);
        if (active.length > 3000) active.shift();
      } else if (!reduced.matches) {
        trail.push(p);
        if (trail.length > 60) trail.shift();
      }
    };
    const up = () => {
      active = null;
      trail = [];
    };
    const leave = () => {
      cursor.current!.hidden = true;
      if (trail.length) trails.push(trail);
      trail = [];
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") clear.current();
    };
    const line = (points: Point[], alpha: number) => {
      if (points.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (const p of points.slice(1)) ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = `rgba(56,62,60,${alpha})`;
      ctx.lineWidth = 1.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    };
    const paint = () => {
      ctx.clearRect(0, 0, el.width, el.height);
      for (const stroke of strokes) line(stroke, 0.65);
      const now = performance.now();
      trail = trail.filter((p) => now - p.t < 650);
      trails = trails
        .map((t) => t.filter((p) => now - p.t < 650))
        .filter((t) => t.length > 1);
      for (const t of [...trails, trail]) line(t, 0.12);
      frame = requestAnimationFrame(paint);
    };
    frame = requestAnimationFrame(paint);
    el.addEventListener("pointerenter", showCursor);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("pointerleave", leave);
    window.addEventListener("keydown", key);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", showCursor);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("pointerleave", leave);
      window.removeEventListener("keydown", key);
    };
  }, []);
  return (
    <div className="doodle">
      <svg
        className="quiet-lines"
        viewBox="0 0 800 500"
        fill="none"
        aria-hidden="true"
      >
        <path d="M30 225C190 227 525 22 825 98" />
        <path d="M70 270C250 270 558 53 820 152" />
        <path d="M295-40C286 120 525 342 839 373" />
      </svg>
      <canvas
        ref={canvas}
        aria-label="Optional drawing surface. Drag with a mouse or pen to draw. Touch scrolling is preserved."
      />
      <span ref={cursor} className="draw-cursor" hidden aria-hidden="true">
        <svg width="29" height="29" viewBox="0 0 29 29" fill="none">
          <path d="M14.5 1v8m0 11v8M1 14.5h8m11 0h8" stroke="currentColor" />
          <circle cx="14.5" cy="14.5" r="2" fill="currentColor" />
        </svg>
      </span>
      <div className="doodle-note">
        <span>Leave a little mark.</span>
        <button
          type="button"
          onClick={() => clear.current()}
          aria-label="Clear drawing"
        >
          Clear ↺
        </button>
      </div>
    </div>
  );
}
