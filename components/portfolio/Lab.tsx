import { ArrowUpRight } from "lucide-react";

const experiments = [
  {
    title: "An object that responds",
    project: "Intelligent Waste Disposal Systems",
    description: "Arduino firmware connecting proximity sensors, animated eyes, and a servo-controlled lid. A physical interaction experiment.",
    status: "Hardware prototype / Firmware available",
    href: "https://github.com/AnujR17/Intelligent-Waste-Disposal-Systems",
  },
  {
    title: "Before the interface, the connection",
    project: "Toki",
    description: "An ESP32 and app connection lab exploring Bluetooth handshakes, notifications, and recovery. The device experience is still in development.",
    status: "Ongoing / Connection prototype",
    href: "https://github.com/AnujR17/toki",
  },
];

export function Lab() {
  return (
    <section className="portfolio-lab" aria-labelledby="lab-title">
      <div className="portfolio-section-heading"><h2 id="lab-title">Also on the workbench</h2><p>Smaller experiments. Questions still open.</p></div>
      {experiments.map((experiment) => (
        <a key={experiment.project} className="lab-row" href={experiment.href}>
          <div><p className="portfolio-kicker">{experiment.project}</p><h3>{experiment.title}</h3></div>
          <div><p>{experiment.description}</p><p className="lab-status">{experiment.status}</p></div>
          <span className="lab-source">Source <ArrowUpRight size={20} aria-hidden="true" /></span>
        </a>
      ))}
    </section>
  );
}
