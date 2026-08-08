"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Bot, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { siteConfig } from "@/data/site";

const links = [
  { href: "#tentang", label: "Tentang" },
  { href: "#skills", label: "Keahlian" },
  { href: "#proyek", label: "Project" },
  { href: "#buku-tamu", label: "Buku Tamu" },
  { href: "#kontak", label: "Kontak" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-border/50 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="#beranda" className="group flex items-center gap-2" aria-label="Home">
          <motion.span
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent"
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          >
            <Bot size={22} className="text-bg" />
          </motion.span>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-text to-text-muted bg-clip-text text-transparent">
            {siteConfig.name}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link, _i) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 rounded-lg text-sm font-medium text-text-muted transition-all duration-300 hover:text-text before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-primary before:to-accent before:-translate-x-1/2 before:transition-all hover:before:w-full"
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 text-text-muted transition-all hover:bg-white/5 hover:border-primary/50"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-border/50 bg-bg/95 backdrop-blur-xl px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-medium text-text-muted hover:text-text hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          header { transition: none; }
        }
      `}</style>
    </header>
  );
}