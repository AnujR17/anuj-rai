import Image from "next/image";
import Link from "next/link";
import { Doodle } from "@/components/serene/Doodle";
import {
  DashboardPlate,
  PhonePair,
  ProductPlate,
} from "@/components/serene/Mockups";
import { HowIWork } from "@/components/serene/HowIWork";
import { AboutIntro } from "@/components/serene/AboutIntro";
import { Contact } from "@/components/serene/Contact";
import { ScribbleTheme } from "@/components/serene/ScribbleTheme";
import { SkillsTools } from "@/components/serene/SkillsTools";
import { Explorations } from "@/components/serene/Explorations";

export default function Home() {
  return (
    <ScribbleTheme>
      <div className="portfolio-v2">
        <section className="hero gallery-hero" id="hero">
          <Doodle />
          <div className="hero-copy">
            <p className="gallery-hello">Hi, I’m Anuj.</p>
            <h1>
              I design interfaces.
              <br />
              <span>And build prototypes.</span>
            </h1>
            <div className="hero-introduction">
              <p>
                My work spans screen interfaces, interactive websites and
                physical product concepts.
              </p>
              <p>
                A background in computer science.
                <br />A focus on interaction design.
              </p>
            </div>
          </div>
        </section>
        <section className="gallery-work gallery-pad" id="work">
          <div className="gallery-heading">
            <h2>
              Selected work<span className="gallery-count"> / 02</span>
            </h2>
            <p>Design, code and the interactions between them.</p>
          </div>
          <article className="gallery-project">
            <Link
              href="/work/two-wheeler-dashboard/"
              className="gallery-image gallery-bike"
              aria-label="View motorcycle dashboard interface case study"
            >
              <DashboardPlate />
              <span className="gallery-open" aria-hidden="true">
                ↗
              </span>
            </Link>
            <div className="gallery-project-caption">
              <div>
                <span className="gallery-index">01 / Interface design</span>
                <h3>
                  <Link href="/work/two-wheeler-dashboard/">
                    Motorcycle dashboard interface
                  </Link>
                </h3>
              </div>
              <div>
                <p>
                  A circular dashboard for the Himalayan 450, with a browser
                  prototype to explore speed, gear and display states.
                </p>
                <span className="gallery-status">
                  Independent concept · Interface & prototype
                </span>
              </div>
              <Link
                className="gallery-case-link"
                href="/work/two-wheeler-dashboard/"
              >
                View case study ↗
              </Link>
            </div>
          </article>
          <article className="gallery-project">
            <Link
              href="/work/india-in-orbit/"
              className="gallery-image gallery-orbit"
              aria-label="View India in Orbit case study"
            >
              <Image
                src="/portfolio/india-in-orbit.png"
                alt="India in Orbit website with an illustrated Earth and satellite information"
                width={1280}
                height={850}
                sizes="90vw"
              />
              <span className="gallery-open" aria-hidden="true">
                ↗
              </span>
            </Link>
            <div className="gallery-project-caption">
              <div>
                <span className="gallery-index">02 / Information design</span>
                <h3>
                  <Link href="/work/india-in-orbit/">India in Orbit</Link>
                </h3>
              </div>
              <div>
                <p>
                  An interactive website connecting Indian satellites with the
                  everyday services they support.
                </p>
                <span className="gallery-status">
                  Web design & development · Working website
                </span>
              </div>
              <Link className="gallery-case-link" href="/work/india-in-orbit/">
                View case study ↗
              </Link>
            </div>
          </article>
          <div className="gallery-heading gallery-secondary-heading">
            <h2>More projects</h2>
            <Link href="/work/">All work ↗</Link>
          </div>
          <div className="gallery-small-grid">
            <article>
              <Link
                className="gallery-small-image gallery-medicine"
                href="/work/medicine-app/"
                aria-label="View medicine app case study"
              >
                <PhonePair />
                <span aria-hidden="true">↗</span>
              </Link>
              <h3>
                <Link href="/work/medicine-app/">Medicine app</Link>
              </h3>
              <p>Daily dose records and a separate caregiver view.</p>
              <span className="gallery-status">
                Independent interface design
              </span>
            </article>
            <article>
              <Link
                className="gallery-small-image"
                href="/work/toki/"
                aria-label="View Toki case study"
              >
                <ProductPlate />
                <span aria-hidden="true">↗</span>
              </Link>
              <h3>
                <Link href="/work/toki/">Toki</Link>
              </h3>
              <p>A desk object for tasks, time and physical feedback.</p>
              <span className="gallery-status">
                Connected-object exploration
              </span>
            </article>
            <article>
              <Link
                className="gallery-small-image"
                href="/work/medtimer/"
                aria-label="View physical Meditimer case study"
              >
                <ProductPlate physical />
                <span aria-hidden="true">↗</span>
              </Link>
              <h3>
                <Link href="/work/medtimer/">Physical Meditimer</Link>
              </h3>
              <p>Framing a medicine-storage and reminder concept.</p>
              <span className="gallery-status">
                Group concept · My role: framing & rationale
              </span>
            </article>
          </div>
          <Link
            className="gallery-research"
            href="/work/gandhinagar-roundabouts/"
          >
            <span className="gallery-index">Research / Field study</span>
            <h3>Understanding congestion at Gandhinagar’s roundabouts</h3>
            <span aria-hidden="true">↗</span>
          </Link>
        </section>
        <HowIWork />
        <SkillsTools />
        <AboutIntro />
        <Explorations />
        <Contact />
      </div>
    </ScribbleTheme>
  );
}
