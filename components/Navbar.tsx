"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, Bot, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { siteConfig } from "@/data/site";

const links = [
  { href: "#tentang", label: "Tentang" },
  { href: "#proyek", label: "Karya" },
  { href: "#buku-tamu", label: "Feedback" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#beranda");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 14);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["beranda", "tentang", "proyek", "buku-tamu", "kontak"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const linkClass = (href: string) =>
    `relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
      active === href ? "text-text" : "text-text-muted hover:text-text"
    }`;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <nav
        className={`pointer-events-auto mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border px-3 transition-all duration-300 sm:px-4 ${
          scrolled
            ? "border-border/90 bg-bg/80 shadow-[0_14px_40px_rgba(0,0,0,0.24)] backdrop-blur-2xl"
            : "border-transparent bg-transparent"
        }`}
        aria-label="Navigasi utama"
      >
        <Link href="#beranda" className="group flex items-center gap-2.5" aria-label="Ke beranda">
          <motion.span
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/15"
            whileHover={{ scale: 1.08, rotate: [0, -5, 5, 0] }}
          >
            <Bot size={21} className="text-bg" />
          </motion.span>
          <span className="text-lg font-bold tracking-tight text-text">
            {siteConfig.name}<span className="text-primary">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
            </Link>
          ))}
          <div className="mx-2 h-5 w-px bg-border/70" aria-hidden="true" />
          <ThemeToggle />
          <Link href="#kontak" className="ml-2 inline-flex items-center gap-1.5 rounded-xl bg-text px-3.5 py-2 text-sm font-bold text-bg transition hover:-translate-y-0.5 hover:bg-primary">
            Hubungi saya
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-bg-elevated/60 text-text transition hover:border-primary/60 hover:text-primary"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-auto mx-auto mt-2 max-w-6xl rounded-2xl border border-border/90 bg-bg/95 p-2 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            {[...links, { href: "#kontak", label: "Hubungi saya" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${active === link.href ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-bg-elevated hover:text-text"}`}
              >
                {link.label}
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
