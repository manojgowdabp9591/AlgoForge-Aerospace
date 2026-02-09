"use client";
import { motion } from "framer-motion";
import { ChevronRight, Play } from "lucide-react";
import Link from "next/link"; 

const TAGLINES = [
  "SHATTERING THE COST BARRIER",
  "DETONATION IS THE FUTURE",
  "ORBIT ON DEMAND",
  "HYPERSONIC REUSABILITY"
];

function ScrollingTaglines() {
  const duplicatedTaglines = [...TAGLINES, ...TAGLINES, ...TAGLINES];

  return (
    <div className="relative overflow-hidden mt-8 h-12 w-full max-w-3xl mx-auto mask-gradient-to-r">
      <motion.div
        className="flex whitespace-nowrap text-xs md:text-sm font-bold text-cyan-500/80 tracking-widest uppercase items-center font-tech" 
        animate={{ x: ["100%", "-100%"] }} 
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, 
        }}
      >
        {duplicatedTaglines.map((tagline, index) => (
          <span key={index} className="mx-8 flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]"></span>
            {tagline}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden pt-20 pb-10">
      
      {/* BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-40 scale-105"
            poster="/hero-poster.jpg" 
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-6xl px-4 w-full flex flex-col items-center"
      >
        {/* BADGE */}
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md hover:border-cyan-400/60 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-cyan-300 uppercase font-tech">
                System Online
            </span>
        </div>

        {/* MAIN HEADLINE */}
        <h1 className="text-[clamp(3rem,6vw,4.5rem)] font-extrabold tracking-tight leading-[1.05]">
          The <span className="text-cyan-400">Vortex</span> has awakened
        </h1>


        {/* SUBHEAD */}
        <h2 className="text-lg md:text-2xl font-light text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
          We are <strong className="text-white font-bold">Vortex Aerospace</strong>. We don't just launch rockets; we redefine physics. 
          Pioneering <span className="text-cyan-400 font-medium">Rotary Detonation Engines</span> for the next era of orbital transport.
        </h2>
        
        {/* SCROLLING TICKER */}
        <ScrollingTaglines />
        
      </motion.div>
    </section>
  );
}