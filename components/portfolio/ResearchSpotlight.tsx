import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ResearchSpotlight() {
  return (
    <section id="fieldwork" className="research-spotlight" aria-labelledby="fieldwork-title">
      <Link className="research-spotlight-visual" href="/work/gandhinagar-roundabouts" aria-label="Explore the Gandhinagar roundabout field study">
        <Image
          src="/portfolio/research/gandhinagar-field.jpg"
          alt="Mixed traffic entering Reliance Circle in Gandhinagar."
          width={825}
          height={460}
          sizes="(max-width: 700px) 90vw, 700px"
        />
        <Image
          className="research-map-detail"
          src="/portfolio/research/gandhinagar-flow-map.jpg"
          alt="A field annotation tracing overlapping traffic approaches and service roads."
          width={931}
          height={646}
          sizes="(max-width: 700px) 45vw, 310px"
        />
      </Link>
      <div className="research-spotlight-copy">
        <p className="portfolio-kicker">Field research · Communication concepts</p>
        <h2 id="fieldwork-title">What actually<br />blocks the circle?</h2>
        <p>Parking was the starting explanation. Observations at Gandhinagar’s roundabouts brought service-road entries, unclear signals, and everyday decisions into the picture.</p>
        <Link className="portfolio-link" href="/work/gandhinagar-roundabouts">Follow the field study <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
