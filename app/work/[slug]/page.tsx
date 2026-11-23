import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { workProjectSlugs, caseHeadings } from "@/data/work-projects";
import { caseStages } from "@/data/case-study";
import { ProjectVisual } from "@/components/case-study/ProjectVisual";
import { CaseStudyNav } from "@/components/case-study/CaseStudyNav";
import { ProjectArtwork } from "@/components/case-study/ProjectArtwork";
import { CaseNumbers } from "@/components/case-study/CaseNumbers";
import { MedicineCaseStudy } from "@/components/case-study/MedicineCaseStudy";
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
  if (slug === "medicine-app") return <MedicineCaseStudy project={project} />;
  const isToki = slug === "toki";
  const overview = project.caseOverview;
  const researchHasNumbers = project.stages.research.some(block => block.surveyResults);
  const framing = [
    { title: "Project brief", copy: project.brief },
    { title: "Problem statement", copy: project.problem },
  ];
  if (overview) framing.push({ title: "Solution", copy: overview.solution });
  const mainIndex = workProjectSlugs.findIndex(item => item === slug);
  const nextSlug = workProjectSlugs[(mainIndex + 1) % workProjectSlugs.length];
  const next = mainIndex >= 0 ? projects.find(item => item.slug === nextSlug) : undefined;
  return (
    <article className={isToki ? `${styles.caseStudy} ${styles.tokiCase}` : styles.caseStudy}>
      <header className={styles.hero}>
        <Link href="/work" className={styles.textLink}>All work</Link>
        {!isToki && <div className={styles.heroArtwork} data-project-artwork={slug}><ProjectArtwork project={project} priority /></div>}
        <h1>{project.title}</h1>
      </header>
      <div className={styles.overview}>
        {overview && <h2 className={styles.introHeadline}>{project.headline}</h2>}
        <p className={styles.introduction}>{project.summary}</p>
        <dl className={styles.details}>
          {overview ? overview.details.map(({ label, value }) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          )) : <>
            {project.duration && <div><dt>Duration</dt><dd>{project.duration}</dd></div>}
            <div><dt>My contribution</dt><dd>{project.contribution}</dd></div>
          </>}
        </dl>
        <div className={styles.framing}>
          {framing.map(({ title, copy }) => (
            <div key={title}>
              <h2>{title}</h2>
              {copy.split("\n\n").map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
          ))}
        </div>
        {!researchHasNumbers && <CaseNumbers slug={slug} />}
      </div>
      <div className={styles.readingLayout}>
        <CaseStudyNav />
        <div className={styles.story}>
          {caseStages.map((stage, stageIndex) => (
            <section key={stage.id} id={stage.id} className={styles.stage} aria-labelledby={`${stage.id}-title`}>
              <h2 id={`${stage.id}-title`}>{caseHeadings[slug]?.[stageIndex]?.[0] ?? project.stages[stage.id][0]?.title ?? stage.title}</h2>
              <div className={styles.stageContent}>
                {stage.id === "design" && !isToki && <ProjectVisual project={project} />}
                {project.stages[stage.id].map((block, index) => (
                  <div className={styles.block} key={`${stage.id}-${index}`}>
                    {index > 0 && block.title && <h3>{caseHeadings[slug]?.[stageIndex]?.[index] ?? block.title}</h3>}
                    {block.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                    {block.steps && <ol className={styles.steps}>
                      {block.steps.map(step => <li key={step}>{step}</li>)}
                    </ol>}
                    {block.surveyResults && <CaseNumbers slug={slug} inline />}
                    {block.patterns && <dl className={styles.patterns}>
                      {block.patterns.map(({ label, sequence }) => (
                        <div key={label}><dt>{label}</dt><dd>{sequence}</dd></div>
                      ))}
                    </dl>}
                    {block.links && <div className={styles.researchLinks}>
                      {block.links.map(({ label, href }) => <a href={href} key={href}>{label}</a>)}
                    </div>}
                    {block.figures && <div className={`${styles.figures} ${block.figures.length > 1 ? styles.pair : ""}`}>
                      {block.figures.map(image => <figure key={image.src}><a href={image.src} aria-label="View image at full size"><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 700px) 90vw, 800px" /></a></figure>)}
                    </div>}
                    {block.video && <video className={styles.prototypeVideo} controls playsInline preload="metadata" poster={block.video.poster} aria-label={block.video.label}>
                      <source src={block.video.src} type="video/mp4" />
                      <a href={block.video.src}>Open the prototype video</a>
                    </video>}
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
