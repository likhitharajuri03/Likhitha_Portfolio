import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full relative">
      {/* Hero Section */}
      <Hero />

      {/* About Biography & Educational Timeline */}
      <About />

      {/* Skills Matrix */}
      <Skills />

      {/* Projects Dashboard (Filter & Search) */}
      <Projects />

      {/* Work Experience Timeline */}
      <Experience />


      {/* Achievements & Professional Certifications */}
      <Achievements />

      {/* Interactive Contact & Social Connection */}
      <Contact />

      {/* Page Footer */}
      <Footer />
    </main>
  );
}
