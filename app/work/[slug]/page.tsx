import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, mainProjects } from "@/data/projects";
import { caseStages } from "@/data/case-study";
import { ProjectVisual } from "@/components/case-study/ProjectVisual";
import { CaseStudyNav } from "@/components/case-study/CaseStudyNav";
import styles from "@/components/case-study/case-study.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  return project ? { title: `${project.title} | Anuj Rai`, description: project.summary } : {};
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  const mainIndex = mainProjects.findIndex(item => item.slug === slug);
  const next = mainIndex >= 0 ? mainProjects[(mainIndex + 1) % mainProjects.length] : undefined;
  return (
    <article className={styles.caseStudy}>
      <header className={styles.overview}>
        <Link href="/work" className={styles.textLink}>All work</Link>
        <p className={styles.projectTitle}>{project.title}</p>
        <h1>{project.headline}</h1>
        <p className={styles.introduction}>{project.summary}</p>
        <div className={styles.framing}>
          <div><h2>Project brief</h2><p>{project.brief}</p></div>
          <div><h2>Problem statement</h2><p>{project.problem}</p></div>
        </div>
        <dl className={styles.details}>
          {project.duration && <div><dt>Duration</dt><dd>{project.duration}</dd></div>}
          <div><dt>My contribution</dt><dd>{project.contribution}</dd></div>
        </dl>
      </header>
      <div className={styles.readingLayout}>
        <CaseStudyNav />
        <div className={styles.story}>
          {caseStages.map(stage => (
            <section key={stage.id} id={stage.id} className={styles.stage} aria-labelledby={`${stage.id}-title`}>
              <h2 id={`${stage.id}-title`}>{stage.title}</h2>
              <div className={styles.stageContent}>
                {stage.id === "design" && <ProjectVisual project={project} />}
                {project.stages[stage.id].map((block, index) => (
                  <div className={styles.block} key={`${stage.id}-${index}`}>
                    {block.title && <h3>{block.title}</h3>}
                    {block.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                    {block.figures && <div className={`${styles.figures} ${block.figures.length > 1 ? styles.pair : ""}`}>
                      {block.figures.map(image => <figure key={image.src}><a href={image.src} aria-label="View image at full size"><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 700px) 90vw, 800px" /></a></figure>)}
                    </div>}
                  </div>
                ))}
                {stage.id === "outcome" && <div className={styles.sources}>
                  <h3>Sources and credits</h3>
                  <p>{project.note}</p>
                  <div className={styles.sourceLinks}>
                    {project.live && <a href={project.live}>{project.liveLabel ?? "Open the original prototype"}</a>}
                    {project.source && <a href={project.source}>Project source and credits</a>}
                    {project.resources?.map(resource => <a href={resource.href} key={resource.href}>{resource.label}</a>)}
                  </div>
                </div>}
              </div>
            </section>
          ))}
        </div>
      </div>
      <div className={styles.caseEnd}>
        <Link href="/work" className={styles.textLink}>All work</Link>
        {next && <Link href={`/work/${next.slug}`} className={styles.nextCase}>Next project<span>{next.title}</span></Link>}
      </div>
    </article>
  );
}
