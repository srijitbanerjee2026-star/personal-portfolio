"use client";

import React, { useState } from "react";
import { Cpu, Server, Sparkles, Compass } from "lucide-react";
import { TECHNICAL_SKILLS } from "@/data/portfolioData";

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Cpu className="w-4 h-4 text-orange-400" />;
      case 1:
        return <Server className="w-4 h-4 text-amber-400" />;
      case 2:
        return <Sparkles className="w-4 h-4 text-orange-300" />;
      default:
        return <Compass className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-black/75 p-6 sm:p-10 backdrop-blur-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="text-xs font-mono text-orange-500 uppercase tracking-widest flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            03 // TECHNICAL MATRIX & STACK
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Engineering Capabilities
          </h2>
        </div>

        <div className="text-xs font-mono text-slate-400">
          STRICTLY VERIFIED AGAINST ACTUAL CODEBASES
        </div>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TECHNICAL_SKILLS.map((cat, idx) => {
          const isSelected = activeCategory === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-gradient-to-b from-orange-500/20 to-black/60 border-orange-500 text-white shadow-lg shadow-orange-500/10"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                {getCategoryIcon(idx)}
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  cat.status === "Active Implementation"
                    ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20"
                    : "bg-sky-950/40 text-sky-400 border border-sky-500/20"
                }`}>
                  {cat.status}
                </span>
              </div>
              <div className="font-bold text-sm text-slate-100">{cat.category}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Category Skill Grid */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {TECHNICAL_SKILLS[activeCategory].skills.map((skill, idx) => {
            const isHovered = hoveredSkill === skill.name;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`p-4 rounded-xl border transition-all ${
                  isHovered
                    ? "bg-orange-500/10 border-orange-500/60 shadow-md shadow-orange-500/10 -translate-y-0.5"
                    : "bg-white/[0.02] border-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white text-sm">{skill.name}</span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    {skill.level}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-mono">
                  {skill.highlight}
                </p>
              </div>
            );
          })}
        </div>

        {/* Informative Note */}
        <div className="pt-2 text-xs font-mono text-slate-500 flex items-center justify-between">
          <span>* Technologies verified from active GitHub repositories & research experiments</span>
          <span>VIT VELLORE CSE</span>
        </div>
      </div>
    </div>
  );
}
