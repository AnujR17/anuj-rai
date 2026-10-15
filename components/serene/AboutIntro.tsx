import Link from "next/link";
export function AboutIntro({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section className="gallery-about gallery-pad" id="about">
      <div>
        <p className="gallery-index">About me</p>
        <Heading>
          Computer science
          <br />
          to interaction design.
        </Heading>
      </div>
      <div className="gallery-about-copy">
        <p>
          I’m Anuj Rai. I’m studying Intelligent User Experience Design at
          Dhirubhai Ambani University, after a background in computer science.
        </p>
        <p>
          I like working across design and code: deciding what an interface
          should communicate, then building enough of it to explore how it
          behaves.
        </p>
        <p>
          Outside design, I’m interested in psychology, human behaviour and game
          theory.
        </p>
        <Link
          className="gallery-case-link"
          href={standalone ? "/resume/" : "/about/"}
        >
          {standalone ? "View résumé" : "More about me"} ↗
        </Link>
      </div>
    </section>
  );
}
