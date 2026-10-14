"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ScribbleAccent } from "./ScribbleAccent";
import { useScribbleTheme, type SketchPoint } from "./ScribbleTheme";

const actions = [
  {
    title: "Collect the pieces",
    description:
      "An observation, a question, something that doesn’t quite fit.",
    note: "Loose marks, with room for a few different possibilities.",
  },
  {
    title: "Find a connection",
    description:
      "Look for relationships. Work out what matters and what can wait.",
    note: "A hierarchy gives the pieces a relationship: speed, gear and warnings each have a place.",
  },
  {
    title: "Give it a useful form",
    description: "Make something I can examine, try and change.",
    note: "An original Himalayan interface export gives this example a concrete form.",
  },
];
const sample = (fn: (t: number) => SketchPoint) =>
  Array.from({ length: 48 }, (_, i) => fn(i / 47));
const loose = Array.from({ length: 5 }, (_, n) =>
  sample((t) => ({
    x:
      100 +
      n * 85 +
      Math.sin(t * Math.PI * (3 + n * 0.4) + n) * 70 +
      Math.cos(t * 11 + n) * 12,
    y:
      180 +
      Math.cos(t * Math.PI * (4 + n * 0.2)) * 72 +
      Math.sin(t * 19 + n) * 16,
  })),
);
const connections = [
  sample((t) => ({
    x: 320 + 80 * Math.cos(t * Math.PI * 2),
    y: 200 + 80 * Math.sin(t * Math.PI * 2),
  })),
  sample((t) => ({ x: 130 + t * 115, y: 210 - t * 10 })),
  sample((t) => ({ x: 395 + t * 125, y: 178 - t * 55 })),
  sample((t) => ({ x: 387 + t * 105, y: 245 + t * 57 })),
  sample((t) => ({ x: 285 + t * 70, y: 205 + Math.sin(t * Math.PI) * 3 })),
];
const rings = Array.from({ length: 5 }, (_, n) =>
  sample((t) => ({
    x: 320 + (102 + n * 5) * Math.cos(t * Math.PI * 2),
    y: 200 + (102 + n * 5) * Math.sin(t * Math.PI * 2),
  })),
);
const path = (points: SketchPoint[]) =>
  points
    .map((p, n) => `${n ? "L" : "M"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(" ");
function normalise(sketch: SketchPoint[][]) {
  const all = sketch.flat();
  if (!all.length) return loose;
  const minX = Math.min(...all.map((p) => p.x)),
    maxX = Math.max(...all.map((p) => p.x)),
    minY = Math.min(...all.map((p) => p.y)),
    maxY = Math.max(...all.map((p) => p.y));
  const scale = Math.min(
    450 / Math.max(maxX - minX, 0.01),
    230 / Math.max(maxY - minY, 0.01),
  );
  return sketch
    .slice(0, 5)
    .filter((s) => s.length > 1)
    .map((s) =>
      sample((t) => {
        const idx = t * (s.length - 1),
          a = s[Math.floor(idx)],
          b = s[Math.min(s.length - 1, Math.ceil(idx))],
          f = idx % 1;
        return {
          x: 320 + (a.x + (b.x - a.x) * f - (minX + maxX) / 2) * scale,
          y: 200 + (a.y + (b.y - a.y) * f - (minY + maxY) / 2) * scale,
        };
      }),
    );
}
export function HowIWork() {
  const [active, setActive] = useState(0);
  const { sketch } = useScribbleTheme();
  const reduced = useReducedMotion();
  const marks = useMemo(() => normalise(sketch), [sketch]);
  return (
    <section className="sense-section section-pad" id="approach">
      <div className="section-heading">
        <h2>
          Making{" "}
          <span className="marked-word">
            sense
            <ScribbleAccent />
          </span>
          <br />
          of the mess.
        </h2>
        <p>
          I like starting with loose pieces and working out how they fit.
          Sometimes a small connection changes the whole picture.
        </p>
      </div>
      <div className="sense-layout">
        <div className="sense-notes">
          <p className="eyebrow">How I work</p>
          <div className="sense-actions">
            {actions.map((a, n) => (
              <button
                type="button"
                key={a.title}
                aria-pressed={n === active}
                aria-controls="sense-stage"
                onClick={() => setActive(n)}
              >
                <span>0{n + 1}</span>
                <div>
                  <strong>{a.title}</strong>
                  <p>{a.description}</p>
                </div>
                <span aria-hidden="true">{n === active ? "↗" : "·"}</span>
              </button>
            ))}
          </div>
          <p className="sense-aside">
            I move between these, depending on the question.
          </p>
        </div>
        <div className="sense-sketchbook">
          <div className="sketchbook-top">
            <span>
              {sketch.length
                ? "Your marks, a starting point"
                : "A few loose marks to start with"}
            </span>
            <span aria-hidden="true">↗</span>
          </div>
          <div
            className="sense-stage"
            id="sense-stage"
            data-stage={active}
            aria-label={actions[active].title}
          >
            <svg
              viewBox="0 0 640 400"
              fill="none"
              className="sense-lines"
              aria-hidden="true"
            >
              {marks.map((mark, n) => (
                <motion.path
                  key={n}
                  initial={false}
                  animate={{
                    d: path(
                      active === 0
                        ? mark
                        : active === 1
                          ? connections[n % connections.length]
                          : rings[n % rings.length],
                    ),
                  }}
                  transition={{
                    duration: reduced ? 0 : 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </svg>
            {active === 1 && (
              <div className="sense-labels" aria-hidden="true">
                <span>Speed</span>
                <span>Gear</span>
                <span>Warnings</span>
              </div>
            )}
            {active === 2 && (
              <div className="sense-result">
                <div className="display-housing">
                  <Image
                    src="/portfolio/himalayan-dashboard.png"
                    alt="Original Himalayan circular dashboard interface inside a display housing"
                    width={385}
                    height={385}
                  />
                </div>
                <span>Something I can examine.</span>
              </div>
            )}
          </div>
          <div className="sense-controls">
            <button
              className="sense-next"
              type="button"
              onClick={() => setActive((active + 1) % 3)}
            >
              {active === 0
                ? "Find a connection"
                : active === 1
                  ? "Give it a form"
                  : "Start again"}
              <span aria-hidden="true">→</span>
            </button>
            {active !== 0 && (
              <button
                className="text-button"
                type="button"
                onClick={() => setActive(0)}
              >
                Back to the loose marks
              </button>
            )}
          </div>
          <p className="caption" role="status">
            {actions[active].note}
          </p>
          <p className="sense-provenance">
            A visual illustration of the approach.{" "}
            <Link href="/work/two-wheeler-dashboard/">
              The case shows the actual work ↗
            </Link>
          </p>
        </div>
      </div>
      <div className="sense-footer">
        <Link href="#hero">
          Leave a mark in the hero <span>↑</span>
        </Link>
        <span>Your scribble can become the starting point here.</span>
      </div>
    </section>
  );
}
