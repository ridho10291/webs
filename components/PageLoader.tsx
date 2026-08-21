"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-bg"
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            aria-hidden="true"
          />

          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="relative h-16 w-16"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-accent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-1.5 rounded-full border border-primary/30"
                animate={{
                  scale: [1, 1.15, 1],
                  borderColor: ["rgba(94,234,212,0.3)", "rgba(139,92,246,0.3)", "rgba(94,234,212,0.3)"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.3, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.span
                className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              >
                {["R", "i", "d", "h", "o"].map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: 0.4 + i * 0.07,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
              <motion.span
                className="text-2xl font-bold text-text"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.3, 1] }}
                transition={{ delay: 0.9, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                .
              </motion.span>
            </motion.div>

            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.4, 1],
                    opacity: [0, 1, 0.6],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: 0.6 + i * 0.12,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">
              Loading experience
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
