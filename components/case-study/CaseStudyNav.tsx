"use client";

import { useEffect, useState } from "react";
import { caseStages, type StageId } from "@/data/case-study";
import styles from "./case-study.module.css";

export function CaseStudyNav() {
  const [active, setActive] = useState<StageId | null>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: StageId | null = null;
      for (const stage of caseStages) {
        const section = document.getElementById(stage.id);
        if (section && section.getBoundingClientRect().top <= 120) current = stage.id;
      }
      setActive(current);
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    queue();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue); };
  }, []);
  return <nav className={styles.stageNav} aria-label="Case study stages">
    {caseStages.map(stage => <a key={stage.id} href={`#${stage.id}`} aria-current={active === stage.id ? "location" : undefined}>{stage.title}</a>)}
  </nav>;
}
