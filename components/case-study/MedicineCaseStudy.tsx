import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/case-study";
import { caregiverRoutine, historyExamples, personalRoutine } from "@/data/medicine-screens";
import { LayeredCaseNav } from "./LayeredCaseNav";
import { MedicineFacts, MedicineGallery, MedicineStructure, StaticMedicineScreen } from "./MedicineInteractions";
import { MedicineMotion } from "./MedicineMotion";
import "./restored-medicine.css";

const media = "/portfolio/meditimer-case";

export function MedicineCaseStudy({ project }: { project: Project }) {
  const research = project.stages.research[0].paragraphs;
  const insights = project.stages.insights[0].paragraphs;
  const concept = project.stages.concept[0].paragraphs;
  const design = project.stages.design;
  const outcome = project.stages.outcome[0];

  return <article className="lf-main" data-restored-case="medicine-app">
    <header className="lf-hero lf-medicine-hero" id="hero" aria-labelledby="lf-hero-title">
      <Link href="/work" className="lf-all-work">All work</Link>
      <div className="lf-opening-visual">
        <div className="lf-motion-visual">
          <picture>
            <source media="(max-width: 700px)" srcSet={`${media}/scan.webp`} width="540" height="900" />
            <Image src={`${media}/hero.webp`} alt="Meditimer prescription setup and medicine routine"
              width={1280} height={720} unoptimized loading="eager" fetchPriority="high" />
          </picture>
        </div>
      </div>
      <h1 id="lf-hero-title">Meditimer</h1>
      <div className="lf-hero-copy"><p>A medicine routine you can manage and share with someone who cares for you</p></div>
    </header>

    <section className="lf-overview" id="overview" aria-labelledby="overview-title">
      <div className="lf-overview-layout">
        <div className="lf-overview-content"><h2 id="overview-title">Project overview</h2><p className="lf-overview-summary">{project.summary}</p></div>
        <div className="lf-overview-reading">
          <section><h3>Project brief</h3><p>{project.brief}</p></section>
          <section><h3>Problem statement</h3><p>{project.problem}</p></section>
        </div>
        <dl className="lf-overview-contribution"><div><dt>My contribution</dt><dd>{project.contribution}</dd></div></dl>
        <MedicineFacts />
      </div>
    </section>

    <div className="lf-case-story" id="lf-case-story">
      <LayeredCaseNav mobileLinks />
      <section className="lf-scene lf-research" id="research" data-tone="light" aria-labelledby="research-title">
        <div className="lf-scene-content">
          <div className="lf-research-opening">
            <div><h2 id="research-title">Understanding routines</h2><p>{research[0]}</p></div>
            <div className="lf-research-findings" aria-label="Findings from the 24-response survey">
              <div><strong>13 / 24</strong><p>selected a meal-linked schedule</p></div>
              <div><strong>8 / 24</strong><p>selected an as-needed schedule</p></div>
              <div><strong>10 / 24</strong><p>reported a missing record as a gap</p></div>
              <p className="lf-research-note">People could select more than one answer.</p>
            </div>
          </div>
          <div className="lf-reading-pair lf-research-reading">{research.slice(1).map(text => <p key={text}>{text}</p>)}</div>
        </div>
      </section>

      <section className="lf-scene lf-insights" id="insights" data-tone="dark" aria-labelledby="insights-title">
        <div className="lf-scene-content lf-med-history-layout">
          <div className="lf-insight-copy">
            <h2 id="insights-title">Read the record before checking in</h2>
            {insights.slice(1).map(text => <p key={text}>{text}</p>)}
          </div>
          <div className="lf-history-pair">
            {historyExamples.map(({ title, ...image }) => (
              <div key={title}><h3>{title}</h3><StaticMedicineScreen screen={image} sizes="(max-width: 700px) 43vw, 250px" /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-scene lf-concept" id="concept" data-tone="light" aria-labelledby="concept-title">
        <div className="lf-scene-content">
          <div className="lf-concept-heading"><h2 id="concept-title">One routine, two perspectives</h2><p>{concept[0]}</p></div>
          <div className="lf-paired-study">
            <div className="lf-person-view"><h3>Taking medicine</h3><StaticMedicineScreen screen={personalRoutine} sizes="(max-width: 700px) 42vw, 320px" /></div>
            <div className="lf-family-view"><h3>Supporting someone</h3><StaticMedicineScreen screen={caregiverRoutine} sizes="(max-width: 700px) 42vw, 320px" /></div>
          </div>
          <div className="lf-concept-explanation"><p>{concept[2]}</p></div>
          <MedicineStructure />
        </div>
      </section>

      <section className="lf-scene lf-design" id="design" data-tone="light" aria-labelledby="design-title">
        <div className="lf-scene-content">
          <div className="lf-design-heading">
            <h2 id="design-title">From prescription to routine</h2>
          </div>
          <p className="lf-design-intro">Review the prescription and suggested reminders before confirming a schedule.</p>
          <MedicineGallery />
          <div className="lf-feature-heading"><h3>After setup</h3></div>
          <div className="lf-feature-grid">
            <section><MedicineMotion name="record a dose" description="A personal reminder transitions to a dose marked as taken" video={`${media}/record-dose.mp4`} poster={`${media}/record-dose-poster.webp`} /><h3>{design[0].title}</h3>{design[0].paragraphs.map(text => <p key={text}>{text}</p>)}</section>
            <section><div className="lf-feature-phone"><StaticMedicineScreen screen={caregiverRoutine} sizes="(max-width: 700px) 70vw, 250px" /></div><h3>{design[1].title}</h3>{design[1].paragraphs.map(text => <p key={text}>{text}</p>)}</section>
            <section><MedicineMotion name="as-needed medicine" description="An as-needed medicine entry transitions to a recorded state" video={`${media}/as-needed.mp4`} poster={`${media}/as-needed-poster.webp`} /><h3>{design[2].title}</h3>{design[2].paragraphs.map(text => <p key={text}>{text}</p>)}</section>
          </div>
        </div>
      </section>

      <section className="lf-scene lf-outcome" id="outcome" data-tone="light" aria-labelledby="outcome-title">
        <div className="lf-scene-content">
          <div className="lf-outcome-composition">
            <h2 id="outcome-title">{outcome.title}</h2>
            <div>{outcome.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
          </div>
        </div>
      </section>
    </div>
    <div className="lf-case-end"><Link href="/work">All work</Link><Link href="/work/swiggy-agent-workflow">Next project<span>Swiggy agent workflow</span></Link></div>
  </article>;
}
