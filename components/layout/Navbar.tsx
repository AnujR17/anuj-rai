"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/utils/cn";
import { Container } from "@/components/ui/Container";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Work" },
  { path: "/resume", label: "Resume" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf9]/80 backdrop-blur-md border-b border-stone-200">
      <Container>
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="text-stone-900 font-medium tracking-tight hover:text-stone-500 transition-colors">
            Anuj Rai
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== "/" && pathname?.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-stone-900",
                    isActive ? "text-stone-900" : "text-stone-400"
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
