import Image from "next/image";
import Link from "next/link";
import type { CaseBlock, Project, ProjectImage } from "@/data/case-study";
import { LayeredCaseNav } from "./LayeredCaseNav";
import { TokiBenchmarks, TokiBrandDetails } from "./TokiResearchVisuals";
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
    {block.links && <div className={styles.links}>
      {block.links.map(({ label, href }) => <a href={href} key={href}>{label}</a>)}
    </div>}
  </div>;
}

function Artifact({ image, sizes = "(max-width: 700px) 90vw, (max-width: 1050px) 70vw, 530px" }: { image: ProjectImage; sizes?: string }) {
  return <figure className={styles.artifact}>
    <a href={image.src} aria-label={`Open image at full size: ${image.alt}`}>
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height}
        sizes={sizes} />
    </a>
  </figure>;
}

const surveyFindings = [
  { value: 20, label: "Found it difficult to resume focused work after an interruption", detail: "Agreed or strongly agreed" },
  { value: 26, label: "Selected phone or social media use as a distraction", detail: "Multiple choices allowed" },
];

const planningMethods = [
  { value: 14, label: "Mostly physical" },
  { value: 12, label: "Both equally" },
  { value: 6, label: "Mostly digital" },
  { value: 3, label: "None of the above" },
];

function SurveyEvidence({ block }: { block: CaseBlock }) {
  return <section className={styles.survey} aria-labelledby="toki-survey">
    <h3 id="toki-survey">{block.title}</h3>
    <ul className={styles.surveyFindings} role="list">
      {surveyFindings.map(({ value, label, detail }) => (
        <li className={styles.surveyFinding} key={label}>
          <strong>{value} <span>/ 35</span></strong>
          <span>{label}</span>
          <small>{detail}</small>
        </li>
      ))}
    </ul>
    <div className={styles.surveyPlanning}>
      <h4>How respondents organise their tasks</h4>
      <dl>
        {planningMethods.map(({ value, label }) => (
          <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
        ))}
      </dl>
    </div>
    <div className={styles.surveyMethod}><Paragraphs paragraphs={block.paragraphs} /></div>
  </section>;
}

function Handoff({ steps, label }: { steps: { title: string; text: string }[]; label: string }) {
  return <ol className={styles.handoff} role="list" aria-label={label}>
    {steps.map(({ title, text }) => <li key={title}><strong>{title}</strong><span>{text}</span></li>)}
  </ol>;
}

const conceptHandoff = [
  { title: "Plan on the phone", text: "Write the tasks and decide which to do next." },
  { title: "See one task at the desk", text: "The desk display keeps the selected task visible." },
  { title: "Work from the desk", text: "Start, pause, return to the same task or mark it done." },
];

const bluetoothHandoff = [
  { title: "Task queue", text: "The first four unfinished tasks in app order." },
  { title: "Bluetooth", text: "The app sends queue changes when Toki is idle." },
  { title: "E-paper", text: "The device displays one task from that queue at a time." },
];

export function TokiCaseStudy({ project, next }: { project: Project; next?: Project }) {
  const overview = project.caseOverview;
  const [research, questions, survey, literature, precedents, brand] = project.stages.research;
  const [insight] = project.stages.insights;
  const [concept, dial] = project.stages.concept;
  const [outcome, demonstration, nextTests] = project.stages.outcome;
  const [app, object, form] = project.stages.design;
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
          <SurveyEvidence block={survey} />
          <div className={styles.literature}><ReadingBlock block={literature} /></div>
          <div className={styles.evidenceSection}>
            <ReadingBlock block={precedents} />
            <TokiBenchmarks />
          </div>
          <div className={styles.evidenceSection}>
            <ReadingBlock block={brand} />
            <TokiBrandDetails />
          </div>
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
          <h2 id="concept-title">{concept.title}</h2>
          <div className={styles.conceptCopy}><Paragraphs paragraphs={concept.paragraphs} /></div>
          <Handoff steps={conceptHandoff} label="Concept interaction from the phone to the desk" />
          <div className={`lf-concept-heading ${styles.conceptStudy}`}>
            <ReadingBlock block={dial} />
            <div>{dial.figures?.map(image => <Artifact image={image} key={image.src} />)}</div>
          </div>
        </div>
      </section>

      <section className="lf-scene lf-design" id="design" data-tone="light" aria-labelledby="design-title">
        <div className="lf-scene-content">
          <h2 id="design-title">The app and desk object</h2>
          <div className={styles.designApps}>
            <h3>{app.title}</h3>
            {app.figures && <div className={styles.appScreens}>
              {app.figures.map(image => <Artifact image={image} key={image.src}
                sizes="(max-width: 700px) min(90vw, 320px), (max-width: 1050px) 38vw, 310px" />)}
            </div>}
            <div className={styles.readingBlock}><Paragraphs paragraphs={app.paragraphs} /></div>
          </div>
          <Handoff steps={bluetoothHandoff} label="How tasks sync to the prototype" />
          <div className={`lf-reading-pair ${styles.designReading}`}>
            <div>
              <div className={styles.displayDetail}>
                {object.figures?.map(image => <Artifact image={image} key={image.src} sizes="480px" />)}
              </div>
              <ReadingBlock block={object} />
            </div>
            <ReadingBlock block={form} />
          </div>
          <div className={styles.designGallery}>
            {form.figures?.map(image => <Artifact image={image} key={image.src} />)}
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
