import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { ThreadStudy } from "@/components/portfolio/ThreadStudy";
import { contact } from "@/data/contact";
import styles from "./studio.module.css";

function SectionNumber({children}:{children:React.ReactNode}) {return <p className={styles.number}>{children}<span aria-hidden="true"/></p>;}
function CircleArrow(){return <span className={styles.circleArrow}><ArrowUpRight size={16} aria-hidden="true"/></span>;}

export default function Home() {
  return <div className={styles.home}>
    <section className={styles.hero} aria-labelledby="intro-title">
      <div className={styles.heroLight} aria-hidden="true"/>
      <div className={styles.intro}>
        <SectionNumber>01</SectionNumber>
        <h1 id="intro-title">Ideas<br/><em>find their way.</em></h1>
        <p>I’m Anuj. I design interactions and build prototypes across screens, code, and physical objects.</p>
        <a href="#selected-work" className={styles.link}>Explore my work<span className={styles.circleArrow}><ArrowRight size={17} aria-hidden="true"/></span></a>
      </div>
      <div className={styles.thread}><ThreadStudy/></div>
      <div className={styles.rhythm}><span>Observe</span><span>Explore</span><span>Design</span><span>Make</span><span>Iterate</span></div>
      <div className={styles.heroFoot}><span>A loose end can be a place to start.</span><a href="#selected-work" aria-label="Scroll to selected work"><ArrowDown size={14} aria-hidden="true"/></a></div>
    </section>

    <section className={styles.work} id="selected-work" aria-labelledby="work-title">
      <header className={styles.sectionHead}><SectionNumber>02</SectionNumber><h2 id="work-title">Selected<br/><em>work.</em></h2><p>Interfaces, information, and questions from the field.</p><Link href="/work" className={styles.link}>All projects<CircleArrow/></Link></header>
      <div className={styles.projects}>
        <article className={styles.project}><Link href="/work/two-wheeler-dashboard" className={styles.projectArt+" "+styles.dashboard} aria-label="View Himalayan 450"><Image src="/portfolio/himalayan-dashboard.png" alt="Original Himalayan 450 circular display design with speed, gear, RPM, and warning signals." width={385} height={385} sizes="(max-width: 700px) 65vw, 260px"/><span className={styles.artNumber}>01</span></Link><Link className={styles.projectTitle} href="/work/two-wheeler-dashboard"><h3>Himalayan 450</h3><ArrowUpRight size={14} aria-hidden="true"/></Link><p>Interface study · Browser simulation</p></article>
        <article className={styles.project}><Link href="/work/india-in-orbit" className={styles.projectArt+" "+styles.orbit} aria-label="View India in Orbit"><Image src="/portfolio/india-in-orbit.png" alt="The built India in Orbit experience with a rendered Earth and star field." width={1280} height={850} sizes="(max-width: 700px) 90vw, 450px"/><span className={styles.artNumber}>02</span></Link><Link className={styles.projectTitle} href="/work/india-in-orbit"><h3>India in Orbit</h3><ArrowUpRight size={14} aria-hidden="true"/></Link><p>Information design · Interactive web</p></article>
        <article className={styles.project}><Link href="/work/gandhinagar-roundabouts" className={styles.projectArt+" "+styles.field} aria-label="View Gandhinagar roundabout research"><Image src="/portfolio/research/gandhinagar-field.jpg" alt="Original field photograph of traffic entering Reliance Circle in Gandhinagar." width={825} height={460} sizes="(max-width: 700px) 90vw, 450px"/><span className={styles.artNumber}>03</span></Link><Link className={styles.projectTitle} href="/work/gandhinagar-roundabouts"><h3>Reading a roundabout</h3><ArrowUpRight size={14} aria-hidden="true"/></Link><p>Field research · Reframing a question</p></article>
      </div>
    </section>

    <div className={styles.paired}>
      <section className={styles.about} aria-labelledby="about-title"><div className={styles.panelCopy}><SectionNumber>03</SectionNumber><h2 id="about-title">Thinking<br/><em>by making.</em></h2><p>My background is in computer science. I’m drawn to the moment an idea becomes something I can try, question, and change.</p><Link className={styles.link} href="/about">A little about me<CircleArrow/></Link></div><svg className={styles.aboutWires} viewBox="0 0 480 380" fill="none" aria-hidden="true"><defs><filter id="about-shadow"><feGaussianBlur stdDeviation="2.6"/></filter></defs><g stroke="#061c26" strokeWidth="3" opacity=".5" transform="translate(-22,36)" filter="url(#about-shadow)"><path d="M50 340C148 242 141 152 231 124S363 78 420 40"/><path d="M70 363C130 286 268 313 292 235S254 121 322 70"/><path d="M138 373C220 278 283 182 425 205"/></g><path d="M50 340C148 242 141 152 231 124S363 78 420 40" stroke="#e5875b" strokeWidth="2.3"/><path d="M70 363C130 286 268 313 292 235S254 121 322 70" stroke="#76a8c1" strokeWidth="1.8"/><path d="M138 373C220 278 283 182 425 205" stroke="#bfcfd5" strokeWidth="1.3"/><circle cx="231" cy="124" r="4" fill="#c18b58"/><circle cx="292" cy="235" r="3" fill="#c18b58"/></svg></section>
      <section className={styles.notes} aria-labelledby="notes-title"><div className={styles.panelCopy}><SectionNumber>04</SectionNumber><h2 id="notes-title">Questions<br/><em>worth keeping.</em></h2><p>A few working notes on attention, shared care, and finding a way into an unfamiliar system.</p><Link className={styles.link} href="/notes">Read the notes<CircleArrow/></Link></div><div className={styles.notebook} role="img" aria-label="Illustrative blue notebook over the original roundabout-study map"><div className={styles.paper}><Image src="/portfolio/research/gandhinagar-flow-map.jpg" alt="" width={931} height={646} sizes="230px"/></div><div className={styles.book}><span className={styles.bookSpine}/><span className={styles.bookStrap}/></div><span className={styles.bookThread}/></div></section>
    </div>

    <div className={styles.bottom}>
      <section className={styles.lab} aria-labelledby="lab-title"><header><SectionNumber>05</SectionNumber><h2 id="lab-title">Still <em>in the making.</em></h2><p>Smaller experiments. Some questions stay open.</p></header><a className={styles.experiment} href="https://github.com/AnujR17/Intelligent-Waste-Disposal-Systems"><div><h3>An object that responds</h3><p>Physical prototype · Firmware</p></div><ArrowUpRight size={17} aria-hidden="true"/></a><a className={styles.experiment} href="https://github.com/AnujR17/toki"><div><h3>Getting the connection right</h3><p>Toki · Bluetooth connection lab in progress</p></div><ArrowUpRight size={17} aria-hidden="true"/></a></section>
      <section className={styles.contact} aria-labelledby="contact-title"><SectionNumber>06</SectionNumber><h2 id="contact-title">Something<br/><em>on your mind?</em></h2><p>A role, a collaboration, or an interesting interaction. Let’s talk.</p><a className={styles.link} href={"mailto:"+contact.email}>{contact.email}<CircleArrow/></a><svg className={styles.contactWire} viewBox="0 0 360 130" fill="none" aria-hidden="true"><path d="M3 110C86 110 117 15 205 44S297 99 354 11" stroke="#cf653f" strokeWidth="1.5"/><path d="M3 110C86 110 117 15 205 44S297 99 354 11" stroke="#173747" strokeOpacity=".13" strokeWidth="2" transform="translate(-7,14)"/><circle cx="205" cy="44" r="3" fill="#32566a"/></svg></section>
    </div>
  </div>;
}
