"use client";

import { motion } from "framer-motion";
import { Bot, Github, Heart, Instagram, Send } from "lucide-react";
import { siteConfig } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  const SocialLink = motion.a;

  return (
    <footer className="relative border-t border-border/50 px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Bot size={20} className="text-bg" />
          </motion.span>
          <span className="text-xl font-bold bg-gradient-to-r from-text to-text-muted bg-clip-text text-transparent">
            {siteConfig.name}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">.</span>
          </span>
        </motion.div>

        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <SocialLink
            href={siteConfig.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="social-link"
            whileHover={{ scale: 1.15, y: -2 }}
          >
            <Github size={20} />
          </SocialLink>
          <SocialLink
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="social-link"
            whileHover={{ scale: 1.15, y: -2 }}
          >
            <Instagram size={20} />
          </SocialLink>
          <SocialLink
            href={siteConfig.socials.telegram}
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            className="social-link"
            whileHover={{ scale: 1.15, y: -2 }}
          >
            <Send size={20} />
          </SocialLink>
        </motion.div>

        <motion.p
          className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Dibangun dengan
          <motion.span
            className="fill-secondary text-secondary"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart size={14} />
          </motion.span>
          oleh <span className="font-semibold text-text">{siteConfig.name}</span>
          <span className="mx-1">·</span>
          © {year}
          <span className="mx-1">·</span>
          Deploy gratis di <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-gradient hover:underline">Vercel</a>
        </motion.p>

        <style jsx>{`
          .social-link {
            @apply flex h-11 w-11 items-center justify-center rounded-xl border border-border/50 bg-bg-elevated/50 text-text-muted transition-all;
          }
          .social-link:hover {
            @apply border-primary/50 bg-primary/10 text-text;
            box-shadow: 0 10px 30px var(--primary-glow);
          }
          .social-link:active {
            @apply scale-95;
          }
          .social-link:nth-child(1):hover { @apply border-primary/50; }
          .social-link:nth-child(2):hover { @apply border-secondary/50; }
          .social-link:nth-child(3):hover { @apply border-accent/50; }
        `}</style>
      </div>
    </footer>
  );
}