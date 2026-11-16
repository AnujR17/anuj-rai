import type { ReactNode } from "react";
import styles from "./device-mockup.module.css";

export type DeviceVariant = "laptop" | "desktop" | "browser";

export function DeviceFrame({ children, variant = "laptop" }: { children: ReactNode; variant?: DeviceVariant }) {
  return <div className={styles.device} data-device={variant}>
    <div className={styles.display}>
      {variant === "browser" && <div className={styles.browserBar} aria-hidden="true"><span>Agent Desk</span></div>}
      <div className={styles.screen}>{children}</div>
    </div>
    {variant === "laptop" ? <div className={styles.deck} aria-hidden="true"><span /></div> : variant === "desktop" ? <div className={styles.stand} aria-hidden="true"><span /><div /></div> : null}
  </div>;
}
