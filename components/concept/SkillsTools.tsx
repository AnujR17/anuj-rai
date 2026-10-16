import { TypeText, EaseIn } from "@/components/motion/Entrance";
import Image from "next/image";
import { toolGroups, exploringTools, type Tool } from "@/data/tools";
import styles from "./SkillsTools.module.css";

function ToolList({ tools }: { tools: Tool[] }) {
  return <ul>{tools.map(tool => <li key={tool.name}>
    <Image src={`/icons/tools/mono/${tool.icon}.svg`} alt="" width={28} height={28} />
    <span>{tool.name}</span>
  </li>)}</ul>;
}

export function SkillsTools() {
  return (
    <section id="tools" className={styles.section} aria-labelledby="tools-title">
      <h2 id="tools-title"><TypeText text="Tools I use" /></h2>
      <div className={styles.inventory}>
        {toolGroups.map(group => <EaseIn key={group.id}>
          <section className={styles.group} aria-labelledby={`tools-${group.id}`}>
            <h3 id={`tools-${group.id}`}>{group.title}</h3>
            <ToolList tools={group.tools} />
          </section>
        </EaseIn>)}
        <EaseIn className={styles.exploring}><section className={styles.group} aria-labelledby="tools-exploring">
          <h3 id="tools-exploring">Currently exploring</h3><ToolList tools={exploringTools} />
        </section></EaseIn>
      </div>
    </section>
  );
}
