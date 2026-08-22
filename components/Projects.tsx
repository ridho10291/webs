"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Layers3, Sparkles, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="proyek" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <motion.div
        className="absolute left-[3%] top-[20%] h-56 w-56 rounded-full bg-primary/8 blur-[110px]"
        animate={{ scale: [1, 1.15, 0.9, 1], opacity: [0.15, 0.3, 0.1, 0.15] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute right-[5%] bottom-[10%] h-40 w-40 rounded-full bg-secondary/8 blur-[90px]"
        animate={{ scale: [1, 0.9, 1.2, 1], opacity: [0.12, 0.25, 0.08, 0.12] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="Karya pilihan"
            title="Built to solve real work."
            subtitle="Dari alur order otomatis sampai e-commerce, setiap project dirancang agar terasa sederhana untuk pengguna dan kuat di balik layar."
          />
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 lg:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55 }}
              className="group shimmer-sweep surface relative overflow-hidden rounded-[1.5rem] p-6 sm:p-8"
              whileHover={{ y: -6 }}
            >
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/8 blur-3xl transition duration-500 group-hover:bg-primary/15" aria-hidden="true" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/15 bg-primary/8 text-4xl shadow-inner shadow-primary/8">
                    {project.emoji}
                  </div>
                  <div className="flex items-center gap-2.5">
                    {project.featured && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                        <Sparkles size={12} /> Featured
                      </span>
                    )}
                    <span className="font-mono text-xs text-text-muted/60">0{index + 1}</span>
                  </div>
                </div>

                <h3 className="mt-7 max-w-md text-2xl font-bold tracking-tight text-text transition-colors group-hover:text-primary sm:text-[1.65rem]">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-xl leading-7 text-text-muted">{project.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-border/60 bg-bg/35 px-2.5 py-1.5 text-xs font-medium text-text-muted transition-colors group-hover:border-primary/30 group-hover:text-text-muted/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-border/60 pt-5">
                  {project.source && (
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-text-muted transition hover:text-primary"
                    >
                      <Github size={17} /> Source code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-bold text-bg shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 hover:shadow-primary/30"
                    >
                      Live demo <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.a
          href="#kontak"
          className="surface shimmer-sweep mx-auto mt-10 flex max-w-3xl items-center justify-between gap-5 rounded-2xl p-5 text-left transition hover:-translate-y-1 hover:border-primary/40 sm:p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          whileHover={{ y: -6 }}
        >
          <span className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent"><Layers3 size={22} /></span>
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
