"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Github } from "@/components/BrandIcons";
import { 
  Search, Filter, Database, ShieldAlert, Leaf, 
  CheckCircle2, AlertCircle, Award, Folder, Star, X
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "ai" | "systems";
  tech: string[];
  github: string;
  live?: string;
  bannerSvg: React.ReactNode;
  features: string[];
}

interface MiniProject {
  name: string;
  description: string;
  tech: string[];
  stars: number;
  url: string;
}

const fallbackMiniProjects: MiniProject[] = [
  {
    name: "AdvancedAts",
    description: "AI-powered Applicant Tracking System (ATS) optimizing resume parsing and job description alignment using Google Gemini Pro NLP modeling.",
    tech: ["Python", "Gemini Pro", "Streamlit", "PyPDF2"],
    stars: 0,
    url: "https://github.com/jeevikar14/AdvancedAts"
  },
  {
    name: "Driver_Drowsiness_Detection",
    description: "Real-time computer vision system tracking facial landmarks and Eye Aspect Ratio (EAR) to detect driver fatigue.",
    tech: ["Python", "OpenCV", "Dlib", "NumPy"],
    stars: 0,
    url: "https://github.com/likhitharajuri03/Driver_Drowsiness_Detection"
  },
  {
    name: "skyride-bengaluru",
    description: "Location-aware cab routing and ride matching simulator engineered for urban transit constraints.",
    tech: ["TypeScript", "React", "Leaflet", "Node.js"],
    stars: 0,
    url: "https://github.com/likhitharajuri03/skyride-bengaluru"
  },
  {
    name: "carbon_footprint",
    description: "Interactive web dashboard estimating individual carbon footprint metrics across transport and utilities.",
    tech: ["JavaScript", "HTML5", "CSS3", "Chart.js"],
    stars: 0,
    url: "https://github.com/likhitharajuri03/carbon_footprint"
  },
  {
    name: "wave-shield-home",
    description: "Smart home security and sensor network node logging warnings and dynamic status reports.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "Firebase"],
    stars: 0,
    url: "https://github.com/likhitharajuri03/wave-shield-home"
  },
  {
    name: "excel-retail-dashboard",
    description: "Analytical retail business intelligence dashboard visualizing profit margins, sales funnels, and order trends.",
    tech: ["MS Excel", "Power Query", "Pivot Tables", "KPIs"],
    stars: 0,
    url: "https://github.com/likhitharajuri03/excel-retail-dashboard"
  },
  {
    name: "reel-rants",
    description: "Social web forum platform enabling movie ratings, community reviews, and real-time commentary.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "MongoDB"],
    stars: 0,
    url: "https://github.com/likhitharajuri03/reel-rants"
  },
  {
    name: "Java-Algorithms",
    description: "Comprehensive codebase implementing classical sorting, searching, and graph optimization algorithms.",
    tech: ["Java", "Algorithms", "Data Structures"],
    stars: 0,
    url: "https://github.com/likhitharajuri03/Java"
  },
  {
    name: "insight-to-app",
    description: "Session analytics and client telemetry ingestion utility tracking user conversion events.",
    tech: ["TypeScript", "React", "Node.js", "Express"],
    stars: 0,
    url: "https://github.com/likhitharajuri03/insight-to-app"
  }
];

