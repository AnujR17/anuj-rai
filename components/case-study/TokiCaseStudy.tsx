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
  { title: "Plan on the phone", text: "Choose and order the tasks." },
  { title: "See one task on the desk", text: "Give the selected task a place in view." },
  { title: "Return to the same task", text: "Start, pause or mark it done at the device." },
];

const appSequence = [
  { title: "Write", text: "Capture a task on the phone." },
  { title: "Order", text: "Put unfinished tasks in the order you want to see them." },
];

export function TokiCaseStudy({ project, next }: { project: Project; next?: Project }) {
  const overview = project.caseOverview;
  const [research, questions, survey, literature, precedents, brand] = project.stages.research;
  const [insight] = project.stages.insights;
  const [concept, dial] = project.stages.concept;
  const [outcome, demonstration, nextTests] = project.stages.outcome;
  const [app, object, form] = project.stages.design;
  const prototype = demonstration.video;
  const displayPhoto = object.figures?.[0];

  return <article className={`lf-main ${styles.case}`} data-restored-case="toki">
    <header className={`lf-hero ${styles.opening}`} id="hero" aria-labelledby="toki-title">
      <Link href="/work" className="lf-all-work">All work</Link>
      <div className={styles.openingCopy}>
        <h1 id="toki-title">{project.title}</h1>
      </div>
      {project.image && <Image className={styles.deskRender} src={project.image.src}
        alt={project.image.alt} width={project.image.width} height={project.image.height}
        sizes="(max-width: 700px) 90vw, 52vw" preload />}
    </header>

    <section className="lf-overview" id="overview" aria-labelledby="overview-title">
      <div className="lf-overview-layout">
        <div className={styles.overviewLead}>
          <div>
            <h2 id="overview-title">Project overview</h2>
            <p className="lf-overview-summary">{project.headline} {project.summary}</p>
            {overview && <dl className={styles.metadata}>
              {overview.details.map(({ label, value }) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>}
          </div>
          {prototype && <div className={styles.overviewPhoto}>
            <Image src={prototype.poster} alt="The original 3D-printed Toki prototype with its e-paper display, dial and three touch controls"
              width={480} height={456} sizes="(max-width: 700px) 90vw, 520px" />
          </div>}
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
            <h2 id="research-title">{research.title}</h2>
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
          <div className={styles.insightCopy}><Paragraphs paragraphs={insight.paragraphs} /></div>
        </div>
      </section>

      <section className="lf-scene lf-concept" id="concept" data-tone="light" aria-labelledby="concept-title">
        <div className="lf-scene-content">
          <h2 id="concept-title">{concept.title}</h2>
          <div className={`lf-concept-heading ${styles.conceptStudy}`}>
            {dial.figures?.map(image => <Artifact image={image} key={image.src} />)}
            <ReadingBlock block={dial} />
          </div>
          <Handoff steps={conceptHandoff} label="Concept interaction from the phone to the desk" />
        </div>
      </section>

      <section className="lf-scene lf-design" id="design" data-tone="light" aria-labelledby="design-title">
        <div className="lf-scene-content">
          <h2 id="design-title">The app and desk object</h2>
          <ol className={styles.appSequence} role="list" aria-label="How tasks sync to the prototype">
            {appSequence.map(({ title, text }, index) => {
              const image = app.figures?.[index];
              return <li key={title}>
                <h3>{title}</h3>
                {image && <Artifact image={image} sizes="(max-width: 700px) 42vw, 250px" />}
                <p>{text}</p>
              </li>;
            })}
            <li className={styles.deskStep}>
              <h3>Work from the device</h3>
              {displayPhoto && <div className={styles.displayDetail}><Artifact image={displayPhoto} sizes="480px" /></div>}
              <p>The first four unfinished tasks sync over Bluetooth while Toki is idle. Queue changes during a session wait until you pause or finish.</p>
            </li>
          </ol>
          <p className={styles.captureNote}>The running app and the physical device show the same example task in separate runs. The app screens were captured in a browser.</p>
          <div className={`lf-reading-pair ${styles.designReading}`}>
            <ReadingBlock block={app} />
            <ReadingBlock block={object} />
          </div>
          <div className={styles.enclosure}>
            <ReadingBlock block={form} />
            <div className={styles.designGallery}>
              {form.figures?.map(image => <Artifact image={image} key={image.src} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="lf-scene lf-outcome" id="outcome" data-tone="light" aria-labelledby="outcome-title">
        <div className="lf-scene-content">
          <h2 id="outcome-title">{outcome.title}</h2>
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
