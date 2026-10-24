import Link from "next/link";
import type { Project } from "@/data/case-study";
import { LayeredCaseNav } from "./LayeredCaseNav";
import { MedicineOpening, MedicineGallery, OriginalMedicineInterfaces, MedicineStructure, DoseRecordStudy, MedicineFacts, StaticMedicineScreen } from "./MedicineInteractions";
import { medicineScreens } from "@/data/medicine-screens";
import "./restored-medicine.css";

export function MedicineCaseStudy({ project }: { project: Project }) {
  const research = project.stages.research.flatMap(block => block.paragraphs);
  const insights = project.stages.insights.flatMap(block => block.paragraphs);
  const concept = project.stages.concept.flatMap(block => block.paragraphs);
  const design = project.stages.design;
  const outcome = project.stages.outcome.flatMap(block => block.paragraphs);
  return <article className="lf-main" data-restored-case="medicine-app">
    <header className="lf-hero" id="hero" aria-labelledby="lf-hero-title">
      <Link href="/work" className="lf-all-work">All work</Link>
      <MedicineOpening />
      <h1 id="lf-hero-title">Meditimer</h1>
      <div className="lf-hero-copy"><p>A medicine routine you can record and share with someone who cares for you</p></div>
    </header>
    <section className="lf-overview" id="overview" aria-labelledby="overview-title"><div className="lf-overview-layout">
      <div className="lf-overview-content"><h2 id="overview-title">Medicine reminders and dose records</h2><p className="lf-overview-summary">{project.summary}</p></div>
      <div className="lf-overview-reading"><section><h3>Project brief</h3><p>{project.brief}</p></section><section><h3>Problem statement</h3><p>{project.problem}</p></section></div>
      <dl className="lf-overview-contribution"><div><dt>My contribution</dt><dd>{project.contribution}</dd></div></dl>
      <MedicineFacts />
    </div></section>
    <div className="lf-case-story" id="lf-case-story"><LayeredCaseNav />
      <section className="lf-scene lf-research" id="research" data-tone="light" aria-labelledby="research-title">
        <div className="lf-scene-content"><div className="lf-research-opening"><div><h2 id="research-title">Users</h2><p>{research[0]}</p></div><div className="lf-role-study">
          <div className="lf-person"><h3>Taking medicine</h3><StaticMedicineScreen screen={medicineScreens[3]} /></div><div className="lf-person lf-person-second"><h3>Supporting someone</h3><StaticMedicineScreen screen={medicineScreens[4]} /></div>
        </div></div><div className="lf-reading-pair lf-research-reading">{research.slice(1).map(text => <p key={text}>{text}</p>)}</div></div>
      </section>
      <section className="lf-scene lf-insights" id="insights" data-tone="dark" aria-labelledby="insights-title"><div className="lf-scene-content"><div className="lf-insight-composition"><h2 id="insights-title">Dose records</h2><DoseRecordStudy /><div className="lf-insight-copy">{insights.map(text => <p key={text}>{text}</p>)}</div></div></div></section>
      <section className="lf-scene lf-concept" id="concept" data-tone="light" aria-labelledby="concept-title"><div className="lf-scene-content">
        <div className="lf-concept-heading"><h2 id="concept-title">User views</h2><p>{concept[0]}</p></div>
        <div className="lf-paired-study"><div className="lf-person-view"><h3>Taking medicine</h3><StaticMedicineScreen screen={medicineScreens[3]} /></div><div className="lf-family-view"><h3>Supporting someone</h3><StaticMedicineScreen screen={medicineScreens[4]} /></div></div>
        <div className="lf-concept-explanation">{concept.slice(1).map(text => <p key={text}>{text}</p>)}</div><MedicineStructure />
      </div></section>
      <section className="lf-scene lf-design" id="design" data-tone="light" aria-labelledby="design-title"><div className="lf-scene-content">
        <div className="lf-design-heading"><h2 id="design-title">Screens</h2><p>Select a screen to view it larger</p></div><MedicineGallery />
        <div className="lf-reading-pair lf-design-reading">{design.map((block, index) => <div key={index}><h3>{index === 0 ? "Medicine-taker view" : "Caregiver view"}</h3>{block.paragraphs.map(text => <p key={text}>{text}</p>)}</div>)}</div><OriginalMedicineInterfaces />
      </div></section>
      <section className="lf-scene lf-outcome" id="outcome" data-tone="light" aria-labelledby="outcome-title"><div className="lf-scene-content"><div className="lf-outcome-composition"><h2 id="outcome-title">Project status</h2><div>{outcome.map(text => <p key={text}>{text}</p>)}<a href="#hero">Return to the opening</a></div></div>
        <div className="lf-sources"><h3>Sources and credits</h3><p>{project.note}</p><div>{project.resources?.map(resource => <a key={resource.href} href={resource.href}>{resource.label}</a>)}</div></div>
      </div></section>
    </div>
    <div className="lf-case-end"><Link href="/work">All work</Link><Link href="/work/swiggy-agent-workflow">Next project<span>Swiggy agent workflow</span></Link></div>
  </article>;
}
