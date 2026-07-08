"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { BookOpen, Award, ShieldAlert, Sparkles, GraduationCap, Users } from "lucide-react";

export default function About() {
  const { setCursorType } = useApp();

  const journeyTimeline = [
    {
      year: "Jan 2026 - Feb 2026",
      title: "Data Analytics Simulation",
      organization: "GenAI Powered Job Simulation (Forage)",
      description: "Applied statistical modeling and data mining to large-scale financial datasets. Performed exploratory data analysis (EDA) to identify delinquency trends and derive actionable business insights.",
      icon: <Award className="w-4 h-4 text-emerald-400" />,
    },
    {
      year: "Apr 2025 - Sep 2025",
      title: "Deep Learning Research Scholar",
      organization: "IEEE Computer Society - IAM Program",
      description: "Conducted research on AI-powered Plant Disease Detection. Designed and implemented CNN ensemble structures to classify crop diseases, co-authoring a technical research paper under faculty mentorship.",
      icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
    },
    {
      year: "2025",
      title: "Chair, IEEE SIGHT-RIT",
      organization: "IEEE Special Interest Group on Humanitarian Technology",
      description: "Led social impact initiatives, managed multi-disciplinary student teams, and organized community outreach programs, technical workshops, and social hackathons.",
      icon: <Users className="w-4 h-4 text-purple-400" />,
    },
    {
      year: "2023 - 2027",
      title: "B.E. in Computer Science & Engineering",
      organization: "Ramaiah Institute Of Technology, Bengaluru",
      description: "Acquiring core concepts in Database Systems, Algorithm Design, Machine Learning, and Computer Systems. Maintaining a GPA of 8.78.",
      icon: <GraduationCap className="w-4 h-4 text-pink-400" />,
    },
  ];

  const strengths = [
    { title: "Deep Learning & CV", desc: "Designing high-accuracy CNN architectures, ensembles, and YOLO models." },
    { title: "Database Engineering", desc: "Engineered a database engine from scratch including transaction control." },
    { title: "Technical Leadership", desc: "Led multiple IEEE social impact initiatives, events, and workshops." },
    { title: "Analytical Thinking", desc: "Experienced in statistical modeling, EDA, and mining financial datasets." },
  ];

  return (
    <section
      id="about"
      className="relative py-24 px-6 bg-zinc-950 text-white dark:bg-zinc-950 light:bg-zinc-50 light:text-zinc-900 overflow-hidden border-b border-zinc-900/60 light:border-zinc-200"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display">About Me</h2>
          <div className="h-[2px] w-20 bg-indigo-500 rounded-full" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Biography & Strengths */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-xl p-8 space-y-6 relative group border border-zinc-800/80 light:border-zinc-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <h3 className="text-xl font-semibold font-display text-indigo-400">Professional Biography</h3>
              <p className="text-sm leading-relaxed text-zinc-400 light:text-zinc-600 font-sans">
                I am a Computer Science undergraduate at Ramaiah Institute of Technology with a strong foundation in software engineering, artificial intelligence, data analytics, databases, and full-stack development. I enjoy building scalable, real-world solutions by combining strong problem-solving skills with practical engineering principles.
              </p>
              <p className="text-sm leading-relaxed text-zinc-400 light:text-zinc-600 font-sans">
                My experience spans developing AI-driven applications, designing database systems from scratch, building web applications, and conducting research in deep learning. I have worked on projects involving machine learning, computer vision, system design, and modern software development practices while actively participating in research, hackathons, and technical communities.
              </p>
              <p className="text-sm leading-relaxed text-zinc-400 light:text-zinc-600 font-sans">
                Beyond technical skills, I have led student initiatives through IEEE, collaborated with diverse teams, and contributed to community-driven programs. I am passionate about continuous learning, creating impactful technology, and solving meaningful problems across different domains.
              </p>

              <div className="border-t border-zinc-800/50 light:border-zinc-200 pt-6">
                <h4 className="text-xs uppercase tracking-wider text-zinc-500 font-display font-semibold mb-3">Career Goal</h4>
                <p className="text-xs italic text-zinc-500 light:text-zinc-500 font-sans leading-relaxed">
                  "To innovate at the intersection of Artificial Intelligence and Systems Engineering, developing secure, privacy-preserving machine learning frameworks and high-performance, decentralized database engines for next-generation platforms."
                </p>
              </div>
            </motion.div>

            {/* Strengths Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {strengths.map((str, idx) => (
                <motion.div
                  key={str.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                  className="glass rounded-xl p-5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 light:hover:border-indigo-500/20 transition-all duration-300 cursor-none relative overflow-hidden"
                >
                  <h4 className="text-sm font-semibold font-display text-white light:text-zinc-950 mb-1.5">{str.title}</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 light:text-zinc-500 leading-relaxed font-sans">{str.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Journey Timeline */}
          <div className="lg:col-span-6 relative pl-6 sm:pl-8">
            <h3 className="text-xl font-semibold font-display text-indigo-400 mb-8">My Journey</h3>
            
            {/* Vertical timeline line */}
            <div className="absolute left-6 sm:left-8 top-16 bottom-6 w-[2px] bg-zinc-800 light:bg-zinc-200" />

            <div className="space-y-8">
              {journeyTimeline.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative pl-8 sm:pl-10 group"
                >
                  {/* Circle Indicator on line */}
                  <div className="absolute left-[-2px] sm:left-[-2px] top-1.5 w-4 h-4 rounded-full border border-zinc-700 bg-zinc-950 flex items-center justify-center group-hover:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:group-hover:border-indigo-500 light:border-zinc-300 light:bg-white light:group-hover:border-indigo-500 transition-colors duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-indigo-400 transition-colors" />
                  </div>

                  {/* Card Content */}
                  <div className="glass rounded-xl p-5 hover:border-zinc-800 dark:hover:border-zinc-800 light:hover:border-zinc-200 transition-colors">
                    <span className="text-[10px] uppercase font-display tracking-widest text-zinc-500 dark:text-zinc-500 light:text-zinc-400 font-semibold mb-2 block">
                      {item.year}
                    </span>
                    <div className="flex items-center gap-2 mb-1">
                      {item.icon}
                      <h4 className="text-sm font-semibold font-display text-white light:text-zinc-950">{item.title}</h4>
                    </div>
                    <span className="text-xs font-medium text-indigo-400 light:text-indigo-600 block mb-2 font-display">
                      {item.organization}
                    </span>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 light:text-zinc-500 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
