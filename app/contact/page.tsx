import { contact } from "@/data/contact";

export default function Contact() {
  return (
    <article className="case-shell">
      <header className="case-heading"><h1>Contact</h1></header>
      <section className="case-section">
        <h2>Email</h2>
        <div><a href={`mailto:${contact.email}`} className="portfolio-link">{contact.email}</a></div>
      </section>
      <section className="case-section">
        <h2>GitHub</h2>
        <div><a href={contact.github} className="portfolio-link">AnujR17</a></div>
      </section>
    </article>
  );
}
