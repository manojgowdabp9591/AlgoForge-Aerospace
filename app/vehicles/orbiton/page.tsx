"use client";

import PageLayout from "@/app/components/PageLayout";
import { motion } from "framer-motion";
import { label } from "framer-motion/client";
import { Rocket, Box, Wind, Zap } from "lucide-react";
import { useState } from "react";

export default function OrbitonPage() {
  const [activeStage, setActiveStage] = useState<"fairing" | "stage2" | "stage1">("stage1");

  // Helper for blueprint stroke styles
  const strokeColor = (isActive: boolean) => isActive ? "#22d3ee" : "rgba(59,130,246,0.5)";
  const strokeWidth = (isActive: boolean) => isActive ? 3 : 1.5;
  const filter = (isActive: boolean) => isActive ? "drop-shadow(0 0 8px rgba(34,211,238,0.6))" : "none";
  const opacity = (isActive: boolean) => isActive ? 1 : 0.7;

  return (
    <PageLayout
      title="Vehicle: ORBITON-1"
      subtitle="A rapid-response, reusable micro-launcher for the small satellite market."
    >
      <div className="grid lg:grid-cols-12 gap-10 mt-10 items-start">
        
        {/* LEFT COLUMN: PURE CODE BLUEPRINT */}
        <div className="lg:col-span-5 relative h-[700px] bg-blue-950/20 border border-blue-500/30 rounded-3xl overflow-hidden backdrop-blur-sm flex items-center justify-center group select-none">
            
            {/* CSS Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            {/* Scale Markers */}
            <div className="absolute top-10 left-4 bottom-10 border-l border-blue-500/30 border-dashed flex flex-col justify-between text-[10px] text-blue-400 font-mono py-2">
                <span>24m</span>
                <span>12m</span>
                <span>0m</span>
            </div>

            {/* ================= PURE SVG ROCKET ================= */}
            <svg viewBox="0 0 500 800" className="w-full h-full p-8 z-10">
                <defs>
                  {/* Pattern for internal tech details */}
                  <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(34,211,238,0.1)" strokeWidth="0.5"/>
                  </pattern>
                </defs>

                {/* --- GROUP 1: STAGE 1 (WINGS & BOOSTERS & ENGINES) --- */}
                <motion.g 
                  onClick={() => setActiveStage("stage1")}
                  className="cursor-pointer transition-all duration-300"
                  initial={false}
                  animate={{ 
                    stroke: strokeColor(activeStage === "stage1"),
                    strokeWidth: strokeWidth(activeStage === "stage1"),
                    filter: filter(activeStage === "stage1"),
                    opacity: opacity(activeStage === "stage1")
                  }}
                  fill="transparent"
                >
                    {/* Left Wing */}
                    <path d="M190 300 L140 450 L140 580 L190 580 Z" fill="url(#grid-pattern)" />
                    <path d="M140 450 L50 600 L140 600 C140 600 160 620 190 640" /> 
                    
                    {/* Right Wing */}
                    <path d="M310 300 L360 450 L360 580 L310 580 Z" fill="url(#grid-pattern)" />
                    <path d="M360 450 L450 600 L360 600 C360 600 340 620 310 640" />

                    {/* Left Booster */}
                    <path d="M190 280 C190 260 200 240 210 240 L210 600 C200 600 190 590 190 580 Z" />
                    <line x1="190" y1="320" x2="210" y2="320" />
                    
                    {/* Right Booster */}
                    <path d="M310 280 C310 260 300 240 290 240 L290 600 C300 600 310 590 310 580 Z" />
                    <line x1="310" y1="320" x2="290" y2="320" />

                    {/* Main Engines */}
                    <path d="M220 660 L230 700 L270 700 L280 660" /> {/* Center */}
                    <path d="M190 640 L195 680 L215 680 L220 640" /> {/* Left */}
                    <path d="M280 640 L285 680 L305 680 L310 640" /> {/* Right */}
                </motion.g>

                {/* --- GROUP 2: STAGE 2 (CENTRAL CORE) --- */}
                <motion.g 
                  onClick={() => setActiveStage("stage2")}
                  className="cursor-pointer"
                  initial={false}
                  animate={{ 
                    stroke: strokeColor(activeStage === "stage2"),
                    strokeWidth: strokeWidth(activeStage === "stage2"),
                    filter: filter(activeStage === "stage2"),
                    opacity: opacity(activeStage === "stage2")
                  }}
                  fill="transparent"
                >
                    {/* Main Fuselage Body */}
                    <path d="M210 200 L210 660 L290 660 L290 200" />
                    
                    {/* Center Spine Detail */}
                    <path d="M235 300 L235 550 C235 580 220 620 210 640" strokeDasharray="4 2" />
                    <path d="M265 300 L265 550 C265 580 280 620 290 640" strokeDasharray="4 2" />
                    
                    {/* Interstage Ring */}
                    <line x1="210" y1="200" x2="290" y2="200" />
                    <line x1="210" y1="210" x2="290" y2="210" />
                </motion.g>

                {/* --- GROUP 3: FAIRING (NOSE CONE) --- */}
                <motion.g 
                  onClick={() => setActiveStage("fairing")}
                  className="cursor-pointer"
                  initial={false}
                  animate={{ 
                    stroke: strokeColor(activeStage === "fairing"),
                    strokeWidth: strokeWidth(activeStage === "fairing"),
                    filter: filter(activeStage === "fairing"),
                    opacity: opacity(activeStage === "fairing")
                  }}
                  fill="transparent"
                >
                   {/* Nose Cone */}
                   <path d="M210 200 C210 100 250 50 250 50 C250 50 290 100 290 200 Z" />
                   
                   {/* Detail Lines */}
                   <path d="M210 150 C230 140 270 140 290 150" />
                   <line x1="250" y1="50" x2="250" y2="200" strokeDasharray="5 5" opacity="0.5"/>
                </motion.g>
                
                {/* Decorative Text */}
                <text x="380" y="500" fill="rgba(59,130,246,0.4)" fontSize="10" className="font-mono tracking-widest rotate-90">WING STRUCT</text>
                <text x="245" y="400" fill="rgba(59,130,246,0.4)" fontSize="8" className="font-mono tracking-tighter -rotate-90">CORE</text>

            </svg>
        </div>

        {/* RIGHT COLUMN: SPECS (Unchanged functionality) */}
        <div className="lg:col-span-7 space-y-8">
          
          <div>
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
               <Rocket className="text-cyan-400" />
               ORBITON-1
            </h2>
            <p className="text-white/70 text-lg leading-relaxed font-light">
              The Orbiton-1 is a SmallSat Launch Vehicle (SSLV) designed to solve the "last mile" problem of orbit delivery. 
              By utilizing a <strong>Lifting Body</strong> first stage and <strong>Methalox</strong> propulsion, 
              we achieve reusability without the mass penalty of heavy landing propellant.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl min-h-[250px] relative overflow-hidden transition-all duration-500">
             
             <div className="absolute -right-10 -bottom-10 opacity-10 text-white transition-all duration-500">
                {activeStage === "fairing" && <Box size={200} />}
                {activeStage === "stage2" && <Zap size={200} />}
                {activeStage === "stage1" && <Wind size={200} />}
             </div>

             {activeStage === "stage1" && (
                 <StageDetails 
                    title="Stage 1: Lifting Body Booster"
                    desc="A reusable lifting-body stage powered by 12x VORTEX-1 RDE engines. The cranked-arrow wings provide aerodynamic lift during reentry, reducing fuel needs."
                    stats={[
                        { label: "Engines", value: "12x VORTEX-1" },
                        { label: "Thrust", value: "210 kN each" },
                        { label: "Burn Time", value: "180 s" }, 
                    ]}
                 />
             )}

            {activeStage === "stage2" && (
                 <StageDetails 
                    title="Stage 2: Core Fuselage"
                    desc="The central core acts as the orbital insertion stage, carrying the propellant load for the final push to LEO."
                    stats={[
                        { label: "Engine", value: "3x VORTEX-Vac" },
                        { label: "Thrust", value: "80 kN each" },
                        { label: "Burn Time", value: "320 s" }
                    ]}
                 />
             )}

            {activeStage === "fairing" && (
                 <StageDetails 
                    title="Payload Fairing"
                    desc="Aerodynamic nose cone protecting sensitive satellite payloads during atmospheric ascent."
                    stats={[
                        { label: "Diameter", value: "2.2 m" }, 
                        { label: "Volume", value: "14 m³" },
                        { label: "Material", value: "Carbon Fiber composites" }
                    ]}
                 />
             )}
          </div>

          {/* REALISTIC SPECS TABLE */}
          <div className="bg-black/30 border border-white/10 rounded-xl overflow-hidden">
             <div className="grid grid-cols-2 md:grid-cols-2 divide-x divide-white/10 border-b border-white/10">
                <StatBox label="Height" value="24.0 m / 78.7 ft" /> 
                <StatBox label="Diameter" value="2.2 m / 7.2 ft" />
             </div>
             <div className="grid grid-cols-2 md:grid-cols-2 divide-x divide-white/10 border-b border-white/10">
                <StatBox label="Payload to LEO" value="600 kg / 1323 lb" /> 
                <StatBox label="Payload to SSO" value="450 kg / 992 lb" />
             </div>
             <div className="grid grid-cols-2 md:grid-cols-2 divide-x divide-white/10">
                <StatBox label="Launch Cost" value="$4.5 Million" /> 
                <StatBox label="Gross Mass" value="38,000 kg" />
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
            className="relative z-10"
        >
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/60 mb-6 max-w-lg">{desc}</p>
            
            <div className="grid grid-cols-3 gap-6">
                {stats.map((s: any, i: number) => (
                    <div key={i}>
                        <p className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider mb-1">{s.label}</p>
                        <p className="text-white font-mono font-bold text-lg">{s.value}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

function StatBox({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-6 text-center hover:bg-white/5 transition">
            <p className="text-[10px] text-white/40 uppercase font-bold mb-2 tracking-widest">{label}</p>
            <p className="text-xl font-bold text-white font-mono text-cyan-400/90 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">{value}</p>
        </div>
    )
}