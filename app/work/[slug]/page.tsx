import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, type ProjectImage } from "@/data/projects";
import { DashboardAnatomy } from "@/components/case-study/DashboardAnatomy";
import { CaseVisual } from "@/components/case-study/CaseVisual";

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
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];
  if (!project) notFound();
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const theme = slug === "india-in-orbit" ? "orbit" : slug === "two-wheeler-dashboard" ? "dashboard" : slug === "gandhinagar-roundabouts" ? "field" : "research";

  return (
    <article className={`case-shell case-story case-theme-${theme}`}>
      <Link href="/work" className="portfolio-link"><ArrowLeft size={16} aria-hidden="true" /> All work</Link>
      <header className="case-heading">
        <p className="portfolio-kicker">{project.type}</p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <div className="case-actions">
          {project.live && <a href={project.live} className="case-primary-link">{project.liveLabel ?? "Try the browser prototype"}<ArrowUpRight size={17} aria-hidden="true" /></a>}
          {project.source && <a href={project.source} className="portfolio-link">Source &amp; credits<ArrowUpRight size={16} aria-hidden="true" /></a>}
        </div>
      </header>

      <dl className="case-overview" aria-label="Project at a glance">
        <div><dt>Contribution</dt><dd>{project.overview.role}</dd></div>
        <div><dt>Scope</dt><dd>{project.overview.scope}</dd></div>
        <div><dt>Status</dt><dd>{project.overview.status}</dd></div>
      </dl>

      {slug === "two-wheeler-dashboard" ? <DashboardAnatomy /> : project.image && (
        <figure className="case-hero-figure">
          <a href={project.image.src} aria-label={`${project.title}: view image at full size`}>
            <Image src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} preload sizes="(max-width: 700px) 90vw, 1064px" />
          </a>
          <figcaption>{project.image.caption} <a href={project.image.src}>View full size</a></figcaption>
        </figure>
      )}

      <div className="case-opening-insight"><p>The central question</p><p>{project.takeaway}</p></div>
      <nav className="case-contents" aria-label="In this case study">
        <span>In this case</span>
        {project.sections.map((section, index) => <a key={section.title} href={`#section-${index + 1}`}>{section.title}</a>)}
        <a href="#outcome">Outcome &amp; next question</a>
      </nav>

      <div className="case-narrative">
        {project.sections.map((section, index) => (
          <section id={`section-${index + 1}`} className="case-section" key={section.title}>
            <div className="case-section-heading"><span aria-hidden="true">0{index + 1}</span><h2>{section.title}</h2></div>
            <div className="case-section-copy">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            {section.visual && <CaseVisual type={section.visual} />}
            {section.figures && <div className={`case-figures ${section.figures.length > 1 ? "case-figures-pair" : ""}`}>{section.figures.map((image) => <EvidenceFigure key={image.src} image={image} />)}</div>}
          </section>
        ))}
      </div>

      <section id="outcome" className="case-outcome" aria-labelledby="outcome-heading">
        <div><p className="case-visual-label">What the work establishes</p><h2 id="outcome-heading">Outcome &amp; next question.</h2></div>
        <div><h3>The result</h3><p>{project.conclusion.result}</p><h3>The next question</h3><p>{project.conclusion.next}</p></div>
      </section>

      {project.methods && <details className="case-methods"><summary>Methods, sources &amp; scope</summary><div>{project.methods.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></details>}
      {project.resources && (
        <section className="case-resources" aria-label="Related material">
          <h2>Explore the supporting material</h2>
          <div>{project.resources.map((resource) => <a key={resource.href} className="portfolio-link" href={resource.href}>{resource.label}<ArrowUpRight size={16} aria-hidden="true" /></a>)}</div>
        </section>
      )}
      <aside className="case-note">{project.note}</aside>
      <footer className="case-next"><div><p>Continue exploring</p><Link href={`/work/${nextProject.slug}`}>{nextProject.title}<ArrowRight size={24} aria-hidden="true" /></Link><p>{nextProject.type}</p></div><Link href="/work" className="portfolio-link">Back to all work<ArrowUpRight size={16} aria-hidden="true" /></Link></footer>
    </article>
  );
}
