"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./CuriousEyes.module.css";

const motionQuery = "(prefers-reduced-motion: reduce)";
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const getServerReducedMotion = () => false;
function subscribeToMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

/** A decorative companion. Never intercepts the visitor's cursor or navigation. */
export function CuriousEyes() {
  const eyesRef = useRef<HTMLButtonElement>(null);
  const blinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [blinking, setBlinking] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, getReducedMotion, getServerReducedMotion);

  useEffect(() => {
    const element = eyesRef.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let visible = true;
    let frame = 0;
    let pointer = { x: 0, y: 0 };
    const eyes = Array.from(element.querySelectorAll<HTMLElement>("[data-eye]"));

    const reset = () => {
      eyes.forEach(eye => {
        eye.style.setProperty("--look-x", "0px");
        eye.style.setProperty("--look-y", "0px");
      });
    };
    const update = () => {
      frame = 0;
      if (!visible || motion.matches || !finePointer.matches) return;
      eyes.forEach(eye => {
        const rect = eye.getBoundingClientRect();
        const dx = pointer.x - rect.left - rect.width / 2;
        const dy = pointer.y - rect.top - rect.height / 2;
        const distance = Math.hypot(dx, dy);
        const strength = Math.min(distance / 350, 1);
        const angle = Math.atan2(dy, dx);
        eye.style.setProperty("--look-x", `${Math.cos(angle) * strength * rect.width * 0.10}px`);
        eye.style.setProperty("--look-y", `${Math.sin(angle) * strength * rect.height * 0.10}px`);
      });
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !visible || motion.matches) return;
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) reset();
    });
    observer.observe(element);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    motion.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      motion.removeEventListener("change", reset);
      if (blinkTimer.current) clearTimeout(blinkTimer.current);
    };
  }, []);

  function blink() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (blinkTimer.current) clearTimeout(blinkTimer.current);
    setBlinking(true);
    blinkTimer.current = setTimeout(() => setBlinking(false), 220);
  }

  return (
    <div className={styles.companion}>
      <button
        ref={eyesRef}
        type="button"
        className={`${styles.eyes} ${blinking ? styles.blinking : ""}`}
        onClick={blink}
        disabled={reducedMotion}
        aria-label={reducedMotion ? "Decorative eyes, animation disabled" : "Make the eyes blink"}
      >
        <span className={styles.eye} data-eye aria-hidden="true"><span className={styles.socket}><span className={styles.pupil} /></span></span>
        <span className={styles.eye} data-eye aria-hidden="true"><span className={styles.socket}><span className={styles.pupil} /></span></span>
      </button>
      <p className={styles.hint}><span className={styles.pointerHint}>Move your cursor. </span>Click to blink.</p>
    </div>
  );
}
