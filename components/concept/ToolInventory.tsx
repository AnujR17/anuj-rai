"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { EaseIn } from "@/components/motion/Entrance";
import { toolGroups, type Tool } from "@/data/tools";
import styles from "./SkillsTools.module.css";

type ActiveTool = { tool: Tool; category: string; anchor: HTMLButtonElement };

export function ToolInventory() {
  const [active, setActive] = useState<ActiveTool | null>(null);
  const tooltipId = useId();
  const tooltip = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keepOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const closeSoon = () => {
    keepOpen();
    closeTimer.current = setTimeout(() => {
      if (document.activeElement !== active?.anchor) setActive(null);
    }, 160);
  };

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useLayoutEffect(() => {
    if (!active || !tooltip.current) return;
    const place = () => {
      const panel = tooltip.current;
      if (!panel) return;
      const anchor = active.anchor.getBoundingClientRect();
      const { width, height } = panel.getBoundingClientRect();
      const left = Math.max(16, Math.min(anchor.left + anchor.width / 2 - width / 2, window.innerWidth - width - 16));
      const top = anchor.top >= height + 22 ? anchor.top - height - 6 : anchor.bottom + 6;
      panel.style.left = `${left}px`;
      panel.style.top = `${Math.max(16, Math.min(top, window.innerHeight - height - 16))}px`;
    };
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") { keepOpen(); setActive(null); }
    };
    const outside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!active.anchor.contains(target) && !tooltip.current?.contains(target)) {
        keepOpen();
        setActive(null);
      }
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, [active]);

  return <>
    <div className={styles.inventory}>
      {toolGroups.map(group => <EaseIn key={group.id}>
        <section className={styles.group} aria-labelledby={`tools-${group.id}`}>
          <h3 id={`tools-${group.id}`}>{group.title}</h3>
          <ul>{group.tools.map(tool => <li key={tool.name}>
            <button type="button" className={styles.tool} aria-label={`${tool.name}, ${group.title}${tool.exploring ? ", currently exploring" : ""}`} aria-describedby={active?.tool === tool ? tooltipId : undefined}
              onPointerEnter={event => {
                if (event.pointerType === "mouse") { keepOpen(); setActive({ tool, category: group.title, anchor: event.currentTarget }); }
              }}
              onPointerLeave={event => { if (event.pointerType === "mouse" && document.activeElement !== event.currentTarget) closeSoon(); }}
              onFocus={event => {
                if (event.currentTarget.matches(":focus-visible")) { keepOpen(); setActive({ tool, category: group.title, anchor: event.currentTarget }); }
              }}
              onBlur={closeSoon}
              onClick={event => {
                keepOpen();
                setActive(active?.tool === tool ? null : { tool, category: group.title, anchor: event.currentTarget });
              }}>
              <Image src={`/icons/tools/mono/${tool.icon}.svg`} alt="" width={28} height={28} />
            </button>
          </li>)}</ul>
        </section>
      </EaseIn>)}
    </div>
    {active && createPortal(
      <div ref={tooltip} id={tooltipId} role="tooltip" className={styles.tooltip} onPointerEnter={keepOpen} onPointerLeave={closeSoon}>
        <strong>{active.tool.name}</strong>
        <span>{active.category}</span>
        {active.tool.exploring && <span className={styles.status}>Currently exploring</span>}
      </div>, document.body,
    )}
  </>;
}
