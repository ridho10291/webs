import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Guestbook } from "@/components/Guestbook";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Hero />
      <About />
      <Projects />
      <Guestbook />
      <ContactSection />
      <Footer />
    </main>
  );
}
