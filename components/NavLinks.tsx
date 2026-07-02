"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "capstones", label: "CAPSTONES" },
  { id: "work", label: "WORK" },
  { id: "stack", label: "STACK" },
  { id: "log", label: "LOG" },
  { id: "contact", label: "CONTACT" },
];

export default function NavLinks() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="links" aria-label="Primary">
      {SECTIONS.map((s) => (
        <a key={s.id} href={`#${s.id}`} className={active === s.id ? "active" : undefined}>
          {s.label}
        </a>
      ))}
    </nav>
  );
}
