"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Plane, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/app/components/Navbar";


const GlobeTpl = dynamic(() => import("react-globe.gl"), { ssr: false });

/* ================= CONCEPTUAL ROUTES ================= */
const TRIPS = [
  {
    from: "NYC",
    to: "LDN",
    time: "29 MIN",
    note: "Conceptual profile",
    startLat: 40.7,
    startLng: -74.0,
    endLat: 51.5,
    endLng: -0.1,
  },
  {
    from: "TYO",
    to: "LAX",
    time: "35 MIN",
    note: "Conceptual profile",
    startLat: 35.6,
    startLng: 139.7,
    endLat: 34.0,
    endLng: -118.2,
  },
  {
    from: "DXB",
    to: "SYD",
    time: "41 MIN",
    note: "Conceptual profile",
    startLat: 25.2,
    startLng: 55.3,
    endLat: -33.9,
    endLng: 151.2,
  },
  {
    from: "BLR",
    to: "PAR",
    time: "32 MIN",
    note: "Conceptual profile",
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
    
    <section className="relative py-32 px-6 max-w-7xl mx-auto text-white">
      {/* ================= HERO ================= */}
      <div className="relative text-center mb-24">
        <h1 className="text-cyan-400 text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Point-to-Point Earth Travel
        </h1>
        <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
          Exploring how reusable suborbital spaceflight systems could enable
          dramatically faster long-distance travel as a future capability.
        </p>
      </div>

      {/* ================= OVERVIEW ================= */}
      <div className="relative grid md:grid-cols-2 gap-20 items-start mb-32">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Understanding Suborbital Point-to-Point Flight
          </h2>
          <div className="w-14 h-1 bg-cyan-500 mb-6" />
          <p className="text-white/70 leading-relaxed mb-6">
            Point-to-point spaceflight uses suborbital trajectories to travel
            between distant locations on Earth. By briefly exiting the dense
            atmosphere, vehicles can significantly reduce travel time compared
            to conventional aviation.
          </p>
          <p className="text-white/70 leading-relaxed">
            This capability becomes possible only after reusable launch systems
            demonstrate consistent safety, precision guidance, and rapid
            reusability through orbital and suborbital missions.
          </p>
        </div>

        <div className="relative border border-white/10 rounded-xl p-8 bg-white/[0.02]">
          <h3 className="text-lg font-semibold mb-4 text-cyan-400">
            Key Characteristics
          </h3>
          <ul className="space-y-4 text-white/70">
            <li>• Suborbital ballistic flight profiles</li>
            <li>• Short exposure to space environment</li>
            <li>• Controlled atmospheric re-entry</li>
            <li>• Precision landing at prepared sites</li>
            <li>• Fully reusable vehicle architecture</li>
          </ul>
        </div>
      </div>

      {/* ================= GLOBE TRAJECTORIES ================= */}
      <section className="relative mb-32 border border-white/10 rounded-2xl overflow-hidden bg-black">
        <div className="relative w-full h-[600px]">
          <PointToPointGlobe />
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <span className="text-xs tracking-widest uppercase text-cyan-400 bg-black/60 px-4 py-2 rounded-full border border-cyan-500/30">
            · Illustrative · Suborbital Trajectories ·
          </span>
        </div>
      </section>
      

      {/* ================= CONCEPTUAL ROUTES ================= */}
      <section className="relative mb-32 border-t border-white/10 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4 tracking-tight">
              Conceptual Global Routes
            </h2>
            <p className="text-white/50 text-lg max-w-lg font-light">
              Illustrative examples aligned with the trajectories shown above.
            </p>
          </div>
          <Link
              href="/programs/routes"
              className="inline-flex items-center gap-2 text-cyan-400 font-semibold tracking-widest hover:text-white transition-colors group"
            >
              Detailed commercial services
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRIPS.map((trip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="relative flex justify-between items-center mb-8 text-white/40 group-hover:text-cyan-400 transition-colors">
                <Plane size={20} className="relative rotate-[-45deg]" />
                <span className="text-xs font-mono tracking-widest">
                  SUBORBITAL
                </span>
              </div>

              <div className="relative flex items-center gap-4 text-3xl font-light text-white mb-2">
                <span>{trip.from}</span>
                <div className="relative h-[1px] flex-1 bg-white/20 group-hover:bg-cyan-500 transition-colors" />
                <span>{trip.to}</span>
              </div>

              <div className="relative flex justify-between items-center pt-6 border-t border-white/10 mt-6">
                <div className="relative flex items-center gap-2 text-white/80">
                  <Clock size={16} />
                  <span className="font-mono text-sm">{trip.time}</span>
                </div>
                <span className="text-white/40 text-xs">{trip.note}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= DISCLAIMER ================= */}
      <div className="relative text-center max-w-4xl mx-auto">
        <p className="text-white/40 text-sm leading-relaxed mb-10">
          Point-to-point Earth travel is a long-term, exploratory capability.
          Routes, durations, and trajectories shown are illustrative only and do
          not represent commercial services, schedules, or offerings.
        </p>

        <Link
          href="/programs"
          className="text-cyan-400 text-sm font-semibold uppercase tracking-widest hover:text-white transition-colors"
        >
          ← Back to Programs Overview
        </Link>
      </div>
    </section>
    </>
  );
}

/* ================= GLOBE COMPONENT ================= */

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
      })),
    []
  );

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <GlobeTpl
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor="#06b6d4"
        atmosphereAltitude={0.18}
        onGlobeReady={() => {
          if (!globeRef.current) return;
          const controls = globeRef.current.controls();
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.35;
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
        arcColor={() => ["#22d3ee", "#38bdf8"]}
        arcAltitude={0.35}
        arcStroke={0.7}
        arcDashLength={0.6}
        arcDashGap={0.4}
        arcDashAnimateTime={4000}
        arcLabel={(d: any) => d.label}
      />
    </div>
  );
}
