import { Container, Wide } from "@/components/ui/Container";
import { Display, Headline, Body, Caption, Quote } from "@/components/ui/Typography";
import { ConstructionLine, Measure } from "@/components/ui/Structure";
import { Reveal, RevealImage, Stagger, StaggerItem } from "@/components/ui/Reveal";

export default function About() {
  return (
    <div className="pt-24 md:pt-40 pb-32">
      
      {/* ──────────────────────────────────────────────────────────
          BELIEFS & CURIOSITY
          Opening with approach rather than qualifications
          ────────────────────────────────────────────────────────── */}
      <section className="mb-40">
        <Container>
          <Reveal>
            <Display className="max-w-4xl mb-16">
              I am interested in the friction between designed systems and human reality.
            </Display>
          </Reveal>
          
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-8 md:col-start-3">
              <Stagger stagger={0.2}>
                <StaggerItem>
                  <Body className="text-xl md:text-2xl text-stone-700 leading-relaxed mb-8">
                    When an interface fails in the real world, the problem usually isn't visual. It's situational. A button is too small for a hand wearing a glove. A notification arrives during a moment of intense focus. A prescribed flow contradicts a deeply ingrained daily habit.
                  </Body>
                </StaggerItem>
                <StaggerItem>
                  <Body className="text-lg mb-8">
                    I spend my time trying to understand these situational realities before I touch a design tool. My work involves sitting in living rooms, observing people in transit, and asking questions that seem obvious until you realize nobody has asked them.
                  </Body>
                </StaggerItem>
                <StaggerItem>
                  <Body className="text-lg">
                    I don't believe in handing off wireframes and hoping for the best. If I observe the problem and design the solution, I also write the frontend code to ensure the original insight actually makes it to the user.
                  </Body>
                </StaggerItem>
              </Stagger>
            </div>
          </div>
        </Container>
      </section>

      {/* ──────────────────────────────────────────────────────────
          EDITORIAL PORTRAIT
          Breaking the grid, large overlapping image
          ────────────────────────────────────────────────────────── */}
      <section className="mb-40">
        <Wide>
          <RevealImage>
            <div className="relative aspect-[16/9] md:aspect-[21/9] bg-stone-100 flex items-center justify-center overflow-hidden">
              <span className="font-mono text-sm text-stone-300">[Large Environmental Portrait / Workspace]</span>
              <Caption className="absolute bottom-4 right-6 text-stone-400">Gandhinagar, 2025</Caption>
            </div>
          </RevealImage>
        </Wide>
      </section>

      {/* ──────────────────────────────────────────────────────────
          OBSERVATIONS (Replacing generic skills)
          ────────────────────────────────────────────────────────── */}
      <section className="mb-40">
        <Container>
          <Reveal>
            <Headline className="mb-16">How I work</Headline>
          </Reveal>
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <Reveal delay={0.1}>
                <h3 className="text-lg font-medium text-stone-900 mb-4">Observation</h3>
                <Body className="text-sm">
                  I favor in-situ research over lab testing. I want to see how the product behaves when the user is tired, distracted, or carrying groceries. I rely on mixed-method research, contextual inquiry, and heavy documentation.
                </Body>
              </Reveal>
            </div>
            <div className="md:col-span-4">
              <Reveal delay={0.2}>
                <h3 className="text-lg font-medium text-stone-900 mb-4">Reduction</h3>
                <Body className="text-sm">
                  Most systems have too many features. I spend a significant amount of the design phase arguing for what can be removed. I build interaction models, map states, and prototype extensively to find the simplest path.
                </Body>
              </Reveal>
            </div>
            <div className="md:col-span-4">
              <Reveal delay={0.3}>
                <h3 className="text-lg font-medium text-stone-900 mb-4">Execution</h3>
                <Body className="text-sm">
                  I build what I design. I write React, structure Next.js applications, and craft interfaces with Tailwind and Framer Motion. The code is the final design artifact.
                </Body>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <ConstructionLine />

      {/* ──────────────────────────────────────────────────────────
          BACKGROUND (Quietly placed at the end)
          ────────────────────────────────────────────────────────── */}
      <section className="pt-24">
        <Container>
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="text-sm font-medium text-stone-900 mb-1">Academic Background</p>
                <Caption className="block text-stone-400 mb-6">Dhirubhai Ambani University</Caption>
                <Body className="text-sm">
                  Currently pursuing an M.Des in Intelligent User Experience Design (2025), building on a foundational undergraduate degree from ITM Vocational University (2024).
                </Body>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}
