import { Container } from "@/components/ui/Container";
import { H1, H2, Body } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";

const experience = [
  {
    role: "Senior Product Designer",
    company: "Design Studio",
    period: "2021 — Present",
    description: "Leading the design of complex enterprise tools and overseeing a team of 4 designers. Established the core design system used across 12 different product lines.",
  },
  {
    role: "Product Designer",
    company: "Tech Startup",
    period: "2018 — 2021",
    description: "Designed the end-to-end experience for a fintech application that scaled to 2M users. Conducted generative research to define the product roadmap.",
  },
  {
    role: "UX Designer",
    company: "Creative Agency",
    period: "2015 — 2018",
    description: "Collaborated with global brands to design e-commerce experiences and marketing campaigns. Specialized in interaction design and accessibility.",
  },
];

export default function Resume() {
  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-3xl">
          <H1 className="mb-6">Resume</H1>
          <Body className="mb-16">A summary of my professional experience and education.</Body>
          
          <div className="flex flex-col gap-12">
            {experience.map((job, i) => (
              <div key={i} className="grid md:grid-cols-4 gap-4 md:gap-8 border-t border-zinc-900 pt-8 first:border-0 first:pt-0">
                <div className="md:col-span-1">
                  <div className="text-zinc-500 text-sm font-medium">{job.period}</div>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-xl font-medium text-zinc-100 mb-1">{job.role}</h3>
                  <div className="text-zinc-400 mb-4">{job.company}</div>
                  <Body className="text-sm">{job.description}</Body>
                </div>
              </div>
            ))}
          </div>
          
          <Divider />
          
          <H2 className="mb-8">Education</H2>
          <div className="grid md:grid-cols-4 gap-4 md:gap-8 border-t border-zinc-900 pt-8">
            <div className="md:col-span-1">
              <div className="text-zinc-500 text-sm font-medium">2011 — 2015</div>
            </div>
            <div className="md:col-span-3">
              <h3 className="text-xl font-medium text-zinc-100 mb-1">Bachelor of Design</h3>
              <div className="text-zinc-400">National Institute of Design</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
