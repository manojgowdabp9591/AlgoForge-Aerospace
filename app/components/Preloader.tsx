"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Terminal, ShieldCheck, Wifi } from "lucide-react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // Technical boot sequence messages
  const SYSTEM_LOGS = [
    "INIT_CORE_KERNEL...",
    "MOUNTING_VIRTUAL_FILE_SYSTEM...",
    "LOADING_TEXTURE_ATLAS [HIGH_RES]...",
    "CALIBRATING_GYROSCOPIC_SENSORS...",
    "ESTABLISHING_SECURE_UPLINK...",
    "OPTIMIZING_RENDER_PIPELINE...",
    "VORTEX_ENGINE_READY."
  ];

  useEffect(() => {
    // 1. Progress Bar Logic
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2; 
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // 2. Log Logic (Adds a new log based on progress milestones)
  useEffect(() => {
    const logIndex = Math.floor((progress / 100) * SYSTEM_LOGS.length);
    if (SYSTEM_LOGS[logIndex] && !logs.includes(SYSTEM_LOGS[logIndex])) {
      setLogs((prev) => [...prev, SYSTEM_LOGS[logIndex]].slice(-5));
    }
  }, [progress, logs]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden font-mono text-white select-none"
        >
          {/* BACKGROUND: Grid & Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_80%)]" />
          
          {/* CRT Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />

          {/* CENTRAL HUD */}
          <div className="relative z-30 w-full max-w-md px-8 flex flex-col items-center">
            
            {/* 1. Spinner Ring */}
            <div className="relative w-40 h-40 mb-12 flex items-center justify-center">
               {/* Outer Static Ring */}
               <div className="absolute inset-0 border border-white/10 rounded-full" />
               <div className="absolute inset-[-4px] border border-cyan-500/20 rounded-full opacity-50" />
               
               {/* Spinning Segments */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border-2 border-transparent border-t-cyan-500 border-r-cyan-500/50 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"
               />
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-4 border border-transparent border-l-white/40 rounded-full"
               />
               
               {/* Center Icon */}
               <div className="relative z-10 bg-black p-4 rounded-full border border-white/10">
                   <Cpu className="text-cyan-400 w-8 h-8 animate-pulse drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
               </div>
            </div>

            {/* 2. Main Title */}
            <h1 className="text-4xl font-black tracking-[0.25em] text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                AlgoForge Aerospace
            </h1>
            <div className="flex items-center gap-4 text-[10px] text-cyan-500/80 uppercase tracking-widest mb-12 font-bold">
               <span className="flex items-center gap-1"><ShieldCheck size={10} /> Sys.Ver 2.4.0</span>
               <span className="flex items-center gap-1"><Wifi size={10} /> Online</span>
            </div>

            {/* 3. Progress Bar & Percentage */}
            <div className="w-full relative group">
                <div className="flex justify-between text-xs text-white/50 mb-2 font-bold tracking-wider">
                    <span>LOADING ASSETS</span>
                    <span className="text-cyan-400 tabular-nums">{progress}%</span>
                </div>
                
                {/* Bar Container */}
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative border border-white/5">
                    {/* Filling Bar */}
                    <motion.div 
                        className="absolute top-0 left-0 h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]"
                        style={{ width: `${progress}%` }}
                    />
                    {/* Glitch/Scanner Effect on Bar */}
                    <motion.div 
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-30 mix-blend-overlay"
                    />
                </div>
            </div>

            {/* 4. Terminal Logs */}
            <div className="mt-8 w-full h-28 flex flex-col justify-end items-start overflow-hidden border-l-2 border-cyan-500/20 pl-4 bg-gradient-to-r from-cyan-900/5 to-transparent rounded-r-lg">
                {logs.map((log, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[10px] text-cyan-400/80 flex items-center gap-2 mb-1.5 font-mono tracking-tight"
                    >
                        <Terminal size={10} className="text-cyan-600" />
                        {log} 
                        {i === logs.length - 1 && <span className="animate-pulse w-1.5 h-3 bg-cyan-400 block" />}
                    </motion.div>
                ))}
            </div>

          </div>

          {/* CORNER DECORATIONS */}
          <div className="absolute bottom-8 left-8 text-[9px] text-white/20 font-mono leading-relaxed">
             COORDINATES: <br/> 
             <span className="text-white/40">34.0522° N, 118.2437° W</span>
          </div>
          <div className="absolute bottom-8 right-8 text-[9px] text-white/20 font-mono text-right leading-relaxed">
             SECURE CONNECTION <br/> 
             <span className="text-white/40">ENCRYPTION: AES-256-GCM</span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
