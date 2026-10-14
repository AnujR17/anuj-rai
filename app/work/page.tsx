import Link from "next/link";
import { sereneCases } from "@/data/serene-cases";
import { researchProjects } from "@/data/research-projects";
import { CaseVisual } from "@/components/serene/CasePage";
export const metadata = { title: "Work" };
export default function Work() {
  return (
    <div className="work-index">
      <p className="eyebrow">Things I’ve designed, built and examined</p>
      <h1>The work.</h1>
      <p className="work-intro">
        Interfaces, information and physical objects. Each project offers a
        different question, a few choices, and something concrete to inspect.
      </p>
      <div className="work-cards">
        {sereneCases.map((p) => (
          <article className="work-card" key={p.slug}>
            <Link
              href={`/work/${p.slug}/`}
              className="work-visual"
              aria-label={`Read ${p.title}`}
            >
              <CaseVisual project={p} />
            </Link>
            <h2>
              <Link href={`/work/${p.slug}/`}>{p.title} ↗</Link>
            </h2>
            <p>{p.intro}</p>
            <p className="eyebrow">{p.status}</p>
          </article>
        ))}
      </div>
      <section className="work-support">
        <h2>Research & analysis</h2>
        {researchProjects.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}/`}>
            <strong>{p.title}</strong>
            <span>Read study ↗</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
