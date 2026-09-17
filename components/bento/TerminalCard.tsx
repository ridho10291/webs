"use client";
import { useEffect, useState } from "react";
import { Lock, Cpu, Activity, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SpotlightCard } from "@/components/Card";

const STATS = [
  { icon: Activity, key: "STATUS", value: "ONLINE" },
  { icon: Cpu, key: "BUILD", value: "STABLE" },
  { icon: Lock, key: "UPTIME", value: "24/7" },
];

export function TerminalCard({ className = "" }: { className?: string }) {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour12: false,
          timeZone: "Asia/Jakarta",
        })
      );
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <SpotlightCard className={`flex flex-col p-7 sm:p-8 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="label">System Status</span>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="status-dot" />
          Live
        </span>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-background/60 p-4 font-mono text-[12px] leading-relaxed">
        <p className="text-muted-foreground">$ ridho --status</p>
        {STATS.map(({ icon: Icon, key, value }) => (
          <p key={key} className="flex items-center gap-2.5 text-foreground">
            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">{key}:</span> {value}
          </p>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {siteConfig.location}
        </span>
        <span className="font-mono text-[13px] tabular-nums text-foreground">
          {time} <span className="text-muted-foreground">WIB</span>
        </span>
      </div>
    </SpotlightCard>
  );
}