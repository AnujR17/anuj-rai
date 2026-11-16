import Image from "next/image";
import styles from "./swiggy-case-study.module.css";

const diagrams = {
  architecture: {
    width: 960, height: 560, mobileHeight: 762,
    label: "Agent Desk information architecture",
    alt: "My Workspace contains Assigned, On hold, Shelved and Closed. Opening a ticket brings case records, conversation, and checks and decision together, with the queue alongside them.",
  },
  "refund-cost": {
    width: 960, height: 430, mobileHeight: 710,
    label: "Refund and cost allocation",
    alt: "SW-2070 worked example: 220 rupees for the affected combo, 11 GST and 35 delivery and packaging make a 266-rupee full refund. After the agent chooses restaurant fault, the assumed No refunds terms allocate the cost to Swiggy: 266 rupees; restaurant: zero.",
  },
  findings: {
    width: 960, height: 200, mobileHeight: 330,
    label: "Heuristic findings by severity",
    alt: "Sixteen unresolved heuristic findings: three major, nine minor and four cosmetic. These are review findings, not measured user outcomes.",
  },
  "mental-model": {
    width: 960, height: 560, mobileHeight: 1150,
    label: "Inferred agent mental model",
    alt: "Nine inferred agent questions, grouped as understanding, investigation and response. History is context rather than a published refund condition; the early restaurant-agreement step later became standing refund terms.",
  },
  stakeholders: {
    width: 960, height: 570, mobileHeight: 970,
    label: "Stakeholders around a refund decision",
    alt: "The escalation agent chooses a response affecting the customer, restaurant and delivery partner. Swiggy carries refund and review implications; regulators and consumer courts provide external recourse beyond this workspace.",
  },
};

export function SwiggyVector({ id }: { id: keyof typeof diagrams }) {
  const diagram = diagrams[id];
  const src = `/portfolio/swiggy/diagrams/${id}.svg`;
  return <div className={styles.vectorStudy} data-vector-study={id}>
    <a className={styles.vectorImage} href={src} aria-label={`Open ${diagram.label.toLowerCase()} at full size`}>
      <picture>
        <source media="(max-width: 1100px)" srcSet={`/portfolio/swiggy/diagrams/${id}-mobile.svg`} width={360} height={diagram.mobileHeight} />
        <Image unoptimized src={src} alt={diagram.alt} width={diagram.width} height={diagram.height} sizes="(max-width: 700px) 90vw, 980px" />
      </picture>
    </a>
    <a className={styles.vectorDownload} href={src} download>Save {id === "architecture" ? "architecture" : id === "findings" ? "chart" : id === "mental-model" ? "mental model" : id === "stakeholders" ? "stakeholder map" : "example"} as SVG</a>
  </div>;
}
