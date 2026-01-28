"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Lazy load the 3D model to prevent page freeze
const Rocket3D = dynamic(() => import("./Rocket3D"), { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-cyan-400">Loading 3D Model...</div>
});

export default function TechSpec() {
  const specs = [
    { label: "Height", value: "70 m / 229 ft" },
    { label: "Diameter", value: "3.7 m / 12 ft" },
    { label: "Stages", value: "2 (Fully Reusable)" },
    { label: "Payload to LEO", value: "20,400 kg" },
    { label: "Thrust (Sea Level)", value: "7,607 kN" },
    { label: "Propellant", value: "Liquid Oxygen / RP-1" }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-20 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* COLUMN 1: 3D ROCKET (Visible on All Devices) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative h-[400px] w-full flex items-center justify-center"
          >
            {/* Visual Backglow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            {/* Renders on Mobile AND Desktop now */}
            <div className="w-full h-full cursor-grab active:cursor-grabbing">
                <Rocket3D />
                <p className="text-center text-xs text-white/30 mt-4">
                  * Drag to rotate flight hardware.
                </p>
            </div>
          </motion.div>

          {/* COLUMN 2: SPECS */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-center md:text-left">
              VEHICLE <span className="text-cyan-400">OVERVIEW</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg mb-10 text-center md:text-left leading-relaxed">
              The Space Gen launch vehicle is designed for total reusability, minimizing the cost of access to orbit.
            </p>

            <div className="border-t border-white/20">
              {specs.map((spec, index) => (
                <div 
                  key={index}
                  // Responsive Layout: Stack on mobile, Row on desktop
                  className="flex flex-col md:flex-row md:justify-between md:items-center py-4 border-b border-white/20 hover:bg-white/5 transition px-4 gap-1 text-center md:text-left"
                >
                  <span className="text-sm md:text-lg font-bold uppercase text-white/80">
                    {spec.label}
                  </span>
                  <span className="text-lg md:text-xl font-mono text-cyan-400 glow-text">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center md:justify-start">
                <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition w-full md:w-auto">
                    View User Guide
                </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}