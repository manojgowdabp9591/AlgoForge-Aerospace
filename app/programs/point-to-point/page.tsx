"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Plane, Clock, ArrowRight, MapPin, Globe, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/app/components/Navbar";

// Dynamically import Globe to avoid SSR issues
const GlobeTpl = dynamic(() => import("react-globe.gl"), { ssr: false });

/* ================= CONCEPTUAL ROUTES DATA ================= */
const TRIPS = [
  {
    from: "NYC",
    to: "LDN",
    time: "29 MIN",
    note: "Trans-Atlantic Corridor",
    startLat: 40.7,
    startLng: -74.0,
    endLat: 51.5,
    endLng: -0.1,
  },
  {
    from: "TYO",
    to: "LAX",
    time: "35 MIN",
    note: "Pacific Rim Express",
    startLat: 35.6,
    startLng: 139.7,
    endLat: 34.0,
    endLng: -118.2,
  },
  {
    from: "DXB",
    to: "SYD",
    time: "41 MIN",
    note: "Cross-Equatorial Link",
    startLat: 25.2,
    startLng: 55.3,
    endLat: -33.9,
    endLng: 151.2,
  },
  {
    from: "BLR",
    to: "PAR",
    time: "32 MIN",
    note: "Eurasian Hypersonic",
    startLat: 12.9,
    startLng: 77.6,
    endLat: 48.8,
    endLng: 2.3,
  },
];

