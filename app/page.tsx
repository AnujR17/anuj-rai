import { Container, Wide, Full } from "@/components/ui/Container";
import { Display, Headline, Body, Caption, Quote } from "@/components/ui/Typography";
import { ConstructionLine, Measure } from "@/components/ui/Structure";
import { Reveal, RevealImage, Stagger, StaggerItem } from "@/components/ui/Reveal";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function Home() {
  const medtimer = projects.find(p => p.slug === "medtimer")!;
  const dashboard = projects.find(p => p.slug === "two-wheeler-dashboard")!;

  return (
    <div>
      {/* ──────────────────────────────────────────────────────────
          1. OPENING STATEMENT
          Typography-led. Breathing.
          ────────────────────────────────────────────────────────── */}
      <section className="min-h-[75vh] flex flex-col justify-end pb-20 pt-32">
        <Container>
          <Reveal>
            <Caption className="block mb-10 text-stone-300">Anuj Rai, 2025</Caption>
          </Reveal>
          <Stagger className="max-w-4xl">
            <StaggerItem>
              <Display className="mb-2">I spend more time</Display>
            </StaggerItem>
            <StaggerItem>
              <Display className="text-stone-400 mb-2">with the problem</Display>
            </StaggerItem>
            <StaggerItem>
              <Display>than most people spend</Display>
            </StaggerItem>
            <StaggerItem>
              <Display className="text-stone-400">on the solution.</Display>
            </StaggerItem>
          </Stagger>
        </Container>
      </section>

      {/* ──────────────────────────────────────────────────────────
          2. EVIDENCE STRIP
          Image-led. Dense.
          ────────────────────────────────────────────────────────── */}
      <section className="py-16">
        <Wide>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4" stagger={0.15}>
            {[
              { label: "Field notes, Vadodara", aspect: "aspect-[4/3]" },
              { label: "Glare analysis, Spiti Valley", aspect: "aspect-[3/4]" },
              { label: "Routine mapping", aspect: "aspect-square" },
              { label: "Interaction constraint test", aspect: "aspect-[4/3]" },
            ].map((item, i) => (
              <StaggerItem key={i} className="flex flex-col gap-3">
                <RevealImage>
                  <div className={`${item.aspect} bg-stone-100 relative flex items-center justify-center overflow-hidden`}>
                    <span className="font-mono text-[10px] text-stone-300">[Artifact]</span>
                  </div>
                </RevealImage>
                <Caption className="block px-1">{item.label}</Caption>
              </StaggerItem>
            ))}
          </Stagger>
        </Wide>
      </section>

      {/* ──────────────────────────────────────────────────────────
          3. PHILOSOPHY PAUSE
          Quiet. Typographic.
          ────────────────────────────────────────────────────────── */}
      <section className="py-40 md:py-56">
        <Container className="text-center">
          <Reveal>
            <Quote className="not-italic max-w-3xl mx-auto text-stone-900">
              "The interface must adapt to the physical constraints of the user, not the other way around."
            </Quote>
          </Reveal>
          <Reveal delay={0.2}>
            <Measure text="guiding principle" className="max-w-xs mx-auto mt-16 opacity-50" />
          </Reveal>
        </Container>
      </section>

      {/* ──────────────────────────────────────────────────────────
          4. MEDTIMER
          Cinematic. Full-bleed.
          ────────────────────────────────────────────────────────── */}
      <section className="relative">
        <Link href={`/work/${medtimer.slug}`} className="block group">
          <RevealImage>
            <Full>
              <div className="aspect-[21/9] md:aspect-[2.5/1] bg-stone-100 relative flex items-center justify-center overflow-hidden">
                <span className="font-mono text-sm text-stone-300">[Medtimer Interface Detail]</span>
              </div>
            </Full>
          </RevealImage>

          <Container className="py-16 md:py-24">
            <Reveal>
              <div className="grid md:grid-cols-12 gap-12">
                <div className="md:col-span-6 md:col-start-2">
                  <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-stone-900 mb-6 group-hover:text-stone-500 transition-colors">
                    {medtimer.title}
                  </h3>
                  <Quote className="text-xl md:text-2xl not-italic mb-6">
                    {medtimer.observation}
                  </Quote>
                </div>
                <div className="md:col-span-4 flex flex-col justify-end pt-8 md:pt-0">
                  <Body className="text-sm md:text-base mb-6">{medtimer.summary}</Body>
                  <div className="flex items-center gap-2 text-sm text-stone-900 group-hover:text-stone-400 transition-colors">
                    Review case study <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </Link>
      </section>

      {/* ──────────────────────────────────────────────────────────
          5. VISUAL SILENCE
          A moment to breathe between projects.
          ────────────────────────────────────────────────────────── */}
      <div className="py-20 md:py-32 flex justify-center">
        <ConstructionLine className="max-w-[200px]" />
      </div>

      {/* ──────────────────────────────────────────────────────────
          6. TWO-WHEELER DASHBOARD
          Diagrammatic. Asymmetric.
          ────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <Link href={`/work/${dashboard.slug}`} className="block group">
          <Wide>
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-5 md:col-start-2 order-2 md:order-1">
                <Reveal>
                  <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-stone-900 mb-6 group-hover:text-stone-500 transition-colors">
                    {dashboard.title}
                  </h3>
                  <Body className="mb-8">{dashboard.observation}</Body>
                  <Body className="text-sm md:text-base mb-8 text-stone-400">{dashboard.summary}</Body>
                  <div className="flex items-center gap-2 text-sm text-stone-900 group-hover:text-stone-400 transition-colors">
                    Review case study <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Reveal>
              </div>

              <div className="md:col-span-5 order-1 md:order-2">
                <RevealImage>
                  <div className="relative">
                    <div className="aspect-[4/5] bg-stone-100 flex items-center justify-center">
                      <span className="font-mono text-sm text-stone-300">[Dashboard Layout Analysis]</span>
                    </div>
                    {/* Floating detail crop */}
                    <div className="absolute -bottom-8 -left-8 w-1/2 aspect-square bg-stone-200 border-4 border-[#fafaf9] flex items-center justify-center hidden md:flex">
                      <span className="font-mono text-[10px] text-stone-400">[Glare test]</span>
                    </div>
                  </div>
                </RevealImage>
              </div>
            </div>
          </Wide>
        </Link>
      </section>

      {/* ──────────────────────────────────────────────────────────
          7. ABOUT / APPROACH
          Personal, breaking the grid.
          ────────────────────────────────────────────────────────── */}
      <section className="py-32 md:py-48">
        <Container>
          <Reveal>
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-8">
                <Headline className="text-3xl md:text-5xl mb-12">
                  I study how systems fail in the physical world before trying to fix them on a screen.
                </Headline>
                <Body className="mb-8 max-w-xl text-stone-600">
                  A beautiful interface is useless if it requires two hands while the user is holding a child, or if the contrast fails in direct sunlight, or if it interrupts a sacred routine. 
                </Body>
                <Body className="mb-12 max-w-xl text-stone-600">
                  I spend my time uncovering these physical constraints through observation, and then I write the code to ensure the solution actually survives being built.
                </Body>
                <Link href="/about" className="inline-flex items-center gap-2 text-stone-900 hover:text-stone-400 transition-colors border-b border-stone-300 hover:border-stone-400 pb-1 text-sm">
                  Read full approach <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <ConstructionLine />

      {/* ──────────────────────────────────────────────────────────
          8. CONTACT
          Quiet close.
          ────────────────────────────────────────────────────────── */}
      <section className="py-24">
        <Container>
          <Reveal>
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-5">
                <p className="text-2xl font-medium text-stone-900 mb-4">
                  Let's discuss a problem.
                </p>
                <Body className="text-sm">
                  Available for research-driven roles or conversations about designing for reality.
                </Body>
              </div>

              <div className="md:col-span-3 md:col-start-8">
                <p className="text-sm text-stone-400 mb-2">Email</p>
                <a href="mailto:anujrai2025@example.com" className="text-sm font-medium text-stone-900 hover:text-stone-400 transition-colors break-all">
                  anujrai2025@example.com
                </a>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm text-stone-400 mb-2">Network</p>
                <div className="flex flex-col gap-1">
                  <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-stone-900 hover:text-stone-400 transition-colors">
                    LinkedIn <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-stone-900 hover:text-stone-400 transition-colors">
                    GitHub <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

    </div>
  );
}
