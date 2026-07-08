"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Briefcase, Calendar, MapPin, Award, CheckCircle, GraduationCap } from "lucide-react";

interface RoleDetails {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: "Research" | "Simulation" | "Leadership" | "Volunteering";
  duties: string[];
  skillsUsed: string[];
}

export default function Experience() {
  const { setCursorType } = useApp();
  const [activeTab, setActiveTab] = useState("ieee-cs");

  const experiences: RoleDetails[] = [
    {
      id: "ieee-cs",
      company: "IEEE Computer Society",
      role: "Research Scholar - IAM Program",
      period: "Apr 2025 - Sep 2025",
      location: "Remote / Research Division",
      type: "Research",
      duties: [
        "Conducted research on AI-powered Plant Disease Detection utilizing Deep Learning and Advanced Image Processing techniques.",
        "Designed and implemented a CNN-based ensemble classification model to categorize crop leaf anomalies.",
        "Co-authored a technical research paper documenting research methodology, performance comparison benchmarks, and final test results under faculty guidance.",
        "Analyzed model validation parameters achieving a high accuracy of 97.8% on agricultural image datasets."
      ],
      skillsUsed: ["Python", "PyTorch", "CNN", "Image Processing", "Research Methodologies", "GitHub"]
    },
    {
      id: "forage",
      company: "Forage Job Simulation",
      role: "GenAI Powered Data Analyst",
      period: "Jan 2026 - Feb 2026",
      location: "Bengaluru, Karnataka (Virtual)",
      type: "Simulation",
      duties: [
        "Applied statistical modeling and data mining algorithms to classify large-scale financial transaction datasets.",
        "Performed intensive Exploratory Data Analysis (EDA) in Python to identify delinquency trends and risk indicators.",
        "Designed data analytics reports and interactive visualization charts to derive actionable insights for business analysts.",
        "Utilized AI models to analyze predictive probability indices on loan repayments."
      ],
      skillsUsed: ["Python", "Data Mining", "Statistical Modeling", "EDA", "Data Visualization", "GenAI Tools"]
    },
    {
      id: "ieee-sight",
      company: "IEEE SIGHT-RIT",
      role: "Chairperson",
      period: "2025 - Present",
      location: "RIT Campus, Bengaluru",
      type: "Leadership",
      duties: [
        "Directed social impact and humanitarian technology initiatives, leading multi-disciplinary teams of 40+ engineering students.",
        "Organized community outreach projects, technical training camps, and hackathons focused on civic improvements.",
        "Coordinated technical events and workshops, improving student participation and networking indices in IEEE activities.",
        "Oversaw financial budgeting, project scheduling, and communications with IEEE India Council."
      ],
      skillsUsed: ["Leadership", "Project Management", "Event Coordination", "Public Speaking", "Community Outreach"]
    },
    {
      id: "code-olympus",
      company: "Code Olympus (2025)",
      role: "Event Coordinator",
      period: "Feb 2025 - Apr 2025",
      location: "RIT Campus, Bengaluru",
      type: "Volunteering",
      duties: [
        "Coordinated 'Code Olympus', a grand scale coding hackathon for students across Karnataka.",
        "Managed operational logistics including challenge formulations, code compilation scripts, and technical evaluation parameters.",
        "Partnered with corporate sponsors and hosted judges from top-tier organizations."
      ],
      skillsUsed: ["Teamwork", "Event Planning", "Problem Solving", "Logistical Management", "Logistics Control"]
    }
  ];

  const activeExp = experiences.find((exp) => exp.id === activeTab) || experiences[0];

  return (
    <section
      id="experience"
      className="relative py-24 px-6 bg-zinc-950 text-white dark:bg-zinc-950 light:bg-zinc-50 light:text-zinc-900 overflow-hidden border-b border-zinc-900/60 light:border-zinc-200"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display">Experience Timeline</h2>
          <div className="h-[2px] w-20 bg-indigo-500 rounded-full" />
        </div>

        {/* Tab Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side Tab Navigation */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2 border-b lg:border-b-0 lg:border-l border-zinc-900 light:border-zinc-200 scrollbar-none">
            {experiences.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className={`relative px-5 py-4 text-left text-xs font-semibold tracking-wider font-display whitespace-nowrap lg:whitespace-normal cursor-none transition-all duration-300 w-full flex flex-col justify-start border-l-2 lg:border-l-0 ${
                  activeTab === exp.id
                    ? "text-indigo-400 border-l-2 border-indigo-500 lg:bg-indigo-500/5 light:bg-indigo-50/50 light:text-indigo-600"
                    : "border-l-transparent text-zinc-500 hover:text-zinc-300 light:text-zinc-400 light:hover:text-zinc-700"
                }`}
              >
                {/* Framer motion active indicator line (desktop left border) */}
                {activeTab === exp.id && (
                  <motion.div
                    layoutId="activeExperienceTab"
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-indigo-500 hidden lg:block"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="text-white dark:text-zinc-100 light:text-zinc-800 font-semibold">{exp.company}</span>
                <span className="text-[10px] text-zinc-500 mt-1">{exp.role}</span>
              </button>
            ))}
          </div>

          {/* Right Side Role Details */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="glass rounded-xl p-8 border border-zinc-800/80 light:border-zinc-200 space-y-6"
              >
                {/* Meta details header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900/60 light:border-zinc-200 pb-5">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-display text-white light:text-zinc-950">
                      {activeExp.role}
                    </h3>
                    <span className="text-xs font-semibold text-indigo-400 light:text-indigo-600 font-display">
                      {activeExp.company}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 font-display font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                      {activeExp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-600" />
                      {activeExp.location}
                    </span>
                  </div>
                </div>

                {/* Duties */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-wider text-zinc-500 font-display font-bold">
                    Key Deliverables & Responsibilities
                  </h4>
                  <ul className="space-y-3">
                    {activeExp.duties.map((duty, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-zinc-400 light:text-zinc-600 font-sans">
                        <CheckCircle className="w-4 h-4 text-emerald-400/80 mt-0.5 flex-shrink-0" />
                        <p>{duty}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills Utilized */}
                <div className="space-y-3 pt-4 border-t border-zinc-900/50 light:border-zinc-200">
                  <h4 className="text-xs uppercase tracking-wider text-zinc-500 font-display font-bold">
                    Technologies & Skills Leveraged
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeExp.skillsUsed.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 light:bg-zinc-100 light:border-zinc-200 light:text-zinc-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
}
