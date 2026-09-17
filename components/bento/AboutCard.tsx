"use client";
import { motion } from "framer-motion";
import { Globe, Bot, Sparkles, Network } from "lucide-react";
import { about } from "@/data/site";
import { SpotlightCard } from "@/components/Card";

const ICONS: Record<string, typeof Globe> = {
  Globe,
  Bot,
  Sparkles,
  Network,
};

export function AboutCard({ className = "" }: { className?: string }) {
  return (
    <SpotlightCard className={`flex flex-col p-7 sm:p-8 ${className}`}>
      <span className="label">About Me</span>
      <h2 className="mt-4 font-serif-elegant text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] text-foreground">
        {about.bio}
      </h2>

      <div className="mt-auto grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
        {about.pillars.map((p) => {
          const Icon = ICONS[p.icon] ?? Globe;
          return (
            <div
              key={p.title}
              className="group/cell flex flex-col gap-2.5 bg-card p-5 transition-colors hover:bg-muted"
            >
              <Icon className="h-4.5 w-4.5 text-muted-foreground transition-colors group-hover/cell:text-foreground" />
              <p className="text-[13.5px] font-semibold tracking-tight text-foreground">
                {p.title}
              </p>
              <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                {p.text}
              </p>
            </div>
          );
        })}
      </div>
    </SpotlightCard>
  );
}