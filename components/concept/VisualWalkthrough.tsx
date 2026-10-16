"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { home } from "@/data/home";
import styles from "./Walkthrough.module.css";

const guidedQuery = "(min-width: 900px) and (prefers-reduced-motion: no-preference)";
const projectStart = 0.22;
function subscribe(callback: () => void) {
  const query = window.matchMedia(guidedQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getGuided = () => window.matchMedia(guidedQuery).matches;
const getServerGuided = () => false;

export function VisualWalkthrough() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const guided = useSyncExternalStore(subscribe, getGuided, getServerGuided);
  const [travel, setTravel] = useState(0);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const targetX = useTransform(scrollYProgress, [0, projectStart, 1], [0, 0, -travel]);
  const x = useSpring(targetX, { stiffness: 130, damping: 32, mass: 0.45 });
  const introOpacity = useTransform(scrollYProgress, value => 1 - Math.min(1, value / 0.1));
  const introY = useTransform(scrollYProgress, value => -30 * Math.min(1, value / 0.1));
  const titleOpacity = useTransform(scrollYProgress, value => Math.max(0, Math.min(1, (value - 0.1) / 0.12)));
  const titleY = useTransform(scrollYProgress, value => 25 * (1 - Math.max(0, Math.min(1, (value - 0.1) / 0.12))));

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const measure = () => setTravel(Math.max(0, track.scrollWidth - viewport.clientWidth));
    const frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [guided]);

  useMotionValueEvent(scrollYProgress, "change", value => {
    if (guided) {
      setActive(Math.round(Math.max(0, value - projectStart) / (1 - projectStart) * (home.work.length - 1)));
      setAtStart(value <= projectStart + 0.002);
      setAtEnd(value >= 0.998);
    }
  });

  function showProject(index: number) {
    const target = Math.max(0, Math.min(home.work.length - 1, index));
    if (guided && sectionRef.current) {
      const top = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const progress = projectStart + target / (home.work.length - 1) * (1 - projectStart);
      window.scrollTo({ top: top + progress * travel, behavior: "smooth" });
    } else {
      const panel = trackRef.current?.children[target] as HTMLElement | undefined;
      viewportRef.current?.scrollTo({ left: panel?.offsetLeft ?? 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
    setActive(target);
  }

  return (
    <section id="work" ref={sectionRef} className={styles.walkthrough} data-guided={guided} style={guided ? { height: `calc(100svh + ${travel}px)` } : undefined} aria-label="Anuj Rai and selected work">
      <div className={styles.stage}>
        <div className={styles.sidebar}>
          <motion.div className={styles.identity} style={guided ? { opacity: introOpacity, y: introY } : undefined}>
            <h1><span>Anuj</span><span>Rai</span></h1>
            <p>{home.role}</p>
          </motion.div>
          <motion.div className={styles.workTitle} style={guided ? { opacity: titleOpacity, y: titleY } : undefined}>
            <h2>Selected<br />work</h2>
          </motion.div>
          <nav className={styles.controls} aria-label="Project gallery controls">
            <button type="button" disabled={atStart} onClick={() => showProject(active - 1)}>Previous</button>
            <button type="button" disabled={atEnd} onClick={() => showProject(active + 1)}>Next project</button>
            <Link href="/work">All work</Link>
          </nav>
        </div>
        <div ref={viewportRef} className={styles.viewport} tabIndex={0} role="region" aria-label="Scrollable project gallery" onKeyDown={event => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); showProject(active + (event.key === "ArrowRight" ? 1 : -1)); }
          if (event.key === "Home" || event.key === "End") { event.preventDefault(); showProject(event.key === "Home" ? 0 : home.work.length - 1); }
        }} onScroll={() => {
          if (guided || !viewportRef.current || !trackRef.current) return;
          const left = viewportRef.current.scrollLeft;
          setAtStart(left <= 2);
          setAtEnd(left >= viewportRef.current.scrollWidth - viewportRef.current.clientWidth - 2);
          const offsets = Array.from(trackRef.current.children).map(child => (child as HTMLElement).offsetLeft);
          setActive(offsets.reduce((closest, offset, index) => Math.abs(offset - left) < Math.abs(offsets[closest] - left) ? index : closest, 0));
        }}>
          <motion.div ref={trackRef} className={styles.track} style={guided ? { x } : { x: 0 }}>
            {home.work.map((project, index) => (
              <article key={project.slug} className={`${styles.panel} ${styles[project.surface]}`}>
                <Link href={`/work/${project.slug}`} className={styles.projectLink} onFocus={event => { if (event.currentTarget.matches(":focus-visible")) showProject(index); }}>
                  <div className={styles.visual}>
                    <Image src={project.image} alt={project.alt} width={project.width} height={project.height} preload={index < 2} sizes={index === 0 ? "(max-width: 899px) 75vw, 460px" : "(max-width: 899px) 85vw, 720px"} />
                    {project.detail && <Image className={styles.detail} src={project.detail} alt="Map from the roundabout field study showing overlapping traffic approaches" width={931} height={646} sizes="(max-width: 899px) 55vw, 330px" />}
                  </div>
                  <h3>{project.title}</h3>
                </Link>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
