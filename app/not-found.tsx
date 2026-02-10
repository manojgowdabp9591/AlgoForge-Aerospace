"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { AlertTriangle, Home, RotateCcw, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const pathname = usePathname();
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden text-center px-6 selection:bg-red-500/30 font-mono">
      
      {/* ================= BACKGROUND LAYERS ================= */}
      
      {/* 1. Deep Space Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 pointer-events-none z-0 mix-blend-overlay"></div>

      {/* 2. The Singularity (Pulsing Core) */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none z-0"
      />

      {/* 3. Moving Grid Floor */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none z-0"></div>

      {/* ================= CONTENT LAYER ================= */}

      <div className="relative z-10 flex flex-col items-center">
        
        {/* GIANT 404 BACKGROUND TEXT */}
        <div className="relative">
            <h1 className={`text-[12rem] md:text-[18rem] font-black text-white/[0.02] select-none leading-none tracking-tighter transition-all duration-75 ${glitch ? 'translate-x-1 skew-x-12 opacity-10' : ''}`}>
            404
            </h1>
            {/* Red Glitch Shadow */}
            <h1 className={`absolute inset-0 text-[12rem] md:text-[18rem] font-black text-red-500/[0.02] select-none leading-none tracking-tighter transition-all duration-75 ${glitch ? '-translate-x-2 -skew-x-12 opacity-20' : 'opacity-0'}`}>
            404
            </h1>
        </div>

        {/* HUD CONTAINER */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg">
            
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden group"
            >
                {/* HUD Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg" />

                {/* Scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-[10px] w-full animate-[scan_3s_linear_infinite] pointer-events-none" />

                {/* Alert Icon */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20 relative">
                        <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-pulse" />
                        <AlertTriangle size={40} className="text-red-500 relative z-10" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-2 tracking-widest uppercase">
                    Signal <span className="text-red-500">Lost</span>
                </h2>
                
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />

                <p className="text-white/60 text-sm leading-relaxed font-light">
                    Telemetry data indicates you have drifted outside known navigational charts. 
                    The coordinates requested do not correspond to any active sector in the Vortex Network.
                </p>

                <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
                    <Link href="/" className="group/btn relative overflow-hidden rounded-full">
                        <div className="absolute inset-0 w-full h-full bg-cyan-500/20 group-hover/btn:bg-cyan-500/40 transition-colors" />
                        <div className="px-8 py-3 border border-cyan-500/50 rounded-full flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-xs relative z-10 group-hover/btn:text-white transition-colors">
                            <Home size={14} /> Mission Control
                        </div>
                    </Link>
                    
                    <button onClick={() => window.history.back()} className="group/btn relative overflow-hidden rounded-full">
                        <div className="px-8 py-3 border border-white/10 bg-white/5 hover:bg-white/10 rounded-full flex items-center gap-2 text-white/60 font-bold uppercase tracking-widest text-xs transition-colors">
                            <RotateCcw size={14} /> Retry Uplink
                        </div>
                    </button>
                </div>

                {/* Technical Footer */}
                <div className="mt-6 flex justify-between items-center text-[9px] text-white/20 uppercase tracking-widest font-mono">
                    <span>Err_Code: 404_Singularity</span>
                    <span className="flex items-center gap-1"><ShieldAlert size={10} /> Sys_Lock</span>
                </div>
            </motion.div>
        </div>

      </div>

      {/* ================= ORBITAL RINGS ANIMATION ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {[...Array(3)].map((_, i) => (
            <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 40 + i * 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/10"
                style={{ 
                    width: `${600 + i * 300}px`, 
                    height: `${600 + i * 300}px`,
                    borderStyle: i % 2 === 0 ? "solid" : "dashed"
                }}
            />
         ))}
      </div>

    </div>
  );
}
