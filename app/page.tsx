import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { ThreadStudy, ThreadMark } from "@/components/portfolio/ThreadStudy";
import { contact } from "@/data/contact";
import styles from "./studio.module.css";

function CircleArrow() {
  return <span className={styles.circleArrow}><ArrowUpRight size={20} aria-hidden="true" /></span>;
}

const notes = [
  { id: "attention", context: "On attention", title: "One screen, several things asking for attention." },
  { id: "care", context: "On shared care", title: "An unconfirmed dose is still a question." },
  { id: "understanding", context: "On understanding", title: "Start with something familiar." },
];

export default function Home() {
  return <div className={styles.home}>
    <section className={styles.hero} aria-labelledby="intro-title">
      <div className={styles.heroLight} aria-hidden="true" />
      <div className={styles.intro}>
        <p className={styles.label}>Anuj Rai · Interaction designer</p>
        <h1 id="intro-title">Ideas<br /><em>find their way.</em></h1>
        <p>I follow questions across people, screens, and physical objects. Then I make things to see where they lead.</p>
        <a href="#selected-work" className={styles.link}>Explore my work<span className={styles.circleArrow}><ArrowRight size={20} aria-hidden="true" /></span></a>
      </div>
      <div className={styles.thread}><ThreadStudy /></div>
      <a className={styles.scroll} href="#selected-work" aria-label="Scroll to selected work"><ArrowDown size={18} aria-hidden="true" /></a>
    </section>

    <section className={styles.work} id="selected-work" aria-labelledby="work-title">
      <header className={styles.sectionHead}>
        <p className={styles.label}>Selected work</p>
        <h2 id="work-title">Different contexts.<br /><em>A closer look.</em></h2>
        <p>What needs attention? Where does a story begin? Is this the right question? Three projects, three ways in.</p>
      </header>
      <article className={styles.project}>
        <Link href="/work/two-wheeler-dashboard" className={`${styles.projectArt} ${styles.dashboard}`} aria-label="View Himalayan 450">
          <Image src="/portfolio/himalayan-dashboard.png" alt="Original Himalayan 450 circular display design with speed, gear, RPM, and warning signals." width={385} height={385} sizes="(max-width: 600px) 68vw, 410px" />
        </Link>
        <div className={styles.projectCopy}><div><p className={styles.projectName}>Himalayan 450</p><Link href="/work/two-wheeler-dashboard"><h3>Making room<br />for what matters.</h3></Link></div><div><p>A circular motorcycle display becomes a study in hierarchy: speed, gear, RPM, and warnings, each asking for a different kind of attention. A controllable browser simulation lets me examine the changing states.</p><Link href="/work/two-wheeler-dashboard" className={styles.link}>Inside the project<CircleArrow /></Link></div></div>
      </article>
      <article className={styles.project}>
        <Link href="/work/india-in-orbit" className={`${styles.projectArt} ${styles.orbit}`} aria-label="View India in Orbit">
          <Image src="/portfolio/india-in-orbit.png" alt="The built India in Orbit experience with a rendered Earth and star field." width={1280} height={850} sizes="(max-width: 700px) 100vw, 90vw" />
        </Link>
        <div className={styles.projectCopy}><div><p className={styles.projectName}>India in Orbit</p><Link href="/work/india-in-orbit"><h3>A way into<br />a world above us.</h3></Link></div><div><p>Satellites can feel distant. Their everyday uses offer a place to begin. India in Orbit connects those uses with missions and orbital systems through a built, interactive web experience.</p><Link href="/work/india-in-orbit" className={styles.link}>Explore the story<CircleArrow /></Link></div></div>
      </article>
      <article className={styles.project}>
        <Link href="/work/gandhinagar-roundabouts" className={`${styles.projectArt} ${styles.field}`} aria-label="View Gandhinagar roundabout research">
          <Image src="/portfolio/research/gandhinagar-field.jpg" alt="Original field photograph of traffic entering Reliance Circle in Gandhinagar." width={825} height={460} sizes="(max-width: 700px) 100vw, 90vw" />
        </Link>
        <div className={styles.projectCopy}><div><p className={styles.projectName}>Reading a roundabout</p><Link href="/work/gandhinagar-roundabouts"><h3>Sometimes, the question<br />needs to change.</h3></Link></div><div><p>A study that began with parking widened into an inquiry about traffic around a roundabout. Field observations, mapped movement, and records helped me look beyond the first explanation.</p><Link href="/work/gandhinagar-roundabouts" className={styles.link}>Read the fieldwork<CircleArrow /></Link></div></div>
      </article>
      <Link className={styles.allWork} href="/work">There’s more to explore<span>View all work<CircleArrow /></span></Link>
    </section>

    <section className={styles.perspective} aria-labelledby="perspective-title">
      <div className={styles.perspectiveInner}>
        <p className={styles.label}>The person behind the work</p>
        <h2 id="perspective-title">Between a question<br />and <em>a working thing.</em></h2>
        <ThreadMark className={styles.perspectiveMark} kind="turn" />
        <div className={styles.perspectiveCopy}><p>My background is in computer science. Studying interaction design has brought people, context, and the questions behind an interface into that way of thinking.</p><p>I like being able to make an idea tangible — a screen I can change, a behaviour I can try, an object that responds. Making gives me something to question again.</p></div>
        <Link className={styles.link} href="/about">A little more about me<CircleArrow /></Link>
      </div>
    </section>

    <section className={styles.workbench} aria-labelledby="lab-title">
      <header className={styles.sectionHead}><p className={styles.label}>On the workbench</p><h2 id="lab-title">Still <em>taking shape.</em></h2><p>Smaller experiments and ongoing questions. A place for the work between an idea and a finished case study.</p></header>
      <a className={styles.experiment} href="https://github.com/AnujR17/Intelligent-Waste-Disposal-Systems"><div><h3>An object that responds.</h3><p>A dustbin prototype with proximity sensing, animated eyes, and lid and audio behaviour.</p><span>Physical computing · Firmware available</span></div><ArrowUpRight aria-hidden="true" /></a>
      <a className={styles.experiment} href="https://github.com/AnujR17/toki"><div><h3>Getting the connection right.</h3><p>Toki: exploring Bluetooth notifications, connection states, and recovery with an ESP32.</p><span>Connection lab · In progress</span></div><ArrowUpRight aria-hidden="true" /></a>
      <Link className={styles.experiment} href="/notes#care"><div><h3>Making care felt.</h3><p>An independent medicine-care app exploring how a person and a loved one share dose status.</p><span>App design · In progress</span></div><ArrowUpRight aria-hidden="true" /></Link>
    </section>

    <section className={styles.notes} aria-labelledby="notes-title">
      <div className={styles.notesInner}><header className={styles.sectionHead}><p className={styles.label}>Working notes</p><h2 id="notes-title">Some questions<br /><em>stay with you.</em></h2><p>Thoughts from the work, while they’re still being worked through.</p></header>
      <div className={styles.noteList}>{notes.map(note => <Link key={note.id} className={styles.note} href={`/notes#${note.id}`}><span>{note.context}</span><h3>{note.title}</h3><ArrowUpRight size={22} aria-hidden="true" /></Link>)}</div>
      <Link className={styles.link} href="/notes">Read all notes<CircleArrow /></Link></div>
    </section>

    <section className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.contactInner}><h2 id="contact-title">What are you<br /><em>thinking about?</em></h2>
      <p>A role, a collaboration, or a question you’re trying to make sense of. I’d like to hear it.</p>
      <a className={styles.email} href={`mailto:${contact.email}`}>{contact.email}<ArrowUpRight size={28} aria-hidden="true" /></a>
      <ThreadMark className={styles.contactMark} /></div>
    </section>
  </div>;
}
