import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const monoFont = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Srijit Banerjee // AI/ML, Systems & Research",
  description:
    "Personal portfolio of Srijit Banerjee — Integrated M.Tech CSE student at VIT Vellore. Exploring predictive maintenance transformers, backend architectures, and computational systems.",
  keywords: [
    "Srijit Banerjee",
    "VIT Vellore",
    "Machine Learning",
    "Predictive Maintenance",
    "Transformers",
    "FastAPI",
    "TypeScript",
    "Backend Engineer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sansFont.variable} ${monoFont.variable} scroll-smooth`}>
      <body className="bg-[#020204] text-slate-200 font-sans antialiased selection:bg-orange-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}