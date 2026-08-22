"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Coffee, Heart, Star, Zap, Bot, Globe, Database, Server, GitBranch, FileCode, FileJson, Boxes, Component } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 15, suffix: "+", label: "Projects completed" },
  { value: 3, suffix: "+", label: "Years coding" },
  { value: 99, suffix: "%", label: "Uptime" },
  { value: 24, suffix: "/7", label: "Support" },
];

const highlights = [
  {
    icon: Bot,
    bg: "bg-gradient-to-br from-primary to-accent",
    title: "Bot Architecture",
    desc: "Arsitektur bot scalable untuk WhatsApp (Baileys), Telegram (python-telegram-bot), Discord (discord.js). Event-driven, modular, siap production.",
  },
  {
    icon: Globe,
    bg: "bg-gradient-to-br from-accent to-secondary",
    title: "Full-Stack Web",
    desc: "Next.js 15 App Router, React 19, Tailwind v4, TypeScript strict. SSR, ISR, Server Actions, Edge Runtime — modern stack penuh.",
  },
  {
    icon: Zap,
    bg: "bg-gradient-to-br from-secondary to-primary",
    title: "Automation & Scraping",
    desc: "Playwright, Puppeteer, cron jobs, webhook integrations. Otomasi end-to-end: scraping, monitoring, notifikasi real-time.",
  },
  {
    icon: Database,
    bg: "bg-gradient-to-br from-primary to-secondary",
    title: "Deploy & Infra Gratis",
    desc: "Vercel (frontend + serverless), Neon Postgres, Upstash Redis, Cloudflare R2. Zero cost, global CDN, auto-scaling.",
  },
];

const stack = [
  { name: "TypeScript", icon: FileCode, color: "text-primary", bg: "bg-primary/10", level: 95 },
  { name: "Node.js / API", icon: Server, color: "text-accent", bg: "bg-accent/10", level: 92 },
  { name: "Bot Development", icon: Bot, color: "text-secondary", bg: "bg-secondary/10", level: 94 },
  { name: "Next.js / React", icon: Component, color: "text-primary", bg: "bg-primary/10", level: 90 },
  { name: "Python", icon: FileJson, color: "text-accent", bg: "bg-accent/10", level: 82 },
  { name: "PostgreSQL / Redis", icon: Database, color: "text-secondary", bg: "bg-secondary/10", level: 85 },
  { name: "Git / GitHub", icon: GitBranch, color: "text-primary", bg: "bg-primary/10", level: 88 },
  { name: "Docker / VPS", icon: Boxes, color: "text-accent", bg: "bg-accent/10", level: 75 },
];

export function About() {
  return (
    <section id="tentang" className="relative py-24 sm:py-32 px-4">
      <motion.div
        className="absolute right-[5%] top-[10%] h-64 w-64 rounded-full bg-accent/10 blur-[120px]"
        animate={{ scale: [1, 1.2, 0.9, 1.1, 1], opacity: [0.3, 0.5, 0.25, 0.4, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute left-[8%] bottom-[15%] h-48 w-48 rounded-full bg-primary/10 blur-[100px]"
        animate={{ scale: [1, 0.85, 1.15, 1], opacity: [0.2, 0.4, 0.15, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            badge="Tentang Saya"
            title="Membangun sistem otomatis yang bekerja saat kamu tidur"
            subtitle="Dari bot chat sampai platform web penuh — saya mengubah ide jadi produk digital yang scalable, maintainable, dan gratis di-hosting."
          />
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="shimmer-sweep card-3d rounded-2xl border border-border/40 bg-bg-elevated/40 p-5 text-center"
            >
              <div className="text-3xl font-bold text-primary sm:text-4xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm text-text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <motion.article
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-text to-text-muted bg-clip-text text-transparent">
              Cerita Singkat
            </h3>
            <p className="text-lg leading-relaxed text-text-muted">
              Semula iseng bikin bot WhatsApp buat auto-balas teman. Ketagihan. Lanjut belajar
              arsitektur event-driven, database, deployment. Sekarang fokus bikin sistem yang
              <span className="font-semibold text-gradient">berjalan otomatis 24/7</span> tanpa
              campur tangan manual.
            </p>
            <p className="leading-relaxed text-text-muted">
              Prinsip: <span className="font-medium text-primary">"Otomatisasi sekali, manfaat selamanya"</span>. Kalau bisa di-code, kenapa manual?
            </p>

            <ul className="space-y-3 pt-4 border-t border-border/50">
              {[
                "Clean code, arsitektur modular, testable",
                "Open source contributor & maintainer",
                "Remote-first, komunikasi async-friendly",
                "Deadline adalah komitmen, bukan saran",
              ].map((item, i) => (
                <li key={item} className="flex items-start gap-3 text-text-muted">
                  <motion.span
                    className="flex-shrink-0 mt-1 text-primary"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 260, damping: 12 }}
                  >
                    <CheckCircle2 size={20} />
                  </motion.span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-4">
              {[
                { label: "Freelance Ready", icon: Heart, color: "border-primary/20 bg-primary/10 text-primary" },
                { label: "Coffee Powered", icon: Coffee, color: "border-accent/20 bg-accent/10 text-accent" },
                { label: "Quality > Quantity", icon: Star, color: "border-secondary/20 bg-secondary/10 text-secondary" },
              ].map(({ label, icon: Icon, color }, i) => (
                <motion.span
                  key={label}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium ${color}`}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4, type: "spring" }}
                  whileHover={{ scale: 1.08, y: -2 }}
                >
                  <Icon size={14} />
                  {label}
                </motion.span>
              ))}
            </div>
          </motion.article>

          <motion.div
            className="grid gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {highlights.map((h, i) => (
              <motion.article
                key={h.title}
                className="group shimmer-sweep relative overflow-hidden rounded-2xl border border-border/50 bg-bg-elevated/50 p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-primary/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 group-hover:border-primary/50 transition-colors">
                  <motion.span
                    className={`relative flex h-10 w-10 items-center justify-center rounded-xl ${h.bg}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <h.icon size={24} className="text-white" />
                  </motion.span>
                </div>
                <h4 className="mt-5 text-lg font-bold text-text">{h.title}</h4>
                <p className="mt-3 text-text-muted leading-relaxed">{h.desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {stack.map((s, i) => (
            <motion.article
              key={s.name}
              className="group shimmer-sweep relative rounded-2xl border border-border/50 bg-bg-elevated/50 p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-primary/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 + i * 0.06, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-3">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.bg}`}>
                  <s.icon size={22} className={s.color} />
                </span>
                <span className="font-semibold text-text">{s.name}</span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${s.level}%` }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <div className="mt-2 text-right text-xs font-medium text-text-muted">{s.level}%</div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}