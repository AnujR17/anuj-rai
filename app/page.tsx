import Link from "next/link";
import { SelectedWork } from "@/components/concept/SelectedWork";
import { PersonalQuestions } from "@/components/concept/PersonalQuestions";
import { ContactSection } from "@/components/concept/ContactSection";
import { TypeText, EaseIn } from "@/components/motion/Entrance";
import { home } from "@/data/home";
import { about } from "@/data/about";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <section id="intro" className={styles.hero} aria-labelledby="intro-title">
        <div className={styles.introduction}>
          <p className={styles.hello}><TypeText text="Hello," pace={55} /></p>
          <h1 id="intro-title">
            <span className={styles.line}><TypeText text="People, patterns," delay={320} pace={35} /></span>
            <span className={styles.line}><TypeText text="and the " delay={810} pace={35} /><TypeText text="little things." className={styles.little} delay={1020} pace={38} /></span>
          </h1>
          <EaseIn className={styles.heroNote} delay={1500}>
            <p>{home.introduction}</p>
            <p>{home.introductionDetail}</p>
          </EaseIn>
        </div>
      </section>
      <SelectedWork />
      <PersonalQuestions />
      <section id="about" className={styles.about} aria-labelledby="about-title">
        <EaseIn className={styles.aboutEducation}>
          <p>{about.education}</p>
        </EaseIn>
        <EaseIn className={styles.aboutCopy} delay={100}>
          <p>{about.direction}</p>
          <p>{about.approach}</p>
        </EaseIn>
        <div className={styles.aboutEnding}>
          <h2 id="about-title"><TypeText text="About me" /></h2>
          <Link href="/about" className={styles.textLink}>More about me</Link>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
