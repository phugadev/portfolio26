"use client";

import { useEffect, useRef } from "react";
import { wavelengthHex, type BandKey } from "@/lib/site";

const HUES = Object.values(wavelengthHex);
const ORDER: BandKey[] = ["590", "520", "470", "405"];

/** Stepped-tint pixel word with a periodic glitch every `intervalMs`. */
export default function GlitchWord({
  word,
  intervalMs = 7000,
}: {
  word: string;
  intervalMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const letters = Array.from(el.querySelectorAll<HTMLSpanElement>("span"));
    let glitching = false;
    let iv: ReturnType<typeof setInterval> | undefined;

    function restingColor(i: number) {
      const per = letters.length / ORDER.length;
      return wavelengthHex[ORDER[Math.min(ORDER.length - 1, Math.floor(i / per))]];
    }

    function glitch() {
      if (glitching || document.hidden) return;
      glitching = true;
      let tick = 0;
      const g = setInterval(() => {
        letters.forEach((s) => {
          if (Math.random() < 0.4) {
            s.style.transform = `translate(${(Math.random() * 4 - 2).toFixed(1)}px, ${(Math.random() * 4 - 2).toFixed(1)}px)`;
            s.style.color = HUES[Math.floor(Math.random() * HUES.length)];
          }
        });
        if (++tick >= 5) {
          clearInterval(g);
          letters.forEach((s, i) => {
            s.style.transform = "";
            s.style.color = restingColor(i);
          });
          glitching = false;
        }
      }, 55);
    }

    const boot = setTimeout(glitch, 900);
    iv = setInterval(glitch, intervalMs);
    return () => {
      clearTimeout(boot);
      if (iv) clearInterval(iv);
    };
  }, [intervalMs]);

  const per = word.length / ORDER.length;

  return (
    <span className="pix" ref={ref} aria-label={word.toLowerCase()}>
      {word.split("").map((c, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ color: wavelengthHex[ORDER[Math.min(ORDER.length - 1, Math.floor(i / per))]] }}
        >
          {c}
        </span>
      ))}
    </span>
  );
}
