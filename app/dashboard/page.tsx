"use client";

import { useState, useEffect, useRef } from "react";
import PageLayout from "../components/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, Radio, Database, Server, Cpu,
  Thermometer, Wind, AlertCircle, MapPin,
  ChevronRight, Zap, Target, Clock
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
    velocity: 24500,
    altitude: 408,
    lox: 98,
    methane: 98,
    pressure: 14.7,
    accel: 9.8,
    pitch: 2.1,
    roll: 0.4,
    thrust: 36000,
    motor_temp: 3200,
    battery: 96.4,
    signal: -62,
    stage: 1,
    latitude: 13.7199,
    longitude: 80.2304,
  });

  const [history, setHistory] = useState<DataPoint[]>([]);
  const [missionTime, setMissionTime] = useState(261); // T+04:21
  const [maxAlt, setMaxAlt] = useState(408);
  const [maxVel, setMaxVel] = useState(24500);
  const tRef = useRef(0);
  const [activeTab, setActiveTab] = useState<"charts" | "map" | "terminal">("charts");
  const [logs, setLogs] = useState([
    { time: "14:04:22", msg: "Telemetry packet #4920 verified. CRC check passed.", highlight: false },
    { time: "14:04:20", msg: "Downlink bandwidth nominal. Signal integrity 98%.", highlight: false },
    { time: "14:03:55", msg: "EVENT: Stage 1 separation confirmed.", highlight: true },
    { time: "14:03:45", msg: "MECO (Main Engine Cutoff) confirmed.", highlight: false },
    { time: "14:03:10", msg: "Max-Q dynamic pressure passed.", highlight: true },
    { time: "14:00:00", msg: "LIFTOFF. Clock started.", highlight: true },
  ]);

  // Simulated telemetry update
  useEffect(() => {
    const interval = setInterval(() => {
      tRef.current += 0.5;
      setMissionTime(prev => prev + 1);

      setTelemetry(prev => {
        const next = {
          ...prev,
          velocity: prev.velocity + (Math.random() * 20 - 10),
          altitude: prev.altitude + (Math.random() * 0.05 - 0.02),
          lox: Math.max(0, prev.lox - 0.02),
          methane: Math.max(0, prev.methane - 0.025),
          pressure: 14.7 + (Math.random() * 0.1 - 0.05),
          accel: 9.8 + Math.sin(tRef.current * 0.3) * 2,
          pitch: 2.1 + Math.sin(tRef.current * 0.1) * 0.5,
          roll: 0.4 + Math.cos(tRef.current * 0.2) * 0.3,
          thrust: 36000 + (Math.random() * 200 - 100),
          motor_temp: 3200 + (Math.random() * 50 - 25),
          battery: Math.max(0, prev.battery - 0.005),
          signal: -62 + (Math.random() * 4 - 2),
          latitude: prev.latitude + 0.0001,
          longitude: prev.longitude + 0.0001,
        };
        setMaxAlt(a => Math.max(a, next.altitude));
        setMaxVel(v => Math.max(v, next.velocity));
        return next;
      });

      setHistory(prev => {
        const point: DataPoint = {
          t: parseFloat(tRef.current.toFixed(1)),
          altitude: parseFloat((408 + Math.sin(tRef.current * 0.1) * 2).toFixed(2)),
          velocity: parseFloat((24500 + Math.sin(tRef.current * 0.2) * 100).toFixed(0)),
          thrust: parseFloat((36000 + Math.sin(tRef.current * 0.5) * 300).toFixed(0)),
          accel: parseFloat((9.8 + Math.sin(tRef.current * 0.3) * 2).toFixed(2)),
        };
        return [...prev.slice(-80), point];
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Format mission time
  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, "0");
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  return (
    <PageLayout
      title="Mission Control"
      subtitle="Simulated operational telemetry for the Orbiton-2 orbital vehicle."
    >
      <div className="relative min-h-screen">

        {/* CRT SCANLINE OVERLAY */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none" />

        <div className="relative z-10 space-y-4">

          {/* ── 1. STATUS HEADER ── */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-md">
            <StatusBadge icon={Radio} label="Downlink" value="98%" color="text-emerald-400" sub="SIGNAL STRONG" />
            <StatusBadge icon={Database} label="Throughput" value="4.2 GB/s" color="text-cyan-400" sub="NOMINAL" />
            <StatusBadge icon={Server} label="Latency" value="12 ms" color="text-white" sub="LOW" />
            <StatusBadge icon={Target} label="Stage" value={STAGE_LABELS[telemetry.stage]} color="text-orange-400" sub={`STAGE ${telemetry.stage}`} />
            <div className="flex items-center justify-end gap-3 pr-4 border-l border-white/10">
              <div className="text-right">
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Data Source</p>
                <p className="text-xs text-cyan-400 font-bold uppercase animate-pulse">Live Telemetry</p>
              </div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] animate-pulse" />
            </div>
          </div>

          {/* ── 2. PRIMARY HUD ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <LiveCard label="Orbital Velocity" value={telemetry.velocity.toFixed(0)} unit="km/h" trend="up" sub={`MAX: ${maxVel.toFixed(0)} km/h`} />

            {/* CENTRAL TIMER */}
            <div className="relative p-1 bg-black/60 border border-white/10 rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition duration-500" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60" />
              <div className="h-full flex flex-col justify-center items-center py-6">
                <div className="flex items-center gap-2 mb-2 text-cyan-500 text-[10px] font-bold tracking-[0.3em] uppercase">
                  <Activity size={12} className="animate-[spin_4s_linear_infinite]" />
                  Mission Elapsed Time
                </div>
                <div className="text-5xl font-mono font-black text-white tracking-widest tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  T+ {formatTime(missionTime)}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="px-3 py-1 rounded-full text-[10px] font-bold border"
                    style={{
                      color: STAGE_COLORS[telemetry.stage],
                      borderColor: STAGE_COLORS[telemetry.stage] + "44",
                      background: STAGE_COLORS[telemetry.stage] + "11"
                    }}>
                    {STAGE_LABELS[telemetry.stage]}
                  </div>
                </div>
              </div>
            </div>

            <LiveCard label="Orbital Altitude" value={telemetry.altitude.toFixed(2)} unit="km" trend="stable" sub={`MAX: ${maxAlt.toFixed(2)} km`} />
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
                  <StatusRow label="VORTEX-1 Engine" status="ACTIVE" highlight />
                  <StatusRow label="RCS Thrusters" status="STANDBY" />
                  <StatusRow label="Thermal Loops" status="NOMINAL" />
                  <StatusRow label="Payload Lock" status="SECURED" />
                  <StatusRow label="AFSS Safety" status="ARMED" highlight />
                  <StatusRow label="Grid Fins" status="DEPLOYED" />
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
                <DataBox label="Cabin Pressure" value={`${telemetry.pressure.toFixed(2)} psi`} icon={Wind} />
                <DataBox label="External Temp" value="-120.4 °C" icon={Thermometer} />
                <DataBox label="Battery" value={`${telemetry.battery.toFixed(1)} %`} icon={ZapIcon} />
                <DataBox label="Radiation" value="0.4 mSv" icon={AlertCircle} warning />
              </div>

              {/* Signal Strength */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                    <Radio size={13} /> RF Signal
                  </h3>
                  <span className="text-[10px] text-cyan-400 font-mono">{telemetry.signal.toFixed(1)} dBm</span>
                </div>
                <div className="flex items-end gap-1 h-8">
                  {[...Array(12)].map((_, i) => {
                    const active = i < Math.floor((telemetry.signal + 100) / 5);
                    return (
                      <div key={i} className="flex-1 rounded-sm transition-all duration-300"
                        style={{
                          height: `${20 + i * 5}%`,
                          background: active
                            ? i < 4 ? "#ef4444" : i < 8 ? "#f59e0b" : "#22d3ee"
                            : "#ffffff10"
                        }} />
                    );
                  })}
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

                    <ChartCard label="ALTITUDE (km)" dataKey="altitude" data={history} color="#22d3ee" unit="km" />
                    <ChartCard label="VELOCITY (km/h)" dataKey="velocity" data={history} color="#3b82f6" unit="km/h" />
                    <ChartCard label="THRUST (kN)" dataKey="thrust" data={history} color="#f97316" unit="kN" />

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
                          LEO ORBIT — 408 km
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
                        <div className="text-sm font-mono text-cyan-400 mt-1">{telemetry.altitude.toFixed(2)} km</div>
                      </div>
                    </div>

                  </motion.div>
                )}

                {/* TERMINAL TAB */}
                {activeTab === "terminal" && (
                  <motion.div key="terminal"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                    className="bg-black border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[480px] font-mono text-xs">

                    <div className="bg-white/10 px-4 py-2 flex justify-between items-center border-b border-white/10 shrink-0">
                      <span className="text-cyan-400 font-bold tracking-widest">/// VTX_FLIGHT_LOG_ORBITON2</span>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                      </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-1.5 text-emerald-500/90 font-light">
                      {logs.map((log, i) => (
                        <LogEntry key={i} time={log.time} msg={log.msg} highlight={log.highlight} />
                      ))}
                      <div className="h-4" />
                      <p className="text-white/20">--- SYSTEM LOG ARCHIVE INITIALIZED ---</p>
                    </div>

                    {/* Terminal input */}
                    <div className="border-t border-white/10 px-4 py-3 flex items-center gap-2 shrink-0">
                      <span className="text-cyan-400">$</span>
                      <input
                        className="flex-1 bg-transparent text-white/80 outline-none text-xs placeholder-white/20 font-mono"
                        placeholder="Enter command..."
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.currentTarget.value.trim()) {
                            const now = new Date().toLocaleTimeString("en-GB");
                            setLogs(prev => [
                              { time: now, msg: `CMD: ${e.currentTarget.value.trim()}`, highlight: true },
                              ...prev
                            ]);
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                      <span className="w-2 h-4 bg-white/60 animate-pulse" />
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

          {/* ── 5. BOTTOM: ATTITUDE + COUNTDOWN ── */}
          <div className="grid md:grid-cols-3 gap-4">

            {/* Attitude Indicator */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
              <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2 mb-4">
                <Target size={13} /> Attitude
              </h3>
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32 rounded-full border-2 border-white/20 overflow-hidden"
                  style={{ transform: `rotate(${telemetry.roll}deg)` }}>
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-amber-800/80" />
                  <div className="absolute inset-x-0 border-t border-white/30"
                    style={{ top: `${50 - telemetry.pitch * 2}%` }} />
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="absolute inset-x-4 border-t border-white/10 text-[8px] text-white/30 text-center"
                      style={{ top: `${20 + i * 15}%` }}>
                      {(20 - i * 10)}°
                    </div>
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-[2px] bg-yellow-400 shadow-[0_0_6px_#fbbf24]" />
                    <div className="absolute w-[2px] h-4 bg-yellow-400 shadow-[0_0_6px_#fbbf24]" />
                  </div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                <div className="bg-black/40 rounded-lg p-2">
                  <div className="text-[9px] text-white/30">PITCH</div>
                  <div className="text-sm font-mono text-yellow-400">{telemetry.pitch.toFixed(1)}°</div>
                </div>
                <div className="bg-black/40 rounded-lg p-2">
                  <div className="text-[9px] text-white/30">ROLL</div>
                  <div className="text-sm font-mono text-yellow-400">{telemetry.roll.toFixed(1)}°</div>
                </div>
              </div>
            </div>

            {/* Next Event Countdown */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
              <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2 mb-4">
                <Clock size={13} /> Next Event
              </h3>
              <div className="space-y-3">
                {[
                  { event: "Payload Deploy", t: "T+00:12:40", active: true },
                  { event: "S1 Boostback Burn", t: "T+00:08:15", active: false },
                  { event: "S1 Landing Burn", t: "T+00:14:30", active: false },
                  { event: "S1 Touchdown", t: "T+00:16:00", active: false },
                ].map((e, i) => (
                  <div key={i} className={`flex items-center justify-between p-2 rounded-lg border ${
                    e.active
                      ? "border-cyan-500/30 bg-cyan-500/10"
                      : "border-white/5 bg-white/[0.02]"
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${e.active ? "bg-cyan-400 animate-pulse" : "bg-white/20"}`} />
                      <span className="text-[10px] text-white/60 uppercase tracking-wider">{e.event}</span>
                    </div>
                    <span className={`text-[10px] font-mono font-bold ${e.active ? "text-cyan-400" : "text-white/30"}`}>
                      {e.t}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage Progress */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
              <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2 mb-4">
                <ChevronRight size={13} /> Mission Phase
              </h3>
              <div className="space-y-2">
                {STAGE_LABELS.map((label, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[9px] font-bold transition-all ${
                      i < telemetry.stage
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                        : i === telemetry.stage
                        ? "border-cyan-400 bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                        : "border-white/10 text-white/20"
                    }`}>
                      {i < telemetry.stage ? "✓" : i + 1}
                    </div>
                    <div className="flex-1">
                      <div className={`text-[10px] font-bold uppercase tracking-wider ${
                        i === telemetry.stage ? "text-cyan-400" : i < telemetry.stage ? "text-emerald-400" : "text-white/20"
                      }`}>
                        {label}
                      </div>
                    </div>
                    {i === telemetry.stage && (
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    )}
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
        {trend === "up" && <span className="text-emerald-400">▲</span>}
        {trend === "stable" && <span className="text-cyan-400">●</span>}
      </p>
      <div className="flex items-baseline gap-2 relative z-10">
        <h2 className="text-5xl font-mono font-bold text-white tabular-nums tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
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
      <div className="text-[10px] uppercase tracking-widest mb-3 font-bold" style={{ color }}>
        {label}
      </div>
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
          <XAxis dataKey="t" stroke="#ffffff20" tick={{ fontSize: 8 }} />
          <YAxis stroke="#ffffff20" tick={{ fontSize: 8 }} />
          <Tooltip
            contentStyle={{ background: "#0a0a12", border: "1px solid #ffffff15", borderRadius: 8, fontSize: 10 }}
            labelFormatter={(v) => `T+ ${v}s`}
            formatter={(v: any) => [`${v} ${unit}`, label]}
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
      <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/10 p-0.5">
        <motion.div
          className={`h-full rounded-full ${color} shadow-[0_0_8px_currentColor]`}
          animate={{ width: `${value}%` }}
          transition={{ ease: "linear", duration: 0.5 }}
        />
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

function DataBox({ label, value, icon: Icon, warning }: any) {
  return (
    <div className={`p-4 bg-black/40 rounded-xl border ${warning ? "border-yellow-500/30" : "border-white/10"} hover:bg-white/5 transition`}>
      <div className="flex justify-between items-start mb-2">
        {Icon && <Icon size={13} className={warning ? "text-yellow-500" : "text-cyan-500"} />}
        {warning && <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />}
      </div>
      <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-base font-mono text-white font-bold tracking-tight">{value}</p>
    </div>
  );
}

function StatusRow({ label, status, highlight }: any) {
  const nominal = ["NOMINAL", "ACTIVE", "SECURED", "ARMED", "DEPLOYED"].includes(status);
  return (
    <div className={`flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0 ${
      highlight ? "bg-white/[0.03] -mx-2 px-2 py-1 rounded" : ""
    }`}>
      <span className="text-white/60 font-mono text-[10px] uppercase tracking-wider">{label}</span>
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

function LogEntry({ time, msg, highlight }: any) {
  return (
    <div className={`flex gap-3 text-[10px] font-mono border-l-2 pl-3 ${
      highlight
        ? "border-cyan-500 text-white bg-white/5 py-1 rounded-r"
        : "border-transparent text-emerald-500/70"
    }`}>
      <span className="opacity-50 select-none shrink-0">[{time}]</span>
      <span className="tracking-tight">{msg}</span>
    </div>
  );
}

function ZapIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
