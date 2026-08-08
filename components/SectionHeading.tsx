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
        className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-primary"
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
        className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        {title.split(" ").map((word, i) => (
          <span key={i} className="relative inline-block mr-3" style={{ lineHeight: 1 }}>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {word}
            </span>
          </span>
        ))}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="mx-auto mt-5 max-w-2xl text-lg text-text-muted leading-relaxed"
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