"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function PendingNavigation() {
  const [pending, setPending] = useState(false);
  useEffect(() => {
    let start = 0, stop = 0;
    const click = (event: MouseEvent) => {
      if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link || link.download || link.target === "_blank") return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      clearTimeout(start); clearTimeout(stop);
      start = window.setTimeout(() => setPending(true), 180);
      stop = window.setTimeout(() => setPending(false), 4500);
    };
    document.addEventListener("click", click, true);
    return () => { clearTimeout(start); clearTimeout(stop); document.removeEventListener("click", click, true); };
  }, []);
  return pending ? <div className="navigation-progress" role="status" aria-live="polite">Loading</div> : null;
}

export function NavigationProgress() {
  const pathname = usePathname();
  return <PendingNavigation key={pathname} />;
}
