import { TypeText, EaseIn } from "@/components/motion/Entrance";
import Image from "next/image";
import { toolGroups } from "@/data/tools";
import styles from "./SkillsTools.module.css";

export function SkillsTools() {
  return (
    <section id="tools" className={styles.section} aria-labelledby="tools-title">
      <h2 id="tools-title"><TypeText text="Tools I use" /></h2>
      <div className={styles.inventory}>
        {toolGroups.map(group => <EaseIn key={group.id} className={group.wide ? styles.wide : ""}>
          <section className={styles.group} aria-labelledby={`tools-${group.id}`}>
            <h3 id={`tools-${group.id}`}>{group.title}</h3>
            <ul>{group.tools.map(tool => <li key={tool.name}>
              <Image src={`/icons/tools/mono/${tool.icon}.svg`} alt="" width={28} height={28} />
              <span>{tool.name}</span>
            </li>)}</ul>
          </section>
        </EaseIn>)}
        <EaseIn className={styles.wide}><section className={styles.exploring} aria-labelledby="tools-exploring">
          <h3 id="tools-exploring">Currently exploring</h3><p>AR and VR</p>
        </section></EaseIn>
      </div>
    </section>
  );
}
