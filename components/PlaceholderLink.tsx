"use client";

import type { ReactNode } from "react";

let toastTimer: ReturnType<typeof setTimeout> | undefined;

function showToast(msg: string) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.setAttribute("role", "status");
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el!.classList.remove("show"), 1800);
}

/** Renders a real link when href is set in lib/site.ts, a toast otherwise. */
export default function PlaceholderLink({
  href,
  className,
  children,
}: {
  href: string | null;
  className?: string;
  children: ReactNode;
}) {
  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        className={className}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      className={className}
      href="#"
      onClick={(e) => {
        e.preventDefault();
        showToast("PLACEHOLDER — set this link in lib/site.ts");
      }}
    >
      {children}
    </a>
  );
}
