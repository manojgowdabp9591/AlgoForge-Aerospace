"use client";

import { useState, useEffect, useRef } from "react";
import PageLayout from "../components/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, Radio, Database, Server, Cpu,
  Thermometer, Wind, AlertCircle, MapPin,
  ChevronRight, Zap, Target, Clock, Rocket
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area
} from "recharts";

// ─── TYPES ───────────────────────────────────────────────
interface TelemetryState {
  velocity: number;
  altitude: number;
  lox: number;
  methane: number;
  pressure: number;
  accel: number;
  pitch: number;
  roll: number;
  thrust: number;
  motor_temp: number;
  battery: number;
  signal: number;
  stage: number;
  latitude: number;
  longitude: number;
}

interface DataPoint {
  t: number;
  altitude: number;
  velocity: number;
  thrust: number;
  accel: number;
}

const STAGE_LABELS = ["PRE-LAUNCH", "BOOST", "COAST", "APOGEE", "DESCENT", "LANDED"];
const STAGE_COLORS = ["#6b7280", "#f97316", "#3b82f6", "#8b5cf6", "#10b981", "#22d3ee"];

// ─── MAIN COMPONENT ──────────────────────────────────────
export default function Dashboard() {
  const [telemetry, setTelemetry] = useState<TelemetryState>({
    velocity: 0, altitude: 0, lox: 100, methane: 100,
    pressure: 14.7, accel: 0, pitch: 0, roll: 0, thrust: 0,
    motor_temp: 22, battery: 100, signal: -45, stage: 0,
    latitude: 28.6083, longitude: -80.6043, // Default to Pad 39A
  });

  const [globalStatus, setGlobalStatus] = useState("STANDBY");
  const [history, setHistory] = useState<DataPoint[]>([]);
  const [missionTime, setMissionTime] = useState(-60); 
  const [maxAlt, setMaxAlt] = useState(0);
  const [maxVel, setMaxVel] = useState(0);
  const [connectionError, setConnectionError] = useState(false);
  const tRef = useRef(0);
  const [activeTab, setActiveTab] = useState<"charts" | "map" | "terminal">("charts");
  const [logs, setLogs] = useState<{time: string, msg: string, type: string}[]>([]);

  // ─── LIVE API CONNECTION ───
  useEffect(() => {
    const fetchLiveTelemetry = async () => {
      try {
        const res = await fetch("/api/mission");
        if (!res.ok) throw new Error("Uplink failed");
        
        const data = await res.json();
        
        // Update state from global API
        setTelemetry(prev => ({ ...prev, ...data.telemetry }));
        setMissionTime(data.missionTime);
        setMaxAlt(data.maxAlt);
        setMaxVel(data.maxVel);
        setGlobalStatus(data.status);
        
        // Map global events to local logs
        if (data.events) {
            setLogs(data.events.map((e: any) => ({
                time: new Date(e.time).toLocaleTimeString("en-GB"),
                msg: e.msg,
                type: e.type
            })));
        }

        setConnectionError(false);
        tRef.current += 0.5;

        // Push to chart history
        setHistory(prev => {
          const point: DataPoint = {
            t: parseFloat(tRef.current.toFixed(1)),
            altitude: data.telemetry.altitude,
            velocity: data.telemetry.velocity,
            thrust: data.telemetry.thrust,
            accel: data.telemetry.accel,
          };
          return [...prev.slice(-80), point]; // Keep last 80 points
        });

      } catch (err) {
        setConnectionError(true);
      }
    };

    fetchLiveTelemetry(); // Initial fetch
    const interval = setInterval(fetchLiveTelemetry, 500); // Poll every 500ms

    return () => clearInterval(interval);
  }, []);

  // Format mission time (handles T- and T+)
  const formatTime = (s: number) => {
    const isNeg = s < 0;
    const abs = Math.abs(s);
    const h = Math.floor(abs / 3600).toString().padStart(2, "0");
    const m = Math.floor((abs % 3600) / 60).toString().padStart(2, "0");
    const sec = (abs % 60).toString().padStart(2, "0");
    return `T${isNeg ? "-" : "+"} ${h}:${m}:${sec}`;
  };

  return (
    <PageLayout
      title="Mission Control"
      subtitle="Live public telemetry feed for the Orbiton-2 orbital vehicle."
    >
      <div className="relative min-h-screen">

        {/* CRT SCANLINE OVERLAY */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none" />

        <div className="relative z-10 space-y-4">

          {/* ── 1. STATUS HEADER ── */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-md">
            <StatusBadge icon={Radio} label="Downlink" value={connectionError ? "OFFLINE" : "ACTIVE"} color={connectionError ? "text-red-500" : "text-emerald-400"} sub={connectionError ? "RECONNECTING..." : "SIGNAL STRONG"} />
            <StatusBadge icon={Rocket} label="Flight Status" value={globalStatus} color={globalStatus === "LIVE" ? "text-red-400 animate-pulse" : "text-cyan-400"} sub="GLOBAL_STATE" />
            <StatusBadge icon={Server} label="Latency" value={connectionError ? "ERR" : "24 ms"} color="text-white" sub="LOW" />
            <StatusBadge icon={Target} label="Stage" value={STAGE_LABELS[telemetry.stage] || "UNKNOWN"} color="text-orange-400" sub={`STAGE ${telemetry.stage + 1}`} />
            <div className="flex items-center justify-end gap-3 pr-4 border-l border-white/10">
              <div className="text-right">
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Data Source</p>
                <p className={`text-xs font-bold uppercase ${connectionError ? 'text-red-500' : 'text-cyan-400 animate-pulse'}`}>
                    {connectionError ? "UPLINK LOST" : "Live Telemetry"}
                </p>
              </div>
              <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] animate-pulse ${connectionError ? 'bg-red-500 text-red-500' : 'bg-cyan-400 text-cyan-400'}`} />
            </div>
          </div>

          {/* ── 2. PRIMARY HUD ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <LiveCard label="Orbital Velocity" value={telemetry.velocity.toFixed(0)} unit="m/s" trend={telemetry.velocity > 0 ? "up" : "stable"} sub={`MAX: ${maxVel.toFixed(0)} m/s`} />

            {/* CENTRAL TIMER */}
            <div className="relative p-1 bg-black/60 border border-white/10 rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition duration-500" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60" />
              <div className="h-full flex flex-col justify-center items-center py-6">
                <div className="flex items-center gap-2 mb-2 text-cyan-500 text-[10px] font-bold tracking-[0.3em] uppercase">
                  <Activity size={12} className={connectionError ? "" : "animate-[spin_4s_linear_infinite]"} />
                  Mission Elapsed Time
                </div>
                <div className={`text-4xl md:text-5xl font-mono font-black tracking-widest tabular-nums ${missionTime < 0 ? 'text-yellow-400' : 'text-white'} drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]`}>
                  {formatTime(missionTime)}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="px-3 py-1 rounded-full text-[10px] font-bold border"
                    style={{
                      color: STAGE_COLORS[telemetry.stage] || "#fff",
                      borderColor: (STAGE_COLORS[telemetry.stage] || "#fff") + "44",
                      background: (STAGE_COLORS[telemetry.stage] || "#fff") + "11"
                    }}>
                    {STAGE_LABELS[telemetry.stage] || "AWAITING DATA"}
                  </div>
                </div>
              </div>
            </div>

            <LiveCard label="Orbital Altitude" value={telemetry.altitude.toFixed(1)} unit="m" trend={telemetry.altitude > 0 ? "up" : "stable"} sub={`MAX: ${maxAlt.toFixed(1)} m`} />
          </div>

          {/* ── 3. SECONDARY METRICS ROW ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MiniMetric label="Thrust" value={`${(telemetry.thrust / 1000).toFixed(1)} kN`} color="text-orange-400" icon={Zap} />
            <MiniMetric label="Acceleration" value={`${telemetry.accel.toFixed(1)} m/s²`} color="text-purple-400" icon={Activity} />
            <MiniMetric label="Pitch" value={`${telemetry.pitch.toFixed(1)}°`} color="text-yellow-400" icon={Target} />
            <MiniMetric label="Motor Temp" value={`${telemetry.motor_temp.toFixed(0)} °C`} color="text-red-400" icon={Thermometer} />
          </div>

          {/* ── 4. MAIN BODY ── */}
          <div className="grid md:grid-cols-12 gap-4">

            {/* LEFT: SYSTEMS + PROPELLANT */}
            <div className="md:col-span-4 flex flex-col gap-4">

              {/* Systems Check */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                  <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                    <Cpu size={13} /> Systems Check
                  </h3>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">ALL GO</span>
                </div>
                <div className="space-y-2.5">
                  <StatusRow label="GNC Computer" status="NOMINAL" />
                  <StatusRow label="VORTEX-1 Engine" status={globalStatus === "LIVE" ? "ACTIVE" : "STANDBY"} highlight={globalStatus === "LIVE"} />
                  <StatusRow label="RCS Thrusters" status="STANDBY" />
                  <StatusRow label="Thermal Loops" status="NOMINAL" />
                  <StatusRow label="Payload Lock" status="SECURED" />
                  <StatusRow label="AFSS Safety" status="ARMED" highlight />
                  <StatusRow label="Grid Fins" status="STOWED" />
                </div>
              </div>

              {/* Propellants */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
                <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                  <Wind size={13} /> Propellants
                </h3>
                <div className="space-y-4">
                  <FuelGauge label="LOX (LO₂)" value={telemetry.lox} color="bg-gradient-to-r from-blue-600 to-cyan-400" />
                  <FuelGauge label="LCH₄ (Methane)" value={telemetry.methane} color="bg-gradient-to-r from-purple-600 to-pink-500" />
                </div>
              </div>

              {/* Environment */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center">
                    <MapPin size={20} className="text-emerald-400 mb-2" />
                    <span className="text-[9px] text-white/40 font-bold tracking-widest uppercase mb-1">LATITUDE</span>
                    <span className="text-lg font-mono text-white">{telemetry.latitude.toFixed(4)}°</span>
                </div>
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center">
                    <MapPin size={20} className="text-blue-400 mb-2" />
                    <span className="text-[9px] text-white/40 font-bold tracking-widest uppercase mb-1">LONGITUDE</span>
                    <span className="text-lg font-mono text-white">{telemetry.longitude.toFixed(4)}°</span>
                </div>
              </div>

            </div>

            {/* RIGHT: CHARTS / MAP / TERMINAL */}
            <div className="md:col-span-8 flex flex-col gap-4">

              {/* Tab Navigation */}
              <div className="flex gap-1 bg-white/[0.03] border border-white/10 rounded-xl p-1">
                {(["charts", "map", "terminal"] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${
                      activeTab === tab
                        ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                        : "text-white/40 hover:text-white"
                    }`}>
                    {tab}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">

                {/* CHARTS TAB */}
                {activeTab === "charts" && (
                  <motion.div key="charts"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                    className="flex flex-col gap-4">

                    <ChartCard label="ALTITUDE (m)" dataKey="altitude" data={history} color="#22d3ee" unit="m" />
                    <ChartCard label="VELOCITY (m/s)" dataKey="velocity" data={history} color="#3b82f6" unit="m/s" />
                    <ChartCard label="THRUST (N)" dataKey="thrust" data={history} color="#f97316" unit="N" />

                  </motion.div>
                )}

                {/* MAP TAB */}
                {activeTab === "map" && (
                  <motion.div key="map"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                    className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">

                    {/* Simulated SVG Map */}
                    <div className="relative h-[480px] bg-[#050508] flex items-center justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0a0a1a_0%,#050508_70%)]" />
                      
                      {/* Grid lines */}
                      <svg className="absolute inset-0 w-full h-full opacity-10">
                        {[...Array(10)].map((_, i) => (
                          <g key={i}>
                            <line x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="#22d3ee" strokeWidth="0.5" />
                            <line x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="#22d3ee" strokeWidth="0.5" />
                          </g>
                        ))}
                      </svg>

                      {/* Orbit path simulation */}
                      <svg className="absolute inset-0 w-full h-full">
                        <ellipse cx="50%" cy="50%" rx="38%" ry="22%"
                          fill="none" stroke="#22d3ee" strokeWidth="1"
                          strokeDasharray="4 4" opacity="0.3" />
                      </svg>

                      {/* Earth icon center */}
                      <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="w-24 h-24 rounded-full bg-blue-900/60 border-2 border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.3)] flex items-center justify-center">
                          <span className="text-3xl">🌍</span>
                        </div>
                        <div className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest">
                          ORBITAL PLANE
                        </div>
                      </div>

                      {/* Rocket position indicator */}
                      <motion.div
                        className="absolute"
                        animate={{
                          left: ["30%", "50%", "70%", "50%", "30%"],
                          top: ["30%", "20%", "30%", "45%", "30%"],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-pulse" />
                        <div className="mt-1 text-[9px] text-cyan-400 font-mono whitespace-nowrap">
                          ORBITON-2
                        </div>
                      </motion.div>

                    </div>

                    {/* Coords bar */}
                    <div className="grid grid-cols-3 divide-x divide-white/10 p-4 text-center">
                      <div>
                        <div className="text-[9px] text-white/30 uppercase tracking-widest">Latitude</div>
                        <div className="text-sm font-mono text-white mt-1">{telemetry.latitude.toFixed(4)}°N</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-white/30 uppercase tracking-widest">Longitude</div>
                        <div className="text-sm font-mono text-white mt-1">{telemetry.longitude.toFixed(4)}°E</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-white/30 uppercase tracking-widest">Altitude</div>
                        <div className="text-sm font-mono text-cyan-400 mt-1">{telemetry.altitude.toFixed(1)} m</div>
                      </div>
                    </div>

                  </motion.div>
                )}

                {/* TERMINAL TAB (READ ONLY FOR PUBLIC) */}
                {activeTab === "terminal" && (
                  <motion.div key="terminal"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                    className="bg-black border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px] font-mono text-xs">

                    <div className="bg-white/10 px-4 py-3 flex justify-between items-center border-b border-white/10 shrink-0">
                      <span className="text-cyan-400 font-bold tracking-widest">/// VTX_PUBLIC_FLIGHT_LOG</span>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                      </div>
                    </div>

                    <div className="flex-1 p-5 overflow-y-auto space-y-2">
                      {logs.map((log, i) => (
                        <LogEntry key={i} time={log.time} msg={log.msg} type={log.type} />
                      ))}
                      {logs.length === 0 && (
                          <div className="text-white/20 text-center py-10 italic">Awaiting Flight Log Uplink...</div>
                      )}
                      <div className="h-4" />
                    </div>

                    {/* Read-Only Terminal Footer */}
                    <div className="border-t border-white/10 bg-[#050508] px-4 py-3 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2">
                          <span className="text-cyan-400">$</span>
                          <span className="text-white/30">PUBLIC_OBSERVER_TERMINAL</span>
                      </div>
                      <span className="text-[9px] text-white/20 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">Read Only</span>
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

          {/* ── 5. BOTTOM: ATTITUDE + COUNTDOWN ── */}
          <div className="grid md:grid-cols-3 gap-4 pb-10">

            {/* Attitude Indicator */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
              <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2 mb-4">
                <Target size={13} /> Attitude
              </h3>
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32 rounded-full border-2 border-white/20 overflow-hidden"
                  style={{ transform: `rotate(${telemetry.roll}deg)` }}>
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-amber-800/80" />
                  <div className="absolute inset-x-0 border-t border-white/30 transition-all duration-300"
                    style={{ top: `${50 - telemetry.pitch * 2}%` }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-[2px] bg-yellow-400 shadow-[0_0_6px_#fbbf24]" />
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2 text-center">
                <div className="bg-black/40 border border-white/5 rounded-lg p-2">
                  <div className="text-[9px] text-white/30">PITCH</div>
                  <div className="text-sm font-mono text-yellow-400">{telemetry.pitch.toFixed(1)}°</div>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-lg p-2">
                  <div className="text-[9px] text-white/30">ROLL</div>
                  <div className="text-sm font-mono text-yellow-400">{telemetry.roll.toFixed(1)}°</div>
                </div>
              </div>
            </div>

            {/* Stage Progress */}
            <div className="md:col-span-2 bg-white/[0.02] border border-white/10 rounded-2xl p-5">
              <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2 mb-6">
                <ChevronRight size={13} /> Mission Phase Tracker
              </h3>
              
              <div className="relative flex justify-between items-center px-4 mt-8">
                  {/* Background Track Line */}
                  <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-white/5 rounded-full z-0" />
                  
                  {/* Active Track Line */}
                  <div className="absolute left-10 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full z-0 transition-all duration-1000" 
                       style={{ width: `calc(${(telemetry.stage / (STAGE_LABELS.length - 1)) * 100}% - 40px)` }} />

                  {STAGE_LABELS.map((label, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-500 bg-[#050508] ${
                        i < telemetry.stage
                          ? "border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                          : i === telemetry.stage
                          ? "border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] scale-110"
                          : "border-white/10 text-white/20"
                      }`}>
                        {i < telemetry.stage ? "✓" : i + 1}
                      </div>
                      <div className={`absolute top-12 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap text-center ${
                        i === telemetry.stage ? "text-cyan-400" : i < telemetry.stage ? "text-emerald-400/70" : "text-white/20"
                      }`}>
                        {label}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </PageLayout>
  );
}

// ─── SUB-COMPONENTS ──────────────────────────────────────

function LiveCard({ label, value, unit, trend, sub }: any) {
  return (
    <div className="relative group p-6 bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500">
      <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
          <path d="M0 60 L20 40 L40 50 L60 20 L80 30 L100 10 L120 40" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
        </svg>
      </div>
      <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-bold mb-1 flex justify-between">
        {label}
        {trend === "up" && <span className="text-emerald-400 animate-pulse">▲</span>}
        {trend === "stable" && <span className="text-cyan-400">●</span>}
      </p>
      <div className="flex items-baseline gap-2 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-mono font-bold text-white tabular-nums tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          {value}
        </h2>
        <span className="text-cyan-500 text-sm font-bold uppercase">{unit}</span>
      </div>
      {sub && <div className="mt-1 text-[9px] text-white/20 font-mono">{sub}</div>}
    </div>
  );
}

function MiniMetric({ label, value, color, icon: Icon }: any) {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all flex items-center gap-3">
      <Icon size={16} className={color} />
      <div>
        <div className="text-[9px] text-white/30 uppercase tracking-widest">{label}</div>
        <div className={`text-sm font-mono font-bold ${color}`}>{value}</div>
      </div>
    </div>
  );
}

function ChartCard({ label, dataKey, data, color, unit }: any) {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4">
      <div className="text-[10px] uppercase tracking-widest mb-3 font-bold flex items-center gap-2" style={{ color }}>
         <Activity size={12} /> {label}
      </div>
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
          <XAxis dataKey="t" stroke="#ffffff20" tick={{ fontSize: 9, fill: '#ffffff40' }} tickLine={false} axisLine={false} />
          <YAxis stroke="#ffffff20" tick={{ fontSize: 9, fill: '#ffffff40' }} tickLine={false} axisLine={false} width={40} />
          <Tooltip
            contentStyle={{ background: "#0a0a12", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11, fontWeight: 'bold' }}
            labelFormatter={(v) => `TIME: ${v}s`}
            itemStyle={{ color: color }}
            formatter={(v: any) => [`${v} ${unit}`, label.split(' ')[0]]}
          />
          <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2}
            fill={`url(#grad-${dataKey})`} dot={false} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function FuelGauge({ label, value, color }: any) {
  return (
    <div className="group">
      <div className="flex justify-between mb-1.5 font-mono text-xs">
        <span className="text-white/60 uppercase tracking-widest font-bold text-[10px]">{label}</span>
        <span className={`font-bold text-sm ${value > 50 ? "text-white" : value > 20 ? "text-yellow-400" : "text-red-400"}`}>
          {value.toFixed(1)}%
        </span>
      </div>
      <div className="w-full bg-[#050508] h-3.5 rounded-full overflow-hidden border border-white/10 relative">
        <motion.div
          className={`absolute top-0 left-0 h-full rounded-full ${color}`}
          animate={{ width: `${value}%` }}
          transition={{ ease: "linear", duration: 0.5 }}
        >
            <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
        </motion.div>
      </div>
    </div>
  );
}

function StatusBadge({ icon: Icon, label, value, color, sub }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg bg-white/5 border border-white/5 ${color}`}>
        <Icon size={16} />
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

function StatusRow({ label, status, highlight }: any) {
  const isNominal = ["NOMINAL", "ACTIVE", "SECURED", "ARMED", "DEPLOYED"].includes(status);
  return (
    <div className={`flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0 ${
      highlight ? "bg-white/[0.03] -mx-2 px-2 py-1.5 rounded" : ""
    }`}>
      <span className="text-white/60 font-mono text-[10px] uppercase tracking-wider">{label}</span>
      <span className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded border tracking-widest ${
        isNominal
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          : status === "STANDBY" || status === "STOWED"
          ? "bg-[#050508] text-white/30 border-white/10"
          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      }`}>
        {status}
      </span>
    </div>
  );
}

function LogEntry({ time, msg, type }: any) {
  return (
    <div className={`flex gap-3 text-[10px] font-mono border-l-2 pl-3 py-1 bg-white/[0.02] rounded-r-lg ${
      type === "critical" ? "border-red-500 text-red-400"
      : type === "success" ? "border-emerald-500 text-emerald-400"
      : type === "warning" ? "border-yellow-500 text-yellow-400"
      : "border-cyan-500/50 text-white/70"
    }`}>
      <span className="text-white/30 select-none shrink-0">[{time}]</span>
      <span className="tracking-tight">{msg}</span>
    </div>
  );
}
