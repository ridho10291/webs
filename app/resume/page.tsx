import type { Metadata } from "next";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { siteConfig, about, projects, techStack } from "@/data/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume ${siteConfig.fullName}`,
};

export default function ResumePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 dot-grid opacity-15" />
      </div>

      <div className="wrap relative z-10 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Home
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main resume */}
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
            <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
              <div>
                <p className="font-serif-elegant text-4xl text-foreground">
                  {siteConfig.fullName}
                </p>
                <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                  {siteConfig.role}
                </p>
              </div>
              <span className="flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[11px] text-muted-foreground">
                <span className="status-dot" />
                {siteConfig.availability}
              </span>
            </div>

            <section className="border-b border-border py-8">
              <p className="label">About</p>
              <p className="mt-4 max-w-[64ch] text-[15px] leading-relaxed text-muted-foreground">
                {about.bio}
              </p>
            </section>

            <section className="border-b border-border py-8">
              <p className="label">Tech Stack</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {techStack.map((t) => (
                  <span key={t.name} className="tag">
                    {t.name}
                  </span>
                ))}
              </div>
            </section>

            <section className="py-8">
              <p className="label">Featured Work</p>
              <div className="mt-5 flex flex-col gap-4">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-2xl border border-border bg-background/40 p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[15px] font-semibold tracking-tight text-foreground">
                        {p.title}
                      </p>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {p.year}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Side panel */}
          <aside className="h-fit rounded-3xl border border-border bg-card p-8">
            <p className="label">Contact</p>
            <p className="mt-4 break-all font-mono text-[12.5px] text-foreground">
              {siteConfig.email}
            </p>
            <p className="mt-2 font-mono text-[12.5px] text-muted-foreground">
              {siteConfig.location}
            </p>

            <a
              href={`mailto:${siteConfig.email}`}
              className="btn-primary mt-6 w-full"
            >
              <Download className="h-4 w-4" />
              Hire me
            </a>

            <div className="mt-8 border-t border-border pt-6">
              <p className="label">Links</p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12.5px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  github.com/ridho-acr
                </a>
                <a
                  href={siteConfig.socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12.5px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  t.me/Byzeze43
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}