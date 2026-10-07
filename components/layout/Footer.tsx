import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { contact } from "@/data/contact";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 py-8">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-stone-600">
          © {new Date().getFullYear()} Anuj Rai
        </p>
        <div className="flex items-center gap-6 text-sm text-stone-600">
          <Link href="/about" className="hover:text-stone-900 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-stone-900 transition-colors">Contact</Link>
          <a href={contact.github} className="hover:text-stone-900 transition-colors">GitHub</a>
        </div>
      </Container>
    </footer>
  );
}
