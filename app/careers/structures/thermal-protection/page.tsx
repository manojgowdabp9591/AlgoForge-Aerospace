"use client";

import Apply from "@/app/components/Apply";
import PageLayout from "@/app/components/PageLayout";
import { Shield, Thermometer, Flame, Layers, CheckCircle2, MapPin, Briefcase, Users, ArrowRight } from "lucide-react";

export default function ThermalProtectionPage() {
  return (
    <PageLayout
      title="Mission Briefing: TPS Lead"
      subtitle="Shield the vehicle. Survive the inferno. Bring them home."
    >
      <div className="grid md:grid-cols-3 gap-10 mt-10">
        
        {/* LEFT COLUMN: JOB DETAILS */}
        <div className="md:col-span-2 space-y-12">
          
          {/* ABOUT */}
          <section className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Shield /> Mission Overview
            </h3>
            <p className="text-white/80 leading-relaxed text-lg font-light">
              You will lead the design and qualification of the Thermal Protection Systems (TPS) 
              that allow Space Gen vehicles to survive the searing heat of hypersonic reentry. 
              You are the barrier between a fragile payload and the destructive power of the atmosphere. 
              Your work ensures reusability isn't just a concept, but a reality.
            </p>
          </section>

          {/* RESPONSIBILITIES */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Operational Objectives
             </h3>
             <ul className="space-y-4">
                <ListItem text="Architect advanced TPS solutions (ablative & reusable) for launch and reentry environments." />
                <ListItem text="Analyze aero-thermal loads and define thermal margins using CFD/Thermal solvers." />
                <ListItem text="Lead arc-jet testing and material qualification campaigns." />
                <ListItem text="Collaborate with structural teams to integrate TPS with the primary airframe." />
             </ul>
          </section>

          {/* QUALIFICATIONS */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Prerequisites
             </h3>
             <ul className="space-y-4">
                <ListItem text="Deep expertise in high-temperature composites, ceramics, and ablative materials." />
                <ListItem text="Strong background in heat transfer, thermodynamics, and material science." />
                <ListItem text="Experience with reentry physics or hypersonic aerothermodynamics is highly valued." />
             </ul>
          </section>

          {/* WHAT WE OFFER */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Perks
             </h3>
             <ul className="space-y-4">
                <ListItem text="Full technical authority over the vehicle's thermal shield." />
                <ListItem text="Define the reusability standards for next-generation orbital class vehicles." />
                <ListItem text="Lead a dedicated team of materials engineers." />
             </ul>
          </section>

        </div>

        {/* RIGHT COLUMN: METADATA & APPLY */}
        <div className="space-y-8">
          
          {/* JOB META CARD */}
          <div className="bg-black/40 border border-white/20 p-6 rounded-xl relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 p-10 bg-orange-500/10 blur-3xl rounded-full pointer-events-none"></div>
            
            <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                Role Intel
            </h4>
            
            <div className="space-y-5">
              <MetaRow icon={Briefcase} label="Department" value="Structures & Materials" />
              <MetaRow icon={MapPin} label="Location" value="Bengaluru, India" />
              <MetaRow icon={Users} label="Openings" value="1 Position Available" />
              <MetaRow icon={Thermometer} label="Domain" value="Thermodynamics" />
            </div>
          </div>

          {/* APPLY FORM */}
          <Apply role="Thermal Protection Systems Lead" />
          
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