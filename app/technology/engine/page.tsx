"use client";

import PageLayout from "@/app/components/PageLayout";
import { motion } from "framer-motion";
import { Zap, Wind, Flame, Timer, Activity, Gauge, Cpu } from "lucide-react";

export default function EnginePage() {
  return (
    <PageLayout
      title="Technology: VORTEX-1"
      subtitle="The world's first reusable Rotary Detonation Engine (RDE)."
    >
      <div className="grid lg:grid-cols-12 gap-10 mt-10 items-start">
        
        {/* LEFT COLUMN: HOLOGRAPHIC ENGINE SIMULATION */}
        <div className="lg:col-span-6 relative h-[600px] flex items-center justify-center bg-black border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm group shadow-2xl">
            
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent_70%)]" />
            
            {/* INTERACTIVE ENGINE CORE */}
            <RDEVisualizer />

            {/* HUD Overlay */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-[ping_1.5s_infinite]"></div>
                    <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest bg-red-950/30 px-2 py-0.5 rounded border border-red-500/30">
                        Live Test Stand
                    </span>
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tighter mb-1">VORTEX-1</h3>
                <div className="text-[10px] text-white/40 font-mono flex flex-col gap-1">
                    <span>RPM: <span className="text-cyan-400">24,000</span></span>
                    <span>CHAMBER: <span className="text-cyan-400">300 BAR</span></span>
                    <span>TEMP: <span className="text-orange-400">3,400 K</span></span>
                </div>
            </div>

            <div className="absolute bottom-6 right-6 text-right z-10 pointer-events-none">
                 <p className="text-[9px] text-white/30 uppercase tracking-widest mb-1 font-mono">Combustion Mode</p>
                 <p className="text-xl font-mono text-cyan-400 font-bold animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                    CONTINUOUS DETONATION
                 </p>
            </div>
            
            {/* Decorative Corner Lines */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-white/20 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-white/20 rounded-bl-3xl" />
        </div>

        {/* RIGHT COLUMN: TECH SPECS & NARRATIVE */}
        <div className="lg:col-span-6 space-y-10">
          
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Stop Burning. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Start Detonating.</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-transparent mb-6" />
            <p className="text-white/70 text-lg leading-relaxed font-light">
              Conventional rocket engines burn fuel at constant pressure (Deflagration). 
              The <strong className="text-white font-medium">VORTEX-1</strong> utilizes <strong className="text-white font-medium">Rotary Detonation (RDE)</strong> physics. 
              Instead of a steady flame, supersonic shockwaves spin around the annular chamber at <span className="text-cyan-400 font-mono">2,000 m/s</span>, 
              compressing the mixture before ignition to extract maximum energy.
            </p>
          </div>

          {/* KEY ADVANTAGES */}
          <div className="grid grid-cols-2 gap-4">
             <AdvantageCard 
                icon={Zap} 
                title="15-20% More Thrust" 
                desc="Pressure gain combustion extracts more energy from every gram of fuel compared to standard cycles." 
             />
             <AdvantageCard 
                icon={Wind} 
                title="Shockwave Exhaust" 
                desc="Exhaust isn't a steady flame; it's a pulsing diamond-shockwave ring optimized for altitude compensation." 
             />
             <AdvantageCard 
                icon={Flame} 
                title="Methalox Fuel" 
                desc="Liquid Methane + Oxygen. Clean burning, non-coking, perfect for rapid reuse and Mars compatibility." 
             />
             <AdvantageCard 
                icon={Timer} 
                title="Rapid Response" 
                desc="Self-pressurizing detonation wave allows for instant startup and deep throttling capabilities." 
             />
          </div>

          {/* ENGINE SPECS TABLE */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.04] transition-colors duration-500">
             <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                 <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                    <Cpu size={14} /> Classified Spec Sheet
                 </h4>
                 <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/40 font-mono">VER 1.4.2</span>
             </div>
             
             <div className="space-y-4 font-mono text-sm">
                <SpecRow label="Cycle" value="Pressure-Gain Rotary Detonation" icon={Activity} />
                <SpecRow label="Thrust (Sea Level)" value="scaling each upto 2400 kN" icon={Gauge} />
                <SpecRow label="Specific Impulse (ISP)" value="345 sec" icon={Wind} />
                <SpecRow label="Propellant" value="LCH4 / LOX" icon={Flame} />
                <SpecRow label="Chamber Pressure" value="upto 300 bar" icon={Gauge} />
             </div>
          </div>

        </div>

      </div>
    </PageLayout>
  );
}

// --- SUB-COMPONENTS ---

function RDEVisualizer() {
    return (
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            
            {/* CORE GLOW BACKGROUND */}
            <div className="absolute w-[80%] h-[80%] bg-cyan-500/5 blur-[80px] rounded-full animate-pulse"></div>

            <div className="relative w-80 h-80 flex items-center justify-center">
                
                {/* 1. OUTER CHAMBER RING (Static Reference) */}
                <div className="absolute inset-0 rounded-full border border-white/10 border-dashed opacity-50"></div>
                <div className="absolute inset-4 rounded-full border border-white/5"></div>

                {/* 2. THE DETONATION WAVE (Spinning Fast) */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full"
                >
                    {/* The Shockwave Front */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-gradient-to-b from-cyan-400 via-transparent to-transparent opacity-80 blur-md"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-1/2 bg-gradient-to-b from-white via-cyan-200 to-transparent rounded-full shadow-[0_0_30px_#22d3ee]"></div>
                </motion.div>

                {/* 3. HEAT SIGNATURE (Spinning Opposite/Slower) */}
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 rounded-full border-t-2 border-r-2 border-transparent border-t-blue-500/50 border-r-cyan-500/30 blur-sm"
                />

                {/* 4. INNER PLASMA CORE (Pulsing) */}
                <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 0.05, repeat: Infinity }}
                    className="absolute w-24 h-24 bg-gradient-to-br from-white via-cyan-400 to-blue-600 rounded-full blur-md flex items-center justify-center shadow-[0_0_80px_rgba(34,211,238,0.8)] z-10"
                >
                    <div className="w-10 h-10 bg-white rounded-full blur-lg"></div>
                </motion.div>
                
                {/* 5. NOZZLE GEOMETRY OVERLAY */}
                <div className="absolute inset-0 border border-white/10 rounded-full opacity-30 scale-125 pointer-events-none"></div>

            </div>
        </div>
    )
}

function AdvantageCard({ icon: Icon, title, desc }: any) {
    return (
        <div className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl hover:bg-white/[0.06] hover:border-cyan-500/30 transition-all duration-300 group/card">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-3 group-hover/card:bg-cyan-500/10 transition-colors">
                <Icon className="text-white/60 group-hover/card:text-cyan-400 transition-colors" size={20} />
            </div>
            <h4 className="text-white font-bold mb-2 text-sm group-hover/card:text-white transition-colors">{title}</h4>
            <p className="text-white/50 text-[11px] leading-relaxed group-hover/card:text-white/70 transition-colors">{desc}</p>
        </div>
    )
}

function SpecRow({ label, value, icon: Icon }: any) {
    return (
        <div className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0 group">
            <div className="flex items-center gap-3">
                {Icon && <Icon size={14} className="text-white/20 group-hover:text-cyan-400/50 transition-colors" />}
                <span className="text-white/50 text-xs font-light group-hover:text-white/80 transition-colors">{label}</span>
            </div>
            <span className="text-white font-bold text-sm text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.15)] font-mono">{value}</span>
        </div>
    )
}
