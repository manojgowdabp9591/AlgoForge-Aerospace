"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const TAGLINES = [
  "LOWER COST TO ORBIT",
  "ROTARY DETONATION PROPULSION",
  "ON-DEMAND ORBITAL ACCESS",
  "SCALABLE ENGINE ARCHITECTURE",
];

function ScrollingTaglines() {
  const duplicatedTaglines = [...TAGLINES, ...TAGLINES, ...TAGLINES];

  return (
    <div className="relative overflow-hidden mt-10 h-12 w-full max-w-4xl mx-auto mask-gradient-to-r">
      <motion.div
        className="flex whitespace-nowrap text-xs md:text-sm font-semibold text-cyan-400/80 tracking-widest uppercase items-center"
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 28,
        }}
      >
        {duplicatedTaglines.map((tagline, index) => (
          <span key={index} className="mx-10 flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
            {tagline}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden pt-24 pb-16">
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-35 scale-105"
          poster="/hero-poster.jpg"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.025)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 max-w-6xl px-4 w-full flex flex-col items-center"
      >
        {/* STATUS BADGE */}
        <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-[10px] md:text-xs font-semibold tracking-widest text-cyan-300 uppercase">
            System Online
          </span>
        </div>

        {/* HEADLINE */}
        <h1 className="text-[clamp(3rem,6vw,4.25rem)] font-extrabold tracking-tight leading-[1.05]">
          The <span className="text-cyan-400">Vortex</span> has awakened
        </h1>

        {/* SUBHEAD */}
        <p className="mt-6 text-base md:text-xl font-light text-white/80 max-w-3xl mx-auto leading-relaxed">
          <span className="text-white font-semibold">Vortex Aerospace</span> is
          engineering next-generation rocket propulsion using{" "}
          <span className="text-cyan-400 font-medium">
            rotary detonation physics
          </span>
          — enabling higher efficiency, simpler architectures, and scalable
          orbital access for future missions.
        </p>

        {/* SCROLLING TAGLINES */}
        <ScrollingTaglines />
      </motion.div>
    </section>
  );
}
