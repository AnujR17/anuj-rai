import { TypeText, EaseIn } from "@/components/motion/Entrance";
import Image from "next/image";
import styles from "./SkillsTools.module.css";

const tools = [
  { name: "Figma", icon: "figma" },
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Arduino", icon: "arduino" },
  { name: "ESP32", icon: "espressif" },
];

export function SkillsTools() {
  return (
    <section id="tools" className={styles.section} aria-labelledby="tools-title">
      <h2 id="tools-title"><TypeText text="Tools I use" /></h2>
      <EaseIn className={styles.tools}><ul>{tools.map(tool => <li key={tool.name}>
        <Image src={`/icons/tools/${tool.icon}.svg`} alt="" width={52} height={52} />
        <span>{tool.name}</span>
      </li>)}</ul></EaseIn>
    </section>
  );
}
