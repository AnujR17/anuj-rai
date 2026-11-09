import type { ReactNode } from "react";
import styles from "./device-mockup.module.css";

export type DeviceVariant = "laptop" | "desktop";

export function DeviceFrame({ children, variant = "laptop" }: { children: ReactNode; variant?: DeviceVariant }) {
  return <div className={styles.device} data-device={variant}>
    <div className={styles.display}><div className={styles.screen}>{children}</div></div>
    {variant === "laptop" ? <div className={styles.deck} aria-hidden="true"><span /></div> : <div className={styles.stand} aria-hidden="true"><span /><div /></div>}
  </div>;
}
