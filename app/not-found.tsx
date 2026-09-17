"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="mb-8 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Zap size={32} className="text-primary" />
        </motion.div>

        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-text">404</h1>
        <p className="mb-8 text-lg text-text-muted">Page not found.</p>

        <Link href="/" className="btn-primary gap-2 px-6 py-3 text-sm">
          <Home size={16} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
