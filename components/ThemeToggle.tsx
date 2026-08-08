"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Mode terang" : "Mode gelap"}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-white/5 transition-all hover:border-primary/50 hover:bg-primary/10"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
          scale: [1, 0.8, 1],
        }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <Sun size={18} className="text-secondary" /> : <Moon size={18} className="text-primary" />}
      </motion.div>
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-accent"
        initial={false}
        animate={{ opacity: isDark ? 0 : 0.1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}