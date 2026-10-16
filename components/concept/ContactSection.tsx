import { Mail } from "lucide-react";
import Link from "next/link";
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
        <EaseIn className={styles.copy}><p>Hiring an interaction designer?</p><p>Tell me about the role and what you&apos;re building. I&apos;d love to hear about it.</p><a className={styles.cta} href={`mailto:${contact.email}`}>Get in touch →</a></EaseIn>
      </div>
      <div className={styles.utilities}>
        <p>© {new Date().getFullYear()} Anuj Rai</p>
        <nav aria-label="Footer links"><Link href="/about">About</Link><Link href="/contact">Contact</Link><a href={contact.github}>GitHub</a></nav>
      </div>
    </section>
  );
}
