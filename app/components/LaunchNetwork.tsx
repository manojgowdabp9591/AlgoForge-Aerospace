"use client";
import dynamic from "next/dynamic";

// Lazy load Earth to prevent lag
const EarthOrbit = dynamic(() => import("./EarthOrbit"), { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-cyan-400">Loading Map...</div>
});

export default function LaunchNetwork() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* TEXT CONTENT */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
            Global Launch Capability
          </h2>
          <p className="text-white/60 text-base md:text-lg mb-8 text-center md:text-left">
            From equatorial orbits to polar insertions, Space Gen operates from three strategic launch complexes worldwide.
          </p>
          
          <div className="space-y-4">
            <LocationItem name="Vandenberg, USA" type="Polar / Sun-Synch" />
            <LocationItem name="Sriharikota, India" type="Equatorial / GTO" />
            <LocationItem name="Mahia Peninsula, NZ" type="Rapid Response" />
          </div>
        </div>

        {/* VISUALS: 3D EARTH (Visible on All Devices) */}
        <div className="order-1 md:order-2 h-[300px] md:h-[400px] w-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            {/* Render 3D Earth on Mobile AND Desktop */}
            <div className="w-full h-full">
                <EarthOrbit />
            </div>
        </div>

      </div>
    </section>
  );
}

function LocationItem({ name, type }: { name: string, type: string }) {
    return (
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <span className="font-bold text-white text-sm md:text-base">{name}</span>
            <span className="text-xs md:text-sm font-mono text-cyan-400">{type}</span>
        </div>
    )
}