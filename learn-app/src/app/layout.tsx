import type { Metadata, Viewport } from "next";
import { Fredoka, Manrope, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";

// Display headings — playful, rounded.
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

// UI + body text.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// Dense educational reading (opt-in via .reading).
const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Enchiridion",
  description:
    "A 3D-first learning app for prehistory and other visually complex topics. Start with the Spinosaurus lesson.",
};

export const viewport: Viewport = {
  themeColor: "#e8fbf8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${manrope.variable} ${atkinson.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
