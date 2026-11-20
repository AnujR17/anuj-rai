import Link from "next/link";
import type { Project } from "@/data/case-study";
import { LayeredCaseNav } from "./LayeredCaseNav";
import { MedicineGallery, MedicineStructure, DoseRecordStudy, MedicineFacts, StaticMedicineScreen } from "./MedicineInteractions";
import { MedicineMotion } from "./MedicineMotion";
import { caregiverScreen, personalScreen } from "@/data/medicine-screens";
import "./restored-medicine.css";

const media = "/portfolio/meditimer-case";

export function MedicineCaseStudy({ project }: { project: Project }) {
  const research = project.stages.research.flatMap(block => block.paragraphs);
  const insights = project.stages.insights.flatMap(block => block.paragraphs);
  const concept = project.stages.concept.flatMap(block => block.paragraphs);
  const design = project.stages.design;
  const outcome = project.stages.outcome.flatMap(block => block.paragraphs);
  return <article className="lf-main" data-restored-case="medicine-app">
    <header className="lf-hero" id="hero" aria-labelledby="lf-hero-title">
      <Link href="/work" className="lf-all-work">All work</Link>
      <div className="lf-opening-visual"><MedicineMotion name="prescription setup" description="A sequence of Meditimer prescription setup screens, accompanied by a personal reminder and caregiver history" video={`${media}/hero.mp4`} poster={`${media}/hero.webp`} width={1280} height={720} mobileVideo={`${media}/hero-mobile.mp4`} mobilePoster={`${media}/scan.webp`} priority autoPlay={false} /></div>
      <h1 id="lf-hero-title">Meditimer</h1>
      <div className="lf-hero-copy"><p>A medicine routine you can manage and share with someone who cares for you</p></div>
    </header>

    <section className="lf-overview" id="overview" aria-labelledby="overview-title"><div className="lf-overview-layout">
      <div className="lf-overview-content"><h2 id="overview-title">Medicine routines, made easier to follow together</h2><p className="lf-overview-summary">{project.summary}</p></div>
      <div className="lf-overview-reading"><section><h3>Project brief</h3><p>{project.brief}</p></section><section><h3>Problem statement</h3><p>{project.problem}</p></section></div>
      <dl className="lf-overview-contribution"><div><dt>My contribution</dt><dd>{project.contribution}</dd></div><div><dt>Outcome</dt><dd>Clickable Figma prototype</dd></div></dl>
      <MedicineFacts />
    </div></section>

    <div className="lf-case-story" id="lf-case-story"><LayeredCaseNav />
      <section className="lf-scene lf-research" id="research" data-tone="light" aria-labelledby="research-title">
        <div className="lf-scene-content"><div className="lf-research-opening"><div><h2 id="research-title">Understanding routines</h2><p>{research[0]}</p></div>
          <div className="lf-research-findings" aria-label="Findings from the 24-response survey"><div><strong>13 / 24</strong><p>selected a meal-linked schedule</p></div><div><strong>8 / 24</strong><p>selected an as-needed schedule</p></div><div><strong>10 / 24</strong><p>selected a missing record as a gap in their current setup</p></div><p className="lf-research-note">People could select more than one answer.</p></div>
        </div><div className="lf-reading-pair lf-research-reading">{research.slice(1).map(text => <p key={text}>{text}</p>)}</div></div>
      </section>

      <section className="lf-scene lf-insights" id="insights" data-tone="dark" aria-labelledby="insights-title"><div className="lf-scene-content"><div className="lf-insight-composition"><h2 id="insights-title">What does the record actually tell us?</h2><DoseRecordStudy /><div className="lf-insight-copy">{insights.map(text => <p key={text}>{text}</p>)}</div></div></div></section>

      <section className="lf-scene lf-concept" id="concept" data-tone="light" aria-labelledby="concept-title"><div className="lf-scene-content">
        <div className="lf-concept-heading"><h2 id="concept-title">One routine, two perspectives</h2><p>{concept[0]}</p></div>
        <div className="lf-paired-study"><div className="lf-person-view"><h3>Taking medicine</h3><StaticMedicineScreen screen={personalScreen} /></div><div className="lf-family-view"><h3>Supporting someone</h3><StaticMedicineScreen screen={caregiverScreen} /></div></div>
        <div className="lf-concept-explanation">{concept.slice(1).map(text => <p key={text}>{text}</p>)}</div><MedicineStructure />
      </div></section>

      <section className="lf-scene lf-design" id="design" data-tone="light" aria-labelledby="design-title"><div className="lf-scene-content">
        <div className="lf-design-heading"><h2 id="design-title">From prescription to routine</h2><p>Select a screen to explore the setup.</p></div>
        <p className="lf-design-intro">The concept starts with a prescription. The person reviews the medicine details and proposed reminders before confirming a schedule. The screens use sample information to demonstrate the interaction.</p>
        <MedicineGallery />
        <div className="lf-feature-heading"><h3>Supporting the moments that follow</h3><p>After setup, the experience considers a person’s daily routine and the people who may support them.</p></div>
        <div className="lf-feature-grid">
          <section><MedicineMotion name="record a dose" description="A personal reminder transitions to a dose marked as taken" video={`${media}/record-dose.mp4`} poster={`${media}/record-dose-poster.webp`} /><h3>{design[0].title}</h3>{design[0].paragraphs.map(text => <p key={text}>{text}</p>)}</section>
          <section><MedicineMotion name="caregiver check-in" description="A caregiver alert transitions to a history screen showing no update yet" video={`${media}/caregiver-check-in.mp4`} poster={`${media}/caregiver-check-in-poster.webp`} /><h3>{design[1].title}</h3>{design[1].paragraphs.map(text => <p key={text}>{text}</p>)}</section>
          <section><MedicineMotion name="as-needed medicine" description="An as-needed medicine entry transitions to a recorded state" video={`${media}/as-needed.mp4`} poster={`${media}/as-needed-poster.webp`} /><h3>{design[2].title}</h3>{design[2].paragraphs.map(text => <p key={text}>{text}</p>)}</section>
        </div>
      </div></section>

      <section className="lf-scene lf-outcome" id="outcome" data-tone="light" aria-labelledby="outcome-title"><div className="lf-scene-content"><div className="lf-outcome-composition"><h2 id="outcome-title">A prototype for the next conversation</h2><div>{outcome.map(text => <p key={text}>{text}</p>)}<a href="#hero">Return to the opening</a></div></div>
        <div className="lf-next-steps"><h3>What I would explore next</h3><p>Let someone revisit and correct an earlier dose, then test whether both people understand the difference between an unrecorded and a missed dose. Further design should address scan errors, an adjustable alert delay and consent and permissions for caregiver access.</p></div>
        <div className="lf-sources"><h3>Sources and credits</h3><p>{project.note}</p><div>{project.resources?.map(resource => <a key={resource.href} href={resource.href}>{resource.label}</a>)}</div></div>
      </div></section>
    </div>
    <div className="lf-case-end"><Link href="/work">All work</Link><Link href="/work/swiggy-agent-workflow">Next project<span>Swiggy agent workflow</span></Link></div>
  </article>;
}
