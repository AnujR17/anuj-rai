import Link from "next/link";
import { about } from "@/data/about";
import { TypeText, EaseIn } from "@/components/motion/Entrance";
import { ContactSection } from "@/components/concept/ContactSection";
import styles from "./page.module.css";

export default function About() {
  return (
    <>
      <article className={styles.about} aria-labelledby="about-page-title">
        <EaseIn className={styles.introduction}>
          <p className={styles.name}>I’m Anuj Rai</p>
          <p className={styles.direction}>{about.direction}</p>
        </EaseIn>
        <EaseIn className={styles.education} delay={100}>
          <p>{about.education}</p>
          <p>{about.background}</p>
          <Link href="/resume" className={styles.link}>View resume</Link>
        </EaseIn>
        <EaseIn className={styles.approach}>
          <p>{about.approach}</p>
        </EaseIn>
        <EaseIn className={styles.making} delay={100}>
          <p>{about.making}</p>
          <p>{about.makingGoal}</p>
        </EaseIn>
        <EaseIn className={styles.sports}>
          <p>{about.sports}</p>
          <p className={styles.barca}>Visca Barça</p>
        </EaseIn>
        <div className={styles.ending}>
          <h1 id="about-page-title"><TypeText text="About me" pace={48} /></h1>
          <Link href="/work" className={styles.link}>Selected work</Link>
        </div>
      </article>
      <ContactSection />
    </>
  );
}
