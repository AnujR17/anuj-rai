"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";

const featured = [
  {
    name: "Himalayan 450",
    discipline: "Interface design / Browser prototype",
    description: "A circular motorcycle display, explored through a working simulation of speed, gears, and riding modes.",
    image: "/portfolio/himalayan-dashboard.png",
    alt: "Circular dashboard design with an RPM arc, prominent speed reading, gear indicator, and warning symbols.",
    width: 385, height: 385,
    href: "/work/two-wheeler-dashboard",
    linkLabel: "Explore the dashboard",
    theme: "dashboard",
    caption: "Interface design export · Concept prototype",
  },
  {
    name: "India in Orbit",
    discipline: "Information design / Interactive web",
    description: "An interactive introduction to India’s satellites, their missions, and the systems they belong to.",
    image: "/portfolio/india-in-orbit.png",
    alt: "India in Orbit website opening with a star field, introduction to India's space programme, and a rendered Earth.",
    width: 1280, height: 850,
    href: "/work/india-in-orbit",
    linkLabel: "Explore India in Orbit",
    theme: "orbit",
    caption: "Live website capture · Interactive web project",
  },
] as const;

export function FeaturedWork() {
  const [selected, setSelected] = useState(0);
  const reducedMotion = useReducedMotion();
  const project = featured[selected];
  return (
    <div className={`featured-work featured-${project.theme}`}>
      <div className="featured-picker" role="group" aria-label="Choose a featured project">
        {featured.map((item, index) => (
          <button key={item.name} type="button" aria-pressed={selected === index} aria-controls="featured-project" onClick={() => setSelected(index)}>
            {item.name}{selected === index ? <ArrowUpRight size={14} aria-hidden="true" /> : <Plus size={14} aria-hidden="true" />}
          </button>
        ))}
      </div>
      <motion.div key={project.name} id="featured-project" initial={reducedMotion ? false : { y: 8 }} animate={{ y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.18 }}>
        <Link href={project.href} className="featured-image-link" aria-label={project.linkLabel}>
          <figure className="featured-figure">
            <Image src={project.image} width={project.width} height={project.height} alt={project.alt} preload={selected === 0} sizes={selected === 0 ? "(max-width: 600px) 70vw, 350px" : "(max-width: 900px) 90vw, 750px"} />
            <figcaption>{project.caption}</figcaption>
          </figure>
        </Link>
        <div className="featured-caption">
          <div><p>{project.discipline}</p><h2>{project.name}</h2></div>
          <p className="featured-description">{project.description}</p>
          <Link href={project.href} className="portfolio-link">{project.linkLabel}<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </motion.div>
    </div>
  );
}
