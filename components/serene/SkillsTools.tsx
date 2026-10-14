import Link from "next/link";
import { ScribbleAccent } from "./ScribbleAccent";
const capabilities = [
  {
    title: "Research & synthesis",
    text: "Look at what’s happening, then find the useful patterns.",
    example: "Roundabout field study",
    href: "/work/gandhinagar-roundabouts/",
  },
  {
    title: "Interface & interaction design",
    text: "Work through hierarchy, states and what someone can do next.",
    example: "Himalayan interface",
    href: "/work/two-wheeler-dashboard/",
  },
  {
    title: "Code & working prototypes",
    text: "Give an idea enough form to make it possible to try.",
    example: "India in Orbit",
    href: "/work/india-in-orbit/",
  },
  {
    title: "Physical exploration",
    text: "Explore how an object communicates through form and feedback.",
    example: "Toki exploration",
    href: "/work/toki/",
  },
];
const tools = [
  { use: "Design", names: ["Figma"] },
  { use: "Building", names: ["React", "TypeScript"] },
  { use: "Physical prototyping", names: ["Arduino", "ESP32"] },
  { use: "AI assistance", names: ["GitHub Copilot"] },
];
export function SkillsTools() {
  return (
    <section className="skills-section section-pad" id="skills">
      <div className="section-heading">
        <h2>
          Skills &<br />
          <span className="marked-word">
            tools
            <ScribbleAccent />
          </span>
          .
        </h2>
        <p>
          What I bring to the work,
          <br />
          and what I use to make it.
        </p>
      </div>
      <div className="skills-layout">
        <div className="capability-grid">
          {capabilities.map((c, n) => (
            <article key={c.title}>
              <span className="eyebrow">0{n + 1}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <Link href={c.href}>{c.example} ↗</Link>
            </article>
          ))}
        </div>
        <aside className="tool-ledger">
          <p className="eyebrow">The things on my desk</p>
          <dl>
            {tools.map((t) => (
              <div key={t.use}>
                <dt>{t.use}</dt>
                <dd>
                  {t.names.map((name) => (
                    <span key={name}>{name}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
          <p className="caption">
            I choose the tool around the question. AI assistance is credited in
            the work it helped with.
          </p>
        </aside>
      </div>
    </section>
  );
}
