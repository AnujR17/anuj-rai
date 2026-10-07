import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: `${project.title} — Anuj Rai`, description: project.summary } : {};
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return (
    <article className="case-shell">
      <Link href="/work" className="portfolio-link"><ArrowLeft size={16} aria-hidden="true" /> All work</Link>
      <header className="case-heading"><p className="portfolio-kicker">{project.type}</p><h1>{project.title}</h1><p>{project.summary}</p></header>
      {project.image && (
        <div className="case-media">
          <figure>
            <div className={project.slug === "two-wheeler-dashboard" ? "dashboard-visual" : "orbit-visual"}><Image src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} preload sizes="(max-width: 700px) 90vw, 570px" /></div>
            <figcaption>{project.image.caption}</figcaption>
          </figure>
          <div><p>{project.summary}</p>{project.live && <p><a href={project.live} className="portfolio-link">Open the live prototype <ArrowUpRight size={18} aria-hidden="true" /></a></p>}{project.source && <p><a href={project.source} className="portfolio-link">View source and credits <ArrowUpRight size={18} aria-hidden="true" /></a></p>}</div>
        </div>
      )}
      {project.sections.map((section) => <section className="case-section" key={section.title}><h2>{section.title}</h2><div>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>)}
      <aside className="case-note">{project.note}</aside>
    </article>
  );
}
