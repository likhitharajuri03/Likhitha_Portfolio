"use client";

import React, { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { ArrowUp, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/BrandIcons";

export default function Footer() {
  const { setCursorType } = useApp();
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScrollVisibility = () => {
      if (window.scrollY > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScrollVisibility);
    return () => window.removeEventListener("scroll", handleScrollVisibility);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuickLink = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-6 bg-zinc-950 text-zinc-500 border-t border-zinc-900/60 dark:bg-zinc-950 dark:text-zinc-500 light:bg-slate-50 light:text-zinc-500 light:border-zinc-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand Credits */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <span className="font-display font-bold text-white light:text-zinc-950 text-sm">
            Likhitha Rajuri
          </span>
          <span className="text-[10px] font-sans text-zinc-500 light:text-zinc-400">
            © {new Date().getFullYear()} All Rights Reserved. Built with Next.js, Tailwind & Framer Motion.
          </span>
        </div>

        {/* Center: Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-display">
          {[
            { name: "About", href: "about" },
            { name: "Skills", href: "skills" },
            { name: "Projects", href: "projects" },
            { name: "Experience", href: "experience" },
            { name: "Contact", href: "contact" }
          ].map((link) => (
            <a
              key={link.name}
              href={`#${link.href}`}
              onClick={(e) => handleQuickLink(e, link.href)}
              onMouseEnter={() => setCursorType("pointer")}
              onMouseLeave={() => setCursorType("default")}
              className="hover:text-white light:hover:text-zinc-950 transition-colors cursor-none text-[11px] font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Side: Social links */}
        <div className="flex items-center gap-4">
          {[
            { icon: <Github className="w-4 h-4" />, href: "https://github.com/likhitharajuri03", name: "GitHub" },
            { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com/in/rajuri-likhitha", name: "LinkedIn" },
            { icon: <Mail className="w-4 h-4" />, href: "mailto:likhitha.rajuri.03@gmail.com", name: "Email" }
          ].map((soc, idx) => (
            <a
              key={idx}
              href={soc.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorType("pointer")}
              onMouseLeave={() => setCursorType("default")}
              className="p-2 rounded-full border border-zinc-900 bg-zinc-900/10 hover:border-zinc-800 hover:text-white light:border-zinc-200 light:bg-white light:hover:text-zinc-850 cursor-none transition-colors"
              title={soc.name}
            >
              {soc.icon}
            </a>
          ))}
        </div>

      </div>

      {/* Floating Scroll to Top widget */}
      {showScroll && (
        <button
          onClick={handleScrollToTop}
          onMouseEnter={() => setCursorType("pointer")}
          onMouseLeave={() => setCursorType("default")}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-indigo-400 cursor-none shadow-2xl transition-all duration-300 z-30 light:bg-white light:border-zinc-200 light:text-indigo-600 dark:bg-zinc-900 dark:border-zinc-800"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </footer>
  );
}
