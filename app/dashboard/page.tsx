"use client";

import { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Radio, Database, Server, Cpu, Thermometer, Wind, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const [telemetry, setTelemetry] = useState({
    velocity: 24500, // km/h
    altitude: 408, // km
    lox: 98,
    methane: 98,
    pressure: 14.7, // psi
  });

  // Simulated telemetry update
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        velocity: prev.velocity + (Math.random() * 20 - 10),
        altitude: prev.altitude + (Math.random() * 0.05 - 0.02),
        lox: Math.max(0, prev.lox - 0.02),
        methane: Math.max(0, prev.methane - 0.025),
        pressure: 14.7 + (Math.random() * 0.1 - 0.05),
      }));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageLayout
      title="Mission Control"
      subtitle="Simulated operational telemetry for the VTX-1 orbital vehicle."
    >
      <div className="relative min-h-screen">
        
        {/* CRT SCANLINE OVERLAY */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none" />

        <div className="relative z-10 space-y-6">
            
            {/* 1. STATUS HEADER */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-md">
                <StatusBadge icon={Radio} label="Downlink" value="98%" color="text-emerald-400" sub="SIGNAL STRONG" />
                <StatusBadge icon={Database} label="Throughput" value="4.2 GB/s" color="text-cyan-400" sub="NOMINAL" />
                <StatusBadge icon={Server} label="Latency" value="12 ms" color="text-white" sub="LOW" />
                <div className="flex items-center justify-end gap-3 pr-4 border-l border-white/10">
                    <div className="text-right">
                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Data Source</p>
                        <p className="text-xs text-cyan-400 font-bold uppercase animate-pulse">Live Telemetry</p>
                    </div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] animate-pulse" />
                </div>
            </div>

            {/* 2. PRIMARY HUD (Velocity / Timer / Altitude) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <LiveCard 
                    label="Orbital Velocity" 
                    value={telemetry.velocity.toFixed(0)} 
                    unit="km/h" 
                    trend="up"
                />
                
                {/* CENTRAL TIMER */}
                <div className="relative p-1 bg-black/60 border border-white/10 rounded-2xl overflow-hidden group">
                    <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition duration-500" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
                    
                    <div className="h-full flex flex-col justify-center items-center py-8">
                        <div className="flex items-center gap-2 mb-2 text-cyan-500 text-[10px] font-bold tracking-[0.3em] uppercase">
                            <Activity size={12} className="animate-[spin_4s_linear_infinite]" />
                            Mission Elapsed Time
                        </div>
                        <div className="text-5xl font-mono font-black text-white tracking-widest tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            T+ 00:04:21
                        </div>
                    </div>
                </div>

                <LiveCard 
                    label="Orbital Altitude" 
                    value={telemetry.altitude.toFixed(2)} 
                    unit="km" 
                    trend="stable"
                />
            </div>

            <div className="grid md:grid-cols-12 gap-6">
                
                {/* 3. SYSTEM HEALTH (Left Col) */}
                <div className="md:col-span-4 bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                            <Cpu size={14} /> Systems Check
                        </h3>
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">ALL SYSTEMS GO</span>
                    </div>
                    <div className="space-y-3">
                        <StatusRow label="GNC Computer" status="NOMINAL" />
                        <StatusRow label="RDE Propulsion" status="ACTIVE" highlight />
                        <StatusRow label="RCS Thrusters" status="STANDBY" />
                        <StatusRow label="Thermal Loops" status="NOMINAL" />
                        <StatusRow label="Payload Lock" status="SECURED" />
                    </div>
                </div>

                {/* 4. PROPELLANT & ENV (Right Col) */}
                <div className="md:col-span-8 bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative">
                    <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                            <Wind size={14} /> Consumables & Environment
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <FuelGauge 
                            label="Liquid Oxygen (LOX)" 
                            value={telemetry.lox} 
                            color="bg-gradient-to-r from-blue-600 to-cyan-400" 
                        />
                        <FuelGauge 
                            label="Liquid Methane (CH₄)" 
                            value={telemetry.methane} 
                            color="bg-gradient-to-r from-purple-600 to-pink-500" 
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <DataBox label="Cabin Pressure" value={`${telemetry.pressure.toFixed(2)} psi`} icon={Wind} />
                        <DataBox label="External Temp" value="-120.4 °C" icon={Thermometer} />
                        <DataBox label="Battery Bank" value="96.4 %" icon={ZapIcon} />
                        <DataBox label="Radiation" value="0.4 mSv" icon={AlertCircle} warning />
                    </div>
                </div>
            </div>

            {/* 5. FLIGHT TERMINAL */}
            <div className="bg-black border border-white/20 rounded-xl overflow-hidden shadow-2xl flex flex-col h-64 font-mono text-xs">
                <div className="bg-white/10 px-4 py-2 flex justify-between items-center border-b border-white/10">
                    <span className="text-cyan-400 font-bold tracking-widest">/// VTX_FLIGHT_LOG_01</span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-1.5 text-emerald-500/90 font-light opacity-90">
                    <LogEntry time="14:04:22" msg="Telemetry packet #4920 verified. CRC check passed." />
                    <LogEntry time="14:04:20" msg="Downlink bandwidth nominal. Signal integrity 98%." />
                    <LogEntry time="14:03:55" msg="EVENT: Stage 1 separation confirmed." highlight />
                    <LogEntry time="14:03:45" msg="MECO (Main Engine Cutoff) confirmed." />
                    <LogEntry time="14:03:10" msg="Max-Q dynamic pressure passed." highlight />
                    <LogEntry time="14:00:00" msg="LIFTOFF. Clock started." highlight />
                    <div className="h-4" />
                    <p className="text-white/20">--- SYSTEM LOG ARCHIVE INITIALIZED ---</p>
                </div>
            </div>

        </div>
      </div>
    </PageLayout>
  );
}

