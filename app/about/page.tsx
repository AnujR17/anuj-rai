import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <article className="case-shell">
      <header className="case-heading"><p className="portfolio-kicker">About Anuj</p><h1>Curious about how<br />things come together.</h1><p>I’m exploring interaction and product design through interfaces, code, and physical prototypes.</p></header>
      <section className="case-section"><h2>What draws me in</h2><div><p>I’m interested in problems that sit between technology and people: how information becomes understandable, how an object communicates, and how a product responds when something changes.</p><p>Research helps me frame the question. Design and prototyping give me something concrete to examine and improve.</p></div></section>
      <section className="case-section"><h2>What I want to develop</h2><div><p>I want to work closely with designers and engineers, take responsibility for decisions, and keep learning across the boundaries between digital and physical experiences.</p><p>My projects range from a motorcycle display and an interactive satellite explorer to experiments with connected objects. Each asks a different question about how an interaction should work.</p></div></section>
      <section className="case-section"><h2>Background</h2><div><p>I’m pursuing an M.Des in Intelligent User Experience Design at Dhirubhai Ambani University, following undergraduate study at ITM Vocational University.</p><Link href="/resume" className="portfolio-link">Experience and education <ArrowRight size={18} aria-hidden="true" /></Link></div></section>
      <Link href="/work" className="portfolio-link">See the work <ArrowRight size={18} aria-hidden="true" /></Link>
    </article>
  );
}
