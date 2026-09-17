"use client";
import { useCallback, useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SpotlightCard } from "@/components/Card";

export function ContactCard({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <SpotlightCard className={`flex flex-col p-7 sm:p-8 ${className}`}>
      <span className="label">Contact</span>
      <div className="mt-6 flex flex-col gap-2">
        <div className="flex items-center gap-2.5 rounded-xl border border-border bg-background/40 px-4 py-3">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="truncate font-mono text-[12.5px] text-foreground">
            {siteConfig.email}
          </span>
        </div>
      </div>

      <p className="mt-6 max-w-[46ch] text-[13.5px] leading-relaxed text-muted-foreground">
        Punya project, ide, atau kolaborasi?{" "}
        <span className="text-foreground">Saya selalu terbuka</span> diskusi soal
        web, bot, dan otomasi.
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
        <button
          onClick={copy}
          className="group flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-[12px] text-muted-foreground transition-colors hover:border-primary/25 hover:text-foreground"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied!" : "Copy email"}
        </button>
        <a
          href={`mailto:${siteConfig.email}`}
          className="btn-creative"
        >
          Let's talk
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </SpotlightCard>
  );
}