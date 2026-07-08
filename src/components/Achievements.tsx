"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Award, Target, Landmark, ExternalLink, Calendar, ShieldCheck, Cpu } from "lucide-react";

interface HonorCard {
  title: string;
  category: "award" | "hackathon" | "experience";
  description: string;
  organization: string;
  date: string;
  detailText: string;
  icon: React.ReactNode;
}

interface CertificateItem {
  name: string;
  issuer: string;
  year: string;
  link?: string;
}

export default function Achievements() {
  const { setCursorType } = useApp();

  const honors: HonorCard[] = [
    {
      title: "Best Paper Runner-Up",
      category: "award",
      organization: "ICDDS 2025, IIIT Dharwad",
      date: "2025",
      description: "Co-authored the research paper 'A Hybrid Deep Learning and Ensemble Framework for Plant Disease Detection' and was awarded Best Paper Runner-Up.",
      detailText: "Recognized for novel ensemble methods combining YOLO crop object-localization models with deep convolutional classifiers.",
      icon: <Award className="w-5 h-5 text-amber-400" />
    },
    {
      title: "Smart India Hackathon Finalist",
      category: "hackathon",
      organization: "Ministry of Education, Government of India",
      date: "2025",
      description: "Selected among the Top 30 teams nationally for the final round of Smart India Hackathon (SIH) 2025.",
      detailText: "Competed in solving complex civic and industrial problems using software prototypes evaluated by government juries.",
      icon: <Target className="w-5 h-5 text-rose-400" />
    },
    {
      title: "Microsoft Bangalore Visit",
      category: "experience",
      organization: "Microsoft India",
      date: "2024",
      description: "Selected for an industrial visit to Microsoft's research and development headquarters in Bangalore.",
      detailText: "Participated in tech symposiums, explored high-scale cloud platforms, and networked with principal architects.",
      icon: <Landmark className="w-5 h-5 text-blue-400" />
    }
  ];

  const certifications: CertificateItem[] = [
    {
      name: "Data Analytics & Science Certification",
      issuer: "IIT Guwahati",
      year: "2024",
      link: "https://www.iitg.ac.in"
    },
    {
      name: "Software Engineering NPTEL Certification",
      issuer: "NPTEL / IIT",
      year: "2025",
      link: "https://nptel.ac.in"
    },
    {
      name: "Event Coordinator, Code Olympus (2025)",
      issuer: "RIT Department of CSE",
      year: "2025",
      link: "https://msrit.edu"
    }
  ];

  return (
    <section
      id="achievements"
      className="relative py-24 px-6 bg-zinc-950 text-white dark:bg-zinc-950 light:bg-zinc-50 light:text-zinc-900 overflow-hidden border-b border-zinc-900/60 light:border-zinc-200"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display">Honors & Certifications</h2>
          <div className="h-[2px] w-20 bg-indigo-500 rounded-full" />
        </div>

        {/* Subsection 1: Academic Honors Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {honors.map((honor, idx) => (
            <motion.div
              key={honor.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setCursorType("pointer")}
              onMouseLeave={() => setCursorType("default")}
              className="glass rounded-xl p-6 border border-zinc-800/80 light:border-zinc-200 flex flex-col justify-between cursor-none hover:border-zinc-700/80 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Radial decoration gradient */}
              <div className="absolute top-[-30px] right-[-30px] w-[90px] h-[90px] rounded-full bg-indigo-500/5 group-hover:bg-indigo-500/10 blur-xl transition-all duration-500 pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800/85 light:bg-zinc-100 light:border-zinc-200">
                    {honor.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-display font-semibold">
                      {honor.category === "award" ? "Research Award" : honor.category === "hackathon" ? "National Contest" : "Industrial Honor"}
                    </span>
                    <span className="text-[9px] text-zinc-500 font-medium font-display flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {honor.date}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-bold font-display text-white light:text-zinc-950 group-hover:text-indigo-400 transition-colors">
                    {honor.title}
                  </h4>
                  <span className="text-[11px] font-semibold text-indigo-400 light:text-indigo-600 font-display block">
                    {honor.organization}
                  </span>
                  <p className="text-xs text-zinc-400 light:text-zinc-600 leading-relaxed font-sans">
                    {honor.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-900/50 light:border-zinc-100 text-[10px] text-zinc-500 light:text-zinc-400 font-sans italic leading-relaxed">
                {honor.detailText}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subsection 2: Certifications and Workshops List */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold font-display text-indigo-400 mb-6">Verified Professional Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className="glass rounded-xl p-5 border border-zinc-800/80 light:border-zinc-200 flex items-center justify-between cursor-none hover:border-zinc-700/80 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 light:bg-zinc-100 light:border-zinc-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-xs font-bold font-display text-white light:text-zinc-950">
                      {cert.name}
                    </h4>
                    <span className="text-[10px] text-zinc-500 font-display font-medium mt-0.5">
                      {cert.issuer} • {cert.year}
                    </span>
                  </div>
                </div>

                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-zinc-900 bg-zinc-950 text-zinc-500 hover:text-indigo-400 hover:border-zinc-800 light:border-zinc-200 light:bg-zinc-50 light:hover:text-indigo-600 transition-colors"
                    title="Verify Credential"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
