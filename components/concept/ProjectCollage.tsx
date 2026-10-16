"use client";

import { useRef, useState, type CSSProperties, type ReactNode, type KeyboardEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { TypeText } from "@/components/motion/Entrance";
import styles from "./ProjectCollage.module.css";

type CollageItem = { slug: string; title: string; descriptor?: string; description: string; visual: ReactNode };

export function ProjectCollage({ items, id = "work", embedded = false }: { items: CollageItem[]; id?: string; embedded?: boolean }) {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const copy = (item: CollageItem, index: number) => (
    <motion.div layout={!reducedMotion ? "position" : false} id={`${id}-${item.slug}-copy`} data-selected={index === active} className={styles.projectCopy} data-project-copy>
      {item.descriptor && <p className={styles.descriptor}>{item.descriptor}</p>}
      <p className={styles.description}>{item.description}</p>
      {embedded && <Link href={`/work/${item.slug}`} className={styles.caseLink}>View case study</Link>}
    </motion.div>
  );
  const keyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus({ preventScroll: true });
  };
  return (
    <section id={id} className={`${styles.collage} ${embedded ? styles.embedded : ""}`} aria-labelledby={`${id}-title`} data-collage data-active-project={items[active].slug}>
      <h2 id={`${id}-title`} className={styles.heading}><TypeText text="Selected work" /></h2>
      <div className={styles.gallery}>
        <div className={styles.frames} style={{ gridTemplateColumns: items.map((_, index) => index === active ? "2fr" : ".65fr").join(" ") }}>
          {items.map((item, index) => {
            const selected = index === active;
            return <motion.article layout={!reducedMotion} transition={{ layout: { duration: reducedMotion ? 0 : .65, ease: [.22, 1, .36, 1] } }} key={item.slug} className={styles.project} data-selected={selected} data-project={item.slug} style={{ "--offset": `${index % 2 === 0 ? 24 : 64}px` } as CSSProperties} onPointerEnter={event => { if (event.pointerType === "mouse") setActive(index); }}>
              <motion.div layout={!reducedMotion} animate={{ rotate: selected ? 0 : index % 2 === 0 ? -1.8 : 1.8 }} transition={{ duration: reducedMotion ? 0 : .65, ease: [.22, 1, .36, 1] }} style={{ borderRadius: 24 }} className={`${styles.visual} ${item.slug === "two-wheeler-dashboard" ? styles.dashboard : ""} ${item.slug === "medtimer" ? styles.physical : ""}`}>
                <div className={styles.artwork}>{item.visual}</div>
                <button ref={element => { buttons.current[index] = element; }} className={styles.preview} aria-label={`Preview ${item.title}`} aria-pressed={selected} aria-controls={`${id}-${item.slug}-copy`} onFocus={() => setActive(index)} onClick={() => setActive(index)} onKeyDown={event => keyboard(event, index)} />
              </motion.div>
              <motion.h3 layout={!reducedMotion ? "position" : false}><Link href={`/work/${item.slug}`}>{item.title}</Link></motion.h3>
              {!embedded && copy(item, index)}
            </motion.article>;
          })}
        </div>
        {embedded && <div className={styles.context} aria-live="polite" aria-atomic="true">
          {items.map((item, index) => <div key={item.slug}>{copy(item, index)}</div>)}
        </div>}
      </div>
      <noscript><style>{`[data-collage] button { display: none } [data-project-copy] { display: block !important; margin-top: 28px }`}</style></noscript>
    </section>
  );
}
