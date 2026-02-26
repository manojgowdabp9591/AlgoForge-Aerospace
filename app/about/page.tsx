"use client";

import PageLayout from "../components/PageLayout";
import { motion } from "framer-motion";
import { Rocket, Cpu, Globe, Flag, Flame, Quote, Target, Zap, Layers } from "lucide-react";

export default function AboutPage() {
  return (
    <PageLayout
      title={
        <>
          About <span className="text-cyan-400">Future Makers</span>
        </>
      }
      subtitle="Advancing propulsion physics. Democratizing orbit. Building the infrastructure of the next century."
    >
      <div className="relative z-10 space-y-32 mt-16">
        
        {/* BACKGROUND ACCENTS */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

        {/* ================= FOUNDER (The Vision) ================= */}
        <section className="grid lg:grid-cols-12 gap-12 items-center group">
          
          {/* IMAGE COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
              {/* Image Filter */}
              <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20" />
              
              {/* Tech Overlay */}
              <div className="absolute top-4 right-4 z-30 flex gap-2">
                 <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                 <div className="w-2 h-2 bg-white/20 rounded-full" />
              </div>

              <img
                src="/founder.png"
                alt="Manoj Gowda B P"
                className="w-fit h-fit object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Nameplate */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-30 border-t border-white/10 bg-black/60 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white tracking-wide">
                  Manoj Gowda B P
                </h3>
                <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] mt-1">
                  Founder & CEO
                </p>
              </div>
            </div>
            
            {/* Decorative Frame Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-3xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-cyan-500/30 rounded-br-3xl -z-10" />
          </motion.div>

          {/* TEXT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-[10px] font-mono uppercase tracking-widest mb-6">
                <Flag size={12} /> Strategic Command
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-[1.1]">
              Breaking the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Propulsion Plateau
              </span>
            </h2>

            <div className="space-y-6 text-lg text-white/60 font-light leading-relaxed">
              <p>
                For decades, chemical rocket propulsion has advanced incrementally. 
                Traditional engines rely on constant-pressure combustion, which imposes 
                fundamental efficiency limits. We are hitting the ceiling of what is possible with old physics.
              </p>

              <p>
                I founded <strong className="text-white">AlgoForge Aerospace</strong> to shatter that ceiling. 
                By pursuing <span className="text-cyan-300">pressure-gain combustion</span> through rotary detonation engines, 
                we are unlocking the ability to extract significantly more energy from every gram of propellant.
              </p>
            </div>

            {/* QUOTE BLOCK */}
            <div className="mt-10 relative p-8 rounded-2xl bg-white/[0.03] border border-white/5">
                <Quote className="absolute top-6 left-6 text-cyan-500/20 rotate-180" size={40} />
                <blockquote className="relative z-10 text-xl text-white/90 italic text-center font-medium">
                  “Our objective is not novelty. It’s efficiency, repeatability, and systems that scale into real launch operations.”
                </blockquote>
            </div>

            <div className="flex gap-4 mt-8">
                <StatBadge label="Focus" value="Strategy" color="cyan" />
                <StatBadge label="Vision" value="Orbital Access" color="cyan" />
            </div>

          </motion.div>
        </section>

        {/* ================= CO-FOUNDER (The Architect) ================= */}
        <section className="grid lg:grid-cols-12 gap-12 items-center group">
          
          {/* TEXT COLUMN (Order 2 on Mobile, 1 on Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <div className="flex justify-end lg:justify-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-purple-400 text-[10px] font-mono uppercase tracking-widest mb-6">
                    <Cpu size={12} /> Technical Direction
                </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-[1.1] text-right lg:text-left">
              Engineering for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-600">
                Control & Reliability
              </span>
            </h2>

            <div className="space-y-6 text-lg text-white/60 font-light leading-relaxed text-right lg:text-left">
              <p>
                Detonation-based propulsion introduces extreme thermal and pressure environments 
                that most materials cannot survive. Making it viable requires a disciplined, 
                first-principles approach to system architecture.
              </p>

              <p>
                My work focuses on the <strong className="text-white">VORTEX-1</strong> engine architecture—combining 
                high-fidelity simulation, advanced materials engineering, and relentless test-driven iteration. 
                We don't just want it to run; we want it to run <span className="text-purple-300">reliably</span>.
              </p>
            </div>

            {/* QUOTE BLOCK */}
            <div className="mt-10 relative p-8 rounded-2xl bg-white/[0.03] border border-white/5">
                <Quote className="absolute top-6 right-6 text-purple-500/20" size={40} />
                <blockquote className="relative z-10 text-xl text-white/90 italic text-center font-medium">
                  “Simplicity improves reliability. The goal is fewer failure modes, not more complexity.”
                </blockquote>
            </div>

            <div className="flex gap-4 mt-8 justify-end lg:justify-start">
                <StatBadge label="System" value="Propulsion" color="purple" />
                <StatBadge label="Discipline" value="Architecture" color="purple" />
            </div>

          </motion.div>

          {/* IMAGE COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative order-1 lg:order-2"
          >
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
              <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20" />
              
              <div className="absolute top-4 left-4 z-30 flex gap-2">
                 <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                 <div className="w-2 h-2 bg-white/20 rounded-full" />
              </div>

              <img
                src="/Co-founder.jpeg"
                alt="Sandeep S M"
                className="w-fit h-fit object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 z-30 border-t border-white/10 bg-black/60 backdrop-blur-md">
                <div className="text-right">
                    <h3 className="text-2xl font-bold text-white tracking-wide">
                    Sandeep S M
                    </h3>
                    <p className="text-purple-400 font-mono text-xs uppercase tracking-[0.2em] mt-1">
                    Co-Founder & CTO
                    </p>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-purple-500/30 rounded-tr-3xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-purple-500/30 rounded-bl-3xl -z-10" />
          </motion.div>

        </section>

        {/* ================= PRINCIPLES GRID ================= */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pt-20 border-t border-white/10"
        >
            <div className="text-center mb-16">
                <h3 className="text-3xl font-bold text-white mb-4">Core Directives</h3>
                <p className="text-white/50 max-w-xl mx-auto">The fundamental truths that guide every engineering decision at AlgoForge.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
                title="Pressure-Gain Combustion"
                icon={Flame}
                color="text-orange-500"
                desc="Rotary detonation enables higher thermodynamic efficiency by effectively increasing chamber pressure during the combustion process, rather than losing it."
            />
            <ValueCard
                title="Rapid Reusability"
                icon={Layers}
                color="text-emerald-500"
                desc="A vehicle architecture designed from day one for airline-like operations. Fast inspection, minimal refurbishment, and high launch cadence."
            />
            <ValueCard
                title="Accessible Orbit"
                icon={Globe}
                color="text-blue-500"
                desc="Lowering the cost per kilogram unlocks scientific, commercial, and educational access to space. We are building the railroad to the stars."
            />
            </div>
        </motion.div>

      </div>
    </PageLayout>
  );
}

/* ---------- SUB-COMPONENTS ---------- */

function StatBadge({ label, value, color }: { label: string, value: string, color: "cyan" | "purple" }) {
    const colorClasses = color === "cyan" 
        ? "border-cyan-500/30 text-cyan-400 bg-cyan-950/20" 
        : "border-purple-500/30 text-purple-400 bg-purple-950/20";

    return (
        <div className={`px-4 py-2 rounded-lg border ${colorClasses} flex flex-col items-start min-w-[120px]`}>
            <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">{label}</span>
            <span className="text-sm font-bold text-white">{value}</span>
        </div>
    )
}

function ValueCard({ title, desc, icon: Icon, color }: any) {
  return (
    <div className="group relative p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 overflow-hidden">
      {/* Hover Gradient */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition duration-500 bg-current ${color}`} />
      
      <div className={`mb-6 p-4 rounded-xl bg-black border border-white/10 w-fit ${color}`}>
        <Icon size={32} />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white transition-colors">
        {title}
      </h3>
      
      <p className="text-white/50 leading-relaxed text-sm font-light group-hover:text-white/70 transition-colors">
        {desc}
      </p>
    </div>
  );
}
