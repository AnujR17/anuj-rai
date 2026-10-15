import Image from "next/image";
import Link from "next/link";
import { CuriousEyes } from "@/components/concept/CuriousEyes";
import { contact } from "@/data/contact";
import { home } from "@/data/home";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="intro-title">
        <div className={styles.introduction}>
          <h1 id="intro-title">Hi, I’m<br />Anuj Rai</h1>
        </div>
        <div className={styles.heroEyes}><CuriousEyes /></div>
        <div className={styles.heroNote}>
          <p>{home.introduction}</p>
          <a href="#about" className={styles.textLink}>About me</a>
        </div>
      </section>

      <section id="about" className={styles.about} aria-labelledby="about-title">
        <h2 id="about-title">About</h2>
        <div className={styles.aboutMain}>
          <p>{home.about}</p>
          <Link href="/about" className={styles.textLink}>Read about me</Link>
        </div>
      </section>

      <section id="work" className={styles.work} aria-labelledby="work-title">
        <div className={styles.workHeading}>
          <h2 id="work-title">Selected work</h2>
          <Link href="/work" className={styles.textLink}>All work</Link>
        </div>
        <div className={styles.projects}>
          {home.work.map(project => (
            <Link href={`/work/${project.slug}`} className={styles.project} key={project.slug}>
              <div className={`${styles.projectVisual} ${styles[project.surface]}`}>
                <Image src={project.image} alt={project.alt} width={project.width} height={project.height} sizes={project.surface === "dashboard" ? "(max-width: 700px) 65vw, 340px" : "(max-width: 700px) 90vw, 550px"} />
              </div>
              <h3>{project.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.contact} aria-labelledby="contact-title">
        <h2 id="contact-title">Contact</h2>
        <a className={styles.email} href={`mailto:${contact.email}`}>{contact.email}</a>
      </section>
    </div>
  );
}
