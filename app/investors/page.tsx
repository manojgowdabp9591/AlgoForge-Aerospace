"use client";

import PageLayout from "../components/PageLayout";
import { motion } from "framer-motion";

export default function InvestorsPage() {
  return (
    <PageLayout 
      title="Investor Relations" 
      subtitle="Fueling the infrastructure for the next century of human history."
    >
      {/* 1. TOP STATS GRID */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        <StatCard label="Current Round" value="Series B" />
        <StatCard label="Valuation" value="$1.5B" />
        <StatCard label="Total Raised" value="$145M" />
        <StatCard label="Share Price" value="$54.20" />
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        
        {/* 2. LEFT COLUMN: REPORTS */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold mb-6 text-white">Financial & Mission Reports</h2>
          <ReportCard 
            title="Mission Success Memo: SG-1" 
            date="Today"
            desc="Preliminary telemetry confirms nominal orbit insertion. Payload deployed successfully."
          />
          <ReportCard 
            title="Q4 2025 Quarterly Report" 
            date="Jan 15, 2026"
            desc="Detailed breakdown of SG-1 engine testing results and Q1 2026 burn rate projections."
          />
          <ReportCard 
            title="Series B Funding Memo" 
            date="Oct 10, 2025"
            desc="Overview of capital allocation for the new 'Star-Forge' manufacturing facility."
          />
        </div>

        {/* 3. RIGHT COLUMN: STOCK MARKET CHART (WITH SPIKE) */}
        <div className="bg-black border border-white/20 rounded-xl p-6 h-fit shadow-2xl relative overflow-hidden">
          
          {/* Header: Stock Ticker Style */}
          <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-2xl font-black text-white tracking-widest">SPGN</h3>
              <p className="text-xs text-white/40">SPACE GEN INC.</p>
            </div>
            <div className="text-right">
              {/* Animated Price Spike */}
              <motion.div 
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 1, repeatDelay: 5 }}
              >
                <p className="text-3xl font-mono font-bold text-green-400">▲ $54.20</p>
              </motion.div>
              <p className="text-xs text-green-400/70 font-bold">+28% (Today)</p>
            </div>
          </div>

          {/* THE CHART CONTAINER */}
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

                {/* STOCK PATH: 
                    Ends with a sharp vertical spike from 40 down to 5 (High value) 
                */}
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

                {/* "Launch Success" Text Label on the chart */}
                <motion.foreignObject x="120" y="0" width="80" height="30"
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 1.5 }}
                >
                   <div className="bg-green-500/20 border border-green-500 text-green-400 text-[8px] px-1 py-0.5 rounded text-center font-bold uppercase backdrop-blur-sm">
                      Launch Success
                   </div>
                </motion.foreignObject>

                {/* Crash Zone Indicator (Red Line Overlay) */}
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

                {/* Live Pulsing Dot at End */}
                <motion.circle 
                    cx="200" cy="5" r="3" fill="#fff"
                    animate={{ r: [3, 8, 3], opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                />
            </svg>

            {/* High Volume Bar at the end */}
            <div className="absolute bottom-0 left-0 right-0 h-10 flex items-end justify-between px-2 opacity-30 gap-1">
                {[40, 30, 60, 80, 50, 20, 30, 90, 100, 70, 60, 80, 50, 40].map((h, i) => (
                    <div key={i} className={`w-full ${i === 3 ? 'bg-red-500' : 'bg-green-500'}`} style={{ height: `${h}%` }} />
                ))}
                {/* The Spike Volume */}
                <motion.div 
                    className="w-full bg-green-400" 
                    initial={{ height: "0%" }}
                    whileInView={{ height: "100%" }}
                    transition={{ delay: 1.5 }}
                />
            </div>

            {/* Axis Labels */}
            <div className="absolute top-10 right-2 text-[10px] text-green-400 bg-green-900/50 px-1 rounded">$54.20</div>
            <div className="absolute bottom-2 left-10 text-[10px] text-red-400 bg-red-900/50 px-1 rounded">2018 Low</div>

          </div>
          
          <div className="flex justify-between text-xs text-white/30 mt-2 font-mono">
            <span>2016</span>
            <span>2018</span>
            <span>2020</span>
            <span>2022</span>
            <span>2024</span>
            <span className="text-green-400 font-bold">NOW</span>
          </div>

          <button className="mt-6 w-full py-3 bg-white text-black font-bold text-sm tracking-widest hover:bg-gray-200 transition uppercase">
            Trade on NYSE
          </button>
        </div>

      </div>
    </PageLayout>
  );
}

// --- SUB-COMPONENTS ---

function StatCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-6 bg-black/50 border border-white/10 rounded-xl hover:border-cyan-400/50 transition duration-300">
      <p className="text-white/50 text-xs uppercase tracking-widest font-bold">{label}</p>
      <p className="text-3xl font-mono text-white mt-2">{value}</p>
    </div>
  );
}

function ReportCard({ title, date, desc }: { title: string, date: string, desc: string }) {
  return (
    <div className="group p-6 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold group-hover:text-cyan-400 transition">{title}</h3>
        <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">{date}</span>
      </div>
      <p className="text-white/70 mb-4">{desc}</p>
      <span className="text-sm text-cyan-400 font-bold flex items-center gap-2">
        Download PDF 
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </span>
    </div>
  );
}