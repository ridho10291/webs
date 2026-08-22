"use client";

import { motion } from "framer-motion";
import { Bot, Github, Heart, Instagram, Send, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site";

const quickLinks = [
  { href: "#tentang", label: "Tentang" },
  { href: "#pengalaman", label: "Pengalaman" },
  { href: "#proyek", label: "Karya" },
  { href: "#buku-tamu", label: "Feedback" },
  { href: "#kontak", label: "Kontak" },
];

const socials = [
  { label: "GitHub", href: siteConfig.socials.github, icon: Github },
  { label: "Instagram", href: siteConfig.socials.instagram, icon: Instagram },
  { label: "Telegram", href: siteConfig.socials.telegram, icon: Send },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/40 px-4 pt-16 pb-8 sm:px-6">
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-primary/3 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Bot size={20} className="text-bg" />
              </span>
              <span className="text-xl font-bold bg-gradient-to-r from-text to-text-muted bg-clip-text text-transparent">
                {siteConfig.name}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">.</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-text-muted">
              Full-stack developer & bot creator. Membangun sistem otomatis yang bekerja 24/7 — dari ide sampai production-ready.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-bg-elevated/40 text-text-muted transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/8 hover:text-primary"
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-text">Navigasi</h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-text">Kontak</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 text-sm text-text-muted transition-colors hover:text-primary"
                >
                  <Mail size={15} className="shrink-0 text-primary/70" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-text-muted">
                <MapPin size={15} className="shrink-0 text-accent/70" />
                {siteConfig.location}
              </li>
              <li>
                <a
                  href={siteConfig.socials.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-sm text-text-muted transition-colors hover:text-accent"
                >
                  <Send size={15} className="shrink-0 text-secondary/70" />
                  @{siteConfig.socials.telegram.replace("https://t.me/", "")}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-14 border-t border-border/40 pt-6 flex flex-col items-center justify-between gap-3 sm:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-text-muted">
            &copy; {year} <span className="font-semibold text-text">{siteConfig.name}</span>. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-text-muted">
            Dibangun dengan
            <motion.span
              className="fill-secondary text-secondary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart size={13} />
            </motion.span>
            & Deploy gratis di
            <a href="https://vercel.com" target="_blank" rel="noreferrer" className="font-medium text-text transition-colors hover:text-primary">Vercel</a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
