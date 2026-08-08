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
                className="group rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-cyan-500/50"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 transition-colors group-hover:bg-cyan-500/15 group-hover:text-cyan-500 dark:bg-indigo-500/15 dark:text-indigo-300">
                    <Icon size={22} />
                  </span>
                  <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                    {skill.name}
                  </span>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-700 group-hover:from-cyan-500 group-hover:to-indigo-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="mt-2 text-right text-xs font-medium text-slate-400 dark:text-slate-500">
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