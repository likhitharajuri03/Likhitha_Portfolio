"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Star, GitFork, BookOpen, Users, Award, Flame, RefreshCw } from "lucide-react";
import { Github } from "@/components/BrandIcons";

interface GitHubStats {
  username: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  starsCount: number;
  streak: number;
  languages: { name: string; percentage: number; color: string }[];
  pinnedRepos: {
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    url: string;
  }[];
}

// Complete mock failover data representing Likhitha's portfolio
const fallbackData: GitHubStats = {
  username: "likhitharajuri03",
  avatarUrl: "https://github.com/likhitharajuri03.png",
  publicRepos: 18,
  followers: 12,
  following: 15,
  starsCount: 22,
  streak: 34,
  languages: [
    { name: "Python", percentage: 48, color: "bg-blue-500" },
    { name: "Java", percentage: 32, color: "bg-orange-500" },
    { name: "C++", percentage: 12, color: "bg-pink-500" },
    { name: "Others", percentage: 8, color: "bg-zinc-500" },
  ],
  pinnedRepos: [
    {
      name: "SafeUpload",
      description: "AI-based privacy framework that protects public face images using transferable adversarial perturbations.",
      stars: 12,
      forks: 3,
      language: "Python",
      url: "https://github.com/likhitharajuri03"
    },
    {
      name: "HelixDB",
      description: "Custom relational database engine engineered from scratch with slotted-page storage, buffer manager, and B+ tree indexing.",
      stars: 8,
      forks: 2,
      language: "Java",
      url: "https://github.com/likhitharajuri03"
    },
    {
      name: "Plant-Disease-Detection",
      description: "Hybrid Deep Learning Computer Vision ensemble classifier using YOLOv11 and ResNet models, achieving 97.8% accuracy.",
      stars: 10,
      forks: 4,
      language: "Python",
      url: "https://github.com/likhitharajuri03"
    }
  ]
};

