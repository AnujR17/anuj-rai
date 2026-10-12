"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const navItems = [
  { path: "/work", label: "Work" },
  { path: "/about", label: "About" },
  { path: "/notes", label: "Notes" },
  { path: "/contact", label: "Contact" },
];
export function Navbar() {
  const pathname = usePathname();
  return <header className="site-header">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <nav aria-label="Main navigation" className="site-nav">
      <Link href="/" className="site-wordmark" aria-label="Anuj Rai — home">Anuj Rai</Link>
      <div className="site-nav-links">{navItems.map(item => <Link key={item.path} href={item.path} aria-current={pathname === item.path || pathname.startsWith(item.path + "/") ? "page" : undefined}>{item.label}</Link>)}</div>
    </nav>
  </header>;
}
