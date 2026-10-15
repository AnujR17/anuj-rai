import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { CuriousEyes } from "@/components/concept/CuriousEyes";
import { contact } from "@/data/contact";
import { home } from "@/data/home";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="intro-title">
        <div className={styles.introduction}>
          <p className={styles.role}><span aria-hidden="true" />{home.role}</p>
          <h1 id="intro-title">Hi, I’m<br />Anuj Rai<span className={styles.period}>.</span></h1>
        </div>
        <div className={styles.heroEyes}><CuriousEyes /></div>
        <div className={styles.heroNote}>
          <p>{home.introduction}</p>
          <a href="#about" className={styles.textLink}>A little about me first <ArrowDown size={17} aria-hidden="true" /></a>
        </div>
        <div className={styles.heroBottom}>
          <p>A designer. A builder. Always curious.</p>
          <a href="#about" aria-label="Scroll to the introduction"><ArrowDown size={20} strokeWidth={1.5} aria-hidden="true" /></a>
        </div>
      </section>

      <section id="about" className={styles.about} aria-labelledby="about-title">
        <div className={styles.sectionLabel}><ArrowDownRight className={styles.smallMark} strokeWidth={1.25} aria-hidden="true" />A little about me</div>
        <div className={styles.aboutMain}>
          <h2 id="about-title">I design interfaces.<br />Then I build to see<br />how they behave<span className={styles.period}>.</span></h2>
          <div className={styles.aboutDetail}>
            <p>{home.about}</p>
            <Link href="/about" className={styles.textLink}>More about me <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <ul className={styles.interests} aria-label="Design interests">{home.interests.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section id="work" className={styles.work} aria-labelledby="work-title">
        <div className={styles.workHeading}>
          <div><p className={styles.sectionLabel}>From an idea to something you can try</p><h2 id="work-title">A few things I’ve made<span className={styles.period}>.</span></h2></div>
          <Link href="/work" className={styles.textLink}>All work <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className={styles.projects}>
          {home.work.map((project, index) => (
            <Link href={`/work/${project.slug}`} className={styles.project} key={project.slug}>
              <div className={`${styles.projectVisual} ${styles[project.surface]}`}>
                <span className={styles.projectNumber}>0{index + 1}</span>
                <Image src={project.image} alt={project.alt} width={project.width} height={project.height} sizes={project.surface === "dashboard" ? "(max-width: 700px) 65vw, 340px" : "(max-width: 700px) 90vw, 550px"} />
                <span className={styles.projectAction} aria-hidden="true"><ArrowUpRight size={22} strokeWidth={1.5} /></span>
              </div>
              <div className={styles.projectTitle}><h3>{project.title}</h3><ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true" /></div>
              <p className={styles.projectCategory}>{project.category}</p>
              <p className={styles.projectDescription}>{project.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.contact} aria-labelledby="contact-title">
        <div><p className={styles.sectionLabel}>For a project, a role, or a conversation</p><h2 id="contact-title">Let’s talk<ArrowDownRight className={styles.contactArrow} strokeWidth={1} aria-hidden="true" /></h2></div>
        <a className={styles.email} href={`mailto:${contact.email}`}>{contact.email}<ArrowRight size={22} aria-hidden="true" /></a>
      </section>
    </div>
  );
}
