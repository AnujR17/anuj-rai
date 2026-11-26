import Image from "next/image";
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
    title: "Curved geometry",
    application: "The CD player’s rounded housing illustrates the kind of edge treatment explored in Toki’s enclosure.",
    src: "/portfolio/toki/muji-curve.webp",
    alt: "Rounded corner and curved disc recess of the white MUJI wall-mounted CD player",
  },
  {
    title: "Control placement",
    application: "The CD player tucks its power pull beneath the housing. Toki groups its touch controls below the screen.",
    src: "/portfolio/toki/muji-controls.webp",
    alt: "Power pull cord emerging from the underside of the dark MUJI wall-mounted CD player",
  },
  {
    title: "Clock legibility",
    application: "Clear numerals and hands informed the proposed timer scale.",
    src: "/portfolio/toki/muji-clock.webp",
    alt: "MUJI analogue clock with dark numerals and hands against a white face",
  },
];

export function TokiBrandDetails() {
  return <div className={styles.brandDetails}>
    {brandDetails.map(({ title, application, src, alt }) => <div className={styles.brandDetail} key={title}>
      <Image src={src} alt={alt} width={525} height={375} sizes="(max-width: 560px) 38vw, (max-width: 1050px) 28vw, 365px" />
      <h4>{title}</h4>
      <p>{application}</p>
    </div>)}
  </div>;
}
