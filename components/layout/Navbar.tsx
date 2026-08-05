"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/utils/cn";
import { Container } from "@/components/ui/Container";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Selected Work" },
  { path: "/about", label: "About" },
  { path: "/resume", label: "Resume" },
  { path: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-900">
      <Container>
        <nav className="flex items-center justify-between h-20">
          <Link href="/" className="text-zinc-100 font-medium tracking-tight hover:text-zinc-300 transition-colors">
            Portfolio
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== "/" && pathname?.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-zinc-100",
                    isActive ? "text-zinc-100" : "text-zinc-500"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </Container>
    </header>
  );
}
