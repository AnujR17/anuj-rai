import { Container } from "@/components/ui/Container";
import { Headline, Body } from "@/components/ui/Typography";
import { Measure } from "@/components/ui/Structure";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";
import { contact } from "@/data/contact";

export default function Contact() {
  return (
    <div className="pt-24 md:pt-40 pb-32">
      <Container>
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-6">
            <Reveal>
              <Headline className="text-3xl md:text-5xl lg:text-6xl mb-8">Let&apos;s discuss a problem.</Headline>
              <Body className="text-stone-600">
                I am currently open to research-driven product roles, design collaborations, or honest conversations about how systems shape behavior.
              </Body>
            </Reveal>
          </div>

          <div className="md:col-span-3 md:col-start-9 pt-2">
            <Stagger>
              <StaggerItem className="mb-12">
                <p className="text-sm font-medium text-stone-900 mb-2">Email</p>
                <a href={`mailto:${contact.email}`} className="text-sm font-medium text-stone-900 hover:text-stone-400 transition-colors break-all">
                  {contact.email}
                </a>
              </StaggerItem>
              <StaggerItem>
                <p className="text-sm font-medium text-stone-900 mb-2">Network</p>
                <div className="flex flex-col gap-2">
                  <a href={contact.github} className="inline-flex items-center gap-1 text-sm font-medium text-stone-900 hover:text-stone-400 transition-colors">
                    GitHub <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
        <Reveal delay={0.2}>
          <Measure className="mt-32 opacity-50" />
        </Reveal>
      </Container>
    </div>
  );
}
