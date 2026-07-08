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

const siteUrl = "https://enrictrillo.com";
const title = "Enric Trillo — Senior Fullstack Engineer · London / Remote";
const description =
  "Senior fullstack engineer. I take software from idea to production end to end — interface to infrastructure, plus the cloud and intelligence layers on top. Available for Outside IR35 engagements from Q3 2026.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "enric.trillo",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0B0F",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Enric Trillo",
  url: siteUrl,
  jobTitle: "Senior Fullstack Engineer",
  description,
  address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  sameAs: [
    "https://www.linkedin.com/in/enrictrillo/",
    "https://github.com/phugadev",
    "https://x.com/phugadev",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${archivo.variable} ${ibmPlexMono.variable} ${silkscreen.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
