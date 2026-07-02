import type { Metadata, Viewport } from "next";
import PixelField from "@/components/PixelField";
import "./globals.css";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&family=Silkscreen:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PixelField />
        <div className="wrap">{children}</div>
      </body>
    </html>
  );
}
