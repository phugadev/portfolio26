"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: ReactNode;
  as?: "div" | "article" | "section";
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AnyTag = Tag as any;
  return (
    <AnyTag ref={ref} className={`rv ${className}`.trim()} style={style}>
      {children}
    </AnyTag>
  );
}
