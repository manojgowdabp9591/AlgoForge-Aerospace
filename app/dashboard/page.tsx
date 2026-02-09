"use client";

import { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import { motion } from "framer-motion";
import { Activity, Radio, Database, Server } from "lucide-react";

export default function Dashboard() {
  const [telemetry, setTelemetry] = useState({
    velocity: 24500, // km/h
    altitude: 408, // km
    lox: 98,
    methane: 98,
    pressure: 14.7, // psi (instrument bay)
  });

  // Simulated telemetry update (demo / internal)
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        velocity: prev.velocity + (Math.random() * 20 - 10),
        altitude: prev.altitude + (Math.random() * 0.05 - 0.02),
        lox: Math.max(0, prev.lox - 0.02),
        methane: Math.max(0, prev.methane - 0.02),
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
      {/* STATUS BAR */}
      <div className="flex flex-wrap gap-4 mb-8 border-b border-white/10 pb-6">
        <StatusBadge
          icon={Radio}
          label="Downlink Integrity"
          value="98%"
          color="text-green-400"
        />
        <StatusBadge
          icon={Database}
          label="Telemetry Throughput"
          value="4.2 GB/s"
          color="text-cyan-400"
        />
        <StatusBadge
          icon={Server}
          label="Command Latency"
          value="12 ms"
          color="text-white"
        />
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-cyan-400 font-mono font-bold text-xs tracking-widest uppercase">
            Simulated Feed
          </span>
        </div>
      </div>

      {/* PRIMARY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <LiveCard
          label="Orbital Velocity"
          value={telemetry.velocity.toFixed(0)}
          unit="km/h"
        />
        <LiveCard
          label="Mean Orbital Altitude"
          value={telemetry.altitude.toFixed(2)}
          unit="km"
        />

        {/* MISSION TIMER */}
        <div className="p-6 bg-black/40 border border-white/10 rounded-xl flex flex-col justify-center items-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition duration-500" />
          <span className="text-cyan-500 text-xs uppercase tracking-[0.2em] mb-2 font-semibold relative z-10 flex items-center gap-2">
            <Activity size={12} className="animate-spin-slow" />
            Mission Elapsed Time
          </span>
          <span className="text-4xl font-mono text-white font-bold relative z-10 tabular-nums tracking-widest">
            T+ 00:04:21
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* SYSTEM STATUS */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl h-fit backdrop-blur-sm">
          <h3 className="text-xs font-semibold mb-6 flex items-center gap-2 text-white/60 uppercase tracking-widest border-b border-white/10 pb-4">
            Subsystem Health
          </h3>
          <div className="space-y-4">
            <StatusRow label="GNC Computer" status="NOMINAL" />
            <StatusRow label="VORTEX-1 Engine Cluster" status="ACTIVE" />
            <StatusRow label="RCS Thrusters" status="STANDBY" />
            <StatusRow label="Thermal Control" status="NOMINAL" />
            <StatusRow label="Payload Interface" status="LOCKED" />
          </div>
        </div>

        {/* PROPELLANT */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl md:col-span-2 backdrop-blur-sm">
          <h3 className="text-xs font-semibold mb-6 text-white/60 uppercase tracking-widest border-b border-white/10 pb-4">
            Propellant Remaining
          </h3>

          <div className="space-y-8">
            <FuelGauge
              label="Liquid Oxygen (LOX)"
              value={telemetry.lox}
              color="bg-blue-500"
            />
            <FuelGauge
              label="Liquid Methane (CH₄)"
              value={telemetry.methane}
              color="bg-purple-500"
            />
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <DataBox
              label="Instrument Bay Pressure"
              value={`${telemetry.pressure.toFixed(1)} psi`}
            />
            <DataBox label="External Temp" value="-120 °C" />
            <DataBox label="Battery SOC" value="96.4%" />
            <DataBox label="Radiation Dose Rate" value="0.4 mSv" />
          </div>
        </div>
      </div>

      {/* FLIGHT LOG */}
      <div className="mt-8 bg-black border border-white/20 rounded-xl font-mono text-sm h-64 overflow-hidden shadow-2xl relative flex flex-col">
        <div className="bg-white/5 backdrop-blur px-4 py-2 border-b border-white/10 flex justify-between items-center">
          <span className="text-cyan-400 font-bold tracking-widest text-xs">
            /// VORTEX_FLIGHT_LOG
          </span>
        </div>

        <div className="p-4 overflow-y-auto space-y-2 text-green-400/80 leading-relaxed font-light scrollbar-hide">
          <LogEntry
            time="14:04:22"
            msg="Telemetry packet #4920 verified. CRC valid."
          />
          <LogEntry
            time="14:04:20"
            msg="Downlink bandwidth nominal. Signal integrity within limits."
          />
          <LogEntry
            time="14:03:55"
            msg="Stage 1 separation confirmed."
            highlight
          />
          <LogEntry time="14:03:45" msg="Main engine cutoff confirmed." />
          <LogEntry
            time="14:03:10"
            msg="Maximum dynamic pressure passed."
            highlight
          />
          <LogEntry time="14:00:00" msg="Liftoff confirmed. Vehicle ascending." highlight />
          <p className="text-white/30 mt-4 border-t border-white/10 pt-2">
            --- Pre-flight and ascent events archived ---
          </p>
        </div>
      </div>
    </PageLayout>
  );
}

/* ---------- COMPONENTS ---------- */

function LiveCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="group p-6 bg-black/40 border border-white/10 rounded-xl hover:border-cyan-500/40 transition relative overflow-hidden">
      <p className="text-white/50 text-xs uppercase tracking-[0.2em] font-semibold mb-2">
        {label}
      </p>
      <div className="flex items-baseline gap-2 mt-1">
        <h2 className="text-4xl font-mono font-bold text-white tabular-nums group-hover:text-cyan-400 transition">
          {value}
        </h2>
        <span className="text-cyan-500/70 text-sm font-semibold uppercase">
          {unit}
        </span>
      </div>
    </div>
  );
}

