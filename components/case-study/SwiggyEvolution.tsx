"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./swiggy-case-study.module.css";

const versions = [
  { label: "First wireframe", src: "/portfolio/swiggy/evolution/wireframe-1.png", date: "Working policy v1.3", description: "The order, evidence and party records already sit beside the chat. Permission appears in several places, though, and the policy rows compete for height." },
  { label: "Second iteration", src: "/portfolio/swiggy/evolution/wireframe-2.png", date: "14 October", description: "Rider and Restaurant become separate views within the case. Standing restaurant terms replace the live permission request, as a project assumption. Hold still sits in the decision row, alongside the four remedy choices." },
  { label: "Third iteration", src: "/portfolio/swiggy/evolution/wireframe-3.png", date: "15 October", description: "Hold moves beside the timer, and history sits above the issue type and policy checks. The separation makes waiting and choosing a remedy distinct. The Star case remains in this version, with a past outcome and fairness score that the final prototype drops." },
  { label: "Agent Desk v7.1", src: "/portfolio/swiggy/media/wrong-item.png", date: "7 November", description: "The coded prototype adds the photo viewer, party-contact panels and decision-message drafts. Working through complete cases also exposes what the static layout could not settle: a partial refund without an amount field, a cramped reply box and checks hidden behind a collapsed row." },
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
      <div className={styles.versionStack} data-version-stack>
        <div className={styles.versionBackOne} aria-hidden="true"><Image unoptimized src={versions[(index + 1) % versions.length].src} width={1440} height={900} alt="" sizes="(max-width: 700px) 80vw, 900px" /></div>
        <div className={styles.versionBackTwo} aria-hidden="true"><Image unoptimized src={versions[(index + 2) % versions.length].src} width={1440} height={900} alt="" sizes="(max-width: 700px) 80vw, 900px" /></div>
        <a className={styles.versionFront} href={version.src} aria-label={`Open ${version.label} at full size`}><Image unoptimized src={version.src} width={1440} height={index < 3 ? 901 : 900} loading="eager" alt={`Original ${version.label} wrong-item workspace`} sizes="(max-width: 700px) 90vw, 1000px" /></a>
      </div>
      <p className={styles.versionStory}>{version.description}</p>
    </section>)}
  </div>;
}
