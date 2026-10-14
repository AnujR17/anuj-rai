import { PrintResume } from "@/components/serene/PrintResume";
const experience = [
  {
    role: "Intern",
    company: "DataSync Systems",
    period: "Sept 2024 to Feb 2025",
    location: "Vadodara, Gujarat",
    description:
      "Designed a responsive landing page for a hospital management system. Focused on establishing clear visual hierarchy for complex data tables and aligning interaction patterns with the existing brand system.",
  },
  {
    role: "Intern",
    company: "Rishabh Software",
    period: "Jan 2024 to June 2024",
    location: "Vadodara, Gujarat",
    description:
      "Built responsive frontend interfaces using React and Tailwind. Translated product requirements into logic, integrated APIs, and established reusable UI patterns across the application.",
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
    <article className="case-shell">
      <header className="case-heading">
        <p className="eyebrow">Résumé</p>
        <h1>Experience & education.</h1>
        <p>Computer science, interaction design and working prototypes.</p>
        <PrintResume />
      </header>
      <h2 style={{ fontSize: 32, marginBottom: 35 }}>Experience</h2>
      {experience.map((job) => (
        <section className="case-section" key={job.company}>
          <h2>{job.company}</h2>
          <div>
            <p>
              {job.role} · {job.period}
              <br />
              {job.location}
            </p>
            <p>{job.description}</p>
          </div>
        </section>
      ))}
      <h2 style={{ fontSize: 32, margin: "55px 0 35px" }}>Education</h2>
      {education.map((edu) => (
        <section className="case-section" key={edu.institution}>
          <h2>{edu.institution}</h2>
          <div>
            <p>{edu.degree}</p>
            <p>
              {edu.period} · {edu.location}
            </p>
          </div>
        </section>
      ))}
      <a className="inline-link" href="mailto:anujrai1701@gmail.com">
        anujrai1701@gmail.com ↗
      </a>
    </article>
  );
}
