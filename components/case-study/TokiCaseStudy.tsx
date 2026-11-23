import Image from "next/image";
import Link from "next/link";
import type { CaseBlock, Project, ProjectImage } from "@/data/case-study";
import { CaseNumbers } from "./CaseNumbers";
import { LayeredCaseNav } from "./LayeredCaseNav";
import "./restored-medicine.css";
import styles from "./toki-case-study.module.css";

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return paragraphs.map(text => <p key={text}>{text}</p>);
}

function ReadingBlock({ block }: { block: CaseBlock }) {
  return <div className={styles.readingBlock}>
    {block.title && <h3>{block.title}</h3>}
    <Paragraphs paragraphs={block.paragraphs} />
    {block.steps && <ol className={styles.questions}>
      {block.steps.map(step => <li key={step}>{step}</li>)}
    </ol>}
    {block.patterns && <dl className={styles.patterns}>
      {block.patterns.map(({ label, sequence }) => (
        <div key={label}><dt>{label}</dt><dd>{sequence}</dd></div>
      ))}
    </dl>}
    {block.links && <div className={styles.links}>
      {block.links.map(({ label, href }) => <a href={href} key={href}>{label}</a>)}
    </div>}
  </div>;
}

function Artifact({ image }: { image: ProjectImage }) {
  return <figure className={styles.artifact}>
    <a href={image.src} aria-label={`Open image at full size: ${image.alt}`}>
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height}
        sizes="(max-width: 700px) 90vw, (max-width: 1050px) 70vw, 530px" />
    </a>
  </figure>;
}

export function TokiCaseStudy({ project, next }: { project: Project; next?: Project }) {
  const overview = project.caseOverview;
  const [research, questions, survey, literature, precedents, brand] = project.stages.research;
  const [insight] = project.stages.insights;
  const [concept, dial] = project.stages.concept;
  const [outcome, demonstration, nextTests] = project.stages.outcome;
  const design = project.stages.design;
  const designImages = design.flatMap(block => block.figures ?? []);
  const prototype = demonstration.video;
  const insightCopy = insight.paragraphs.slice(0, -1);
  const insightQuestion = insight.paragraphs.at(-1);

  return <article className={`lf-main ${styles.case}`} data-restored-case="toki">
    <header className={`lf-hero ${styles.opening}`} id="hero" aria-labelledby="toki-title">
      <Link href="/work" className="lf-all-work">All work</Link>
      <h1 id="toki-title">{project.title}</h1>
      <div className={`lf-hero-copy ${styles.openingCopy}`}><p>{project.headline}</p></div>
    </header>

    <section className="lf-overview" id="overview" aria-labelledby="overview-title">
      <div className="lf-overview-layout">
        <div className={styles.overviewLead}>
          <div>
            <h2 id="overview-title">Project overview</h2>
            <p className="lf-overview-summary">{project.summary}</p>
          </div>
          {overview && <dl className={styles.metadata}>
            {overview.details.map(({ label, value }) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>}
        </div>
        <div className={styles.framing}>
          <ReadingBlock block={{ title: "Project brief", paragraphs: project.brief.split("\n\n") }} />
          <ReadingBlock block={{ title: "Problem statement", paragraphs: project.problem.split("\n\n") }} />
          {overview && <ReadingBlock block={{ title: "Solution", paragraphs: overview.solution.split("\n\n") }} />}
        </div>
      </div>
    </section>

    <div className="lf-case-story" id="lf-case-story">
      <LayeredCaseNav />
      <section className="lf-scene lf-research" id="research" data-tone="light" aria-labelledby="research-title">
        <div className="lf-scene-content">
          <div className="lf-research-opening">
            <div><h2 id="research-title">{research.title}</h2><Paragraphs paragraphs={research.paragraphs} /></div>
            <ReadingBlock block={questions} />
          </div>
          <div className={`lf-concept-heading ${styles.survey}`}>
            <ReadingBlock block={survey} />
            <CaseNumbers slug={project.slug} inline />
          </div>
          <div className="lf-reading-pair lf-research-reading">
            <ReadingBlock block={literature} />
            <ReadingBlock block={precedents} />
          </div>
          <div className={styles.brand}><ReadingBlock block={brand} /></div>
        </div>
      </section>

      <section className="lf-scene lf-insights" id="insights" data-tone="light" aria-labelledby="insights-title">
        <div className="lf-scene-content lf-insight-composition">
          <h2 id="insights-title">{insight.title}</h2>
          <div className={styles.insightCopy}>
            <Paragraphs paragraphs={insightCopy} />
            <p className={styles.insightQuestion}>{insightQuestion}</p>
          </div>
        </div>
      </section>

      <section className="lf-scene lf-concept" id="concept" data-tone="light" aria-labelledby="concept-title">
        <div className="lf-scene-content">
          <div className={`lf-concept-heading ${styles.conceptStudy}`}>
            <div>
              <h2 id="concept-title">{concept.title}</h2>
              <div className={styles.conceptCopy}><Paragraphs paragraphs={concept.paragraphs} /></div>
              <div className={styles.dialCopy}><ReadingBlock block={dial} /></div>
            </div>
            <div>{dial.figures?.map(image => <Artifact image={image} key={image.src} />)}</div>
          </div>
        </div>
      </section>

      <section className="lf-scene lf-design" id="design" data-tone="light" aria-labelledby="design-title">
        <div className="lf-scene-content">
          <h2 id="design-title">The app and desk object</h2>
          <div className={styles.designGallery}>
            {designImages.map(image => <Artifact image={image} key={image.src} />)}
          </div>
          <div className={`lf-reading-pair ${styles.designReading}`}>
            {design.map(block => <ReadingBlock block={block} key={block.title} />)}
          </div>
        </div>
      </section>

      <section className="lf-scene lf-outcome" id="outcome" data-tone="light" aria-labelledby="outcome-title">
        <div className="lf-scene-content">
          <div className="lf-outcome-composition">
            <h2 id="outcome-title">{outcome.title}</h2>
            <Paragraphs paragraphs={outcome.paragraphs} />
          </div>
          <div className={styles.prototype}>
            {prototype && <video controls playsInline preload="metadata" poster={prototype.poster} aria-label={prototype.label}>
              <source src={prototype.src} type="video/mp4" />
              <a href={prototype.src}>Open the prototype video</a>
            </video>}
            <div className={styles.prototypeCopy}>
              <ReadingBlock block={demonstration} />
              <ReadingBlock block={nextTests} />
            </div>
          </div>
          <div className="lf-sources">
            <h3>Sources and credits</h3>
            <p>{project.note}</p>
            <div>
              {project.source && <a href={project.source}>Project repository</a>}
              {project.resources?.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}
            </div>
          </div>
        </div>
      </section>
    </div>
    <div className="lf-case-end">
      <Link href="/work">All work</Link>
      {next && <Link href={`/work/${next.slug}`}>Next project<span>{next.title}</span></Link>}
    </div>
  </article>;
}
