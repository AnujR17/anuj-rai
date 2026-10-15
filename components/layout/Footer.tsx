import Link from "next/link";
import { contact } from "@/data/contact";

export function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Anuj Rai</p>
      <div className="site-footer-links">
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <a href={contact.github}>GitHub</a>
      </div>
    </footer>
  );
}
