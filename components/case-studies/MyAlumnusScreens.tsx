"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./myalumnus.module.css";

const screens = [
  { id: "record", label: "Visitor record", title: "Put the evidence beside the decision.", copy: "A photo, programme, and batch help the guard compare the person with the record. Approve, Deny, and Put on hold sit together; the purpose field is optional.", file: "guard-record.png", height: 860, alt: "Sample visitor Neha Joshi’s record, with a large verification photo, batch and programme, an optional purpose field, and three decision buttons." },
  { id: "same-name", label: "Same name", title: "Ask before choosing.", copy: "When two records share a name, the guard asks for the batch and department before selecting. A search match is a candidate, not proof of identity.", file: "same-name.png", height: 860, alt: "Two sample visitors with the same name shown as separate records, with instructions to ask their batch and department first." },
  { id: "spelling", label: "Close spellings", title: "Keep a typo from becoming a dead end.", copy: "If an exact search finds nobody, close spellings offer another way to look. The guard still checks the visitor’s details; the system never automatically approves a similar name.", file: "close-spellings.png", height: 860, alt: "Close-spelling search results with candidate names, photos, batch details, and a reminder to ask the batch and department." },
  { id: "hold", label: "On hold", title: "Make the next person and action clear.", copy: "The host’s number, a visible deadline, and words to tell the visitor keep a hold actionable. If the host cannot confirm, the guard can pass the case to an admin.", file: "hold-host.png", height: 1052, alt: "Held visitor screen showing the host call, deadline, guidance for the visitor, and actions to approve, deny, pass to admin, or record that the visitor left." },
  { id: "admin", label: "Admin decision", title: "Carry the context through the handoff.", copy: "The admin receives the reason for the hold, host details, and a timestamped case trail. A denial needs a note so the record explains what happened.", file: "admin-decision.png", height: 860, alt: "Admin escalation screen with a sample visitor’s reason for being held, host contact, case timeline, and approve and deny actions." },
] as const;

export function MyAlumnusScreens() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % screens.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + screens.length) % screens.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = screens.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className={styles.explorer}>
      <div className={styles.tabs} role="tablist" aria-label="Explore MyAlumnus screens">
        {screens.map((screen, index) => (
          <button key={screen.id} ref={(node) => { tabs.current[index] = node; }} type="button" role="tab" id={`screen-tab-${screen.id}`} aria-selected={selected === index} aria-controls={`screen-panel-${screen.id}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => onKeyDown(event, index)}>{screen.label}</button>
        ))}
      </div>
      {screens.map((screen, index) => (
        <div key={screen.id} role="tabpanel" id={`screen-panel-${screen.id}`} aria-labelledby={`screen-tab-${screen.id}`} tabIndex={0} hidden={selected !== index}>
          <div className={styles.screenContext}><h3>{screen.title}</h3><p>{screen.copy}</p></div>
          <figure className={styles.explorerFigure}>
            <a href={`/portfolio/myalumnus/${screen.file}`} aria-label={`${screen.label}: view full-size screenshot`}>
              <Image src={`/portfolio/myalumnus/${screen.file}`} width={1280} height={screen.height} alt={screen.alt} sizes="(max-width: 700px) 90vw, 1000px" />
            </a>
            <figcaption>Final demo screen · Fictional campus and visitor data <a href={`/portfolio/myalumnus/${screen.file}`}>View full size <ArrowUpRight size={13} aria-hidden="true" /></a></figcaption>
          </figure>
        </div>
      ))}
    </div>
  );
}
