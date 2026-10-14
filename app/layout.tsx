import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
const dm = localFont({
  src: [
    { path: "../public/fonts/dm-sans-400.ttf", weight: "400" },
    { path: "../public/fonts/dm-sans-500.ttf", weight: "500" },
    { path: "../public/fonts/dm-sans-600.ttf", weight: "600" },
    { path: "../public/fonts/dm-sans-700.ttf", weight: "700" },
  ],
  variable: "--font-dm",
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: "Anuj — Interaction design & prototypes",
    template: "%s — Anuj",
  },
  description:
    "I’m Anuj. I design interactions and build prototypes, drawing on my background in computer science.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={dm.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
