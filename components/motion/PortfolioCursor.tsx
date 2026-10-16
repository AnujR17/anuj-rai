"use client";

import { useEffect, useRef } from "react";
import styles from "./PortfolioCursor.module.css";

export function PortfolioCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cursor = ref.current;
    if (!cursor) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const root = document.documentElement;
    const hide = () => { delete root.dataset.customCursor; cursor.dataset.visible = "false"; };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType !== "mouse") { hide(); return; }
      const target = event.target instanceof Element ? event.target : null;
      const interactive = target?.closest("a, button, summary, [role='button']");
      if (!interactive && target?.closest("p, input, textarea, [contenteditable='true']")) { hide(); return; }
      root.dataset.customCursor = "pointer";
      cursor.dataset.visible = "true";
      cursor.dataset.mode = interactive ? "interactive" : "default";
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    const down = () => { cursor.dataset.pressed = "true"; };
    const up = () => { cursor.dataset.pressed = "false"; };
    const keyboard = (event: KeyboardEvent) => { if (event.key === "Tab") hide(); };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", move, { passive: true });
    document.addEventListener("pointerdown", down, { passive: true });
    document.addEventListener("pointerup", up, { passive: true });
    document.addEventListener("pointerleave", hide);
    document.addEventListener("keydown", keyboard);
    window.addEventListener("blur", hide);
    finePointer.addEventListener("change", hide);
    return () => {
      hide();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", move);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("keydown", keyboard);
      window.removeEventListener("blur", hide);
      finePointer.removeEventListener("change", hide);
    };
  }, []);
  return <div ref={ref} className={styles.cursor} data-portfolio-cursor aria-hidden="true"><span className={styles.form}><span className={styles.outline} /><span className={styles.horizontal} /><span className={styles.vertical} /></span></div>;
}
