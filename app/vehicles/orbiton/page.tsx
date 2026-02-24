"use client";

import PageLayout from "@/app/components/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Box, Wind, Zap, Activity, Ruler, Weight } from "lucide-react";
import { useState } from "react";

export default function OrbitonPage() {
  const [activeStage, setActiveStage] = useState<"fairing" | "stage2" | "stage1">("stage1");
  const strokeColor = (isActive: boolean) => isActive ? "#22d3ee" : "rgba(255,255,255,0.1)";
  const strokeWidth = (isActive: boolean) => isActive ? 2 : 1;
  const filter = (isActive: boolean) => isActive ? "drop-shadow(0 0 10px rgba(34,211,238,0.5))" : "none";
  const fill = (isActive: boolean) => isActive ? "rgba(34,211,238,0.05)" : "transparent";

  return (
    <PageLayout
      title="Vehicle: ORBITON-1"
      subtitle="The flagship reusable micro-launcher from AlgoForge Aerospace."
    >
      <div className="grid lg:grid-cols-12 gap-8 mt-10 items-start">
        
        {/* LEFT COLUMN: BLUEPRINT VISUALIZER */}
        <div className="lg:col-span-5 relative h-[750px] bg-black border border-white/10 rounded-3xl overflow-hidden flex items-center justify-center group select-none shadow-2xl">
            
            {/* Technical Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05),transparent_70%)]" />
            
            {/* Altitude Markers */}
            <div className="absolute top-8 left-6 bottom-8 border-l border-white/10 flex flex-col justify-between text-[9px] text-white/30 font-mono py-2 h-[90%] pointer-events-none">
                <div className="relative"><span className="absolute -top-2 -left-1 text-cyan-500">—</span><span className="pl-3">24.0m // PAYLOAD</span></div>
                <div className="relative"><span className="absolute -top-2 -left-1">—</span><span className="pl-3">18.5m // STAGE 2</span></div>
                <div className="relative"><span className="absolute -top-2 -left-1">—</span><span className="pl-3">12.0m // INTERSTAGE</span></div>
                <div className="relative"><span className="absolute -top-2 -left-1">—</span><span className="pl-3">00.0m // GROUND</span></div>
            </div>

            {/* THE ROCKET SVG */}
            <svg viewBox="0 0 500 800" className="w-full h-full p-12 z-10 drop-shadow-2xl">
                <defs>
                  <pattern id="grid-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="0.5"/>
                  </pattern>
                  <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(34,211,238,0)" />
                    <stop offset="50%" stopColor="rgba(34,211,238,0.1)" />
                    <stop offset="100%" stopColor="rgba(34,211,238,0)" />
                  </linearGradient>
                </defs>

                {/* --- GROUP 1: STAGE 1 (BOOSTER) --- */}
                <motion.g 
                  onClick={() => setActiveStage("stage1")}
                  className="cursor-pointer transition-all duration-500"
                  initial={false}
                  animate={{ 
                    stroke: strokeColor(activeStage === "stage1"),
                    strokeWidth: strokeWidth(activeStage === "stage1"),
                    filter: filter(activeStage === "stage1"),
                    fill: fill(activeStage === "stage1")
                  }}
                >
                    {/* Main Body */}
                    <path d="M200 260 L200 700 L300 700 L300 260" fill="url(#grid-pattern)" />
                    <path d="M250 260 L250 700" strokeDasharray="4 4" stroke="rgba(255,255,255,0.1)"/>

                    {/* Left Wing */}
                    <path d="M200 450 L110 600 L110 700 L200 700" fill="url(#grid-pattern)" />
                    <path d="M110 600 L20 720 L110 720 C110 720 130 740 160 740" /> 
                    
                    {/* Right Wing */}
                    <path d="M300 450 L390 600 L390 700 L300 700" fill="url(#grid-pattern)" />
                    <path d="M390 600 L480 720 L390 720 C390 720 370 740 340 740" />

                    {/* Legs */}
                    <path d="M200 550 C200 550 180 650 180 720" />
                    <path d="M300 550 C300 550 320 650 320 720" />

                    {/* Engine Nozzles */}
                    <path d="M230 700 L235 735 L265 735 L270 700" fill="black" /> 
                    <path d="M185 700 L190 725 L210 725 L215 700" fill="black" />
                    <path d="M285 700 L290 725 L310 725 L315 700" fill="black" />
                    
                    <line x1="200" y1="260" x2="300" y2="260" />
                </motion.g>

                {/* --- GROUP 2: STAGE 2 (UPPER) --- */}
                <motion.g 
                  onClick={() => setActiveStage("stage2")}
                  className="cursor-pointer"
                  initial={false}
                  animate={{ 
                    stroke: strokeColor(activeStage === "stage2"),
                    strokeWidth: strokeWidth(activeStage === "stage2"),
                    filter: filter(activeStage === "stage2"),
                    fill: fill(activeStage === "stage2")
                  }}
                >
                    <rect x="200" y="160" width="100" height="100" fill="url(#grid-pattern)" />
                    <path d="M230 260 L235 275 L265 275 L270 260" strokeDasharray="2 2" opacity="0.6"/>
                    <line x1="200" y1="160" x2="300" y2="160" />
                    {/* Vacuum Engine Bell Hint */}
                    <path d="M240 230 L260 230" stroke="rgba(255,255,255,0.2)" />
                </motion.g>

                {/* --- GROUP 3: FAIRING --- */}
                <motion.g 
                  onClick={() => setActiveStage("fairing")}
                  className="cursor-pointer"
                  initial={false}
                  animate={{ 
                    stroke: strokeColor(activeStage === "fairing"),
                    strokeWidth: strokeWidth(activeStage === "fairing"),
                    filter: filter(activeStage === "fairing"),
                    fill: fill(activeStage === "fairing")
                  }}
                >
                    <path d="M200 160 C200 100 250 40 250 40 C250 40 300 100 300 160 Z" fill="url(#grid-pattern)" />
                    <path d="M250 40 L250 160" strokeDasharray="2 2" stroke="rgba(255,255,255,0.1)" />
                </motion.g>
                
                {/* Labels */}
                <text x="360" y="600" fill="rgba(255,255,255,0.2)" fontSize="10" className="font-mono tracking-widest rotate-90">BOOSTER // S1</text>
                <text x="320" y="210" fill="rgba(255,255,255,0.2)" fontSize="10" className="font-mono tracking-widest">VACUUM // S2</text>

            </svg>
            
            {/* Interactive Hint */}
            <div className="absolute bottom-6 text-[10px] text-white/30 uppercase tracking-widest font-mono border border-white/10 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md">
                Interactive Schematic // Select Component
            </div>
        </div>

        {/* RIGHT COLUMN: SPECS & DETAILS */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Header */}
          <div className="relative">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center gap-3 tracking-tight">
               <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                 <Rocket className="text-cyan-400" size={24} />
               </div>
               ORBITON-1
            </h2>
            <p className="text-white/60 text-lg leading-relaxed font-light">
              Developed by <span className="text-white font-medium">AlgoForge Aerospace</span>, the Orbiton-1 is a SmallSat Launch Vehicle (SSLV) engineered for the next era of spaceflight. 
              By utilizing our proprietary <strong>Lifting Body</strong> architecture and <strong>VORTEX-1</strong> detonation engines, 
              we achieve rapid reusability without the mass penalty of traditional landing burns.
            </p>
          </div>

          {/* DYNAMIC DETAIL CARD */}
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl min-h-[300px] relative overflow-hidden transition-all duration-500 hover:bg-white/[0.04] group">
              
             {/* Background Icon Watermark */}
             <div className="absolute -right-8 -bottom-8 opacity-[0.03] text-white transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.05]">
                {activeStage === "fairing" && <Box size={240} />}
                {activeStage === "stage2" && <Zap size={240} />}
                {activeStage === "stage1" && <Wind size={240} />}
             </div>

             <AnimatePresence mode="wait">
                 {activeStage === "stage1" && (
                     <StageDetails 
                        key="s1"
                        title="Stage 1: Heavy Lifting Body"
                        desc="Expanded wing surface area provides superior glide ratio during reentry. The widened core accommodates increased propellant load for higher delta-V."
                        stats={[
                            { label: "Engines", value: "9x VORTEX-1" },
                            { label: "Thrust (SL)", value: "2,400 kN" },
                            { label: "Wing Span", value: "12.0 m" }, 
                            { label: "Propellant", value: "LCH4 / LOX" }, 
                        ]}
                     />
                 )}

                {activeStage === "stage2" && (
                     <StageDetails 
                        key="s2"
                        title="Stage 2: Vacuum Insertion"
                        desc="A specialized vacuum-optimized upper stage. It sits atop the booster and ignites after stage separation to push the payload into its final orbital velocity."
                        stats={[
                            { label: "Engine", value: "1x VORTEX-Vac" },
                            { label: "Thrust (Vac)", value: "110 kN" },
                            { label: "Specific Impulse", value: "375 s" },
                            { label: "Restart Capability", value: "Multi-Ignition" }
                        ]}
                     />
                 )}

                {activeStage === "fairing" && (
                     <StageDetails 
                        key="fairing"
                        title="Payload Fairing"
                        desc="Aerodynamic nose cone protecting sensitive satellite payloads during atmospheric ascent. Splits into two halves once in space using non-explosive actuators."
                        stats={[
                            { label: "Diameter", value: "2.8 m" }, 
                            { label: "Height", value: "4.0 m" },
                            { label: "Volume", value: "18.5 m³" },
                            { label: "Material", value: "Carbon Composite" }
                        ]}
                     />
                 )}
             </AnimatePresence>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-black border border-white/10 rounded-2xl overflow-hidden">
                 <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center gap-2">
                     <Ruler size={14} className="text-cyan-400" />
                     <span className="text-xs font-bold uppercase tracking-widest text-white/70">Dimensions</span>
                 </div>
                 <div className="grid grid-cols-2 divide-x divide-white/10">
                    <StatBox label="Height" value="24.0 m" sub="78.7 ft" /> 
                    <StatBox label="Diameter" value="2.8 m" sub="9.2 ft" />
                 </div>
             </div>

             <div className="bg-black border border-white/10 rounded-2xl overflow-hidden">
                 <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center gap-2">
                     <Weight size={14} className="text-cyan-400" />
                     <span className="text-xs font-bold uppercase tracking-widest text-white/70">Performance</span>
                 </div>
                 <div className="grid grid-cols-2 divide-x divide-white/10">
                    <StatBox label="LEO Payload" value="850 kg" sub="1,873 lb" /> 
                    <StatBox label="SSO Payload" value="600 kg" sub="1,322 lb" />
                 </div>
             </div>

             <div className="bg-black border border-white/10 rounded-2xl overflow-hidden md:col-span-2">
                 <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center gap-2">
                     <Activity size={14} className="text-cyan-400" />
                     <span className="text-xs font-bold uppercase tracking-widest text-white/70">Economics</span>
                 </div>
                 <div className="grid grid-cols-2 divide-x divide-white/10">
                    <StatBox label="Launch Cost" value="$5.2M" sub="Dedicated" /> 
                    <StatBox label="Turnaround" value="14 Days" sub="Goal: 24h" />
                 </div>
             </div>
          </div>

        </div>

      </div>
    </PageLayout>
  );
}

// --- SUB-COMPONENTS ---

function StageDetails({ title, desc, stats }: any) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-6 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
                <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
            </div>
            
            <p className="text-white/60 mb-8 max-w-xl text-sm leading-relaxed border-l border-white/10 pl-4">
                {desc}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((s: any, i: number) => (
                    <div key={i} className="group/stat">
                        <p className="text-[9px] text-cyan-400 uppercase font-bold tracking-widest mb-1 opacity-70 group-hover/stat:opacity-100 transition-opacity">
                            {s.label}
                        </p>
                        <p className="text-white font-mono font-bold text-base border-b border-white/10 pb-1 group-hover/stat:border-cyan-500/50 transition-colors">
                            {s.value}
                        </p>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

function StatBox({ label, value, sub }: { label: string, value: string, sub: string }) {
    return (
        <div className="p-5 text-center hover:bg-white/5 transition duration-300 group">
            <p className="text-[9px] text-white/40 uppercase font-bold mb-2 tracking-widest group-hover:text-cyan-400/70 transition-colors">{label}</p>
            <p className="text-xl font-bold text-white font-mono">{value}</p>
            <p className="text-[10px] text-white/20 font-mono mt-1">{sub}</p>
        </div>
    )
}