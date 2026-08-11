"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Layers3, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="proyek" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="Karya pilihan"
            title="Built to solve real work."
            subtitle="Dari alur order otomatis sampai e-commerce, setiap project dirancang agar terasa sederhana untuk pengguna dan kuat di balik layar."
          />
        </motion.div>

        <motion.div
          className="mt-14 grid gap-5 lg:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55 }}
              className="group surface relative overflow-hidden rounded-[1.5rem] p-5 sm:p-7"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition duration-500 group-hover:bg-primary/20" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-3xl shadow-inner shadow-primary/10">
                    {project.emoji}
                  </div>
                  <div className="flex items-center gap-2">
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                        <Sparkles size={12} /> Featured
                      </span>
                    )}
                    <span className="font-mono text-xs text-text-muted">0{index + 1}</span>
                  </div>
                </div>

                <h3 className="mt-7 max-w-md text-2xl font-bold tracking-tight text-text transition-colors group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-xl leading-7 text-text-muted">{project.description}</p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-lg border border-border/70 bg-bg/45 px-2.5 py-1.5 text-xs font-medium text-text-muted">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border/70 pt-5">
                  {project.source && (
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-text-muted transition hover:text-primary"
                    >
                      <Github size={17} /> Lihat kode
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-text px-4 py-2.5 text-sm font-bold text-bg transition hover:-translate-y-0.5 hover:bg-primary"
                    >
                      Buka demo <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.a
          href="#kontak"
          className="surface mx-auto mt-8 flex max-w-3xl items-center justify-between gap-5 rounded-2xl p-5 text-left transition hover:-translate-y-1 hover:border-primary/50 sm:p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <span className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent"><Layers3 size={21} /></span>
            <span>
              <span className="block font-bold text-text">Punya ide yang belum ada di sini?</span>
              <span className="mt-1 block text-sm text-text-muted">Ceritakan kebutuhanmu, kita pecahkan bersama.</span>
            </span>
          </span>
          <ArrowUpRight className="shrink-0 text-primary" />
        </motion.a>
      </div>
    </section>
  );
}
