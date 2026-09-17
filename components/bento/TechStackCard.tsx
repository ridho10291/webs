"use client";
import { techStack } from "@/data/site";
import { SpotlightCard } from "@/components/Card";

export function TechStackCard({ className = "" }: { className?: string }) {
  return (
    <SpotlightCard className={`p-7 sm:p-8 ${className}`}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <span className="label">Tech Stack</span>
        <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
          {String(techStack.length).padStart(2, "0")} TOOLS
        </span>
      </div>

      <div className="mt-7 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
        {techStack.map((t) => (
          <a
            key={t.name}
            href={t.icon}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 rounded-xl border border-border bg-background/40 px-3 py-2.5 transition-colors hover:border-primary/20 hover:bg-muted"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white/5">
              {/* devicon svg */}
              <span
                className="h-4 w-4"
                style={{
                  WebkitMaskImage: `url(${t.icon})`,
                  maskImage: `url(${t.icon})`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  background: "currentColor",
                }}
              />
            </span>
            <span className="truncate text-[12px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              {t.name}
            </span>
          </a>
        ))}
      </div>
    </SpotlightCard>
  );
}