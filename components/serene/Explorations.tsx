"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { explorations } from "@/data/explorations";
import { ScribbleAccent } from "./ScribbleAccent";
export function Explorations() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected !== null && !dialog.current?.open) dialog.current?.showModal();
  }, [selected]);
  const item = selected === null ? null : explorations[selected];
  return (
    <section
      className={`explorations-section section-pad ${explorations.length ? "" : "explorations-compact"}`}
      id="explorations"
    >
      <div className="section-heading">
        <h2>Experiments & explorations.</h2>
        <p>Smaller projects in physical computing and spatial interaction.</p>
      </div>
      {explorations.length ? (
        <div className="exploration-gallery">
          {explorations.map((e, n) => (
            <figure key={e.id}>
              <button
                className="exploration-image"
                type="button"
                aria-haspopup="dialog"
                aria-label={`Enlarge ${e.title}`}
                onClick={() => setSelected(n)}
              >
                <Image
                  src={e.image.src}
                  alt={e.image.alt}
                  width={e.image.width}
                  height={e.image.height}
                />
                <span aria-hidden="true">↗</span>
              </button>
              <figcaption>
                <h3>{e.title}</h3>
                <p>{e.caption}</p>
                {e.credit && <small>{e.credit}</small>}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="exploration-note">
          <ScribbleAccent kind="loop" />
          <div>
            <p>
              Dustbin experiments.
              <br />
              AR & VR explorations.
            </p>
            <span>Images and project notes coming soon.</span>
          </div>
        </div>
      )}
      <dialog
        ref={dialog}
        className="exploration-dialog"
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="dialog-close"
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="Close image"
        >
          <X size={20} />
        </button>
        {item && (
          <figure>
            <Image
              src={item.image.src}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
            />
            <figcaption>
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
              {item.credit && <small>{item.credit}</small>}
            </figcaption>
          </figure>
        )}
      </dialog>
    </section>
  );
}
