"use client";

import Apply from "@/app/components/Apply";
import PageLayout from "@/app/components/PageLayout";
import { Shield, Activity, Target, CheckCircle2, MapPin, Briefcase, Users, Zap, ShieldAlert, Cpu, Wind } from "lucide-react";
import { motion } from "framer-motion";

export default function VehicleDynamicsPage() {
  return (
    <PageLayout
      title={
        <>
          Role: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Vehicle Dynamics Engineer</span>
        </>
      }
      subtitle="Define the physical reality of how our vehicles fly, survive Max-Q, and return to Earth."
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
            
            {/* Aerodynamic Glow */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-cyan-500/30 transition-all duration-1000" />
            
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
                    At <strong className="text-white font-medium">Algoforge Aerospace</strong>, you will own the physical reality of how our launch vehicle behaves in the air. 
                    <br/><br/>
                    You will build the 6-DOF simulation environments that dictate our <span className="text-cyan-400">aerodynamic stability</span>, characterize structural loads during Max-Q, and define the kinematics required for Thrust Vector Control (TVC) and grid-fin actuation during the landing burn.
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
                 <ListItem text="Develop and maintain high-fidelity 6-DOF flight trajectory simulations from pad liftoff through stage separation and booster recovery." delay={0.1} />
                 <ListItem text="Analyze aeroelasticity, slosh dynamics, and structural bending modes to ensure vehicle survivability under extreme aerodynamic pressure." delay={0.2} />
                 <ListItem text="Size and specify actuation requirements for Thrust Vector Control (TVC) gimbals and aerodynamic control surfaces." delay={0.3} />
                 <ListItem text="Collaborate with Propulsion to model the vibrational and thrust-curve impacts of the VORTEX-1 RDRE on the primary airframe." delay={0.4} />
                 <ListItem text="Analyze post-flight telemetry (IMU, Barometer, Load Cell data) to validate and tune your pre-flight simulations." delay={0.5} />
              </div>
          </section>

          {/* 3. QUALIFICATIONS */}
          <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                 <div className="h-1 w-12 bg-blue-500 rounded-full" />
                 <h3 className="text-2xl font-bold text-white tracking-tight">Mission Prerequisites</h3>
              </div>

              <div className="grid gap-4">
                 <ListItem text="B.S. or M.S. in Aerospace, Mechanical Engineering, or Physics." delay={0.1} />
                 <ListItem text="Extensive experience in rigid body dynamics, classical mechanics, and control theory." delay={0.2} />
                 <ListItem text="Proficiency in building physical simulations using C++, Python, or MATLAB/Simulink." delay={0.3} />
                 <ListItem text="Strong understanding of compressible aerodynamics and structural load paths." delay={0.4} />
                 <ListItem text="Experience with CFD tools (OpenFOAM, ANSYS Fluent, Star-CCM+) is highly preferred." delay={0.5} />
              </div>
          </section>

          {/* 4. PERKS GRID */}
          <section>
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-[0.2em] mb-8 text-center">
                 — Deployment Benefits —
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                 <PerkItem icon={Activity} title="Flight Authority" text="Your models directly dictate the flight computer's state machine." />
                 <PerkItem icon={Zap} title="Simulation Sandbox" text="Access to high-compute clusters for rapid 6-DOF iteration." />
                 <PerkItem icon={Cpu} title="Hardware Integration" text="Validate your math against live-fire RDRE telemetry." />
                 <PerkItem icon={Wind} title="Recovery Focus" text="Pioneer the grid-fin algorithms for propulsive booster landing." />
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
              <MetaRow icon={Shield} label="Department" value="Structures & Materials" />
              <MetaRow icon={MapPin} label="Location" value="Remote" />
              <MetaRow icon={Users} label="Openings" value="1 Position Available" />
              <MetaRow icon={Activity} label="Domain" value="Rigid Body Dynamics" />
              <MetaRow icon={Wind} label="Environment" value="Atmospheric Flight" />
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
             <Apply role="Vehicle Dynamics Engineer" />
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
