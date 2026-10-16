import { Mail } from "lucide-react";
import { contact } from "@/data/contact";
import { TypeText, EaseIn } from "@/components/motion/Entrance";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.context}>
        <nav className={styles.socials} aria-label="Social and email links">
          <a href={contact.github} aria-label="GitHub profile"><span className={styles.github} aria-hidden="true" /></a>
          <a href={`mailto:${contact.email}`} aria-label="Email Anuj"><Mail size={23} strokeWidth={1.5} aria-hidden="true" /></a>
        </nav>
        <EaseIn className={styles.emailContext}><a className={styles.email} href={`mailto:${contact.email}`}>{contact.email}</a></EaseIn>
      </div>
      <div className={styles.ending}>
        <h2 id="contact-title"><a href={`mailto:${contact.email}`}><TypeText text="Contact me" pace={48} /></a></h2>
        <EaseIn className={styles.copy}><p>Hiring an interaction designer?<br />Send me the role and what you’re building</p></EaseIn>
      </div>
    </section>
  );
}
