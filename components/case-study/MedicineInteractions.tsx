"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { setupScreens, originalInterfaces, type MedicineScreen } from "@/data/medicine-screens";

export function StaticMedicineScreen({ screen, priority = false }: { screen: MedicineScreen; priority?: boolean }) {
  return <Image className="lf-static-device" src={screen.mockup} width={screen.width} height={screen.height} alt={`${screen.title}, original Figma PNG inside a fixed device mockup`} preload={priority} sizes="(max-width: 700px) 80vw, 320px" />;
}

export function MedicineOpening() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => setPlaying(false);
    const visibility = () => { if (document.hidden) stop(); };
    const timer = window.setInterval(() => setStep(current => (current + 1) % 3), 1900);
    motion.addEventListener("change", stop); document.addEventListener("visibilitychange", visibility);
    return () => { clearInterval(timer); motion.removeEventListener("change", stop); document.removeEventListener("visibilitychange", visibility); };
  }, [playing]);
  return <div className="lf-opening-visual" aria-label="Prescription capture, review and routine storyboard">
    <div className="lf-hero-screen" data-opening-screen={setupScreens[step].id}><StaticMedicineScreen screen={setupScreens[step]} priority /></div>
    <div className="lf-opening-controls">
      <button type="button" aria-pressed={playing} onClick={() => setPlaying(value => !value)}>{playing ? "Pause opening" : "Play opening"}</button>
      <div className="lf-step-links" role="group" aria-label="Opening scenes">{setupScreens.map((screen, index) => <button type="button" key={screen.id} aria-pressed={step === index} onClick={() => { setPlaying(false); setStep(index); }}>{screen.title}</button>)}</div>
    </div>
  </div>;
}

export function MedicineGallery() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  return <>
    <div className="lf-design-gallery" data-active={active} aria-label="Original setup screens">
      {setupScreens.map((screen, index) => <button type="button" key={screen.id} className="lf-gallery-item" aria-pressed={active === index}
        ref={element => { buttons.current[index] = element; }} onClick={() => setActive(index)}
        onKeyDown={event => { let next = index; if (event.key === "ArrowRight") next = (index + 1) % 3; else if (event.key === "ArrowLeft") next = (index + 2) % 3; else if (event.key === "Home") next = 0; else if (event.key === "End") next = 2; else return; event.preventDefault(); setActive(next); buttons.current[next]?.focus({ preventScroll: true }); }}>
        <span className="lf-gallery-visual"><StaticMedicineScreen screen={screen} /></span><span>{screen.title}</span>
      </button>)}
    </div>
    <div className="lf-decision-copy" aria-live="polite"><h3>{setupScreens[active].title}</h3><p>{setupScreens[active].reason}</p><a href={setupScreens[active].src}>View original screen</a></div>
  </>;
}

export function OriginalMedicineInterfaces() {
  const [selected, setSelected] = useState<MedicineScreen>(originalInterfaces[0]);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { const node = dialog.current; return () => node?.close(); }, []);
  return <>
    <details className="lf-originals"><summary>Original interfaces</summary><div className="lf-source-phones">{originalInterfaces.map(screen => <a className="lf-source-open" href={screen.src} key={screen.id} aria-label={`View ${screen.title.toLowerCase()} at full size`} aria-haspopup="dialog" onClick={event => { event.preventDefault(); setSelected(screen); dialog.current?.showModal(); }}><StaticMedicineScreen screen={screen} /></a>)}</div></details>
    <dialog ref={dialog} className="lf-image-dialog lf-modal" aria-label="Original Figma screen" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <button type="button" onClick={() => dialog.current?.close()}>Close image</button>
      <Image src={selected.src} alt={selected.title} width={selected.sourceWidth} height={selected.sourceHeight} sizes="94vw" />
    </dialog>
  </>;
}

function InformationStructure() {
  return <div className="lf-architecture"><div className="lf-architecture-row"><div>Prescription</div><span className="lf-connector" aria-hidden="true" /><div>Review</div><span className="lf-connector" aria-hidden="true" /><div>Routine</div></div><div className="lf-architecture-branch" aria-hidden="true" /><div className="lf-architecture-row lf-architecture-children"><div>Record a dose</div><div>Understand an update</div></div></div>;
}
export function MedicineStructure() {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { const node = dialog.current; return () => node?.close(); }, []);
  return <>
    <div className="lf-architecture-heading"><h3>Proposed information structure</h3><button type="button" onClick={() => dialog.current?.showModal()}>Inspect structure</button></div>
    <InformationStructure />
    <dialog ref={dialog} className="lf-structure-dialog lf-modal" aria-labelledby="medicine-structure-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}><div className="lf-dialog-heading"><h2 id="medicine-structure-title">Proposed information structure</h2><button type="button" onClick={() => dialog.current?.close()}>Close structure</button></div><InformationStructure /></dialog>
  </>;
}

export function DoseRecordStudy() {
  const [recorded, setRecorded] = useState(false);
  return <div className="lf-status-study"><div className="lf-status-card"><span>Afternoon medicine</span><strong>{recorded ? "Marked as taken" : "No update yet"}</strong><div className="lf-status-line" aria-hidden="true" /><span>{recorded ? "The dose has a reported update" : "The record does not establish what happened"}</span></div><button type="button" onClick={() => setRecorded(value => !value)}>{recorded ? "Show an empty record" : "Show a recorded dose"}</button></div>;
}

const facts = [
  { value: "3", title: "Weeks", detail: "The confirmed duration of my individual app project" },
  { value: "2", title: "Interfaces", detail: "The medicine-taker and caregiver views approach the same routine from different needs" },
  { value: "3", title: "Setup screens", detail: "Capture, Review and Routine are the original Figma frames shown in the opening and screen gallery" },
];
export function MedicineFacts() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const active = pinned ?? hovered ?? focused;
  return <div className="lf-facts" data-active={active ?? ""} aria-label="Project numbers" onMouseLeave={() => setHovered(null)} onKeyDown={event => { if (event.key === "Escape") { setPinned(null); setHovered(null); setFocused(null); } }}>
    {facts.map((fact, index) => <details key={fact.title} open={active === index} onMouseEnter={() => setHovered(index)} onFocus={() => setFocused(index)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocused(null); }}>
      <summary onClick={event => { event.preventDefault(); const next = pinned === index ? null : index; setPinned(next); if (next === null) { setHovered(null); setFocused(null); } }}><span>{fact.value}</span><strong>{fact.title}</strong></summary><p>{fact.detail}</p>
    </details>)}
  </div>;
}
