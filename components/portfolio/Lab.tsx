
const experiments = [
  {
    title: "Intelligent Waste Disposal Systems",
    project: "Intelligent Waste Disposal Systems",
    description: "An Arduino hardware prototype connecting proximity sensors, animated eyes and a servo-controlled lid",
    href: "https://github.com/AnujR17/Intelligent-Waste-Disposal-Systems",
  },
  {
    title: "Toki development",
    project: "Toki",
    description: "Companion app and device firmware for a four-task desk object, with physical acceptance pending",
    href: "/work/toki",
  },
];

export function Lab() {
  return (
    <section id="lab" className="portfolio-lab" aria-labelledby="lab-title">
      <div className="portfolio-section-heading"><h2 id="lab-title">Experiments</h2></div>
      {experiments.map((experiment) => (
        <a key={experiment.project} className="lab-row" href={experiment.href}>
          <div><h3>{experiment.title}</h3></div>
          <div><p>{experiment.description}</p></div>
          <span className="lab-source">Source</span>
        </a>
      ))}
    </section>
  );
}
