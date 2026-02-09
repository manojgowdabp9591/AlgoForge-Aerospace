"use client";

import PageLayout from "../components/PageLayout";
import { motion } from "framer-motion";
import {
  Activity,
  TrendingUp,
  PieChart,
  Globe,
  Download,
  ArrowUpRight,
} from "lucide-react";

export default function InvestorsPage() {
  return (
    <PageLayout
      title="Investor Relations"
      subtitle="Building the physical infrastructure required for the next era of space operations."
    >
      {/* 1. TOP STATS GRID */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        <StatCard label="Funding Stage" value="Private · Growth" icon={Activity} />
        <StatCard
          label="Implied Valuation"
          value="Confidential"
          icon={TrendingUp}
        />
        <StatCard
          label="Capital Deployed"
          value="$145M+"
          icon={PieChart}
        />
        <StatCard label="Operating Sites" value="4" icon={Globe} />
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {/* 2. LEFT COLUMN: REPORTS */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
            <span className="w-1 h-8 bg-cyan-500 rounded-full mr-2" />
            Updates & Technical Briefings
          </h2>

          <ReportCard
            title="VORTEX-1 Ground Test Summary"
            date="Recent"
            desc="Initial rotary detonation engine testing demonstrates stable wave propagation and nominal chamber pressures across the planned throttle envelope."
          />
          <ReportCard
            title="Q4 Engineering & Financial Update"
            date="Jan 2026"
            desc="Summary of Orbiton-1 vehicle progress, manufacturing readiness, and forward operating expense outlook."
          />
          <ReportCard
            title="Growth Capital Deployment Memo"
            date="Oct 2025"
            desc="Capital allocation strategy supporting propulsion maturation, vehicle integration, and composite manufacturing scale-up."
          />
        </div>

        {/* 3. RIGHT COLUMN: MARKET VISUAL (CONCEPTUAL) */}
        <div className="bg-black border border-white/20 rounded-xl p-6 h-fit shadow-2xl relative overflow-hidden group">
          {/* Header */}
          <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-2xl font-extrabold text-white tracking-wider group-hover:text-cyan-400 transition duration-500">
                Vortex Aerospace
              </h3>
              <p className="text-xs text-white/40 uppercase tracking-wider">
                Private Company · Internal Performance Snapshot
              </p>
            </div>
            <div className="text-right">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 0.5, repeat: 1, repeatDelay: 6 }}
              >
                <p className="text-2xl font-mono font-bold text-cyan-400">
                  ▲ Execution Momentum
                </p>
              </motion.div>
              <p className="text-xs text-white/50 font-semibold">
                Milestone velocity increasing
              </p>
            </div>
          </div>
<div className="relative h-64 w-full bg-white/5 rounded border border-white/10 p-2">
            
            {/* Grid Lines */}
            <div className="absolute inset-0 grid grid-rows-4 grid-cols-4 gap-0 pointer-events-none opacity-10">
                <div className="border-t border-r border-white w-full h-full"></div>
                <div className="border-t border-r border-white w-full h-full"></div>
                <div className="border-t border-r border-white w-full h-full"></div>
                <div className="border-t border-white w-full h-full"></div>
                <div className="border-t border-r border-white w-full h-full"></div>
                <div className="border-t border-r border-white w-full h-full"></div>
                <div className="border-t border-r border-white w-full h-full"></div>
                <div className="border-t border-white w-full h-full"></div>
            </div>

            {/* SVG CHART */}
            <svg className="absolute inset-0 w-full h-full overflow-visible p-4" viewBox="0 0 200 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4ade80" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
                    </linearGradient>
                </defs>

                <motion.path 
                    d="M0,60 L20,65 L30,55 L40,90 L50,95 L60,85 L70,90 L90,70 L110,75 L130,50 L150,55 L160,50 L170,55 L180,40 L185,45 L190,5 L200,5 L200,100 L0,100 Z" 
                    fill="url(#stockGradient)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />

                <motion.path
                    d="M0,60 L20,65 L30,55 L40,90 L50,95 L60,85 L70,90 L90,70 L110,75 L130,50 L150,55 L160,50 L170,55 L180,40 L185,45 L190,5 L200,5"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "linear" }}
                />

                {/* "Launch Success" Text Label */}
                <motion.foreignObject x="120" y="0" width="80" height="30"
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 1.5 }}
                >
                   <div className="bg-green-500/20 border border-green-500 text-green-400 text-[8px] px-1 py-0.5 rounded text-center font-bold uppercase backdrop-blur-sm">
                      Launch Success
                   </div>
                </motion.foreignObject>

                {/* Crash Zone Indicator */}
                <motion.path
                    d="M30,55 L40,90 L50,95"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                />

                {/* Live Pulsing Dot */}
                <motion.circle 
                    cx="200" cy="5" r="3" fill="#fff"
                    animate={{ r: [3, 8, 3], opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                />
            </svg>

            {/* High Volume Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-10 flex items-end justify-between px-2 opacity-30 gap-1">
                {[40, 30, 60, 80, 50, 20, 30, 90, 100, 70, 60, 80, 50, 40].map((h, i) => (
                    <div key={i} className={`w-full ${i === 3 ? 'bg-red-500' : 'bg-green-500'}`} style={{ height: `${h}%` }} />
                ))}
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-white/30 mt-2 font-mono">
            <span>2022</span>
            <span>2023</span>
            <span>2024</span>
            <span>2025</span>
            <span className="text-green-400 font-bold">NOW</span>
          </div>

          <button className="mt-6 w-full py-3 bg-white text-black font-bold text-sm tracking-widest hover:bg-cyan-400 hover:scale-105 transition-all duration-300 uppercase rounded flex items-center justify-center gap-2">
            View on NYSE <ArrowUpRight size={16} />
          </button>
        </div>
        </div>
    </PageLayout>
  );
}

/* ---------- SUB-COMPONENTS ---------- */

function StatCard({ label, value, icon: Icon }: any) {
  return (
    <div className="group relative p-6 bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/40 transition duration-500">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-80 group-hover:text-cyan-500 transition duration-500">
        <Icon size={44} />
      </div>
      <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-2">
        {label}
      </p>
      <p className="text-2xl font-mono text-white group-hover:text-cyan-400 transition">
        {value}
      </p>
    </div>
  );
}

function ReportCard({ title, date, desc }: any) {
  return (
    <div className="group p-6 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition cursor-pointer relative overflow-hidden">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-cyan-400 transition">
          {title}
        </h3>
        <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/20">
          {date}
        </span>
      </div>
      <p className="text-white/60 mb-6 text-sm leading-relaxed">{desc}</p>

      <div className="flex items-center gap-2 text-xs font-semibold text-white/40 group-hover:text-white transition uppercase tracking-wider">
        <Download size={14} />
        <span>Download Brief</span>
      </div>
    </div>
  );
}
