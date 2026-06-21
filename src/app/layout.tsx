import type { Metadata } from "next";
import { Nunito, Inter, Fredoka } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Rounded, friendly display sans for marketing/parent-facing surfaces — warm and
// characterful (Albert / hejalbert.se vibe), not corporate.
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TeachMore — Learn. Play. Grow.",
  description: "Playful maths, literacy and science for children ages 5–20, with a clear progress dashboard for parents and teachers. Free for eligible families.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${inter.variable} ${fredoka.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
