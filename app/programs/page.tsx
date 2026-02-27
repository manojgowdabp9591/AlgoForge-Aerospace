"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { Satellite, Rocket, Globe, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Divisions() {
  return (
    <div className="relative overflow-hidden bg-black selection:bg-cyan-500/30 selection:text-cyan-100">
      <Navbar />

      {/* BACKGROUND DECORATIONS */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />

      <section className="relative py-32 px-6 max-w-7xl mx-auto text-white">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
             <Zap size={14} className="text-cyan-400" />
             <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-300 uppercase">
                Unified Architecture
             </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            <span className="text-white">Multi-Mission</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Platform</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            AlgoForge Aerospace develops a unified family of reusable launch systems
            designed to support orbital missions today and advanced suborbital
            applications in the future.
          </p>
        </motion.div>

        {/* PROGRAM GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* 1. ORBITAL LAUNCH (B2B) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="relative group border border-white/10 rounded-3xl p-8 bg-white/[0.02] backdrop-blur-md hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all duration-500"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-transparent group-hover:ring-cyan-500/20 transition-all pointer-events-none" />

            <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-8 text-cyan-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner border border-white/5">
                <Satellite size={28} strokeWidth={1.5} />
            </div>
            
            <h2 className="text-2xl font-bold mb-4 text-white">
              Orbital Launch
            </h2>
            <div className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-6 group-hover:w-16 transition-all duration-300" />
            
            <p className="text-white/60 leading-relaxed mb-8 text-sm font-light min-h-[80px]">
              Orbital launch services form the core of our mission.
              Reusable vehicles engineered for responsive, cost-
              efficient deployment of payloads to Low Earth Orbit.
            </p>
            
            <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                <div className="text-[10px] uppercase tracking-widest text-white/30 font-mono">
                Status: Operational
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            </div>
          </motion.div>

          {/* 2. HUMAN SUBORBITAL (B2C) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="relative group border border-white/10 rounded-3xl p-8 bg-white/[0.02] backdrop-blur-md hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all duration-500"
          >
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-transparent group-hover:ring-cyan-500/20 transition-all pointer-events-none" />

            <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-8 text-cyan-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner border border-white/5">
                <Rocket size={28} strokeWidth={1.5} />
            </div>

            <h2 className="text-2xl font-bold mb-4 text-white">
              Human Spaceflight
            </h2>
            <div className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-6 group-hover:w-16 transition-all duration-300" />
            
            <p className="text-white/60 leading-relaxed mb-8 text-sm font-light min-h-[80px]">
              Derived directly from our orbital architecture. These flights validate 
              human-rated systems and operations, offering research and tourism opportunities.
            </p>
            
            <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                <div className="text-[10px] uppercase tracking-widest text-white/30 font-mono">
                Status: Validation
                </div>
                <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_#eab308]" />
            </div>
          </motion.div>

          {/* 3. POINT TO POINT (The Future) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="relative group border border-white/10 rounded-3xl p-8 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-md border-t-cyan-500/30 hover:border-cyan-500/60 transition-all duration-500"
          >
            <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 text-cyan-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-[0_0_30px_rgba(34,211,238,0.1)] border border-cyan-500/20">
                <Globe size={28} strokeWidth={1.5} />
            </div>

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">
                Earth-to-Earth
                </h2>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-cyan-500/20 text-cyan-300 tracking-wider border border-cyan-500/20">
                    Future
                </span>
            </div>
            
            <div className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-6 group-hover:w-16 transition-all duration-300" />
            
            <p className="text-white/60 leading-relaxed mb-8 text-sm font-light min-h-[80px]">
              The long-term application of mature, human-rated systems. 
              Time-critical global transport using hypersonic suborbital trajectories.
            </p>

            {/* LINK */}
            <div className="mt-auto pt-6 border-t border-white/5">
                <Link
                href="/programs/point-to-point"
                className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors group/link"
                >
                Explore Concept
                <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                </Link>
            </div>
          </motion.div>

        </div>

        {/* FOOTNOTE */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 max-w-3xl mx-auto text-center border-t border-white/5 pt-8"
        >
          <p className="text-white/30 text-[10px] leading-relaxed font-mono">
            * All programs utilize a shared propulsion (RDE) and recovery architecture. 
            Operational readiness is determined by regulatory alignment (FAA/EASA).
          </p>
        </motion.div>

      </section>
    </div>
  );
}
