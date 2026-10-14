"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function Navbar() {
  const path = usePathname();
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Anuj, home">
        Anuj<span>.</span>
      </Link>
      <nav aria-label="Main navigation">
        {[
          ["/work/", "Work"],
          ["/about/", "About"],
          ["/resume/", "Résumé"],
          ["/contact/", "Contact"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={
              path.replace(/\/$/, "").startsWith(href.replace(/\/$/, ""))
                ? "page"
                : undefined
            }
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
