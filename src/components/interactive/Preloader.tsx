"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TECH_KEYWORDS = [
  "NEURAL ARCHITECTURES",
  "PREDICTIVE TRANSFORMERS",
  "BACKEND DISTRIBUTED SYSTEMS",
  "PHYSICS PATCH TRANSFORMER",
  "QUANTITATIVE MODELING",
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [keywordIndex, setKeywordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    const wordTimer = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % TECH_KEYWORDS.length);
    }, 450);

    return () => {
      clearInterval(timer);
      clearInterval(wordTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        transition: { duration: 0.9, ease: [0.87, 0, 0.13, 1] },
      }}
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="fixed inset-0 z-50 flex flex-col justify-between p-8 sm:p-16 bg-[#07080B] text-white font-mono select-none"
    >
      {/* Header */}
      <div className="flex justify-between items-center text-xs tracking-widest text-[#94A3B8]/70 border-b border-white/10 pb-4">
        <span className="font-bold text-white tracking-wider">SRIJIT BANERJEE</span>
        <span>VIT VELLORE // SYSTEM INIT</span>
      </div>

      {/* Middle Interactive Kinetic Counter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-6 my-auto">
        <div className="lg:col-span-8">
          <div className="overflow-hidden h-10 mb-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={keywordIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xs sm:text-sm text-[#38BDF8] font-mono uppercase tracking-widest"
              >
                {`> ${TECH_KEYWORDS[keywordIndex]}`}
              </motion.p>
            </AnimatePresence>
          </div>
          <h1 className="text-3xl sm:text-6xl font-black text-white font-heading tracking-tight leading-none">
            INTEGRATED M.TECH CSE
          </h1>
        </div>

        <div className="lg:col-span-4 text-left lg:text-right">
          <div className="text-8xl sm:text-[11rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-[#38BDF8]">
            {String(progress).padStart(3, "0")}
          </div>
        </div>
      </div>

      {/* Footer Track Bar */}
      <div className="space-y-3">
        <div className="flex justify-between text-xs text-[#94A3B8]/60 font-mono">
          <span>LOADING DEPENDENCIES</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-white/5 h-[3px] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#00F5A0] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}