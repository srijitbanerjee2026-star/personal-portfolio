"use client";

import React from "react";

interface StageNavigatorProps {
  scrollProgress: number;
}

const STAGES = [
  { id: "hero", label: "01. EVENT HORIZON", min: 0.0, max: 0.2, desc: "Name & Black Hole" },
  { id: "about", label: "02. ACCRETION TRANSIT", min: 0.2, max: 0.42, desc: "Context & Profile" },
  { id: "research", label: "03. BINARY COLLISION", min: 0.42, max: 0.64, desc: "2 Stars Collide · Research" },
  { id: "projects", label: "04. NEURAL LATTICE", min: 0.64, max: 0.86, desc: "Codebases & Stack" },
  { id: "terminal", label: "05. TERMINAL CORE", min: 0.86, max: 1.0, desc: "Shell & Connect" },
];

export default function StageNavigator({ scrollProgress }: StageNavigatorProps) {
  const currentStageIndex = STAGES.findIndex(
    (s) => scrollProgress >= s.min && scrollProgress <= s.max
  );
  const activeIndex = currentStageIndex === -1 ? 0 : currentStageIndex;

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3 font-mono text-[11px] select-none pointer-events-auto">
      <div className="text-[10px] text-orange-500 uppercase tracking-widest font-bold mb-1 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
        <span>STAGE TELEMETRY</span>
      </div>

      {STAGES.map((stage, idx) => {
        const isActive = activeIndex === idx;
        return (
          <button
            key={stage.id}
            onClick={() => scrollToSection(stage.id)}
            className="group flex items-center gap-3 text-right transition-all"
            title={stage.desc}
          >
            <div
              className={`transition-all duration-300 ${
                isActive
                  ? "opacity-100 text-orange-400 font-bold"
                  : "opacity-40 text-slate-400 group-hover:opacity-80 group-hover:text-white"
              }`}
            >
              <div>{stage.label}</div>
              <div className="text-[9px] text-slate-500">{stage.desc}</div>
            </div>

            {/* Indicator Dot */}
            <div
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? "w-2.5 h-6 bg-gradient-to-b from-orange-500 to-amber-400 shadow-[0_0_12px_rgba(255,100,0,0.8)]"
                  : "w-2 h-2 bg-white/20 group-hover:bg-white/50"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
