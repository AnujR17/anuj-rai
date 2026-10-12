import Link from "next/link";
import { contact } from "@/data/contact";
export function Footer() {
  return <footer className="site-footer"><div className="site-footer-inner"><p>© {new Date().getFullYear()} Anuj Rai</p><div className="site-footer-links"><Link href="/resume">Resume</Link><Link href="/contact">Contact</Link><a href={contact.github}>GitHub</a><a href={"mailto:" + contact.email}>Email</a></div></div></footer>;
}
