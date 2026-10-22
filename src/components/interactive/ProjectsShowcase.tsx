"use client";

import React, { useState } from "react";
import { ExternalLink, Terminal, ArrowRight, X, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import { PROJECTS, Project } from "@/data/portfolioData";

export default function ProjectsShowcase() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "all") return true;
    if (filter === "ai-ml") return p.category === "ai-ml";
    if (filter === "backend") return p.category === "backend" || p.category === "systems";
    if (filter === "hackathon") return p.category === "hackathon";
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="text-xs font-mono text-orange-500 uppercase tracking-widest flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            02 // SELECTED ENGINEERING PROJECTS
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Codebases & Systems
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {[
            { id: "all", label: "ALL BUILDS" },
            { id: "ai-ml", label: "AI / ML & MODELS" },
            { id: "backend", label: "BACKEND & APIS" },
            { id: "hackathon", label: "HACKATHONS" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === tab.id
                  ? "bg-gradient-to-r from-orange-500 to-amber-400 text-black font-bold shadow-lg shadow-orange-500/20"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-2xl border border-white/10 bg-black/70 p-6 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:border-orange-500/50 hover:shadow-[0_0_40px_rgba(255,100,0,0.15)] hover:-translate-y-1"
          >
            {/* Top Row: Badge & Links */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-amber-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  {project.badge}
                </span>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="View GitHub Repository"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                {project.title}
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1 mb-4">
                {project.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 mb-6">
                {project.description}
              </p>
            </div>

            {/* Bottom Section: Technologies & Action */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-500">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 hover:text-orange-300 uppercase tracking-wider group-hover:translate-x-1 transition-all"
                >
                  <span>INSPECT DOSSIER</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-300"
                >
                  <span>CODE</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Technical Dossier Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-orange-500/40 bg-[#090b10] p-6 sm:p-10 text-slate-200 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-mono text-orange-400 mb-2">
                  <Terminal className="w-3.5 h-3.5" />
                  TECHNICAL DOSSIER // {selectedProject.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
                  {selectedProject.subtitle}
                </p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overview & Problem */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-mono text-orange-400 uppercase tracking-wider mb-1">
                  Overview & Motivation
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {selectedProject.longDescription}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
                  The Problem Solved
                </h4>
                <p className="text-sm text-slate-300">
                  {selectedProject.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                  Technical Architecture & Approach
                </h4>
                <p className="text-sm text-slate-300">
                  {selectedProject.approach}
                </p>
              </div>
            </div>

            {/* Srijit's Personal Contributions */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                Personal Engineering Contributions
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {selectedProject.contributions.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">›</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges & Learnings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 space-y-2">
                <div className="text-xs font-mono text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Engineering Challenges
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedProject.challenges.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold">·</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-2">
                <div className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Key Takeaways
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedProject.learnings.map((l, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">·</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Technologies & Frameworks
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-slate-500">
                VERIFIED FROM GITHUB CODEBASE
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white bg-white/5 border border-white/10 transition-colors"
                >
                  CLOSE
                </button>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-mono font-bold text-black bg-gradient-to-r from-orange-500 to-amber-400 hover:scale-105 transition-all shadow-lg shadow-orange-500/20"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>VIEW REPOSITORY</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
