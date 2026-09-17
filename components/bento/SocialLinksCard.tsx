"use client";
import { Github, Linkedin, Instagram, Send } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SpotlightCard } from "@/components/Card";

const SOCIALS = [
  { label: "GitHub", handle: "@ridho-acr", href: siteConfig.socials.github, Icon: Github },
  { label: "LinkedIn", handle: "/in/ridho-acr", href: siteConfig.socials.linkedin, Icon: Linkedin },
  { label: "Instagram", handle: "@fanz9998", href: siteConfig.socials.instagram, Icon: Instagram },
  { label: "Telegram", handle: "@Byzeze43", href: siteConfig.socials.telegram, Icon: Send },
];

export function SocialLinksCard({ className = "" }: { className?: string }) {
  return (
    <SpotlightCard className={`p-7 sm:p-8 ${className}`}>
      <span className="label">Elsewhere</span>
      <div className="mt-6 grid grid-cols-2 gap-2.5">
        {SOCIALS.map(({ label, handle, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-3 transition-colors hover:border-primary/20 hover:bg-muted"
          >
            <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold tracking-tight text-foreground">
                {label}
              </span>
              <span className="block truncate font-mono text-[10.5px] text-muted-foreground">
                {handle}
              </span>
            </span>
          </a>
        ))}
      </div>
    </SpotlightCard>
  );
}