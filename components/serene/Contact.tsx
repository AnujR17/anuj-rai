import Link from "next/link";
export function Contact({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section className="contact-section section-pad" id="contact">
      <p className="eyebrow">Contact</p>
      <Heading>
        Get in touch<span>.</span>
      </Heading>
      <div className="contact-bottom">
        <a className="contact-email" href="mailto:anujrai1701@gmail.com">
          anujrai1701@gmail.com <span>↗</span>
        </a>
        <div>
          <Link href="/resume/">View résumé ↗</Link>
          <a href="https://github.com/AnujR17">GitHub ↗</a>
        </div>
      </div>
    </section>
  );
}
