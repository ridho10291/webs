"use client";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import {
  Bot,
  CheckCircle2,
  Code2,
  Network,
  Sparkles,
  Terminal,
} from "lucide-react";
import { siteConfig, about } from "@/data/site";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

const PILLAR_ICONS = {
  Globe: Code2,
  Bot: Bot,
  Sparkles: Sparkles,
  Network: Network,
};

function CountUp({
  value,
  decimals = 0,
}: {
  value: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) =>
        setDisplay(
          v.toLocaleString("en-US", {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals,
          })
        ),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return <span ref={ref}>{display}</span>;
}

function parseStat(value: string) {
  const match = value.match(/^([\d.]+)([^0-9]*)$/);
  if (!match) return { num: null, suffix: value, decimals: 0 };
  const intPart = match[1];
  const decimals = intPart.includes(".")
    ? intPart.split(".")[1]?.length ?? 0
    : 0;
  return { num: parseFloat(intPart), suffix: match[2] ?? "", decimals };
}

export function About() {
  return (
    <section id="about" className="relative py-24 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          fn="about()"
          title="passionate developer"
          accent="'problem solver'"
        />

        {/* Metrics — object literal rows */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          {siteConfig.stats.map((stat, idx) => {
            const { num, suffix, decimals } = parseStat(stat.value);
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="rec p-4 sm:p-5"
              >
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#3d4f45]">
                  {String(idx + 1).padStart(2, "0")} · {stat.label}
                </div>
                <div className="mt-2 font-mono text-3xl font-bold tabular-nums text-[#8fff4a] shadow-[0_0_24px_-8px_rgba(143,255,74,0.4)] sm:text-4xl">
                  {num != null ? <CountUp value={num} decimals={decimals} /> : stat.value}
                  <span className="text-[#56e8ff]">{suffix}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bio window + pillar cases */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left: mission.ts */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="code-window h-full">
              <div className="titlebar">
                <span className="dot d-close" />
                <span className="dot d-min" />
                <span className="dot d-max" />
                <span className="ml-2 font-mono text-[11px] text-[#5f6f66]">mission.ts</span>
              </div>
              <div className="flex h-full flex-col justify-between p-5 sm:p-6">
                <div className="font-mono text-[12px] leading-relaxed text-[#d7f6c8]">
                  <p className="whitespace-pre-wrap">
                    <span className="text-[#5f6f66]">/*</span>
                    {"\n"}
                    <span className="text-[#5f6f66]">
                      {"  "}mission — why I build
                    </span>
                    {"\n"}
                    <span className="text-[#5f6f66]">*/</span>
                  </p>
                  <p className="mt-4 text-[#d7f6c8]">
                    <span className="text-[#ff3d81]">const</span>{" "}
                    <span className="text-[#8fff4a]">mission</span>
                    <span className="text-[#5f6f66]"> = `</span>
                    <span>{siteConfig.bio}</span>
                    <span className="text-[#5f6f66]">`</span>
                  </p>
                  <p className="mt-3 text-[#5f6f66]">
                    Fokus utama: menyatukan keindahan visual (UI/UX) dengan
                    ketangguhan arsitektur kode (Engineering).
                  </p>
                </div>

                <div className="mt-6 rounded border border-[#1d2a24] bg-[#0a0d13] p-3.5">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-[#8fff4a]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    [ ok ] {siteConfig.availability}
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] text-[#5f6f66]">
                    Terbuka untuk proyek website, implementasi bot, dan kolaborasi tim.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: this.about = { pillars } */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {about.pillars.map((pillar, idx) => {
              const IconComponent = PILLAR_ICONS[pillar.icon as keyof typeof PILLAR_ICONS] || Code2;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: idx * 0.09, duration: 0.55 }}
                  className="h-full"
                >
                  <TiltCard
                    maxTilt={5}
                    spotlight="rgba(143, 255, 74, 0.12)"
                    className="h-full"
                    contentClassName="group h-full"
                  >
                    <div className="rec hover-mg flex h-full flex-col justify-between p-5 sm:p-6">
                      <div>
                        <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#3d4f45]">
                          <span>case</span>
                          <span className="text-[#ff3d81]">
                            &quot;{pillar.title.toLowerCase().replace(/[^a-z0-9&\s]/g, "").replace(/\s+/g, "-")}&quot;
                          </span>
                        </div>
                        <h4 className="mt-4 flex items-center gap-2.5 text-base font-bold text-[#d7f6c8] transition-colors group-hover:text-[#8fff4a]">
                          <IconComponent className="h-4 w-4 text-[#8fff4a]" />
                          {pillar.title}
                          <span className="text-[#3d4f45]">()</span>
                        </h4>
                        <p className="mt-2.5 text-[12px] leading-relaxed text-[#5f6f66]">
                          {pillar.text}
                        </p>
                      </div>
                      <div className="mt-5 flex items-center gap-1.5 border-t border-[#1d2a24] pt-3 font-mono text-[10.5px] text-[#3d4f45] transition-colors group-hover:text-[#8fff4a]">
                        <Terminal className="h-3 w-3" />
                        <span>{idx + 1}.np</span>
                        <span className="text-[#5f6f66]">→ await run()</span>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}