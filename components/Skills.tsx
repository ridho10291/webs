import {
  Bot,
  Boxes,
  Component,
  Database,
  FileCode,
  FileJson,
  GitBranch,
  MessageCircle,
  Server,
  Zap,
} from "lucide-react";
import { skills } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";

const iconMap: Record<string, typeof Zap> = {
  FileCode,
  Server,
  Bot,
  Component,
  FileJson,
  Database,
  GitBranch,
  Boxes,
  MessageCircle,
};

export function Skills() {
  return (
    <section id="skills" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          badge="Skill"
          title="Teknologi yang saya pakai"
          subtitle="Stack favorit untuk bikin bot, website, dan otomasi dari nol sampai production."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => {
            const Icon = iconMap[skill.icon] ?? Zap;
            return (
              <div
                key={skill.name}
                className="group rounded-2xl border border-violet-300/30 bg-violet-50/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-fuchsia-400/50 hover:shadow-xl hover:shadow-violet-500/10 dark:border-violet-900/40 dark:bg-violet-950/40 dark:hover:border-fuchsia-500/50 dark:hover:shadow-fuchsia-500/10"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 transition-colors group-hover:bg-cyan-500/15 group-hover:text-cyan-500 dark:bg-violet-500/15 dark:text-violet-300 dark:group-hover:text-cyan-400">
                    <Icon size={22} />
                  </span>
                  <span className="font-semibold text-sm text-violet-950 dark:text-violet-100">
                    {skill.name}
                  </span>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-violet-100 dark:bg-violet-950/80">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-700 group-hover:from-fuchsia-500 group-hover:to-cyan-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="mt-2 text-right text-xs font-medium text-violet-400 dark:text-violet-400/70">
                  {skill.level}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}