import Link from "next/link";
import { home } from "@/data/home";
import { mainProjects } from "@/data/projects";
import { ProjectVisual } from "@/components/case-study/ProjectVisual";
import { TypeText, EaseIn } from "@/components/motion/Entrance";
import styles from "./SelectedWork.module.css";

export function SelectedWork() {
  return (
    <section id="work" className={styles.work} aria-labelledby="work-title">
      <div className={styles.grid}>
        {home.work.map((item, index) => {
          const project = mainProjects.find(project => project.slug === item.slug)!;
          return <article key={item.slug} className={`${styles.project} ${styles[item.slug === "two-wheeler-dashboard" ? "dashboard" : ""]}`}>
            <EaseIn delay={index * 100}>
              <div className={styles.visual}><ProjectVisual project={project} linkedToCase /></div>
              <h3><Link href={`/work/${item.slug}`}>{item.title}</Link></h3>
            </EaseIn>
          </article>;
        })}
      </div>
      <div className={styles.heading}>
        <h2 id="work-title"><TypeText text="Selected work" pace={45} /></h2>
        <Link href="/work">All work</Link>
      </div>
    </section>
  );
}
