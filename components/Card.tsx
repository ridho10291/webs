"use client";
import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";

export function SpotlightCard({
  children,
  className = "",
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`bento-card group relative overflow-hidden ${className}`}
    >
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.06) 0%, transparent 55%)",
          }}
        />
      )}
      {children}
    </div>
  );
}