"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";

// Lazy load the 3D model to prevent page freeze
const Rocket3D = dynamic(() => import("./Rocket3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-cyan-400 font-mono text-xs animate-pulse">
      Initializing 3D Render…
    </div>
  ),
});

export default function TechSpec() {
  const specs = [
    { label: "Overall Height", value: "24.0 m / 78.7 ft" },
    { label: "Core Diameter", value: "2.8 m / 9.2 ft" },
    { label: "Stages", value: "Two-stage, reusable" },
    { label: "Payload to LEO", value: "Up to 850 kg / 1,873 lb" },
    { label: "Payload to SSO", value: "Up to 600 kg / 1,322 lb" },
    { label: "Sea-Level Thrust", value: "≈ 2,400 kN (clustered)" },
    { label: "Propellant", value: "LCH4 / LOX (Methalox)" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-24 relative z-10 overflow-hidden bg-black/20">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* COLUMN 1: 3D VEHICLE VIEW */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative h-[520px] w-full flex items-center justify-center"
          >
            {/* Backglow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none" />

            {/* 3D Model */}
            <div className="w-full h-full cursor-grab active:cursor-grabbing relative z-10">
              <Rocket3D />

              {/* Interaction Hint */}
              <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <p className="text-[10px] text-cyan-400/60 uppercase tracking-widest font-mono bg-black/40 inline-block px-3 py-1 rounded-full border border-cyan-500/20 backdrop-blur-sm">
                  Drag to inspect vehicle geometry
                </p>
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
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center md:text-left text-white tracking-tight">
              Vehicle Overview
            </h2>

            <p className="text-white/65 text-base md:text-lg mb-10 text-center md:text-left leading-relaxed font-light max-w-xl">
              <span className="text-white font-semibold">Orbiton-1</span> is a
              reusable micro-launch vehicle developed by Vortex Aerospace.
              The system combines a lifting-body architecture with methalox
              propulsion to improve performance margins, structural efficiency,
              and operational flexibility for small-payload orbital missions.
            </p>

            {/* SPEC TABLE */}
            <div className="border-t border-white/20">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:justify-between md:items-center py-4 border-b border-white/10 hover:bg-white/5 transition px-4 gap-1 text-center md:text-left group"
                >
                  <span className="text-xs md:text-sm font-semibold uppercase text-white/55 tracking-widest group-hover:text-cyan-400 transition-colors">
                    {spec.label}
                  </span>
                  <span className="text-lg md:text-xl font-mono text-white font-bold group-hover:text-cyan-300 transition-colors">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 flex justify-center md:justify-start">
              <Link href="/vehicles/orbiton" className="w-full md:w-auto">
                <button className="w-full md:w-auto px-8 py-4 bg-black text-white font-semibold uppercase tracking-widest text-sm rounded hover:bg-cyan-400 hover:scale-[1.03] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]">
                  View Technical Datasheet
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
