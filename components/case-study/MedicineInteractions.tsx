"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { setupScreens, type MedicineDeviceImage } from "@/data/medicine-screens";

export function StaticMedicineScreen({ screen, sizes = "(max-width: 700px) 85vw, 320px" }: { screen: MedicineDeviceImage; sizes?: string }) {
  return <Image className="lf-static-device" src={screen.mockup} width={screen.width ?? 540} height={screen.height ?? 900}
    alt={screen.alt} sizes={sizes} />;
}

export function MedicineGallery() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { const node = dialog.current; return () => node?.close(); }, []);

  return <>
    <div className="lf-design-gallery" data-active={active} aria-label="Prescription setup screens">
      {setupScreens.map((screen, index) => <button type="button" key={screen.id} className="lf-gallery-item" aria-pressed={active === index}
        ref={element => { buttons.current[index] = element; }} onClick={() => setActive(index)}
        onKeyDown={event => {
          let next = index;
          if (event.key === "ArrowRight") next = (index + 1) % setupScreens.length;
          else if (event.key === "ArrowLeft") next = (index + setupScreens.length - 1) % setupScreens.length;
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = setupScreens.length - 1;
          else return;
          event.preventDefault(); setActive(next); buttons.current[next]?.focus({ preventScroll: true });
        }}>
        <span className="lf-gallery-visual"><StaticMedicineScreen screen={screen} /></span><span>{screen.title}</span>
      </button>)}
    </div>
    <div className="lf-decision-copy" aria-live="polite"><h3>{setupScreens[active].title}</h3><p>{setupScreens[active].reason}</p><div className="lf-screen-links"><a href={setupScreens[active].source} aria-haspopup="dialog" onClick={event => { event.preventDefault(); dialog.current?.showModal(); }}>View screen full size</a><a href={setupScreens[active].figma}>View in Figma</a></div></div>
    <dialog ref={dialog} className="lf-image-dialog lf-modal" aria-label={`${setupScreens[active].title} screen`} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <button type="button" onClick={() => dialog.current?.close()}>Close image</button>
      <Image src={setupScreens[active].source} alt={setupScreens[active].alt} width={402} height={874} sizes="(max-width: 700px) 90vw, 402px" />
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
    <div className="lf-architecture-heading"><div><h3>From ideas to structure</h3><p>The information architecture brought prescription setup, daily records and family support into one flow.</p></div><button type="button" onClick={() => dialog.current?.showModal()}>Inspect structure</button></div>
    <InformationStructure />
    <a className="lf-board-link" href="https://www.figma.com/board/koDyOWomvBVtTlFdbcpNfD/Meditimer---IA--User-Flow">View the information architecture in FigJam</a>
    <dialog ref={dialog} className="lf-structure-dialog lf-modal" aria-labelledby="medicine-structure-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}><div className="lf-dialog-heading"><h2 id="medicine-structure-title">Proposed information structure</h2><button type="button" onClick={() => dialog.current?.close()}>Close structure</button></div><InformationStructure /></dialog>
  </>;
}

const facts = [
  { value: "3", title: "Weeks", detail: "The duration of this individual app design project." },
  { value: "24", title: "Survey responses", detail: "Responses to the Meditimer medicine-routine survey." },
  { value: "7", title: "Interviews", detail: "Some interview participants also completed the survey, so the two counts overlap." },
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
