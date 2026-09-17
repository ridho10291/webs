"use client";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  Bot,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Play,
  Send,
  Zap,
} from "lucide-react";
import { siteConfig, techStack } from "@/data/site";
import { TiltCard } from "./TiltCard";

const ROLES = [
  "Front-End Developer",
  "Bot & Automation Engineer",
  "UI/UX Enthusiast",
  "Fullstack Explorer",
];

const SOURCE_LINES = [
  { num: 1, code: `// ridho — portfolio.spec`, color: "text-[#5f6f66]" },
  { num: 2, code: `const ridho = {`, color: "text-[#ff3d81]" },
  { num: 3, code: `  name: "Ridho",`, color: "text-[#d7f6c8]" },
  { num: 4, code: `  role: "Junior Web Developer",`, color: "text-[#d7f6c8]" },
  { num: 5, code: `  live: true,`, color: "text-[#d7f6c8]" },
  { num: 6, code: `  focus: `, color: "text-[#d7f6c8]" },
  { num: 7, code: `}` , color: "text-[#ff3d81]" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Mouse parallax for the ambient glow orbs.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothMx = useSpring(mx, { stiffness: 40, damping: 20 });
  const smoothMy = useSpring(my, { stiffness: 40, damping: 20 });
  const orb1X = useTransform(smoothMx, (v) => v * 42);
  const orb1Y = useTransform(smoothMy, (v) => v * 36);
  const orb2X = useTransform(smoothMx, (v) => v * -30);
  const orb2Y = useTransform(smoothMy, (v) => v * -24);

  // Scroll-scrubbed exit: the terminal "releases" out of the first viewport.
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.94]);
  const heroY = useTransform(scrollYProgress, [0, 0.7], [0, -60]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // Role typing effect: type → hold → delete → next role (single timer per state).
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const atFullRole = !isDeleting && displayText.length === currentRole.length;
    const delay = atFullRole ? 1600 : isDeleting ? 34 : 66;

    const timer = setTimeout(() => {
      if (atFullRole) {
        setIsDeleting(true);
      } else if (!isDeleting) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      } else {
        const next = currentRole.slice(0, displayText.length - 1);
        setDisplayText(next);
        if (next.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      {/* Ambient background glow orbs (mouse parallax) */}
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[#8fff4a]/12 blur-[140px]"
      />
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="pointer-events-none absolute top-1/3 -right-20 h-[450px] w-[450px] rounded-full bg-[#ff3d81]/10 blur-[130px]"
      />

      <motion.div
        style={{
          opacity: prefersReduced ? 1 : heroOpacity,
          scale: prefersReduced ? 1 : heroScale,
          y: prefersReduced ? 0 : heroY,
        }}
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Availability line above the window */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.08em]"
        >
          <span className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#8fff4a] shadow-[0_0_10px_rgba(143,255,74,0.9)]" />
          <span className="text-[#8fff4a]">[ ok ]</span>
          <span className="text-[#d7f6c8]">{siteConfig.availability}</span>
        </motion.div>

        {/* The Terminal — source buffer (left) + runtime output (right) */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="code-window">
            <div className="titlebar">
              <span className="dot d-close" />
              <span className="dot d-min" />
              <span className="dot d-max" />
              <span className="ml-2 hidden font-mono text-[11px] tracking-wider text-[#5f6f66] sm:block">
                ~/ridho/portfolio — dev
              </span>
              <span className="ml-auto hidden font-mono text-[10px] text-[#3d4f45] sm:block">
                node v20 · ts 5.7 · next 15
              </span>
            </div>

            <div className="grid lg:grid-cols-2">
              {/* ── Left: live source buffer ── */}
              <div className="border-b border-[#1d2a24] p-5 sm:p-7 lg:border-b-0 lg:border-r">
                <div className="font-mono text-[12.5px] leading-[1.9] sm:text-[13.5px]">
                  {SOURCE_LINES.slice(0, 5).map((line, i) => (
                    <motion.p
                      key={line.num}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.12, duration: 0.4 }}
                      className="whitespace-nowrap"
                    >
                      <span className="mr-4 inline-block w-4 select-none text-right text-[#3d4f45]">
                        {line.num}
                      </span>
                      <span className={line.color}>{line.code}</span>
                    </motion.p>
                  ))}

                  {/* focus: '<typed role>' */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.3 }}
                    className="whitespace-nowrap"
                  >
                    <span className="mr-4 inline-block w-4 select-none text-right text-[#3d4f45]">
                      6
                    </span>
                    <span className="text-[#d7f6c8]">
                      <span className="text-[#8fff4a]">&quot;</span>
                      <span className="animate-none">{displayText}</span>
                      <span className="text-[#8fff4a]">&quot;</span>
                    </span>
                    <span className="cursor-block ml-1" aria-hidden="true" />
                  </motion.p>

                  <motion.p
                    key={SOURCE_LINES[6].num}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.15, duration: 0.4 }}
                    className="whitespace-nowrap"
                  >
                    <span className="mr-4 inline-block w-4 select-none text-right text-[#3d4f45]">
                      {SOURCE_LINES[6].num}
                    </span>
                    <span className={SOURCE_LINES[6].color}>{SOURCE_LINES[6].code}</span>
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    className="mt-3 max-w-xl whitespace-pre-line text-[12px] font-normal leading-relaxed text-[#5f6f66] sm:text-[12.5px]"
                  >
                    {siteConfig.description}
                  </motion.p>
                </div>

                {/* Run-command actions */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.65, duration: 0.5 }}
                  className="mt-7 flex flex-wrap items-center gap-3"
                >
                  <a href="#projects" className="btn-exec">
                    <Play className="h-3.5 w-3.5" />
                    run projects
                    <span className="text-[#5f6f66]">→</span>
                  </a>
                  <a href="#contact" className="btn-ghost-line">
                    <Mail className="h-3.5 w-3.5" />
                    contact()
                  </a>
                </motion.div>

                {/* Tech import marquee */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.85, duration: 0.6 }}
                  className="relative mt-8 overflow-hidden"
                  aria-hidden="true"
                >
                  <div className="mb-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#3d4f45]">
                    <span>imports</span>
                    <div className="h-px flex-1 bg-[#1d2a24]" />
                  </div>
                  <div className="marquee-track animate-marquee">
                    {[...techStack.slice(0, 8), ...techStack.slice(0, 8)].map((t, i) => (
                      <span
                        key={`${t.name}-${i}`}
                        className="flex shrink-0 items-center gap-6 px-3 font-mono text-[11px] tracking-[0.14em] text-[#5f6f66]"
                      >
                        {t.name}
                        <span className="text-[#8fff4a]/50">::</span>
                      </span>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[#05060a] to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[#05060a] to-transparent" />
                </motion.div>
              </div>

              {/* ── Right: runtime output panel ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.8 }}
                className="relative flex flex-col justify-between p-5 sm:p-7"
              >
                <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#3d4f45]">
                  <span className="text-[#8fff4a]">▸</span> runtime — output
                </div>

                <TiltCard
                  maxTilt={6}
                  spotlight="rgba(143, 255, 74, 0.14)"
                  className="relative mx-auto w-full max-w-[340px]"
                >
                  <div className="relative overflow-hidden rounded-lg border border-[#1d2a24] bg-[#0a0d13]">
                    {/* Avatar */}
                    <div className="relative aspect-[4/4.6] overflow-hidden bg-[#0a0d13]">
                      <img
                        src={siteConfig.avatar}
                        alt={siteConfig.name}
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d13] via-transparent to-transparent" />
                      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded border border-[#1d2a24] bg-[#05060a]/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#8fff4a]">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#8fff4a] shadow-[0_0_8px_rgba(143,255,74,0.9)]" />
                        online
                      </div>
                      <div className="absolute right-3 top-3 rounded border border-[#1d2a24] bg-[#05060a]/80 px-2 py-1 font-mono text-[9px] text-[#56e8ff]">
                        @ridho
                      </div>
                    </div>

                    {/* Object rows */}
                    <div className="divide-y divide-[#1d2a24] border-t border-[#1d2a24] bg-[#0a0d13] font-mono text-[11.5px]">
                      <div className="flex items-center justify-between px-3.5 py-2.5">
                        <span className="text-[#5f6f66]">location:</span>
                        <span className="text-[#d7f6c8]">{siteConfig.location}</span>
                      </div>
                      <div className="flex items-center justify-between px-3.5 py-2.5">
                        <span className="text-[#5f6f66]">role:</span>
                        <span className="text-[#d7f6c8]">{siteConfig.role}</span>
                      </div>
                      <div className="flex items-center justify-between px-3.5 py-2.5">
                        <span className="text-[#5f6f66]">email:</span>
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="text-[#56e8ff] transition-colors hover:text-[#8fff4a]"
                        >
                          {siteConfig.email}
                        </a>
                      </div>
                    </div>

                    {/* Status bar */}
                    <div className="flex items-center justify-between border-t border-[#1d2a24] bg-[#05060a] px-3.5 py-2 font-mono text-[9.5px] uppercase tracking-[0.16em]">
                      <span className="text-[#5f6f66]">process</span>
                      <span className="text-[#8fff4a]">
                        ready <span className="cursor-block ml-1.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </TiltCard>

                {/* Console log chips */}
                <div className="mt-5 space-y-2">
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.55, duration: 0.45 }}
                    className="flex items-center gap-2 font-mono text-[10.5px]"
                  >
                    <Zap className="h-3 w-3 text-[#ffb020]" />
                    <span className="text-[#5f6f66]">#</span>
                    <span className="text-[#d7f6c8]">12+ projects shipped</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.7, duration: 0.45 }}
                    className="flex items-center gap-2 font-mono text-[10.5px]"
                  >
                    <Bot className="h-3 w-3 text-[#8fff4a]" />
                    <span className="text-[#5f6f66]">#</span>
                    <span className="text-[#d7f6c8]">bots online 24/7</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Social links row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.7 }}
          className="mt-7 flex flex-wrap items-center gap-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#3d4f45]">
            // connect
          </span>
          <div className="flex items-center gap-2">
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="flex h-9 w-9 items-center justify-center rounded border border-[#1d2a24] text-[#5f6f66] transition-all hover:border-[#8fff4a]/60 hover:text-[#8fff4a]"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="flex h-9 w-9 items-center justify-center rounded border border-[#1d2a24] text-[#5f6f66] transition-all hover:border-[#8fff4a]/60 hover:text-[#8fff4a]"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Profile"
              className="flex h-9 w-9 items-center justify-center rounded border border-[#1d2a24] text-[#5f6f66] transition-all hover:border-[#8fff4a]/60 hover:text-[#8fff4a]"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.socials.telegram}
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram Profile"
              className="flex h-9 w-9 items-center justify-center rounded border border-[#1d2a24] text-[#5f6f66] transition-all hover:border-[#8fff4a]/60 hover:text-[#8fff4a]"
            >
              <Send className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Blinking scroll cue */}
      <div className="mt-12 flex justify-center">
        <a
          href="#about"
          className="group flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#3d4f45] transition-colors hover:text-[#8fff4a]"
        >
          <ArrowDown className="h-3.5 w-3.5" />
          scroll
          <span className="cursor-block" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}