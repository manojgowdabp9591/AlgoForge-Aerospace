"use client";

import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import TechSpec from "./components/TechSpec";
import LaunchNetwork from "./components/LaunchNetwork";
import Partners from "./components/Partners";
import HolographicCard from "./components/HolographicCard"; 
import Navbar from "./components/Navbar";
import { Zap, RefreshCw, ShieldCheck, Crosshair, ArrowRight } from "lucide-react"; 
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative z-10 inset-0 text-white overflow-x-hidden bg-transparent selection:bg-cyan-500/30 selection:text-cyan-100">

      {/* NAVIGATION */}
      <Navbar />

      {/* HERO SECTION */}
      <Hero />

      {/* TRUST SIGNALS (Marquee) */}
      <Partners />
      
      {/* 3D ROCKET PREVIEW */}
      <TechSpec />

      {/* KEY METRICS */}
      <Metrics />

      {/* MISSION STATEMENT */}
      <section id="mission" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5 relative">

        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
                <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                  DEMOCRATIZING <br />
                  THE <span className="text-cyan-500">COSMOS</span>.
                </h2>
                <div className="w-20 h-1 bg-cyan-500 mb-8"></div>
            </div>
            <div>
                <h3 className="text-xl md:text-2xl text-cyan-400 mb-6 font-bold tracking-wide">
                  We are building the bridge to humanity's multi-planetary future.
                </h3>
                <p className="text-white/70 text-lg leading-relaxed font-light mb-8">
                  At <strong className="text-white">Vortex Aerospace</strong>, we believe that space is not just a destination for governments, 
                  but a domain for human expansion. Conventional rockets are too expensive and too slow.
                </p>
                <p className="text-white/70 text-lg leading-relaxed font-light mb-8">
                  Our mission is to dismantle the cost barriers to orbit through fully reusable launch architectures 
                  powered by the revolutionary <strong className="text-white">VORTEX-1 RDE Engine</strong>.
                </p>
                
                <Link href="/about" className="inline-flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest hover:text-white transition-colors group">
                    Know About The Masters of our Plan <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
      </section>

      {/* TECHNOLOGY GRID (Holographic Cards) */}
      <section id="tech" className="py-32 relative px-6 bg-transparent border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white uppercase tracking-tight">
              Reusability Is <span className="text-cyan-500">Evolution</span>
            </h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto font-light">
              Flight-proven hardware. Rapid turnaround. Unmatched reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HolographicCard
              title="Pinpoint Landing"
              icon={Crosshair}
              text="Autonomous GNC algorithms enable landing precision within 2 meters, allowing for immediate recovery on pad."
            />
            <HolographicCard
              title="VORTEX Propulsion"
              icon={Zap}
              text="High-efficiency Rotary Detonation Engines (RDE) designed for deep throttling and multiple restarts in vacuum."
            />
            <HolographicCard
              title="Carbon Structure"
              icon={ShieldCheck}
              text="Advanced carbon-composite fuel tanks reduce dry mass by 40%, maximizing payload capacity to orbit."
            />
            <HolographicCard
              title="Rapid Turnaround"
              icon={RefreshCw}
              text="Designed for aircraft-like operations. Land, refuel, and re-launch within 24 hours."
            />
          </div>

        </div>
      </section>

      {/* LAUNCH NETWORK (Globe) */}
      <LaunchNetwork />

      {/* ROADMAP */}
      <section id="roadmap" className="py-32 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-white uppercase tracking-widest">Strategic Roadmap</h2>
            <p className="text-white/50">The path to orbital dominance.</p>
        </div>
        
        <div className="space-y-12 border-l-2 border-white/10 pl-8 relative ml-4 md:ml-0">
            <RoadmapItem 
                year="2026" 
                title="VORTEX-1 Engine Static Fire" 
                desc="Full duration hot-fire test of the flight-weight RDE propulsion system."
                status="complete"
            />
            <RoadmapItem 
                year="2027" 
                title="Suborbital Hop (VTVL)" 
                desc="Low altitude flight test to validate GNC landing algorithms and vehicle dynamics."
                status="active"
            />
            <RoadmapItem 
                year="2028" 
                title="Orbiton-1 Maiden Flight" 
                desc="First orbital launch attempt from Sriharikota, delivering 500kg to LEO."
                status="pending"
            />
             <RoadmapItem 
                year="2030" 
                title="Commercial Operations" 
                desc="Rapid launch cadence achieved. Targeting 24-hour turnaround capability."
                status="pending"
            />
        </div>
      </section>
    </div>
  );
}

/* ================== ROADMAP COMPONENT ================== */

function RoadmapItem({ year, title, desc, status }: { year: string, title: string, desc: string, status: 'complete' | 'active' | 'pending' }) {
  
  let dotColor = "bg-white/20";
  let textColor = "text-white/50";
  let glow = "";

  if (status === 'complete') {
      dotColor = "bg-cyan-500";
      textColor = "text-white";
      glow = "shadow-[0_0_15px_#22d3ee]";
  } else if (status === 'active') {
      dotColor = "bg-white";
      textColor = "text-white";
      glow = "shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse";
  }

  return (
    <div className="relative group">
      {/* Glowing Dot */}
      <div className={`absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-black ${dotColor} ${glow} transition-all duration-500`}></div>
      
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
          <h3 className={`text-3xl font-black ${status === 'active' ? 'text-cyan-400' : 'text-white/80'} font-mono`}>{year}</h3>
          <div>
            <h4 className={`text-xl font-bold ${textColor} group-hover:text-white transition-colors`}>{title}</h4>
            <p className="text-white/60 text-sm mt-2 max-w-lg font-light leading-relaxed">{desc}</p>
          </div>
      </div>
    </div>
  );
}