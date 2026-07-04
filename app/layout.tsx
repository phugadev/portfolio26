import type { Metadata, Viewport } from "next";
import { Anton, Archivo, IBM_Plex_Mono, Silkscreen } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const archivo = Archivo({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Enric Trillo — Senior Fullstack Engineer · London / Remote",
  description:
    "Senior fullstack engineer. I take software from idea to production end to end — interface to infrastructure, plus the cloud and intelligence layers on top. Available for Outside IR35 engagements from Q3 2026.",
};

export const viewport: Viewport = {
  themeColor: "#0A0B0F",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${archivo.variable} ${ibmPlexMono.variable} ${silkscreen.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
