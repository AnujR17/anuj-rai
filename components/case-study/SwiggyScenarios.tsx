"use client";

import { useEffect, useRef, useState } from "react";
import { swiggyScenarios } from "@/data/swiggy-case-study";
import { DeviceMotion } from "./DeviceMotion";
import styles from "./swiggy-case-study.module.css";

export function SwiggyScenarios() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => { const node = root.current; if (node) node.dataset.enhanced = "true"; }, []);

  function choose(index: number) {
    root.current?.querySelectorAll("video").forEach(video => video.pause());
    setActive(index);
  }

  return <div ref={root} className={styles.scenarioShowcase} aria-label="Five scenario investigations">
    <div className={styles.scenarioTabs} role="tablist" aria-label="Support scenarios">
      {swiggyScenarios.map((scenario, index) => <button key={scenario.id} type="button" role="tab" id={"scenario-tab-" + scenario.id} aria-controls={"scenario-panel-" + scenario.id} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => choose(index)} onKeyDown={event => {
        const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
        if (!direction && event.key !== "Home" && event.key !== "End") return;
        event.preventDefault();
        const next = event.key === "Home" ? 0 : event.key === "End" ? swiggyScenarios.length - 1 : (active + direction + swiggyScenarios.length) % swiggyScenarios.length;
        choose(next); document.getElementById("scenario-tab-" + swiggyScenarios[next].id)?.focus();
      }}>{scenario.title}</button>)}
    </div>
    {swiggyScenarios.map((scenario, index) => <section key={scenario.id} id={"scenario-panel-" + scenario.id} role="tabpanel" aria-labelledby={"scenario-tab-" + scenario.id} className={styles.scenarioPanel} data-active={active === index}>
      <h3>{scenario.title}<span>{scenario.ticket}</span></h3>
      <p>{scenario.setup}</p><p>{scenario.alternatives}</p>
      <DeviceMotion id={scenario.id} label={scenario.title + " scenario"} src={"/portfolio/swiggy/media/" + scenario.id + ".mp4"} poster={"/portfolio/swiggy/media/" + scenario.id + ".png"} gif={"/portfolio/swiggy/media/" + scenario.id + ".gif"} loop={false} />
      <details className={styles.report}><summary>Case details</summary><p>{scenario.check}</p><p>{scenario.focus}</p></details>
    </section>)}
  </div>;
}
