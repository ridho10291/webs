"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Bot, Github, Instagram, Rocket, Send, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site";
import { VisitorCounter } from "./VisitorCounter";

const variants = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 2, 0, -2, 0],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
  },
};

function splitText(text: string) {
  return text.split("").map((char, i) => (
    <motion.span
      key={i}
      className="inline-block"
      initial={{ opacity: 0, y: 30, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.4, delay: 0.15 + i * 0.025, ease: [0.16, 1, 0.3, 1] }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ));
}

export function Hero() {
  return (
    <section id="beranda" className="relative min-h-screen flex flex-col justify-center px-4 pt-24 pb-16 sm:px-6">
      <motion.div
        className="relative z-10"
        variants={variants.container}
        initial="hidden"
        animate="show"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <motion.div
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-5 py-2"
              variants={variants.item}
              style={{ transitionDelay: "0ms" }}
            >
              <motion.span
                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Bot size={16} className="text-bg" />
              </motion.span>
              <span className="text-sm font-medium text-gradient">
                Fullstack Developer & Bot Architect
              </span>
              <span className="w-px h-6 bg-gradient-to-t from-primary to-transparent" />
              <span className="text-xs font-mono text-text-muted px-2">
                v2026.08
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.05]"
              variants={variants.item}
              style={{ transitionDelay: "100ms" }}
            >
              <span className="block text-text" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.02em" }}>
                {splitText("Halo, saya ")}
              </span>
              <span className="block gradient-text" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.02em" }}>
                {siteConfig.name.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 40, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
              <motion.span
                className="block text-text inline-flex items-center gap-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <motion.span
                  className="inline-block"
                  animate={{ rotate: [0, 15, -10, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  👋
                </motion.span>
              </motion.span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg sm:text-xl lg:text-2xl font-medium text-text-muted max-w-2xl mx-auto"
              variants={variants.item}
              style={{ transitionDelay: "500ms" }}
            >
              {siteConfig.role}
            </motion.p>

            <motion.p
              className="mt-5 text-base sm:text-lg text-text-muted max-w-xl mx-auto leading-relaxed"
              variants={variants.item}
              style={{ transitionDelay: "600ms" }}
            >
              {siteConfig.tagline}
              <br />
              <span className="text-gradient font-medium">
                Bot WhatsApp • Telegram • Discord
              </span>{" "}
              sampai full-stack website &mdash; semuanya dari nol sampai production.
            </motion.p>

            <motion.div
              className="mt-12 flex flex-wrap items-center justify-center gap-4"
              variants={variants.item}
              style={{ transitionDelay: "700ms" }}
            >
              <Link
                href="#proyek"
                className="group btn-primary inline-flex items-center gap-2"
              >
                <Sparkles size={18} aria-hidden="true" />
                Lihat Project
                <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </Link>
              <Link
                href="#kontak"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <Send size={18} />
                Mulai Project
              </Link>
            </motion.div>

            <motion.div
              className="mt-10 flex items-center justify-center gap-3"
              variants={variants.item}
              style={{ transitionDelay: "800ms" }}
            >
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="social-link group"
              >
                <Github size={22} />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="social-link group"
              >
                <Instagram size={22} />
              </a>
              <a
                href={siteConfig.socials.telegram}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="social-link group"
              >
                <Send size={22} />
              </a>
            </motion.div>

            <motion.div
              className="mt-10 flex justify-center"
              variants={variants.item}
              style={{ transitionDelay: "900ms" }}
            >
              <VisitorCounter />
            </motion.div>

            <motion.div
              className="mt-14 flex justify-center"
              variants={variants.item}
              style={{ transitionDelay: "1000ms" }}
            >
              <a
                href="#tentang"
                aria-label="Scroll ke bawah"
                className="scroll-indicator group"
              >
                <ArrowDown size={24} className="animate-bounce group-hover:scale-110 transition-transform" />
              </a>
            </motion.div>
          </div>

          <motion.div
            className="mt-20 relative"
            variants={variants.item}
            style={{ transitionDelay: "1100ms" }}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10"
                animate={floatingVariants}
              >
                <Rocket size={32} className="text-primary" />
              </motion.div>

              {[
                { bg: "linear-gradient(135deg, hsl(190 90% 55%), hsl(215 90% 55%))" },
                { bg: "linear-gradient(135deg, hsl(265 90% 60%), hsl(285 90% 60%))" },
                { bg: "linear-gradient(135deg, hsl(320 90% 60%), hsl(335 90% 60%))" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full blur-3xl opacity-20"
                  style={{
                    width: 200 + i * 50,
                    height: 200 + i * 50,
                    background: item.bg,
                    top: `calc(50% + ${-100 + i * 30}px)`,
                    left: `calc(50% + ${-100 + i * 30}px)`,
                  }}
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.15, 0.25, 0.15],
                  }}
                  transition={{
                    duration: 6 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>

            <motion.div
              className="relative mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-4 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 rounded-xl bg-bg-elevated/50 p-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="w-3 h-3 rounded-full bg-accent" />
                  <span className="w-3 h-3 rounded-full bg-secondary" />
                </div>
                <span className="text-xs font-mono text-text-muted ml-2">terminal</span>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-xl bg-bg-elevated p-5 text-sm font-mono text-text leading-relaxed">
                <code>{`$ npx create-bot --name "WhatsApp Auto-Reply"
$ deploy --platform vercel --free
✓ Bot live 24/7 at zero cost
✓ Database: Neon Postgres
✓ Notifications: Telegram Bot API
                `}</code>
              </pre>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <style jsx>{`
        .social-link {
          @apply flex h-12 w-12 items-center justify-center rounded-xl border border-border/50 bg-bg-elevated/50 backdrop-blur transition-all duration-300;
        }
        .social-link:hover {
          @apply border-primary/50 bg-primary/10 transform -translate-y-1;
          box-shadow: 0 10px 30px var(--primary-glow);
        }
        .social-link:active {
          @apply scale-95;
        }
        .social-link:nth-child(1):hover { @apply border-primary/50; }
        .social-link:nth-child(2):hover { @apply border-secondary/50; }
        .social-link:nth-child(3):hover { @apply border-accent/50; }

        .scroll-indicator {
          @apply flex h-14 w-14 items-center justify-center rounded-2xl border border-border/50 bg-bg-elevated/50 backdrop-blur text-text-muted transition-all duration-300;
        }
        .scroll-indicator:hover {
          @apply border-primary/50 bg-primary/10 text-primary;
          transform: translateY(4px);
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-indicator .animate-bounce { animation: none; }
        }
      `}</style>
    </section>
  );
}