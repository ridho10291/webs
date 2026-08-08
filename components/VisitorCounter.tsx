"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let ignore = false;
    let hasCounted = false;

    async function load() {
      try {
        const res = await fetch("/api/visitors", { cache: "no-store" });
        const json = await res.json();
        if (!ignore && json.ok) setCount(json.data.count);
      } catch {
        /* abaikan */
      }
    }

    function countOnce() {
      if (hasCounted) return;
      hasCounted = true;
      fetch("/api/visitors", { method: "POST" })
        .then((res) => res.json())
        .then((json) => {
          if (!ignore && json.ok) setCount(json.data.count);
        })
        .catch(() => undefined);
    }

    load();

    const key = "visitor-counted-v1";
    if (!localStorage.getItem(key)) {
      const timer = setTimeout(countOnce, 2500);
      localStorage.setItem(key, "1");
      return () => {
        clearTimeout(timer);
        ignore = true;
      };
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <motion.span
      className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-bg-elevated/50 px-5 py-2 backdrop-blur transition-all hover:border-primary/50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.span
        className="relative flex h-5 w-5 items-center justify-center"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Eye size={16} className="text-primary" />
      </motion.span>
      <span className="font-mono font-semibold text-text tabular-nums">
        {count === null ? "..." : count.toLocaleString("id-ID")}
      </span>
      <span className="text-text-muted hidden sm:inline">pengunjung</span>
    </motion.span>
  );
}