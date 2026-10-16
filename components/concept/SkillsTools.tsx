import { TypeText } from "@/components/motion/Entrance";
import { ToolInventory } from "./ToolInventory";
import styles from "./SkillsTools.module.css";

export function SkillsTools() {
  return (
    <section id="tools" className={styles.section} aria-labelledby="tools-title">
      <h2 id="tools-title"><TypeText text="Tools I use" /></h2>
      <ToolInventory />
    </section>
  );
}
