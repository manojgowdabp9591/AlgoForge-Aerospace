"use client";

import Apply from "@/app/components/Apply";
import PageLayout from "@/app/components/PageLayout";
import { Shield, Activity, Target, CheckCircle2, MapPin, Briefcase, Users, ShieldAlert, Crosshair, AlertTriangle, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function SafetyOfficerPage() {
  return (
    <PageLayout
      title={
        <>
          Role: <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Launch Safety Officer</span>
        </>
      }
      subtitle="Protect the crew, the public, and the hardware. You hold the ultimate Go/No-Go authority."
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
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
            
            {/* Red Alert Glow */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-red-500/30 transition-all duration-1000" />
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-500/10 rounded-lg text-red-400 border border-red-500/20">
                        <Target size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-wide">
                        Mission Overview
                    </h3>
                </div>
                
                <p className="text-white/70 leading-relaxed text-lg font-light">
                    At <strong className="text-white font-medium">Algoforge Aerospace</strong>, we push boundaries, but we do not gamble with lives. 
                    <br/><br/>
                    As the Launch Safety Officer, you are the ultimate gatekeeper. You will oversee the safety protocols for VORTEX-1 RDRE hot-fire tests and full-stack flight operations. From designing the physical <span className="text-red-400">Flight Termination System (FTS)</span> boundaries to establishing clear range-clearance procedures, your word overrides every engineer on the team. If it is not safe, it does not fly.
                </p>
            </div>
          </motion.section>

          {/* 2. RESPONSIBILITIES */}
          <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                 <div className="h-1 w-12 bg-red-500 rounded-full" />
                 <h3 className="text-2xl font-bold text-white tracking-tight">Operational Objectives</h3>
              </div>
              
              <div className="grid gap-4">
                 <ListItem text="Define, enforce, and audit Go/No-Go criteria for all live-fire engine tests and vehicle launches." delay={0.1} />
                 <ListItem text="Collaborate with Avionics to design and test dual-redundant, tamper-proof Flight Termination Systems (FTS) and Ground Abort logic." delay={0.2} />
                 <ListItem text="Develop Hazardous Operations procedures for handling high explosives (ordnance), high-pressure gases, and cryogenic propellants." delay={0.3} />
                 <ListItem text="Act as the primary liaison with range authorities (e.g., IN-SPACe, ISRO) to ensure regulatory compliance and secure launch clearances." delay={0.4} />
                 <ListItem text="Lead pre-mission safety briefings, control the master Abort button on the Mission Dashboard, and execute immediate anomaly resolution protocols." delay={0.5} />
              </div>
          </section>

          {/* 3. QUALIFICATIONS */}
          <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                 <div className="h-1 w-12 bg-orange-500 rounded-full" />
                 <h3 className="text-2xl font-bold text-white tracking-tight">Mission Prerequisites</h3>
              </div>

              <div className="grid gap-4">
                 <ListItem text="B.S. in Systems Engineering, Aerospace, or equivalent military/range operations experience." delay={0.1} />
                 <ListItem text="Proven background in hazardous operations, explosive safety, or launch range control." delay={0.2} />
                 <ListItem text="Deep familiarity with aerospace safety standards (e.g., AFSPCMAN 91-710, RCC 319, or regional equivalents)." delay={0.3} />
                 <ListItem text="Impeccable communication skills and the ability to remain ice-cold and decisive under extreme pressure." delay={0.4} />
                 <ListItem text="Willingness to travel to active test sites (Mahendragiri/Sriharikota) and work in harsh field conditions." delay={0.5} />
              </div>
          </section>

          {/* 4. PERKS GRID */}
          <section>
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-[0.2em] mb-8 text-center">
                 — Deployment Benefits —
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                 <PerkItem icon={ShieldAlert} title="Absolute Authority" text="Your safety calls are final. No engineering deadline overrides you." />
                 <PerkItem icon={Crosshair} title="FTS Ownership" text="Design the explosive and electronic systems that terminate bad flights." />
                 <PerkItem icon={Lock} title="Regulatory Lead" text="Be the face of Algoforge's safety culture to government space agencies." />
                 <PerkItem icon={AlertTriangle} title="Frontline Ops" text="Be in the bunker, hands on the console, during every major test." />
              </div>
          </section>

        </div>

        {/* --- RIGHT COLUMN: METADATA & APPLY (Span 4) --- */}
        <div className="lg:col-span-4 space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/40 border border-white/10 p-6 rounded-2xl relative overflow-hidden backdrop-blur-xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 blur-[60px] pointer-events-none" />
            
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Briefcase size={14} /> Position Intelligence
            </h4>
            
            <div className="space-y-6">
              <MetaRow icon={Shield} label="Department" value="Launch Operations" />
              <MetaRow icon={MapPin} label="Location" value="Sriharikota, AP (On-Site)" />
              <MetaRow icon={Users} label="Openings" value="1 Position Available" />
              <MetaRow icon={Activity} label="Domain" value="Range Safety & FTS" />
              <MetaRow icon={AlertTriangle} label="Environment" value="Hazardous / Live Fire" />
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-mono text-red-400 uppercase tracking-widest">
                        Priority: Critical
                    </span>
                </div>
            </div>
          </motion.div>

          <div className="sticky top-24">
             <Apply role="Launch Safety Officer" />
          </div>
          
        </div>
      </div>
    </PageLayout>
  );
}

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
         <CheckCircle2 className="text-red-500/50 group-hover:text-red-400 transition-colors" size={20} />
      </div>
      <span className="text-white/80 leading-relaxed font-light text-sm md:text-base group-hover:text-white transition-colors">{text}</span>
    </motion.div>
  );
}

function PerkItem({ icon: Icon, title, text }: any) {
    return (
        <div className="flex items-start gap-4 bg-white/[0.03] p-4 rounded-xl border border-white/5 hover:border-red-500/30 hover:bg-white/[0.06] transition-all group">
            <div className="p-2 bg-black rounded-lg text-white/60 group-hover:text-red-400 group-hover:scale-110 transition-all border border-white/10"><Icon size={18} /></div>
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
      <div className="p-2.5 bg-white/5 rounded-lg text-white/40 border border-white/5 group-hover:border-red-500/30 group-hover:text-red-400 group-hover:bg-red-500/10 transition duration-300"><Icon size={18} /></div>
      <div>
        <p className="text-[9px] text-white/30 uppercase font-bold tracking-wider mb-0.5">{label}</p>
        <p className="text-white font-mono text-sm tracking-tight">{value}</p>
      </div>
    </div>
  );
}
