"use client";
import { useEffect, useRef } from "react";

const GLYPHS = ["+", "*", "/", "=", "<", ">", "&", "%", "#", "$", "@", "0x", "::", "=>", "{}", "//"];
const COLORS = ["#8fff4a", "#ff3d81", "#56e8ff"];

interface Glyph {
  x: number;
  y: number;
  size: number;
  vy: number;
  vx: number;
  alpha: number;
  baseAlpha: number;
  sprite: HTMLCanvasElement;
}

/**
 * Ambient falling-code field.
 * Each glyph is rendered once into an offscreen sprite (with its glow baked in)
 * and then blitted per frame — far cheaper than `fillText` + `shadowBlur` on
 * every glyph every frame. Pauses when the tab is hidden and respects
 * `prefers-reduced-motion`.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -1000, y: -1000, radius: 150 };
    const sprites = new Map<string, HTMLCanvasElement>();

    const makeSprite = (text: string, color: string, size: number) => {
      const key = `${text}|${color}|${size}`;
      const cached = sprites.get(key);
      if (cached) return cached;
      const pad = 8;
      const dim = Math.ceil(size * 1.7) + pad * 2;
      const sprite = document.createElement("canvas");
      sprite.width = dim;
      sprite.height = dim;
      const sctx = sprite.getContext("2d");
      if (sctx) {
        sctx.font = `${size}px "JetBrains Mono", monospace`;
        sctx.textAlign = "center";
        sctx.textBaseline = "middle";
        sctx.shadowColor = color;
        sctx.shadowBlur = 7;
        sctx.fillStyle = color;
        sctx.fillText(text, dim / 2, dim / 2);
      }
      sprites.set(key, sprite);
      return sprite;
    };

    // Fewer, smaller glyphs than before; density scales with area but is capped.
    const count = Math.min(Math.floor((width * height) / 46000), 50);
    const glyphs: Glyph[] = Array.from({ length: count }, () => {
      const size = Math.round(Math.random() * 6 + 8);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const text = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        vy: Math.random() * 0.25 + 0.05,
        vx: (Math.random() - 0.5) * 0.12,
        alpha: 0,
        baseAlpha: Math.random() * 0.5 + 0.18,
        sprite: makeSprite(text, color, size),
      };
    });

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const g of glyphs) {
        g.x += g.vx;
        g.y += g.vy;
        if (g.y > height + 24) {
          g.y = -24;
          g.x = Math.random() * width;
        }
        if (g.x < -24) g.x = width + 24;
        else if (g.x > width + 24) g.x = -24;

        const dist = Math.hypot(mouse.x - g.x, mouse.y - g.y);
        g.alpha = dist < mouse.radius ? Math.min(g.baseAlpha * 2.6, 0.95) : g.baseAlpha;

        ctx.globalAlpha = g.alpha;
        ctx.drawImage(g.sprite, g.x - g.sprite.width / 2, g.y - g.sprite.height / 2);
      }
      raf = requestAnimationFrame(render);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
      aria-hidden="true"
    />
  );
}