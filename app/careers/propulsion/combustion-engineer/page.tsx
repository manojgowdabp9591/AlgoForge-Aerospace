"use client";

import Apply from "@/app/components/Apply";
import PageLayout from "@/app/components/PageLayout";
import { Flame, Crosshair, Zap, CheckCircle2, MapPin, Briefcase, Users, ArrowRight } from "lucide-react";

export default function CombustionEngineerPage() {
  return (
    <PageLayout
      title="Mission Briefing: Combustion Devices Engineer"
      subtitle="Tame the fire. Design the thrust chamber. Ignite the future."
    >
      <div className="grid md:grid-cols-3 gap-10 mt-10">
        
        {/* LEFT COLUMN: JOB DETAILS */}
        <div className="md:col-span-2 space-y-12">
          
          {/* ABOUT */}
          <section className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Flame /> Mission Overview
            </h3>
            <p className="text-white/80 leading-relaxed text-lg font-light">
              You will design, analyze, and test the combustion systems for Space Gen's high-performance 
              liquid rocket engines. Operating at extreme pressures and temperatures, your work defines 
              the efficiency and stability of our launch vehicle. This is where chemistry meets kinetic energy.
            </p>
          </section>

          {/* RESPONSIBILITIES */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Operational Objectives
             </h3>
             <ul className="space-y-4">
                <ListItem text="Design injector patterns and combustion chamber geometries for optimal mixing." />
                <ListItem text="Analyze combustion stability (acoustic modes) and thermal performance." />
                <ListItem text="Support hot-fire engine testing campaigns at the propulsion complex." />
                <ListItem text="Collaborate with turbomachinery and test teams to integrate engine subsystems." />
             </ul>
          </section>

          {/* QUALIFICATIONS */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Prerequisites
             </h3>
             <ul className="space-y-4">
                <ListItem text="Bachelor’s or Master’s in Aerospace or Mechanical Engineering." />
                <ListItem text="Strong background in thermodynamics, compressible flow, and heat transfer." />
                <ListItem text="Experience with liquid propulsion systems or high-pressure devices is preferred." />
             </ul>
          </section>

          {/* WHAT WE OFFER */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Perks
             </h3>
             <ul className="space-y-4">
                <ListItem text="Hands-on ownership of flight propulsion hardware." />
                <ListItem text="Fast-paced development environment with rapid iteration cycles." />
                <ListItem text="Direct impact on reusable launch vehicle missions." />
             </ul>
          </section>

        </div>

        {/* RIGHT COLUMN: METADATA & APPLY */}
        <div className="space-y-8">
          
          {/* JOB META CARD */}
          <div className="bg-black/40 border border-white/20 p-6 rounded-xl relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 p-10 bg-red-500/10 blur-3xl rounded-full pointer-events-none"></div>
            
            <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                Role Intel
            </h4>
            
            <div className="space-y-5">
              <MetaRow icon={Briefcase} label="Department" value="Propulsion Engineering" />
              <MetaRow icon={MapPin} label="Location" value="Bengaluru, India" />
              <MetaRow icon={Users} label="Openings" value="1 Position Available" />
              <MetaRow icon={Zap} label="Domain" value="Thermodynamics" />
            </div>
          </div>

          {/* APPLY FORM */}
          <Apply role="Combustion Devices Engineer" />
          
        </div>

      </div>
    </PageLayout>
  );
}

// --- SUB-COMPONENTS ---

function ListItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-white/70 hover:text-white transition-colors duration-300">
      <CheckCircle2 className="text-cyan-400 shrink-0 mt-1" size={18} />
      <span className="leading-relaxed">{text}</span>
    </li>
  );
}

function MetaRow({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="p-2 bg-white/5 rounded-lg text-cyan-400 border border-white/5">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">{label}</p>
        <p className="text-white font-mono text-sm">{value}</p>
      </div>
    </div>
  );
}