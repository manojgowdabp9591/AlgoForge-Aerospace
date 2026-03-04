"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity, Shield, Rocket, Users,
  ChevronRight, Terminal, Target,
  Lock, AlertTriangle, Cpu, Radio,
} from "lucide-react";

// ── TYPING ANIMATION HOOK ─────────────────────
function useTypingEffect(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text]);
  return displayed;
}

// ── MISSION CARD DATA ─────────────────────────
const PORTALS = [
  {
    href: "/admin/mission",
    label: "Mission Control",
    sublabel: "Director Dashboard",
    description:
      "Full access to live telemetry, launch sequencing, ARM / FIRE / ABORT controls, stage progression, and real-time event broadcasting to public viewers.",
    icon: Rocket,
    accent: "red",
    tag: "CLASSIFIED",
    stats: [
      { label: "Status", value: "STANDBY" },
      { label: "System", value: "ONLINE" },
      { label: "Access", value: "DIRECTOR" },
    ],
    border: "hover:border-red-500/50",
    glow: "hover:shadow-[0_0_50px_rgba(220,38,38,0.15)]",
    tagColor: "bg-red-500/10 text-red-400 border-red-500/20",
    iconBg: "bg-red-500/5 text-red-400 ring-red-500/20",
    iconGlow: "shadow-[0_0_20px_rgba(220,38,38,0.2)]",
    accentBar: "from-transparent via-red-600 to-transparent",
    chevronColor: "text-red-500/40",
    statColor: "text-red-400",
    cornerColor: "border-red-500",
  },
  {
    href: "/admin/applications",
    label: "Applications",
    sublabel: "Careers Command",
    description:
      "Review, search, and manage all personnel applications submitted via the careers portal. Contact applicants directly and maintain your talent pipeline.",
    icon: Users,
    accent: "cyan",
    tag: "PERSONNEL",
    stats: [
      { label: "Module", value: "CAREERS" },
      { label: "Access", value: "ADMIN" },
      { label: "Link", value: "ACTIVE" },
    ],
    border: "hover:border-cyan-500/50",
    glow: "hover:shadow-[0_0_50px_rgba(6,182,212,0.15)]",
    tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    iconBg: "bg-cyan-500/5 text-cyan-400 ring-cyan-500/20",
    iconGlow: "shadow-[0_0_20px_rgba(6,182,212,0.2)]",
    accentBar: "from-transparent via-cyan-500 to-transparent",
    chevronColor: "text-cyan-500/40",
    statColor: "text-cyan-400",
    cornerColor: "border-cyan-500",
  },
];

