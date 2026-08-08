"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Bot } from "lucide-react";
import { siteConfig } from "@/data/site";

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
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Bot size={32} className="text-primary" />
        </motion.div>

        <motion.h1
          className="mb-4 text-5xl font-extrabold tracking-tight bg-gradient-to-r from-text to-text-muted bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          404
        </motion.h1>

        <motion.p
          className="mb-8 text-lg text-text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Halaman tidak ditemukan. Mungkin kamu salah jalur?
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Home size={18} />
            Kembali ke Beranda
          </Link>
          <Link
            href="#kontak"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Hubungi Saya
          </Link>
        </motion.div>

        <motion.p
          className="mt-12 text-sm text-text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          © {new Date().getFullYear()} {siteConfig.name} — Deploy gratis di Vercel
        </motion.p>
      </motion.div>

      <style jsx>{`
        .btn-primary {
          background: linear-gradient(135deg, var(--primary), var(--accent));
          color: var(--bg);
          font-weight: 600;
          padding: 0.875rem 2rem;
          border-radius: 0.75rem;
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px var(--primary-glow);
        }
        .btn-secondary {
          background: var(--bg-elevated);
          color: var(--text);
          font-weight: 500;
          padding: 0.875rem 2rem;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          transition: all 0.3s ease;
        }
        .btn-secondary:hover {
          background: var(--border);
          border-color: var(--primary);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}