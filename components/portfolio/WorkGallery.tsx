"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./work-gallery.module.css";

type WorkItem = { slug: string; title: string };
const aspect = 16 / 9;
const speed = .18;
const scale = .65;
const startDelay = 3000;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smooth = (value: number) => { const t = clamp(value, 0, 1); return t * t * (3 - 2 * t); };

export function WorkGallery({ items }: { items: WorkItem[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const labelContainer = useRef<HTMLDivElement>(null);
  const announcement = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = root.current;
    const gallery = track.current;
    if (!section || !gallery || !labelContainer.current) return;
    const tiles = Array.from(gallery.querySelectorAll<HTMLAnchorElement>("[data-work-project]"));
    const labels = Array.from(labelContainer.current.querySelectorAll<HTMLElement>("[data-work-label]"));
    if (!tiles.length) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, phase = 0, target: number | null = null, lastTime = 0, introElapsed = 0;
    let needsDraw = true, ready = false, inView = true, suppressClick = false, releaseTimer = 0;
    let focusAfterMove: number | null = null;
    let drag: { y: number; phase: number; id: number; moved: boolean } | null = null;
    let touch: { id: number; x: number; y: number; lastY: number; moved: boolean } | null = null;
    const hovered = new Set<EventTarget>();
    const max = tiles.length - 1;
    const layout = () => {
      const width = gallery.clientWidth, height = gallery.clientHeight;
      const big = Math.min(width, height * .84 * aspect) * scale;
      const small = big * .52;
      return { width, height, big, small, focusY: height * .47, pitch: (big + small) / (2 * aspect) + (innerWidth <= 700 ? 80 : 28) };
    };
    const draw = () => {
      needsDraw = false;
      const { width, height, big, small, focusY, pitch } = layout();
      if (!width || !height) return;
      const selected = clamp(Math.round(phase), 0, max);
      const galleryBounds = gallery.getBoundingClientRect(), stageBounds = section.getBoundingClientRect();
      section.dataset.project = String(selected);
      section.dataset.phase = phase.toFixed(6);
      tiles.forEach((tile, index) => {
        const delta = index - phase, distance = Math.abs(delta);
        const size = small + (big - small) * smooth(1 - distance);
        const x = innerWidth <= 700 ? width - size : (width - size) / 2;
        const y = focusY + delta * pitch - size / (2 * aspect);
        const visible = y + size / aspect > 0 && y < height;
        tile.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${size / width})`;
        tile.style.visibility = visible ? "visible" : "hidden";
        tile.style.pointerEvents = visible ? "auto" : "none";
        tile.dataset.active = String(index === selected);
        tile.setAttribute("aria-current", String(index === selected));
        tile.setAttribute("aria-label", `${index === selected ? "Open" : "Show"} ${items[index].title}`);
        tile.tabIndex = visible && index === selected ? 0 : -1;
        const label = labels[index];
        const fade = 1 - smooth((distance - .4) / .45);
        const labelVisible = visible && fade > .005;
        label.style.opacity = String(fade);
        label.style.visibility = labelVisible ? "visible" : "hidden";
        const labelX = innerWidth <= 700
          ? clamp(galleryBounds.left - stageBounds.left + x, 24, innerWidth - 24 - label.offsetWidth)
          : galleryBounds.left - stageBounds.left + x - label.offsetWidth - 24;
        const labelY = galleryBounds.top - stageBounds.top + y + (innerWidth <= 700 ? -label.offsetHeight - 16 : size / (2 * aspect) - label.offsetHeight / 2);
        label.style.transform = `translate3d(${labelX}px, ${labelY}px, 0)`;
        label.querySelector("a")!.tabIndex = labelVisible && index === selected ? 0 : -1;
      });
    };
    const schedule = () => { needsDraw = true; };
    const select = (index: number, immediate = false) => {
      const next = clamp(index, 0, max);
      if (motion.matches || immediate) { phase = next; target = null; draw(); }
      else target = next;
      if (announcement.current) announcement.current.textContent = items[Math.round(next)].title;
    };
    const acceptsInput = (event: Event) => !((event.target as Element)?.closest?.("input, textarea, select, [contenteditable=true]"));
    const wheel = (event: WheelEvent) => {
      if (!acceptsInput(event) || event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      const pixels = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      const next = clamp((target ?? phase) + pixels / layout().pitch * .8, 0, max);
      if (motion.matches) { phase = next; target = null; draw(); } else target = next;
    };
    const key = (event: KeyboardEvent) => {
      if (!acceptsInput(event) || event.altKey || event.ctrlKey || event.metaKey) return;
      const next = ["ArrowDown", "ArrowRight", "PageDown"].includes(event.key);
      const previous = ["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key);
      const space = event.key === " " && !(event.target as Element).closest("button");
      const endpoint = event.key === "Home" || event.key === "End";
      if (!next && !previous && !space && !endpoint) return;
      event.preventDefault();
      const index = event.key === "Home" ? 0 : event.key === "End" ? max : clamp(Math.round(target ?? phase) + (previous || (space && event.shiftKey) ? -1 : 1), 0, max);
      if ((event.target as Element).closest("[data-work-project], [data-work-label]")) focusAfterMove = index;
      select(index, endpoint);
    };
    const startTouch = (event: TouchEvent) => {
      if (!acceptsInput(event) || event.touches.length !== 1) { touch = null; return; }
      const point = event.touches[0];
      touch = { id: point.identifier, x: point.clientX, y: point.clientY, lastY: point.clientY, moved: false };
    };
    const moveTouch = (event: TouchEvent) => {
      if (!touch || !acceptsInput(event) || event.touches.length !== 1) { touch = null; return; }
      const point = Array.from(event.touches).find(item => item.identifier === touch!.id);
      if (!point) return;
      if (!touch.moved) {
        const dx = point.clientX - touch.x, dy = point.clientY - touch.y;
        if (Math.abs(dy) < 7) return;
        if (Math.abs(dx) > Math.abs(dy)) { touch = null; return; }
        touch.moved = true; suppressClick = true;
      }
      event.preventDefault(); target = null;
      phase = clamp(phase + (touch.lastY - point.clientY) / layout().pitch, 0, max);
      touch.lastY = point.clientY; schedule();
    };
    const releaseClick = () => { clearTimeout(releaseTimer); releaseTimer = window.setTimeout(() => { suppressClick = false; }, 100); };
    const endTouch = () => { touch = null; releaseClick(); };
    const pointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0 || !(event.target as Element).closest("[data-work-project]")) return;
      drag = { y: event.clientY, phase, id: event.pointerId, moved: false }; suppressClick = false;
    };
    const pointerMove = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      const movement = event.clientY - drag.y;
      if (Math.abs(movement) < 7 && !drag.moved) return;
      drag.moved = true; suppressClick = true; target = null;
      gallery.dataset.dragging = "true";
      phase = clamp(drag.phase - movement / layout().pitch, 0, max); schedule();
    };
    const pointerUp = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      drag = null; delete gallery.dataset.dragging; releaseClick();
    };
    const preventNativeDrag = (event: DragEvent) => event.preventDefault();
    const enter = (event: PointerEvent) => { if (event.pointerType === "mouse") hovered.add(event.currentTarget!); };
    const leave = (event: PointerEvent) => { hovered.delete(event.currentTarget!); };
    const click = (event: MouseEvent) => {
      const tile = (event.target as Element).closest<HTMLAnchorElement>("[data-work-project]");
      if (!tile) return;
      if (suppressClick) { event.preventDefault(); event.stopPropagation(); return; }
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button) return;
      if (tile.dataset.active !== "true") {
        event.preventDefault(); event.stopPropagation(); select(tiles.indexOf(tile));
        // Pointer selection should not leave focus on an offscreen link during the move.
        if (document.activeElement === tile) tile.blur();
      }
    };
    const resetWork = (event: MouseEvent) => {
      if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>(".site-nav a[href]");
      if (!link) return;
      const url = new URL(link.href, location.href);
      if (url.origin === location.origin && url.pathname === "/work") {
        event.preventDefault(); event.stopPropagation(); select(0, true);
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };
    const focus = (event: FocusEvent) => {
      // Pointer focus is followed by click or drag; it must not preselect a neighbour.
      const element = event.target as HTMLElement;
      if (drag || touch || !element.matches(":focus-visible")) return;
      const tile = element.closest<HTMLAnchorElement>("[data-work-project]");
      const label = element.closest<HTMLElement>("[data-work-label]");
      const index = tile ? tiles.indexOf(tile) : label ? labels.indexOf(label) : -1;
      if (index >= 0 && index !== Math.round(phase)) { phase = index; target = null; draw(); }
    };
    const visibility = () => { lastTime = 0; };
    const changeMotion = () => {
      if (motion.matches) { phase = clamp(Math.round(phase), 0, max); target = null; }
      schedule();
    };
    const tick = (time: number) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 0; lastTime = time;
      const focused = gallery.contains(document.activeElement) || labels.some(label => label.contains(document.activeElement));
      if (ready && inView && !document.hidden) {
        if (target !== null) {
          phase += (target - phase) * (1 - Math.exp(-elapsed / 180)); needsDraw = true;
          if (Math.abs(target - phase) < .0008) { phase = target; target = null; }
        } else if (!motion.matches && !hovered.size && !focused && !drag && !touch && phase < max) {
          if (introElapsed < startDelay) introElapsed = Math.min(startDelay, introElapsed + elapsed);
          else { phase = Math.min(max, phase + elapsed * speed / 1000); needsDraw = true; }
        }
      }
      if (needsDraw) draw();
      if (focusAfterMove !== null && target === null) {
        const index = focusAfterMove; focusAfterMove = null;
        if (index === Math.round(phase)) tiles[index].focus({ preventScroll: true });
      }
      frame = requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(schedule);
    const intersection = new IntersectionObserver(([entry]) => { inView = entry.intersectionRatio >= .6; }, { threshold: [0, .6, 1] });
    section.dataset.workEnhanced = "true";
    window.scrollTo({ top: 0, behavior: "instant" });
    draw(); resize.observe(gallery); labels.forEach(label => resize.observe(label)); intersection.observe(section);
    Promise.all([document.fonts.ready, tiles[0].querySelector("img")?.decode().catch(() => {})]).then(() => { ready = true; schedule(); });
    window.addEventListener("wheel", wheel, { passive: false }); window.addEventListener("keydown", key);
    window.addEventListener("touchstart", startTouch, { passive: true }); window.addEventListener("touchmove", moveTouch, { passive: false });
    window.addEventListener("touchend", endTouch); window.addEventListener("touchcancel", endTouch);
    window.addEventListener("pointermove", pointerMove); window.addEventListener("pointerup", pointerUp); window.addEventListener("pointercancel", pointerUp);
    gallery.addEventListener("pointerdown", pointerDown); gallery.addEventListener("dragstart", preventNativeDrag);
    gallery.addEventListener("click", click, true); section.addEventListener("focusin", focus);
    [gallery, ...labels].forEach(element => { element.addEventListener("pointerenter", enter); element.addEventListener("pointerleave", leave); });
    document.addEventListener("visibilitychange", visibility); motion.addEventListener("change", changeMotion);
    document.addEventListener("click", resetWork, true);
    window.addEventListener("resize", schedule);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame); clearTimeout(releaseTimer); resize.disconnect(); intersection.disconnect();
      window.removeEventListener("wheel", wheel); window.removeEventListener("keydown", key);
      window.removeEventListener("touchstart", startTouch); window.removeEventListener("touchmove", moveTouch);
      window.removeEventListener("touchend", endTouch); window.removeEventListener("touchcancel", endTouch);
      window.removeEventListener("pointermove", pointerMove); window.removeEventListener("pointerup", pointerUp); window.removeEventListener("pointercancel", pointerUp);
      gallery.removeEventListener("pointerdown", pointerDown); gallery.removeEventListener("dragstart", preventNativeDrag);
      gallery.removeEventListener("click", click, true); section.removeEventListener("focusin", focus);
      [gallery, ...labels].forEach(element => { element.removeEventListener("pointerenter", enter); element.removeEventListener("pointerleave", leave); });
      document.removeEventListener("visibilitychange", visibility); motion.removeEventListener("change", changeMotion);
      document.removeEventListener("click", resetWork, true);
      window.removeEventListener("resize", schedule); delete section.dataset.workEnhanced;
    };
  }, [items]);

  return <section ref={root} className={styles.gallery} aria-labelledby="work-title" aria-roledescription="project gallery" data-work-enhanced="false">
    <h1 id="work-title" className={styles.title}>Work</h1>
    <div ref={track} className={styles.track}>
      {items.map((item, index) => <Link key={item.slug} href={`/work/${item.slug}`} className={styles.project} data-work-project={item.slug} draggable={false}>
        <h2 className={styles.fallbackTitle}>{item.title}</h2>
        <Image src={`/portfolio/banners/${item.slug}.png`} width={1600} height={900} alt={`${item.title} project cover`} draggable={false} preload={index === 0} loading={index === 0 ? undefined : "eager"} sizes="(max-width: 700px) 65vw, 40vw" />
      </Link>)}
    </div>
    <div ref={labelContainer} className={styles.labels}>
      {items.map(item => <h2 className={styles.label} data-work-label={item.slug} key={item.slug}><Link href={`/work/${item.slug}`}>{item.title}</Link></h2>)}
    </div>
    <p ref={announcement} className={styles.announcement} aria-live="polite" />
  </section>;
}
