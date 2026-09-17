"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Soft desktop-only phosphor glow that trails the pointer.
 * Implemented as a fixed-size layer moved with `transform` (GPU-composited)
 * instead of repainting a full-viewport gradient on every pointer frame.
 */
export function CursorGlow() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const springX = useSpring(x, { stiffness: 120, damping: 26, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 120, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-[-360px] top-[-360px] z-[5] hidden h-[720px] w-[720px] rounded-full md:block"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, rgba(143,255,74,0.09), rgba(255,61,129,0.035) 45%, transparent 70%)",
      }}
    />
  );
}