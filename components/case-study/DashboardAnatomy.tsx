"use client";

import { useState } from "react";
import Image from "next/image";

const signals = [
  { title: "Speed at the centre", text: "The largest reading anchors the composition. Its position gives the eye a consistent place to return.", region: "speed" },
  { title: "RPM around the edge", text: "The scale follows the circular boundary, leaving the centre available for the primary reading.", region: "rpm" },
  { title: "Gear in its own region", text: "A separate area on the right keeps the gear state distinct from the central speed value.", region: "gear" },
  { title: "Warnings grouped below", text: "Several symbols share a compact area. Their competition for attention is a question for further evaluation.", region: "warnings" },
] as const;

export function DashboardAnatomy() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="dashboard-anatomy">
      <figure>
        <div className="dashboard-artifact">
          <Image src="/portfolio/himalayan-dashboard.png" alt="Original circular dashboard export, with central speed, an outer RPM arc, a right-hand gear indicator, and warning symbols below." width={385} height={385} preload sizes="(max-width: 700px) 82vw, 385px" />
          {active !== null && <span aria-hidden="true" className={`dashboard-highlight highlight-${signals[active].region}`} />}
        </div>
        <figcaption id="dashboard-caption">Original interface export · Illustrative values.<br /><a href="/portfolio/himalayan-dashboard.png">View the unannotated image</a></figcaption>
      </figure>
      <div className="dashboard-reading">
        <p className="case-visual-label">Read the layout</p>
        <h2>A hierarchy you can inspect.</h2>
        <p className="case-visual-intro">Select a reading to locate it on the original export.</p>
        <div className="dashboard-signal-list" aria-label="Dashboard annotations">
          {signals.map((signal, index) => (
            <button key={signal.region} type="button" aria-pressed={active === index} aria-describedby="dashboard-caption" onClick={() => setActive(active === index ? null : index)}>
              <span className="signal-number" aria-hidden="true">0{index + 1}</span>
              <span><strong>{signal.title}</strong><span>{signal.text}</span></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
