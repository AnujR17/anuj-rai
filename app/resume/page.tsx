import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ThreadMark } from "@/components/portfolio/ThreadStudy";
import styles from "../editorial.module.css";
export const metadata: Metadata = { title: "Resume — Anuj Rai" };

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
  return <article className={styles.page}>
    <header className={styles.header}><div><p className={styles.label}>Background &amp; experience</p><h1>Design, code,<br />and continuing to learn.</h1></div><ThreadMark kind="turn" className={styles.mark} /></header>
    <section className={styles.section}><h2>Experience</h2><div>{experience.map(job=><section key={job.company} className="resume-position"><h3>{job.role} · {job.company}</h3><p className={styles.period}>{job.period} · {job.location}</p><p>{job.description}</p></section>)}</div></section>
    <section className={styles.section}><h2>Education</h2><div>{education.map(edu=><section key={edu.institution} className="resume-position"><h3>{edu.degree}</h3><p>{edu.institution}</p><p className={styles.period}>{edu.period} · {edu.location}</p></section>)}</div></section>
    <Link className={styles.link} href="/contact">Get in touch<ArrowRight size={15} aria-hidden="true" /></Link>
  </article>;
}
