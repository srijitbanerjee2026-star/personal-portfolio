"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Terminal as TerminalIcon,
  BookOpen,
  FolderGit2,
  Cpu,
  Layers,
  ChevronUp,
  Menu,
  X,
  ExternalLink,
  Flame,
  Radio,
} from "lucide-react";

import AudioToggle from "@/components/interactive/AudioToggle";
import StageNavigator from "@/components/interactive/StageNavigator";
import ResearchVisualizer from "@/components/interactive/ResearchVisualizer";
import ProjectsShowcase from "@/components/interactive/ProjectsShowcase";
import SkillsMatrix from "@/components/interactive/SkillsMatrix";
import JourneyTimeline from "@/components/interactive/JourneyTimeline";
import SingularityTerminal from "@/components/interactive/SingularityTerminal";

// Disable SSR for 3D WebGL Canvas
const Scene3D = dynamic(() => import("@/components/interactive/Scene3D"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#020204]" />,
});

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(Math.max(window.scrollY / maxScroll, 0), 1));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative bg-[#020204] text-slate-100 min-h-screen selection:bg-orange-500 selection:text-black">
      {/* 3D WebGL Multi-Stage Canvas (Black Hole, Binary Collision, Neural Lattice) */}
      <Scene3D scrollProgress={scrollProgress} />

      {/* Grid overlay for ambient sci-fi feel */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* Radial vignette mask for cinematic edge darkening */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(2,2,4,0.85)_100%)] pointer-events-none z-0" />

      {/* Floating Stage Navigator (Right HUD) */}
      <StageNavigator scrollProgress={scrollProgress} />

      {/* Navigation Header / HUD */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 flex justify-between items-center backdrop-blur-md bg-black/40 border-b border-white/10">
        <a
          href="#"
          className="font-mono text-xs sm:text-sm font-bold text-white tracking-widest hover:text-orange-400 transition-colors flex items-center gap-2.5"
        >
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
          <span className="tracking-widest">SRIJIT BANERJEE</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 font-mono text-xs uppercase tracking-widest text-slate-400">
          <a href="#about" className="hover:text-white transition-colors">
            01. CONTEXT
          </a>
          <a href="#research" className="hover:text-white transition-colors">
            02. COLLISION & RESEARCH
          </a>
          <a href="#projects" className="hover:text-white transition-colors">
            03. LATTICE & PROJECTS
          </a>
          <a href="#skills" className="hover:text-white transition-colors">
            04. MATRIX
          </a>
          <a href="#journey" className="hover:text-white transition-colors">
            05. JOURNEY
          </a>
          <a href="#terminal" className="hover:text-orange-400 transition-colors">
            06. TERMINAL
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <AudioToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 backdrop-blur-2xl lg:hidden flex flex-col justify-center px-8 space-y-6 font-mono text-sm uppercase tracking-widest">
          {[
            { href: "#about", label: "01. CONTEXT & PROFILE" },
            { href: "#research", label: "02. BINARY COLLISION & RESEARCH" },
            { href: "#projects", label: "03. NEURAL LATTICE & PROJECTS" },
            { href: "#skills", label: "04. TECHNICAL MATRIX" },
            { href: "#journey", label: "05. CHRONOLOGY" },
            { href: "#terminal", label: "06. TERMINAL & CONTACT" },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-orange-400 transition-colors py-2 border-b border-white/10"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* STAGE 1: HERO & NAME MATERIALIZATION WITH BLACK HOLE */}
        <section className="min-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-12 text-center relative pointer-events-none">
          <div
            className="max-w-5xl w-full space-y-6 pt-20 transition-all duration-200"
            style={{
              opacity: Math.max(1 - scrollProgress * 3.2, 0),
              transform: `scale(${1 + scrollProgress * 0.35}) translateY(${scrollProgress * 220}px)`,
            }}
          >
            {/* Sub-badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-black/70 border border-orange-500/40 text-xs font-mono text-amber-300 backdrop-blur-xl shadow-2xl pointer-events-auto">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              INTEGRATED M.TECH CSE · VIT VELLORE
            </div>

            {/* Main Headline - Zooms up and expands with the Singularity */}
            <h1 className="text-6xl sm:text-8xl md:text-[8.5rem] font-black text-white tracking-tight uppercase leading-none text-glow-orange select-none">
              SRIJIT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-300 to-white">
                BANERJEE
              </span>
            </h1>

            {/* Concise, Honest Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
              Full-stack software engineering, predictive deep learning architectures, time-series sensor modeling, and computational graphics.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs tracking-wider uppercase justify-center pointer-events-auto">
              <a
                href="#research"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 text-black font-bold hover:scale-105 transition-all shadow-lg shadow-orange-500/25"
              >
                <BookOpen className="w-4 h-4" />
                <span>EXPLORE RESEARCH</span>
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 text-white border border-white/10 hover:border-orange-500 hover:text-orange-400 transition-all backdrop-blur-md"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>VIEW CODEBASES</span>
              </a>
              <a
                href="#terminal"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white/5 text-slate-300 border border-white/10 hover:border-white/30 hover:text-white transition-all backdrop-blur-md"
              >
                <TerminalIcon className="w-4 h-4" />
                <span>TERMINAL</span>
              </a>
            </div>
          </div>

          {/* Bottom HUD Bar */}
          <div className="absolute bottom-8 left-6 right-6 sm:left-12 sm:right-12 flex flex-wrap justify-between items-center gap-4 font-mono text-xs text-slate-400 uppercase border-t border-white/10 pt-4 pointer-events-none">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-orange-500 rounded-full animate-ping" />
              <span>STAGE 01 // EVENT HORIZON · SCROLL TO ENTER WARP TRANSIT</span>
            </div>
            <div className="flex items-center gap-6">
              <span>VELLORE, INDIA</span>
              <span className="hidden sm:inline">SCHWARZSCHILD RAD: r_s = 2GM/c²</span>
            </div>
          </div>
        </section>

        {/* STAGE 2: ACCRETION TRANSIT -> CONTEXT & INTRO PROFILE */}
        <section id="about" className="min-h-screen max-w-6xl mx-auto px-6 py-32 flex flex-col justify-center">
          {/* Stage 02 HUD Alert */}
          <div className="mb-6 flex items-center gap-2 text-xs font-mono text-amber-400/80 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl backdrop-blur-md w-fit">
            <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>STAGE 02 // WARP TRANSIT COMPLETE · CONTEXT TELEMETRY UNLOCKED</span>
          </div>

          <div className="bg-black/75 p-8 sm:p-14 rounded-3xl border border-orange-500/30 shadow-[0_0_90px_rgba(255,100,0,0.12)] space-y-10 backdrop-blur-2xl">
            {/* Header */}
            <div>
              <div className="font-mono text-xs text-orange-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                <span className="h-2 w-2 bg-orange-500 rounded-full" />
                01 // CONTEXT & PROFILE
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                Engineering at the intersection of predictive systems, scalable APIs, and applied machine learning.
              </h2>
            </div>

            {/* Narrative Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base text-slate-300 leading-relaxed">
              <div className="space-y-4">
                <p>
                  I am a first-year <strong className="text-white">Integrated M.Tech Computer Science & Engineering</strong> student at <strong className="text-amber-300">VIT Vellore, India</strong>. My technical journey is defined by deep curiosity about how computational systems model the physical and digital world.
                </p>
                <p>
                  Currently, I am actively conducting research in <strong className="text-white">transformer-based predictive maintenance</strong> for industrial electrical equipment, developing custom multi-rate patch architectures to forecast insulation degradation and anomalous sensor signatures.
                </p>
              </div>

              <div className="space-y-4">
                <p>
                  Beyond machine learning modeling, I focus on <strong className="text-white">backend engineering and API infrastructure</strong>. I build high-concurrency microservices using <span className="text-orange-400">TypeScript, Node.js, and FastAPI</span>, with an emphasis on strict transport schemas, defensive validation, and asynchronous pipelines.
                </p>
                <p>
                  I thrive in hackathons, open-source experimentation, and algorithmic challenge solving—continuously bridging theoretical ML formulations with production-ready software.
                </p>
              </div>
            </div>

            {/* 3 Pillars of Focus */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 font-mono text-xs">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="text-orange-400 font-bold text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  PREDICTIVE ML
                </div>
                <div className="text-slate-400 leading-normal">
                  Transformers, temporal patch embeddings, sensor anomaly detection & physical inductive biases.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  BACKEND & APIS
                </div>
                <div className="text-slate-400 leading-normal">
                  TypeScript microservices, FastAPI async runtimes, REST contracts & database integration.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  GRAPHICS & COMPUTE
                </div>
                <div className="text-slate-400 leading-normal">
                  WebGL shaders, Three.js astrophysics simulation, and quantitative computing algorithms.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STAGE 3: BINARY STELLAR COLLISION & PRIMARY RESEARCH */}
        <section id="research" className="min-h-screen max-w-6xl mx-auto px-6 py-20 flex flex-col justify-center">
          {/* Stage 03 Celestial Event Announcement */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-orange-400/90 bg-gradient-to-r from-orange-500/20 via-amber-500/10 to-transparent border border-orange-500/30 px-5 py-3 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
              <span className="font-bold tracking-wider">
                STAGE 03 // BINARY STELLAR COLLISION & SUPERNOVA DETONATION
              </span>
            </div>
            <span className="text-slate-400 text-[11px]">
              OBSERVE 3D MERGER BEHIND DOSSIER · PRIMARY RESEARCH UNVEILED
            </span>
          </div>

          <ResearchVisualizer />
        </section>

        {/* STAGE 4: NEURAL LATTICE FORMATION -> SELECTED PROJECTS & CODEBASES */}
        <section id="projects" className="min-h-screen max-w-6xl mx-auto px-6 py-20 flex flex-col justify-center">
          {/* Stage 04 Announcement */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-emerald-400/90 bg-gradient-to-r from-emerald-500/15 via-white/5 to-transparent border border-emerald-500/30 px-5 py-3 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="font-bold tracking-wider">
                STAGE 04 // SUPERNOVA STABILIZED INTO COMPUTATIONAL NEURAL LATTICE
              </span>
            </div>
            <span className="text-slate-400 text-[11px]">
              PROJECT REPOSITORIES & ENGINEERING DOSSIERS
            </span>
          </div>

          <ProjectsShowcase />
        </section>

        {/* SECTION 04: TECHNICAL MATRIX */}
        <section id="skills" className="min-h-screen max-w-6xl mx-auto px-6 py-20 flex flex-col justify-center">
          <SkillsMatrix />
        </section>

        {/* SECTION 05: JOURNEY & CHRONOLOGY */}
        <section id="journey" className="min-h-screen max-w-6xl mx-auto px-6 py-20 flex flex-col justify-center">
          <JourneyTimeline />
        </section>

        {/* STAGE 5: SINGULARITY TERMINAL CORE & CONNECT */}
        <section id="terminal" className="min-h-screen max-w-6xl mx-auto px-6 py-20 flex flex-col justify-center">
          {/* Stage 05 Announcement */}
          <div className="mb-6 flex items-center gap-2.5 text-xs font-mono text-orange-400/90 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl backdrop-blur-md w-fit">
            <TerminalIcon className="w-4 h-4 text-orange-400" />
            <span className="font-bold tracking-wider">
              STAGE 05 // TERMINAL CORE & ACTIVE DISPATCH CHANNEL
            </span>
          </div>

          <SingularityTerminal />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-black/80 px-6 sm:px-12 py-8 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-ping" />
            <span className="text-slate-200">SRIJIT BANERJEE</span>
            <span>· VIT VELLORE CSE</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/srijitbanerjee2026-star"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors flex items-center gap-1"
            >
              <span>GITHUB</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <span>TOP</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}