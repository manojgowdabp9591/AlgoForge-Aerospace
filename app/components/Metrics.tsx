"use client";

import { motion } from "framer-motion";
import { TrendingDown, Weight, CalendarClock } from "lucide-react";

export default function Metrics() {
  const metrics = [
    {
      label: "Cost Efficiency",
      value: "1/10",
      unit: "vs Industry Avg",
      desc: "Targeting < $2,500/kg to LEO.",
      icon: TrendingDown,
      status: "OPTIMAL"
    },
    {
      label: "Payload Mass",
      value: "850",
      unit: "Kilograms",
      desc: "SSO & LEO Constellation Class.",
      icon: Weight,
      status: "NOMINAL"
    },
    {
      label: "Launch Window",
      value: "2028",
      unit: "Q4 Target",
      desc: "Orbiton-1 Demo Flight.",
      icon: CalendarClock,
      status: "LOCKED"
    },
  ];

  return (
    <section className="py-24 relative z-10 bg-black">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-6">
            <div>
                <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">Mission Parameters</h2>
                <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-emerald-500 font-bold tracking-widest">SYSTEMS ONLINE</span>
                </div>
            </div>
            <div className="hidden md:block text-right">
                <p className="text-[10px] text-white/40 font-mono leading-relaxed">
                    ID: VTX-METRICS-001 <br />
                    REF: ORBITAL_CLASS_A
                </p>
            </div>
        </div>

        {/* Modular Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <MetricModule key={index} {...metric} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

function MetricModule({ label, value, unit, desc, icon: Icon, status, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="relative group bg-white/[0.02] p-8 overflow-hidden transition-all duration-300 hover:bg-white/[0.04]"
    >
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/10 group-hover:border-cyan-400 transition-colors duration-300" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/10 group-hover:border-cyan-400 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/10 group-hover:border-cyan-400 transition-colors duration-300" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/10 group-hover:border-cyan-400 transition-colors duration-300" />

        {/* Scanline Animation Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent h-[40%] w-full -translate-y-[150%] group-hover:translate-y-[200%] transition-transform duration-1000 ease-in-out pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-start mb-8 relative z-10">
            <div className="p-3 bg-white/5 border border-white/5 rounded text-white/60 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all">
                <Icon size={24} />
            </div>
            <span className="text-[9px] font-mono border border-white/10 px-2 py-1 rounded text-white/30 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors uppercase tracking-widest bg-black/50">
                {status}
            </span>
        </div>

        {/* Value */}
        <div className="mb-6 relative z-10">
            <h3 className="text-6xl font-black text-white tracking-tighter tabular-nums">
                {value}
            </h3>
            <div className="h-1 w-12 bg-cyan-500 mt-4 mb-2" />
            <span className="text-sm font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                {unit}
            </span>
        </div>

        {/* Footer */}
        <div className="border-t border-dashed border-white/10 pt-4 relative z-10">
            <p className="text-xs text-white/50 font-mono leading-relaxed">
                <span className="text-white font-bold">{label}</span> <br/>
                <span className="text-white/30"> {desc}</span>
            </p>
        </div>
    </motion.div>
  );
}
