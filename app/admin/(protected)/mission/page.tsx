"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, Wind, Radio, Cpu, Rocket, Globe, Activity,
  AlertTriangle, ShieldAlert, Power, Thermometer,
  Terminal, WifiOff
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const STAGE_LABELS = ["PRE-LAUNCH", "BOOST", "COAST", "APOGEE", "DESCENT", "LANDED"];
const STAGE_COLORS = ["#6b7280", "#f97316", "#3b82f6", "#8b5cf6", "#10b981", "#22d3ee"];
const STATUS_OPTIONS = ["STANDBY", "COUNTDOWN", "LIVE", "LANDED", "ABORTED"];

interface Telemetry {
  altitude: number; velocity: number; accel: number;
  pitch: number; roll: number; stage: number;
  lox: number; methane: number; thrust: number;
  motor_temp: number; battery: number; signal: number;
}

const INITIAL_STATE = {
  status: "OFFLINE",
  armed: false,
  maxAlt: 0,
  maxVel: 0,
  events: [],
  serverAge: 9999,      // Added so the UI knows it starts offline
  rx_status: "OFFLINE", 
  telemetry: {
    altitude: 0, velocity: 0, accel: 1.0, pitch: 0, roll: 0, stage: 0,
    lox: 100, methane: 100, thrust: 0, motor_temp: 22, battery: 100, signal: -120
  }
};

