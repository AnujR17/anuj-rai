"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./swiggy-case-study.module.css";

const versions = [
  { label: "First wireframe", src: "/portfolio/swiggy/evolution/wireframe-1.png", date: "Working policy v1.3", change: "Order, evidence, permission and party records sit beside the chat. Policy conditions are compact rows.", benefit: "The agent can relate a condition to the case without leaving the workspace.", tradeoff: "Permission repeats in several places. Customer-only photos make the evidence model asymmetric." },
  { label: "Second iteration", src: "/portfolio/swiggy/evolution/wireframe-2.png", date: "14 October", change: "Rider and Restaurant become separate views. Standing restaurant terms replace the live permission workflow. Hold joins a five-action row.", benefit: "Party-specific investigation stays inside the case; proposed terms remove a repeated permission-request interaction.", tradeoff: "Standing terms and platform funding are project choices, not verified Swiggy practice. Legal deadlines move offscreen." },
  { label: "Third iteration", src: "/portfolio/swiggy/evolution/wireframe-3.png", date: "15 October", change: "Hold moves beside the chat timer. The decision row returns to four actions. History moves to the top; Subject sits above policy checks.", benefit: "Conversation state and remedy choice become separate controls. The issue is visible beside the rules it changes.", tradeoff: "The Star case still shows an earlier outcome and fairness score. That can anchor the next decision." },
  { label: "Agent Desk v7.1", src: "/portfolio/swiggy/media/wrong-item.png", date: "7 November", change: "Real photo-viewer states, a compact queue, party-contact panels and decision-message drafts replace the earlier wireframe controls. Star case is absent.", benefit: "Evidence observations and the agent’s own choice have visible interaction states, followed by an explanation and record.", tradeoff: "Policy checks start collapsed; drafts exceed one line; partial refunds cannot represent part of an item. These remain open findings." },
];

export function SwiggyEvolution() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => { const node = root.current; if (node) node.dataset.enhanced = "true"; return () => { if (node) delete node.dataset.enhanced; }; }, []);
  return <div ref={root} className={styles.evolution}>
    <div className={styles.versionTabs} role="tablist" aria-label="Swiggy design iterations">
      {versions.map((version, index) => <button key={version.label} id={`version-tab-${index}`} role="tab" aria-selected={active === index} aria-controls={`version-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
        const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
        if (!direction && event.key !== "Home" && event.key !== "End") return;
        event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? versions.length - 1 : (active + direction + versions.length) % versions.length;
        setActive(next); document.getElementById(`version-tab-${next}`)?.focus();
      }}>{version.label}</button>)}
    </div>
    {versions.map((version, index) => <section id={`version-panel-${index}`} role="tabpanel" aria-labelledby={`version-tab-${index}`} className={styles.versionPanel} data-active={active === index} key={version.label}>
      <h3>{version.label}<span>{version.date}</span></h3>
      <a href={version.src} aria-label={`Open ${version.label} at full size`}><Image src={version.src} width={1440} height={index < 3 ? 901 : 900} loading="eager" alt={`Original ${version.label} wrong-item workspace`} sizes="(max-width: 700px) 90vw, 1000px" /></a>
      <dl className={styles.changeReading}><div><dt>Changed</dt><dd>{version.change}</dd></div><div><dt>Intended benefit</dt><dd>{version.benefit}</dd></div><div><dt>Trade-off</dt><dd>{version.tradeoff}</dd></div></dl>
    </section>)}
  </div>;
}
