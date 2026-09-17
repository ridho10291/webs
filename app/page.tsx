"use client";
import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { AuroraFX } from "@/components/AuroraFX";
import { CursorGlow } from "@/components/CursorGlow";
import { ParticleField } from "@/components/ParticleField";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Certificates } from "@/components/Certificates";
import { Guestbook } from "@/components/Guestbook";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#05060a] text-[#d7f6c8] selection:bg-[#8fff4a] selection:text-[#05060a]">
        {/* Intro Loader Animation */}
        <WelcomeScreen onComplete={() => setReady(true)} />

        {/* Interactive Background Particle Field */}
        <AuroraFX />
        <ParticleField />
        <CursorGlow />

        {/* Top Scroll Indicator */}
        <ScrollProgress />

        {/* Sticky Glass Navbar */}
        <Navbar />

        {/* Main Sections */}
        <main id="main-content" className="relative z-10" aria-hidden={!ready}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certificates />
          <Guestbook />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </MotionConfig>
  );
}