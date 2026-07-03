"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "capstones", label: "CAPSTONES" },
  { id: "work",      label: "CREDS"     },
  { id: "stack",     label: "STACK"     },
  { id: "log",       label: "LOG"       },
  { id: "contact",   label: "CONTACT"   },
];

export default function NavLinks() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen]     = useState(false);

  useEffect(() => {
    const els = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

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

  /* Close mobile menu on first scroll after open */
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [open]);

  const links = SECTIONS.map((s) => (
    <a
      key={s.id}
      href={`#${s.id}`}
      className={active === s.id ? "active" : undefined}
      onClick={() => setOpen(false)}
    >
      {s.label}
    </a>
  ));

  return (
    <>
      {/* Desktop */}
      <nav className="links" aria-label="Primary">
        {links}
      </nav>

      {/* Hamburger toggle — visible on mobile only */}
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile dropdown */}
      <div className={`mobile-nav${open ? " open" : ""}`} aria-hidden={!open}>
        {links}
      </div>
    </>
  );
}
