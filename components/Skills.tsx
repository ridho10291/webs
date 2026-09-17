"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Layers, Palette, Wrench, Sparkles } from "lucide-react";
import { skillsData } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

const CATEGORIES = [
  { id: "All", label: "all", icon: Sparkles },
  { id: "Frontend", label: "frontend", icon: Code },
  { id: "Backend", label: "backend", icon: Layers },
  { id: "Tools & DevOps", label: "tools", icon: Wrench },
  { id: "Design", label: "design", icon: Palette },
] as const;

/** Render level as a hard-edged block bar for the source-floor readout. */
function BlockBar({ level, color }: { level: number; color: string }) {
  const blocks = 16;
  const filled = Math.round((level / 100) * blocks);
  return (
    <span
      className="inline-flex gap-[2px] font-mono text-[11px] leading-none"
      aria-hidden="true"
    >
      {Array.from({ length: blocks }, (_, i) => (
        <span
          key={i}
          className="h-2.5 w-[5px]"
          style={{
            background: i < filled ? color : "transparent",
            border: `1px solid ${i < filled ? color : "#1d2a24"}`,
          }}
        />
      ))}
    </span>
  );
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredSkills = skillsData.filter((skill) =>
    activeCategory === "All" ? true : skill.category === activeCategory
  );

  return (
    <section id="skills" className="relative py-24 scroll-mt-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8fff4a]/6 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          fn="stack()"
          title="technologies i use"
          accent="'build & ship'"
        />

        {/* Category tabs as shell commands */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 rounded border px-3.5 py-2 font-mono text-[11.5px] transition-colors duration-200 ${
                  isActive
                    ? "border-[#8fff4a]/60 bg-[#8fff4a]/10 text-[#8fff4a] shadow-[0_0_16px_rgba(143,255,74,0.15)]"
                    : "border-[#1d2a24] text-[#5f6f66] hover:border-[#1d2a24] hover:text-[#d7f6c8]"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>
                  <span className="mr-1.5 text-[#3d4f45]">$</span>
                  ls --stack={cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills grid — object literal entries */}
        <motion.div
          layout
          className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <TiltCard maxTilt={6} className="h-full">
                  <div className="rec flex h-full flex-col justify-between p-4">
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded border border-[#1d2a24] bg-[#0a0d13] p-2 transition-transform duration-300 group-hover:scale-110">
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-[10px] text-[#3d4f45]">level</span>
                          <div className="font-mono text-sm font-bold tabular-nums text-[#8fff4a]">
                            {skill.level}
                            <span className="text-[#3d4f45]">%</span>
                          </div>
                        </div>
                      </div>

                      <h3 className="mt-3 font-mono text-[12.5px] font-bold text-[#d7f6c8]">
                        <span className="text-[#3d4f45]">const</span> {skill.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 font-mono text-[10.5px] leading-relaxed text-[#5f6f66]">
                        {skill.description}
                      </p>
                    </div>

                    <div className="mt-3 border-t border-[#1d2a24] pt-2.5">
                      <BlockBar level={skill.level} color={skill.color || "#8fff4a"} />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}