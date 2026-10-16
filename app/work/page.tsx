import Link from "next/link";
import { Lab } from "@/components/portfolio/Lab";
import { ResearchSpotlight } from "@/components/portfolio/ResearchSpotlight";
import { ResearchList } from "@/components/portfolio/ResearchList";
import { ProjectVisual } from "@/components/case-study/ProjectVisual";
import { mainProjects } from "@/data/projects";
import styles from "@/components/case-study/work-index.module.css";

export default function Work() {
  return (
    <div className="portfolio-shell work-index">
      <header className="work-heading">
        <h1>Selected work</h1>
        <nav className="work-sections" aria-label="Work sections">
          <a href="#design">Design &amp; build</a>
          <a href="#fieldwork">Fieldwork</a>
          <a href="#analysis">Analysis</a>
          <a href="#lab">Experiments</a>
        </nav>
      </header>
      <section id="design" className={styles.mainGrid} aria-label="Main case studies">
        {mainProjects.map(project => <article key={project.slug} className={styles.project}>
          <div className={styles.cardVisual}><ProjectVisual project={project} linkedToCase /></div>
          <h2><Link href={`/work/${project.slug}`}>{project.title}</Link></h2>
          <p>{project.summary}</p>
          <Link href={`/work/${project.slug}`} className="portfolio-link">View case study</Link>
        </article>)}
      </section>
      <ResearchSpotlight />
      <ResearchList />
      <Lab />
    </div>
  );
}
