"use client";

import PageLayout from "@/app/components/PageLayout";
import { motion } from "framer-motion";
import { Rocket, Box, Wind, Zap } from "lucide-react";
import { useState } from "react";

export default function OrbitonPage() {
  const [activeStage, setActiveStage] = useState<"fairing" | "stage2" | "stage1">("stage1");

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
        
        {/* LEFT COLUMN: BLUEPRINT */}
        <div className="lg:col-span-5 relative h-[700px] bg-blue-950/20 border border-blue-500/30 rounded-3xl overflow-hidden backdrop-blur-sm flex items-center justify-center group select-none">
            
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            <div className="absolute top-4 left-4 bottom-10 border-l border-blue-500/30 border-dashed flex flex-col justify-between text-[10px] text-blue-400 font-mono py-2 h-[90%]">
                <div className="relative"><span className="absolute -top-2 -left-1">—</span><span className="pl-2">24m</span></div>
                <div>12m</div>
                <div>0m</div>
            </div>

            <svg viewBox="0 0 500 800" className="w-full h-full p-8 z-10">
                <defs>
                  <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(34,211,238,0.1)" strokeWidth="0.5"/>
                  </pattern>
                </defs>

                {/* --- GROUP 1: STAGE 1 (INCREASED SIZE) --- */}
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
                    {/* Main Body - WIDENED (Now 200 to 300) */}
                    <path d="M200 260 L200 700 L300 700 L300 260" fill="url(#grid-pattern)" />
                    <path d="M250 260 L250 700" strokeDasharray="10 5" opacity="0.5"/>

                    {/* Left Wing - MASSIVE INCREASE */}
                    {/* Starts higher (450) and goes wider (110) */}
                    <path d="M200 450 L110 600 L110 700 L200 700" fill="url(#grid-pattern)" />
                    {/* Wing Tip Extension */}
                    <path d="M110 600 L20 720 L110 720 C110 720 130 740 160 740" /> 
                    
                    {/* Right Wing - MASSIVE INCREASE */}
                    {/* Starts higher (450) and goes wider (390) */}
                    <path d="M300 450 L390 600 L390 700 L300 700" fill="url(#grid-pattern)" />
                    {/* Wing Tip Extension */}
                    <path d="M390 600 L480 720 L390 720 C390 720 370 740 340 740" />

                    {/* Legs adjusted for wider body */}
                    <path d="M200 550 C200 550 180 650 180 720" />
                    <path d="M300 550 C300 550 320 650 320 720" />

                    {/* Engines - Spread out for wider body */}
                    <path d="M230 700 L240 740 L260 740 L270 700" /> {/* Center */}
                    <path d="M180 700 L185 730 L210 730 L215 700" /> {/* Left Edge */}
                    <path d="M285 700 L290 730 L315 730 L320 700" /> {/* Right Edge */}
                    
                    <line x1="200" y1="260" x2="300" y2="260" strokeWidth="2" />
                </motion.g>

                {/* --- GROUP 2: STAGE 2 (WIDENED TO MATCH) --- */}
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
                    <rect x="200" y="160" width="100" height="100" />
                    <path d="M230 260 L240 280 L260 280 L270 260" strokeDasharray="2 2" opacity="0.6"/>
                    <ellipse cx="250" cy="210" rx="40" ry="10" opacity="0.3" />
                    <line x1="200" y1="160" x2="300" y2="160" strokeWidth="2"/>
                </motion.g>

                {/* --- GROUP 3: FAIRING (WIDENED TO MATCH) --- */}
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
                   {/* Widened base from 210/290 to 200/300 */}
                   <path d="M200 160 C200 100 250 40 250 40 C250 40 300 100 300 160 Z" />
                   <path d="M220 140 C230 130 270 130 280 140 L280 160 L220 160 Z" strokeDasharray="2 2" opacity="0.5"/>
                   <line x1="250" y1="40" x2="250" y2="160" opacity="0.3" />
                </motion.g>
                
                <text x="360" y="600" fill="rgba(59,130,246,0.4)" fontSize="10" className="font-mono tracking-widest rotate-90">HEAVY BOOST</text>
                <text x="320" y="210" fill="rgba(59,130,246,0.4)" fontSize="10" className="font-mono tracking-widest">STG-2</text>

            </svg>
        </div>

        {/* RIGHT COLUMN: SPECS */}
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
                    title="Stage 1: Heavy Lifting Body"
                    desc="Expanded wing surface area provides superior glide ratio during reentry. The widened core accommodates increased propellant load for higher delta-V."
                    stats={[
                        { label: "Engines", value: "9x VORTEX-1" },
                        { label: "Thrust", value: "2400 kN" }, // Increased thrust
                        { label: "Wing Span", value: "12 m" }, 
                    ]}
                 />
             )}

            {activeStage === "stage2" && (
                 <StageDetails 
                    title="Stage 2: Vacuum Insertion"
                    desc="A specialized vacuum-optimized upper stage. It sits atop the booster and ignites after stage separation to push the payload into its final orbital velocity."
                    stats={[
                        { label: "Engine", value: "1x VORTEX-Vac" },
                        { label: "Thrust", value: "110 kN" },
                        { label: "Restart", value: "Multi-Ignition" }
                    ]}
                 />
             )}

            {activeStage === "fairing" && (
                 <StageDetails 
                    title="Payload Fairing"
                    desc="Aerodynamic nose cone protecting sensitive satellite payloads during atmospheric ascent. Splits into two halves once in space."
                    stats={[
                        { label: "Diameter", value: "2.8 m" }, 
                        { label: "Height", value: "4.0 m" },
                        { label: "Material", value: "Carbon Composite" }
                    ]}
                 />
             )}
          </div>

          <div className="bg-black/30 border border-white/10 rounded-xl overflow-hidden">
             <div className="grid grid-cols-2 md:grid-cols-2 divide-x divide-white/10 border-b border-white/10">
                <StatBox label="Height" value="24.0 m / 78.7 ft" /> 
                <StatBox label="Diameter" value="2.8 m / 9.2 ft" />
             </div>
             <div className="grid grid-cols-2 md:grid-cols-2 divide-x divide-white/10 border-b border-white/10">
                <StatBox label="Payload to LEO" value="850 kg / 1873 lb" /> 
                <StatBox label="Payload to SSO" value="600 kg / 1322 lb" />
             </div>
             <div className="grid grid-cols-2 md:grid-cols-2 divide-x divide-white/10">
                <StatBox label="Launch Cost" value="$5.2 Million" /> 
                <StatBox label="Gross Mass" value="42,000 kg" />
             </div>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}

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