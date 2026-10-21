import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAWJOBS — No-nonsense tech job board",
  description: "Brutally transparent job board: upfront salaries, no ghost jobs, 2-click apply.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Space+Grotesk:wght@400;500;700&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
