"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { Globe } from "lucide-react";
import * as THREE from 'three';

// 1. DYNAMIC IMPORT
const GlobeTpl = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function LaunchNetwork() {
  return (
    // SECTION: Removed 'container' to allow full-width expansion
    <section className="relative w-full bg-transparent/80 overflow-hidden flex items-center min-h-[800px]">
      
      <div className="grid lg:grid-cols-2 w-full h-full items-center">
        
        {/* --- LEFT SIDE: TEXT (Manually padded to match site container) --- */}
        <div className="relative z-20 px-6 md:pl-20 lg:pl-32 xl:pl-40 py-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white leading-tight">
            Global Launch <br />
            <span className="text-cyan-400">Capability</span>
          </h2>
          <p className="text-white/70 text-xl mb-12 leading-relaxed max-w-lg">
            From equatorial orbits to polar insertions, Space Gen operates from three strategic launch complexes worldwide to ensure orbital access anywhere, anytime.
          </p>

          <div className="space-y-6 max-w-md">
            <LocationRow name="Vandenberg, USA" type="Polar / Sun-Synch" />
            <LocationRow name="Sriharikota, India" type="Equatorial / GTO" />
            <LocationRow name="Mahia Peninsula, NZ" type="Rapid Response" />
          </div>
        </div>

        {/* --- RIGHT SIDE: GLOBE (Full Bleed to Right Edge) --- */}
        {/* MOBILE UPDATE: Changed h-[600px] to h-[450px] for better mobile fit */}
        <div className="relative w-full h-[450px] lg:h-[900px] bg-radial-gradient(circle at center, rgba(34,211,238,0.05) 0%, transparent 60%) border-l border-white/5">
          {/* We remove rounded corners here to let it touch the edge */}
          <InteractiveGlobe />
        </div>

      </div>
    </section>
  );
}

// --- SUB-COMPONENTS ---

function LocationRow({ name, type }: { name: string, type: string }) {
  return (
    <div className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/50 transition-all cursor-crosshair group backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
            <Globe size={20} className="group-hover:rotate-180 transition-transform duration-700" />
        </div>
        <h3 className="text-lg font-bold text-white">{name}</h3>
      </div>
      <span className="text-cyan-400 font-mono text-xs bg-cyan-500/5 px-2 py-1 rounded border border-cyan-500/20">
        {type}
      </span>
    </div>
  );
}

// --- GLOBE LOGIC ---

function InteractiveGlobe() {
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [satellites, setSatellites] = useState<any[]>([]);
  // Start large to prevent "vanishing" bug
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  const [mounted, setMounted] = useState(false);

  // 1. RESIZE OBSERVER
  useEffect(() => {
    setMounted(true);
    if (containerRef.current) {
        setDimensions({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight
        });
    }
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) setDimensions({ width, height });
      }
    });
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // 2. DEFINE SATELLITES
  useEffect(() => {
    const initialSatellites = [
      { lat: 28.5, lng: -80.5, alt: 0.15, name: "SpaceGen 1", type: "COMM" }, 
      { lat: 5.2, lng: -52.7, alt: 0.2, name: "SpaceGen 2", type: "OBS" }, 
      { lat: 34.7, lng: -120.5, alt: 0.25, name: "SpaceGen 3", type: "OBS" },
      { lat: -39.2, lng: 177.8, alt: 0.18, name: "SpaceGen 4", type: "POLAR" },
      { lat: 13.7, lng: 80.2, alt: 0.22, name: "SpaceGen 5", type: "COMM" },
    ];
    setSatellites(initialSatellites);
  }, []);

  // 3. ANIMATION LOOP
  useEffect(() => {
    const interval = setInterval(() => {
      setSatellites((prev) =>
        prev.map((sat) => ({
          ...sat,
          lng: (sat.lng + 0.15) % 360, 
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="w-full h-full cursor-move">
      <GlobeTpl
        ref={globeEl}

        // --- THIS FIXES THE ROTATION ---
        onGlobeReady={() => {
            if (globeEl.current) {
                const controls = globeEl.current.controls();
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.5;
                // Auto-adjust camera for mobile vs desktop
                const altitude = window.innerWidth < 768 ? 3.5 : 2.0;
                globeEl.current.pointOfView({ lat: 20, lng: 0, altitude });
            }
        }}

        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor="#00aaff"
        atmosphereAltitude={0.15}
        
        objectsData={satellites}
        objectLat="lat"
        objectLng="lng"
        objectAltitude="alt"
        objectLabel="name"
        
        // --- CUSTOM SATELLITE BUILDER ---
        objectThreeObject={() => {
          const satGroup = new THREE.Group();
          
          // Body
          const bodyGeom = new THREE.BoxGeometry(0.5, 0.5, 0.5);
          const bodyMat = new THREE.MeshLambertMaterial({ color: 0xffd700 });
          const body = new THREE.Mesh(bodyGeom, bodyMat);
          satGroup.add(body);

          // Panels
          const panelGeom = new THREE.BoxGeometry(2.5, 0.1, 0.8);
          const panelMat = new THREE.MeshLambertMaterial({ color: 0x00aaff });
          const panels = new THREE.Mesh(panelGeom, panelMat);
          satGroup.add(panels);

          // Glow
          const glowGeom = new THREE.SphereGeometry(2, 8, 8);
          const glowMat = new THREE.MeshBasicMaterial({ 
             color: 0x00ffff, 
             transparent: true, 
             opacity: 0.15 
          });
          const glow = new THREE.Mesh(glowGeom, glowMat);
          satGroup.add(glow);

          return satGroup;
        }}
      />
    </div>
  );
}