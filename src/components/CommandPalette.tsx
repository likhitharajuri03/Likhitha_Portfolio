"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { 
  Search, Terminal, ArrowRight, Sun, Moon, 
  Download, Copy, Check, Sparkles, BookOpen, 
  Code, Folder, Briefcase, Award, Mail, Eye 
} from "lucide-react";
import { Github } from "@/components/BrandIcons";

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export default function CommandPalette() {
  const { 
    isCommandPaletteOpen, 
    setCommandPaletteOpen, 
    toggleTheme, 
    theme, 
    setCursorType 
  } = useApp();

  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setSearch("");
    }
  }, [isCommandPaletteOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setCommandPaletteOpen(false);
      }
    };
    if (isCommandPaletteOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("likhitha.rajuri.03@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setCommandPaletteOpen(false);
    }, 1200);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setCommandPaletteOpen(false);
  };

  const handleDownloadResume = () => {
    window.open("https://drive.google.com/file/d/1mZw3Wpk8R1Or4dFwT2mB6IyuQ-4LRycc/view?usp=drivesdk", "_blank");
    setCommandPaletteOpen(false);
  };

  const commands: CommandItem[] = [
    {
      id: "nav-hero",
      title: "Jump to Introduction",
      category: "Navigation",
      icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
      action: () => handleScrollTo("hero"),
    },
    {
      id: "nav-about",
      title: "Jump to About Journey",
      category: "Navigation",
      icon: <BookOpen className="w-4 h-4 text-indigo-400" />,
      action: () => handleScrollTo("about"),
    },
    {
      id: "nav-skills",
      title: "Jump to Skills Matrix",
      category: "Navigation",
      icon: <Code className="w-4 h-4 text-indigo-400" />,
      action: () => handleScrollTo("skills"),
    },
    {
      id: "nav-projects",
      title: "Jump to Project Gallery",
      category: "Navigation",
      icon: <Folder className="w-4 h-4 text-indigo-400" />,
      action: () => handleScrollTo("projects"),
    },
    {
      id: "nav-experience",
      title: "Jump to Experience Timeline",
      category: "Navigation",
      icon: <Briefcase className="w-4 h-4 text-indigo-400" />,
      action: () => handleScrollTo("experience"),
    },
    {
      id: "action-github-profile",
      title: "Open GitHub Profile",
      category: "External Actions",
      icon: <Github className="w-4 h-4 text-indigo-400" />,
      action: () => {
        window.open("https://github.com/likhitharajuri03", "_blank");
        setCommandPaletteOpen(false);
      },
    },
    {
      id: "nav-achievements",
      title: "Jump to Achievements & Certificates",
      category: "Navigation",
      icon: <Award className="w-4 h-4 text-indigo-400" />,
      action: () => handleScrollTo("achievements"),
    },
    {
      id: "nav-contact",
      title: "Jump to Contact Form",
      category: "Navigation",
      icon: <Mail className="w-4 h-4 text-indigo-400" />,
      action: () => handleScrollTo("contact"),
    },
    {
      id: "action-theme",
      title: `Toggle Theme (${theme === "dark" ? "Light" : "Dark"} Mode)`,
      category: "Preferences",
      icon: theme === "dark" ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-zinc-500" />,
      action: () => {
        toggleTheme();
        setCommandPaletteOpen(false);
      },
      shortcut: "T",
    },
    {
      id: "action-resume",
      title: "View My Resume",
      category: "Actions",
      icon: <Eye className="w-4 h-4 text-emerald-400" />,
      action: handleDownloadResume,
      shortcut: "D",
    },
    {
      id: "action-email",
      title: copied ? "Email Copied!" : "Copy Contact Email",
      category: "Actions",
      icon: copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-purple-400" />,
      action: handleCopyEmail,
      shortcut: "E",
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard navigation inside palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isCommandPaletteOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen, filteredCommands, selectedIndex, setCommandPaletteOpen]);

  // Adjust scroll of item into view in list
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-md">
          {/* Backdrop fade in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={() => setCommandPaletteOpen(false)}
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.35 }}
            ref={containerRef}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/90 shadow-2xl backdrop-blur-xl dark:border-zinc-800/80 light:bg-white/90 light:border-zinc-200 light:shadow-zinc-200/50"
          >
            {/* Search Header */}
            <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3 light:border-zinc-100">
              <Search className="w-5 h-5 text-zinc-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search commands..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none light:text-zinc-800 light:placeholder-zinc-400"
              />
              <div className="flex items-center gap-1 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400 font-display light:bg-zinc-100 light:text-zinc-500">
                <Terminal className="w-3 h-3" />
                <span>ESC</span>
              </div>
            </div>

            {/* Results List */}
            <div 
              ref={listRef}
              className="max-h-[300px] overflow-y-auto p-2 flex flex-col gap-1 scrollbar-thin"
            >
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => {
                        setSelectedIndex(idx);
                        setCursorType("pointer");
                      }}
                      onMouseLeave={() => setCursorType("default")}
                      className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-xs transition-colors outline-none cursor-none ${
                        isSelected
                          ? "bg-zinc-800/80 text-white dark:bg-zinc-800/60 light:bg-indigo-50 light:text-indigo-600"
                          : "text-zinc-400 hover:text-zinc-200 light:text-zinc-600 light:hover:text-zinc-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {cmd.icon}
                        <div className="flex flex-col">
                          <span className="font-medium text-zinc-200 dark:text-zinc-100 light:text-zinc-800 light:font-semibold">
                            {cmd.title}
                          </span>
                          <span className="text-[10px] text-zinc-500 light:text-zinc-400">
                            {cmd.category}
                          </span>
                        </div>
                      </div>
                      
                      {isSelected ? (
                        <ArrowRight className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                      ) : cmd.shortcut ? (
                        <kbd className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[9px] text-zinc-500 font-display light:border-zinc-200 light:bg-zinc-50 light:text-zinc-400">
                          {cmd.shortcut}
                        </kbd>
                      ) : null}
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs text-zinc-500 light:text-zinc-400 font-display">
                  No commands found matching "{search}"
                </div>
              )}
            </div>

            {/* Footer tips */}
            <div className="flex items-center justify-between border-t border-zinc-800/50 bg-zinc-950/40 px-4 py-2 text-[10px] text-zinc-500 light:border-zinc-100 light:bg-zinc-50 light:text-zinc-400">
              <div className="flex gap-2">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </div>
              <span>Press <kbd className="font-mono">Ctrl+K</kbd> anytime</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
