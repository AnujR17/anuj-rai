import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects, type ProjectImage } from "@/data/projects";
import { MyAlumnusCaseStudy } from "@/components/case-studies/MyAlumnusCaseStudy";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: `${project.title} — Anuj Rai`, description: project.summary } : {};
}

function EvidenceFigure({ image }: { image: ProjectImage }) {
  return (
    <figure className="case-evidence-figure">
      <a href={image.src} aria-label={`${image.caption} View image at full size.`}>
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 700px) 90vw, 850px" />
      </a>
      <figcaption>{image.caption} <a href={image.src}>View full size</a></figcaption>
    </figure>
  );
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  if (slug === "myalumnus") return <MyAlumnusCaseStudy />;
  return (
    <article className="case-shell">
      <Link href="/work" className="portfolio-link"><ArrowLeft size={16} aria-hidden="true" /> All work</Link>
      <header className="case-heading">
        <p className="portfolio-kicker">{project.type}</p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
      </header>
      {project.image && (
        <div className="case-media">
          <figure>
            <a href={project.image.src} className={project.slug === "two-wheeler-dashboard" ? "dashboard-visual" : "orbit-visual"} aria-label={`${project.title}: view image at full size`}>
              <Image src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} preload sizes="(max-width: 700px) 90vw, 570px" />
            </a>
            <figcaption>{project.image.caption} <a href={project.image.src}>View full size</a></figcaption>
          </figure>
          <div>
            <p>{project.summary}</p>
            {project.live && <p><a href={project.live} className="portfolio-link">{project.liveLabel ?? "Open the live prototype"} <ArrowUpRight size={18} aria-hidden="true" /></a></p>}
            {project.source && <p><a href={project.source} className="portfolio-link">View source and credits <ArrowUpRight size={18} aria-hidden="true" /></a></p>}
          </div>
        </div>
      )}
      {project.sections.map((section) => (
        <section className="case-section" key={section.title}>
          <h2>{section.title}</h2>
          <div>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          {section.figures && <div className={`case-figures ${section.figures.length > 1 ? "case-figures-pair" : ""}`}>{section.figures.map((image) => <EvidenceFigure key={image.src} image={image} />)}</div>}
        </section>
      ))}
      {project.resources && (
        <section className="case-section">
          <h2>Related material</h2>
          <div>{project.resources.map((resource) => <p key={resource.href}><a className="portfolio-link" href={resource.href}>{resource.label}<ArrowUpRight size={18} aria-hidden="true" /></a></p>)}</div>
        </section>
      )}
      <aside className="case-note">{project.note}</aside>
    </article>
  );
}
