import Link from "next/link";
import { Doodle } from "@/components/serene/Doodle";
import {
  DashboardPlate,
  Laptop,
  PhonePair,
  ProductPlate,
} from "@/components/serene/Mockups";
import { HowIWork } from "@/components/serene/HowIWork";
import { AboutIntro } from "@/components/serene/AboutIntro";
import { Contact } from "@/components/serene/Contact";
export default function Home() {
  return (
    <>
      <section className="hero">
        <Doodle />
        <div className="hero-copy">
          <h1>
            People, patterns,
            <br />
            and the little things.
          </h1>
          <p>
            I’m Anuj. I design interactions and build prototypes,
            <br className="desktop-break" /> drawing on my background in
            computer science.
          </p>
          <p className="hero-aside">
            People’s habits. Everyday patterns.
            <br />
            The details that make an experience feel right.
          </p>
          <a className="inline-link" href="#work">
            Take a look at my work <span>↓</span>
          </a>
        </div>
        <span className="hero-footnote">
          A closer look, then a little making.
        </span>
      </section>
      <section className="selected-section section-pad" id="work">
        <div className="section-heading">
          <h2>
            Selected work<span>.</span>
          </h2>
          <p>
            Interfaces, information and physical objects.
            <br />A few different ways of working things out.
          </p>
        </div>
        <div className="selected-grid">
          <article className="project-preview himalayan">
            <Link
              href="/work/two-wheeler-dashboard/"
              className="preview-visual"
            >
              <DashboardPlate />
              <span className="open-project" aria-hidden="true">
                ↗
              </span>
            </Link>
            <div className="preview-heading">
              <h3>
                <Link href="/work/two-wheeler-dashboard/">Himalayan 450</Link>
              </h3>
              <span>Interface study · Browser simulation</span>
            </div>
            <p>
              What stays visible when everything changes? A circular dashboard
              and its changing states.
            </p>
            <p className="project-contribution">
              Interface concept & prototype · Independent educational study
            </p>
          </article>
          <article className="project-preview orbit">
            <Link href="/work/india-in-orbit/" className="preview-visual">
              <Laptop />
              <span className="open-project" aria-hidden="true">
                ↗
              </span>
            </Link>
            <div className="preview-heading">
              <h3>
                <Link href="/work/india-in-orbit/">India in Orbit</Link>
              </h3>
              <span>Information design · Interactive web</span>
            </div>
            <p>
              A way into an invisible system, starting with the satellites
              already part of everyday life.
            </p>
            <p className="project-contribution">
              Interactive web project · Working experience
            </p>
          </article>
        </div>
        <div className="more-heading">
          <h3>More things I’ve been working on</h3>
          <Link className="inline-link" href="/work/">
            All work ↗
          </Link>
        </div>
        <div className="further-grid">
          <article>
            <Link
              className="further-visual medicine"
              href="/work/medicine-app/"
            >
              <PhonePair />
            </Link>
            <h4>
              <Link href="/work/medicine-app/">
                Medicine app <span>↗</span>
              </Link>
            </h4>
            <p>Medicine taker and caregiver interfaces. Independent design.</p>
          </article>
          <article>
            <Link className="further-visual" href="/work/toki/">
              <ProductPlate />
            </Link>
            <h4>
              <Link href="/work/toki/">
                Toki <span>↗</span>
              </Link>
            </h4>
            <p>Exploring focus through a connected desk object.</p>
          </article>
          <article>
            <Link className="further-visual" href="/work/medtimer/">
              <ProductPlate physical />
            </Link>
            <h4>
              <Link href="/work/medtimer/">
                Physical Meditimer <span>↗</span>
              </Link>
            </h4>
            <p>Problem framing and concept rationale in a group project.</p>
          </article>
        </div>
        <Link className="research-note" href="/work/gandhinagar-roundabouts/">
          <span>From the field</span>
          <strong>What actually blocks the circle?</strong>
          <span>A roundabout research study ↗</span>
        </Link>
      </section>
      <HowIWork />
      <AboutIntro />
      <Contact />
    </>
  );
}
