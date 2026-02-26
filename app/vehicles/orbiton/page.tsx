"use client";

import PageLayout from "@/app/components/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Box, Wind, Zap, Activity, Ruler, Weight, Layers } from "lucide-react";
import { useState } from "react";

const VEHICLE_DATA = {
  medium: {
    id: "AF-33",
    name: "ALGOFORGE MEDIUM",
    desc: "A 33.5m medium-lift launch vehicle utilizing generative structures and a high-density 9-engine propulsion cluster for rapid orbital access.",
    height: "33.5 m",
    diameter: "2.5 m",
    leo: "1,500 kg",
    sso: "850 kg",
    cost: "$12.5M",
    turnaround: "7 Days",
    markers: [
      { label: "33.5m // NOSE TIP", top: "10%" },
      { label: "28.5m // PAYLOAD", top: "30%" },
      { label: "22.5m // INTERSTAGE", top: "50%" },
      { label: "00.0m // GROUND", top: "90%" }
    ],
    stage1: {
      title: "Stage 1: Monolithic Core",
      desc: "Constructed with DMLS-printed orthogrid skins and powered by a dense 9-engine cluster (6 outer, 3 center) for high thrust-to-weight.",
      stats: [
        { label: "Engines", value: "9x VORTEX-1" },
        { label: "Length", value: "20.0 m" },
        { label: "Aerocontrols", value: "4x Titanium Fins" },
        { label: "Propellant", value: "LCH4 / LOX" },
      ]
    },
    stage2: {
      title: "Stage 2: Vacuum Insertion",
      desc: "A highly efficient upper stage featuring a generative common-dome tank architecture to reduce weight.",
      stats: [
        { label: "Engine", value: "1x VORTEX-Vac" },
        { label: "Length", value: "6.0 m" },
        { label: "Specific Impulse", value: "372 s" },
        { label: "Restart", value: "Multi-Ignition" }
      ]
    },
    fairing: {
      title: "Payload Fairing",
      desc: "Aerodynamic nose cone protecting sensitive satellite payloads. Features a standard Von Kármán profile.",
      stats: [
        { label: "Diameter", value: "2.5 m" },
        { label: "Height", value: "5.0 m" },
        { label: "Material", value: "Carbon Fiber" },
        { label: "Separation", value: "Pneumatic" }
      ]
    }
  },
  heavy: {
    id: "AF-60",
    name: "ALGOFORGE HEAVY v2",
    desc: "Our flagship 60m heavy-lift architecture. Features a 15-engine monolithic cluster, conformal legs, and algorithmic cooling lattices.",
    height: "60.0 m",
    diameter: "4.0 m",
    leo: "16,500 kg",
    sso: "12,000 kg",  
    cost: "$45.0M",
    turnaround: "10 Days",
    markers: [
      { label: "60.0m // NOSE TIP", top: "5%" },
      { label: "48.0m // PAYLOAD", top: "25%" },
      { label: "38.0m // INTERSTAGE", top: "45%" },
      { label: "00.0m // GROUND", top: "90%" }
    ],
    stage1: {
      title: "Stage 1: Heavy Booster",
      desc: "Houses a densely packed 15-engine cluster (3 center, 12 outer), conformal aerodynamic landing shields, and honeycomb grid fins.",
      stats: [
        { label: "Engines", value: "15x VORTEX-1" },
        { label: "Length", value: "35.0 m" },
        { label: "Aerocontrols", value: "4x Titanium Fins" },
        { label: "Landing", value: "Conformal Legs" },
      ]
    },
    stage2: {
      title: "Stage 2: Heavy Vacuum",
      desc: "Powered by a 3-engine vacuum cluster, allowing for massive payload deployments and complex orbital maneuvers.",
      stats: [
        { label: "Engines", value: "3x VORTEX-Vac" },
        { label: "Length", value: "10.0 m" },
        { label: "Specific Impulse", value: "378 s" },
        { label: "Restart", value: "Multi-Ignition" }
      ]
    },
    fairing: {
      title: "Biconic Payload Fairing",
      desc: "Oversized 4.5m wide biconic fairing capable of housing massive satellite constellations or deep-space probes.",
      stats: [
        { label: "Max Diameter", value: "4.5 m" },
        { label: "Height", value: "12.0 m" },
        { label: "Coating", value: "Thermal Ceramic" },
        { label: "Separation", value: "Pneumatic" }
      ]
    }
  }
};

