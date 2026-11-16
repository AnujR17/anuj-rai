import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/components/case-study/case-study.module.css";
import swiggy from "@/components/case-study/swiggy-case-study.module.css";

export const metadata: Metadata = { title: "Agent Desk concept prototype | Anuj Rai", description: "A fictional five-ticket support workflow, unaffiliated with Swiggy. No live calls, payments or customer records." };

export default function SwiggyPrototype() {
  return <article className={swiggy.demo}>
    <Link href="/work/swiggy-agent-workflow#design" className={styles.textLink}>Back to the case study</Link>
    <h1>Agent Desk v7.1</h1>
    <p>Independent concept, unaffiliated with Swiggy. All tickets, conversations and replies are fictional; evidence photos were generated with Figma AI. Calls, refunds and reports are simulated. Select a ticket in My Workspace to start. The prototype was designed for a 1440 × 900 desktop screen.</p>
    <iframe src="/portfolio/swiggy/prototype/index.html" title="Agent Desk v7.1 fictional support workflow" sandbox="allow-scripts allow-same-origin" referrerPolicy="no-referrer" />
    <div className={swiggy.actions}><a className={styles.textLink} href="/portfolio/swiggy/prototype/index.html" target="_blank" rel="noreferrer">Open prototype in a full window</a><Link className={styles.textLink} href="/work/swiggy-agent-workflow#design">Watch the recorded paths</Link></div>
  </article>;
}