// Helper to resolve descriptions & tech stacks for raw github repos
const getTechAndDescForRepo = (name: string, defaultLang: string, defaultDesc: string) => {
  const normalized = name.toLowerCase();
  
  let tech = [defaultLang || "TypeScript"];
  let desc = defaultDesc || "Open source developer code repository containing project codebase.";

  if (normalized.includes("advancedats")) {
    tech = ["Python", "Gemini Pro", "Streamlit", "PyPDF2"];
    desc = "AI-powered Applicant Tracking System (ATS) optimizing resume parsing and job description alignment using Google Gemini Pro NLP modeling.";
  } else if (normalized.includes("drowsiness")) {
    tech = ["Python", "OpenCV", "Dlib", "NumPy"];
    desc = "Real-time computer vision system tracking facial landmarks and Eye Aspect Ratio (EAR) to detect driver fatigue.";
  } else if (normalized.includes("skyride")) {
    tech = ["TypeScript", "React", "Leaflet", "Node.js"];
    desc = "Location-aware cab routing and ride matching simulator engineered for urban transit constraints.";
  } else if (normalized.includes("carbon")) {
    tech = ["JavaScript", "HTML5", "CSS3", "Chart.js"];
    desc = "Interactive web dashboard estimating individual carbon footprint metrics across transport and utilities.";
  } else if (normalized.includes("wave-shield")) {
    tech = ["TypeScript", "Next.js", "Tailwind CSS", "Firebase"];
    desc = "Smart home security and sensor network node logging warnings and dynamic status reports.";
  } else if (normalized.includes("retail")) {
    tech = ["MS Excel", "Power Query", "Pivot Tables", "KPIs"];
    desc = "Analytical retail business intelligence dashboard visualizing profit margins, sales funnels, and order trends.";
  } else if (normalized.includes("rants")) {
    tech = ["TypeScript", "Next.js", "Tailwind CSS", "MongoDB"];
    desc = "Social web forum platform enabling movie ratings, community reviews, and real-time commentary.";
  } else if (normalized === "java") {
    tech = ["Java", "Algorithms", "Data Structures"];
    desc = "Comprehensive codebase implementing classical sorting, searching, and graph optimization algorithms.";
  } else if (normalized.includes("insight")) {
    tech = ["TypeScript", "React", "Node.js", "Express"];
    desc = "Session analytics and client telemetry ingestion utility tracking user conversion events.";
  } else if (normalized.includes("studentgitlab")) {
    tech = ["Python", "GitLab API", "CI/CD"];
    desc = "Automation script managing student submission pulling, unit testing, and grading reports.";
  }

  return { tech, desc };
};

