"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const BOOT_LINES = [
  "> portfolio.boot(ridho)",
  "> mounting /ui · /bots · /web",
  "> resolving modules ........... ok",
  "> linking dependencies ........ ok",
  "> compiling source ............ ok",
  "> session established",
];

// A staged compile: quick start, a deliberate stall, then a clean landing on 100%.
// Total fill time is the sum of `wait` (~2.5s), plus a short hold before entering.
const PROGRESS_PLAN: Array<{ value: number; wait: number }> = [
  { value: 14, wait: 130 },
  { value: 30, wait: 150 },
  { value: 45, wait: 170 },
  { value: 58, wait: 190 },
  { value: 70, wait: 220 },
  { value: 78, wait: 300 },
  { value: 84, wait: 420 },
  { value: 91, wait: 340 },
  { value: 97, wait: 300 },
  { value: 100, wait: 320 },
];

const HOLD_AFTER_COMPLETE_MS = 620;

export function WelcomeScreen({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(true);
  const [typedLines, setTypedLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const prefersReduced = useReducedMotion();

  // Keep the latest callback without restarting the boot timers.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finish = useCallback(() => {
    setVisible(false);
    onCompleteRef.current?.();
  }, []);

  // Drive the boot sequence with a scripted schedule.
  useEffect(() => {
    if (!visible || prefersReduced) return;
    let cancelled = false;
    const timers: number[] = [];
    let elapsed = 0;

    for (const step of PROGRESS_PLAN) {
      elapsed += step.wait;
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) setProgress(step.value);
        }, elapsed)
      );
    }

    const lineGap = elapsed / BOOT_LINES.length;
    BOOT_LINES.forEach((_, i) => {
      timers.push(
        window.setTimeout(
          () => {
            if (!cancelled) setTypedLines(i + 1);
          },
          Math.max(0, lineGap * (i + 1) - 100)
        )
      );
    });

    timers.push(
      window.setTimeout(() => {
        if (!cancelled) finish();
      }, elapsed + HOLD_AFTER_COMPLETE_MS)
    );

    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
    };
  }, [visible, prefersReduced, finish]);

  // Reduced motion: skip the sequence and enter immediately.
  useEffect(() => {
    if (prefersReduced) finish();
  }, [prefersReduced, finish]);

  // Allow keyboard users to skip straight in.
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") {
        e.preventDefault();
        finish();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, finish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={finish}
          className="fixed inset-0 z-[9999] cursor-pointer bg-[#05060a] px-6"
          role="status"
          aria-label="Booting portfolio"
        >
          <div className="crt-scan absolute inset-0 opacity-40" />

          <div className="relative mx-auto flex h-full max-w-2xl flex-col justify-center">
            <div className="code-window">
              <div className="titlebar">
                <span className="dot d-close" />
                <span className="dot d-min" />
                <span className="dot d-max" />
                <span className="ml-2 font-mono text-[11px] tracking-wider text-[#5f6f66]">
                  ~/ridho/portfolio — boot
                </span>
              </div>

              <div className="p-5 font-mono text-[13px] leading-7">
                {BOOT_LINES.slice(0, typedLines).map((line, i) => {
                  const done = typedLines > i + 1 || progress >= 100;
                  return (
                    <motion.p
                      key={line}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className="whitespace-nowrap"
                    >
                      <span className="text-[#5f6f66]">{String(i + 1).padStart(2, "0")} </span>
                      <span className={done ? "text-[#d7f6c8]" : "text-[#8fff4a]"}>
                        {i === BOOT_LINES.length - 1 && done ? "[ ok ] " : ""}
                        {line}
                      </span>
                      {i === typedLines - 1 && progress < 100 && (
                        <span className="cursor-block ml-2 align-middle" />
                      )}
                    </motion.p>
                  );
                })}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-3">
                <span className="chip hot">compilation</span>
                <div className="bar-track flex-1">
                  <div
                    className="bar-fill"
                    style={{ width: `${progress}%`, transition: "width 0.3s ease-out" }}
                  />
                </div>
                <span className="font-mono text-[11px] tabular-nums text-[#8fff4a]">
                  {Math.round(progress)}%
                </span>
              </div>
              <AnimatePresence>
                {progress >= 100 && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-right font-mono text-[11px] text-[#ffb020]"
                  >
                    ✓ boot complete — entering session
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute inset-x-6 bottom-6 flex items-center justify-between gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3d4f45]">
              ♪ ambient music fades in on your first click
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                finish();
              }}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#3d4f45] transition-colors hover:text-[#8fff4a]"
            >
              skip [ enter ]
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}