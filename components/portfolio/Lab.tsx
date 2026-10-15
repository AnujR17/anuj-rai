
const experiments = [
  {
    title: "Intelligent Waste Disposal Systems",
    project: "Intelligent Waste Disposal Systems",
    description: "An Arduino hardware prototype connecting proximity sensors, animated eyes and a servo-controlled lid",
    href: "https://github.com/AnujR17/Intelligent-Waste-Disposal-Systems",
  },
  {
    title: "Toki",
    project: "Toki",
    description: "An ongoing ESP32 and app connection prototype for Bluetooth handshakes, notifications and recovery",
    href: "https://github.com/AnujR17/toki",
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
