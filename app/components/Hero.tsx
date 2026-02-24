"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Globe, Zap } from "lucide-react";

const TAGLINES = [
  "REUSABLE ORBITAL LAUNCH SYSTEMS",
  "ROTARY DETONATION PROPULSION",
  "HUMAN-RATED SUBORBITAL FLIGHT",
  "HYPERSONIC POINT-TO-POINT TRAVEL",
];

function ScrollingTaglines() {
  // Triple the list for seamless looping
  const duplicatedTaglines = [...TAGLINES, ...TAGLINES, ...TAGLINES];

  return (
    <div className="relative overflow-hidden mt-12 h-14 w-full max-w-5xl mx-auto border-y border-white/5 bg-black/20 backdrop-blur-sm flex items-center">
      
      {/* Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        {duplicatedTaglines.map((tagline, index) => (
          <div key={index} className="flex items-center mx-8">
             <Zap size={12} className="text-cyan-500 mr-4 animate-pulse" />
             <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-cyan-100/70 uppercase">
                {tagline}
             </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="h-screen min-h-[800px] flex items-center justify-center text-center relative overflow-hidden">
      
      {/* 1. CINEMATIC BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105"
          poster="/hero-poster.jpg"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" 
            type="video/mp4"
          />
        </video>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_120%)]" />
        
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      </div>

      {/* 2. PARALLAX CONTENT CONTAINER */}
      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-10 max-w-7xl px-6 w-full flex flex-col items-center mt-[-50px]"
      >
        
        {/* STATUS HUD */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex items-center gap-4"
        >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-100 uppercase">
                    Reusable Orbital Launch Systems Development
                </span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[10px] text-white/40 font-mono tracking-widest">
                <span>VORTEX-1</span>
                <span>//</span>
                <span>ORBITON</span>
            </div>
        </motion.div>

       {/* MASSIVE HEADLINE */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight text-white mb-4 mix-blend-overlay"
        >
          Reusable Launch Systems
          <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-cyan-500 to-blue-600 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
              Beyond Earth Orbit
            </span>
        </motion.h1>

        {/* SUBHEAD */}
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-lg md:text-2xl font-light text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          <span className="text-cyan-600 font-semibold">  AlgoForge Aerospace </span> is an
          engineering-led launch company developing reusable rocket systems for
          orbital satellite deployment. The same vehicle architecture supports
          human suborbital spaceflight and lays the foundation for ultra-fast
          point-to-point Earth travel.
        </motion.p>

      </motion.div>
      
      {/* 3. BOTTOM SCROLLER */}
      <div className="absolute bottom-0 w-full z-20">
         <ScrollingTaglines />
      </div>

    </section>
  );
}
