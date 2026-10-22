"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  const toggleAudio = async () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;

      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      if (!isPlaying) {
        // Create master gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2.0); // Gentle ambient level
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Lowpass filter for deep space warmth
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(140, ctx.currentTime);
        filter.connect(masterGain);
        filterRef.current = filter;

        // Sub-bass fundamental drone (48Hz)
        const osc1 = ctx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(48, ctx.currentTime);
        osc1.connect(filter);
        osc1.start();
        osc1Ref.current = osc1;

        // Harmonic overtone (96Hz) with slight detune for cosmic chorusing
        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(96.4, ctx.currentTime);
        const osc2Gain = ctx.createGain();
        osc2Gain.gain.setValueAtTime(0.35, ctx.currentTime);
        osc2.connect(osc2Gain);
        osc2Gain.connect(filter);
        osc2.start();
        osc2Ref.current = osc2;

        setIsPlaying(true);
      } else {
        // Smoothly fade out
        if (gainNodeRef.current && ctx) {
          gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
          gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
          setTimeout(() => {
            try {
              osc1Ref.current?.stop();
              osc2Ref.current?.stop();
              osc1Ref.current?.disconnect();
              osc2Ref.current?.disconnect();
            } catch {
              // ignore
            }
          }, 800);
        }
        setIsPlaying(false);
      }
    } catch {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      try {
        osc1Ref.current?.stop();
        osc2Ref.current?.stop();
        audioCtxRef.current?.close();
      } catch {
        // ignore
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all border ${
        isPlaying
          ? "bg-orange-500/15 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(255,100,0,0.3)]"
          : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
      }`}
      title={isPlaying ? "Mute ambient cosmic drone" : "Enable atmospheric space sound"}
      aria-label="Toggle ambient audio"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          <span className="hidden sm:inline">AUDIO: ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AUDIO: MUTED</span>
        </>
      )}
    </button>
  );
}
