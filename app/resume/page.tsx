import { Container } from "@/components/ui/Container";
import { Display, Body, Caption } from "@/components/ui/Typography";
import { ConstructionLine, Measure } from "@/components/ui/Structure";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const experience = [
  {
    role: "Intern",
    company: "DataSync Systems",
    period: "Sept 2024 to Feb 2025",
    location: "Vadodara, Gujarat",
    description: "Designed a responsive landing page for a hospital management system. Focused on establishing clear visual hierarchy for complex data tables and aligning interaction patterns with the existing brand system.",
  },
  {
    role: "Intern",
    company: "Rishabh Software",
    period: "Jan 2024 to June 2024",
    location: "Vadodara, Gujarat",
    description: "Built responsive frontend interfaces using React and Tailwind. Translated product requirements into logic, integrated APIs, and established reusable UI patterns across the application.",
  },
];

const education = [
  {
    degree: "M.Des, Intelligent User Experience Design",
    institution: "Dhirubhai Ambani University",
    period: "2025 to Present",
    location: "Gandhinagar, Gujarat",
  },
  {
    degree: "Undergraduate Degree",
    institution: "ITM Vocational University",
    period: "2020 to 2024",
    location: "Vadodara, Gujarat",
  },
];

export default function Resume() {
  return (
    <div className="pt-24 md:pt-40 pb-32">
      <Container>
        <Reveal>
          <Display className="mb-24">Experience</Display>
        </Reveal>

        <Stagger className="flex flex-col gap-24 mb-32">
          {experience.map((job, i) => (
            <StaggerItem key={i} className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-3">
                <Caption className="block mb-1">{job.period}</Caption>
                <Caption className="block text-stone-300">{job.location}</Caption>
              </div>
              <div className="md:col-span-6">
                <h3 className="text-xl font-medium text-stone-900 mb-1">{job.role}</h3>
                <p className="text-stone-400 mb-6 text-sm">{job.company}</p>
                <Body className="text-sm">{job.description}</Body>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <ConstructionLine className="mb-24" />

        <Reveal>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-stone-900 mb-16">Education</h2>
        </Reveal>
        <Stagger className="flex flex-col gap-16">
          {education.map((edu, i) => (
            <StaggerItem key={i} className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-3">
                <Caption className="block mb-1">{edu.period}</Caption>
                <Caption className="block text-stone-300">{edu.location}</Caption>
              </div>
              <div className="md:col-span-6">
                <h3 className="text-lg font-medium text-stone-900 mb-1">{edu.degree}</h3>
                <p className="text-stone-400 text-sm">{edu.institution}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <Measure text="updated 2025" className="mt-32 opacity-50" />
        </Reveal>
      </Container>
    </div>
  );
}
