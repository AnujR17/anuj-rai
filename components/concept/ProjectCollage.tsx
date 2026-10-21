"use client";

import { useRef, useState, type ReactNode, type KeyboardEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { TypeText } from "@/components/motion/Entrance";
import styles from "./ProjectCollage.module.css";

type CollageItem = { slug: string; title: string; visual: ReactNode };

export function ProjectCollage({ items, id = "work", embedded = false, featuredSlug = items[0].slug }: { items: CollageItem[]; id?: string; embedded?: boolean; featuredSlug?: string }) {
  const [active, setActive] = useState(() => Math.max(0, items.findIndex(item => item.slug === featuredSlug)));
  const reducedMotion = useReducedMotion();
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const keyboard = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    links.current[next]?.focus({ preventScroll: true });
  };
  return (
    <section id={id} className={`${styles.collage} ${embedded ? styles.embedded : ""}`} aria-labelledby={`${id}-title`} data-collage data-active-project={items[active].slug}>
      <h2 id={`${id}-title`} className={styles.heading}><TypeText text="Selected work" /></h2>
      <div className={styles.gallery}>
        <div className={styles.frames} style={{ gridTemplateColumns: items.map((_, index) => index === active ? "2fr" : ".65fr").join(" ") }}>
          {items.map((item, index) => {
            const selected = index === active;
            return <motion.article layout={!reducedMotion} transition={{ layout: { duration: reducedMotion ? 0 : .65, ease: [.22, 1, .36, 1] } }} key={item.slug} className={styles.project} data-selected={selected} data-project={item.slug} onPointerEnter={event => { if (event.pointerType === "mouse") setActive(index); }}>
              <Link ref={element => { links.current[index] = element; }} href={`/work/${item.slug}`} className={styles.projectLink} aria-label={`View ${item.title} case study`} onFocus={event => { if (event.currentTarget.matches(":focus-visible")) setActive(index); }} onKeyDown={event => keyboard(event, index)}>
                <motion.div layout={!reducedMotion} animate={{ rotate: selected ? 0 : index % 2 === 0 ? -1.8 : 1.8 }} transition={{ duration: reducedMotion ? 0 : .65, ease: [.22, 1, .36, 1] }} style={{ borderRadius: 24 }} className={`${styles.visual} ${item.slug === "two-wheeler-dashboard" ? styles.dashboard : ""} ${item.slug === "medtimer" ? styles.physical : ""}`}>
                  <div className={styles.artwork}>{item.visual}</div>
                </motion.div>
                <motion.h3 layout={!reducedMotion ? "position" : false}>{item.title}</motion.h3>
              </Link>
            </motion.article>;
          })}
        </div>
      </div>
    </section>
  );
}
