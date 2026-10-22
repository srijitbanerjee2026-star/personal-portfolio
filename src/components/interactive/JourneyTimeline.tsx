"use client";

import React from "react";
import { GraduationCap, BookOpen, Trophy, Code2, Sparkles } from "lucide-react";
import { TIMELINE_MILESTONES } from "@/data/portfolioData";

export default function JourneyTimeline() {
  const getIcon = (type: string) => {
    switch (type) {
      case "academic":
        return <GraduationCap className="w-4 h-4 text-orange-400" />;
      case "research":
        return <BookOpen className="w-4 h-4 text-amber-400" />;
      case "project":
        return <Trophy className="w-4 h-4 text-orange-400" />;
      case "engineering":
        return <Code2 className="w-4 h-4 text-amber-300" />;
      default:
        return <Sparkles className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-black/75 p-6 sm:p-10 backdrop-blur-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="text-xs font-mono text-orange-500 uppercase tracking-widest flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            04 // TRAJECTORY & CHRONOLOGY
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Academic & Builder Journey
          </h2>
        </div>

        <div className="text-xs font-mono text-slate-400">
          STUDENT & RESEARCHER · VIT VELLORE
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l border-white/10 ml-3 sm:ml-6 space-y-8 pl-6 sm:pl-8">
        {TIMELINE_MILESTONES.map((item, index) => (
          <div key={index} className="relative group">
            {/* Timeline node dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#0a0c12] border border-orange-500/60 shadow-[0_0_12px_rgba(255,100,0,0.3)] group-hover:scale-110 transition-transform">
              {getIcon(item.type)}
            </div>

            {/* Milestone Card */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-orange-500/30 transition-all space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-orange-400 font-bold tracking-wider">
                  {item.period}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {item.organization}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/5 text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
