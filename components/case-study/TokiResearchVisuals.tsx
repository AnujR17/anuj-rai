import type { ReactNode } from "react";
import styles from "./toki-case-study.module.css";

type Drawing = "paper" | "timer" | "tracker" | "planner";

const benchmarks: { title: string; drawing: Drawing; steps: [string, string, string] }[] = [
  { title: "Written list", drawing: "paper", steps: ["Write a task", "Keep the list in view", "Cross off the task"] },
  { title: "Visual timer", drawing: "timer", steps: ["Set a duration", "Glance at time left", "Reset the timer"] },
  { title: "Physical tracker", drawing: "tracker", steps: ["Turn the tracker", "Log the activity", "Switch or stop"] },
  { title: "Digital planner", drawing: "planner", steps: ["Capture a task", "Put it in order", "Update its status"] },
];

function BenchmarkDrawing({ drawing, step }: { drawing: Drawing; step: number }) {
  const accent = styles.diagramAccent;
  const drawings: Record<Drawing, ReactNode> = {
    paper: <>
      <path d="M34 12h44v46H34z M42 23h25 M42 31h25 M42 39h17" />
      {[
        <path key="write" className={accent} d="m57 47 26-25 5 5-26 25-6 1z" />,
        <path key="visible" className={accent} d="M26 53h-8v-8m68-27h8v8M42 47h23" />,
        <path key="done" className={accent} d="M40 23h29M40 31h29" />,
      ][step]}
    </>,
    timer: <>
      <circle cx="56" cy="34" r="24" />
      <path d="M56 14v4m20 16h-4M56 54v-4M36 34h4" />
      {[
        <path key="set" className={accent} d="M56 34V14a20 20 0 0 1 20 20z" />,
        <path key="remaining" className={accent} d="M56 34V14a20 20 0 0 1 14 6z" />,
        <path key="reset" className={accent} d="M56 34V17" />,
      ][step]}
    </>,
    tracker: <>
      <path d="M56 10 80 23v25L56 61 32 48V23z M32 23l24 14 24-14M56 37v24" />
      {[
        <path key="turn" className={accent} d="M35 22 56 11l21 12-21 12z" />,
        <path key="log" className={accent} d="M59 39 77 28v18L59 57z" />,
        <path key="switch" className={accent} d="m35 28 18 11v18L35 46z" />,
      ][step]}
    </>,
    planner: <>
      <rect x="23" y="13" width="66" height="43" rx="5" />
      <path d="M23 24h66M35 48h26" />
      {[
        <path key="capture" className={accent} d="M35 34h20m18-4v8m-4-4h8" />,
        <path key="sort" className={accent} d="M35 32h36m-34 8h24m-29-9h1m-1 9h1" />,
        <path key="update" className={accent} d="M35 34h22m11 2 4 4 7-9" />,
      ][step]}
    </>,
  };

  return <svg className={styles.benchmarkDrawing} viewBox="0 0 112 68" aria-hidden="true">{drawings[drawing]}</svg>;
}

export function TokiBenchmarks() {
  return <div className={styles.benchmarks}>
    {benchmarks.map(({ title, drawing, steps }) => <div className={styles.benchmark} key={drawing}>
      <h4>{title}</h4>
      <ol role="list" aria-label={`${title} interaction sequence`}>
        {steps.map((step, index) => <li key={step}>
          <BenchmarkDrawing drawing={drawing} step={index} />
          <span>{step}</span>
        </li>)}
      </ol>
    </div>)}
  </div>;
}

const brandDetails = [
  {
    title: "Rounded edges",
    application: "The curved transition on the rice cooker informed the rounded edges of Toki’s printed enclosure.",
    drawing: <><path d="M-4 17h97c49 0 67 19 67 66v58H-4z" className={styles.diagramFill} />
      <path d="M-4 17h97c49 0 67 19 67 66v58M-4 37h97c34 0 47 14 47 46v58" />
      <path d="M93 17c49 0 67 19 67 66" className={styles.diagramAccent} /></>,
  },
  {
    title: "Controls on the front",
    application: "Moving the rice cooker controls to the front keeps the lid clear. Toki groups its display and three touch controls on one face.",
    drawing: <><path d="M-4 24h200v84H-4z" className={styles.diagramFill} />
      <path d="M-4 24h200M-4 108h200" /><rect x="22" y="45" width="58" height="41" rx="4" />
      <path d="M36 66h30" className={styles.diagramAccent} />
      <circle cx="106" cy="66" r="7" /><circle cx="132" cy="66" r="7" /><circle cx="158" cy="66" r="7" /></>,
  },
  {
    title: "Readable time at a glance",
    application: "Clear clock markings informed the proposed timer scale. The working prototype shows elapsed time on e-paper.",
    drawing: <><circle cx="97" cy="104" r="84" className={styles.diagramFill} />
      <circle cx="97" cy="104" r="84" /><path d="M97 27v13m38 1-6 9m32 19-9 5m21 30h-13m-126 0H21m20-30-9-5m33-19-6-9" />
      <path d="m97 104 42-37" className={styles.diagramAccent} /><circle cx="97" cy="104" r="3" /></>,
  },
];

export function TokiBrandDetails() {
  return <div className={styles.brandDetails}>
    {brandDetails.map(({ title, application, drawing }) => <div className={styles.brandDetail} key={title}>
      <svg viewBox="0 0 192 126" aria-hidden="true">{drawing}</svg>
      <h4>{title}</h4>
      <p>{application}</p>
    </div>)}
  </div>;
}