// ── MAIN COMPONENT ────────────────────────────
export default function AdminHub() {
  const router = useRouter();
  const typed = useTypingEffect("COMMAND_CONSOLE://INITIALIZE...", 45);
  const [time, setTime] = useState("");

  useEffect(() => {
    // Auth guard
    const auth = sessionStorage.getItem("admin_auth");
    if (!auth) router.replace("/admin/login");

    // Live clock
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen p-6 md:p-10 max-w-6xl mx-auto overflow-hidden">

      {/* ── BACKGROUND (matches applications page exactly) ── */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 space-y-10">

        {/* ── HEADER HUD ── */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-red-900/30 pb-6"
        >
          <div>
            <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-4 tracking-tighter">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 blur-lg opacity-40" />
                <Activity className="relative z-10 text-red-400" size={32} />
              </div>
              ALGOFORGE{" "}
              <span className="text-red-500">COMMAND</span>
            </h1>

            {/* Typing effect subtitle */}
            <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.2em] text-red-500/50 uppercase">
              <span className="flex items-center gap-2">
                <Shield size={10} />
                {typed}
                <span className="w-[6px] h-[10px] bg-red-500/60 animate-pulse inline-block" />
              </span>
            </div>
          </div>

          {/* Live clock + system status */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end gap-1">
              <span className="text-[9px] text-white/20 uppercase tracking-widest font-mono">
                LOCAL TIME
              </span>
              <span className="text-sm font-mono font-bold text-white/60 tabular-nums">
                {time}
              </span>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-[9px] text-white/20 uppercase tracking-widest font-mono">
                Auth Level
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-red-400">
                <Lock size={10} />
                DIRECTOR
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-mono text-red-500/60 uppercase tracking-widest">
                SECURE
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── SYSTEM STATUS BAR ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          {[
            { icon: Cpu, label: "GNC", value: "NOMINAL", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
            { icon: Radio, label: "UPLINK", value: "ACTIVE", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
            { icon: Target, label: "AFSS", value: "ARMED", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
            { icon: AlertTriangle, label: "THREAT LVL", value: "NOMINAL", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
            { icon: Terminal, label: "SYS ID", value: "VTX-V9.2", color: "text-white/40", bg: "bg-white/5 border-white/10" },
          ].map((s) => (
            <div
              key={s.label}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${s.bg} text-[10px] font-mono uppercase tracking-wider`}
            >
              <s.icon size={11} className={s.color} />
              <span className="text-white/30">{s.label}:</span>
              <span className={s.color}>{s.value}</span>
            </div>
          ))}
        </motion.div>

        {/* ── SECTION LABEL ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]"
        >
          /// SELECT_OPERATIONAL_MODULE
        </motion.p>

        {/* ── PORTAL CARDS ── */}
        <div className="grid md:grid-cols-2 gap-6">
          {PORTALS.map((portal, i) => (
            <motion.div
              key={portal.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.1 }}
            >
              <Link href={portal.href} className="block group">
                <div
                  className={`relative bg-[#0d0d12] border border-white/10 ${portal.border} ${portal.glow}
                    p-8 rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer`}
                >
                  {/* Top accent line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${portal.accentBar} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                  />

                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`w-3 h-3 border-t-2 border-r-2 ${portal.cornerColor}`} />
                  </div>
                  <div className="absolute bottom-0 left-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`w-3 h-3 border-b-2 border-l-2 ${portal.cornerColor}`} />
                  </div>

                  {/* Header row */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-4 rounded-xl ring-1 ${portal.iconBg} ${portal.iconGlow} 
                          transition-all duration-300 group-hover:scale-110`}
                      >
                        <portal.icon size={28} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-white tracking-tight uppercase">
                          {portal.label}
                        </h2>
                        <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mt-0.5">
                          {portal.sublabel}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-bold font-mono uppercase tracking-widest 
                        px-2.5 py-1 rounded-lg border ${portal.tagColor}`}
                    >
                      {portal.tag}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/40 font-light leading-relaxed mb-8 line-clamp-3">
                    {portal.description}
                  </p>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {portal.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-white/[0.02] border border-white/5 rounded-xl p-3"
                      >
                        <div className="text-[9px] text-white/20 uppercase tracking-widest font-mono mb-1">
                          {stat.label}
                        </div>
                        <div className={`text-[11px] font-bold font-mono ${portal.statColor}`}>
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA row */}
                  <div
                    className={`flex items-center justify-between pt-5 border-t border-white/[0.06]`}
                  >
                    <span
                      className={`text-xs font-bold font-mono uppercase tracking-widest ${portal.statColor} 
                        opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0`}
                    >
                      ENTER MODULE
                    </span>
                    <div
                      className={`flex items-center gap-1 ${portal.chevronColor} 
                        group-hover:gap-3 transition-all duration-300`}
                    >
                      <ChevronRight size={16} />
                      <ChevronRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── BOTTOM SYSTEM FOOTER ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-white/[0.05] gap-4"
        >
          <p className="text-[9px] text-white/20 uppercase tracking-widest font-mono">
            System ID: VTX-SECURE-V9.2 // Encrypted 256-bit // AlgoForge Aerospace
          </p>
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 bg-red-500/30 rounded-full animate-pulse" />
            <div className="w-1.5 h-1.5 bg-red-500/30 rounded-full animate-pulse delay-75" />
            <div className="w-1.5 h-1.5 bg-red-500/30 rounded-full animate-pulse delay-150" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
