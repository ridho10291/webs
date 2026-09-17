"use client";
import { motion } from "framer-motion";
import { AboutCard } from "@/components/bento/AboutCard";
import { TechStackCard } from "@/components/bento/TechStackCard";
import { ProjectsCard } from "@/components/bento/ProjectsCard";
import { ContactCard } from "@/components/bento/ContactCard";
import { SocialLinksCard } from "@/components/bento/SocialLinksCard";
import { TerminalCard } from "@/components/bento/TerminalCard";

const ease = [0.16, 1, 0.3, 1] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { delay, duration: 0.7, ease },
  };
}

export function Bento() {
  return (
    <section id="stack" className="wrap relative pb-24 pt-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
        <motion.div id="about" {...fadeUp(0)} className="scroll-mt-28 md:col-span-2 lg:col-span-5">
          <AboutCard className="h-full md:min-h-[560px]" />
        </motion.div>

        <motion.div id="stack" {...fadeUp(0.08)} className="scroll-mt-28 lg:col-span-7">
          <TechStackCard className="h-full" />
        </motion.div>

        <motion.div id="projects" {...fadeUp(0.12)} className="scroll-mt-28 lg:col-span-7">
          <ProjectsCard className="h-full" />
        </motion.div>

        <motion.div id="contact" {...fadeUp(0.2)} className="scroll-mt-28 lg:col-span-5">
          <ContactCard className="h-full" />
        </motion.div>

        <motion.div {...fadeUp(0.16)} className="lg:col-span-4">
          <SocialLinksCard className="h-full" />
        </motion.div>

        <motion.div {...fadeUp(0.24)} className="lg:col-span-8">
          <TerminalCard className="h-full" />
        </motion.div>
      </div>
    </section>
  );
}