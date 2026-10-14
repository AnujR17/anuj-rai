import { AboutIntro } from "@/components/serene/AboutIntro";
import { Contact } from "@/components/serene/Contact";
import Link from "next/link";
export const metadata = { title: "About" };
export default function About() {
  return (
    <>
      <AboutIntro standalone />
      <article className="case-shell">
        <section className="case-section">
          <h2>Computing, then interaction.</h2>
          <div>
            <p>
              My background in computer science gives me a way to understand
              systems and bring ideas into working form. I’m interested in how
              those systems become experiences people can understand and use.
            </p>
            <p>
              I’m pursuing an M.Des in Intelligent User Experience Design at
              Dhirubhai Ambani University, following undergraduate study at ITM
              Vocational University.
            </p>
            <Link className="inline-link" href="/resume/">
              Experience and education ↗
            </Link>
          </div>
        </section>
        <section className="case-section">
          <h2>What I’m drawn to.</h2>
          <div>
            <p>
              Interface states, information that takes a little work to explain,
              and objects that respond to what someone does. My projects give me
              different ways to explore those things.
            </p>
            <p>
              I’m also interested in AR and VR: finding your way through a
              space, knowing what you can interact with, and getting feedback
              beyond a flat screen.
            </p>
          </div>
        </section>
        <section className="case-section">
          <h2>Skills & tools</h2>
          <div>
            <p>
              Research synthesis, interface design, interaction prototyping and
              programming. I use Figma, React, TypeScript and physical-computing
              tools where the project calls for them.
            </p>
            <p>
              The Himalayan prototype credits GitHub Copilot assistance. AI use
              belongs alongside the decisions and implementation it helped with,
              so the contribution stays clear.
            </p>
            <Link className="inline-link" href="/#approach">
              See how I work ↗
            </Link>
          </div>
        </section>
      </article>
      <Contact />
    </>
  );
}
