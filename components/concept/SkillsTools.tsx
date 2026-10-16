import { TypeText, EaseIn } from "@/components/motion/Entrance";
import styles from "./SkillsTools.module.css";

const skills = ["Interaction design", "Interface design", "Research and synthesis", "Interactive prototyping", "Frontend development", "Physical prototyping"];
const tools = ["Figma", "React", "TypeScript", "Arduino", "ESP32"];

export function SkillsTools() {
  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-title">
      <h2 id="skills-title"><TypeText text="Skills and tools" /></h2>
      <EaseIn className={styles.skills}><h3>Skills</h3><ul>{skills.map(skill => <li key={skill}>{skill}</li>)}</ul></EaseIn>
      <EaseIn className={styles.tools} delay={100}><h3>Tools I use</h3><ul>{tools.map(tool => <li key={tool}>{tool}</li>)}</ul></EaseIn>
    </section>
  );
}
