"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, CheckCircle2, Calendar } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#02030a]/90 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.14 }}
            className="code-window scroll relative z-10 max-h-[90vh] w-full max-w-3xl bg-[#0a0d13]"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            <div className="titlebar sticky top-0 z-10">
              <span className="dot d-close" />
              <span className="dot d-min" />
              <span className="dot d-max" />
              <span className="ml-2 font-mono text-[11px] text-[#5f6f66]">
                projects/{project.id} — cat
              </span>
              <button
                type="button"
                onClick={onClose}
                className="ml-auto flex h-7 w-7 items-center justify-center rounded border border-[#1d2a24] text-[#5f6f66] transition-colors hover:border-[#ff3d81]/60 hover:text-[#ff3d81]"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5 sm:p-7">
              {/* Project image */}
              <div className="relative aspect-video w-full overflow-hidden rounded border border-[#1d2a24] bg-[#05060a]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d13] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                  <span className="chip hot">{project.category}</span>
                  <span className="chip">
                    <Calendar className="h-3 w-3" />
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="mt-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3d4f45]">
                  readme.md — {project.title}
                </div>
                <h3 className="mt-1.5 text-2xl font-bold text-[#d7f6c8] sm:text-3xl">
                  {project.title}
                </h3>

                <p className="mt-4 font-mono text-[12.5px] leading-relaxed text-[#5f6f66] sm:text-[13px]">
                  {project.longDescription}
                </p>

                {/* Key features */}
                <div className="mt-6 rounded border border-[#1d2a24] bg-[#05060a] p-4 sm:p-5">
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff3d81]">
                    // key features
                  </h4>
                  <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 font-mono text-[11.5px] text-[#d7f6c8]">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8fff4a]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech stack */}
                <div className="mt-6">
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#3d4f45]">
                    dependencies
                  </h4>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-[#1d2a24] px-3 py-1 font-mono text-[11px] text-[#56e8ff]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {project.liveDemo && (
                    <a href={project.liveDemo} target="_blank" rel="noreferrer" className="btn-exec">
                      <ExternalLink className="h-3.5 w-3.5" />
                      run demo
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="btn-ghost-line">
                      <Github className="h-3.5 w-3.5" />
                      view source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}