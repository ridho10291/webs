"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  Github,
  Instagram,
  Send,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { VisitorCounter } from "./VisitorCounter";

const roles = [
  "Full-stack developer",
  "Bot & automation builder",
  "Digital problem solver",
];

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

function Typewriter() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIndex];
    const complete = text === role;
    const empty = text.length === 0;
    const delay = complete ? 1800 : deleting ? 36 : 58;

    const timeout = window.setTimeout(() => {
      if (complete) {
        setDeleting(true);
      } else if (deleting && empty) {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % roles.length);
      } else {
        setText((current) =>
          deleting ? role.slice(0, current.length - 1) : role.slice(0, current.length + 1)
        );
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [deleting, roleIndex, text]);

  return (
    <span className="inline-flex items-baseline gap-1 text-primary">
      {text}
      <span className="caret-glow inline-block h-[1em] w-0.5 translate-y-0.5 bg-primary" aria-hidden="true" />
    </span>
  );
}

const socials = [
  { label: "GitHub", href: siteConfig.socials.github, icon: Github },
  { label: "Instagram", href: siteConfig.socials.instagram, icon: Instagram },
  { label: "Telegram", href: siteConfig.socials.telegram, icon: Send },
];

export function Hero() {
  return (
    <section
      id="beranda"
      className="relative isolate flex min-h-[780px] items-center overflow-hidden px-4 pb-16 pt-28 sm:min-h-[820px] sm:px-6 lg:pt-32"
    >
      <div className="soft-grid absolute inset-x-0 top-0 -z-10 h-[720px] opacity-60" aria-hidden="true" />
      <div className="absolute left-[7%] top-[14%] -z-10 h-52 w-52 rounded-full bg-primary/15 blur-[100px]" aria-hidden="true" />
      <div className="absolute right-[10%] top-[20%] -z-10 h-72 w-72 rounded-full bg-accent/20 blur-[120px]" aria-hidden="true" />

      <motion.div
        className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } } }}
      >
        <div className="max-w-2xl">
          <motion.div
            variants={reveal}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-2 text-xs font-semibold tracking-wide text-primary"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for selected projects
          </motion.div>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.55 }}
            className="mt-7 font-mono text-sm font-medium uppercase tracking-[0.18em] text-text-muted"
          >
            Hi, I&apos;m {siteConfig.name}
          </motion.p>

          <motion.h1
            variants={reveal}
            transition={{ duration: 0.65 }}
            className="mt-3 text-[clamp(3.15rem,7vw,5.9rem)] font-bold leading-[0.93] tracking-[-0.065em] text-text"
          >
            From a raw idea
            <span className="block text-gradient">to a system that runs.</span>
          </motion.h1>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.55 }}
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-base font-medium text-text-muted sm:text-lg"
          >
            <span>I&apos;m a</span>
            <Typewriter />
          </motion.div>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.55 }}
            className="mt-5 max-w-xl text-base leading-8 text-text-muted sm:text-lg"
          >
            Saya membangun bot, website, dan otomasi yang tidak sekadar terlihat bagus—tetapi benar-benar
            mempersingkat kerja dan siap dipakai setiap hari.
          </motion.p>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.55 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link href="#kontak" className="btn-primary gap-2">
              Mulai project
              <ArrowUpRight size={18} />
            </Link>
            <Link href="#proyek" className="btn-secondary inline-flex items-center gap-2">
              Lihat karya pilihan
              <ArrowDownRight size={18} />
            </Link>
          </motion.div>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <VisitorCounter />
            <div className="flex items-center gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-bg-elevated/60 text-text-muted transition hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={reveal} transition={{ duration: 0.7, delay: 0.05 }} className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/20 via-accent/15 to-secondary/20 blur-3xl" aria-hidden="true" />
          <div className="surface overflow-hidden rounded-[1.7rem] p-3 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between rounded-[1.1rem] border border-border/70 bg-bg/80 px-4 py-3">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              </div>
              <span className="font-mono text-[11px] text-text-muted">ridho.dev / workspace</span>
              <div className="h-5 w-10 rounded-full bg-primary/10" aria-hidden="true" />
            </div>

            <div className="relative mt-3 overflow-hidden rounded-[1.1rem] border border-border/60 bg-[linear-gradient(145deg,rgba(94,234,212,0.12),transparent_36%),linear-gradient(180deg,var(--bg-elevated),var(--bg))] p-5 sm:p-7">
              <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
                    <Bot size={24} className="text-bg" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Current craft</p>
                  <h2 className="mt-2 max-w-sm text-3xl font-bold leading-tight tracking-tight text-text sm:text-4xl">Digital systems that feel effortless.</h2>
                </div>
                <div className="hidden rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:block">Live</div>
              </div>

              <div className="relative mt-8 grid grid-cols-3 gap-3">
                {[
                  ["01", "Discover", Sparkles],
                  ["02", "Build", Code2],
                  ["03", "Launch", Check],
                ].map(([number, label, Icon]) => {
                  const StepIcon = Icon as typeof Sparkles;
                  return (
                    <div key={String(number)} className="rounded-2xl border border-border/70 bg-bg/55 p-3.5 sm:p-4">
                      <StepIcon size={16} className="text-primary" />
                      <p className="mt-5 font-mono text-[11px] text-text-muted">{String(number)}</p>
                      <p className="mt-1 text-sm font-semibold text-text">{String(label)}</p>
                    </div>
                  );
                })}
              </div>

              <div className="relative mt-3 flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/10 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary"><Check size={17} /></span>
                  <div>
                    <p className="text-sm font-semibold text-text">Ready to ship</p>
                    <p className="mt-0.5 text-xs text-text-muted">Clean UX · Scalable build · Human support</p>
                  </div>
                </div>
                <span className="hidden h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)] sm:block" aria-hidden="true" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
