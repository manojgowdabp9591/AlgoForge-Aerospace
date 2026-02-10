"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, Cpu, Terminal } from "lucide-react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // Technical boot sequence messages
  const SYSTEM_LOGS = [
    "INIT_CORE_KERNEL...",
    "MOUNTING_VFS...",
    "LOADING_TEXTURE_ATLAS...",
    "CALIBRATING_GYROS...",
    "CONNECTING_SAT_UPLINK...",
    "PURGING_STATIC_CACHE...",
    "VORTEX_ENGINE_READY."
  ];

  useEffect(() => {
    // 1. Progress Bar Logic
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800); // Small delay at 100%
          return 100;
        }
        // Random increment for realistic "loading" feel
        return prev + Math.floor(Math.random() * 5) + 1; 
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // 2. Log Logic (Adds a new log every ~15% progress)
  useEffect(() => {
    const logIndex = Math.floor((progress / 100) * SYSTEM_LOGS.length);
    if (SYSTEM_LOGS[logIndex] && !logs.includes(SYSTEM_LOGS[logIndex])) {
      setLogs((prev) => [...prev, SYSTEM_LOGS[logIndex]].slice(-4)); // Keep last 4 logs
    }
  }, [progress, logs]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden font-mono"
        >
          {/* BACKGROUND: Grid & Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)]" />

          {/* CENTRAL HUD */}
          <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
            
            {/* 1. Spinner Ring */}
            <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
               {/* Outer Static Ring */}
               <div className="absolute inset-0 border border-white/10 rounded-full" />
               
               {/* Spinning Segments */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border-2 border-transparent border-t-cyan-500 border-r-cyan-500/30 rounded-full"
               />
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-2 border border-transparent border-l-white/20 rounded-full"
               />
               
               {/* Center Icon */}
               <Cpu className="text-cyan-400 w-8 h-8 animate-pulse" />
            </div>

            {/* 2. Main Title */}
            <h1 className="text-3xl font-black tracking-[0.3em] text-white mb-1">
              VORTEX
            </h1>
            <div className="flex items-center gap-2 text-[10px] text-cyan-500/60 uppercase tracking-widest mb-12">
               <span>Sys.Ver 2.4.0</span>
               <span className="w-1 h-1 bg-cyan-500 rounded-full" />
               <span>Online</span>
            </div>

            {/* 3. Progress Bar & Percentage */}
            <div className="w-full relative">
                <div className="flex justify-between text-xs text-white/50 mb-2 font-bold">
                    <span>LOADING ASSETS</span>
                    <span className="text-cyan-400">{progress}%</span>
                </div>
                
                {/* Bar Container */}
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden relative">
                    {/* Filling Bar */}
                    <motion.div 
                        className="absolute top-0 left-0 h-full bg-cyan-500"
                        style={{ width: `${progress}%` }}
                    />
                    {/* Glitch/Scanner Effect on Bar */}
                    <motion.div 
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50"
                    />
                </div>
            </div>

            {/* 4. Terminal Logs (The "Precision" part) */}
            <div className="mt-8 w-full h-24 flex flex-col justify-end items-start overflow-hidden border-l-2 border-white/10 pl-4">
                {logs.map((log, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[10px] text-cyan-500/70 flex items-center gap-2 mb-1"
                    >
                        <span className="text-cyan-800">{`>`}</span> 
                        {log} 
                        {i === logs.length - 1 && <span className="animate-pulse">_</span>}
                    </motion.div>
                ))}
            </div>

          </div>

          {/* CORNER DECORATIONS */}
          <div className="absolute bottom-8 left-8 text-[9px] text-white/20 font-mono">
             COORDINATES: <br/> 
             34.0522° N, 118.2437° W
          </div>
          <div className="absolute bottom-8 right-8 text-[9px] text-white/20 font-mono text-right">
             SECURE CONNECTION <br/> 
             ENCRYPTION: AES-256
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}