import Link from "next/link";
import { contact } from "@/data/contact";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Anuj Rai</p>
      <div className="site-footer-links">
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <a href={contact.github}>GitHub<ArrowUpRight size={12} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
