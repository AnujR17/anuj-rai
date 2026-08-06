import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anuj Rai — Design & Research",
  description: "Design work rooted in research, systems thinking, and intentional execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col bg-[#fafaf9] text-[#1c1917] font-sans pt-20">
        <Navbar />
        <main className="flex-1 flex flex-col relative z-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
