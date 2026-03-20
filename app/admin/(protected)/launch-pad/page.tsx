"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings, Droplets, Zap, Wind, 
  Thermometer, AlertTriangle, CheckCircle2, 
  Radio, Database, Shield, Lock
} from "lucide-react";

const INITIAL_STATE = {
  status: "OFFLINE",
  telemetry: { lox: 100, methane: 100 }
};

export default function GroundControlPage() {
  const [state, setState] = useState<any>(INITIAL_STATE);
  const [connectionError, setConnectionError] = useState(false);
  
  // Local state for Ground-specific pad infrastructure
  const [padSystems, setPadSystems] = useState({
    strongback: "ERECT",
    deluge: "STANDBY",
    power: "EXTERNAL",
    range: "CLEAR"
  });

  // Poll global API every 500ms
  useEffect(() => {
    const fetchState = async () => {
      try {
        const res = await fetch("/api/mission");
        if (!res.ok) throw new Error("API_FAULT");
        const data = await res.json();
        
        // THE FIX: Safe Merge. Guarantee 'telemetry' exists
        const safeData = {
          ...INITIAL_STATE,
          ...data,
          telemetry: {
            ...INITIAL_STATE.telemetry,
            ...(data?.telemetry || {})
          }
        };

        setState(safeData);
        setConnectionError(false);
      } catch (err) {
        setConnectionError(true);
      }
    };

    fetchState();
    const interval = setInterval(fetchState, 500);
    return () => clearInterval(interval);
  }, []);

  const updatePropellant = async (type: "lox" | "methane", value: number) => {
    const currentTel = state?.telemetry || INITIAL_STATE.telemetry;
    const safeValue = Math.max(0, Math.min(100, Number(value) || 0));

    // Optimistic UI Update
    setState((prev: any) => ({
      ...prev,
      telemetry: { ...currentTel, [type]: safeValue }
    }));

    try {
      await fetch("/api/mission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telemetry: { ...currentTel, [type]: safeValue },
          event: { 
            msg: `GROUND: ${type.toUpperCase()} tank adjusted to ${safeValue}%`, 
            type: "info" 
          }
        })
      });
    } catch (e) {
      console.error("Failed to update propellant");
    }
  };

  const togglePadSystem = (system: keyof typeof padSystems, val1: string, val2: string) => {
    setPadSystems(prev => ({
      ...prev,
      [system]: prev[system] === val1 ? val2 : val1
    }));
  };

  const tel = state?.telemetry || INITIAL_STATE.telemetry;

  return (
    <div className="relative min-h-screen p-4 md:p-8 max-w-[1600px] mx-auto overflow-hidden bg-[#030305]">
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10 space-y-8">

        {/* --- HEADER --- */}
        <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-6"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center gap-4 tracking-tighter">
              <div className="relative p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <Settings className="text-emerald-400" size={28} />
              </div>
              GROUND <span className="text-emerald-500">CONTROL</span>
            </h1>
            <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.2em] text-emerald-500/60 uppercase">
              <span className="flex items-center gap-2">
                <Lock size={10} /> Pad 39-A SECURED
              </span>
            </div>
          </div>
          
          <div className="text-right flex flex-col items-end">
             <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono mb-1">Director Uplink</div>
             <div className={`flex items-center gap-2 px-3 py-1.5 bg-[#0a0a0f] border rounded-lg font-mono text-xs ${connectionError ? 'border-red-500/30 text-red-400' : 'border-emerald-500/30 text-emerald-400'}`}>
                <Database size={14} />
                {connectionError ? "OFFLINE" : state.status || "STANDBY"}
             </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* --- LEFT: PROPELLANT LOADING --- */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0a0a0f]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-6 font-bold flex items-center gap-2">
                <Droplets size={16} className="text-blue-400" /> Cryogenic Propellant Loading
              </div>

              <div className="space-y-8">
                {/* LOX Control */}
                <div className="grid md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-3">
                    <div className="text-sm font-black text-white tracking-widest">LIQUID OXYGEN</div>
                    <div className="text-[10px] font-mono text-blue-400">Temp: -183°C</div>
                  </div>
                  
                  <div className="md:col-span-6">
                    <div className="h-6 bg-[#050508] rounded-full overflow-hidden border border-white/10 relative">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-700 to-cyan-400"
                        animate={{ width: `${Number(tel.lox) || 0}%` }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold mix-blend-difference text-white">
                        {(Number(tel.lox) || 0).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-3 flex gap-2">
                    <button onClick={() => updatePropellant("lox", (Number(tel.lox)||0) - 10)} className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-mono text-xs transition-colors">-10</button>
                    <button onClick={() => updatePropellant("lox", (Number(tel.lox)||0) + 10)} className="flex-1 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 font-mono text-xs transition-colors">+10</button>
                    <button onClick={() => updatePropellant("lox", 100)} className="px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-emerald-400 font-mono text-xs transition-colors">FULL</button>
                  </div>
                </div>

                {/* Methane Control */}
                <div className="grid md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-3">
                    <div className="text-sm font-black text-white tracking-widest">L-METHANE</div>
                    <div className="text-[10px] font-mono text-purple-400">Temp: -161°C</div>
                  </div>
                  
                  <div className="md:col-span-6">
                    <div className="h-6 bg-[#050508] rounded-full overflow-hidden border border-white/10 relative">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-700 to-pink-500"
                        animate={{ width: `${Number(tel.methane) || 0}%` }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold mix-blend-difference text-white">
                        {(Number(tel.methane) || 0).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-3 flex gap-2">
                    <button onClick={() => updatePropellant("methane", (Number(tel.methane)||0) - 10)} className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-mono text-xs transition-colors">-10</button>
                    <button onClick={() => updatePropellant("methane", (Number(tel.methane)||0) + 10)} className="flex-1 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-purple-400 font-mono text-xs transition-colors">+10</button>
                    <button onClick={() => updatePropellant("methane", 100)} className="px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-emerald-400 font-mono text-xs transition-colors">FULL</button>
                  </div>
                </div>

              </div>

              {/* Emergency Vent */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <button 
                  onClick={() => { updatePropellant("lox", 0); updatePropellant("methane", 0); }}
                  className="w-full py-3 bg-red-950/30 border border-red-500/30 hover:bg-red-900/50 hover:border-red-500 text-red-500 font-bold tracking-widest uppercase text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <AlertTriangle size={16} /> Emergency Propellant Vent
                </button>
              </div>
            </div>
          </div>

          {/* --- RIGHT: PAD INFRASTRUCTURE --- */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Infrastructure Toggles */}
            <div className="bg-[#0a0a0f]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-6 font-bold flex items-center gap-2">
                <Shield size={16} className="text-emerald-400" /> Pad Systems
              </div>

              <div className="space-y-4">
                {/* Strongback */}
                <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
                  <div>
                    <div className="text-sm font-bold text-white tracking-wider">T-E Strongback</div>
                    <div className="text-[10px] font-mono text-white/40">Vehicle Support Structure</div>
                  </div>
                  <button 
                    onClick={() => togglePadSystem("strongback", "ERECT", "RETRACTED")}
                    className={`px-4 py-2 text-xs font-black font-mono rounded-lg transition-colors border ${
                      padSystems.strongback === "ERECT" 
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-500" 
                      : "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                    }`}
                  >
                    {padSystems.strongback}
                  </button>
                </div>

                {/* Deluge System */}
                <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
                  <div>
                    <div className="text-sm font-bold text-white tracking-wider">Water Deluge</div>
                    <div className="text-[10px] font-mono text-white/40">Acoustic Suppression</div>
                  </div>
                  <button 
                    onClick={() => togglePadSystem("deluge", "STANDBY", "ARMED")}
                    className={`px-4 py-2 text-xs font-black font-mono rounded-lg transition-colors border ${
                      padSystems.deluge === "ARMED" 
                      ? "bg-red-500/10 border-red-500/30 text-red-500 animate-pulse" 
                      : "bg-white/5 border-white/10 text-white/40"
                    }`}
                  >
                    {padSystems.deluge}
                  </button>
                </div>

                {/* Power */}
                <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
                  <div>
                    <div className="text-sm font-bold text-white tracking-wider">Vehicle Power</div>
                    <div className="text-[10px] font-mono text-white/40">Umbilical Connection</div>
                  </div>
                  <button 
                    onClick={() => togglePadSystem("power", "EXTERNAL", "INTERNAL")}
                    className={`px-4 py-2 text-xs font-black font-mono rounded-lg transition-colors border ${
                      padSystems.power === "INTERNAL" 
                      ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" 
                      : "bg-purple-500/10 border-purple-500/30 text-purple-400"
                    }`}
                  >
                    {padSystems.power}
                  </button>
                </div>
              </div>
            </div>

            {/* Range Weather */}
            <div className="bg-[#0a0a0f]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-6 font-bold flex items-center gap-2">
                <Wind size={16} className="text-cyan-400" /> Range Conditions
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#050508] border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                  <Thermometer size={20} className="text-red-400 mb-2" />
                  <div className="text-[10px] text-white/40 font-bold tracking-widest mb-1">PAD TEMP</div>
                  <div className="text-xl font-mono text-white">24.5°C</div>
                </div>

                <div className="bg-[#050508] border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                  <Wind size={20} className="text-cyan-400 mb-2" />
                  <div className="text-[10px] text-white/40 font-bold tracking-widest mb-1">SURFACE WIND</div>
                  <div className="text-xl font-mono text-white">12 kts</div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" size={24} />
                <div>
                  <div className="text-sm font-bold text-emerald-400 tracking-wider">WEATHER IS GO</div>
                  <div className="text-[10px] text-emerald-500/60 font-mono">No lightning detected within 10nm.</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
