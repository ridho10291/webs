"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X, Terminal } from "lucide-react";
import { siteConfig } from "@/data/site";
import { FloatingAudio } from "./FloatingAudio";

const NAV_ITEMS = [
  { label: "hero", href: "#hero" },
  { label: "about", href: "#about" },
  { label: "stack", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "certs", href: "#certificates" },
  { label: "guestbook", href: "#guestbook" },
  { label: "contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-[#1d2a24] bg-[#05060a]/90 shadow-[0_8px_40px_-16px_rgba(0,0,0,0.9)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Brand — a running prompt */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-mono text-sm font-bold tracking-tight text-[#d7f6c8]"
          >
            <Terminal className="h-4 w-4 text-[#8fff4a]" />
            <span className="text-[#d7f6c8] transition-colors group-hover:text-[#8fff4a]">
              ridho.dev
            </span>
            <span className="cursor-block" aria-hidden="true" />
          </Link>

          {/* Desktop Nav — code outline of the running page */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_ITEMS.map((item, i) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`group relative px-3 py-1.5 font-mono text-[11.5px] tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-[#8fff4a]"
                      : "text-[#5f6f66] hover:text-[#d7f6c8]"
                  }`}
                >
                  <span className="mr-1 text-[#3d4f45]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-caret"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute -bottom-[3px] left-3 right-3 h-0.5 bg-[#8fff4a] shadow-[0_0_8px_rgba(143,255,74,0.8)]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <FloatingAudio />

            <a
              href={siteConfig.resumeUrl}
              className="group hidden items-center gap-1.5 rounded border border-[#1d2a24] px-3.5 py-1.5 font-mono text-[11.5px] font-semibold text-[#d7f6c8] transition-all duration-300 hover:border-[#8fff4a]/50 hover:text-[#8fff4a] sm:flex"
            >
              resume.tsx
              <ArrowUpRight className="h-3.5 w-3.5 text-[#5f6f66] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#8fff4a]" />
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded border border-[#1d2a24] text-[#d7f6c8] md:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-4 mt-2 code-window md:hidden"
          >
            <nav className="flex flex-col gap-1 p-3">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  className="flex items-center justify-between rounded px-3 py-2.5 font-mono text-[13px] text-[#d7f6c8] transition-colors hover:bg-[#12160f] hover:text-[#8fff4a]"
                >
                  <span>
                    <span className="mr-2 text-[#3d4f45]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </span>
                  <span className="text-[#8fff4a]">→</span>
                </motion.a>
              ))}
              <a
                href={siteConfig.resumeUrl}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-1.5 rounded border border-[#8fff4a]/40 py-2.5 font-mono text-[12px] font-semibold text-[#8fff4a]"
              >
                resume.tsx
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}