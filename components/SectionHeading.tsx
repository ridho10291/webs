"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  badge: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ badge, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="relative">
      <motion.span
        className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-bold tracking-[0.14em] uppercase text-primary"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="relative h-1.5 w-1.5 rounded-full bg-primary"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {badge}
      </motion.span>

      <motion.h2
        className="mx-auto mt-5 max-w-4xl text-4xl font-bold tracking-[-0.055em] text-text sm:text-5xl lg:text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        {title.split(" ").map((word, i) => (
          <span key={i} className="relative mr-2 inline-block last:mr-0" style={{ lineHeight: 1.05 }}>
            <span className={i === title.split(" ").length - 1 ? "inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent" : "inline-block"}>
              {word}
            </span>
          </span>
        ))}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text-muted sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
