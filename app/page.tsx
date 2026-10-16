import Link from "next/link";
import { SelectedWork } from "@/components/concept/SelectedWork";
import { PersonalQuestions } from "@/components/concept/PersonalQuestions";
import { ContactSection } from "@/components/concept/ContactSection";
import { home } from "@/data/home";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <section id="intro" className={styles.hero} aria-labelledby="intro-title">
        <div className={styles.introduction}>
          <h1 id="intro-title">Hi, I’m<br />Anuj Rai</h1>
        </div>
        <div className={styles.heroNote}>
          <p>{home.introduction}</p>
          <a href="#about" className={styles.textLink}>About me</a>
        </div>
      </section>
      <SelectedWork />
      <PersonalQuestions />
      <section id="about" className={styles.about} aria-labelledby="about-title">
        <h2 id="about-title">About me</h2>
        <div className={styles.aboutCopy}>
          <p>I’m studying Intelligent User Experience Design at Dhirubhai Ambani University</p>
          <p>My projects combine interface design, code and physical prototyping</p>
          <Link href="/about" className={styles.textLink}>More about me</Link>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
