"use client";

import styles from "./case-study.module.css";

type NumberItem = { value: string; label: string; detail: string };
const numbers: Record<string, NumberItem[]> = {
  "medicine-app": [
    { value: "2", label: "Interfaces", detail: "A medicine-taker view for recording doses and a caregiver view for following the routine" },
    { value: "3", label: "Weeks", detail: "The project duration confirmed by Anuj, covering his individual app design and development" },
  ],
  "two-wheeler-dashboard": [
    { value: "3", label: "Riding modes", detail: "Eco, Performance and Rain are states in the browser simulation, not results from a riding test" },
    { value: "3", label: "Weeks", detail: "The confirmed duration of the individual dashboard project" },
  ],
  medtimer: [{ value: "3", label: "Weeks", detail: "The confirmed group-project duration. Anuj developed the concept and interactions; teammates contributed mockups and documentation" }],
  toki: [
    { value: "4", label: "Tasks in the queue", detail: "The first four unfinished tasks synchronize while the device is idle. Updates wait during a running task" },
    { value: "3", label: "App tabs", detail: "Write, Tasks and Device separate capturing an idea, arranging work and connecting the object" },
  ],
  "india-in-orbit": [{ value: "3", label: "Weeks", detail: "The confirmed duration for designing and developing the interactive website, with guidance from Dr Anupam Rana" }],
  "gandhinagar-roundabouts": [
    { value: "298", label: "Record rows", detail: "98 Sector-21, 87 Sector-7 and 113 Infocity rows after excluding its header. These are records, not exposure-adjusted crash rates" },
    { value: "3", label: "Station files", detail: "Sector-21, Sector-7 and Infocity records provided context alongside the fieldwork" },
  ],
  "medicine-storage-research": [
    { value: "52", label: "Respondents", detail: "The supplied medicine-routine survey contains 52 respondents, with overlapping caregiver and senior response paths" },
    { value: "48", label: "Caregiver responses", detail: "48 respondents followed the caregiver path; 7 followed the senior path, with 3 in both. The groups must not be added as separate participants" },
  ],
  "swiggy-agent-workflow": [{ value: "5–6", label: "Scenarios in development", detail: "The planned scenario scope includes missing-item and wrong-item complaints. It is not a completed evaluation" }],
  myalumnus: [
    { value: "4", label: "Interviews", detail: "Three alumni and one guard in the supplied research. This was a small qualitative study with leading-question limitations" },
    { value: "4/5", label: "Tasks completed", detail: "One guard session in the supplied report. One approval silently failed to save. This is not a general success rate" },
  ],
};

export function CaseNumbers({ slug }: { slug: string }) {
  const items = numbers[slug];
  if (!items) return null;
  return <div className={styles.numbers} aria-label="Project numbers">
    {items.map(item => <details key={item.label} className={styles.number}
      onMouseEnter={event => { event.currentTarget.open = true; }}
      onMouseLeave={event => { if (!event.currentTarget.matches(":focus-within")) event.currentTarget.open = false; }}>
      <summary><span>{item.value}</span><strong>{item.label}</strong></summary>
      <p>{item.detail}</p>
    </details>)}
  </div>;
}
