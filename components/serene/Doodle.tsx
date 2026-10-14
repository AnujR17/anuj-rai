"use client";
import { useEffect, useRef } from "react";
import { Eraser } from "lucide-react";

type Point = { x: number; y: number };
type Particle = Point & {
  restX: number;
  restY: number;
  vx: number;
  vy: number;
};
type StringLine = { nodes: Particle[]; added: boolean };
type Grab = { strand: StringLine; index: number; offset: Point };
const particle = ({ x, y }: Point): Particle => ({
  x,
  y,
  restX: x,
  restY: y,
  vx: 0,
  vy: 0,
});

export function Doodle() {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  const hint = useRef<HTMLSpanElement>(null);
  const clear = useRef<() => void>(() => {});

  useEffect(() => {
    const el = canvas.current!;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0,
      height = 0,
      frame = 0;
    let strands: StringLine[] = [];
    let drawing: StringLine | null = null;
    let grabbed: Grab | null = null;
    let pointer: Point | null = null;
    let previousTime = 0;
    let trail: (Point & { time: number })[] = [];

    const path = (nodes: Point[], offset = 0) => {
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y + offset);
      for (let i = 1; i < nodes.length - 1; i++) {
        const p = nodes[i],
          next = nodes[i + 1];
        ctx.quadraticCurveTo(
          p.x,
          p.y + offset,
          (p.x + next.x) / 2,
          (p.y + next.y) / 2 + offset,
        );
      }
      const end = nodes[nodes.length - 1];
      ctx.lineTo(end.x, end.y + offset);
    };
    const drawString = (strand: StringLine) => {
      if (strand.nodes.length < 2) return;
      // A soft cast shadow gives each fine strand a little distance from the surface.
      path(strand.nodes, 3);
      ctx.strokeStyle = "rgba(53, 60, 49, .10)";
      ctx.lineWidth = 1.6;
      ctx.filter = "blur(2px)";
      ctx.stroke();
      ctx.filter = "none";
      path(strand.nodes);
      ctx.strokeStyle = strand.added
        ? "rgba(77, 84, 72, .62)"
        : "rgba(99, 108, 91, .46)";
      ctx.lineWidth = 1.05;
      ctx.stroke();
    };
    const tick = (time: number) => {
      frame = 0;
      const dt = Math.min(
        1.5,
        Math.max(0.3, (time - previousTime) / 16.67 || 1),
      );
      previousTime = time;
      let moving = false;
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (const strand of strands) {
        if (strand !== drawing) {
          const nodes = strand.nodes;
          const forces = nodes.map((p, i) => {
            const before = nodes[Math.max(0, i - 1)],
              after = nodes[Math.min(nodes.length - 1, i + 1)];
            let fx =
              (p.restX - p.x) * 0.028 +
              ((before.x - before.restX + after.x - after.restX) / 2 -
                (p.x - p.restX)) *
                0.18;
            let fy =
              (p.restY - p.y) * 0.028 +
              ((before.y - before.restY + after.y - after.restY) / 2 -
                (p.y - p.restY)) *
                0.18;
            if (pointer && !grabbed && !drawing && !reduced.matches) {
              const dx = pointer.x - p.x,
                dy = pointer.y - p.y;
              const strength =
                Math.max(0, 1 - Math.hypot(dx, dy) / 85) ** 2 * 0.028;
              fx += dx * strength;
              fy += dy * strength;
            }
            return { fx, fy };
          });
          nodes.forEach((p, i) => {
            if (i === nodes.length - 1 || (strand.added && i === 0)) return;
            if (grabbed?.strand === strand) {
              const weight = Math.exp(-((i - grabbed.index) ** 2) / 70);
              p.x += (p.restX + grabbed.offset.x * weight - p.x) * 0.5;
              p.y += (p.restY + grabbed.offset.y * weight - p.y) * 0.5;
              p.vx = p.vy = 0;
            } else if (reduced.matches) {
              p.x = p.restX;
              p.y = p.restY;
              p.vx = p.vy = 0;
            } else {
              p.vx = (p.vx + forces[i].fx * dt) * 0.86;
              p.vy = (p.vy + forces[i].fy * dt) * 0.86;
              p.x += p.vx * dt;
              p.y += p.vy * dt;
              if (
                Math.abs(p.vx) +
                  Math.abs(p.vy) +
                  Math.abs(p.x - p.restX) +
                  Math.abs(p.y - p.restY) >
                0.12
              )
                moving = true;
            }
          });
        }
        drawString(strand);
      }
      trail = trail.filter((p) => time - p.time < 450);
      if (trail.length > 1 && !reduced.matches) {
        path(trail);
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = "rgba(99, 108, 91, .10)";
        ctx.stroke();
      }
      if (moving || grabbed || drawing || trail.length) schedule();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const rect = el.getBoundingClientRect(),
        oldWidth = width,
        oldHeight = height;
      width = rect.width;
      height = rect.height;
      const added = strands.filter((s) => s.added);
      if (oldWidth && oldHeight)
        for (const s of added)
          for (const p of s.nodes) {
            p.x = p.restX *= width / oldWidth;
            p.y = p.restY *= height / oldHeight;
            p.vx = p.vy = 0;
          }
      const ratio = devicePixelRatio || 1;
      el.width = width * ratio;
      el.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      strands = added;
      drawing = null;
      grabbed = null;
      host.current!.dataset.ready = "true";
      schedule();
    };
    const point = (e: PointerEvent): Point => {
      const r = el.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const nearest = (p: Point) => {
      let match: { strand: StringLine; index: number } | null = null,
        distance = 14;
      for (const strand of strands) {
        for (let index = 0; index < strand.nodes.length; index++) {
          const n = strand.nodes[index];
          if (
            index === strand.nodes.length - 1 ||
            (strand.added && index === 0)
          )
            continue;
          const d = Math.hypot(p.x - n.x, p.y - n.y);
          if (d < distance) {
            distance = d;
            match = { strand, index };
          }
        }
      }
      return match;
    };
    const updateCursor = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointer = point(e);
      const match = grabbed || nearest(pointer);
      cursor.current!.style.left = `${pointer.x}px`;
      cursor.current!.style.top = `${pointer.y}px`;
      cursor.current!.dataset.mode = match ? "pull" : "draw";
      cursor.current!.hidden = false;
      hint.current!.textContent = match ? "Adjust a line" : "Draw a line";
      hint.current!.hidden = Boolean(
        drawing ||
          grabbed ||
          pointer.y > height * 0.62 ||
          pointer.x < width * 0.25,
      );
      schedule();
    };
    const down = (e: PointerEvent) => {
      if (e.pointerType === "touch" || e.button !== 0) return;
      updateCursor(e);
      const p = point(e),
        match = nearest(p);
      if (match) {
        grabbed = { ...match, offset: { x: 0, y: 0 } };
      } else {
        drawing = { added: true, nodes: [particle(p)] };
        strands.push(drawing);
        if (strands.filter((s) => s.added).length > 24)
          strands.splice(
            strands.findIndex((s) => s.added),
            1,
          );
      }
      hint.current!.hidden = true;
      trail = [];
      el.setPointerCapture(e.pointerId);
      schedule();
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      updateCursor(e);
      const p = point(e);
      if (grabbed) {
        const n = grabbed.strand.nodes[grabbed.index];
        grabbed.offset = { x: p.x - n.restX, y: p.y - n.restY };
      } else if (drawing) {
        const last = drawing.nodes[drawing.nodes.length - 1];
        if (Math.hypot(p.x - last.x, p.y - last.y) > 3)
          drawing.nodes.push(particle(p));
        if (drawing.nodes.length > 180)
          drawing.nodes = drawing.nodes.filter((_, i) => i % 2 === 0);
      } else if (!reduced.matches) {
        trail.push({ ...p, time: performance.now() });
        if (trail.length > 36) trail.shift();
      }
    };
    const up = () => {
      if (drawing && drawing.nodes.length < 2)
        strands = strands.filter((s) => s !== drawing);
      drawing = null;
      grabbed = null;
      trail = [];
      schedule();
    };
    const leave = () => {
      cursor.current!.hidden = true;
      hint.current!.hidden = true;
      pointer = null;
      schedule();
    };
    clear.current = () => {
      strands = [];
      drawing = null;
      grabbed = null;
      trail = [];
      pointer = null;
      schedule();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") clear.current();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    el.addEventListener("pointerenter", updateCursor);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("pointerleave", leave);
    window.addEventListener("keydown", key);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", updateCursor);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("pointerleave", leave);
      window.removeEventListener("keydown", key);
    };
  }, []);

  return (
    <div ref={host} className="doodle">
      <canvas
        ref={canvas}
        aria-label="Optional drawing surface. Drag open space to draw a line. Use Erase or Escape to clear your drawing. Touch screens keep normal scrolling."
      />
      <span ref={cursor} className="draw-cursor" hidden aria-hidden="true">
        <svg width="29" height="29" viewBox="0 0 29 29" fill="none">
          <path d="M14.5 1v8m0 11v8M1 14.5h8m11 0h8" stroke="currentColor" />
          <circle cx="14.5" cy="14.5" r="2" fill="currentColor" />
          <circle
            className="cursor-ring"
            cx="14.5"
            cy="14.5"
            r="6"
            stroke="currentColor"
          />
        </svg>
        <span ref={hint} className="draw-hint" hidden />
      </span>
      <button
        className="hero-eraser"
        type="button"
        onClick={() => clear.current()}
        aria-label="Erase drawing"
      >
        <Eraser size={15} strokeWidth={1.5} aria-hidden="true" />
        Erase
      </button>
    </div>
  );
}
