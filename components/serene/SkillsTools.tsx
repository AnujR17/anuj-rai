import Link from "next/link";
const capabilities = [
  {
    title: "Research & synthesis",
    text: "Field observations, survey analysis and research synthesis.",
    example: "Roundabout field study",
    href: "/work/gandhinagar-roundabouts/",
  },
  {
    title: "Interface & interaction design",
    text: "Information hierarchy, screen layouts and interaction states.",
    example: "Himalayan interface",
    href: "/work/two-wheeler-dashboard/",
  },
  {
    title: "Code & working prototypes",
    text: "Interactive websites and browser prototypes built with React and TypeScript.",
    example: "India in Orbit",
    href: "/work/india-in-orbit/",
  },
  {
    title: "Physical exploration",
    text: "Connected-object concepts, physical controls and feedback.",
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
        <h2>Skills & tools.</h2>
        <p>Capabilities shown in the projects above, and the tools I use.</p>
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
          <p className="eyebrow">Tools I use</p>
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
