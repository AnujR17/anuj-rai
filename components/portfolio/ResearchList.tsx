import Image from "next/image";
import Link from "next/link";
import { researchProjects } from "@/data/research-projects";

export function ResearchList() {
  return (
    <section id="analysis" className="research-list" aria-labelledby="research-list-title">
      <div className="portfolio-section-heading">
        <h2 id="research-list-title">Research and analysis</h2>
      </div>
      {researchProjects.filter((project) => project.slug !== "gandhinagar-roundabouts").map((project) => (
        <Link key={project.slug} className="research-row" href={`/work/${project.slug}`}>
          {project.image && <Image src={project.image.src} alt="" width={project.image.width} height={project.image.height} sizes="(max-width: 700px) 120px, 160px" />}
          <div>

            <h3>{project.title}</h3>
            <p>{project.summary}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}
