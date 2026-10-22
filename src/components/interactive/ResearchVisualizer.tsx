"use client";

import React, { useState, useEffect } from "react";
import { Activity, Cpu, Layers, ShieldCheck, Zap, GitCommit, Sparkles } from "lucide-react";
import { RESEARCH_PROJECT } from "@/data/portfolioData";

export default function ResearchVisualizer() {
  const [activeTab, setActiveTab] = useState(0);
  const [scrubPosition, setScrubPosition] = useState(65); // 0 - 100%
  const [isSimulating, setIsSimulating] = useState(true);
  const [phaseOffset, setPhaseOffset] = useState(0);

  // Live sensor waveform animation
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setPhaseOffset((prev) => (prev + 0.08) % (Math.PI * 2));
    }, 40);
    return () => clearInterval(interval);
  }, [isSimulating]);

  // Generate synthetic 3-phase electrical wave points with localized harmonic degradation
  const generateWaveform = (phase: number, amplitude: number, hasFault: boolean) => {
    const points: string[] = [];
    const width = 600;
    const height = 120;
    const midY = height / 2;

    for (let x = 0; x <= width; x += 4) {
      const t = (x / width) * 12 + phaseOffset + phase;
      let y = Math.sin(t) * amplitude;

      // Add 3rd and 5th harmonic distortion simulating motor non-linearity
      y += Math.sin(t * 3) * (amplitude * 0.15);
      y += Math.sin(t * 5) * (amplitude * 0.08);

      // In the fault zone (around x = 380 to 460, representing degradation)
      if (hasFault && x > 360 && x < 480) {
        const faultProgress = 1.0 - Math.abs((x - 420) / 60);
        // High frequency transient noise
        y += Math.sin(t * 18) * (amplitude * 0.45 * faultProgress);
      }

      points.push(`${x},${midY - y}`);
    }
    return points.join(" ");
  };

  return (
    <div className="rounded-3xl border border-orange-500/30 bg-black/75 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_80px_rgba(255,100,0,0.12)] space-y-8">
      {/* Header Badge & Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-mono text-orange-400 mb-3">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>PRIMARY RESEARCH DOSSIER · ONGOING</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            {RESEARCH_PROJECT.title}
          </h3>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2">
            {RESEARCH_PROJECT.institution} · {RESEARCH_PROJECT.focusArea}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className="px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider border border-white/10 bg-white/5 hover:border-orange-500/40 hover:text-orange-400 transition-colors"
          >
            {isSimulating ? "PAUSE TELEMETRY" : "RESUME TELEMETRY"}
          </button>
        </div>
      </div>

      {/* Motivation & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
          <p className="text-white font-medium">
            {RESEARCH_PROJECT.overview}
          </p>
          <p className="text-slate-400 text-sm">
            <strong className="text-slate-200">The Problem:</strong> {RESEARCH_PROJECT.motivation}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-amber-300">
              #PatchTST
            </span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-orange-400">
              #PhysicsInformedML
            </span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-amber-200">
              #MotorCurrentSignatureAnalysis
            </span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
              #PyTorch
            </span>
          </div>
        </div>

        {/* Live Status Callout Box */}
        <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-white/5 via-black/40 to-orange-950/20 p-5 border border-orange-500/20 space-y-3 font-mono text-xs">
          <div className="text-orange-400 uppercase tracking-widest font-bold flex items-center gap-2">
            <GitCommit className="w-4 h-4" />
            EMPIRICAL STATUS LOG
          </div>
          <ul className="space-y-2 text-slate-300">
            {RESEARCH_PROJECT.currentProgress.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-orange-500 font-bold mt-0.5">›</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Sensor Waveform & Attention Scrubbing Console */}
      <div className="rounded-2xl bg-[#030407] border border-white/10 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-200">LIVE SENSOR TELEMETRY SIMULATOR</span>
            <span className="text-slate-500">| 3-Phase MCSA (Motor Current Signature)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-orange-400 flex items-center gap-1.5">
              <span className="h-1.5 w-4 rounded-full bg-orange-500" /> Phase A (Degrading)
            </span>
            <span className="text-amber-400 flex items-center gap-1.5">
              <span className="h-1.5 w-4 rounded-full bg-amber-400" /> Phase B
            </span>
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="h-1.5 w-4 rounded-full bg-slate-500" /> Phase C
            </span>
          </div>
        </div>

        {/* SVG Waveform Display */}
        <div className="relative w-full overflow-hidden rounded-xl bg-black/60 border border-white/5 py-2">
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

          {/* Attention Window Overlay */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none border-x border-orange-500/60 bg-orange-500/10 transition-all duration-75"
            style={{
              left: `${scrubPosition - 8}%`,
              width: "16%",
            }}
          >
            <div className="absolute top-2 left-2 text-[10px] font-mono text-orange-400 uppercase tracking-widest bg-black/80 px-2 py-0.5 rounded border border-orange-500/40">
              ATTENTION PATCH WEIGHT: {(0.78 + Math.sin(scrubPosition * 0.1) * 0.18).toFixed(2)}
            </div>
          </div>

          <svg
            className="w-full h-32 text-orange-500"
            viewBox="0 0 600 120"
            preserveAspectRatio="none"
          >
            {/* Phase C */}
            <polyline
              fill="none"
              stroke="#64748b"
              strokeWidth="1.2"
              strokeOpacity="0.4"
              points={generateWaveform(2.1, 38, false)}
            />
            {/* Phase B */}
            <polyline
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.4"
              strokeOpacity="0.65"
              points={generateWaveform(4.2, 40, false)}
            />
            {/* Phase A (with transient fault) */}
            <polyline
              fill="none"
              stroke="#ff5500"
              strokeWidth="2.0"
              points={generateWaveform(0, 42, true)}
            />
          </svg>

          {/* Scrub interactive slider */}
          <div className="px-4 py-2 border-t border-white/10 flex items-center gap-4 text-xs font-mono">
            <span className="text-slate-400 whitespace-nowrap">SCRUB TEMPORAL PATCH:</span>
            <input
              type="range"
              min="10"
              max="90"
              value={scrubPosition}
              onChange={(e) => setScrubPosition(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer bg-white/10 h-1 rounded-lg"
            />
            <span className="text-orange-400 w-12 text-right">{scrubPosition}%</span>
          </div>
        </div>
      </div>

      {/* Architectural Breakdown Navigation Tabs */}
      <div className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <Layers className="w-4 h-4 text-orange-500" />
          <span>PROPOSED NEURAL ARCHITECTURE LAYERS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {RESEARCH_PROJECT.proposedArchitecture.map((arch, index) => {
            const isSelected = activeTab === index;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-gradient-to-b from-orange-500/20 to-black/60 border-orange-500 text-white shadow-lg shadow-orange-500/10"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-orange-400">LAYER 0{index + 1}</span>
                  {index === 0 && <Cpu className="w-4 h-4 text-amber-400" />}
                  {index === 1 && <ShieldCheck className="w-4 h-4 text-orange-400" />}
                  {index === 2 && <Zap className="w-4 h-4 text-amber-300" />}
                  {index === 3 && <Sparkles className="w-4 h-4 text-orange-400" />}
                </div>
                <div className="font-bold text-sm text-slate-100">{arch.name.split(". ")[1]}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Architecture Layer Detail */}
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-300 text-sm leading-relaxed">
          <div className="font-mono text-xs text-orange-400 mb-2 uppercase tracking-wider">
            {RESEARCH_PROJECT.proposedArchitecture[activeTab].name}
          </div>
          <p className="text-base text-slate-200">
            {RESEARCH_PROJECT.proposedArchitecture[activeTab].description}
          </p>
        </div>
      </div>
    </div>
  );
}