function StatusRow({ label, status }: { label: string; status: string }) {
  const nominal = ["NOMINAL", "ACTIVE", "CONNECTED"].includes(status);

  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <span className="text-white/70 font-mono text-xs uppercase tracking-tight">
        {label}
      </span>
      <span
        className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
          nominal
            ? "bg-green-500/10 text-green-400 border-green-500/20"
            : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

function FuelGauge({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2 font-mono text-xs">
        <span className="text-white/60 uppercase tracking-wider">
          {label}
        </span>
        <span className="text-white font-bold">
          {value.toFixed(1)}%
        </span>
      </div>
      <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/10">
        <motion.div
          className={`h-full ${color}`}
          animate={{ width: `${value}%` }}
          transition={{ ease: "linear", duration: 0.5 }}
        />
      </div>
    </div>
  );
}

function DataBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 bg-black/40 rounded border border-white/10">
      <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-lg font-mono text-white font-bold">{value}</p>
    </div>
  );
}

function StatusBadge({ icon: Icon, label, value, color }: any) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
      <Icon size={14} className={color} />
      <div className="flex flex-col leading-none">
        <span className="text-[9px] text-white/40 uppercase font-semibold tracking-wider">
          {label}
        </span>
        <span className={`text-xs font-mono font-bold ${color}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

function LogEntry({
  time,
  msg,
  highlight = false,
}: {
  time: string;
  msg: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex gap-3 text-xs font-mono ${
        highlight
          ? "text-white font-bold bg-white/5 -mx-2 px-2 py-1 rounded"
          : "text-green-400/70"
      }`}
    >
      <span className="opacity-50">[{time}]</span>
      <span>{msg}</span>
    </div>
  );
}