export default function MissionDirectorPage() {
  const [state, setState] = useState<any>(INITIAL_STATE);
  const [history, setHistory] = useState<any[]>([]);
  const [cmdInput, setCmdInput] = useState("");
  const [activeTab, setActiveTab] = useState<"charts" | "map" | "events" | "phase">("charts");
  const [missionTime, setMissionTime] = useState(0);
  const [connectionError, setConnectionError] = useState(false);
  const tRef = useRef(0);

  // Poll API every 500ms
  useEffect(() => {
    const fetchState = async () => {
      try {
        const res = await fetch("/api/mission");
        if (!res.ok) throw new Error("API_FAULT");
        const data = await res.json();
        
        // Safe Merge. Guarantee 'telemetry' exists even if DB is empty
        const safeData = {
          ...INITIAL_STATE,
          ...data,
          telemetry: {
            ...INITIAL_STATE.telemetry,
            ...(data?.telemetry || {})
          }
        };

        setState(safeData);
        setMissionTime(Number(safeData.missionTime) || 0);
        setConnectionError(false);

        tRef.current += 0.5;
        setHistory(prev => [...prev.slice(-100), {
          t: parseFloat(tRef.current.toFixed(1)),
          altitude: Number(safeData.telemetry.altitude) || 0,
          velocity: Number(safeData.telemetry.velocity) || 0,
          thrust: Number(safeData.telemetry.thrust) || 0,
          accel: Number(safeData.telemetry.accel) || 0,
        }]);
      } catch (err) {
        setConnectionError(true);
        // Force UI to show offline if API fails
        setState((prev: any) => ({ ...prev, serverAge: 9999 }));
      }
    };

    fetchState();
    const interval = setInterval(fetchState, 500);
    return () => clearInterval(interval);
  }, []);

  const update = async (body: object) => {
    // Optimistic UI update
    setState((prev: any) => ({ ...prev, ...body }));
    try {
      await fetch("/api/mission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
    } catch (e) {
      console.error("Failed to push update to uplink");
    }
  };

  const pushEvent = (msg: string, type = "info") => update({ 
    events: [...(state.events || []), { time: new Date().toISOString(), msg, type }].slice(-50) 
  });

  const formatTime = (s: number) => {
    const isNeg = s < 0;
    const abs = Math.abs(Number(s) || 0);
    const h = Math.floor(abs / 3600).toString().padStart(2, "0");
    const m = Math.floor((abs % 3600) / 60).toString().padStart(2, "0");
    const sec = (abs % 60).toString().padStart(2, "0");
    return `T${isNeg ? "-" : "+"} ${h}:${m}:${sec}`;
  };

  const tel: Telemetry = state?.telemetry || INITIAL_STATE.telemetry;
  const currentStage = Number(tel.stage) || 0;

  // --- HARDWARE AWARENESS VARIABLES ---
  const isGroundOffline = state?.serverAge > 4000;
  const isVehicleOffline = state?.rx_status === "LOS";

  return (
    <div className="relative min-h-screen p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto overflow-hidden bg-[#030305]">
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_2px,3px_100%] pointer-events-none" />

      <div className="relative z-10 space-y-4">

        <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-cyan-500/20 pb-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center gap-4 tracking-tighter drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-50" />
                <Rocket className="relative z-10 text-cyan-400" size={32} />
              </div>
              MISSION <span className="text-cyan-500">DIRECTOR</span>
            </h1>
            <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.2em] text-cyan-500/60 uppercase">
              
              {/* FIXED: Mapped hardware states directly into your existing span */}
              <span className="flex items-center gap-2">
                {isGroundOffline ? <WifiOff size={10} className="text-red-500" /> : <Radio size={10} className={connectionError ? "text-red-500" : isVehicleOffline ? "text-yellow-500 animate-pulse" : "animate-pulse"} />} 
                {connectionError || isGroundOffline ? "GROUND STATION OFFLINE" : isVehicleOffline ? "VEHICLE SIGNAL LOST" : "BROADCASTING LIVE"}
              </span>

            </div>
          </div>
          
          <div className="text-right flex flex-col items-end">
             <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono mb-1">Global Data Uplink</div>
             
             {/* FIXED: Uses suppressHydrationWarning so the time string never crashes your browser */}
             <div className={`flex items-center gap-2 px-3 py-1.5 bg-[#0a0a0f] border rounded-lg font-mono text-xs ${connectionError || isGroundOffline ? 'border-red-500/30 text-red-400' : isVehicleOffline ? 'border-yellow-500/30 text-yellow-500' : 'border-cyan-500/30 text-cyan-400'}`}>
                <Globe size={14} />
                <span suppressHydrationWarning>
                  {connectionError || isGroundOffline ? "SYNC FAILED" : isVehicleOffline ? "RX_LOS" : `SYNCED: ${new Date().toLocaleTimeString()}`}
                </span>
             </div>
             
          </div>
        </motion.div>

        <div className="flex flex-wrap items-center justify-between p-4 bg-[#0a0a0f]/80 backdrop-blur-md border border-white/10 rounded-2xl gap-4 shadow-[0_0_30px_rgba(6,182,212,0.05)]">
          <div className="flex items-center gap-4">
            <div className="text-[10px] text-white/30 uppercase tracking-widest flex items-center gap-2">
                <ShieldAlert size={14}/> Profile
            </div>
            <select value={state.status || "OFFLINE"}
              onChange={(e) => update({ status: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-500/50 transition-colors uppercase font-bold tracking-wider cursor-pointer">
              {STATUS_OPTIONS.map(s => <option key={s} value={s} className="bg-[#0a0a0f]">{s}</option>)}
            </select>
            <div className="px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest border"
              style={{
                color: STAGE_COLORS[currentStage] || "#fff",
                borderColor: (STAGE_COLORS[currentStage] || "#fff") + "44",
                background: (STAGE_COLORS[currentStage] || "#fff") + "11"
              }}>
              {STAGE_LABELS[currentStage] || "STANDBY"}
            </div>
          </div>
          <div className={`text-xl md:text-3xl font-mono font-black tracking-widest ${missionTime < 0 ? 'text-yellow-400' : 'text-cyan-400'} drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]`}>
            {formatTime(missionTime)}
          </div>
          <div className="flex items-center gap-6 hidden sm:flex">
            <div className="text-[10px] text-white/30 font-mono flex flex-col">
              <span>MAX ALTITUDE</span>
              <span className="text-white text-sm">{(Number(state.maxAlt) || 0).toFixed(1)} m</span>
            </div>
            <div className="text-[10px] text-white/30 font-mono flex flex-col">
              <span>MAX VELOCITY</span>
              <span className="text-white text-sm">{(Number(state.maxVel) || 0).toFixed(1)} m/s</span>
            </div>
          </div>
        </div>

        {/* --- METRICS ROW --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Altitude", value: (Number(tel.altitude) || 0).toFixed(1), unit: "m", color: "#22d3ee" },
            { label: "Velocity", value: (Number(tel.velocity) || 0).toFixed(1), unit: "m/s", color: "#3b82f6" },
            { label: "Accel", value: (Number(tel.accel) || 0).toFixed(1), unit: "m/s²", color: "#8b5cf6" },
            { label: "Thrust", value: ((Number(tel.thrust) || 0)/1000).toFixed(1), unit: "kN", color: "#f97316" },
            { label: "Motor Temp", value: (Number(tel.motor_temp) || 0).toFixed(0), unit: "°C", color: "#ef4444" },
            { label: "Battery", value: (Number(tel.battery) || 0).toFixed(0), unit: "%", color: "#10b981" },
          ].map(m => (
            <div key={m.label} className="bg-[#0a0a0f]/80 backdrop-blur-md border border-white/5 hover:border-white/10 transition-colors rounded-xl p-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-[9px] text-white/40 uppercase tracking-widest font-bold">{m.label}</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black font-mono tracking-tighter" style={{ color: m.color }}>{m.value}</span>
                <span className="text-[10px] text-white/30 font-bold">{m.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-4 pb-10">

          <div className="lg:col-span-3 space-y-4">
            <div className="bg-[#0a0a0f]/80 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-5 relative overflow-hidden shadow-lg">
              {state.armed && <div className="absolute inset-0 bg-yellow-500/5 animate-pulse pointer-events-none" />}
              <div className="text-[10px] text-white/30 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
                <Target size={12} className="text-cyan-500" /> Launch Control
              </div>
              <div className="space-y-3 relative z-10">
                <button
                  onClick={() => { update({ armed: true }); pushEvent("⚠️ IGNITER ARMED — CLEAR THE PAD", "warning"); }}
                  disabled={state.armed}
                  className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                    state.armed
                      ? "bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                      : "bg-[#050508] border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10"
                  }`}>
                  {state.armed ? "⚠️ ORDNANCE ARMED" : "ARM IGNITER"}
                </button>
                <button
                  onClick={() => { update({ status: "LIVE" }); pushEvent("🔥 IGNITION COMMAND SENT", "critical"); }}
                  disabled={!state.armed}
                  className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    state.armed
                      ? "bg-red-600 border border-red-500 text-white hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)] animate-pulse"
                      : "bg-white/5 border border-white/10 text-white/20 cursor-not-allowed"
                  }`}>
                  <Power size={18} /> INITIATE LAUNCH
                </button>
                <button
                  onClick={() => { update({ armed: false, status: "ABORTED" }); pushEvent("🛑 ABORT — ALL SYSTEMS HALT", "critical"); }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-transparent border border-red-900/50 text-red-500 hover:border-red-500 hover:bg-red-950/30 transition-all flex items-center justify-center gap-2">
                  <AlertTriangle size={14} /> MANUAL ABORT
                </button>
              </div>
            </div>

            <div className="bg-[#0a0a0f]/80 backdrop-blur-md border border-white/5 rounded-2xl p-5">
              <div className="text-[10px] text-white/30 uppercase tracking-widest mb-3">
                Countdown Config (s)
              </div>
              <input type="number" defaultValue={60}
                onChange={(e) => update({ countdown: parseInt(e.target.value) })}
                className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>

            <div className="bg-[#0a0a0f]/80 backdrop-blur-md border border-white/5 rounded-2xl p-5">
              <div className="text-[10px] text-white/30 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Wind size={12} className="text-cyan-500" /> Tank Pressures
              </div>
              <div className="space-y-5">
                {[
                  { label: "LOX", val: Number(tel.lox) || 0, color: "from-blue-600 to-cyan-400" },
                  { label: "CH₄", val: Number(tel.methane) || 0, color: "from-purple-600 to-pink-500" },
                ].map(f => (
                  <div key={f.label}>
                    <div className="flex justify-between items-end mb-1.5">
                      <span className="text-[10px] font-bold text-white/50">{f.label}</span>
                      <span className={`text-xs font-mono font-bold ${f.val > 50 ? "text-white" : f.val > 20 ? "text-yellow-400" : "text-red-400"}`}>
                        {f.val.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-[#050508] rounded-full overflow-hidden border border-white/5 relative">
                      <motion.div className={`h-full rounded-full bg-gradient-to-r ${f.color} relative`}
                        animate={{ width: `${f.val}%` }} transition={{ duration: 0.5 }}>
                        <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a0f]/80 backdrop-blur-md border border-white/5 rounded-2xl p-5">
              <div className="text-[10px] text-white/30 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Cpu size={12} className="text-cyan-500" /> Core Avionics
              </div>
              <div className="space-y-3">
                {[
                  ["GNC", "NOMINAL"],
                  ["VORTEX-1", state.armed ? "ARMED" : "STANDBY"],
                  ["RCS", "STANDBY"],
                  ["Thermal", "NOMINAL"],
                  ["AFSS", "ACTIVE"],
                ].map(([label, s]) => (
                  <div key={label} className="flex justify-between items-center text-[10px]">
                    <span className="text-white/60 font-bold tracking-wider uppercase">{label}</span>
                    <span className={`px-2 py-1 rounded w-20 text-center font-bold tracking-widest border ${
                      s === "NOMINAL" || s === "ACTIVE"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : s === "ARMED"
                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        : "bg-[#050508] text-white/30 border-white/10"
                    }`}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="flex gap-2 bg-[#0a0a0f]/80 backdrop-blur-md border border-white/5 rounded-xl p-1.5">
              {(["charts","map","events","phase"] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${
                    activeTab === tab 
                        ? "bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]" 
                        : "border border-transparent text-white/40 hover:text-white hover:bg-white/5"
                  }`}>{tab === "events" ? "TERMINAL" : tab}</button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "charts" && (
                <motion.div key="charts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                  {[
                    { label: "ALTITUDE PROFILE (m)", key: "altitude", color: "#22d3ee" },
                    { label: "VELOCITY VECTOR (m/s)", key: "velocity", color: "#3b82f6" },
                    { label: "ENGINE THRUST (N)", key: "thrust", color: "#f97316" },
                  ].map(c => (
                    <div key={c.key} className="bg-[#0a0a0f]/80 backdrop-blur-md border border-white/5 rounded-2xl p-4">
                      <div className="text-[10px] uppercase tracking-widest mb-4 font-bold flex items-center gap-2" style={{ color: c.color }}>
                        <Activity size={12} /> {c.label}
                      </div>
                      <ResponsiveContainer width="100%" height={120}>
                        <AreaChart data={history}>
                          <defs>
                            <linearGradient id={`g-${c.key}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={c.color} stopOpacity={0.3} />
                              <stop offset="95%" stopColor={c.color} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                          <XAxis dataKey="t" stroke="#ffffff20" tick={{ fontSize: 9, fill: '#ffffff40' }} tickLine={false} axisLine={false} />
                          <YAxis stroke="#ffffff20" tick={{ fontSize: 9, fill: '#ffffff40' }} tickLine={false} axisLine={false} width={40} />
                          <Tooltip contentStyle={{ background: "#050508", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 8, fontSize: 11, fontWeight: 'bold' }} itemStyle={{ color: c.color }} />
                          <Area type="monotone" dataKey={c.key} stroke={c.color} strokeWidth={2} fill={`url(#g-${c.key})`} dot={false} isAnimationActive={false} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "map" && (
                <motion.div key="map" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-[#0a0a0f]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                   <div className="relative h-[480px] bg-[#050508] flex items-center justify-center">
                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0a0a1a_0%,#050508_70%)]" />
                     <svg className="absolute inset-0 w-full h-full opacity-20">
                       {[...Array(10)].map((_, i) => (
                         <g key={i}>
                           <line x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="#22d3ee" strokeWidth="0.5" />
                           <line x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="#22d3ee" strokeWidth="0.5" />
                         </g>
                       ))}
                     </svg>
                     <svg className="absolute inset-0 w-full h-full">
                        <ellipse cx="50%" cy="50%" rx="38%" ry="22%" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                     </svg>
                     <div className="relative z-10 flex flex-col items-center gap-4">
                       <div className="w-24 h-24 rounded-full bg-blue-900/60 border-2 border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.3)] flex items-center justify-center">
                         <span className="text-3xl">🌍</span>
                       </div>
                       <div className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full border border-cyan-500/30">ORBITAL PLANE</div>
                     </div>
                     <motion.div className="absolute" animate={{ left: ["30%", "50%", "70%", "50%", "30%"], top: ["30%", "20%", "30%", "45%", "30%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                       <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-pulse" />
                       <div className="mt-1 text-[9px] text-cyan-400 font-mono whitespace-nowrap">ORBITON-2</div>
                     </motion.div>
                   </div>
                </motion.div>
              )}

              {activeTab === "events" && (
                <motion.div key="events" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-[#050508] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.1)] flex flex-col h-[560px] font-mono text-xs relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
                  <div className="bg-white/5 px-5 py-3 flex justify-between items-center border-b border-white/10 shrink-0 mt-1">
                    <span className="text-cyan-400 font-bold tracking-widest flex items-center gap-2"><Terminal size={14} /> GLOBAL_COMMS_LINK</span>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    </div>
                  </div>
                  <div className="flex-1 p-5 overflow-y-auto space-y-3 font-mono">
                    {(state.events || []).map((e: any, i: number) => (
                      <div key={i} className={`flex gap-4 text-xs border-l-2 pl-4 py-1.5 bg-white/[0.02] rounded-r-lg ${e.type === "critical" ? "border-red-500 text-red-400" : e.type === "success" ? "border-emerald-500 text-emerald-400" : e.type === "warning" ? "border-yellow-500 text-yellow-400" : "border-cyan-500/50 text-white/70"}`}>
                        <span className="text-white/30 shrink-0" suppressHydrationWarning>[{new Date(e.time || Date.now()).toLocaleTimeString("en-GB")}]</span>
                        <span>{e.msg}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-cyan-500/30 bg-[#020203] px-5 py-4 flex items-center gap-3">
                    <span className="text-cyan-500 font-bold">&gt;</span>
                    <input value={cmdInput} onChange={(e) => setCmdInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && cmdInput.trim()) { pushEvent(`DIRECTOR: ${cmdInput.trim()}`, "info"); setCmdInput(""); } }} placeholder="Type command to broadcast to global public feed..." className="flex-1 bg-transparent text-white outline-none text-xs font-mono placeholder-white/20" />
                    <button onClick={() => { if(cmdInput) { pushEvent(`DIRECTOR: ${cmdInput.trim()}`); setCmdInput(""); } }} className="text-[10px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-3 py-1.5 rounded hover:bg-cyan-500 hover:text-black transition-colors uppercase font-bold tracking-widest">Transmit</button>
                  </div>
                </motion.div>
              )}

              {activeTab === "phase" && (
                <motion.div key="phase" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-[#0a0a0f]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 space-y-6">
                  <div className="text-[10px] text-white/30 uppercase tracking-widest border-b border-white/5 pb-4">Manual Phase Override</div>
                  <div className="space-y-4">
                      {STAGE_LABELS.map((label, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                          <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 transition-all ${i < currentStage ? "border-emerald-500 bg-emerald-500/20 text-emerald-400" : i === currentStage ? "border-cyan-400 bg-cyan-500/20 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]" : "border-white/10 text-white/20 group-hover:border-white/30"}`}>
                            {i < currentStage ? "✓" : i + 1}
                          </div>
                          <div className="flex-1 h-[2px] bg-white/5 relative">
                              {(i <= currentStage) && (<motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className={`absolute inset-y-0 left-0 ${i < currentStage ? 'bg-emerald-500/50' : 'bg-gradient-to-r from-emerald-500/50 to-cyan-400'}`} />)}
                          </div>
                          <span className={`text-sm font-black uppercase tracking-widest w-32 text-right ${i === currentStage ? "text-cyan-400" : i < currentStage ? "text-emerald-400/50" : "text-white/20"}`}>{label}</span>
                          <button onClick={() => { update({ telemetry: { ...tel, stage: i } }); pushEvent(`Phase Overridden → ${label}`, "warning"); }} className="text-[10px] px-3 py-1.5 font-bold rounded-lg border border-white/10 text-white/30 hover:border-cyan-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">FORCE SET</button>
                        </div>
                      ))}
                  </div>
                  <div className="pt-6 border-t border-white/5 mt-6">
                    <button onClick={() => update({ reset: true })} className="w-full py-3 text-xs font-bold uppercase tracking-widest rounded-xl bg-transparent border border-red-900/40 text-red-500/70 hover:border-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all">RESET MISSION PARAMETERS</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- RIGHT COLUMN: ATTITUDE + SIGNAL --- */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-[#0a0a0f]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-lg">
              <div className="text-[10px] text-white/30 uppercase tracking-widest mb-6 flex items-center justify-between"><span>Flight Attitude</span><Activity size={12} className="text-cyan-500" /></div>
              <div className="flex justify-center mb-8 relative">
                <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full scale-75" />
                <div className="relative w-36 h-36 rounded-full border-4 border-[#050508] shadow-[0_0_0_2px_rgba(255,255,255,0.1)] overflow-hidden" style={{ transform: `rotate(${Number(tel.roll) || 0}deg)` }}>
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-400" />
                  <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-amber-700 to-amber-900 border-t-2 border-white transition-transform duration-300" style={{ transform: `translateY(${50 + (Number(tel.pitch) || 0) * 2}%)` }} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-[2px] bg-yellow-400 shadow-[0_0_8px_#fbbf24] rounded-full relative"><div className="absolute left-1/2 -top-1 w-[2px] h-3 bg-yellow-400 -translate-x-1/2" /></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#050508] border border-white/5 rounded-xl p-3 text-center"><div className="text-[9px] text-white/40 tracking-widest mb-1">PITCH</div><div className="text-lg font-mono font-black text-cyan-400">{(Number(tel.pitch) || 0).toFixed(1)}°</div></div>
                <div className="bg-[#050508] border border-white/5 rounded-xl p-3 text-center"><div className="text-[9px] text-white/40 tracking-widest mb-1">ROLL</div><div className="text-lg font-mono font-black text-cyan-400">{(Number(tel.roll) || 0).toFixed(1)}°</div></div>
              </div>
            </div>

            <div className="bg-[#0a0a0f]/80 backdrop-blur-md border border-white/5 rounded-2xl p-5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] text-white/30 uppercase tracking-widest flex items-center gap-2"><Radio size={12} className="text-cyan-500" /> Telemetry Link</span>
                <span className="text-xs text-cyan-400 font-mono font-bold bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">{(Number(tel.signal) || 0).toFixed(1)} dBm</span>
              </div>
              <div className="flex items-end gap-1.5 h-12 bg-[#050508] p-3 rounded-xl border border-white/5">
                {[...Array(16)].map((_, i) => {
                  const active = i < Math.floor(((Number(tel.signal) || -120) + 120) / 4);
                  return (
                    <div key={i} className="flex-1 rounded-sm transition-all duration-500" style={{ height: `${20 + i * 5}%`, background: active ? i < 4 ? "#ef4444" : i < 10 ? "#f59e0b" : "#22d3ee" : "#ffffff08", boxShadow: active && i >= 10 ? "0 0 10px rgba(34,211,238,0.4)" : "none" }} />
                  );
                })}
              </div>
            </div>

            <div className="bg-[#0a0a0f]/80 backdrop-blur-md border border-white/5 rounded-2xl p-5">
              <div className="text-[10px] text-white/30 uppercase tracking-widest mb-4 flex items-center gap-2"><Cpu size={12} /> Inject Test Telemetry</div>
              <div className="space-y-2.5">
                {[
                  { label: "Simulate Boost Phase", data: { altitude: 50, velocity: 35, thrust: 36000, stage: 1, pitch: 80 } },
                  { label: "Simulate Apogee", data: { altitude: 103, velocity: 0, thrust: 0, stage: 3, pitch: 0 } },
                  { label: "Simulate Descent", data: { altitude: 60, velocity: -20, thrust: 0, stage: 4, pitch: -80 } },
                ].map(sim => (
                  <button key={sim.label} onClick={() => update({ telemetry: { ...tel, ...sim.data } })} className="w-full py-2.5 text-[9px] font-bold uppercase tracking-widest rounded-lg bg-[#050508] border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all text-white/50 hover:text-cyan-400 flex justify-between px-4">
                    <span>{sim.label}</span><span>&gt;&gt;</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
