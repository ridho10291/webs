"use client";
import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

interface SectionHeadingProps {
  /** e.g. `01` — scoped to the running program's line block. */
  index: string;
  /** Function/var name, e.g. `about()` */
  fn: string;
  /** Plain lead words. */
  title: string;
  /** Phosphor-accent words rendered as a string literal. */
  accent?: string;
  keyword?: string;
  keywordColor?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const flashVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 0.85, 0],
    transition: { duration: 0.75, ease: "easeOut", times: [0, 0.2, 1] },
  },
};

function Rise({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.6, ease: EASE }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}

export function SectionHeading({
  index,
  fn,
  title,
  accent,
  keyword = "export",
  keywordColor = "text-[#ff3d81]",
}: SectionHeadingProps) {
  const chars = fn.split("");

  const typingVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.045, delayChildren: 0.25 },
    },
  };

  const charVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.18, ease: "easeOut" } },
  };

  return (
    <div className="relative mb-12">
      {/* Amber compile flash behind the heading */}
      <motion.div
        aria-hidden
        variants={flashVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="pointer-events-none absolute -inset-x-6 -inset-y-5 rounded-md bg-[radial-gradient(60%_90%_at_0%_50%,rgba(255,176,32,0.16),transparent_70%)]"
      />

      <div className="relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#3d4f45]">
        <span className="text-[#5f6f66]">{index}</span>
        <span className="text-[#3d4f45]">//</span>
        <span className="text-[#8fff4a]">
          <motion.span
            variants={typingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="inline-flex"
          >
            {chars.map((c, i) => (
              <motion.span key={i} variants={charVariants} className="inline-block">
                {c}
              </motion.span>
            ))}
          </motion.span>
          <span className="cursor-block ml-1 align-middle" aria-hidden="true" />
        </span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.3 + chars.length * 0.03, duration: 0.6, ease: EASE }}
          className="h-px flex-1 origin-left bg-gradient-to-r from-[#ffb020]/60 via-[#8fff4a]/30 to-transparent"
        />
      </div>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#d7f6c8] sm:text-4xl lg:text-5xl">
        <Rise delay={0.05}>
          <span className={keywordColor}>{keyword}</span> <span className="text-white">{title}</span>
        </Rise>
        {accent && (
          <Rise delay={0.16}>
            <span className="ml-2 text-[#8fff4a]">{accent}</span>
          </Rise>
        )}
      </h2>
    </div>
  );
}