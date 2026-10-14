"use client";
import { useState } from "react";
import Image from "next/image";
import { DashboardDemo } from "./Studies";
const habits = [
  {
    title: "Understand",
    text: "Look at the situation, the people and how the system works.",
    caption:
      "The bike survey gives context for what riders say matters. It raises questions for the interface; it does not validate a layout.",
  },
  {
    title: "Shape",
    text: "Work out what someone needs to notice, do and understand.",
    caption:
      "The original dashboard export makes the hierarchy concrete: speed at the centre, with gear and warnings in their own areas.",
  },
  {
    title: "Build",
    text: "Make something that lets me examine the interaction.",
    caption:
      "A browser study makes changing states available to try. Real riding and hardware still need their own testing.",
  },
];
export function HowIWork() {
  const [active, setActive] = useState(0);
  return (
    <section className="how-section section-pad" id="approach">
      <div className="section-heading">
        <h2>
          How I work<span>.</span>
        </h2>
        <p>
          From a question to something you can try.
          <br />
          These are habits I move between.
        </p>
      </div>
      <div className="approach-grid">
        <div className="habits">
          {habits.map((h, n) => (
            <button
              type="button"
              key={h.title}
              aria-pressed={n === active}
              aria-controls="approach-example"
              onClick={() => setActive(n)}
            >
              <span className="habit-index">0{n + 1}</span>
              <span>
                <strong>{h.title}</strong>
                <span>{h.text}</span>
              </span>
              <span className="habit-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
          <div className="tools-note">
            <strong>Skills in practice</strong>
            <p>
              Research synthesis · Interface design · Interaction prototyping ·
              Programming
            </p>
            <strong>Tools behind the work</strong>
            <p>Figma · React · TypeScript · Arduino / ESP32 · GitHub Copilot</p>
          </div>
        </div>
        <div className="approach-artifact" id="approach-example">
          <div className="example-stage">
            {active === 0 ? (
              <div className="paper-figure">
                <Image
                  src="/portfolio/research/bike-feature-priorities.png"
                  alt="Original survey chart of dashboard feature priorities"
                  width={1220}
                  height={706}
                />
              </div>
            ) : active === 1 ? (
              <div className="display-housing">
                <Image
                  src="/portfolio/himalayan-dashboard.png"
                  alt="Original Himalayan circular dashboard export"
                  width={385}
                  height={385}
                />
              </div>
            ) : (
              <DashboardDemo />
            )}
          </div>
          <p className="caption" role="status">
            {habits[active].caption}
          </p>
        </div>
      </div>
    </section>
  );
}
