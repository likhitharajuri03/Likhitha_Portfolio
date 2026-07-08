"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Mail, FileText, ArrowRight, MousePointer } from "lucide-react";
import { Github, Linkedin } from "@/components/BrandIcons";

export default function Hero() {
  const { setCursorType } = useApp();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Custom typing animation loop
  const words = ["AI/ML Developer", "Database Systems Enthusiast", "Software Engineer", "Research Scholar"];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const activeWord = words[currentWordIdx];
    
    const handleType = () => {
      if (!isDeleting) {
        setDisplayedText(activeWord.substring(0, displayedText.length + 1));
        setTypingSpeed(100);
        
        if (displayedText === activeWord) {
          // Pause at full word
          setTypingSpeed(1800);
          setIsDeleting(true);
        }
      } else {
        setDisplayedText(activeWord.substring(0, displayedText.length - 1));
        setTypingSpeed(55);
        
        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentWordIdx((prev) => (prev + 1) % words.length);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIdx, typingSpeed]);

  // Mouse-tracking spotlight variables
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroRef.current.style.setProperty("--mouse-x", `${x}px`);
    heroRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadResume = () => {
    window.open("https://drive.google.com/file/d/1mZw3Wpk8R1Or4dFwT2mB6IyuQ-4LRycc/view?usp=drivesdk", "_blank");
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 overflow-hidden bg-zinc-950 text-white select-none dark:bg-zinc-950 light:bg-slate-50 light:text-zinc-900 border-b border-zinc-900/60 light:border-zinc-200"
    >
      {/* Local Spotlight Glow */}
      <div className="absolute inset-0 spotlight pointer-events-none z-0 opacity-80" />

      {/* Hero Content Wrapper */}
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center z-10 space-y-8">
        
        {/* Upper Tag / Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-xs text-indigo-400 font-display font-medium dark:border-indigo-500/20 dark:bg-indigo-500/5 light:border-indigo-200 light:bg-indigo-50/50 light:text-indigo-600"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Open to Internships, Projects & Full-Time Roles</span>
        </motion.div>

        {/* Name Header with reveal effect */}
        <div className="space-y-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs uppercase tracking-[0.25em] font-display text-zinc-500 light:text-zinc-400 font-medium"
          >
            Hi there, I am
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 90 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight font-display bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent dark:from-white dark:via-zinc-200 dark:to-zinc-500 light:from-zinc-950 light:via-zinc-800 light:to-zinc-600"
            >
              Rajuri Likhitha
            </motion.h1>
          </div>
        </div>

        {/* Dynamic Typing Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="h-8 flex items-center justify-center text-lg sm:text-xl font-light text-zinc-400 font-sans light:text-zinc-500"
        >
          <span>I design & engineer&nbsp;</span>
          <span className="font-semibold text-indigo-400 dark:text-indigo-400 light:text-indigo-600 border-r border-indigo-400/80 pr-1 animate-[pulse_1s_infinite]">
            {displayedText}
          </span>
        </motion.div>

        {/* Biography Blurb */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="max-w-2xl text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 light:text-zinc-500 leading-relaxed font-sans"
        >
          Computer Science undergraduate with hands-on experience in full-stack development, machine learning, and backend engineering. Passionate about building reliable, scalable applications and contributing to innovative software products.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full pt-4"
        >
          <button
            onClick={() => handleScrollTo("projects")}
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
            className="flex items-center gap-2 group rounded-full bg-white text-zinc-950 hover:bg-zinc-200 px-6 py-3 text-xs font-semibold tracking-wider font-display transition-all duration-300 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 light:bg-zinc-900 light:text-white light:hover:bg-zinc-800 cursor-none w-full sm:w-auto justify-center"
          >
            <span>Explore Work</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={handleDownloadResume}
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
            className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 px-6 py-3 text-xs font-semibold tracking-wider font-display transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/80 light:border-zinc-200 light:bg-white light:text-zinc-700 light:hover:bg-zinc-50 cursor-none w-full sm:w-auto justify-center"
          >
            <FileText className="w-4 h-4" />
            <span>View My Resume</span>
          </button>
        </motion.div>

        {/* Magnetic Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="flex gap-5 pt-8 z-10"
        >
          {[
            { icon: <Github className="w-4 h-4" />, href: "https://github.com/likhitharajuri03", name: "GitHub" },
            { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com/in/rajuri-likhitha", name: "LinkedIn" },
            { icon: <Mail className="w-4 h-4" />, href: "mailto:likhitha.rajuri.03@gmail.com", name: "Email" },
          ].map((soc) => (
            <a
              key={soc.name}
              href={soc.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorType("pointer")}
              onMouseLeave={() => setCursorType("default")}
              className="p-3 rounded-full border border-zinc-900 bg-zinc-900/20 hover:border-zinc-700 hover:text-indigo-400 text-zinc-400 transition-all duration-300 dark:border-zinc-900 dark:bg-zinc-900/20 dark:hover:border-zinc-700 light:border-zinc-200 light:bg-white light:text-zinc-500 light:hover:border-zinc-400 light:hover:text-indigo-600 cursor-none"
              title={soc.name}
            >
              {soc.icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Mouse pointer custom alert for first time users */}
      <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-2 text-[10px] text-zinc-600 font-display">
        <MousePointer className="w-3.5 h-3.5" />
        <span>Hover elements to reveal special effects</span>
      </div>

      {/* Smooth Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        onClick={() => handleScrollTo("about")}
        onMouseEnter={() => setCursorType("pointer")}
        onMouseLeave={() => setCursorType("default")}
        className="absolute bottom-8 cursor-none flex flex-col items-center gap-1.5 select-none"
      >
        <span className="text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-600 light:text-zinc-400 font-display">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-zinc-800 dark:border-zinc-800 light:border-zinc-300 flex justify-center p-1">
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-400 light:bg-zinc-500"
          />
        </div>
      </motion.div>
    </section>
  );
}
