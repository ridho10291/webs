"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  badge: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ badge, title, subtitle }: SectionHeadingProps) {
  const words = title.split(" ");

  return (
    <div className="relative">
      <motion.span
        className="inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] uppercase text-primary"
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      >
        <motion.span
          className="relative h-1.5 w-1.5 rounded-full bg-primary"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
            boxShadow: [
              "0 0 4px rgba(94,234,212,0.4)",
              "0 0 12px rgba(94,234,212,0.8)",
              "0 0 4px rgba(94,234,212,0.4)",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {badge}
      </motion.span>

      <motion.h2
        className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-[-0.055em] text-text text-balance sm:text-5xl lg:text-[3.5rem]"
        style={{ lineHeight: 1.08 }}
      >
        {words.map((word, i) => {
          const isLast = i === words.length - 1;
          return (
            <motion.span
              key={i}
              className="relative mr-[0.28em] inline-block last:mr-0"
              initial={{ opacity: 0, y: 35, rotateX: -60 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.08 + i * 0.055,
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span
                className={
                  isLast
                    ? "inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary"
                    : "inline-block"
                }
              >
                {word}
              </span>
            </motion.span>
          );
        })}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-7 text-text-muted text-pretty sm:text-lg"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.65 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
