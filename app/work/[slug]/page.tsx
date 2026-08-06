import { Container, Wide, Full } from "@/components/ui/Container";
import { Headline, Body, Quote, Caption } from "@/components/ui/Typography";
import { ConstructionLine, Measure } from "@/components/ui/Structure";
import { Reveal, RevealImage, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

/* ═══════════════════════════════════════════════════════════════════
   DASHBOARD: Technical & Diagrammatic
   ═══════════════════════════════════════════════════════════════════ */
function DashboardCaseStudy({ project }: { project: typeof projects[0] }) {
  return (
    <div className="pb-32">
      
      {/* 1. Quiet Opening */}
      <Container className="pt-24 md:pt-32 mb-16">
        <Reveal>
          <Link href="/work" className="inline-flex items-center text-xs text-stone-400 hover:text-stone-900 transition-colors mb-16">
            <ArrowLeft className="mr-2 w-3.5 h-3.5" /> Index
          </Link>
          <Headline className="text-4xl md:text-5xl lg:text-6xl mb-8 max-w-4xl">{project.title}</Headline>
          <Quote className="not-italic text-stone-700 max-w-3xl">{project.observation}</Quote>
        </Reveal>
      </Container>

      {/* 2. Edge-to-Edge Context */}
      <RevealImage>
        <Full className="mb-24">
          <div className="aspect-[16/9] md:aspect-[21/9] bg-stone-100 flex items-center justify-center">
            <span className="font-mono text-sm text-stone-300">[Dashboard Context Overview]</span>
          </div>
          <Container className="mt-4">
            <Caption>Dashboard environment mapping, Spiti Valley</Caption>
          </Container>
        </Full>
      </RevealImage>

      {/* 3. The Narrative (Text & Metadata) */}
      <Container className="mb-32">
        <Reveal>
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
              <Body className="text-lg leading-relaxed">{project.overview}</Body>
            </div>
            <div className="md:col-span-3 md:col-start-10">
              <div className="space-y-6 pt-2 border-t border-stone-200">
                <div>
                  <Caption className="block text-stone-400 mb-1">Led</Caption>
                  {project.roles.led.map(r => <p key={r} className="text-sm text-stone-800">{r}</p>)}
                </div>
                <div>
                  <Caption className="block text-stone-400 mb-1">Explored</Caption>
                  {project.roles.explored.map(r => <p key={r} className="text-sm text-stone-800">{r}</p>)}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* 4. Research Diagrams */}
      <Wide className="mb-32">
        <Reveal>
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <div className="aspect-[4/3] bg-stone-100 flex items-center justify-center mb-3">
                <span className="font-mono text-[10px] text-stone-300">[Visual Hierarchy Analysis]</span>
              </div>
              <Caption>Analyzing glance priority under vibration.</Caption>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <Stagger>
                {project.research.map((r, i) => (
                  <StaggerItem key={i} className="mb-8 last:mb-0 border-l border-stone-200 pl-4">
                    <Body className="text-sm">{r}</Body>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Reveal>
      </Wide>

      <Container className="mb-20">
        <ConstructionLine />
      </Container>

      {/* 5. Design Evolution (Stacked images) */}
      <Container className="mb-32">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <Headline className="text-2xl mb-6">Designing for constraints.</Headline>
            <Body>{project.design[0]}</Body>
          </div>
        </Reveal>
        
        <RevealImage>
          <div className="space-y-4">
            <div className="aspect-[21/9] bg-stone-100 flex items-center justify-center">
              <span className="font-mono text-[10px] text-stone-300">[High Contrast Iteration]</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[16/9] bg-stone-100 flex items-center justify-center">
                 <span className="font-mono text-[10px] text-stone-300">[Gesture Map]</span>
              </div>
              <div className="aspect-[16/9] bg-stone-100 flex items-center justify-center">
                 <span className="font-mono text-[10px] text-stone-300">[Type Scale Test]</span>
              </div>
            </div>
          </div>
        </RevealImage>

        <Reveal>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Body className="text-sm">{project.design[1]}</Body>
            <Body className="text-sm">{project.design[2]}</Body>
          </div>
        </Reveal>
      </Container>

      {/* 6. Outcome */}
      <section className="pt-20 pb-12 border-t border-stone-200 bg-stone-50">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <Caption className="block text-stone-400 mb-6">Outcome</Caption>
              <Quote className="text-2xl not-italic text-stone-900 mb-8">{project.outcomes[0]}</Quote>
              <Body className="text-sm">{project.outcomes[1]}</Body>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   MEDTIMER: Research & Rhythm
   ═══════════════════════════════════════════════════════════════════ */
function MedtimerCaseStudy({ project }: { project: typeof projects[0] }) {
  return (
    <div className="pb-32">
      
      {/* 1. Quiet Opening */}
      <Container className="pt-24 md:pt-32 mb-16">
        <Reveal>
          <Link href="/work" className="inline-flex items-center text-xs text-stone-400 hover:text-stone-900 transition-colors mb-16">
            <ArrowLeft className="mr-2 w-3.5 h-3.5" /> Index
          </Link>
          <Headline className="text-4xl md:text-5xl lg:text-6xl mb-8 max-w-4xl">{project.title}</Headline>
        </Reveal>
      </Container>

      {/* 2. Narrow Crop Introduction */}
      <Wide className="mb-32">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <RevealImage>
              <div className="aspect-[3/4] bg-stone-100 flex items-center justify-center mb-3">
                <span className="font-mono text-[10px] text-stone-300">[Pill Organizer Study]</span>
              </div>
              <Caption>Documenting physical routine gaps.</Caption>
            </RevealImage>
          </div>
          <div className="md:col-span-5 md:col-start-7">
            <Reveal>
              <Quote className="not-italic text-stone-800 mb-12">{project.observation}</Quote>
              <Body className="text-sm mb-12">{project.overview}</Body>
              <div className="flex gap-12 border-t border-stone-200 pt-6">
                <div>
                  <Caption className="block text-stone-400 mb-1">Led</Caption>
                  {project.roles.led.map(r => <p key={r} className="text-sm text-stone-800">{r}</p>)}
                </div>
                <div>
                  <Caption className="block text-stone-400 mb-1">Explored</Caption>
                  {project.roles.explored.map(r => <p key={r} className="text-sm text-stone-800">{r}</p>)}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Wide>

      {/* 3. Research Insights (Typographic) */}
      <section className="py-24 bg-stone-50">
        <Container>
          <Reveal>
            <Caption className="block text-stone-400 mb-12">Field Observations</Caption>
          </Reveal>
          <Stagger className="space-y-16">
            {project.research.map((r, i) => (
              <StaggerItem key={i}>
                <div className="grid md:grid-cols-12 gap-8">
                  <div className="md:col-span-8 md:col-start-3">
                    <h3 className="text-xl md:text-2xl text-stone-800 font-light leading-relaxed">{r}</h3>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* 4. Prototype Strip */}
      <section className="py-32">
        <Container className="mb-12">
          <Reveal>
            <Headline className="text-2xl mb-6">Anchoring to routine.</Headline>
            <Body className="max-w-2xl">{project.design[0]}</Body>
          </Reveal>
        </Container>
        
        <Wide>
          <RevealImage>
            {/* Scrollable strip of varying sizes */}
            <div className="flex gap-4 overflow-x-auto pb-8 snap-x">
              <div className="shrink-0 w-[80vw] md:w-[600px] snap-center">
                <div className="aspect-[16/10] bg-stone-100 flex items-center justify-center mb-3">
                  <span className="font-mono text-[10px] text-stone-300">[Paper Test in Kitchen]</span>
                </div>
                <Caption>Testing physical context before digital.</Caption>
              </div>
              <div className="shrink-0 w-[60vw] md:w-[400px] snap-center">
                <div className="aspect-[4/5] bg-stone-100 flex items-center justify-center mb-3">
                  <span className="font-mono text-[10px] text-stone-300">[Digital State 1]</span>
                </div>
                <Caption>Morning state.</Caption>
              </div>
              <div className="shrink-0 w-[60vw] md:w-[400px] snap-center">
                <div className="aspect-[4/5] bg-stone-100 flex items-center justify-center mb-3">
                  <span className="font-mono text-[10px] text-stone-300">[Digital State 2]</span>
                </div>
                <Caption>Evening state.</Caption>
              </div>
            </div>
          </RevealImage>
        </Wide>

        <Container className="mt-12">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
              <Body className="text-sm">{project.design[1]}</Body>
              <Body className="text-sm">{project.design[2]}</Body>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 5. Outcome */}
      <Container>
        <ConstructionLine className="mb-20" />
        <Reveal>
          <div className="max-w-3xl">
            <Quote className="text-2xl not-italic text-stone-900 mb-8">{project.outcomes[1]}</Quote>
            <Body className="text-sm">{project.outcomes[0]}</Body>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}


export default async function CaseStudy({ params }: Props) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  if (project.slug === "two-wheeler-dashboard") {
    return <DashboardCaseStudy project={project} />;
  }

  return <MedtimerCaseStudy project={project} />;
}
