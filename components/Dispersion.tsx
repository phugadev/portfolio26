"use client";

import { useState } from "react";
import { wavelengths, type Wavelength } from "@/lib/site";

/* fixed geometry: beam → prism → four bands (980-wide space so labels never clip) */
const START_Y = [72, 76, 80, 84];
const END_Y = [84, 112, 140, 168];
const LINE_END_X = 740;
const LABEL_X = 752;

export default function Dispersion() {
  const [active, setActive] = useState<Wavelength | null>(null);
  const [locked, setLocked] = useState<Wavelength | null>(null);
  const shown = locked ?? active;

  const on = (w: Wavelength) => setActive(w);
  const off = () => setActive(null);
  const toggleLock = (w: Wavelength) =>
    setLocked((cur) => (cur?.nm === w.nm ? null : w));

  return (
    <div className="legend-frame rv in">
      <div className="legend-head">
        <span>FIG. 01 — OPERATING SPECTRUM</span>
        <span>1 ENGINEER → 4 WAVELENGTHS</span>
      </div>
      <div className={shown ? "legend dimming" : "legend"} style={{ padding: 0 }}>
        <svg
          viewBox="0 0 980 200"
          role="img"
          aria-label="Schematic: one beam split by a prism into four labelled wavelengths — interface, systems, cloud, intelligence"
        >
          <line className="beam-in" x1="20" y1="64" x2="330" y2="64" />
          <text className="fig-label" x="20" y="50" fill="var(--ink-faint)">
            RAW PROBLEM
          </text>
          <path className="prism" d="M356 30 L396 98 L316 98 Z" />
          {wavelengths.map((w, i) => (
            <g
              key={w.nm}
              className={`band${shown?.nm === w.nm ? " on" : ""}`}
              tabIndex={0}
              role="button"
              aria-pressed={locked?.nm === w.nm}
              onMouseEnter={() => on(w)}
              onMouseLeave={off}
              onFocus={() => on(w)}
              onBlur={off}
              onClick={() => toggleLock(w)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleLock(w);
                }
              }}
            >
              <line
                x1={380}
                y1={START_Y[i]}
                x2={LINE_END_X}
                y2={END_Y[i]}
                stroke={w.cssVar}
                strokeWidth={1.5}
              />
              <text x={LABEL_X} y={END_Y[i] + 4} fill={w.cssVar}>
                {w.nm} · {w.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <p className="legend-read">
        {shown ? (
          <>
            <b style={{ color: shown.cssVar }}>
              {shown.nm} — {shown.name}.
            </b>{" "}
            {shown.aug && (
              <span className="aug-chip" style={{ color: shown.cssVar }}>
                AUG
              </span>
            )}{" "}
            {shown.copy}
          </>
        ) : (
          <>
            Hover a wavelength — click to pin. Every project on this site is tagged by
            the bands it exercises: which layers, not how many percent.
          </>
        )}
      </p>
    </div>
  );
}
