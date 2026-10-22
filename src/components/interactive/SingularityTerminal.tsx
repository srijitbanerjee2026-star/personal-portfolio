"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Copy, Check, Send, CornerDownLeft } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import { FAQ_TERMINAL_COMMANDS } from "@/data/portfolioData";

interface LogEntry {
  command: string;
  output: string;
  time: string;
}

export default function SingularityTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      command: "init-singularity --session=active",
      output:
        "INITIALIZED COSMIC COMPUTATIONAL DOSSIER. TYPE 'help' OR SELECT A DIRECTIVE BELOW TO QUERY TELEMETRY.",
      time: "00:00:01",
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === "clear") {
      setLogs([]);
      setInputVal("");
      return;
    }

    const now = new Date().toTimeString().split(" ")[0];
    const output =
      FAQ_TERMINAL_COMMANDS[trimmed] ||
      `Directive '${trimmed}' not recognized. Type 'help' for available commands (bio, research, projects, stack, timeline, github, clear).`;

    setLogs((prev) => [...prev, { command: trimmed, output, time: now }]);
    setInputVal("");
  };

  const copyGithub = () => {
    navigator.clipboard.writeText("https://github.com/srijitbanerjee2026-star");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-orange-500/30 bg-black/80 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_80px_rgba(255,100,0,0.1)] space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="text-xs font-mono text-orange-500 uppercase tracking-widest flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            05 // SINGULARITY TERMINAL & CONNECT
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Connect & Dispatch
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copyGithub}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-orange-500/40 transition-all"
            title="Copy GitHub URL"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">COPIED TO CLIPBOARD</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-orange-400" />
                <span>COPY GITHUB URL</span>
              </>
            )}
          </button>

          <a
            href="https://github.com/srijitbanerjee2026-star"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-mono font-bold text-black bg-gradient-to-r from-orange-500 to-amber-400 hover:scale-105 transition-all shadow-lg shadow-orange-500/20"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GITHUB PROFILE</span>
          </a>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="rounded-2xl border border-white/15 bg-[#040508] p-5 sm:p-6 font-mono text-xs shadow-2xl space-y-4">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-orange-500" />
            <span className="text-white font-bold tracking-wider">SRIJIT_BANERJEE // SHELL v2.4</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
        </div>

        {/* Quick Command Directives Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
          <span className="text-slate-500 uppercase">QUICK COMMANDS:</span>
          {["bio", "research", "projects", "stack", "timeline", "github", "clear"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-orange-400 hover:bg-orange-500/20 hover:border-orange-500/40 transition-colors"
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* Console Log Area */}
        <div className="max-h-64 min-h-[160px] overflow-y-auto space-y-3 pt-2 text-slate-300 pr-2">
          {logs.map((log, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-orange-400/90">
                <span className="text-slate-500">[{log.time}]</span>
                <span className="text-emerald-400">guest@singularity:~$</span>
                <span>{log.command}</span>
              </div>
              <div className="pl-6 text-slate-300 leading-relaxed whitespace-pre-wrap">
                {log.output}
              </div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Command Input Field */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(inputVal);
          }}
          className="flex items-center gap-2 pt-3 border-t border-white/10"
        >
          <span className="text-emerald-400">guest@singularity:~$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a command (e.g. bio, research, stack, github)..."
            className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-600 font-mono text-xs"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-400 hover:bg-orange-500 hover:text-black transition-all flex items-center gap-1"
            title="Execute Command"
          >
            <span>RUN</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Recruiter / Collaboration Invitation Note */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white mb-1">
            Looking to collaborate, mentor, or hire an early-career builder?
          </h4>
          <p className="text-xs sm:text-sm text-slate-400">
            Open to AI/ML research internships, backend engineering challenges, and hackathon teams.
          </p>
        </div>

        <a
          href="https://github.com/srijitbanerjee2026-star"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all whitespace-nowrap"
        >
          <Send className="w-3.5 h-3.5 text-orange-400" />
          <span>CONNECT ON GITHUB</span>
        </a>
      </div>
    </div>
  );
}
