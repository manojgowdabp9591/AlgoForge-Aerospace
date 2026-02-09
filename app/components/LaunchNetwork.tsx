"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState, useRef, useMemo } from 'react';
import { Globe, MapPin, Radio, Satellite } from "lucide-react";
import * as THREE from 'three';

// 1. DYNAMIC IMPORT (No SSR for Globe)
const GlobeTpl = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function LaunchNetwork() {
  return (
    <section className="relative w-full bg-transparent overflow-hidden flex items-center min-h-[800px] border-y border-white/10">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="grid lg:grid-cols-2 w-full h-full items-center relative z-10">
        
        {/* --- LEFT SIDE: TEXT --- */}
        <div className="relative z-20 px-6 md:pl-20 lg:pl-32 xl:pl-40 py-20 pointer-events-none">
          <div className="pointer-events-auto">
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-white leading-tight tracking-tight">
              Global Launch <br />
              <span className="text-cyan-500">Grid.</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl mb-12 leading-relaxed max-w-lg font-light">
              From equatorial orbits to polar insertions, <strong className="text-white">Vortex Aerospace</strong> operates from three strategic launch complexes. 
              We ensure orbital access anywhere, anytime, with rapid-response capabilities.
            </p>

            <div className="space-y-4 max-w-md">
              <LocationRow name="Vandenberg SFB, USA" type="Polar / Sun-Synch" id="US-W" />
              <LocationRow name="Sriharikota (SDSC), India" type="Equatorial / GTO" id="IN-E" />
              <LocationRow name="Mahia Peninsula, NZ" type="Rapid Response" id="NZ-S" />
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: GLOBE (Interactive) --- */}
        <div className="relative w-full h-[500px] lg:h-[900px] cursor-move">
          {/* Radial Gradient overlay to blend globe into background */}
          <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, #000 70%) pointer-events-none z-10"></div>
          <InteractiveGlobe />
        </div>

      </div>
    </section>
  );
}

// --- SUB-COMPONENTS ---

function LocationRow({ name, type, id }: { name: string, type: string, id: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-cyan-500/50 transition-all group backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-500 group-hover:text-white group-hover:bg-cyan-500 transition-colors">
            <MapPin size={18} />
        </div>
        <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">{name}</h3>
            <span className="text-[10px] text-white/40 font-mono">SITE ID: {id}</span>
        </div>
      </div>
      <span className="text-cyan-400 font-mono text-[10px] bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/20 uppercase tracking-widest">
        {type}
      </span>
    </div>
  );
}

// --- GLOBE LOGIC ---

function InteractiveGlobe() {
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  const [mounted, setMounted] = useState(false);

  // 1. RESIZE OBSERVER
  useEffect(() => {
    setMounted(true);
    
    const updateDimensions = () => {
        if (containerRef.current) {
            setDimensions({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight
            });
        }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // 2. SATELLITE DATA (Memoized)
  const satellites = useMemo(() => [
      { lat: 28.5, lng: -80.5, alt: 0.1, name: "VORTEX-1", type: "LEO" }, 
      { lat: 13.7, lng: 80.2, alt: 0.15, name: "VORTEX-2", type: "GTO" }, 
      { lat: -39.2, lng: 177.8, alt: 0.12, name: "VORTEX-3", type: "POLAR" },
      { lat: 51.5, lng: 0, alt: 0.2, name: "VORTEX-SAT", type: "COMM" },
      { lat: 35.6, lng: 139.6, alt: 0.18, name: "VORTEX-RELAY", type: "RELAY" },
  ], []);

  // 3. LAUNCH SITES (Points of Interest)
  const launchSites = useMemo(() => [
      { lat: 34.63, lng: -120.6, name: "Vandenberg", color: "#06b6d4" },
      { lat: 13.72, lng: 80.23, name: "Sriharikota", color: "#ef4444" },
      { lat: -39.26, lng: 177.86, name: "Mahia", color: "#eab308" }
  ], []);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="w-full h-full">
      <GlobeTpl
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        
        // Visuals
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor="#06b6d4" // Cyan atmosphere
        atmosphereAltitude={0.2}

        // Camera Control
        onGlobeReady={() => {
            if (globeEl.current) {
                const controls = globeEl.current.controls();
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.6;
                controls.enableZoom = false;
                
                // Adjust viewing angle
                const altitude = window.innerWidth < 768 ? 2.5 : 1.8;
                globeEl.current.pointOfView({ lat: 10, lng: 80, altitude });
            }
        }}

        // Launch Sites (Rings)
        ringsData={launchSites}
        ringColor="color"
        ringMaxRadius={8}
        ringPropagationSpeed={3}
        ringRepeatPeriod={800}

        // Satellites (Custom Objects)
        objectsData={satellites}
        objectLat="lat"
        objectLng="lng"
        objectAltitude="alt"
        objectLabel="name"
        objectThreeObject={() => {
          // Create a simple satellite representation
          const group = new THREE.Group();
          
          // Core
          const core = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 8, 8),
            new THREE.MeshLambertMaterial({ color: 0x22d3ee })
          );
          
          // Solar Panels
          const panels = new THREE.Mesh(
            new THREE.BoxGeometry(3, 0.1, 0.5),
            new THREE.MeshLambertMaterial({ color: 0xffffff })
          );

          group.add(core);
          group.add(panels);
          return group;
        }}
      />
    </div>
  );
}