"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function Loader() {
  const { isLoaderActive, setLoaderActive } = useApp();
  const [progress, setProgress] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setHasEnded(true);
        setTimeout(() => {
          setLoaderActive(false);
        }, 600); // Wait for screen transition
      }, 500);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Fast progress in the beginning, slows down, then speeds up
        const increment = prev < 30 ? 6 : prev < 70 ? 2 : prev < 90 ? 4 : 8;
        const nextVal = prev + increment;
        return nextVal > 100 ? 100 : nextVal;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [progress, setLoaderActive]);

  if (!isLoaderActive) return null;

  return (
    <AnimatePresence>
      {!hasEnded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-zinc-950 p-10 text-white font-sans"
        >
          {/* Top tagline */}
          <div className="flex w-full items-center justify-between text-xs tracking-widest text-zinc-500 uppercase font-display">
            <span>Portfolio v1.0</span>
            <span>Est. 2026</span>
          </div>

          {/* Core Brand Reveal */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.1 }}
                className="text-4xl font-light tracking-tight sm:text-6xl md:text-7xl font-display"
              >
                RAJURI LIKHITHA
              </motion.h1>
            </div>
            
            <div className="overflow-hidden mt-2">
              <motion.p
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                className="text-sm font-light text-indigo-400 tracking-wide font-sans"
              >
                Computer Science Engineer • AI & Software Specialist
              </motion.p>
            </div>
          </div>

          {/* Progress Section */}
          <div className="flex w-full flex-col gap-2 max-w-sm">
            <div className="flex justify-between items-end text-sm text-zinc-500 font-display">
              <span className="text-xs uppercase tracking-wider text-zinc-400">Loading Experience</span>
              <motion.span 
                key={progress}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-light text-zinc-200"
              >
                {progress}%
              </motion.span>
            </div>
            <div className="h-[2px] w-full bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400"
                style={{ width: `${progress}%` }}
                layoutId="loaderProgressBar"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
