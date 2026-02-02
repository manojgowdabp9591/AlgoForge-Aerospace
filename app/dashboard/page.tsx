"use client";

import { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import { motion } from "framer-motion";

export default function Dashboard() {
  // State for simulated "Live" data
  const [telemetry, setTelemetry] = useState({
    velocity: 24500,
    altitude: 408,
    lox: 98,
    methane: 98,
  });

  // Effect to jitter numbers to make them feel "alive"
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        velocity: prev.velocity + (Math.random() * 10 - 2), // Fluctuates
        altitude: prev.altitude + (Math.random() * 0.1 - 0.05), // Fluctuates slightly
        lox: Math.max(0, prev.lox - 0.05), // Slowly drains
        methane: Math.max(0, prev.methane - 0.05), // Slowly drains
      }));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageLayout
      title="Mission Control"
      subtitle="Live telemetry from SG-1 Orbital Vehicle."
    >
      {/* TOP ROW: KEY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <LiveCard label="Velocity" value={telemetry.velocity.toFixed(0)} unit="km/h" />
        <LiveCard label="Altitude" value={telemetry.altitude.toFixed(2)} unit="km" />
        
        {/* MISSION TIMER (Upgraded) */}
        <div className="p-6 bg-black/40 border border-white/10 rounded-xl flex flex-col justify-center items-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition duration-500"></div>
            <span className="text-cyan-500 text-xs uppercase tracking-[0.2em] mb-2 font-bold relative z-10 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                Mission Clock
            </span>
            <span className="text-4xl font-mono text-white font-bold relative z-10 tabular-nums">
                T+ 00:04:21
            </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: SYSTEM HEALTH (Glass Effect) */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl h-fit backdrop-blur-sm">
          <h3 className="text-sm font-bold mb-6 flex items-center gap-2 text-white/60 uppercase tracking-widest border-b border-white/10 pb-4">
            System Status
          </h3>
          <div className="space-y-4">
            <StatusRow label="Guidance & Nav" status="NOMINAL" />
            <StatusRow label="Propulsion (Stage 1)" status="NOMINAL" />
            <StatusRow label="Propulsion (Stage 2)" status="NOMINAL" />
            <StatusRow label="Life Support" status="STANDBY" />
            <StatusRow label="Comms Uplink" status="CONNECTED" />
          </div>
        </div>

        {/* CENTER COLUMN: PROPELLANT LEVELS */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl md:col-span-2 backdrop-blur-sm">
          <h3 className="text-sm font-bold mb-6 text-white/60 uppercase tracking-widest border-b border-white/10 pb-4">
            Consumables
          </h3>
          
          <div className="space-y-6">
            <FuelGauge label="Liquid Oxygen (LOX)" value={telemetry.lox} color="bg-blue-500" />
            <FuelGauge label="Liquid Methane (CH4)" value={telemetry.methane} color="bg-purple-500" />
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <DataBox label="Cabin Pressure" value="14.7 psi" />
            <DataBox label="Cabin Temp" value="22.5°C" />
          </div>
        </div>

      </div>

      {/* BOTTOM ROW: MISSION LOG (Terminal Style) */}
      <div className="mt-8 p-6 bg-black border border-white/20 rounded-xl font-mono text-sm h-48 overflow-y-auto shadow-inner relative">
        <div className="sticky top-0 bg-black/90 backdrop-blur pb-2 border-b border-white/10 mb-2 flex justify-between items-center">
             <span className="text-cyan-400 font-bold tracking-widest text-xs">/// MISSION_EVENT_LOG</span>
             <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500/50"></span>
                <span className="w-2 h-2 rounded-full bg-yellow-500/50"></span>
                <span className="w-2 h-2 rounded-full bg-green-500/50"></span>
             </span>
        </div>
        
        <div className="space-y-1 text-green-400/80 leading-relaxed">
            <p><span className="text-white/30 mr-3">[14:04:20]</span> Telemetry downlink established <span className="animate-pulse">_</span></p>
            <p><span className="text-white/30 mr-3">[14:03:55]</span> Stage 1 separation confirmed.</p>
            <p><span className="text-white/30 mr-3">[14:03:45]</span> MECO (Main Engine Cut Off).</p>
            <p><span className="text-white/30 mr-3">[14:03:10]</span> Max-Q dynamic pressure passed.</p>
            <p><span className="text-white/30 mr-3">[14:00:00]</span> Liftoff confirmed.</p>
            <p className="text-white/30 mt-4 opacity-50">--- Previous logs archived ---</p>
        </div>
      </div>

    </PageLayout>
  );
}

// --- SUB-COMPONENTS ---

function LiveCard({ label, value, unit }: { label: string, value: string, unit: string }) {
  return (
    <div className="group p-6 bg-black/40 border border-white/10 rounded-xl hover:border-cyan-500/50 transition duration-500 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition">
        <div className="w-16 h-16 bg-cyan-400 blur-2xl rounded-full"></div>
      </div>
      
      <p className="text-white/50 text-xs uppercase tracking-[0.2em] font-bold">{label}</p>
      <div className="flex items-baseline gap-2 mt-2">
        <h2 className="text-4xl font-mono font-bold text-white min-w-[120px] tabular-nums group-hover:text-cyan-400 transition duration-300">
            {value}
        </h2>
        <span className="text-cyan-500/70 text-sm font-bold">{unit}</span>
      </div>
    </div>
  );
}

function StatusRow({ label, status }: { label: string, status: string }) {
  const isNominal = status === "NOMINAL" || status === "CONNECTED";
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <span className="text-white/70 font-mono text-sm">{label}</span>
      <span className={`font-mono text-xs font-bold px-2 py-1 rounded border ${
        isNominal 
        ? "bg-green-500/10 text-green-400 border-green-500/20" 
        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      }`}>
        {status}
      </span>
    </div>
  );
}

function FuelGauge({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-2 font-mono text-xs">
        <span className="text-white/60">{label}</span>
        <span className="text-white font-bold">{value.toFixed(1)}%</span>
      </div>
      {/* Striped Background for Technical Look */}
      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden relative">
        <motion.div 
            className={`h-full ${color} shadow-[0_0_10px_currentColor]`}
            initial={{ width: "100%" }}
            animate={{ width: `${value}%` }}
            transition={{ ease: "linear", duration: 0.5 }}
        />
      </div>
    </div>
  );
}

function DataBox({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-4 bg-black/40 rounded border border-white/10 hover:border-white/30 transition">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{label}</p>
            <p className="text-xl font-mono text-white">{value}</p>
        </div>
    );
}