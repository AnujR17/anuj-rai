import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { researchProjects } from "@/data/research-projects";

export function ResearchList() {
  return (
    <section id="analysis" className="research-list" aria-labelledby="research-list-title">
      <div className="portfolio-section-heading">
        <h2 id="research-list-title">Further research &amp; analysis</h2>
        <p>Exploratory studies and questions for design.</p>
      </div>
      {researchProjects.filter((project) => project.slug !== "gandhinagar-roundabouts").map((project) => (
        <Link key={project.slug} className="research-row" href={`/work/${project.slug}`}>
          {project.image && <Image src={project.image.src} alt="" width={project.image.width} height={project.image.height} sizes="(max-width: 700px) 120px, 160px" />}
          <div>
            <p className="portfolio-kicker">{project.type}</p>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
          </div>
          <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      ))}
    </section>
  );
}
