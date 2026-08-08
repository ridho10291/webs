import { Aurora } from "@/components/Aurora";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Guestbook } from "@/components/Guestbook";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Aurora />
      <div className="relative">
        <Hero />
        <About />
        <Projects />
        <Guestbook />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}