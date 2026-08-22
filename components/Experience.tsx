"use client";

import { motion } from "framer-motion";
import { Bot, Globe, Zap, Server } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

type Experience = {
  year: string;
  title: string;
  company: string;
  description: string;
  tech: string[];
  icon: typeof Bot;
  color: string;
};

const experiences: Experience[] = [
  {
    year: "2024",
    title: "Full-Stack Bot Developer",
    company: "Freelance & Open Source",
    description:
      "Membangun bot WhatsApp, Telegram, dan Discord untuk klien — dari auto-order sampai sistem moderasi. Event-driven architecture, database integration, production-ready deployment.",
    tech: ["discord.js", "Baileys", "python-telegram-bot", "PostgreSQL", "Docker"],
    icon: Bot,
    color: "from-primary to-accent",
  },
  {
    year: "2024",
    title: "Web Application Developer",
    company: "Personal Projects",
    description:
      "Full-stack web apps dengan Next.js 15, React 19, TypeScript. SSR/ISR, Server Actions, Edge Runtime. Deploy gratis di Vercel dengan Neon Postgres.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind v4", "Vercel"],
    icon: Globe,
    color: "from-accent to-secondary",
  },
  {
    year: "2023",
    title: "Automation & Scraping Engineer",
    company: "R&D Projects",
    description:
      "Otomasi workflow: web scraping dengan Playwright/Puppeteer, cron jobs untuk monitoring, webhook integrations, notifikasi real-time ke Telegram.",
    tech: ["Playwright", "Puppeteer", "Node.js", "Webhooks", "Cron"],
    icon: Zap,
    color: "from-secondary to-primary",
  },
  {
    year: "2023",
    title: "DevOps & Infrastructure",
    company: "Self-hosted Deployments",
    description:
      "Docker containers, CI/CD pipelines, VPS management. Zero-cost infrastructure: Vercel, Neon, Upstash Redis, Cloudflare R2.",
    tech: ["Docker", "GitHub Actions", "VPS", "Vercel", "Cloudflare"],
    icon: Server,
    color: "from-primary to-secondary",
  },
];

export function Experience() {
  return (
    <section id="pengalaman" className="relative py-24 sm:py-32 px-4">
      <motion.div
        className="absolute left-[5%] top-[20%] h-56 w-56 rounded-full bg-accent/8 blur-[120px]"
        animate={{ scale: [1, 1.15, 0.9, 1], opacity: [0.15, 0.3, 0.12, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            badge="Pengalaman"
            title="Track record yang bisa dihitung."
            subtitle="Setiap project adalah bukti nyata kemampuan teknis — dari ide sampai production-ready."
          />
        </motion.div>

        <div className="relative mt-20">
          <div className="absolute left-[51.5px] top-0 h-full w-px bg-gradient-to-b from-primary/30 via-accent/20 to-transparent sm:left-[calc(50%_-_0.5px)]" aria-hidden="true" />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={`${exp.year}-${exp.title}`}
                className={`relative mb-16 last:mb-0 sm:mb-20 ${isLeft ? "sm:pr-[calc(50%_+_2.5rem)]" : "sm:pl-[calc(50%_+_2.5rem)]"}`}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <motion.div
                  className="absolute left-8 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/40 bg-bg sm:left-[calc(50%_-_20px)]"
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <span className="h-3 w-3 rounded-full bg-gradient-to-br from-primary to-accent" />
                </motion.div>

                <div className="ml-20 sm:ml-0">
                  <span className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-primary">
                    {exp.year}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-text">{exp.title}</h3>
                  <p className="mt-1 text-sm font-medium text-text-muted">{exp.company}</p>
                  <p className="mt-3 leading-7 text-text-muted">{exp.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-border/60 bg-bg/40 px-2.5 py-1 text-xs font-medium text-text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