export default function Destinations() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-100 relative overflow-hidden">
        
        {/* GLOBAL BACKGROUND GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15),transparent_70%)] pointer-events-none" />

        <section className="relative py-32 px-6 max-w-7xl mx-auto">
          
          {/* ================= HERO ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative text-center mb-24"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <Globe size={14} className="text-cyan-400" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-300 uppercase">
                    Suborbital Mobility
                </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
              Point-to-Point <br />
              <span className="text-cyan-400">Earth Travel</span>
            </h1>
            
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              We are shrinking the planet. By leveraging reusable suborbital architecture, 
              we turn long-haul flights into <span className="text-white font-medium">commutes</span>.
            </p>
          </motion.div>

          {/* ================= OVERVIEW SECTION ================= */}
          <div className="relative grid md:grid-cols-2 gap-12 lg:gap-20 items-start mb-32">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 leading-tight">
                Redefining Distance via <br/>
                <span className="text-cyan-400">Ballistic Trajectories</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-transparent mb-8" />
              
              <div className="space-y-6 text-white/70 text-lg leading-relaxed font-light">
                <p>
                  Point-to-point spaceflight uses suborbital trajectories to travel
                  between distant locations on Earth. By briefly exiting the dense
                  atmosphere, vehicles can travel at Mach 20+, significantly reducing travel time.
                </p>
                <p>
                  This capability becomes possible only after reusable launch systems
                  demonstrate consistent safety, precision guidance, and rapid
                  reusability.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative border border-white/10 rounded-2xl p-8 bg-white/[0.02] backdrop-blur-md shadow-2xl"
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 p-4">
                 <Zap className="text-cyan-500/20" size={40} />
              </div>

              <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                <span className="w-1.5 h-6 bg-cyan-500 rounded-full" />
                Flight Profile Specs
              </h3>
              
              <ul className="space-y-4">
                {[
                    "Suborbital ballistic trajectory (Apogee > 100km)",
                    "Microgravity exposure (~5-8 mins)",
                    "High-G atmospheric re-entry",
                    "Precision landing (< 5m accuracy)",
                    "100% Reusable architecture"
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee]" />
                        {item}
                    </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* ================= GLOBE TRAJECTORIES ================= */}
          <section className="relative mb-32">
            {/* High-Tech Frame around Globe */}
            <div className="relative w-full h-[650px] border border-white/10 rounded-3xl overflow-hidden bg-black shadow-[0_0_60px_rgba(6,182,212,0.05)] group">
                
                {/* Globe Component */}
                <div className="relative w-full h-full opacity-80 transition-opacity duration-1000 group-hover:opacity-100">
                     <PointToPointGlobe />
                </div>

                {/* HUD Overlays */}
                <div className="absolute top-6 left-6 pointer-events-none">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                        <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase bg-cyan-950/50 px-2 py-1 rounded border border-cyan-500/20">
                            Live Simulation
                        </span>
                    </div>
                    <div className="text-[10px] text-white/40 font-mono">
                        TRAJECTORY OPTIMIZATION // ACTIVE
                    </div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 bg-black/60 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                    Global Transit Network
                    </span>
                </div>
            </div>
          </section>

          {/* ================= CONCEPTUAL ROUTES ================= */}
          <section className="relative mb-32 border-t border-white/5 pt-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                  Conceptual <span className="text-cyan-400">Corridors</span>
                </h2>
                <p className="text-white/50 text-lg max-w-lg font-light">
                  Targeted high-traffic routes enabling same-day returns for global business.
                </p>
              </div>
              
              <Link
                href="/programs/routes"
                className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors group px-6 py-3 border border-white/10 rounded-full hover:border-cyan-500/50 hover:bg-cyan-950/10"
              >
                View detailed profiles
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TRIPS.map((trip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-white/[0.02] border border-white/10 p-6 rounded-2xl hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="relative flex justify-between items-center mb-10">
                    <div className="p-2 bg-white/5 rounded-lg text-white/60 group-hover:text-cyan-400 group-hover:scale-110 transition-all">
                         <Plane size={20} className="rotate-[-45deg]" />
                    </div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-white/30 border border-white/10 px-2 py-1 rounded">
                      Ballistic
                    </span>
                  </div>

                  {/* Route Visualizer */}
                  <div className="relative flex items-center gap-3 text-3xl font-light text-white mb-3">
                    <span className="font-bold">{trip.from}</span>
                    
                    {/* Animated Line */}
                    <div className="relative h-[1px] flex-1 bg-white/10 group-hover:bg-cyan-500/50 transition-colors overflow-hidden">
                        <div className="absolute inset-0 bg-cyan-400 w-full -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    </div>
                    
                    <span className="font-bold">{trip.to}</span>
                  </div>
                  
                  <div className="text-xs text-white/40 mb-6 font-mono">
                    {trip.note}
                  </div>

                  {/* Footer */}
                  <div className="relative flex justify-between items-center pt-4 border-t border-white/10">
                    <div className="relative flex items-center gap-2 text-cyan-400">
                      <Clock size={14} />
                      <span className="font-mono text-sm font-bold tracking-wider">{trip.time}</span>
                    </div>
                    <ArrowRight size={14} className="text-white/20 group-hover:text-cyan-400 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-cyan-500/20 transition-all pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </section>

          {/* ================= DISCLAIMER ================= */}
          <div className="relative text-center max-w-4xl mx-auto border-t border-white/5 pt-12">
            <p className="text-white/30 text-xs leading-relaxed mb-8 max-w-2xl mx-auto font-mono">
              * DISCLAIMER: Point-to-point Earth travel is a long-term, exploratory capability.
              Routes, durations, and trajectories shown are illustrative simulations based on theoretical engine performance 
              and do not represent currently operational commercial services.
            </p>

            <Link
              href="/programs"
              className="text-white/60 text-xs font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors"
            >
              ← Back to Programs Overview
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

/* ================= GLOBE COMPONENT (PRESERVED LOGIC) ================= */

function PointToPointGlobe() {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const resize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const arcs = useMemo(
    () =>
      TRIPS.map((t) => ({
        startLat: t.startLat,
        startLng: t.startLng,
        endLat: t.endLat,
        endLng: t.endLng,
        label: `${t.from} → ${t.to} · ${t.time}`,
        color: ["#22d3ee", "#ffffff"], // Enhanced colors
      })),
    []
  );

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative w-full h-full cursor-move">
      <GlobeTpl
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor="#06b6d4"
        atmosphereAltitude={0.2} // Increased glow
        onGlobeReady={() => {
          if (!globeRef.current) return;
          const controls = globeRef.current.controls();
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.5;
          controls.enableZoom = false;

          globeRef.current.pointOfView({
            lat: 20,
            lng: 30,
            altitude: 2.2,
          });
        }}
        arcsData={arcs}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color" // Use the custom color array
        arcAltitude={0.4} // Higher arcs for dramatic effect
        arcStroke={0.8}
        arcDashLength={0.9}
        arcDashGap={0.2}
        arcDashAnimateTime={2000} // Faster animation
        arcLabel={(d: any) => `
            <div style="background: rgba(0,0,0,0.8); border: 1px solid #22d3ee; color: #fff; padding: 4px 8px; border-radius: 4px; font-family: monospace; font-size: 10px;">
                ${d.label}
            </div>
        `}
      />
    </div>
  );
}
