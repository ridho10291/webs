"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const RAIL_SECTIONS = [
  { id: "hero", label: "hero.tsx" },
  { id: "about", label: "about()" },
  { id: "skills", label: "stack()" },
  { id: "projects", label: "projects[]" },
  { id: "certificates", label: "certificates[]" },
  { id: "guestbook", label: "guestbook{}" },
  { id: "contact", label: "contact()" },
];

export function ScrollProgress() {
  const [active, setActive] = useState(RAIL_SECTIONS[0]);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Caret rides the compiled line: keep the glowing block + label in viewport.
  const caretY = useTransform(progress, (v) => {
    const clamped = Math.min(0.97, Math.max(0.03, v));
    return `calc(${(clamped * 100).toFixed(3)}% - 11px)`;
  });

  useEffect(() => {
    const detect = () => {
      const pos = window.scrollY + window.innerHeight * 0.35;
      for (const s of RAIL_SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (pos >= top && pos < bottom) {
          setActive(s);
          break;
        }
      }
    };
    detect();
    window.addEventListener("scroll", detect, { passive: true });
    window.addEventListener("resize", detect, { passive: true });
    return () => {
      window.removeEventListener("scroll", detect);
      window.removeEventListener("resize", detect);
    };
  }, []);

  return (
    <>
      {/* Top hairline: overall compile progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-[#8fff4a] shadow-[0_0_10px_rgba(143,255,74,0.7)]"
        style={{ scaleX: progress }}
      />

      {/* Left-edge compiler rail (desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-0 z-[55] hidden w-9 lg:block"
      >
        {/* Track */}
        <div className="absolute inset-y-0 left-[17px] w-px bg-[#1d2a24]" />
        {/* Fill */}
        <motion.div
          className="absolute left-[17px] top-0 w-px origin-top bg-[#8fff4a]/40 shadow-[0_0_6px_rgba(143,255,74,0.4)]"
          style={{ height: progress }}
        />
        {/* The caret row riding scroll */}
        <motion.div
          style={{ top: caretY }}
          className="absolute left-0 flex items-center gap-1.5 pl-[10px]"
        >
          <span className="block h-[18px] w-[9px] bg-[#8fff4a] shadow-[0_0_12px_rgba(143,255,74,0.9)]" />
          <span className="flex items-center gap-1 whitespace-nowrap rounded-sm border border-[#1d2a24] bg-[#05060a]/90 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.08em] text-[#8fff4a]">
            ▸ {active.label}
          </span>
        </motion.div>
      </div>
    </>
  );
}