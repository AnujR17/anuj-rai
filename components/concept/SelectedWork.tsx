import Image from "next/image";
import Link from "next/link";
import { home } from "@/data/home";
import styles from "./SelectedWork.module.css";

export function SelectedWork() {
  return (
    <section id="work" className={styles.work} aria-labelledby="work-title">
      <div className={styles.heading}>
        <h2 id="work-title">Selected work</h2>
        <Link href="/work">All work</Link>
      </div>
      <div className={styles.grid}>
        {home.work.map(project => (
          <article key={project.slug} className={`${styles.project} ${styles[project.surface]}`}>
            <Link href={`/work/${project.slug}`}>
              <div className={styles.visual}>
                <Image src={project.image} alt={project.alt} width={project.width} height={project.height} sizes="(max-width: 600px) 88vw, (max-width: 900px) 88vw, 46vw" />
              </div>
              <h3>{project.title}</h3>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
