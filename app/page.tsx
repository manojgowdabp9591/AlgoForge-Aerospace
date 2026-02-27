"use client";

import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import TechSpec from "./components/TechSpec";
import LaunchNetwork from "./components/LaunchNetwork";
import Partners from "./components/Partners";
import HolographicCard from "./components/HolographicCard";
import Navbar from "./components/Navbar";
import { Zap, RefreshCw, ShieldCheck, Crosshair, ArrowRight, Flag, Rocket, Globe } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative z-10 inset-0 text-white overflow-x-hidden bg-black selection:bg-cyan-500/30 selection:text-cyan-100">
      
      {/* 1. Global Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
         {/* Noise Texture */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
         {/* Deep Space Gradient */}
         <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-[#0a0a0f]" />
      </div>

      <Navbar />

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <Hero />

        {/* PARTNERS / TRUST */}
        <Partners />

        {/* TECH SPECS (3D Model / Diagram) */}
        <TechSpec />

        {/* METRICS DASHBOARD */}
        <Metrics />

        {/* --- HUMAN SPACEFLIGHT (Feature Section) --- */}
        <section className="py-32 relative overflow-hidden">
          {/* Earth Horizon Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[500px] bg-blue-600/10 blur-[120px] rounded-[100%] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-6">
                    <Rocket size={12} /> Crew Capability
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
                  Human Spaceflight
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                    Enabled by Reusability
                  </span>
                </h2>
                
                <div className="space-y-6 text-lg text-white/60 font-light leading-relaxed">
                    <p>
                        <strong className="text-white">AlgoForge Aerospace</strong> is developing human-rated suborbital flight capability as a direct extension of its reusable orbital launch systems. 
                        No parallel vehicles. No separate architectures.
                    </p>
                    <p>
                        Initial missions focus on controlled suborbital space tourism and research flights, progressing toward ultra-fast point-to-point Earth travel.
                    </p>
                </div>

                <div className="mt-10 flex gap-6">
                    <StatBox label="Max G-Force" value="3.5 G" />
                    <StatBox label="Training" value="3 Days" />
                    <StatBox label="Capacity" value="6 Crew" />
                </div>
              </motion.div>

              {/* Visual / Window */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-black group"
              >
                 <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 to-purple-900/20 mix-blend-overlay z-10" />
                 
                 {/* Simulated Viewport Image */}
                 <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                    alt="View from orbit"
                    className="object-cover w-full h-full opacity-60 group-hover:scale-105 transition-transform duration-[2s]"
                 />
                 
                 <div className="absolute bottom-6 left-6 z-20">
                    <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1">View Simulation</p>
                    <p className="text-xl font-bold text-white">Apogee: 110km</p>
                 </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- MISSION STATEMENT --- */}
        <section id="mission" className="py-32 relative border-t border-white/5 bg-black/40 backdrop-blur-sm">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-end">
                
                <div className="lg:col-span-7">
                    <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter">
                        EXPANDING <br />
                        ACCESS BEYOND <br />
                        <span className="text-cyan-500">EARTH ORBIT.</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent" />
                </div>

                <div className="lg:col-span-5">
                    <h3 className="text-xl text-white mb-6 font-bold">
                        Infrastructure for the next century.
                    </h3>
                    <p className="text-white/60 text-base leading-relaxed mb-8">
                        <strong className="text-white">AlgoForge Aerospace</strong> is an engineering-led launch company focused on lowering the cost, complexity, and response time of orbital access. 
                        <br /><br />
                        Our reusable systems are designed to support frequent, reliable satellite deployment to low Earth orbit, laying the groundwork for a multi-planetary future.
                    </p>
                    
                    <Link href="#/about" className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white">
                        <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                            <ArrowRight size={16} />
                        </span>
                        Meet the Team
                    </Link>
                </div>

            </div>
          </div>
        </section>

        {/* --- TECHNOLOGY GRID --- */}
        <section id="tech" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
                <span className="text-cyan-500 font-mono text-xs uppercase tracking-[0.3em]">Core Architecture</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Reusability as a System</h2>
                <p className="text-white/50 max-w-2xl mx-auto">
                    Designed from inception for rapid recovery, inspection, and repeatable flight operations.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HolographicCard
                    title="Precision Landing"
                    icon={Crosshair}
                    text="Autonomous guidance and control systems engineered for meter-level landing accuracy."
                />
                <HolographicCard
                    title="RDE Propulsion"
                    icon={Zap}
                    text="Pressure-gain combustion architecture delivering higher efficiency and simplified engine design."
                />
                <HolographicCard
                    title="Composite Structure"
                    icon={ShieldCheck}
                    text="Advanced composite tankage optimized for mass efficiency across multiple reuse cycles."
                />
                <HolographicCard
                    title="Rapid Turnaround"
                    icon={RefreshCw}
                    text="Vehicle systems designed for aircraft-like servicing within a 24-hour window."
                />
            </div>
          </div>
        </section>

        {/* --- GLOBAL NETWORK --- */}
        <LaunchNetwork />

        {/* --- STRATEGIC ROADMAP --- */}
        <section id="roadmap" className="py-40 relative overflow-hidden">
            {/* Center Beam */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent md:block hidden" />
            
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-4xl font-bold mb-4 tracking-tight">Strategic Roadmap</h2>
                    <p className="text-white/40 font-mono text-sm uppercase tracking-widest">
                        Sequence to Orbit
                    </p>
                </div>

                <div className="space-y-24">
                    <RoadmapItem 
                        year="2027" 
                        title="VORTEX-1 Engine Static Fire"
                        desc="Full-duration ground testing of a flight-weight rotary detonation propulsion system."
                        status="complete"
                        align="left"
                    />
                    <RoadmapItem 
                        year="2028" 
                        title="Suborbital VTVL Demo"
                        desc="Vertical takeoff and landing flight tests validating GNC and recovery systems."
                        status="active"
                        align="right"
                    />
                    <RoadmapItem 
                        year="2030" 
                        title="Orbiton-1 Orbital Attempt"
                        desc="Initial orbital launch demonstration delivering payloads to low Earth orbit."
                        status="pending"
                        align="left"
                    />
                    <RoadmapItem 
                        year="2033" 
                        title="Commercial Ops & Space Tourism"
                        desc="Routine satellite launch services enabled by reusable vehicles with space tourism exploration."
                        status="pending"
                        align="right"
                    />
                    <RoadmapItem 
                        year="2036" 
                        title="Point-to-Point Transport"
                        desc="Human-rated suborbital missions validating ultra-fast Earth travel."
                        status="pending"
                        align="left"
                    />
                </div>
            </div>
        </section>

      </main>
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function StatBox({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <div className="text-2xl font-bold text-white mb-1 font-mono">{value}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">{label}</div>
        </div>
    )
}

function RoadmapItem({ year, title, desc, status, align }: { year: string, title: string, desc: string, status: "complete" | "active" | "pending", align: "left" | "right" }) {
    const isRight = align === "right";
    
    let statusColor = "bg-white/10 border-white/10 text-white/40";
    let glow = "";
    
    if (status === "complete") {
        statusColor = "bg-cyan-500 border-cyan-400 text-black";
        glow = "shadow-[0_0_30px_rgba(6,182,212,0.4)]";
    } else if (status === "active") {
        statusColor = "bg-white border-white text-black";
        glow = "shadow-[0_0_30px_rgba(255,255,255,0.4)] animate-pulse";
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isRight ? "md:flex-row-reverse" : ""}`}
        >
            {/* Content Side */}
            <div className={`flex-1 text-center ${isRight ? "md:text-left" : "md:text-right"}`}>
                <h3 className="text-4xl font-black text-white/90 mb-2 tracking-tighter">{year}</h3>
                <h4 className={`text-lg font-bold text-cyan-400 mb-3 ${status === 'pending' ? 'opacity-50' : 'opacity-100'}`}>{title}</h4>
                <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto md:mx-0 inline-block">{desc}</p>
            </div>

            {/* Center Node */}
            <div className="relative flex-shrink-0 z-10">
                <div className={`w-4 h-4 rounded-full border-2 ${statusColor} ${glow} transition-all duration-500`} />
            </div>

            {/* Empty Side for Balance */}
            <div className="flex-1 hidden md:block" />
        </motion.div>
    )
}
