"use client";

import { motion } from "framer-motion";
import { Clock, Globe2, ArrowUpRight, MapPin, Zap } from "lucide-react";
import Link from "next/link";
import { GLOBAL_ROUTES } from "../../lib/globalRoutes"; // Ensure this path is correct
import Navbar from "@/app/components/Navbar";

// 3D GLOBE IMPORTS
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

// ================= 3D GLOBE VISUALIZATION COMPONENTS =================

// Representative data just for the 3D graphic
const VISUALIZATION_DATA = [
  { start: [40.7, -74.0], end: [51.5, -0.1] },   // NYC -> LON
  { start: [35.6, 139.7], end: [34.0, -118.2] }, // TYO -> LAX
  { start: [25.2, 55.3], end: [-33.9, 151.2] },  // DXB -> SYD
  { start: [48.8, 2.3], end: [22.3, 114.1] },    // PAR -> HKG
  { start: [-33.9, 18.4], end: [-23.5, -46.6] }, // CPT -> SAO
];

function getPosition(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  return new THREE.Vector3(x, y, z);
}

// FIXED ARC COMPONENT (Solves bufferAttribute error)
function Arc({ start, end }: { start: number[]; end: number[] }) {
  const geometry = useMemo(() => {
    const startPos = getPosition(start[0], start[1], 2);
    const endPos = getPosition(end[0], end[1], 2);
    
    // Calculate arc height based on distance
    const midHeight = 2 + startPos.distanceTo(endPos) * 0.5;
    const mid = new THREE.Vector3()
      .addVectors(startPos, endPos)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(midHeight);
      
    const curve = new THREE.QuadraticBezierCurve3(startPos, mid, endPos);
    const points = curve.getPoints(40);

    // Create geometry directly from points
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [start, end]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color="#22d3ee"
        transparent
        opacity={0.5}
        linewidth={1}
      />
    </lineSegments>
  );
}

function GlobeVisual() {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base Sphere */}
      <Sphere args={[2, 64, 64]}>
        <meshBasicMaterial color="#050505" opacity={0.95} transparent />
      </Sphere>
      
      {/* Wireframe Overlay */}
      <Sphere args={[2.01, 32, 32]}>
        <meshBasicMaterial
          color="#083344"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Render Arcs & Markers */}
      {VISUALIZATION_DATA.map((t, i) => (
        <group key={i}>
          <Arc start={t.start} end={t.end} />
          
          {/* Start Dot */}
          <mesh position={getPosition(t.start[0], t.start[1], 2.02)}>
            <sphereGeometry args={[0.03]} />
            <meshBasicMaterial color="white" />
          </mesh>
          
          {/* End Dot */}
          <mesh position={getPosition(t.end[0], t.end[1], 2.02)}>
            <sphereGeometry args={[0.03]} />
            <meshBasicMaterial color="#22d3ee" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ================= MAIN PAGE COMPONENT =================

export default function RoutesPage() {
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-100 relative overflow-hidden">
        
        {/* GLOBAL BACKGROUND GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <section className="relative py-32 px-6 max-w-7xl mx-auto text-white">
          
          {/* ================= HEADER ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
              <Globe2 size={14} className="text-cyan-400" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-300 uppercase">
                Global Connectivity
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Conceptual <span className="text-cyan-400">Flight Corridors</span>
            </h1>
            <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed font-light">
              A global network of suborbital point-to-point routes derived from
              reusable launch system capabilities.
            </p>
          </motion.div>

          {/* ================= 3D GLOBE VISUALIZATION ================= */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full h-[500px] bg-black border border-white/10 rounded-3xl overflow-hidden mb-24 shadow-[0_0_50px_rgba(6,182,212,0.05)] group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_70%)] pointer-events-none transition-opacity duration-700 opacity-60 group-hover:opacity-100" />
            
            <Canvas camera={{ position: [0, 0, 5.5], fov: 40 }}>
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} />
              <GlobeVisual />
              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.5}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
              />
            </Canvas>

            {/* Overlay Label */}
            <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
              <span className="text-[10px] font-mono text-cyan-500/80 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                LIVE TRAJECTORY SIMULATION // SUBORBITAL
              </span>
            </div>
          </motion.div>

          {/* ================= ROUTE GRID ================= */}
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
              <MapPin className="text-cyan-400" size={20} />
              <h2 className="text-xl font-bold tracking-wide">Active Flight Profiles</h2>
              <span className="ml-auto text-xs text-white/40 font-mono hidden md:block">
                  STATUS: CONCEPTUAL // NOT FOR NAVIGATION
              </span>
          </div>

          <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {GLOBAL_ROUTES.map((route, i) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="relative group bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300"
              >
                {/* Route Header */}
                <div className="relative flex items-center justify-between mb-6">
                  <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Globe2 size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold tracking-wider text-white group-hover:text-cyan-400 transition-colors">
                        {route.fromCode}
                        <span className="text-white/30 mx-2">→</span>
                        {route.toCode}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-cyan-400 bg-cyan-900/10 px-2 py-1 rounded border border-cyan-500/20">
                    {route.trajectoryType || "BALLISTIC"}
                  </span>
                </div>

                {/* Cities */}
                <div className="relative text-white/70 text-sm leading-relaxed mb-4 font-light pl-13">
                  <div className="flex justify-between">
                    <span className="text-white font-medium">{route.fromCity}</span>
                    <span className="text-white/30 text-xs">{route.fromCountry}</span>
                  </div>
                  <div className="w-0.5 h-3 bg-white/10 ml-0.5 my-1" />
                  <div className="flex justify-between">
                    <span className="text-white font-medium">{route.toCity}</span>
                    <span className="text-white/30 text-xs">{route.toCountry}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="relative flex items-center justify-between pt-4 border-t border-white/10 mt-6 bg-black/20 -mx-6 -mb-6 px-6 py-4 rounded-b-2xl">
                  <div className="relative flex items-center gap-2 text-cyan-300">
                    <Clock size={14} />
                    <span className="font-mono text-sm font-bold tracking-wider">
                      {route.estimatedTimeMin} MIN
                    </span>
                  </div>

                  <span className="text-white/30 text-[9px] uppercase tracking-widest flex items-center gap-1">
                    <Zap size={10} />
                    {route.altitudeClass ? route.altitudeClass.replace("_", " ") : "SUBORBITAL"}
                  </span>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-cyan-500/30 transition-all pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* ================= FOOTER DISCLAIMER ================= */}
          <div className="relative max-w-4xl mx-auto text-center border-t border-white/10 pt-16">
            <p className="text-white/40 text-xs leading-relaxed mb-10 font-mono">
              * DISCLAIMER: All routes displayed on this page are conceptual and non-commercial.
              Durations, trajectories, and profiles are illustrative simulations only.
            </p>

            <Link
              href="/programs/point-to-point"
              className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors group"
            >
              Back to P2P overview
              <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
