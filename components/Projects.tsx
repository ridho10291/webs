"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Maximize2 } from "lucide-react";
import { projectsData, type Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

const CATEGORIES = [
  "All Projects",
  "Web Application",
  "Bot & Automation",
  "Creative Web",
] as const;

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All Projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projectsData.filter((project) =>
    activeCategory === "All Projects" ? true : project.category === activeCategory
  );

  return (
    <section id="projects" className="relative py-24 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          fn="projects[]"
          keyword="const"
          title="selected works"
          accent="'& creations'"
        />

        {/* Filter tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded border px-3.5 py-2 font-mono text-[11px] uppercase tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "border-[#8fff4a]/60 bg-[#8fff4a]/10 text-[#8fff4a] shadow-[0_0_16px_rgba(143,255,74,0.15)]"
                    : "border-[#1d2a24] text-[#5f6f66] hover:border-[#1d2a24] hover:text-[#d7f6c8]"
                }`}
              >
                <span className="mr-1.5 text-[#3d4f45]">$</span>
                filter --tag=&quot;{cat}&quot;
              </button>
            );
          })}
        </div>

        {/* Projects grid */}
        <motion.div layout className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const featured = activeCategory === "All Projects" && idx === 0;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35 }}
                  className={`h-full ${featured ? "md:col-span-2" : ""}`}
                >
                  <TiltCard maxTilt={4} className="h-full">
                    <div className="rec group flex h-full flex-col justify-between overflow-hidden">
                      {/* Image banner */}
                      <div
                        className={`relative w-full overflow-hidden border-b border-[#1d2a24] bg-[#0a0d13] ${
                          featured ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[16/10]"
                        }`}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d13] via-transparent to-transparent" />

                        <div className="absolute left-3 top-3 right-3 flex items-center justify-between">
                          <span className="chip hot">{project.category}</span>
                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="flex h-8 w-8 items-center justify-center rounded border border-[#1d2a24] bg-[#05060a]/80 text-[#d7f6c8] transition-colors hover:border-[#8fff4a]/60 hover:text-[#8fff4a]"
                            title="View Details"
                          >
                            <Maximize2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        {featured && (
                          <div className="absolute bottom-3 left-3 font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#8fff4a]">
                            // featured
                          </div>
                        )}
                      </div>

                      {/* Record body */}
                      <div
                        className={`flex flex-1 flex-col justify-between p-5 sm:p-6 ${
                          featured ? "md:flex-row md:items-center md:gap-6" : ""
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="font-mono text-[10px] text-[#3d4f45]">
                            <span className="text-[#ff3d81]">projects</span>
                            .push
                            <span className="text-[#5f6f66]">(</span>
                            <span className="text-[#3d4f45]">{String(idx).padStart(2, "0")}</span>
                            <span className="text-[#5f6f66]">)</span>
                          </div>
                          <h3 className="mt-1.5 text-lg font-bold text-[#d7f6c8] transition-colors group-hover:text-[#8fff4a] sm:text-xl">
                            {project.title}
                          </h3>
                          <p className="mt-2 font-mono text-[11.5px] leading-relaxed text-[#5f6f66] sm:text-[12px]">
                            {project.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="rounded border border-[#1d2a24] px-2 py-0.5 font-mono text-[10px] text-[#56e8ff]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div
                          className={`mt-5 flex items-center gap-3 border-t border-[#1d2a24] pt-4 md:mt-0 md:flex-col md:items-end md:border-t-0 md:border-l md:pt-0 md:pl-5 ${
                            featured ? "md:border-l" : ""
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="btn-ghost-line px-3.5 py-2 text-[11px]"
                          >
                            <Maximize2 className="h-3 w-3" />
                            cat
                          </button>
                          <div className="flex items-center gap-2 md:mt-2">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-8 w-8 items-center justify-center rounded border border-[#1d2a24] text-[#5f6f66] transition-colors hover:border-[#8fff4a]/60 hover:text-[#8fff4a]"
                                title="View Source Code"
                              >
                                <Github className="h-3.5 w-3.5" />
                              </a>
                            )}
                            {project.liveDemo && (
                              <a
                                href={project.liveDemo}
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-8 w-8 items-center justify-center rounded border border-[#8fff4a]/40 text-[#8fff4a] transition-colors hover:border-[#8fff4a] hover:bg-[#8fff4a]/10"
                                title="Live Preview"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}