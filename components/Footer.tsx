"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Clock, Github, Instagram, Linkedin, Mail, Send } from "lucide-react";
import { footerContent, siteConfig } from "@/data/site";

const SOCIALS = [
  { label: "GitHub", href: siteConfig.socials.github, Icon: Github },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: Linkedin },
  { label: "Instagram", href: siteConfig.socials.instagram, Icon: Instagram },
  { label: "Telegram", href: siteConfig.socials.telegram, Icon: Send },
];

const LINKS = [
  { label: "about()", href: "#about" },
  { label: "stack()", href: "#skills" },
  { label: "projects[]", href: "#projects" },
  { label: "certificates[]", href: "#certificates" },
  { label: "guestbook{}", href: "#guestbook" },
  { label: "contact()", href: "#contact" },
];

function MarqueeRow({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-b border-[#1d2a24] py-5">
      <div className="marquee-track animate-marquee-slow gap-0" aria-hidden>
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-6 px-3 font-mono text-[12px] uppercase tracking-[0.18em] text-[#5f6f66]"
          >
            {item}
            <span className="text-[#8fff4a]/40">::</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#05060a]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#05060a]" />
    </div>
  );
}

export function Footer() {
  const [time, setTime] = useState("--:--:--");
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleString("en-GB", {
          hour12: false,
          timeZone: "Asia/Jakarta",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadVisits = async () => {
      try {
        const getRes = await fetch("/api/visitors");
        const getJson = getRes.ok ? await getRes.json() : null;
        if (!cancelled && getJson?.data?.count != null) setVisits(getJson.data.count);

        // Only count a visitor once per browser session (avoids inflating the
        // counter on every reload).
        let seen = false;
        try {
          seen = sessionStorage.getItem("ridho:visit") === "1";
        } catch {
          seen = false;
        }
        if (seen) return;

        const postRes = await fetch("/api/visitors", { method: "POST" });
        const postJson = postRes.ok ? await postRes.json() : null;
        try {
          sessionStorage.setItem("ridho:visit", "1");
        } catch {
          // storage blocked — ignore
        }
        if (!cancelled && postJson?.data?.count != null) setVisits(postJson.data.count);
      } catch {
        // network/DB unavailable — leave the counter hidden
      }
    };

    loadVisits();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <footer className="relative">
      <MarqueeRow items={footerContent.roles} />

      <div className="wrap grid grid-cols-2 gap-10 py-16 md:grid-cols-4">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <p className="flex items-center gap-2.5 font-mono text-lg font-bold text-[#d7f6c8]">
            <span className="text-[#8fff4a]">$</span> {siteConfig.name}.dev
            <span className="cursor-block" aria-hidden="true" />
          </p>
          <p className="mt-3 max-w-[26ch] font-mono text-[12px] leading-relaxed text-[#5f6f66]">
            {siteConfig.statusLine}
          </p>
          <a
            href={siteConfig.email && `mailto:${siteConfig.email}`}
            className="mt-4 inline-flex items-center gap-2 font-mono text-[11.5px] text-[#56e8ff] transition-colors hover:text-[#8fff4a]"
          >
            <Mail className="h-3.5 w-3.5" />
            {siteConfig.email}
          </a>
        </div>

        {/* Run targets */}
        <div className="space-y-3 font-mono">
          <p className="code-label">jump</p>
          {LINKS.map((l) => (
            <div key={l.href}>
              <a
                href={l.href}
                className="group inline-flex items-center gap-1 text-[12.5px] text-[#5f6f66] transition-colors hover:text-[#8fff4a]"
              >
                {l.label}
                <ArrowUpRight className="h-3 w-3 text-[#3d4f45] transition-colors group-hover:text-[#8fff4a]" />
              </a>
            </div>
          ))}
        </div>

        {/* Socials */}
        <div className="space-y-3 font-mono">
          <p className="code-label">% connect</p>
          {SOCIALS.map(({ label, href, Icon }) => (
            <div key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-[12.5px] text-[#5f6f66] transition-colors hover:text-[#8fff4a]"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </a>
            </div>
          ))}
        </div>

        {/* Machine stats */}
        <div className="space-y-3 font-mono">
          <p className="code-label">$ uptime</p>
          <p className="flex items-center gap-2 text-[12.5px] tabular-nums text-[#5f6f66]">
            <Clock className="h-3.5 w-3.5 text-[#8fff4a]" />
            {time}
          </p>
          <p className="code-label">$ version</p>
          <p className="text-[12px] text-[#d7f6c8]">2026 Ac Edition</p>
        </div>
      </div>

      {/* Status bar */}
      <div className="border-t border-[#1d2a24] bg-[#05060a]">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4 font-mono text-[10.5px] text-[#3d4f45]">
          <p>
            © {new Date().getFullYear()} {siteConfig.fullName} — all rights reserved
          </p>
          <p className="text-[#5f6f66]">
            built with <span className="text-[#8fff4a]">Next.js</span> ·{" "}
            <span className="text-[#8fff4a]">Tailwind</span> ·{" "}
            <span className="text-[#8fff4a]">Framer Motion</span>
          </p>
          {visits != null && (
            <p className="tabular-nums">
              VISITS:{" "}
              <span className="text-[#56e8ff]">{String(visits).padStart(3, "0")}</span>
            </p>
          )}
          <span className="cursor-block" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}