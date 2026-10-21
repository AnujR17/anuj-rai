import Image from "next/image";
import type { Project } from "@/data/case-study";
import styles from "./project-artwork.module.css";

export function ProjectArtwork({ project, priority = false }: { project: Project; priority?: boolean }) {
  if (project.visual === "medicine") return <div className={`${styles.artwork} ${styles.medicine}`}>
    <div className={styles.phone}><Image src="/portfolio/screens/medicine.png" width={410} height={1071} alt="Original Figma medicine-taker screen inside a phone mockup" preload={priority} sizes="(max-width: 700px) 38vw, 260px" /></div>
    <div className={styles.phone}><Image src="/portfolio/screens/caregiver.png" width={408} height={904} alt="Original Figma caregiver screen inside a phone mockup" preload={priority} sizes="(max-width: 700px) 38vw, 260px" /></div>
  </div>;
  if (project.slug === "swiggy-agent-workflow") return <div className={`${styles.artwork} ${styles.swiggy}`} role="img" aria-label="Swiggy support workspace composition study, currently in development">
    <div className={styles.workspace} aria-hidden="true"><div className={styles.workspaceNav}>Support</div><div className={styles.ticket}><span>Missing item</span><strong>Review the ticket</strong><p>Customer report</p><div /><p>Order information</p><div /><p>Available evidence</p><div /></div><div className={styles.policy}><span>Relevant policy</span><strong>Check the information</strong><p>What is known</p><div /><p>What needs checking</p><div /><span className={styles.draft}>In development</span></div></div>
  </div>;
  if (!project.image) return null;
  const kind = project.slug === "two-wheeler-dashboard" ? "dashboard" : project.slug === "medtimer" ? "physical" : project.slug === "myalumnus" ? "tablet" : project.slug === "india-in-orbit" ? "browser" : "image";
  return <div className={`${styles.artwork} ${styles[kind]}`}>
    <div className={styles.frame}><Image src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} preload={priority} sizes="(max-width: 700px) 90vw, 900px" /></div>
  </div>;
}
