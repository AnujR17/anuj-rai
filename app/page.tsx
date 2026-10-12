import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ThreadStudy } from "@/components/portfolio/ThreadStudy";
import { contact } from "@/data/contact";
import styles from "./studio.module.css";


const notes = [
  { id: "attention", context: "On attention", title: "One screen, several things asking for attention." },
  { id: "care", context: "On shared care", title: "An unconfirmed dose is still a question." },
  { id: "understanding", context: "On understanding", title: "Start with something familiar." },
];

export default function Home() {
  return <div className={styles.home}>
    <section className={styles.hero} aria-labelledby="intro-title">
      <div className={styles.intro}>
        <h1 id="intro-title">Designing<br />how things<br />respond.</h1>
        <p>I’m Anuj, an interaction designer with a background in computer science. I work across digital products, information, and physical computing.</p>
        <a href="#selected-work" className={styles.heroLink}>Explore my work<ArrowRight size={20} aria-hidden="true" /></a>
      </div>
      <div className={styles.thread}><ThreadStudy /></div>
    </section>

    <section className={styles.work} id="selected-work" aria-labelledby="work-title">
      <header className={styles.sectionHead}>
        <h2 id="work-title">Selected work</h2>
        <p>A display, an interactive story, and a question from the street. Each needed a different way of looking.</p>
      </header>
      <article className={styles.project}>
        <Link href="/work/two-wheeler-dashboard" className={`${styles.projectArt} ${styles.dashboard}`} aria-label="View Himalayan 450">
          <Image src="/portfolio/himalayan-dashboard.png" alt="Original Himalayan 450 circular display design with speed, gear, RPM, and warning signals." width={385} height={385} sizes="(max-width: 600px) 68vw, 410px" />
        </Link>
        <div className={styles.projectCopy}><div><Link href="/work/two-wheeler-dashboard"><h3>Himalayan 450</h3></Link><p className={styles.projectName}>Interface design &amp; prototyping</p></div><div><p>Designing hierarchy within a circular motorcycle display, then building a simulation to examine gear changes, warnings, and competing signals.</p><Link href="/work/two-wheeler-dashboard" className={styles.link}>View project<ArrowUpRight size={19} aria-hidden="true" /></Link></div></div>
      </article>
      <article className={styles.project}>
        <Link href="/work/india-in-orbit" className={`${styles.projectArt} ${styles.orbit}`} aria-label="View India in Orbit">
          <Image src="/portfolio/india-in-orbit.png" alt="The built India in Orbit experience with a rendered Earth and star field." width={1280} height={850} sizes="(max-width: 700px) 100vw, 90vw" />
        </Link>
        <div className={styles.projectCopy}><div><Link href="/work/india-in-orbit"><h3>India in Orbit</h3></Link><p className={styles.projectName}>Information design &amp; development</p></div><div><p>An interactive introduction to satellites, missions, and orbits, beginning with the ways space technology enters everyday life.</p><Link href="/work/india-in-orbit" className={styles.link}>View project<ArrowUpRight size={19} aria-hidden="true" /></Link></div></div>
      </article>
      <article className={styles.project}>
        <Link href="/work/gandhinagar-roundabouts" className={`${styles.projectArt} ${styles.field}`} aria-label="View Gandhinagar roundabout research">
          <Image src="/portfolio/research/gandhinagar-field.jpg" alt="Original field photograph of traffic entering Reliance Circle in Gandhinagar." width={825} height={460} sizes="(max-width: 700px) 100vw, 90vw" />
        </Link>
        <div className={styles.projectCopy}><div><Link href="/work/gandhinagar-roundabouts"><h3>Reading a roundabout</h3></Link><p className={styles.projectName}>Field research &amp; problem framing</p></div><div><p>A parking observation became a wider traffic inquiry. I followed the question through fieldwork, conversations, movement maps, and records.</p><Link href="/work/gandhinagar-roundabouts" className={styles.link}>View project<ArrowUpRight size={19} aria-hidden="true" /></Link></div></div>
      </article>
      <Link className={styles.allWork} href="/work">View all work<ArrowUpRight size={24} aria-hidden="true" /></Link>
    </section>

    <section className={styles.perspective} aria-labelledby="perspective-title">
      <div className={styles.perspectiveInner}>
        <h2 id="perspective-title">Understanding people.<br />Working through prototypes.</h2>
        <div className={styles.perspectiveCopy}><p>Computer science taught me to build. Interaction design has changed what I pay attention to: the person using something, their routine, and what they need to understand.</p><p>I work between research, interface design, and code. A prototype helps me examine an interaction closely — what it communicates, how it responds, and where it breaks.</p></div>
        <Link className={styles.link} href="/about">A little more about me<ArrowUpRight size={19} aria-hidden="true" /></Link>
      </div>
    </section>

    <section className={styles.workbench} aria-labelledby="lab-title">
      <header className={styles.sectionHead}><h2 id="lab-title">On the workbench</h2><p>Physical prototypes, connection experiments, and product ideas I’m developing.</p></header>
      <a className={styles.experiment} href="https://github.com/AnujR17/Intelligent-Waste-Disposal-Systems"><div><h3>Responsive dustbin</h3><p>A physical prototype with proximity sensing, animated eyes, and lid and audio behaviour.</p></div><ArrowUpRight aria-hidden="true" /></a>
      <a className={styles.experiment} href="https://github.com/AnujR17/toki"><div><h3>Toki</h3><p>An ESP32 connection lab exploring Bluetooth notifications, connection states, and recovery. In progress.</p></div><ArrowUpRight aria-hidden="true" /></a>
      <Link className={styles.experiment} href="/notes#care"><div><h3>Medicine &amp; shared care</h3><p>An independent app exploring how a person and a loved one share dose status. In progress.</p></div><ArrowUpRight aria-hidden="true" /></Link>
    </section>

    <section className={styles.notes} aria-labelledby="notes-title">
      <div className={styles.notesInner}><header className={styles.sectionHead}><h2 id="notes-title">Working notes</h2><p>What I’m noticing about attention, care, and understanding through these projects.</p></header>
      <div className={styles.noteList}>{notes.map(note => <Link key={note.id} className={styles.note} href={`/notes#${note.id}`}><span>{note.context}</span><h3>{note.title}</h3><ArrowUpRight size={22} aria-hidden="true" /></Link>)}</div>
      <Link className={styles.link} href="/notes">Read all notes<ArrowUpRight size={19} aria-hidden="true" /></Link></div>
    </section>

    <section className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.contactInner}><h2 id="contact-title">Let’s work together.</h2>
      <p>I’m interested in interaction design roles and collaborations across digital and physical products.</p>
      <a className={styles.email} href={`mailto:${contact.email}`}>{contact.email}<ArrowUpRight size={28} aria-hidden="true" /></a>
      </div>
    </section>
  </div>;
}
