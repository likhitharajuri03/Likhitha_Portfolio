"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Menu, X, Terminal } from "lucide-react";

export default function Navbar() {
  const { 
    theme, 
    toggleTheme, 
    setCommandPaletteOpen, 
    setCursorType 
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "GitHub", href: "https://github.com/likhitharajuri03", isExternal: true },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal?: boolean) => {
    if (isExternal) {
      setIsOpen(false);
      return;
    }
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full ${
        scrolled
          ? "py-3 bg-zinc-950/75 dark:bg-zinc-950/75 light:bg-white/80 border-b border-zinc-900/50 light:border-zinc-100 backdrop-blur-md"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Signature Logo */}
        <div
          className="flex items-center gap-1.5 font-display text-lg font-bold tracking-tight text-white light:text-zinc-950"
        >
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">LR</span>
          <span className="hidden sm:inline font-light text-[14px] text-zinc-400 light:text-zinc-500">.developer</span>
        </div>

        {/* Desktop Navigation links */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              onClick={(e) => handleNavClick(e, item.href, item.isExternal)}
              onMouseEnter={() => setCursorType("pointer")}
              onMouseLeave={() => setCursorType("default")}
              className="text-xs tracking-wider uppercase font-display text-zinc-400 hover:text-white dark:text-zinc-400 dark:hover:text-white light:text-zinc-600 light:hover:text-zinc-950 transition-colors cursor-none"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Global Toolbar */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cmd+K trigger button */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
            className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 px-3 py-1.5 text-[10px] text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 light:border-zinc-200 light:bg-zinc-50 light:text-zinc-500 light:hover:bg-zinc-100 transition-all cursor-none"
            title="Open Command Palette"
          >
            <Terminal className="w-3.5 h-3.5" />
            <kbd className="font-sans text-[9px] opacity-75">Ctrl+K</kbd>
          </button>


        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2.5 md:hidden">

          {/* Command palette for mobile */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="p-2 rounded-full border border-zinc-900 light:border-zinc-200 text-zinc-400 light:text-zinc-600"
            aria-label="Open command palette"
          >
            <Terminal className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-zinc-900 light:border-zinc-200 text-zinc-400 light:text-zinc-600"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 bg-zinc-950/95 border-b border-zinc-900 backdrop-blur-xl md:hidden overflow-hidden light:bg-white/95 light:border-zinc-100"
          >
            <nav className="flex flex-col gap-4 p-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  onClick={(e) => handleNavClick(e, item.href, item.isExternal)}
                  className="text-sm font-display font-medium text-zinc-400 hover:text-white light:text-zinc-600 light:hover:text-zinc-900 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
