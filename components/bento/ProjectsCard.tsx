"use client";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/site";
import { SpotlightCard } from "@/components/Card";

export function ProjectsCard({ className = "" }: { className?: string }) {
  const featured = projects.slice(0, 3);

  return (
    <SpotlightCard className={`flex flex-col p-7 sm:p-8 ${className}`}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <span className="label">Featured Projects</span>
        <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
          {String(projects.length).padStart(2, "0")} SHIPPED
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {featured.map((p) => (
          <a
            key={p.id}
            href={p.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="group/item flex flex-col gap-4 rounded-2xl border border-border bg-background/40 p-4 transition-colors hover:border-primary/20 hover:bg-muted sm:flex-row sm:items-center"
          >
            <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl bg-background sm:h-20 sm:w-32">
              <img
                src={p.image}
                alt={`${p.title} preview`}
                loading="lazy"
                className="h-full w-full object-cover opacity-70 transition-all duration-500 group-hover/item:scale-105 group-hover/item:opacity-100"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2.5">
                <p className="truncate text-[15px] font-semibold tracking-tight text-foreground">
                  {p.title}
                </p>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {p.year}
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {p.technologies.slice(0, 3).map((t) => (
                  <span key={t} className="tag px-2 py-0.5 text-[10px]">
                    {t}
                  </span>
                ))}
                {p.technologies.length > 3 && (
                  <span className="font-mono text-[10px] text-muted-foreground">
                    +{p.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-full border border-border p-2 text-muted-foreground transition-colors group-hover/item:border-primary/25 group-hover/item:text-foreground">
                <Github className="h-3.5 w-3.5" />
              </span>
              <span className="rounded-full border border-border p-2 text-muted-foreground transition-colors group-hover/item:border-primary/25 group-hover/item:text-foreground">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </SpotlightCard>
  );
}