/* ---------- SUB-COMPONENTS ---------- */

// 1. Live Metric Card
function LiveCard({ label, value, unit, trend }: any) {
  return (
    <div className="relative group p-6 bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500">
      {/* Background Graph Mockup */}
      <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity">
         <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
             <path d="M0 60 L20 40 L40 50 L60 20 L80 30 L100 10 L120 40" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
         </svg>
      </div>
      
      <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-bold mb-1 flex justify-between">
        {label}
        {trend === "up" && <span className="text-emerald-400">▲</span>}
      </p>
      <div className="flex items-baseline gap-2 relative z-10">
        <h2 className="text-5xl font-mono font-bold text-white tabular-nums tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          {value}
        </h2>
        <span className="text-cyan-500 text-sm font-bold uppercase">{unit}</span>
      </div>
    </div>
  );
}

// 2. Fuel Gauge (Liquid Style)
function FuelGauge({ label, value, color }: any) {
  return (
    <div className="group">
      <div className="flex justify-between mb-2 font-mono text-xs">
        <span className="text-white/60 uppercase tracking-widest font-bold">{label}</span>
        <span className="text-white font-bold">{value.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden border border-white/10 p-0.5">
        <motion.div
          className={`h-full rounded-full ${color} shadow-[0_0_10px_currentColor]`}
          animate={{ width: `${value}%` }}
          transition={{ ease: "linear", duration: 0.5 }}
        />
      </div>
    </div>
  );
}

// 3. Status Badge (Header)
function StatusBadge({ icon: Icon, label, value, color, sub }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg bg-white/5 border border-white/5 ${color}`}>
        <Icon size={18} />
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] text-white/40 uppercase font-bold tracking-wider">{label}</span>
        <div className="flex items-baseline gap-2">
            <span className={`text-sm font-mono font-bold ${color}`}>{value}</span>
            <span className="text-[8px] text-white/30 hidden lg:block">{sub}</span>
        </div>
      </div>
    </div>
  );
}

// 4. Data Box (Small Metrics)
function DataBox({ label, value, icon: Icon, warning }: any) {
  return (
    <div className={`p-4 bg-black/40 rounded-xl border ${warning ? 'border-yellow-500/30' : 'border-white/10'} hover:bg-white/5 transition`}>
      <div className="flex justify-between items-start mb-2">
         {Icon && <Icon size={14} className={warning ? 'text-yellow-500' : 'text-cyan-500'} />}
         {warning && <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />}
      </div>
      <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-lg font-mono text-white font-bold tracking-tight">{value}</p>
    </div>
  );
}

// 5. Status Row (Systems)
function StatusRow({ label, status, highlight }: any) {
  const nominal = ["NOMINAL", "ACTIVE", "SECURED"].includes(status);
  return (
    <div className={`flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0 ${highlight ? 'bg-white/[0.03] -mx-2 px-2 py-1 rounded' : ''}`}>
      <span className="text-white/70 font-mono text-[10px] uppercase tracking-wider">{label}</span>
      <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border ${
        nominal 
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      }`}>
        {status}
      </span>
    </div>
  );
}

// 6. Log Entry
function LogEntry({ time, msg, highlight }: any) {
  return (
    <div className={`flex gap-3 text-[10px] font-mono border-l-2 pl-3 ${highlight ? 'border-cyan-500 text-white bg-white/5 py-1' : 'border-transparent text-emerald-500/70'}`}>
      <span className="opacity-50 select-none">[{time}]</span>
      <span className="tracking-tight">{msg}</span>
    </div>
  );
}

// Helper for Missing Icon
function ZapIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
}
