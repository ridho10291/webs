"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Kembali ke atas"
          className="group fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/40 bg-bg-elevated/80 text-primary backdrop-blur-xl transition-colors hover:border-primary hover:text-bg sm:bottom-8 sm:right-8"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <motion.span
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
          <ArrowUp size={20} className="relative z-10 transition-transform group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
