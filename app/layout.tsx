import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortfolioCursor } from "@/components/motion/PortfolioCursor";
import { NavigationProgress } from "@/components/motion/NavigationProgress";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anuj Rai | Interaction Design",
  description: "Anuj Rai is an interaction designer exploring digital interfaces, connected objects, and working prototypes. Explore selected projects, experiments, and case studies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main id="main-content" className="flex-1 flex flex-col relative z-0">
          {children}
        </main>
        <Footer />
        <PortfolioCursor />
        <NavigationProgress />
      </body>
    </html>
  );
}
