import Link from "next/link";
import { MedicineCaseStudy } from "./MedicineCaseStudy";
import { sereneCases, type SereneCase } from "@/data/serene-cases";
import { CaseEvidence } from "./CaseEvidence";
import { DashboardPlate, Laptop, PhonePair, ProductPlate } from "./Mockups";
import { DashboardDemo, TokiDemo, OrbitDemo } from "./Studies";
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
  if (p.theme === "medicine" || p.theme === "physical") {
    return <MedicineCaseStudy project={p} physical={p.theme === "physical"} />;
  }
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
        <a className="case-original-link" href={p.links[0].href}>
          {p.links[0].label} <span aria-hidden="true">↗</span>
        </a>
      </header>
      <figure className="case-scene-figure">
        <div className="case-hero-scene">
          <CaseVisual project={p} />
        </div>
        <figcaption className="caption scene-caption">
          {p.sceneCaption}
        </figcaption>
      </figure>
      <nav className="chapter-nav" aria-label="Case study chapters">
        <a href="#context">The question</a>
        <a href="#decisions">Evidence &amp; choices</a>
        <a href="#study">Try the study</a>
        <a href="#reflection">Result &amp; next question</a>
      </nav>
      <section id="context" className="case-story">
        <h2 className="statement">{p.question}</h2>
        <div className="body-copy">
          {p.context.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </section>
      <section id="decisions" className="case-story">
        <p className="eyebrow">A closer look</p>
        <h2>Evidence, choices and tradeoffs.</h2>
        <CaseEvidence theme={p.theme} />
        <div className="decision-grid">
          {p.decisions.map((d, n) => (
            <article key={d.title}>
              <span>0{n + 1}</span>
              <p className="decision-evidence">{d.evidence}</p>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
              <div className="decision-tradeoff">
                <h4>The tradeoff</h4>
                <p>{d.tradeoff}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="study" className="study-section">
        <p className="eyebrow">A separate portfolio interaction study</p>
        <h2>{p.studyTitle}</h2>
        <p className="study-intro">{p.studyIntro}</p>
        <div className="study-reading">
          <div>
            <h3>Try this</h3>
            <p>{p.studyTask}</p>
          </div>
          <div>
            <h3>Look for</h3>
            <p>{p.studyNotice}</p>
          </div>
        </div>
        {p.theme === "himalayan" ? (
          <DashboardDemo />
        ) : p.theme === "toki" ? (
          <TokiDemo />
        ) : (
          <OrbitDemo />
        )}
      </section>
      <section className="case-story" id="reflection">
        <p className="eyebrow">The result and the next question</p>
        <h2>{p.result.title}</h2>
        <div className="case-result-grid">
          <div>
            <h3>What was made</h3>
            <p>{p.result.delivered}</p>
          </div>
          <div>
            <h3>What to evaluate next</h3>
            <p>{p.result.next}</p>
          </div>
        </div>
        <details className="case-detail">
          <summary>Sources, contribution and scope</summary>
          <p>{p.detail}</p>
          <div className="case-links">
            {p.links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label} ↗
              </a>
            ))}
          </div>
        </details>
      </section>
      <div className="case-end">
        <Link href="/work/">← Back to all work</Link>
        <Link href={`/work/${next.slug}/`}>Next: {next.title} ↗</Link>
      </div>
    </article>
  );
}
