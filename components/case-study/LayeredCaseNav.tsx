"use client";

import { useEffect, useRef, useState } from "react";
import { caseStages, type StageId } from "@/data/case-study";

export function LayeredCaseNav() {
  const nav = useRef<HTMLElement>(null);
  const mobile = useRef<HTMLLabelElement>(null);
  const [active, setActive] = useState<StageId>("research");
  useEffect(() => {
    const story = document.getElementById("lf-case-story");
    const article = story?.closest<HTMLElement>(".lf-main");
    if (!story || !article || !nav.current || !mobile.current) return;
    article.dataset.enhanced = "true";
    let pending = 0, alive = true;
    const update = () => {
      pending = 0;
      const bounds = story.getBoundingClientRect(), desktop = innerWidth > 700;
      const index = desktop ? nav.current! : mobile.current!;
      const height = index.getBoundingClientRect().height;
      const inset = Math.max(32, Math.min(64, innerHeight * .06));
      index.style.top = Math.min(desktop ? innerHeight - inset - height : 0, bounds.bottom - height - (desktop ? 24 : 0)) + "px";
      const visible = bounds.top <= (desktop ? 120 : 96) && bounds.bottom > 0;
      nav.current!.dataset.visible = String(desktop && visible);
      mobile.current!.dataset.visible = String(!desktop && visible);
      let current: StageId = "research";
      const sections = caseStages.map(stage => document.getElementById(stage.id)!);
      for (const section of sections) if (section.getBoundingClientRect().top <= (desktop ? Math.min(180, innerHeight * .25) : 96)) current = section.id as StageId;
      setActive(current);
      for (const link of Array.from(nav.current!.querySelectorAll("a"))) {
        const y = link.getBoundingClientRect().y + link.getBoundingClientRect().height / 2;
        const backdrop = sections.find(section => { const box = section.getBoundingClientRect(); return box.top <= y && box.bottom > y; });
        link.dataset.tone = backdrop?.dataset.tone ?? "light";
      }
    };
    const queue = () => { if (alive && !pending) pending = requestAnimationFrame(update); };
    const resize = new ResizeObserver(queue); resize.observe(story);
    window.addEventListener("scroll", queue, { passive: true }); window.addEventListener("resize", queue); window.addEventListener("hashchange", queue);
    document.fonts.ready.then(queue); queue();
    return () => { alive = false; cancelAnimationFrame(pending); resize.disconnect(); window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue); window.removeEventListener("hashchange", queue); delete article.dataset.enhanced; };
  }, []);
  return <>
    <nav ref={nav} className="lf-stage-index" aria-label="Case study stages">{caseStages.map(stage => <a href={`#${stage.id}`} key={stage.id} aria-current={active === stage.id ? "location" : undefined}>{stage.title}</a>)}</nav>
    <label ref={mobile} className="lf-mobile-index">Stage<select aria-label="Case study stage" value={active} onChange={event => { location.hash = event.target.value; }}>{caseStages.map(stage => <option value={stage.id} key={stage.id}>{stage.title}</option>)}</select></label>
  </>;
}
