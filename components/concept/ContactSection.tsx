import { Mail } from "lucide-react";
import { contact } from "@/data/contact";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <nav className={styles.socials} aria-label="Social and email links">
        <a href={contact.github} aria-label="GitHub profile"><span className={styles.github} aria-hidden="true" /></a>
        <a href={`mailto:${contact.email}`} aria-label="Email Anuj"><Mail size={23} strokeWidth={1.5} aria-hidden="true" /></a>
      </nav>
      <div className={styles.main}>
        <h2 id="contact-title"><a href={`mailto:${contact.email}`}>Contact<br />me</a></h2>
        <a className={styles.email} href={`mailto:${contact.email}`}>{contact.email}</a>
      </div>
      <p className={styles.copy}>A product to design<br />A prototype to build<br />Let’s talk about it</p>
    </section>
  );
}
