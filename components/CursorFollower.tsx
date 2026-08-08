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
        size: 6 + Math.random() * 4,
        color: Math.random() > 0.5 ? "var(--primary)" : "var(--accent)",
      });
      if (trailsRef.current.length > 30) trailsRef.current.shift();
    };

    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("mouseleave", handleLeave);

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.3;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.3;
      setPos({ x: currentRef.current.x, y: currentRef.current.y });

      trailsRef.current = trailsRef.current.map(t => ({
        ...t,
        life: t.life - 0.05,
        size: t.size * 0.96,
      })).filter(t => t.life > 0 && t.size > 0.5);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current!);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <>
      {visible && (
        <motion.div
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%)",
          }}
          className="cursor-wrapper"
        >
          {/* Trails */}
          {trailsRef.current.map((trail, i) => (
            <motion.div
              key={i}
              className="cursor-trail"
              style={{
                left: trail.x - pos.x,
                top: trail.y - pos.y,
                width: trail.size,
                height: trail.size,
                background: trail.color,
                opacity: trail.life * 0.6,
              }}
              initial={{ scale: 0, opacity: trail.life }}
              animate={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          ))}

          {/* Outer glow ring */}
          <motion.div
            className="cursor-glow"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: clicking ? 2.5 : 1.8,
              opacity: clicking ? 0.15 : 0.08,
            }}
            transition={{ duration: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
          />

          {/* Middle ring */}
          <motion.div
            className="cursor-ring"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: clicking ? 1.5 : 1,
              opacity: clicking ? 0.5 : 0.3,
              borderColor: clicking ? "var(--secondary)" : "var(--primary)",
            }}
            transition={{ duration: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          />

          {/* Core dot */}
          <motion.div
            className="cursor-dot"
            initial={{ scale: 0 }}
            animate={{
              scale: clicking ? 0.5 : 1,
              rotate: clicking ? 45 : 0,
              boxShadow: clicking
                ? "0 0 30px var(--secondary), 0 0 60px var(--secondary)"
                : "0 0 20px var(--primary), 0 0 40px var(--primary)",
            }}
            transition={{ duration: 0.08, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </motion.div>
      )}
      <style jsx global>{`
        .cursor-wrapper {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
        }
        .cursor-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          pointer-events: none;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
          will-change: transform, box-shadow;
        }
        .cursor-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid var(--primary);
          pointer-events: none;
          transform: translate(-50%, -50%);
          will-change: transform, opacity, border-color;
          transition: border-color 0.1s ease;
        }
        .cursor-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
          pointer-events: none;
          transform: translate(-50%, -50%);
          will-change: transform, opacity;
        }
        .cursor-trail {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
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