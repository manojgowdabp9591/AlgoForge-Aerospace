"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Maximize2 } from "lucide-react";

// Lazy load 3D model
const Rocket3D = dynamic(() => import("./Rocket3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-cyan-500 font-mono text-[10px] tracking-widest uppercase">
            Loading Geometry...
        </span>
    </div>
  ),
});

const VEHICLE_DATA = {
  medium: {
    name: "AF-33 Medium",
    desc: "A 33.5m medium-lift launch vehicle utilizing generative structures and a high-density 9-engine propulsion cluster for rapid orbital access.",
    specs: [
      { label: "Overall Height", value: "33.5 m", sub: "110.0 ft" },
      { label: "Core Diameter", value: "2.5 m", sub: "8.2 ft" },
      { label: "Stages", value: "Two-stage", sub: "Fully Reusable" },
      { label: "Payload to LEO", value: "1,200 kg", sub: "2,645 lb" },
      { label: "Payload to SSO", value: "850 kg", sub: "1,873 lb" },
      { label: "Thrust (SL)", value: "9,800 kN", sub: "9x VORTEX-1 Cluster" },
      { label: "Propellant", value: "LCH4 / LOX", sub: "Deep Cryo" },
    ]
  },
  heavy: {
    name: "AF-60 Heavy",
    desc: "Our flagship 60m heavy-lift vehicle engineered for large-scale orbital infrastructure and high-mass reusability.",
    specs: [
      { label: "Overall Height", value: "60.0 m", sub: "196.8 ft" },
      { label: "Core Diameter", value: "4.0 m", sub: "13.1 ft" },
      { label: "Stages", value: "Two-stage", sub: "Fully Reusable" },
      { label: "Payload to LEO", value: "16,500 kg", sub: "36,376 lb" },
      { label: "Payload to SSO", value: "12,000 kg", sub: "26,455 lb" },
      { label: "Thrust (SL)", value: "36,000 kN", sub: "15x VORTEX-1 Cluster" },
      { label: "Propellant", value: "LCH4 / LOX", sub: "Deep Cryo" },
    ]
  }
};

export default function TechSpec() {
  const [activeTab, setActiveTab] = useState<"medium" | "heavy">("heavy");
  const currentVehicle = VEHICLE_DATA[activeTab];

  return (
    <section className="min-h-screen flex items-center justify-center py-24 relative z-10 overflow-hidden bg-black/20">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* COLUMN 1: 3D VEHICLE VIEW */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative h-[600px] w-full flex items-center justify-center"
          >
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

            {/* 3D Model Container */}
            <div className="w-full h-full relative z-10 group">
                <Rocket3D />
                
                {/* Interaction Overlay */}
                <div className="absolute top-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Maximize2 className="text-white/20" size={24} />
                </div>
                
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 px-4 py-2 bg-black/60 border border-white/10 rounded-full backdrop-blur-md">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                        <span className="text-[10px] text-white/80 font-mono uppercase tracking-widest">
                            Interactive Model
                        </span>
                    </div>
                </div>
            </div>
          </motion.div>

          {/* COLUMN 2: TECHNICAL OVERVIEW */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="mb-10">
                {/* VEHICLE TOGGLE - Added to switch data without changing layout */}
                <div className="flex gap-4 mb-8">
                  <button 
                    onClick={() => setActiveTab("medium")}
                    className={`text-[10px] font-mono uppercase tracking-widest px-4 py-1 rounded-full border transition-all ${activeTab === 'medium' ? 'bg-cyan-500 border-cyan-500 text-black font-bold' : 'border-white/10 text-white/40 hover:text-white'}`}
                  >
                    AF-33
                  </button>
                  <button 
                    onClick={() => setActiveTab("heavy")}
                    className={`text-[10px] font-mono uppercase tracking-widest px-4 py-1 rounded-full border transition-all ${activeTab === 'heavy' ? 'bg-cyan-500 border-cyan-500 text-black font-bold' : 'border-white/10 text-white/40 hover:text-white'}`}
                  >
                    AF-60
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-[1px] bg-cyan-500" />
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
                        Core Architecture
                    </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                  {currentVehicle.name} <span className="text-white/20">Vehicle</span>
                </h2>

                <p className="text-white/60 text-lg leading-relaxed font-light max-w-xl">
                  {currentVehicle.desc} 
                  Combining a <span className="text-cyan-400 font-medium">conformal aerodynamic framework</span> with 
                  next-gen detonation propulsion to maximize payload fraction and minimize turnaround time.
                </p>
            </div>

            {/* ENHANCED SPEC TABLE */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentVehicle.specs.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/[0.04] transition-colors group last:border-0"
                    >
                      <span className="text-xs font-bold uppercase text-white/40 tracking-widest group-hover:text-cyan-400 transition-colors">
                        {spec.label}
                      </span>
                      <div className="text-right">
                          <span className="block text-lg font-mono text-white font-bold group-hover:text-cyan-400 transition-colors drop-shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                            {spec.value}
                          </span>
                          <span className="block text-[10px] text-white/20 font-mono group-hover:text-white/40 transition-colors">
                            {spec.sub}
                          </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Link href="/vehicles/orbiton" className="group inline-flex items-center gap-4">
                <div className="h-[50px] px-8 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full flex items-center gap-2 group-hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                  View Full Datasheet
                </div>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                    <ChevronRight className="text-white group-hover:text-cyan-400 transition-colors" size={20} />
                </div>
              </Link>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}