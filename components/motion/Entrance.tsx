"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import styles from "./Entrance.module.css";

function useEntrance<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    element.dataset.motion = "ready";
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        element.dataset.motion = "run";
        observer.disconnect();
      }
    }, { threshold: .12 });
    observer.observe(element);
    const reduce = () => {
      if (preference.matches) {
        element.dataset.motion = "done";
        observer.disconnect();
      }
    };
    preference.addEventListener("change", reduce);
    return () => { observer.disconnect(); preference.removeEventListener("change", reduce); };
  }, []);
  return ref;
}

export function TypeText({ text, className = "", delay = 0, pace = 45 }: { text: string; className?: string; delay?: number; pace?: number }) {
  const ref = useEntrance<HTMLSpanElement>();
  let index = 0;
  return (
    <span ref={ref} className={`${styles.typed} ${className}`}>
      <span className={styles.accessible}>{text}</span>
      <span aria-hidden="true">
        {text.split(/(\s+)/).map((word, wordIndex) => /^\s+$/.test(word) ? word : (
          <span className={styles.word} key={wordIndex}>
            {[...word].map(character => {
              const characterIndex = index++;
              return <span className={styles.character} key={characterIndex} style={{ "--character-delay": `${delay + characterIndex * pace}ms` } as CSSProperties}>{character}</span>;
            })}
          </span>
        ))}
      </span>
    </span>
  );
}

export function EaseIn({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useEntrance<HTMLDivElement>();
  return <div ref={ref} className={`${styles.reveal} ${className}`} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties} onFocusCapture={() => { if (ref.current) ref.current.dataset.motion = "done"; }}>{children}</div>;
}
