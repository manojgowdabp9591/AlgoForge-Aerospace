"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, Target, Zap, Thermometer,
  Wind, Radio, AlertCircle, Cpu
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const STAGE_LABELS = ["PRE-LAUNCH","BOOST","COAST","APOGEE","DESCENT","LANDED"];
const STAGE_COLORS = ["#6b7280","#f97316","#3b82f6","#8b5cf6","#10b981","#22d3ee"];
const STATUS_OPTIONS = ["STANDBY","COUNTDOWN","LIVE","LANDED","ABORTED"];

interface Telemetry {
  altitude: number; velocity: number; accel: number;
  pitch: number; roll: number; stage: number;
  lox: number; methane: number; thrust: number;
  motor_temp: number; battery: number; signal: number;
}

export default function MissionDirector() {
  const [state, setState] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [cmdInput, setCmdInput] = useState("");
  const [activeTab, setActiveTab] = useState<"charts"|"events"|"phase">("charts");
  const [missionTime, setMissionTime] = useState(0);
  const timerRef = useRef<any>(null);
  const tRef = useRef(0);

  // Poll API every 500ms
  useEffect(() => {
    const fetchState = async () => {
      const res = await fetch("/api/mission");
      const data = await res.json();
      setState(data);
      setMissionTime(data.missionTime);

      tRef.current += 0.5;
      setHistory(prev => [...prev.slice(-100), {
        t: parseFloat(tRef.current.toFixed(1)),
        altitude: data.telemetry.altitude,
        velocity: data.telemetry.velocity,
        thrust: data.telemetry.thrust,
      }]);
    };

    fetchState();
    const interval = setInterval(fetchState, 500);
    return () => clearInterval(interval);
  }, []);

  const update = async (body: object) => {
    await fetch("/api/mission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
  };

  const pushEvent = (msg: string, type = "info") =>
    update({ event: { msg, type } });

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, "0");
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `T+ ${h}:${m}:${sec}`;
  };

  if (!state) return (
    <div className="flex items-center justify-center h-screen text-white/30 text-sm font-mono">
      Loading mission state...
    </div>
  );

  const tel: Telemetry = state.telemetry;

  return (
    <div className="p-4 space-y-4 min-h-screen bg-[#020204]">

      {/* TOP: STATUS BAR */}
      <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/10 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="text-[10px] text-white/30 uppercase tracking-widest">Status</div>
          <select value={state.status}
            onChange={(e) => update({ status: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none">
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="px-3 py-1 rounded-full text-[10px] font-bold border"
            style={{
              color: STAGE_COLORS[tel.stage],
              borderColor: STAGE_COLORS[tel.stage] + "44",
              background: STAGE_COLORS[tel.stage] + "11"
            }}>
            {STAGE_LABELS[tel.stage]}
          </div>
        </div>
        <div className="text-sm font-mono text-cyan-400 font-bold">
          {formatTime(missionTime)}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-[10px] text-white/30">
            MAX ALT: <span className="text-white">{state.maxAlt.toFixed(1)} m</span>
          </div>
          <div className="text-[10px] text-white/30">
            MAX VEL: <span className="text-white">{state.maxVel.toFixed(1)} m/s</span>
          </div>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { label: "Altitude", value: tel.altitude.toFixed(1), unit: "m", color: "#22d3ee" },
          { label: "Velocity", value: tel.velocity.toFixed(1), unit: "m/s", color: "#3b82f6" },
          { label: "Accel", value: tel.accel.toFixed(1), unit: "m/s²", color: "#8b5cf6" },
          { label: "Thrust", value: (tel.thrust/1000).toFixed(1), unit: "kN", color: "#f97316" },
          { label: "Motor Temp", value: tel.motor_temp.toFixed(0), unit: "°C", color: "#ef4444" },
          { label: "Battery", value: tel.battery.toFixed(0), unit: "%", color: "#10b981" },
        ].map(m => (
          <div key={m.label} className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
            <div className="text-[9px] text-white/30 uppercase tracking-widest">{m.label}</div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold font-mono" style={{ color: m.color }}>{m.value}</span>
              <span className="text-[9px] text-white/30">{m.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-12 gap-4">

        {/* LEFT COLUMN */}
        <div className="md:col-span-3 space-y-4">

          {/* ARM / FIRE / ABORT */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Target size={12} /> Launch Control
            </div>
            <div className="space-y-3">
              <button
                onClick={() => { update({ armed: true }); pushEvent("⚠️ IGNITER ARMED — CLEAR THE PAD", "warning"); }}
                disabled={state.armed}
                className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                  state.armed
                    ? "bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 cursor-not-allowed"
                    : "bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20"
                }`}>
                {state.armed ? "⚠️ ARMED" : "ARM IGNITER"}
              </button>

              <button
                onClick={() => { update({ status: "LIVE" }); pushEvent("🔥 IGNITION COMMAND SENT", "critical"); }}
                disabled={!state.armed}
                className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                  state.armed
                    ? "bg-red-500/20 border border-red-500/50 text-red-300 hover:bg-red-500/30 animate-pulse"
                    : "bg-white/5 border border-white/10 text-white/20 cursor-not-allowed"
                }`}>
                🔥 FIRE
              </button>

              <button
                onClick={() => { update({ armed: false, status: "ABORTED" }); pushEvent("🛑 ABORT — ALL SYSTEMS HALT", "critical"); }}
                className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest bg-black border border-red-900/40 text-red-500 hover:border-red-500 hover:bg-red-950/20 transition-all">
                🛑 ABORT
              </button>
            </div>
          </div>

          {/* Countdown setter */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-3">
              Countdown (seconds)
            </div>
            <input type="number" defaultValue={600}
              onChange={(e) => update({ countdown: parseInt(e.target.value) })}
              className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-mono outline-none focus:border-cyan-500/50"
            />
          </div>

          {/* Propellants */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Wind size={12} /> Propellants
            </div>
            <div className="space-y-4">
              {[
                { label: "LOX", val: tel.lox, color: "from-blue-600 to-cyan-400" },
                { label: "CH₄", val: tel.methane, color: "from-purple-600 to-pink-500" },
              ].map(f => (
                <div key={f.label}>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-white/40">{f.label}</span>
                    <span className={f.val > 50 ? "text-white" : f.val > 20 ? "text-yellow-400" : "text-red-400"}>
                      {f.val.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <motion.div className={`h-full rounded-full bg-gradient-to-r ${f.color}`}
                      animate={{ width: `${f.val}%` }} transition={{ duration: 0.5 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Systems */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Cpu size={12} /> Systems
            </div>
            <div className="space-y-2.5">
              {[
                ["GNC", "NOMINAL"],
                ["VORTEX-1", state.armed ? "ARMED" : "STANDBY"],
                ["RCS", "STANDBY"],
                ["Thermal", "NOMINAL"],
                ["AFSS", "ACTIVE"],
              ].map(([label, s]) => (
                <div key={label} className="flex justify-between items-center text-[10px]">
                  <span className="text-white/50 uppercase">{label}</span>
                  <span className={`px-1.5 py-0.5 rounded border font-bold ${
                    s === "NOMINAL" || s === "ACTIVE"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : s === "ARMED"
                      ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      : "bg-white/5 text-white/30 border-white/10"
                  }`}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER: CHARTS / EVENTS / PHASE */}
        <div className="md:col-span-6 space-y-4">

          {/* Tabs */}
          <div className="flex gap-1 bg-white/[0.03] border border-white/10 rounded-xl p-1">
            {(["charts","events","phase"] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${
                  activeTab === tab ? "bg-cyan-500 text-black" : "text-white/40 hover:text-white"
                }`}>{tab}</button>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {activeTab === "charts" && (
              <motion.div key="charts"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}
                className="space-y-4">
                {[
                  { label: "ALTITUDE (m)", key: "altitude", color: "#22d3ee" },
                  { label: "VELOCITY (m/s)", key: "velocity", color: "#3b82f6" },
                  { label: "THRUST (N)", key: "thrust", color: "#f97316" },
                ].map(c => (
                  <div key={c.key} className="bg-white/[0.02] border border-white/10 rounded-2xl p-4">
                    <div className="text-[9px] uppercase tracking-widest mb-3 font-bold" style={{ color: c.color }}>
                      {c.label}
                    </div>
                    <ResponsiveContainer width="100%" height={110}>
                      <AreaChart data={history}>
                        <defs>
                          <linearGradient id={`g-${c.key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={c.color} stopOpacity={0.2} />
                            <stop offset="95%" stopColor={c.color} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                        <XAxis dataKey="t" stroke="#ffffff20" tick={{ fontSize: 8 }} />
                        <YAxis stroke="#ffffff20" tick={{ fontSize: 8 }} />
                        <Tooltip contentStyle={{ background: "#0a0a12", border: "1px solid #ffffff15", borderRadius: 8, fontSize: 10 }} />
                        <Area type="monotone" dataKey={c.key} stroke={c.color} strokeWidth={2}
                          fill={`url(#g-${c.key})`} dot={false} isAnimationActive={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "events" && (
              <motion.div key="events"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}
                className="bg-black border border-white/10 rounded-2xl overflow-hidden flex flex-col"
                style={{ height: "500px" }}>
                <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
                  <span className="text-cyan-400 font-bold text-xs tracking-widest">/// EVENT_LOG</span>
                  <div className="flex gap-2">
                    {[
                      { label: "MECO", msg: "✅ MECO confirmed", type: "success" },
                      { label: "SEP", msg: "Stage separation confirmed", type: "info" },
                      { label: "MAX-Q", msg: "⚠️ Max-Q passed", type: "warning" },
                      { label: "APOGEE", msg: "🎯 Apogee reached", type: "success" },
                    ].map(ev => (
                      <button key={ev.label} onClick={() => pushEvent(ev.msg, ev.type)}
                        className="px-2 py-1 text-[9px] font-bold uppercase rounded bg-white/5 border border-white/10 hover:bg-white/10 transition">
                        {ev.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {(state.events ?? []).map((e: any, i: number) => (
                    <div key={i} className={`flex gap-3 text-[10px] border-l-2 pl-3 py-0.5 ${
                      e.type === "critical" ? "border-red-500 text-red-300"
                      : e.type === "success" ? "border-emerald-500 text-emerald-300"
                      : e.type === "warning" ? "border-yellow-500 text-yellow-300"
                      : "border-cyan-500/30 text-white/50"
                    }`}>
                      <span className="text-white/20 shrink-0">[{new Date(e.time).toLocaleTimeString("en-GB")}]</span>
                      <span>{e.msg}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 px-4 py-3 flex items-center gap-2">
                  <span className="text-cyan-400">$</span>
                  <input value={cmdInput} onChange={(e) => setCmdInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && cmdInput.trim()) {
                        pushEvent(`CMD: ${cmdInput.trim()}`, "info");
                        setCmdInput("");
                      }
                    }}
                    placeholder="Type event to broadcast to public..."
                    className="flex-1 bg-transparent text-white/80 outline-none text-xs font-mono placeholder-white/20"
                  />
                </div>
              </motion.div>
            )}

            {activeTab === "phase" && (
              <motion.div key="phase"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="text-[10px] text-white/30 uppercase tracking-widest mb-4">Mission Phase Control</div>
                {STAGE_LABELS.map((label, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      i < tel.stage ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                      : i === tel.stage ? "border-cyan-400 bg-cyan-500/20 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                      : "border-white/10 text-white/20"
                    }`}>
                      {i < tel.stage ? "✓" : i + 1}
                    </div>
                    <span className={`text-sm font-bold uppercase tracking-wider flex-1 ${
                      i === tel.stage ? "text-cyan-400" : i < tel.stage ? "text-emerald-400" : "text-white/20"
                    }`}>{label}</span>
                    <button
                      onClick={() => {
                        update({ telemetry: { ...tel, stage: i } });
                        pushEvent(`Stage → ${label}`, "info");
                      }}
                      className="text-[9px] px-2 py-1 rounded border border-white/10 text-white/30 hover:border-cyan-500/50 hover:text-cyan-400 transition">
                      SET
                    </button>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/10">
                  <button onClick={() => update({ reset: true })}
                    className="w-full py-2 text-[10px] font-bold uppercase rounded-xl border border-white/10 text-white/30 hover:border-red-500/50 hover:text-red-400 transition">
                    RESET MISSION
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: ATTITUDE + SIGNAL */}
        <div className="md:col-span-3 space-y-4">

          {/* Attitude */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-4">Attitude</div>
            <div className="flex justify-center mb-3">
              <div className="relative w-28 h-28 rounded-full border-2 border-white/20 overflow-hidden"
                style={{ transform: `rotate(${tel.roll}deg)` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-amber-800/80" />
                <div className="absolute inset-x-0 border-t border-white/30"
                  style={{ top: `${50 - tel.pitch * 2}%` }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-[2px] bg-yellow-400 shadow-[0_0_6px_#fbbf24]" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-black/40 rounded-lg p-2">
                <div className="text-[9px] text-white/30">PITCH</div>
                <div className="text-sm font-mono font-bold text-yellow-400">{tel.pitch.toFixed(1)}°</div>
              </div>
              <div className="bg-black/40 rounded-lg p-2">
                <div className="text-[9px] text-white/30">ROLL</div>
                <div className="text-sm font-mono font-bold text-yellow-400">{tel.roll.toFixed(1)}°</div>
              </div>
            </div>
          </div>

          {/* Signal */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="flex justify-between mb-3">
              <span className="text-[10px] text-white/30 uppercase tracking-widest flex items-center gap-2">
                <Radio size={12} /> Signal
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">{tel.signal.toFixed(1)} dBm</span>
            </div>
            <div className="flex items-end gap-1 h-10">
              {[...Array(14)].map((_, i) => {
                const active = i < Math.floor((tel.signal + 100) / 5);
                return (
                  <div key={i} className="flex-1 rounded-sm transition-all"
                    style={{
                      height: `${20 + i * 6}%`,
                      background: active
                        ? i < 4 ? "#ef4444" : i < 9 ? "#f59e0b" : "#22d3ee"
                        : "#ffffff08"
                    }} />
                );
              })}
            </div>
          </div>

          {/* Push telemetry manually (for testing) */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-3">
              Quick Telemetry Push
            </div>
            <div className="space-y-2">
              {[
                { label: "Simulate Boost", data: { altitude: 50, velocity: 35, thrust: 36000, stage: 1 } },
                { label: "Simulate Apogee", data: { altitude: 103, velocity: 0, thrust: 0, stage: 3 } },
                { label: "Simulate Descent", data: { altitude: 60, velocity: -20, thrust: 0, stage: 4 } },
              ].map(sim => (
                <button key={sim.label}
                  onClick={() => update({ telemetry: { ...tel, ...sim.data } })}
                  className="w-full py-2 text-[9px] font-bold uppercase rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition text-white/50">
                  {sim.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
