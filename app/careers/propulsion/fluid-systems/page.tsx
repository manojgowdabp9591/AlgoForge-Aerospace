"use client";

import Apply from "@/app/components/Apply";
import PageLayout from "@/app/components/PageLayout";
import { Shield, Activity, Target, CheckCircle2, MapPin, Briefcase, Users, Zap, Droplets, Flame, Gauge, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function FluidSystemsPage() {
  return (
    <PageLayout
      title={
        <>
          Role: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Fluid Systems Engineer</span>
        </>
      }
      subtitle="Design the circulatory system of our launch vehicles, managing extreme pressures, cryogenics, and supersonic flows."
    >
      <div className="grid lg:grid-cols-12 gap-10 mt-12">
        
        {/* --- LEFT COLUMN: MISSION DETAILS (Span 8) --- */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* 1. MISSION OVERVIEW CARD */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-white/[0.02] border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-md overflow-hidden group"
          >
            {/* Hexagon Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
            
            {/* Fluid Flow Glow */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-cyan-500/30 transition-all duration-1000" />
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
                        <Target size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-wide">
                        Mission Overview
                    </h3>
                </div>
                
                <p className="text-white/70 leading-relaxed text-lg font-light">
                    At <strong className="text-white font-medium">Algoforge Aerospace</strong>, the engine doesn't fire if the plumbing doesn't work. You are responsible for the physical circulatory system of our rockets.
                    <br/><br/>
                    You will engineer the high-pressure fluid networks that deliver propellants to the <span className="text-cyan-400">VORTEX-1 RDRE</span>. This involves mitigating cavitation, modeling transient water-hammer effects, designing cryogenic chill-down procedures, and ensuring our autogenous pressurization systems survive the brutal environment of orbital launch.
                </p>
            </div>
          </motion.section>

          {/* 2. RESPONSIBILITIES */}
          <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                 <div className="h-1 w-12 bg-cyan-500 rounded-full" />
                 <h3 className="text-2xl font-bold text-white tracking-tight">Operational Objectives</h3>
              </div>
              
              <div className="grid gap-4">
                 <ListItem text="Design, analyze, and optimize propellant feed systems (valves, regulators, manifolds) for the VORTEX-1 rotating detonation engine." delay={0.1} />
                 <ListItem text="Develop 1D fluid models to simulate transient behaviors, including water hammer, two-phase flow, and cryogenic chill-down sequences." delay={0.2} />
                 <ListItem text="Execute 3D Computational Fluid Dynamics (CFD) on complex geometries like injector plates and regenerative cooling channels." delay={0.3} />
                 <ListItem text="Collaborate with the Avionics team to specify flowmeters, pressure transducers (PTs), and thermocouples for the test stand data acquisition system." delay={0.4} />
                 <ListItem text="Support live hot-fire operations at the Mahendragiri test facility, analyzing flow data to validate your mathematical models in real-time." delay={0.5} />
              </div>
          </section>

          {/* 3. QUALIFICATIONS */}
          <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                 <div className="h-1 w-12 bg-blue-500 rounded-full" />
                 <h3 className="text-2xl font-bold text-white tracking-tight">Mission Prerequisites</h3>
              </div>

              <div className="grid gap-4">
                 <ListItem text="B.S. or M.S. in Mechanical, Aerospace, or Chemical Engineering." delay={0.1} />
                 <ListItem text="Deep mastery of thermodynamics, compressible/incompressible fluid mechanics, and heat transfer." delay={0.2} />
                 <ListItem text="Hands-on experience handling cryogenic fluids (LOX, LN2, LCH4) and high-pressure gas systems." delay={0.3} />
                 <ListItem text="Proficiency in 1D fluid flow analysis software (GFSSP, Flownex) and custom Python/MATLAB scripting." delay={0.4} />
                 <ListItem text="Experience with commercial 3D CFD solvers (ANSYS Fluent, Star-CCM+, OpenFOAM) is highly preferred." delay={0.5} />
              </div>
          </section>

          {/* 4. PERKS GRID */}
          <section>
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-[0.2em] mb-8 text-center">
                 — Deployment Benefits —
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                 <PerkItem icon={Droplets} title="Cryo Authority" text="Own the chill-down and propellant loading procedures for live fire." />
                 <PerkItem icon={Flame} title="Combustion Limits" text="Push fluid physics to the edge in rotating detonation environments." />
                 <PerkItem icon={Cpu} title="Data-Driven Reality" text="Validate your CFD directly against our ESP32 sensor telemetry." />
                 <PerkItem icon={Gauge} title="High-Pressure Impact" text="If your manifolds flow perfectly, the vehicle reaches orbit." />
              </div>
          </section>

        </div>

        {/* --- RIGHT COLUMN: METADATA & APPLY (Span 4) --- */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* JOB INTELLIGENCE CARD */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/40 border border-white/10 p-6 rounded-2xl relative overflow-hidden backdrop-blur-xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-[60px] pointer-events-none" />
            
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Briefcase size={14} /> Position Intelligence
            </h4>
            
            <div className="space-y-6">
              <MetaRow icon={Shield} label="Department" value="Propulsion Engineering" />
              <MetaRow icon={MapPin} label="Location" value="Bengaluru, KA" />
              <MetaRow icon={Users} label="Openings" value="1 Position Available" />
              <MetaRow icon={Activity} label="Domain" value="Thermodynamics & CFD" />
              <MetaRow icon={Droplets} label="Environment" value="Cryogenics & High Pressure" />
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                        Priority: High
                    </span>
                </div>
            </div>
          </motion.div>

          {/* APPLY FORM */}
          <div className="sticky top-24">
             <Apply role="Fluid Systems Engineer" />
          </div>
          
        </div>

      </div>
    </PageLayout>
  );
}

// --- SUB-COMPONENTS ---

function ListItem({ text, delay }: { text: string, delay: number }) {
  return (
    <motion.div 
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="flex items-start gap-4 group p-3 rounded-xl hover:bg-white/5 transition-colors"
    >
      <div className="mt-1 min-w-[20px]">
         <CheckCircle2 className="text-cyan-500/50 group-hover:text-cyan-400 transition-colors" size={20} />
      </div>
      <span className="text-white/80 leading-relaxed font-light text-sm md:text-base group-hover:text-white transition-colors">
        {text}
      </span>
    </motion.div>
  );
}

function PerkItem({ icon: Icon, title, text }: any) {
    return (
        <div className="flex items-start gap-4 bg-white/[0.03] p-4 rounded-xl border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all group">
            <div className="p-2 bg-black rounded-lg text-white/60 group-hover:text-cyan-400 group-hover:scale-110 transition-all border border-white/10">
                <Icon size={18} />
            </div>
            <div>
                <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                <p className="text-xs text-white/50 leading-relaxed">{text}</p>
            </div>
        </div>
    )
}

function MetaRow({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="p-2.5 bg-white/5 rounded-lg text-white/40 border border-white/5 group-hover:border-cyan-500/30 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition duration-300">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[9px] text-white/30 uppercase font-bold tracking-wider mb-0.5">{label}</p>
        <p className="text-white font-mono text-sm tracking-tight">{value}</p>
      </div>
    </div>
  );
}
