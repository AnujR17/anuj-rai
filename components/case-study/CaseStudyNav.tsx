"use client";

import { useEffect, useState } from "react";
import { caseStages, type StageId } from "@/data/case-study";
import styles from "./case-study.module.css";

export function CaseStudyNav() {
  const [active, setActive] = useState<StageId>("research");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: StageId = "research";
      for (const stage of caseStages) {
        const section = document.getElementById(stage.id);
        if (section && section.getBoundingClientRect().top <= Math.min(180, innerHeight * .25)) current = stage.id;
      }
      setActive(current);
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    queue();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    window.addEventListener("hashchange", queue);
    const observer = new ResizeObserver(queue);
    const story = document.getElementById("research")?.parentElement;
    if (story) observer.observe(story);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue); window.removeEventListener("hashchange", queue); };
  }, []);
  return <nav className={styles.stageNav} aria-label="Case study stages">
    {caseStages.map(stage => <a key={stage.id} href={`#${stage.id}`} aria-current={active === stage.id ? "location" : undefined}>{stage.title}</a>)}
  </nav>;
}
