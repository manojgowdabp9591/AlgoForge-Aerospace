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
        <div className="p-6 bg-black/40 border border-white/10 rounded-xl flex flex-col justify-center items-center">
            <span className="text-white/50 text-xs uppercase tracking-widest mb-2">Mission Timer</span>
            <span className="text-4xl font-mono text-cyan-400 font-bold">T+ 00:04:21</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: SYSTEM HEALTH */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl h-fit">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
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
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl md:col-span-2">
          <h3 className="text-lg font-bold mb-6">Consumables</h3>
          
          <FuelGauge label="Liquid Oxygen (LOX)" value={telemetry.lox} color="bg-blue-500" />
          <FuelGauge label="Liquid Methane (CH4)" value={telemetry.methane} color="bg-purple-500" />
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 bg-black/30 rounded border border-white/5">
                <p className="text-xs text-white/40">Cabin Pressure</p>
                <p className="text-xl font-mono">14.7 psi</p>
            </div>
            <div className="p-4 bg-black/30 rounded border border-white/5">
                <p className="text-xs text-white/40">Cabin Temp</p>
                <p className="text-xl font-mono">22.5°C</p>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM ROW: MISSION LOG */}
      <div className="mt-8 p-6 bg-black border border-white/10 rounded-xl font-mono text-sm h-48 overflow-y-auto">
        <p className="text-white/30 border-b border-white/10 pb-2 mb-2">MISSION EVENT LOG</p>
        <div className="space-y-1 text-green-400/80">
            <p>[14:04:20] Telemetry downlink established.</p>
            <p>[14:03:55] Stage 1 separation confirmed.</p>
            <p>[14:03:45] MECO (Main Engine Cut Off).</p>
            <p>[14:03:10] Max-Q dynamic pressure passed.</p>
            <p>[14:00:00] Liftoff confirmed.</p>
            <p className="text-white/30">--- Previous logs archived ---</p>
        </div>
      </div>

    </PageLayout>
  );
}

// --- SUB-COMPONENTS ---

function LiveCard({ label, value, unit }: { label: string, value: string, unit: string }) {
  return (
    <div className="p-6 bg-black/40 border border-white/10 rounded-xl">
      <p className="text-white/50 text-xs uppercase tracking-widest">{label}</p>
      <div className="flex items-baseline gap-2 mt-2">
        <h2 className="text-4xl font-mono font-bold text-white min-w-[120px] tabular-nums">
            {value}
        </h2>
        <span className="text-cyan-400 text-sm font-bold">{unit}</span>
      </div>
    </div>
  );
}

function StatusRow({ label, status }: { label: string, status: string }) {
  const isNominal = status === "NOMINAL" || status === "CONNECTED";
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-2">
      <span className="text-white/70">{label}</span>
      <span className={`font-mono text-sm font-bold px-2 py-1 rounded ${
        isNominal ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
      }`}>
        {status}
      </span>
    </div>
  );
}

function FuelGauge({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-white/80">{label}</span>
        <span className="text-sm font-mono text-cyan-400">{value.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
        <motion.div 
            className={`h-full ${color}`}
            initial={{ width: "100%" }}
            animate={{ width: `${value}%` }}
            transition={{ ease: "linear", duration: 0.5 }}
        />
      </div>
    </div>
  );
}