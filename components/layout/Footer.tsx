import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 py-8">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-stone-400">
          © {new Date().getFullYear()} Anuj Rai
        </p>
        <div className="flex items-center gap-6 text-sm text-stone-400">
          <a href="#" className="hover:text-stone-900 transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-stone-900 transition-colors">GitHub</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Behance</a>
        </div>
      </Container>
    </footer>
  );
}
