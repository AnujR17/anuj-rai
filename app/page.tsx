import Link from "next/link";
import { SelectedWork } from "@/components/concept/SelectedWork";
import { PersonalQuestions } from "@/components/concept/PersonalQuestions";
import { ContactSection } from "@/components/concept/ContactSection";
import { TypeText, EaseIn } from "@/components/motion/Entrance";
import { home } from "@/data/home";
import { HeroSequence } from "@/components/concept/HeroSequence";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <section id="intro" className={styles.hero} aria-labelledby="intro-title">
        <div className={styles.introduction}>
          <HeroSequence>
            <p>{home.introduction}</p>
            <p>{home.introductionDetail}</p>
          </HeroSequence>
        </div>
      </section>
      <SelectedWork />
      <PersonalQuestions />
      <section id="about" className={styles.about} aria-labelledby="about-title">
        <EaseIn className={styles.aboutEducation}><p>{home.about[0]}</p></EaseIn>
        <EaseIn className={styles.aboutCopy} delay={100}>
          {home.about.slice(1).map(paragraph => <p key={paragraph}>{paragraph}</p>)}
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
