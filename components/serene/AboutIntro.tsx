import Link from "next/link";
export function AboutIntro({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section className="about-intro section-pad" id="about">
      <div className="about-mark" aria-hidden="true">
        <span>a</span>
        <div className="dot-grid" />
      </div>
      <div className="about-copy">
        <p className="eyebrow">The person behind the work</p>
        <Heading>
          I’m Anuj.
          <br />
          <span>Curiosity comes first.</span>
        </Heading>
        <p>
          My full name is Anuj Rai. I come from computer science, and I’m
          exploring how systems become things people can understand and use.
        </p>
        <p>
          I notice small details in how people behave, and patterns in everyday
          things. I often end up wondering what’s happening beneath the surface.
        </p>
        <p>
          Outside design, I can happily lose track of time talking about
          psychology, human behaviour or game theory.
        </p>
        <Link className="inline-link" href="/about/">
          A little more about me <span>↗</span>
        </Link>
      </div>
    </section>
  );
}
