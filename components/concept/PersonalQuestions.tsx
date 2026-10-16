"use client";

import Link from "next/link";
import { home } from "@/data/home";
import styles from "./PersonalQuestions.module.css";

export function PersonalQuestions() {
  return (
    <section id="about" className={styles.about} aria-label="About Anuj">
      <div className={styles.questions}>
        {home.questions.map((question, index) => (
          <details key={question.lines.join(" ")} className={styles.question} name="about-anuj" open={index === 0} onPointerEnter={event => { if (event.pointerType === "mouse") event.currentTarget.open = true; }}>
            <summary>{question.lines.map(line => <span key={line}>{line}</span>)}</summary>
            <div className={styles.answer}>
              <p>{question.answer}</p>
              <Link href={question.href}>{question.label}</Link>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
