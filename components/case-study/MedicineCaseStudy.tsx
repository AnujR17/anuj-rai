import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/case-study";
import { caregiverRoutine, historyExamples, personalRoutine } from "@/data/medicine-screens";
import { LayeredCaseNav } from "./LayeredCaseNav";
import { MedicineFacts, MedicineGallery, MedicineStructure, StaticMedicineScreen } from "./MedicineInteractions";
import { MedicineMotion } from "./MedicineMotion";
import "./restored-medicine.css";

const media = "/portfolio/meditimer-case";

const wireframes = [
  { src: "/portfolio/screens/capture.png", alt: "Early wireframe for scanning or uploading a prescription" },
  { src: "/portfolio/screens/review.png", alt: "Early wireframe for reviewing a medicine and its timing" },
  { src: "/portfolio/screens/routine.png", alt: "Early wireframe for confirming the medicine schedule" },
];

const onboardingScreens = [
  { src: `${media}/onboarding-scan.png`, alt: "Onboarding screen introducing prescription scanning" },
  { src: `${media}/onboarding-person.png`, alt: "Onboarding screen for choosing a personal or caregiver routine" },
  { src: `${media}/onboarding-meals.png`, alt: "Onboarding screen for setting usual meal times" },
];

function ScreenStrip({ screens, label }: { screens: { src: string; alt: string }[]; label: string }) {
  return <div className="lf-screen-strip" role="group" aria-label={label}>
    {screens.map(screen => <a href={screen.src} key={screen.src} aria-label={`Open full-size image: ${screen.alt}`}>
      <Image src={screen.src} alt={screen.alt} width={402} height={874} sizes="(max-width: 700px) 42vw, 230px" />
    </a>)}
  </div>;
}

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
        <div className="lf-overview-content"><h2 id="overview-title">Project overview</h2><p className="lf-overview-summary">{project.summary}</p>
          <dl className="lf-medicine-metadata">
            <div><dt>Discipline</dt><dd>Mobile Application</dd></div>
            <div><dt>Role</dt><dd>Interaction Designer</dd></div>
            <div><dt>Domain</dt><dd>Healthcare</dd></div>
            <div><dt>Duration</dt><dd>{project.duration}</dd></div>
            <div><dt>Tools &amp; Technologies</dt><dd>Figma, FigJam</dd></div>
          </dl>
        </div>
        <div className="lf-overview-reading">
          <section><h3>Project brief</h3><p>{project.brief}</p></section>
          <section><h3>Problem statement</h3><p>{project.problem}</p></section>
        </div>
        <MedicineFacts />
      </div>
    </section>

    <div className="lf-case-story" id="lf-case-story">
      <LayeredCaseNav mobileLinks />
      <section className="lf-scene lf-research" id="research" data-tone="light" aria-labelledby="research-title">
        <div className="lf-scene-content">
          <div className="lf-research-opening">
            <div><h2 id="research-title">Understanding routines</h2><p>{research[0]}</p></div>
            <div className="lf-research-findings" aria-label="Research questions and findings">
              <div><h3>How do routines fit into the day?</h3><p>Some people took medicine around meals, while others took it only when needed.</p></div>
              <div><h3>Why do doses get missed?</h3><p>People mentioned forgetting or getting busy. Some found reminders easy to ignore or wanted a record of their doses.</p></div>
              <div><h3>How can family help?</h3><p>People wanted to know if a parent had taken their medicine without having to ask every time.</p></div>
            </div>
          </div>
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
          <section className="lf-screen-section" aria-labelledby="wireframes-title">
            <div className="lf-screen-section-heading"><h3 id="wireframes-title">Exploring the setup</h3><p>Early wireframes follow the path from scanning a prescription to reviewing medicines and confirming a schedule.</p></div>
            <ScreenStrip screens={wireframes} label="Early prescription setup wireframes" />
          </section>
        </div>
      </section>

      <section className="lf-scene lf-design" id="design" data-tone="light" aria-labelledby="design-title">
        <div className="lf-scene-content">
          <div className="lf-design-heading">
            <h2 id="design-title">From prescription to routine</h2>
          </div>
          <section className="lf-screen-section lf-onboarding-section" aria-labelledby="onboarding-title">
            <div className="lf-screen-section-heading"><h3 id="onboarding-title">Getting started</h3><p>Onboarding introduces prescription scanning, asks who the routine is for and sets meal times for reminders.</p></div>
            <ScreenStrip screens={onboardingScreens} label="Meditimer onboarding screens" />
          </section>
          <h3 className="lf-setup-heading">Reviewing the prescription</h3>
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
