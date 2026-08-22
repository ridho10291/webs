"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TrailPoint {
  x: number;
  y: number;
  life: number;
  size: number;
  color: string;
}

export function CursorFollower() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const trailsRef = useRef<TrailPoint[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      trailsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        size: 5 + Math.random() * 3,
        color: Math.random() > 0.5 ? "var(--primary)" : "var(--accent)",
      });
      if (trailsRef.current.length > 20) trailsRef.current.shift();
    };

    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);
    const handleLeave = () => setVisible(false);

    const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";
    const handleOver = (e: MouseEvent) => {
      setHovering(Boolean((e.target as HTMLElement).closest?.(INTERACTIVE)));
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseover", handleOver);

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (document.hidden) return;

      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;

      if (Math.abs(dx) < 0.4 && Math.abs(dy) < 0.4 && trailsRef.current.length === 0) return;

      currentRef.current.x += dx * 0.25;
      currentRef.current.y += dy * 0.25;
      setPos({ x: currentRef.current.x, y: currentRef.current.y });

      if (trailsRef.current.length > 0) {
        trailsRef.current = trailsRef.current.map(t => ({
          ...t,
          life: t.life - 0.06,
          size: t.size * 0.94,
        })).filter(t => t.life > 0 && t.size > 0.5);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current!);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseover", handleOver);
    };
  }, []);

  return (
    <>
      {visible && (
        <>
          {/* Core dot */}
          <motion.div
            className="cursor-dot"
            style={{ left: pos.x, top: pos.y }}
            initial={{ scale: 0 }}
            animate={{
              scale: clicking ? 0.6 : hovering ? 1.9 : 1,
              boxShadow: clicking
                ? "0 0 25px var(--secondary), 0 0 50px var(--secondary)"
                : hovering
                  ? "0 0 25px var(--accent), 0 0 45px var(--accent)"
                  : "0 0 15px var(--primary), 0 0 30px var(--primary)",
            }}
            transition={{ duration: 0.08, ease: [0.34, 1.56, 0.64, 1] }}
          />

          {/* Trails */}
          {trailsRef.current.map((trail, i) => (
            <motion.div
              key={i}
              className="cursor-trail"
              style={{
                left: trail.x,
                top: trail.y,
                width: trail.size,
                height: trail.size,
                background: trail.color,
                opacity: trail.life * 0.7,
              }}
              initial={{ scale: 0, opacity: trail.life }}
              animate={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          ))}
        </>
      )}
      <style jsx global>{`
        .cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
          will-change: transform, box-shadow;
        }
        .cursor-trail {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          mix-blend-mode: screen;
          will-change: transform, opacity, width, height;
        }
        a:hover, button:hover, [role="button"]:hover, input:hover, textarea:hover, select:hover, .group:hover {
          cursor: none;
        }
      `}</style>
    </>
  );
}