import Image from "next/image";
import Link from "next/link";

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

        <h2 id="fieldwork-title">Gandhinagar roundabout study</h2>
        <p>A field study of service-road entries, traffic signals and driver behaviour at Gandhinagar roundabouts</p>
        <Link className="portfolio-link" href="/work/gandhinagar-roundabouts">View field study</Link>
      </div>
    </section>
  );
}
