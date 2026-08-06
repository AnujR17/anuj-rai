import { Container, Wide, Full } from "@/components/ui/Container";
import { Display, Headline, Body, Quote } from "@/components/ui/Typography";
import { ConstructionLine } from "@/components/ui/Structure";
import { Reveal, RevealImage } from "@/components/ui/Reveal";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function Work() {
  const medtimer = projects[0];
  const dashboard = projects[1];

  return (
    <div className="pt-24 md:pt-40 pb-32">
      <Container className="mb-32">
        <Reveal>
          <Display className="max-w-3xl mb-8">Selected Work.</Display>
          <Body className="max-w-2xl text-stone-600">
            A collection of digital products and interfaces I have designed and built.
          </Body>
        </Reveal>
      </Container>

      {/* ──────────────────────────────────────────────────────────
          PROJECT 1: Immersive image, offset text, leading with observation
          ────────────────────────────────────────────────────────── */}
      <section className="mb-40">
        <Link href={`/work/${medtimer.slug}`} className="block group">
          <Wide className="mb-12">
            <RevealImage>
              <div className="aspect-[16/9] md:aspect-[21/9] bg-stone-100 relative flex items-center justify-center overflow-hidden">
                <span className="font-mono text-sm text-stone-300">[Medtimer Study Overview]</span>
              </div>
            </RevealImage>
          </Wide>
          
          <Container>
            <Reveal>
              <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-5">
                  <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-stone-900 mb-4 group-hover:text-stone-500 transition-colors">
                    {medtimer.title}
                  </h2>
                  <p className="text-sm text-stone-400 mb-2">
                    {medtimer.type} · {medtimer.year}
                  </p>
                </div>
                <div className="md:col-span-6 md:col-start-7">
                  <Quote className="text-lg md:text-xl not-italic mb-6 text-stone-800">
                    "{medtimer.observation}"
                  </Quote>
                  <Body className="text-sm">{medtimer.summary}</Body>
                </div>
              </div>
            </Reveal>
          </Container>
        </Link>
      </section>

      {/* Visual Break */}
      <div className="py-12 flex justify-center">
        <ConstructionLine className="max-w-[100px]" />
      </div>

      {/* ──────────────────────────────────────────────────────────
          PROJECT 2: Text-led, overlapping detail images
          ────────────────────────────────────────────────────────── */}
      <section className="py-24">
        <Link href={`/work/${dashboard.slug}`} className="block group">
          <Container>
            <div className="grid md:grid-cols-12 gap-12 items-center">
              
              {/* Text Content */}
              <div className="md:col-span-5 order-2 md:order-1">
                <Reveal>
                  <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-stone-900 mb-6 group-hover:text-stone-500 transition-colors">
                    {dashboard.title}
                  </h2>
                  <Body className="mb-6 text-stone-700">
                    {dashboard.observation}
                  </Body>
                  <Body className="text-sm mb-8 text-stone-500">
                    {dashboard.summary}
                  </Body>
                  <p className="text-sm text-stone-400">
                    {dashboard.type} · {dashboard.year}
                  </p>
                </Reveal>
              </div>

              {/* Image Collage */}
              <div className="md:col-span-6 md:col-start-7 order-1 md:order-2">
                <RevealImage>
                  <div className="relative w-full aspect-square">
                    {/* Back image */}
                    <div className="absolute top-0 right-0 w-4/5 aspect-[4/3] bg-stone-100 flex items-center justify-center">
                      <span className="font-mono text-[10px] text-stone-300">[Field test]</span>
                    </div>
                    {/* Front overlapping image */}
                    <div className="absolute bottom-0 left-0 w-3/5 aspect-square bg-stone-200 border-4 border-[#fafaf9] flex items-center justify-center">
                      <span className="font-mono text-[10px] text-stone-400">[Interface detail]</span>
                    </div>
                  </div>
                </RevealImage>
              </div>

            </div>
          </Container>
        </Link>
      </section>

    </div>
  );
}
