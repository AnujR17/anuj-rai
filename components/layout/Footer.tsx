import { Container } from "@/components/ui/Container";
import { Body } from "@/components/ui/Typography";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-900 py-12">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Body className="text-sm">
          © {new Date().getFullYear()} Designer. All rights reserved.
        </Body>
        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <Link href="/contact" className="hover:text-zinc-100 transition-colors">Contact</Link>
          <a href="#" className="hover:text-zinc-100 transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-zinc-100 transition-colors">Twitter</a>
        </div>
      </Container>
    </footer>
  );
}
