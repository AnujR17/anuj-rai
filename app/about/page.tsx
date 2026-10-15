import Link from "next/link";

export default function About() {
  return (
    <article className="case-shell">
      <header className="case-heading"><h1>About</h1><p>I study interaction and product design and build interfaces, websites and physical prototypes</p></header>
      <section className="case-section"><h2>Design interests</h2><div><p>I’m interested in how people read information, use an object and understand its response</p><p>I use research to define the problem and prototypes to examine the design</p></div></section>
      <section className="case-section"><h2>Projects</h2><div><p>My projects include a motorcycle display, a satellite website and experiments with connected objects</p><p>I want to work with designers and engineers on products that combine software and physical interaction</p></div></section>
      <section className="case-section"><h2>AR and VR</h2><div><p>I want to explore navigation, controls and feedback in spatial interfaces</p></div></section>
      <section className="case-section"><h2>Education</h2><div><p>I’m pursuing an M.Des in Intelligent User Experience Design at Dhirubhai Ambani University, following undergraduate study at ITM Vocational University</p><Link href="/resume" className="portfolio-link">View resume</Link></div></section>
      <Link href="/work" className="portfolio-link">Selected work</Link>
    </article>
  );
}