export default function Projects() {
  const { setCursorType } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "ai" | "systems">("all");
  
  // Mini Projects state
  const [miniProjects, setMiniProjects] = useState<MiniProject[]>(fallbackMiniProjects);
  const [loadingMini, setLoadingMini] = useState(false);

  const majorProjects: Project[] = [
    {
      id: "safeupload",
      title: "SafeUpload",
      tagline: "Identity Cloaking for Public Images",
      description: "An AI-based privacy framework that protects public face images using transferable adversarial perturbations. Implemented ensemble attack pipelines with FaceNet, ArcFace, and CLIP models for transferability enhancement.",
      category: "ai",
      tech: ["Python", "PyTorch", "FaceNet", "ArcFace", "CLIP"],
      github: "https://github.com/likhitharajuri03",
      features: [
        "Adversarial face cloaking to prevent scraping & unauthorized recognition",
        "Ensemble attack pipeline targeting multiple vision classifiers simultaneously",
        "High black-box transferability rate to protect against unknown model architectures",
      ],
      bannerSvg: (
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="200" fill="#09090b"/>
          <circle cx="200" cy="100" r="60" stroke="#818cf8" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_40s_linear_infinite]"/>
          <circle cx="200" cy="100" r="45" stroke="#34d399" strokeWidth="1.5"/>
          <path d="M185 90 L200 75 L215 90 M200 75 L200 120" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="150" y="135" width="100" height="25" rx="5" fill="rgba(99, 102, 241, 0.15)" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1"/>
          <text x="200" y="151" fill="#818cf8" fontSize="9" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1">IDENTITY CLOAKED</text>
          <path d="M110 50 L110 150 M290 50 L290 150" stroke="#3f3f46" strokeWidth="0.5"/>
        </svg>
      )
    },
    {
      id: "helixdb",
      title: "HelixDB",
      tagline: "Custom Relational Database Engine",
      description: "Engineered a relational database engine from scratch in Java. Implemented slotted-page storage, custom buffer managers, indexing, transaction control under ACID, and recovery protocols.",
      category: "systems",
      tech: ["Java", "Maven", "JUnit", "SQL"],
      github: "https://github.com/likhitharajuri03",
      features: [
        "Slotted-page binary storage formatter with dynamic record packing",
        "B+ Tree Index manager for instant primary key searching and range queries",
        "Transaction manager maintaining strict ACID execution using ARIES WAL logs",
      ],
      bannerSvg: (
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="200" fill="#09090b"/>
          <rect x="130" y="50" width="140" height="28" rx="4" fill="rgba(52, 211, 153, 0.1)" stroke="#34d399" strokeWidth="1.5"/>
          <text x="200" y="67" fill="#34d399" fontSize="10" textAnchor="middle" fontFamily="monospace">Query Parser / SQL</text>
          
          <rect x="130" y="86" width="140" height="28" rx="4" fill="rgba(99, 102, 241, 0.1)" stroke="#818cf8" strokeWidth="1.5"/>
          <text x="200" y="103" fill="#818cf8" fontSize="10" textAnchor="middle" fontFamily="monospace">Buffer Manager / Cache</text>
          
          <rect x="130" y="122" width="140" height="28" rx="4" fill="rgba(244, 63, 94, 0.1)" stroke="#f43f5e" strokeWidth="1.5"/>
          <text x="200" y="139" fill="#f43f5e" fontSize="10" textAnchor="middle" fontFamily="monospace">Slotted-Page Storage</text>
          <path d="M200 78 L200 86 M200 114 L200 122" stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="3 3"/>
        </svg>
      )
    },
    {
      id: "plant-disease",
      title: "Plant Disease Detection",
      tagline: "Hybrid Deep Learning Computer Vision",
      description: "Developed a hybrid computer vision system using an ensemble of YOLOv11, ResNet-50V2, and EfficientNetB0 on agricultural datasets, achieving 97.8% accuracy. Contributed to a co-authored research paper.",
      category: "ai",
      tech: ["Python", "YOLOv11", "ResNet-50V2", "EfficientNetB0", "PyTorch"],
      github: "https://github.com/likhitharajuri03",
      features: [
        "Ensemble predictions combining localized bounding boxes with global classifiers",
        "97.8% classification accuracy on large crop disease datasets",
        "Co-authored research paper presented at ICDDS 2025 (Best Paper Runner-Up)",
      ],
      bannerSvg: (
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="200" fill="#09090b"/>
          <path d="M200 50 C230 80, 240 120, 200 150 C160 120, 170 80, 200 50 Z" stroke="#34d399" strokeWidth="1.5" fill="rgba(52, 211, 153, 0.05)"/>
          <rect x="155" y="45" width="90" height="110" rx="3" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3"/>
          <rect x="155" y="27" width="75" height="18" rx="2" fill="#f43f5e"/>
          <text x="160" y="39" fill="white" fontSize="9" fontFamily="sans-serif" fontWeight="bold">YOLO: LEAF BLIGHT</text>
          <circle cx="200" cy="100" r="4" fill="#f43f5e"/>
          <text x="210" y="103" fill="#a1a1aa" fontSize="8" fontFamily="sans-serif">Ensemble Conf: 0.98</text>
        </svg>
      )
    }
  ];

  // Fetch all repositories dynamically on mount
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoadingMini(true);
        const res = await fetch("https://api.github.com/users/likhitharajuri03/repos?sort=updated");
        if (!res.ok) throw new Error("Rate limit or user not found");
        const data = await res.json();
        
        const advancedAtsProject: MiniProject = {
          name: "AdvancedAts",
          description: "AI-powered Applicant Tracking System (ATS) optimizing resume parsing and job description alignment using Google Gemini Pro NLP modeling.",
          tech: ["Python", "Gemini Pro", "Streamlit", "PyPDF2"],
          stars: 0,
          url: "https://github.com/jeevikar14/AdvancedAts"
        };

        // Filter out repositories that are represented by major projects
        const majorNames = ["HelixDB", "SafeUpload", "Plant-Disease-Detection", "SafeUpload---ProActive_Deepfake_Prevention"];
        const filtered = data
          .filter((repo: any) => !majorNames.includes(repo.name) && repo.name !== "MyPortfolio" && repo.name !== "AdvancedAts")
          .map((repo: any) => {
            const { tech, desc } = getTechAndDescForRepo(repo.name, repo.language, repo.description);
            return {
              name: repo.name,
              description: desc,
              tech: tech,
              stars: repo.stargazers_count || 0,
              url: repo.html_url
            };
          });
        
        setMiniProjects([advancedAtsProject, ...filtered]);
      } catch (err) {
        console.warn("Using fallback local cached mini-projects", err);
      } finally {
        setLoadingMini(false);
      }
    };
    fetchRepos();
  }, []);

  // Filtering major projects
  const filteredMajorProjects = useMemo(() => {
    return majorProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section
      id="projects"
      className="relative py-24 px-6 bg-zinc-950 text-white dark:bg-zinc-950 light:bg-zinc-50 light:text-zinc-900 overflow-hidden border-b border-zinc-900/60 light:border-zinc-200"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display">Featured Projects</h2>
          <div className="h-[2px] w-20 bg-indigo-500 rounded-full" />
        </div>

        {/* Toolbar: Search and Category Filtering for Major Projects */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch justify-between mb-10 w-full">
          <div className="flex-1 flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/30 px-5 py-2.5 light:border-zinc-200 light:bg-white">
            <Search className="w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search major projects by name, description, or stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-zinc-100 placeholder-zinc-500 outline-none light:text-zinc-800 light:placeholder-zinc-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-zinc-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: "all", label: "All Work" },
              { id: "ai", label: "AI & Deep Learning" },
              { id: "systems", label: "Systems & Databases" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className={`rounded-full px-4 py-2 text-xs font-semibold font-display transition-all duration-300 cursor-none whitespace-nowrap border ${
                  selectedCategory === cat.id
                    ? "bg-white text-zinc-950 border-white dark:bg-white dark:text-zinc-950 light:bg-zinc-950 light:text-white light:border-zinc-950"
                    : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:text-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/30 light:border-zinc-200 light:bg-white light:text-zinc-500"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1. MAJOR PROJECTS SECTION */}
        <div className="space-y-6 mb-20">
          <h3 className="text-sm uppercase font-display tracking-widest text-indigo-400 font-semibold mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Major Projects
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredMajorProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="glass rounded-xl overflow-hidden flex flex-col justify-between group border border-zinc-800/80 light:border-zinc-200"
                >
                  <div className="relative aspect-video w-full border-b border-zinc-900/60 light:border-zinc-200 overflow-hidden bg-zinc-950">
                    {project.bannerSvg}
                    <span className="absolute top-4 left-4 text-[9px] uppercase tracking-wider font-semibold font-display px-2.5 py-1 rounded-full bg-zinc-950/80 border border-zinc-800/60 text-zinc-400">
                      {project.category === "ai" ? "AI & CV Research" : "Database Engine"}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold font-display text-white group-hover:text-indigo-400 transition-colors light:text-zinc-950 light:group-hover:text-indigo-600">
                        {project.title}
                      </h3>
                      <span className="text-[11px] font-medium text-zinc-500 light:text-zinc-400 block font-display">
                        {project.tagline}
                      </span>
                      <p className="text-xs text-zinc-400 light:text-zinc-600 leading-relaxed font-sans line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800/50 text-indigo-300 light:bg-zinc-100 light:border-zinc-200 light:text-indigo-600"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-zinc-900/50 light:border-zinc-200">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => setCursorType("pointer")}
                          onMouseLeave={() => setCursorType("default")}
                          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white light:text-zinc-500 light:hover:text-zinc-950 transition-colors cursor-none font-display font-medium"
                        >
                          <Github className="w-4 h-4" />
                          <span>Source Code</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredMajorProjects.length === 0 && (
              <div className="col-span-full py-16 text-center text-zinc-500 light:text-zinc-400 font-display">
                No major projects found matching search query.
              </div>
            )}
          </div>
        </div>

        {/* 2. MINI PROJECTS SECTION */}
        <div className="space-y-6 pt-10 border-t border-zinc-900/60 light:border-zinc-200">
          <h3 className="text-sm uppercase font-display tracking-widest text-indigo-400 font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Mini Projects
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {miniProjects.map((mini, index) => (
              <motion.a
                key={mini.name}
                href={mini.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className="glass rounded-xl p-5 border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 flex flex-col justify-between cursor-none relative group overflow-hidden light:border-zinc-200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <Folder className="w-6 h-6 text-indigo-400 group-hover:text-emerald-400 transition-colors" />
                    <Github className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold font-display text-white light:text-zinc-950 group-hover:underline truncate">
                      {mini.name}
                    </h4>
                    <p className="text-[11px] text-zinc-400 light:text-zinc-600 font-sans leading-relaxed min-h-[50px]">
                      {mini.description}
                    </p>
                  </div>

                  {/* Tech stack badging for Mini projects */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {mini.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[8px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/60 text-indigo-300 light:bg-zinc-100 light:border-zinc-200 light:text-indigo-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-5 border-t border-zinc-900/50 light:border-zinc-200 text-[10px] text-zinc-500 font-display font-semibold relative z-10">
                  <span className="flex items-center gap-1.5 group-hover:text-indigo-400 transition-colors">
                    <Github className="w-3.5 h-3.5 text-zinc-400" />
                    <span>View Repository</span>
                  </span>
                  
                  {mini.stars > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500/80" />
                      {mini.stars}
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
