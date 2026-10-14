import Link from "next/link";
import { sereneCases, type SereneCase } from "@/data/serene-cases";
import { DashboardPlate, Laptop, PhonePair, ProductPlate } from "./Mockups";
import {
  DashboardDemo,
  MedicineDemo,
  TokiDemo,
  PhysicalDemo,
  OrbitDemo,
} from "./Studies";
export function CaseVisual({ project }: { project: SereneCase }) {
  return project.theme === "himalayan" ? (
    <DashboardPlate />
  ) : project.theme === "medicine" ? (
    <PhonePair />
  ) : project.theme === "orbit" ? (
    <Laptop />
  ) : (
    <ProductPlate physical={project.theme === "physical"} />
  );
}
export function CasePage({ project: p }: { project: SereneCase }) {
  const next =
    sereneCases[
      (sereneCases.findIndex((c) => c.slug === p.slug) + 1) % sereneCases.length
    ];
  return (
    <article className="case-page" data-theme={p.theme}>
      <header className="case-opening">
        <Link className="case-back" href="/work/">
          ← All work
        </Link>
        <p className="eyebrow">
          {p.title} · {p.category}
        </p>
        <h1>{p.headline}</h1>
        <p className="lead">{p.intro}</p>
        <dl className="case-meta">
          <div>
            <dt>Contribution</dt>
            <dd>{p.role}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{p.status}</dd>
          </div>
        </dl>
      </header>
      <div className="case-hero-scene">
        <CaseVisual project={p} />
      </div>
      <p className="caption scene-caption">{p.sceneCaption}</p>
      <nav className="chapter-nav" aria-label="Case study chapters">
        <a href="#context">The question</a>
        <a href="#decisions">The choices</a>
        <a href="#study">Try the study</a>
        <a href="#reflection">What it shows</a>
      </nav>
      <section id="context" className="case-story">
        <h2 className="statement">{p.question}</h2>
        <div className="body-copy">
          {p.context.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <div className="case-links">
          {p.links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label} ↗
            </a>
          ))}
        </div>
      </section>
      <section id="decisions" className="case-story">
        <p className="eyebrow">A closer look</p>
        <h2>The choices in the work.</h2>
        <div className="decision-grid">
          {p.decisions.map((d, n) => (
            <article key={d.title}>
              <span>0{n + 1}</span>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="study" className="study-section">
        <h2>Something to try.</h2>
        <p className="study-intro">{p.studyIntro}</p>
        {p.theme === "himalayan" ? (
          <DashboardDemo />
        ) : p.theme === "medicine" ? (
          <MedicineDemo />
        ) : p.theme === "toki" ? (
          <TokiDemo />
        ) : p.theme === "physical" ? (
          <PhysicalDemo />
        ) : (
          <OrbitDemo />
        )}
      </section>
      <section className="case-story" id="reflection">
        <p className="eyebrow">What it shows</p>
        <h2>
          Made visible.
          <br />
          Still open to questions.
        </h2>
        <div className="body-copy">
          {p.reflection.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
        <details className="case-detail">
          <summary>Sources, contribution and scope</summary>
          <p>{p.detail}</p>
        </details>
      </section>
      <div className="case-end">
        <Link href="/work/">← Back to all work</Link>
        <Link href={`/work/${next.slug}/`}>Next: {next.title} ↗</Link>
      </div>
    </article>
  );
}
