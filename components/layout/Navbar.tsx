"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { path: "/work", label: "Work" },
  { path: "/about", label: "About" },
  { path: "/resume", label: "Resume" },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <nav aria-label="Main navigation" className="site-nav">
        <div className="site-nav-links">
          {navItems.map(item => {
            const active = pathname === item.path || pathname.startsWith(`${item.path}/`);
            return <Link key={item.path} href={item.path} aria-current={active ? "page" : undefined}>{item.label}</Link>;
          })}
        </div>
      </nav>
    </header>
  );
}
