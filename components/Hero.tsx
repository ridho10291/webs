"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Send } from "lucide-react";
import { siteConfig } from "@/data/site";
import { VisitorCounter } from "./VisitorCounter";
import { MagneticButton } from "./MagneticButton";
import { FloatingParticles } from "./FloatingParticles";

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

function AnimatedTitle() {
  const words = ["From", "a", "raw", "idea"];
  const secondLine = ["to", "a", "system", "that", "runs."];

  return (
    <h1 className="mt-4 text-[clamp(2.8rem,8vw,7rem)] font-bold leading-[0.91] tracking-[-0.07em] text-text">
      <span className="block">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em]"
            initial={{ opacity: 0, y: 50, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: 0.3 + i * 0.1,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
      <span className="block text-gradient">
        {secondLine.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em]"
            initial={{ opacity: 0, y: 50, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: 0.6 + i * 0.08,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

const socials = [
  { label: "GitHub", href: siteConfig.socials.github, icon: Github },
  { label: "Instagram", href: siteConfig.socials.instagram, icon: Instagram },
  { label: "Telegram", href: siteConfig.socials.telegram, icon: Send },
];

function GlowOrb({ delay, color, size, x, y }: { delay: number; color: string; size: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute rounded-full blur-[120px]"
      style={{ width: size, height: size, left: x, top: y, background: color }}
      animate={{
        scale: [1, 1.3, 0.9, 1.1, 1],
        opacity: [0.12, 0.22, 0.15, 0.2, 0.12],
      }}
      transition={{ duration: 10, repeat: Infinity, delay, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}

export function Hero() {
  useEffect(() => {
    const handleMove = () => {};
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      id="beranda"
      className="relative isolate flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-28 sm:min-h-[90vh] sm:px-6 lg:pt-32"
    >
      <div className="soft-grid absolute inset-x-0 top-0 -z-10 h-[800px] opacity-40" aria-hidden="true" />

      <FloatingParticles />

      <GlowOrb delay={0} color="rgba(94, 234, 212, 0.2)" size={400} x="10%" y="15%" />
      <GlowOrb delay={2} color="rgba(139, 92, 246, 0.18)" size={350} x="70%" y="10%" />
      <GlowOrb delay={4} color="rgba(232, 121, 249, 0.12)" size={300} x="55%" y="65%" />

      <motion.div
        className="mx-auto flex w-full max-w-4xl flex-col items-center text-center"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
      >
        <motion.div
          variants={reveal}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-xs font-semibold tracking-wide text-primary backdrop-blur-sm"
        >
          <motion.span
            className="relative flex h-2 w-2"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </motion.span>
          Available for new projects
        </motion.div>

        <motion.p
          variants={reveal}
          transition={{ duration: 0.5 }}
          className="mt-8 font-mono text-sm font-medium uppercase tracking-[0.2em] text-text-muted"
        >
          Hi, I&apos;m {siteConfig.name}
        </motion.p>

        <AnimatedTitle />

        <motion.div
          variants={reveal}
          transition={{ duration: 0.5 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-lg font-medium text-text-muted sm:text-xl"
        >
          <span>I&apos;m a</span>
          <Typewriter />
        </motion.div>

        <motion.p
          variants={reveal}
          transition={{ duration: 0.5 }}
          className="mt-7 max-w-2xl text-lg leading-8 text-text-muted sm:text-xl"
        >
          Saya membangun bot, website, dan otomasi yang tidak sekadar terlihat bagus — tetapi benar-benar
          mempersingkat kerja dan siap dipakai setiap hari.
        </motion.p>

        <motion.div
          variants={reveal}
          transition={{ duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton as="a" href="#kontak" className="btn-primary gap-2 px-7 py-3.5 text-base">
            Mulai project
            <ArrowUpRight size={18} />
          </MagneticButton>
          <MagneticButton as="a" href="#proyek" className="btn-secondary inline-flex items-center gap-2 px-7 py-3.5 text-base">
            Lihat karya
          </MagneticButton>
        </motion.div>

        <motion.div
          variants={reveal}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
        >
          <VisitorCounter />
          <div className="flex items-center gap-2.5">
            {socials.map(({ label, href, icon: Icon }) => (
              <MagneticButton
                key={label}
                as="a"
                href={href}
                strength={0.4}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-bg-elevated/40 text-text-muted transition hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/8 hover:text-primary backdrop-blur-sm"
              >
                <Icon size={18} />
              </MagneticButton>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.a
          href="#tentang"
          className="flex flex-col items-center gap-2 text-text-muted/50 transition-colors hover:text-primary"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll to about section"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}
