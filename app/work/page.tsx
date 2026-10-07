import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Lab } from "@/components/portfolio/Lab";
import { ResearchSpotlight } from "@/components/portfolio/ResearchSpotlight";
import { ResearchList } from "@/components/portfolio/ResearchList";

export default function Work() {
  return (
    <div className="portfolio-shell work-index">
      <header className="work-heading">
        <p className="portfolio-kicker">Interfaces, information, and physical interactions</p>
        <h1>Selected work.</h1>
        <p>Design ideas, field questions, and working prototypes.</p>
        <nav className="work-sections" aria-label="Work sections">
          <a href="#design">Design &amp; build</a>
          <a href="#fieldwork">Fieldwork</a>
          <a href="#analysis">Analysis</a>
          <a href="#lab">Experiments</a>
        </nav>
      </header>
      <section id="design" className="work-project work-project-dashboard">
        <Link href="/work/two-wheeler-dashboard" className="work-visual dashboard-visual" aria-label="Explore Himalayan 450"><Image src="/portfolio/himalayan-dashboard.png" alt="Circular Himalayan 450 dashboard design showing speed, gear, and RPM." width={385} height={385} preload sizes="(max-width: 600px) 70vw, 385px" /></Link>
        <div className="work-project-copy"><p className="portfolio-kicker">Interface design · Browser prototype</p><h2>Himalayan 450</h2><p>Exploring hierarchy and changing states in a circular motorcycle display.</p><Link href="/work/two-wheeler-dashboard" className="portfolio-link">Explore the dashboard <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </section>
      <section className="work-project work-project-orbit">
        <Link href="/work/india-in-orbit" className="work-visual orbit-visual" aria-label="Explore India in Orbit"><Image src="/portfolio/india-in-orbit.png" alt="Live India in Orbit website with a star field and rendered Earth." width={1280} height={850} sizes="(max-width: 900px) 90vw, 750px" /></Link>
        <div className="work-project-copy"><p className="portfolio-kicker">Information design · Interactive web</p><h2>India in Orbit</h2><p>Making satellites, missions, and their everyday relevance explorable.</p><Link href="/work/india-in-orbit" className="portfolio-link">Explore the project <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </section>
      <ResearchSpotlight />
      <ResearchList />
      <Lab />
      <aside className="work-in-development"><h2>Medicine, routines, and reminders</h2><p>The physical Meditimer concept is a separate project from my independent medicine app.</p><Link href="/work/medtimer" className="portfolio-link">Read the concept brief <ArrowUpRight size={18} aria-hidden="true" /></Link></aside>
    </div>
  );
}
