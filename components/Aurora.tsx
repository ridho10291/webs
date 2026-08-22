"use client";

import { useEffect, useRef, useState } from "react";

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
  opacity: number;
}

export function Aurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const orbsRef = useRef<Orb[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setEnabled(false);
      return;
    }

    const BRAND_HUES = [190, 205, 250, 275, 315, 330];

    const initOrbs = (): Orb[] => {
      const count = 6;
      const arr: Orb[] = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random(),
          y: Math.random(),
          vx: (Math.random() - 0.5) * 0.0008,
          vy: (Math.random() - 0.5) * 0.0008,
          size: 160 + Math.random() * 240,
          hue: BRAND_HUES[Math.floor(Math.random() * BRAND_HUES.length)] + (Math.random() - 0.5) * 15,
          opacity: 0.16 + Math.random() * 0.12,
        });
      }
      return arr;
    };

    orbsRef.current = initOrbs();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    canvas.addEventListener("mousemove", handleMove);

    let lastTime = 0;
    let frameCount = 0;
    const animate = (time: number) => {
      rafRef.current = requestAnimationFrame(animate);
      frameCount++;
      if (document.hidden || frameCount % 2 !== 0) return;

      const dt = Math.min(time - lastTime, 64);
      lastTime = time;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      orbsRef.current.forEach((orb) => {
        orb.x += orb.vx * dt;
        orb.y += orb.vy * dt;

        const dx = mouseRef.current.x - orb.x;
        const dy = mouseRef.current.y - orb.y;
        const distSq = dx * dx + dy * dy + 0.01;
        const force = Math.min(0.00008 / distSq, 0.0015);

        orb.vx += dx * force;
        orb.vy += dy * force;

        orb.vx *= 0.992;
        orb.vy *= 0.992;

        if (orb.x <= 0 || orb.x >= 1) orb.vx *= -0.8;
        if (orb.y <= 0 || orb.y >= 1) orb.vy *= -0.8;

        orb.x = Math.max(0.05, Math.min(0.95, orb.x));
        orb.y = Math.max(0.05, Math.min(0.95, orb.y));

        const gradient = ctx.createRadialGradient(
          orb.x * width, orb.y * height, 0,
          orb.x * width, orb.y * height, orb.size
        );
        gradient.addColorStop(0, `hsla(${orb.hue}, 85%, 60%, ${orb.opacity})`);
        gradient.addColorStop(0.4, `hsla(${orb.hue + 20}, 80%, 55%, ${orb.opacity * 0.4})`);
        gradient.addColorStop(1, `hsla(${orb.hue + 40}, 75%, 50%, 0)`);

        ctx.beginPath();
        ctx.arc(orb.x * width, orb.y * height, orb.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current!);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMove);
    };
  }, []);

  if (!enabled) {
    return (
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-cosmic" />
        <div className="absolute inset-0 bg-dots" />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 20% 20%, hsl(190 90% 55% / 0.09), transparent),
            radial-gradient(ellipse 60% 40% at 80% 80%, hsl(265 90% 60% / 0.08), transparent),
            radial-gradient(ellipse 40% 60% at 50% 50%, hsl(320 90% 60% / 0.05), transparent)
          `
        }} />
        <div className="absolute inset-0 bg-vignette" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.02%22/%3E%3C/svg%3E')]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      <div className="absolute inset-0 bg-cosmic" />
      <div className="absolute inset-0 bg-dots" />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--bg)_0%,_transparent_70%)]" />
      
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 20% 20%, hsl(190 90% 55% / 0.08), transparent),
          radial-gradient(ellipse 60% 40% at 80% 80%, hsl(265 90% 60% / 0.07), transparent),
          radial-gradient(ellipse 40% 60% at 50% 50%, hsl(320 90% 60% / 0.05), transparent)
        `
      }} />
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.02%22/%3E%3C/svg%3E')]" />
      <div className="absolute inset-0 bg-vignette" />
    </div>
  );
}
