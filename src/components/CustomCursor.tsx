"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function CustomCursor() {
  const { cursorType } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Motion values for target position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for fluid lag effect on outer cursor
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const innerX = useMotionValue(-100);
  const innerY = useMotionValue(-100);
  const innerXSpring = useSpring(innerX, { damping: 50, stiffness: 800 });
  const innerYSpring = useSpring(innerY, { damping: 50, stiffness: 800 });

  useEffect(() => {
    // Check if the device has a touch screen
    const checkDevice = () => {
      const mobile = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      innerX.set(e.clientX - 3);
      innerY.set(e.clientY - 3);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, innerX, innerY, isVisible]);

  if (isMobile || !isVisible) return null;

  // Determine size & styling based on state
  const sizes = {
    default: { width: 32, height: 32 },
    pointer: { width: 56, height: 56 },
    text: { width: 8, height: 40 },
    expand: { width: 72, height: 72 },
  };

  const currentSize = sizes[cursorType] || sizes.default;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-indigo-400/40 pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: currentSize.width,
          height: currentSize.height,
        }}
        animate={{
          scale: cursorType === "pointer" ? 1.2 : 1,
          backgroundColor: cursorType === "pointer" ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0)",
          borderColor: cursorType === "pointer" ? "rgba(99, 102, 241, 0.8)" : "rgba(99, 102, 241, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-emerald-400 pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: innerXSpring,
          y: innerYSpring,
        }}
        animate={{
          scale: cursorType === "pointer" ? 3 : 1,
          backgroundColor: cursorType === "pointer" ? "#818cf8" : "#34d399",
        }}
        transition={{ type: "spring", stiffness: 800, damping: 30 }}
      />
    </>
  );
}
