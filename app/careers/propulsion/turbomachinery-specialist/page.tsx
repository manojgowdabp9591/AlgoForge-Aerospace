"use client";

import Apply from "@/app/components/Apply";
import PageLayout from "@/app/components/PageLayout";
import { Fan, PenTool, Wind, CheckCircle2, MapPin, Briefcase, Users, ArrowRight } from "lucide-react";

export default function TurbomachinerySpecialistPage() {
  return (
    <PageLayout
      title="Mission Briefing: Turbomachinery Specialist"
      subtitle="Design the heart of the engine. Push fluids to the limit."
    >
      <div className="grid md:grid-cols-3 gap-10 mt-10">
        
        {/* LEFT COLUMN: JOB DETAILS */}
        <div className="md:col-span-2 space-y-12">
          
          {/* ABOUT */}
          <section className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Fan /> Mission Overview
            </h3>
            <p className="text-white/80 leading-relaxed text-lg font-light">
              You will design and validate the high-performance turbopumps and rotating machinery 
              that power Space Gen’s reusable rocket engines. This role demands precision engineering 
              to handle extreme pressures and cryogenic temperatures. You are building the muscle 
              that lifts us off the ground.
            </p>
          </section>

          {/* RESPONSIBILITIES */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Operational Objectives
             </h3>
             <ul className="space-y-4">
                <ListItem text="Design turbopumps and high-speed rotating assemblies (Impellers, Inducers, Turbines)." />
                <ListItem text="Analyze vibration, fatigue, and thermal loads using FEA/CFD tools." />
                <ListItem text="Support manufacturing processes and component testing validation." />
                <ListItem text="Collaborate with combustion engineers to optimize engine cycle efficiency." />
             </ul>
          </section>

          {/* QUALIFICATIONS */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Prerequisites
             </h3>
             <ul className="space-y-4">
                <ListItem text="Strong mechanical engineering fundamentals (Thermodynamics, Fluid Dynamics)." />
                <ListItem text="Experience with turbomachinery, rotor dynamics, or rotating systems." />
                <ListItem text="Proficiency in CFD or FEA analysis (ANSYS, Nastran, etc) is a plus." />
             </ul>
          </section>

          {/* WHAT WE OFFER */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Perks
             </h3>
             <ul className="space-y-4">
                <ListItem text="Direct ownership of critical propulsion subsystems." />
                <ListItem text="Exposure to the full engine development lifecycle: Design → Build → Fire." />
             </ul>
          </section>

        </div>

        {/* RIGHT COLUMN: METADATA & APPLY */}
        <div className="space-y-8">
          
          {/* JOB META CARD */}
          <div className="bg-black/40 border border-white/20 p-6 rounded-xl relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 p-10 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none"></div>
            
            <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                Role Intel
            </h4>
            
            <div className="space-y-5">
              <MetaRow icon={Briefcase} label="Department" value="Propulsion Engineering" />
              <MetaRow icon={MapPin} label="Location" value="Bengaluru, India" />
              <MetaRow icon={Users} label="Openings" value="1 Position Available" />
              <MetaRow icon={Wind} label="Domain" value="Fluid Dynamics" />
            </div>
          </div>

          {/* APPLY FORM */}
          <Apply role="Turbomachinery Specialist" />
          
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