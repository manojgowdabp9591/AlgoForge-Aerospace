"use client";
import { motion } from "framer-motion";
import Smoke from "./Smoke";

const TAGLINES = [
  "Space Gen: The Sky Is Not the Limit.",
  "Orbit. Land. Repeat.",
  "Launch Smarter."
];

function ScrollingTaglines() {
  return (
    <div className="relative overflow-hidden mt-10 h-12">
      <motion.div
        className="absolute whitespace-nowrap text-lg font-semibold text-cyan-400"
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear"
        }}
      >
        {TAGLINES.map((tagline, index) => (
          <span key={index} className="mx-8">
            {tagline}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden pt-20">
      
      {/* ADDED: playsInline ensures video works on iOS mobile */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
        <source src="https://cdn.coverr.co/videos/coverr-rocket-launch-2957/1080p.mp4" />
      </video>
      <Smoke />
      
      {/* Semi-transparent overlay kept for text readability */}
      <div className="absolute inset-0 bg-black/70"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-5xl px-4 w-full"
      >
        <img 
          src="/spacegen-logo.png" 
          alt="Space Gen"
          className="h-20 md:h-28 mx-auto mb-6 drop-shadow-[0_0_40px_#38bdf8]" 
        />

        {/* MOBILE FIX: Smaller text on mobile (text-4xl), breaks line on desktop only */}
        <h1 className="text-4xl md:text-7xl font-black leading-tight">
          Building Humanity’s <br className="hidden md:block" /> Next Launch System
        </h1>

        {/* MOBILE FIX: Smaller subheading (text-2xl) to prevent screen edge collision */}
        <h2 className="mt-4 text-2xl md:text-5xl font-extrabold text-cyan-400 glow-text">
          Making Space Economically Accessible
        </h2>

        <p className="mt-6 text-base md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          Space Gen develops reusable rockets to make space affordable, reliable, and routine.
        </p>
        
        <ScrollingTaglines />

        {/* MOBILE FIX: Stack buttons vertically on mobile, side-by-side on desktop */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-8 px-6">
            <button className="px-8 py-4 bg-cyan-400 text-black font-bold rounded-full glow-button hover:bg-cyan-300 transition w-full md:w-auto">
              Partner With Us
            </button>
            <button className="px-8 py-4 border border-white/20 bg-black/50 text-white font-bold rounded-full hover:bg-white/10 transition w-full md:w-auto">
              Watch Launch
            </button>
        </div>
      </motion.div>
    </section>
  );
}