export default function AlgoForgeVehicles() {
  const [activeStage, setActiveStage] = useState<"fairing" | "stage2" | "stage1">("stage1");
  const [vehicleType, setVehicleType] = useState<"medium" | "heavy">("heavy");
  
  const currentData = VEHICLE_DATA[vehicleType];

  const strokeColor = (isActive: boolean) => isActive ? "#00ffff" : "rgba(255,255,255,0.2)";
  const strokeWidth = (isActive: boolean) => isActive ? 2 : 1.5;
  const filter = (isActive: boolean) => isActive ? "drop-shadow(0 0 12px rgba(0,255,255,0.6))" : "none";
  const fill = (isActive: boolean) => isActive ? "rgba(0,255,255,0.08)" : "transparent";

  return (
    <PageLayout
      title={`Vehicle: ${currentData.id}`}
      subtitle="Computational Propulsion & Generative Manufacturing"
    >
      <div className="grid lg:grid-cols-12 gap-8 mt-10 items-start">
        
        {/* LEFT COLUMN: BLUEPRINT VISUALIZER */}
        <div className="lg:col-span-5 relative h-[750px] bg-[#050505] border border-white/10 rounded-3xl overflow-hidden flex items-center justify-center group select-none shadow-2xl">
            
            <div className="absolute top-6 right-6 z-30 flex bg-white/5 border border-white/10 p-1 rounded-lg backdrop-blur-md">
                <button 
                  onClick={() => setVehicleType("medium")}
                  className={`px-4 py-1.5 text-xs font-mono font-bold tracking-widest rounded-md transition-all ${vehicleType === "medium" ? "bg-cyan-500 text-black" : "text-white/50 hover:text-white"}`}
                >
                  AF-33
                </button>
                <button 
                  onClick={() => setVehicleType("heavy")}
                  className={`px-4 py-1.5 text-xs font-mono font-bold tracking-widest rounded-md transition-all ${vehicleType === "heavy" ? "bg-cyan-500 text-black" : "text-white/50 hover:text-white"}`}
                >
                  AF-60
                </button>
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.03),transparent_70%)]" />
            
            <div className="absolute top-0 left-6 bottom-0 border-l border-white/10 flex flex-col w-full text-[9px] text-white/30 font-mono pointer-events-none">
                {currentData.markers.map((marker, i) => (
                    <div key={i} className="absolute w-full transition-all duration-500" style={{ top: marker.top }}>
                        <span className="absolute -top-2 -left-1 text-cyan-500">—</span>
                        <span className="pl-3">{marker.label}</span>
                        <div className="absolute top-0 left-0 w-full border-t border-dashed border-white/5" />
                    </div>
                ))}
            </div>

            <svg viewBox="0 0 500 800" className={`w-full h-full p-12 z-10 drop-shadow-2xl transition-transform duration-700 ${vehicleType === "medium" ? "scale-90" : "scale-100"}`}>
                <defs>
                  <pattern id="grid-pattern" width="6" height="6" patternUnits="userSpaceOnUse">
                    <path d="M 6 0 L 0 0 0 6" fill="none" stroke="rgba(0,255,255,0.15)" strokeWidth="0.5"/>
                  </pattern>
                  <pattern id="lattice-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 0 8 L 8 0 M 0 0 L 8 8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
                  </pattern>
                </defs>

                {/* --- STAGE 1 (BOOSTER) --- */}
                <motion.g 
                  onClick={() => setActiveStage("stage1")}
                  className="cursor-pointer transition-all duration-500"
                  initial={false}
                  animate={{ stroke: strokeColor(activeStage === "stage1"), strokeWidth: strokeWidth(activeStage === "stage1"), filter: filter(activeStage === "stage1"), fill: fill(activeStage === "stage1") }}
                >
                    <path d="M210 380 L210 690 L290 690 L290 380 Z" fill="url(#grid-pattern)" />
                    <path d="M210 380 Q250 365 290 380" fill="none" strokeDasharray="3 3" opacity="0.5" />
                    <path d="M210 520 Q250 505 290 520" fill="none" strokeDasharray="3 3" opacity="0.5" />
                    <path d="M210 680 Q250 695 290 680" fill="none" strokeDasharray="3 3" opacity="0.5" />
                    <line x1="250" y1="380" x2="250" y2="690" strokeDasharray="4 4" stroke="rgba(255,255,255,0.1)"/>
                    <rect x="286" y="390" width="3" height="290" fill="rgba(255,255,255,0.2)" stroke="none" />
                    <path d="M207 580 L195 680 L207 680 Z" fill="rgba(255,255,255,0.1)" stroke="none" />
                    <path d="M293 580 L305 680 L293 680 Z" fill="rgba(255,255,255,0.1)" stroke="none" />
                    <rect x="198" y="390" width="12" height="40" fill="transparent" />
                    <rect x="290" y="390" width="12" height="40" fill="transparent" />
                    <line x1="198" y1="410" x2="210" y2="410" />
                    <line x1="290" y1="410" x2="302" y2="410" />

                    <path d="M210 690 L215 705 L285 705 L290 690 Z" fill="rgba(255,255,255,0.1)" />
                    
                    {vehicleType === "heavy" ? (
                      <g>
                        <path d="M220 705 L215 735 L225 735 L225 705 Z" fill="black" />
                        <path d="M235 705 L230 735 L240 735 L240 705 Z" fill="black" />
                        <path d="M250 705 L245 740 L255 740 L250 705 Z" fill="black" />
                        <path d="M265 705 L260 735 L270 735 L270 705 Z" fill="black" />
                        <path d="M280 705 L275 735 L285 735 L280 705 Z" fill="black" />
                      </g>
                    ) : (
                      <g>
                        <path d="M225 705 L220 735 L232 735 L230 705 Z" fill="black" />
                        <path d="M240 705 L235 735 L247 735 L245 705 Z" fill="black" /> 
                        <path d="M255 705 L250 735 L262 735 L260 705 Z" fill="black" /> 
                        <path d="M270 705 L265 735 L277 735 L275 705 Z" fill="black" />
                      </g>
                    )}
                </motion.g>

                {/* --- INTERSTAGE & STAGE 2 --- */}
                <motion.g 
                  onClick={() => setActiveStage("stage2")}
                  className="cursor-pointer"
                  initial={false}
                  animate={{ stroke: strokeColor(activeStage === "stage2"), strokeWidth: strokeWidth(activeStage === "stage2"), filter: filter(activeStage === "stage2"), fill: fill(activeStage === "stage2") }}
                >
                    <rect x="210" y="340" width="80" height="40" fill="url(#lattice-pattern)" />
                    <rect x="210" y="220" width="80" height="120" fill="url(#grid-pattern)" />
                    <path d="M210 220 Q250 205 290 220" fill="none" strokeDasharray="3 3" opacity="0.5" />
                    <path d="M210 280 Q250 265 290 280" fill="none" strokeDasharray="3 3" opacity="0.5" />
                    <path d="M210 330 Q250 345 290 330" fill="none" strokeDasharray="3 3" opacity="0.5" />
                    <line x1="210" y1="340" x2="290" y2="340" />
                    <line x1="210" y1="220" x2="290" y2="220" />
                    <path d="M240 340 L230 375 L270 375 L260 340 Z" fill="rgba(255,255,255,0.05)" strokeDasharray="2 2" />
                </motion.g>

                {/* --- FAIRING --- */}
                <motion.g 
                  onClick={() => setActiveStage("fairing")}
                  className="cursor-pointer"
                  initial={false}
                  animate={{ stroke: strokeColor(activeStage === "fairing"), strokeWidth: strokeWidth(activeStage === "fairing"), filter: filter(activeStage === "fairing"), fill: fill(activeStage === "fairing") }}
                >
                    <path d="M220 210 L220 150 L235 90 L265 90 L280 150 L280 210" fill="none" stroke="rgba(0,255,255,0.3)" strokeDasharray="4 4" strokeWidth="1" />
                    
                    {/* ULTRA-SHARP NOSE CONE */}
                    <path d="M210 220 L205 160 C205 80 240 15 250 15 C260 15 295 80 295 160 L290 220 Z" fill="url(#grid-pattern)" />
                    <path d="M250 15 L250 220" strokeDasharray="2 2" stroke="rgba(255,255,255,0.1)" />
                </motion.g>
                
                {/* Schematic Labels */}
                <text x="320" y="550" fill="rgba(255,255,255,0.2)" fontSize="10" className="font-mono tracking-widest rotate-90">STAGE_01</text>
                <text x="310" y="280" fill="rgba(255,255,255,0.2)" fontSize="10" className="font-mono tracking-widest">STAGE_02</text>

            </svg>
            
            <div className="absolute bottom-6 text-[10px] text-white/30 uppercase tracking-widest font-mono border border-white/10 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md">
                Interactive Schematic // Select Component
            </div>
        </div>

        {/* RIGHT COLUMN: SPECS & DETAILS */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="relative">
            <h2 className="text-4xl font-bold text-cyan-400 mb-4 flex items-center gap-3 tracking-tight">
               <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                 <Rocket className="text-cyan-400" size={24} />
               </div>
               {currentData.name}
            </h2>
            <p className="text-white/60 text-lg leading-relaxed font-light min-h-[80px]">
              {currentData.desc}
            </p>
          </div>

          {/* DYNAMIC DETAIL CARD */}
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl min-h-[280px] relative overflow-hidden transition-all duration-500 hover:bg-white/[0.04] group">
             
             <div className="absolute -right-8 -bottom-8 opacity-[0.03] text-white transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.05]">
                {activeStage === "fairing" && <Box size={240} />}
                {activeStage === "stage2" && <Layers size={240} />}
                {activeStage === "stage1" && <Zap size={240} />}
             </div>

             <AnimatePresence mode="wait">
                 {activeStage === "stage1" && (
                     <StageDetails 
                        key={`s1-${vehicleType}`}
                        title={currentData.stage1.title}
                        desc={currentData.stage1.desc}
                        stats={currentData.stage1.stats}
                     />
                 )}
                {activeStage === "stage2" && (
                     <StageDetails 
                        key={`s2-${vehicleType}`}
                        title={currentData.stage2.title}
                        desc={currentData.stage2.desc}
                        stats={currentData.stage2.stats}
                     />
                 )}
                {activeStage === "fairing" && (
                     <StageDetails 
                        key={`f-${vehicleType}`}
                        title={currentData.fairing.title}
                        desc={currentData.fairing.desc}
                        stats={currentData.fairing.stats}
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
                    <StatBox label="Total Height" value={currentData.height} /> 
                    <StatBox label="Core Diameter" value={currentData.diameter} />
                 </div>
             </div>

             <div className="bg-black border border-white/10 rounded-2xl overflow-hidden">
                 <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center gap-2">
                     <Weight size={14} className="text-cyan-400" />
                     <span className="text-xs font-bold uppercase tracking-widest text-white/70">Reusable Payload</span>
                 </div>
                 <div className="grid grid-cols-2 divide-x divide-white/10">
                    <StatBox label="LEO Capacity" value={currentData.leo} /> 
                    <StatBox label="SSO Capacity" value={currentData.sso} />
                 </div>
             </div>

             <div className="bg-black border border-white/10 rounded-2xl overflow-hidden md:col-span-2">
                 <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center gap-2">
                     <Activity size={14} className="text-cyan-400" />
                     <span className="text-xs font-bold uppercase tracking-widest text-white/70">Economics</span>
                 </div>
                 <div className="grid grid-cols-2 divide-x divide-white/10">
                    <StatBox label="Target Cost" value={currentData.cost} /> 
                    <StatBox label="Turnaround" value={currentData.turnaround} />
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
                <div className="w-1.5 h-6 bg-cyan-400 rounded-full shadow-[0_0_10px_#00ffff]" />
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

function StatBox({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-5 text-center hover:bg-white/5 transition duration-300 group">
            <p className="text-[9px] text-white/40 uppercase font-bold mb-2 tracking-widest group-hover:text-cyan-400/70 transition-colors">{label}</p>
            <p className="text-xl font-bold text-white font-mono">{value}</p>
        </div>
    )
}