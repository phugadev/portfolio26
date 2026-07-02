"use client";

import { useEffect, useRef } from "react";
import { wavelengthHex } from "@/lib/site";

const HUES = Object.values(wavelengthHex);
const GAP = 26;
const DOT = 1.5;

interface Spark {
  x: number;
  y: number;
  hue: string;
  t: number;
  life: number;
}

export default function PixelField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, cols = 0, rows = 0;
    let sparks: Spark[] = [];
    let raf = 0;

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cv!.width = W * dpr;
      cv!.height = H * dpr;
      cv!.style.width = `${W}px`;
      cv!.style.height = `${H}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / GAP);
      rows = Math.ceil(H / GAP);
    }

    function base() {
      ctx!.clearRect(0, 0, W, H);
      ctx!.fillStyle = "rgba(235,237,244,0.045)";
      for (let x = 0; x < cols; x++)
        for (let y = 0; y < rows; y++)
          ctx!.fillRect(x * GAP + GAP / 2, y * GAP + GAP / 2, DOT, DOT);
    }

    function spawn() {
      if (sparks.length < 7 && Math.random() < 0.06) {
        sparks.push({
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows),
          hue: HUES[Math.floor(Math.random() * HUES.length)],
          t: 0,
          life: 140 + Math.random() * 140,
        });
      }
    }

    function frame() {
      base();
      spawn();
      sparks = sparks.filter((s) => {
        s.t++;
        const p = s.t / s.life;
        ctx!.fillStyle = s.hue;
        ctx!.globalAlpha = Math.sin(Math.PI * p) * 0.5;
        ctx!.fillRect(s.x * GAP + GAP / 2 - 1.5, s.y * GAP + GAP / 2 - 1.5, 4.5, 4.5);
        ctx!.globalAlpha = 1;
        return s.t < s.life;
      });
      raf = requestAnimationFrame(frame);
    }

    size();
    const onResize = () => {
      size();
      if (reduced) base();
    };
    window.addEventListener("resize", onResize);

    if (reduced) base();
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas id="field" ref={ref} aria-hidden="true" />;
}
