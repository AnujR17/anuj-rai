"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./work-gallery.module.css";

type WorkItem = { slug: string; title: string };

export function WorkGallery({ items }: { items: WorkItem[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = root.current;
    const rail = track.current;
    if (!section || !rail) return;
    const rows = Array.from(rail.querySelectorAll<HTMLAnchorElement>("[data-work-project]"));
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, current = 0, target = 0, step = 0, lastTime = 0;
    let hold = 3000, manualUntil = 0, hovered = false, focused = false, ready = false;
    let touchY: number | null = null;
    const limit = () => step * (rows.length - 1);
    const clamp = (value: number) => Math.max(0, Math.min(limit(), value));
    const draw = () => {
      rail.style.transform = `translate3d(0, ${-current}px, 0)`;
      const active = Math.round(current / (step || 1));
      rows.forEach((row, index) => row.dataset.active = String(index === active));
      section.dataset.project = String(active);
    };
    const measure = () => {
      const oldStep = step;
      step = rows[1].offsetTop - rows[0].offsetTop;
      if (oldStep) { current = current / oldStep * step; target = target / oldStep * step; }
      const offset = Math.max(0, (section.clientHeight - rows[0].offsetHeight) / 2);
      rail.style.top = `${offset}px`;
      draw();
    };
    const resize = new ResizeObserver(measure);
    const move = (amount: number, absolute = false) => {
      target = clamp(absolute ? amount : target + amount);
      manualUntil = performance.now() + 3000;
      hold = 0;
      if (motion.matches) { current = target; draw(); }
    };
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      move(event.deltaY * (event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? section.clientHeight : 1));
    };
    const key = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || (event.target as HTMLElement).closest("input, textarea, select, [contenteditable=true]")) return;
      const amount = ({ ArrowDown: 90, ArrowUp: -90, PageDown: step, PageUp: -step, " ": event.shiftKey ? -step : step } as Record<string, number>)[event.key];
      if (event.key === "Home" || event.key === "End") { event.preventDefault(); move(event.key === "Home" ? 0 : limit(), true); }
      else if (amount !== undefined) { event.preventDefault(); move(amount); }
    };
    const startTouch = (event: TouchEvent) => { touchY = event.touches.length === 1 ? event.touches[0].clientY : null; };
    const touch = (event: TouchEvent) => {
      if (touchY === null || event.touches.length !== 1) return;
      const y = event.touches[0].clientY;
      event.preventDefault(); move((touchY - y) * 1.25); touchY = y;
    };
    const endTouch = () => { touchY = null; };
    const enter = () => { hovered = true; };
    const leave = () => { hovered = false; };
    const focus = (event: FocusEvent) => {
      focused = true;
      const row = (event.target as HTMLElement).closest<HTMLAnchorElement>("[data-work-project]");
      if (row) { current = target = rows.indexOf(row) * step; draw(); }
    };
    const blur = (event: FocusEvent) => { focused = section.contains(event.relatedTarget as Node); };
    const tick = (time: number) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 40) : 0;
      lastTime = time;
      if (ready && !hovered && !focused && !document.hidden && !motion.matches && time > manualUntil) {
        if (hold > 0) hold -= elapsed;
        else target = clamp(target + elapsed * .025);
      }
      if (!motion.matches) current += (target - current) * (1 - Math.exp(-elapsed / 110));
      draw(); frame = requestAnimationFrame(tick);
    };
    section.dataset.workEnhanced = "true";
    window.scrollTo(0, 0);
    measure(); resize.observe(section);
    const first = rows[0].querySelector("img");
    Promise.all([document.fonts.ready, first?.decode().catch(() => {})]).then(() => { ready = true; });
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("keydown", key);
    window.addEventListener("touchstart", startTouch, { passive: true });
    window.addEventListener("touchmove", touch, { passive: false });
    window.addEventListener("touchend", endTouch);
    window.addEventListener("touchcancel", endTouch);
    rail.addEventListener("pointerenter", enter);
    rail.addEventListener("pointerleave", leave);
    section.addEventListener("focusin", focus);
    section.addEventListener("focusout", blur);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame); resize.disconnect();
      window.removeEventListener("wheel", wheel); window.removeEventListener("keydown", key);
      window.removeEventListener("touchstart", startTouch); window.removeEventListener("touchmove", touch);
      window.removeEventListener("touchend", endTouch); window.removeEventListener("touchcancel", endTouch);
      rail.removeEventListener("pointerenter", enter); rail.removeEventListener("pointerleave", leave);
      section.removeEventListener("focusin", focus); section.removeEventListener("focusout", blur);
      delete section.dataset.workEnhanced;
    };
  }, []);

  return <section ref={root} className={styles.gallery} aria-labelledby="work-title" data-work-enhanced="false">
    <h1 id="work-title" className={styles.title}>Work</h1>
    <div ref={track} className={styles.track}>
      {items.map((item, index) => <Link key={item.slug} href={`/work/${item.slug}`} className={styles.project} data-work-project={item.slug}>
        <h2>{item.title}</h2>
        <Image src={`/portfolio/banners/${item.slug}.png`} width={1600} height={900} alt={`${item.title} project cover`} preload={index === 0} loading={index === 0 ? undefined : "eager"} sizes="(max-width: 700px) 65vw, 44vw" />
      </Link>)}
    </div>
  </section>;
}
