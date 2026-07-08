"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Github } from "@/components/BrandIcons";
import { 
  Code2, Globe, Database, Brain, Cpu, ShieldCheck, 
  Terminal, Binary, BarChart3, FileCode, Server, 
  Layers, Layout, Eye, Scan, Grid, UserCheck, 
  Compass, FolderTree, Shield, GitMerge, CheckSquare, 
  Users, Target, Award, Heart, MessageSquare
} from "lucide-react";

interface SkillItem {
  name: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string; // Gradient color theme
  skills: SkillItem[];
}

export default function Skills() {
  const { setCursorType } = useApp();
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const categories: SkillCategory[] = [
    {
      title: "Programming & Tools",
      icon: <Code2 className="w-5 h-5" />,
      color: "from-indigo-500 to-blue-500 text-indigo-400",
      skills: [
        { name: "Python", subtitle: "Data & AI Scripting", icon: <Terminal className="w-4 h-4" /> },
        { name: "Java", subtitle: "Systems & Backend", icon: <Code2 className="w-4 h-4" /> },
        { name: "C++", subtitle: "High Performance", icon: <Cpu className="w-4 h-4" /> },
        { name: "C", subtitle: "Low-level Systems", icon: <Binary className="w-4 h-4" /> },
        { name: "R", subtitle: "Statistical Computing", icon: <BarChart3 className="w-4 h-4" /> },
        { name: "SQL", subtitle: "Structured Queries", icon: <Database className="w-4 h-4" /> },
      ],
    },
    {
      title: "Web Development",
      icon: <Globe className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500 text-blue-400",
      skills: [
        { name: "React", subtitle: "Interactive Frontends", icon: <Globe className="w-4 h-4" /> },
        { name: "JavaScript", subtitle: "Dynamic Scripting", icon: <FileCode className="w-4 h-4" /> },
        { name: "Node.js", subtitle: "Event-driven Backend", icon: <Server className="w-4 h-4" /> },
        { name: "Express", subtitle: "Web Framework", icon: <Layers className="w-4 h-4" /> },
        { name: "Flask", subtitle: "Micro-services", icon: <Cpu className="w-4 h-4" /> },
        { name: "HTML & CSS", subtitle: "Responsive Design", icon: <Layout className="w-4 h-4" /> },
      ],
    },
    {
      title: "Deep Learning & AI/ML",
      icon: <Brain className="w-5 h-5" />,
      color: "from-violet-500 to-purple-500 text-violet-400",
      skills: [
        { name: "PyTorch", subtitle: "Neural Networks", icon: <Brain className="w-4 h-4" /> },
        { name: "Computer Vision", subtitle: "Image & Video AI", icon: <Eye className="w-4 h-4" /> },
        { name: "YOLO (v11)", subtitle: "Object Detection", icon: <Scan className="w-4 h-4" /> },
        { name: "ResNet & EfficientNet", subtitle: "Classification Models", icon: <Grid className="w-4 h-4" /> },
        { name: "FaceNet / ArcFace", subtitle: "Facial Recognition", icon: <UserCheck className="w-4 h-4" /> },
        { name: "CLIP Models", subtitle: "Contrastive Vision", icon: <Compass className="w-4 h-4" /> },
      ],
    },
    {
      title: "DBMS & Systems",
      icon: <Database className="w-5 h-5" />,
      color: "from-emerald-500 to-teal-500 text-emerald-400",
      skills: [
        { name: "MySQL", subtitle: "Relational DBMS", icon: <Database className="w-4 h-4" /> },
        { name: "MongoDB", subtitle: "Document Store", icon: <FolderTree className="w-4 h-4" /> },
        { name: "Database Engineering", subtitle: "Storage & Buffer Pools", icon: <Cpu className="w-4 h-4" /> },
        { name: "Transaction Control", subtitle: "ACID Concurrency", icon: <Shield className="w-4 h-4" /> },
        { name: "B+ Tree Indexing", subtitle: "Search Optimization", icon: <GitMerge className="w-4 h-4" /> },
      ],
    },
    {
      title: "Tools & DevOps",
      icon: <Cpu className="w-5 h-5" />,
      color: "from-pink-500 to-rose-500 text-pink-400",
      skills: [
        { name: "GitHub / Git", subtitle: "Version Control", icon: <Github className="w-4 h-4" /> },
        { name: "VS Code", subtitle: "IDE & Editor", icon: <Terminal className="w-4 h-4" /> },
        { name: "Maven", subtitle: "Project Builds", icon: <Cpu className="w-4 h-4" /> },
        { name: "JUnit Testing", subtitle: "Test Automation", icon: <CheckSquare className="w-4 h-4" /> },
        { name: "Linux / Bash", subtitle: "Shell Scripting", icon: <Terminal className="w-4 h-4" /> },
      ],
    },
    {
      title: "Soft Skills & Leadership",
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "from-amber-500 to-orange-500 text-amber-405",
      skills: [
        { name: "Leadership", subtitle: "IEEE SIGHT Chairperson", icon: <Users className="w-4 h-4" /> },
        { name: "Team Management", subtitle: "Milestone Collaboration", icon: <Target className="w-4 h-4" /> },
        { name: "Technical Research", subtitle: "Paper Co-authoring", icon: <Award className="w-4 h-4" /> },
        { name: "Community Outreach", subtitle: "Humanitarian Tech", icon: <Heart className="w-4 h-4" /> },
        { name: "Public Speaking", subtitle: "Symposium Presenting", icon: <MessageSquare className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="relative py-24 px-6 bg-zinc-950 text-white dark:bg-zinc-950 light:bg-zinc-50 light:text-zinc-900 overflow-hidden border-b border-zinc-900/60 light:border-zinc-200"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display">Technical Matrix</h2>
          <div className="h-[2px] w-20 bg-indigo-500 rounded-full" />
        </div>

        {/* Tab Selection (Mobile Scrollable) */}
        <div className="flex overflow-x-auto gap-3 pb-6 mb-12 scrollbar-none border-b border-zinc-900 light:border-zinc-200">
          {categories.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => setActiveCategory(idx)}
              onMouseEnter={() => setCursorType("pointer")}
              onMouseLeave={() => setCursorType("default")}
              className={`flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider font-display whitespace-nowrap border cursor-none transition-all duration-300 ${
                activeCategory === idx
                  ? "bg-white text-zinc-950 border-white dark:bg-white dark:text-zinc-950 dark:border-white light:bg-zinc-950 light:text-white light:border-zinc-950"
                  : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:text-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/30 dark:hover:border-zinc-700 light:border-zinc-200 light:bg-white light:text-zinc-600 light:hover:border-zinc-400"
              }`}
            >
              {cat.icon}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Unified Skill Grid Card Layout */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {categories[activeCategory].skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              onMouseEnter={() => setCursorType("pointer")}
              onMouseLeave={() => setCursorType("default")}
              className="glass rounded-xl p-4 border border-zinc-800/80 light:border-zinc-200 flex items-center gap-4 hover:border-zinc-700/80 transition-all duration-300 relative group cursor-none overflow-hidden hover:shadow-lg dark:hover:shadow-indigo-500/5 light:hover:shadow-indigo-500/5"
            >
              {/* Soft background glow matching category color */}
              <div className={`absolute inset-0 bg-gradient-to-br ${categories[activeCategory].color.split(' ')[0]} ${categories[activeCategory].color.split(' ')[1]} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none`} />

              {/* Left Side Icon Container */}
              <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-zinc-950 border border-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-white dark:bg-zinc-950 dark:border-zinc-900 dark:group-hover:text-white light:bg-zinc-50 light:border-zinc-200 light:group-hover:bg-zinc-100 transition-all duration-300">
                <div className={`transition-transform duration-300 group-hover:scale-110 text-indigo-400 group-hover:text-emerald-400`}>
                  {skill.icon}
                </div>
              </div>

              {/* Right Side Content Block */}
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold font-display text-white light:text-zinc-950 group-hover:text-indigo-400 dark:group-hover:text-indigo-400 light:group-hover:text-indigo-600 transition-colors">
                  {skill.name}
                </span>
                <span className="text-[10px] text-zinc-500 light:text-zinc-400 font-sans tracking-wide mt-0.5">
                  {skill.subtitle}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
