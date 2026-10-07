import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FeaturedWork } from "@/components/portfolio/FeaturedWork";
import { Lab } from "@/components/portfolio/Lab";
import { contact } from "@/data/contact";

export default function Home() {
  return (
    <div className="portfolio-shell">
      <section className="portfolio-opening" aria-labelledby="intro-title">
        <div className="portfolio-intro">
          <p className="portfolio-kicker">Interaction design · Working prototypes</p>
          <h1 id="intro-title">How should<br />{" "}this <em>work?</em></h1>
          <p className="portfolio-intro-copy">I’m Anuj. I’m interested in how people, interfaces, and physical things meet. I explore those questions through design and code.</p>
          <Link href="/work" className="portfolio-link">Explore the work <ArrowRight size={18} aria-hidden="true" /></Link>
          <p className="portfolio-intro-note">From a motorcycle display<br />to a world of satellites.</p>
        </div>
        <FeaturedWork />
      </section>
      <section className="portfolio-approach" aria-labelledby="approach-title">
        <p className="portfolio-kicker">Across screens and objects</p>
        <div>
          <h2 id="approach-title">The part I keep coming back to:<br /><span>turning a question into something you can try.</span></h2>
          <div className="portfolio-approach-copy">
            <p>A dashboard asks what needs attention. A space explorer asks how to make a complex system understandable. A physical prototype asks how an object should respond.</p>
            <p>I’m looking for a team where I can work through those questions with designers and engineers, from early exploration to the details of an interaction.</p>
          </div>
          <Link href="/about" className="portfolio-link">A little more about me <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
      <Lab />
      <section className="portfolio-contact" aria-labelledby="contact-title">
        <div><p className="portfolio-kicker">Have something in mind?</p><h2 id="contact-title">Let’s work through it.</h2></div>
        <a className="portfolio-link" href={`mailto:${contact.email}`}>{contact.email} <ArrowUpRight size={20} aria-hidden="true" /></a>
      </section>
    </div>
  );
}
