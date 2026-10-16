"use client";

import { useLayoutEffect, useState, type ReactNode } from "react";
import styles from "./HeroSequence.module.css";

type Phase = "static" | "hello" | "erase" | "headline" | "done";
const greeting = "Hello,";
const headline = "People, patterns, and the little things.";

export function HeroSequence({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ phase: Phase; count: number }>({ phase: "static", count: headline.length });
  useLayoutEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    let timer: ReturnType<typeof setTimeout>;
    let stopped = false;
    const later = (callback: () => void, delay: number) => { timer = setTimeout(() => { if (!stopped) callback(); }, delay); };
    const writeHeadline = (count: number) => {
      setState({ phase: count === headline.length ? "done" : "headline", count });
      if (count < headline.length) later(() => writeHeadline(count + 1), headline[count - 1] === "," ? 90 : 28);
    };
    const erase = (count: number) => {
      setState({ phase: "erase", count });
      if (count > 0) later(() => erase(count - 1), 35);
      else later(() => writeHeadline(0), 100);
    };
    const writeHello = (count: number) => {
      setState({ phase: "hello", count });
      if (count < greeting.length) later(() => writeHello(count + 1), 65);
      else later(() => erase(greeting.length), 420);
    };
    writeHello(0);
    const reduce = () => {
      if (preference.matches) { stopped = true; clearTimeout(timer); setState({ phase: "static", count: headline.length }); }
    };
    preference.addEventListener("change", reduce);
    return () => { stopped = true; clearTimeout(timer); preference.removeEventListener("change", reduce); };
  }, []);

  const showingGreeting = state.phase === "hello" || state.phase === "erase";
  const finalVisible = !showingGreeting;
  const renderText = (text: string, start = 0) => {
    let offset = start;
    return text.split(/(\s+)/).map((word, wordIndex) => (
      <span className={/^\s+$/.test(word) ? styles.space : styles.word} key={wordIndex}>
        {[...word].map(character => {
          const index = offset++;
          const visible = finalVisible && index < state.count;
          return <span className={styles.glyph} key={index} data-visible={visible} data-caret={finalVisible && index === state.count - 1}>{character}</span>;
        })}
      </span>
    ));
  };
  return (
    <div className={styles.sequence} data-phase={state.phase} data-count={state.count}>
      <h1 id="intro-title" className={styles.title}>
        <span className={styles.accessible}>{headline}</span>
        <span className={styles.stage} aria-hidden="true">
          <span className={styles.greeting} data-visible={showingGreeting}>
            {state.count === 0 && showingGreeting && <span className={styles.startCaret} />}
            {[...greeting].map((character, index) => <span key={index} className={styles.glyph} data-visible={showingGreeting && index < state.count} data-caret={showingGreeting && index === state.count - 1}>{character}</span>)}
          </span>
          <span className={styles.headline} data-visible={finalVisible}>
            {state.count === 0 && finalVisible && <span className={styles.startCaret} />}
            <span className={styles.line}>{renderText("People, patterns, ")}</span>
            <span className={styles.line}>{renderText("and the ", 18)}<span className={styles.little}>{renderText("little things.", 26)}</span></span>
          </span>
        </span>
      </h1>
      <div className={styles.copy} data-visible={state.phase === "done" || state.phase === "static"}>{children}</div>
    </div>
  );
}