export default function GitHubDashboard() {
  const { setCursorType } = useApp();
  const [data, setData] = useState<GitHubStats>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<{ count: number; date: string } | null>(null);

  // Generate grid values for contribution graph (53 weeks * 7 days)
  const contributionGrid = useMemo(() => {
    const grid = [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const baseDate = new Date(2026, 0, 1);
    
    for (let w = 0; w < 53; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        // Deterministic pseudo-randomness for mock commit activity
        const index = w * 7 + d;
        const seed = Math.sin(index) * 10000;
        const rand = Math.floor((seed - Math.floor(seed)) * 6);
        let count = 0;
        if (rand > 2) count = Math.floor(rand * 1.5 - 2); // Commit count
        
        const dateObj = new Date(baseDate.getTime() + index * 24 * 60 * 60 * 1000);
        const dateStr = `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
        
        week.push({ count, date: dateStr });
      }
      grid.push(week);
    }
    return grid;
  }, []);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        // Fetch primary user profile details
        const profileRes = await fetch("https://api.github.com/users/likhitharajuri03");
        if (!profileRes.ok) throw new Error("Rate limit or profile error");
        const profile = await profileRes.json();

        // Fetch user repositories
        const reposRes = await fetch("https://api.github.com/users/likhitharajuri03/repos?sort=updated");
        if (!reposRes.ok) throw new Error("Rate limit or repos error");
        const repos = await reposRes.json();

        // Map pinned repos or select top 3 stars/updated repos
        const mappedRepos = repos
          .slice(0, 3)
          .map((repo: any) => ({
            name: repo.name,
            description: repo.description || "Project codebase hosted on GitHub.",
            stars: repo.stargazers_count || 0,
            forks: repo.forks_count || 0,
            language: repo.language || "TypeScript",
            url: repo.html_url
          }));

        // Dynamically compute total stars
        const stars = repos.reduce((acc: number, cur: any) => acc + (cur.stargazers_count || 0), 0);

        // Fetch language counts
        const langCounts: Record<string, number> = {};
        repos.forEach((repo: any) => {
          if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          }
        });
        const totalLangs = Object.values(langCounts).reduce((a, b) => a + b, 0);
        const mappedLangs = Object.entries(langCounts)
          .map(([name, count]) => {
            const percentage = Math.round((count / totalLangs) * 100);
            let color = "bg-zinc-500";
            if (name === "Python") color = "bg-blue-500";
            else if (name === "Java") color = "bg-orange-500";
            else if (name === "C++") color = "bg-pink-500";
            else if (name === "JavaScript") color = "bg-yellow-500";
            else if (name === "HTML") color = "bg-red-500";
            return { name, percentage, color };
          })
          .sort((a, b) => b.percentage - a.percentage);

        setData({
          username: profile.login,
          avatarUrl: profile.avatar_url,
          publicRepos: profile.public_repos,
          followers: profile.followers,
          following: profile.following,
          starsCount: stars || fallbackData.starsCount,
          streak: fallbackData.streak, // keep local mock streak tracker
          languages: mappedLangs.length > 0 ? mappedLangs : fallbackData.languages,
          pinnedRepos: mappedRepos.length > 0 ? mappedRepos : fallbackData.pinnedRepos
        });
        setIsFallback(false);
      } catch (err) {
        // Silently catch and use pre-populated mock details
        console.warn("Using fallback local caching for GitHub Dashboard", err);
        setData(fallbackData);
        setIsFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <section
      id="github"
      className="relative py-24 px-6 bg-zinc-950 text-white dark:bg-zinc-950 light:bg-zinc-50 light:text-zinc-900 overflow-hidden border-b border-zinc-900/60 light:border-zinc-200"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-display font-medium">05 // Open Source Contributions</span>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display">GitHub Analytics</h2>
            {isFallback && (
              <span className="text-[9px] uppercase tracking-wider font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded px-2 py-0.5" title="Viewing offline cached profile data">
                Cached Profile
              </span>
            )}
          </div>
          <div className="h-[2px] w-20 bg-indigo-500 rounded-full" />
        </div>

        {/* Loading Overlay */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-zinc-500">
            <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
            <span className="text-xs font-display">Syncing Open Source Data...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Profile Card, Counters, Languages */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Profile Card */}
              <div className="glass rounded-xl p-6 border border-zinc-800/80 light:border-zinc-200 flex items-center gap-4 relative overflow-hidden">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-500/20">
                  <img src={data.avatarUrl} alt={data.username} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display text-white light:text-zinc-950">
                    @{data.username}
                  </h3>
                  <a
                    href={`https://github.com/${data.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                    className="text-[10px] text-indigo-400 light:text-indigo-600 font-display flex items-center gap-1 cursor-none hover:underline"
                  >
                    <span>View GitHub Profile</span>
                    <Github className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Counters Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Public Repos", count: data.publicRepos, icon: <BookOpen className="w-4 h-4 text-indigo-400" /> },
                  { title: "Total Stars", count: data.starsCount, icon: <Star className="w-4 h-4 text-yellow-400" /> },
                  { title: "Followers", count: data.followers, icon: <Users className="w-4 h-4 text-emerald-400" /> },
                  { title: "Commit Streak", count: `${data.streak}d`, icon: <Flame className="w-4 h-4 text-orange-400" /> },
                ].map((stat, idx) => (
                  <div key={idx} className="glass rounded-xl p-4 border border-zinc-800/80 light:border-zinc-200 text-center flex flex-col justify-center items-center">
                    <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 mb-2 light:bg-zinc-100 light:border-zinc-200">
                      {stat.icon}
                    </div>
                    <span className="text-lg font-bold font-display text-white light:text-zinc-950">{stat.count}</span>
                    <span className="text-[10px] text-zinc-500 font-display font-medium uppercase mt-0.5">{stat.title}</span>
                  </div>
                ))}
              </div>

              {/* Languages Breakdown */}
              <div className="glass rounded-xl p-6 border border-zinc-800/80 light:border-zinc-200 space-y-4">
                <h4 className="text-xs uppercase tracking-wider text-zinc-500 font-display font-bold">
                  Language Distribution
                </h4>
                <div className="space-y-3">
                  {data.languages.map((lang) => (
                    <div key={lang.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-display font-medium text-zinc-400 light:text-zinc-600">
                        <span>{lang.name}</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden light:bg-zinc-200">
                        <div className={`h-full ${lang.color} rounded-full`} style={{ width: `${lang.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contribution Calendar, Repositories */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Contribution Calendar Grid */}
              <div className="glass rounded-xl p-6 border border-zinc-800/80 light:border-zinc-200 space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h4 className="text-xs uppercase tracking-wider text-zinc-500 font-display font-bold">
                    Interactive Activity Calendar (Last 365 Days)
                  </h4>
                  <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-display">
                    <span>Less</span>
                    <div className="w-2.5 h-2.5 bg-zinc-900 border border-zinc-800/50 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-emerald-900/40 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-emerald-700/60 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-emerald-500/80 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-sm" />
                    <span>More</span>
                  </div>
                </div>

                {/* Calendar Blocks Wrapper */}
                <div className="relative overflow-x-auto pb-2 scrollbar-thin">
                  <div className="flex gap-1.5 w-max">
                    {contributionGrid.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-1.5">
                        {week.map((cell, dIdx) => {
                          let colorClass = "bg-zinc-900 border border-zinc-850/50 hover:border-zinc-600";
                          if (cell.count === 1) colorClass = "bg-emerald-900/40 hover:bg-emerald-800/40";
                          else if (cell.count === 2) colorClass = "bg-emerald-700/60 hover:bg-emerald-600/60";
                          else if (cell.count === 3) colorClass = "bg-emerald-500/80 hover:bg-emerald-400/80";
                          else if (cell.count > 3) colorClass = "bg-emerald-400 hover:bg-emerald-300";
                          
                          return (
                            <div
                              key={dIdx}
                              onMouseEnter={() => {
                                setHoveredCell(cell);
                                setCursorType("pointer");
                              }}
                              onMouseLeave={() => {
                                setHoveredCell(null);
                                setCursorType("default");
                              }}
                              className={`w-3.5 h-3.5 rounded-[3px] transition-colors duration-200 cursor-none flex-shrink-0 ${colorClass}`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tooltip detail bar */}
                <div className="h-6 flex items-center text-[10px] text-zinc-500 font-display italic">
                  {hoveredCell ? (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {hoveredCell.count === 0 ? "No contributions" : `${hoveredCell.count} commits`} on {hoveredCell.date}
                    </motion.span>
                  ) : (
                    <span>Hover over any calendar cell to view commit counts</span>
                  )}
                </div>
              </div>

              {/* Pinned Repositories List */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-wider text-zinc-500 font-display font-bold">
                  Top Repositories
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.pinnedRepos.map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setCursorType("pointer")}
                      onMouseLeave={() => setCursorType("default")}
                      className="glass rounded-xl p-5 border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 flex flex-col justify-between cursor-none space-y-4 light:border-zinc-200"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-indigo-400" />
                          <h5 className="text-sm font-bold font-display text-white light:text-zinc-950 group-hover:underline">
                            {repo.name}
                          </h5>
                        </div>
                        <p className="text-[11px] text-zinc-400 light:text-zinc-600 font-sans leading-relaxed line-clamp-2">
                          {repo.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-zinc-900/50 light:border-zinc-200 text-[10px] text-zinc-500 font-display font-medium">
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                          {repo.language}
                        </span>

                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-0.5">
                            <Star className="w-3.5 h-3.5 text-yellow-500/80" />
                            {repo.stars}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <GitFork className="w-3.5 h-3.5 text-zinc-500" />
                            {repo.forks}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </section>
  );
}
