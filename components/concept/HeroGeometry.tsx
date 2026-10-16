"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./HeroGeometry.module.css";

const names = ["point", "line", "triangle", "square", "pentagon", "hexagon", "heptagon", "octagon", "nonagon", "decagon", "hendecagon", "dodecagon"];

// Equal-length paths let every edge develop from the preceding shape.
function shapePath(sides: number) {
  const radius = sides === 1 ? 0 : 104;
  const rotation = sides === 2 ? 0 : sides === 4 ? -Math.PI / 4 : -Math.PI / 2;
  const vertex = (index: number) => {
    const angle = rotation + index * Math.PI * 2 / sides;
    return [250 + Math.cos(angle) * radius, 150 + Math.sin(angle) * radius];
  };
  return Array.from({ length: 120 }, (_, sample) => {
    const position = sample / 120 * sides;
    const edge = Math.floor(position);
    const firstSample = Math.ceil(edge * 120 / sides);
    const nextSample = Math.ceil((edge + 1) * 120 / sides);
    const start = vertex(edge);
    const end = vertex(edge + 1);
    const amount = (sample - firstSample) / (nextSample - firstSample);
    return `${sample === 0 ? "M" : "L"}${(start[0] + (end[0] - start[0]) * amount).toFixed(2)},${(start[1] + (end[1] - start[1]) * amount).toFixed(2)}`;
  }).join(" ") + " Z";
}

export function HeroGeometry() {
  const [sides, setSides] = useState(1);
  const reduced = useReducedMotion();
  return (
    <button type="button" className={styles.experiment} data-geometry data-sides={sides}
      aria-label={`Change shape, currently ${names[sides - 1]}`}
      onClick={() => setSides(current => current % 12 + 1)}
      onKeyDown={event => {
        if (event.key === "Home" || event.key === "Escape") { event.preventDefault(); setSides(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); setSides(current => (current + 10) % 12 + 1); }
        if (event.key === "ArrowRight") { event.preventDefault(); setSides(current => current % 12 + 1); }
      }}>
      <svg viewBox="120 20 260 260" fill="none" aria-hidden="true">
        <circle className={styles.guide} cx="250" cy="150" r="125" />
        <circle className={styles.guide} cx="250" cy="150" r="67" />
        <motion.path initial={false} animate={{ d: shapePath(sides), opacity: sides === 1 ? 0 : 1 }}
          transition={{ duration: reduced ? 0 : .45, ease: [.22, 1, .36, 1] }}
          stroke="currentColor" strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
        <motion.circle cx="250" cy="150" initial={false} animate={{ r: sides === 1 ? 14 : 0 }} transition={{ duration: reduced ? 0 : .2 }} fill="currentColor" />
      </svg>
      <span className={styles.status} role="status">{names[sides - 1]}</span>
    </button>
  );
}
