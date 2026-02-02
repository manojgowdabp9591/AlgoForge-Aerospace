"use client";

import Apply from "@/app/components/Apply";
import PageLayout from "@/app/components/PageLayout";
import { Truck, Wrench, Settings, CheckCircle2, MapPin, Briefcase, Users, ArrowRight } from "lucide-react";

export default function GroundSupportEngineerPage() {
  return (
    <PageLayout
      title="Mission Briefing: GSE Engineer"
      subtitle="Build the backbone. Support the launch. Secure the pad."
    >
      <div className="grid md:grid-cols-3 gap-10 mt-10">
        
        {/* LEFT COLUMN: JOB DETAILS */}
        <div className="md:col-span-2 space-y-12">
          
          {/* ABOUT */}
          <section className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Truck /> Mission Overview
            </h3>
            <p className="text-white/80 leading-relaxed text-lg font-light">
              As a Ground Support Equipment (GSE) Engineer, you will design and maintain the 
              critical hardware used for launch vehicle integration and testing. You are the 
              architect of the launch pad, ensuring the rocket has the structural, fluid, 
              and mechanical support it needs before T-0. Without GSE, the rocket stays on the ground.
            </p>
          </section>

          {/* RESPONSIBILITIES */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Operational Objectives
             </h3>
             <ul className="space-y-4">
                <ListItem text="Design and maintain GSE hardware (Transport erectors, strongbacks, fluid systems)." />
                <ListItem text="Support vehicle integration and testing operations on the launch mount." />
                <ListItem text="Maintain launch site infrastructure to ensure readiness for rapid launch cadences." />
                <ListItem text="Troubleshoot mechanical and hydraulic systems in a field environment." />
             </ul>
          </section>

          {/* QUALIFICATIONS */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Prerequisites
             </h3>
             <ul className="space-y-4">
                <ListItem text="Background in Mechanical or Systems Engineering." />
                <ListItem text="Hands-on fabrication and assembly experience (Welding/Machining knowledge is a plus)." />
                <ListItem text="Experience with heavy machinery, hydraulics, or high-pressure pneumatics." />
             </ul>
          </section>

          {/* WHAT WE OFFER */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Perks
             </h3>
             <ul className="space-y-4">
                <ListItem text="Work at the center of launch operations at Sriharikota." />
                <ListItem text="Direct involvement in high-stakes launch campaigns." />
                <ListItem text="See your hardware hold up a multi-ton orbital class vehicle." />
             </ul>
          </section>

        </div>

        {/* RIGHT COLUMN: METADATA & APPLY */}
        <div className="space-y-8">
          
          {/* JOB META CARD */}
          <div className="bg-black/40 border border-white/20 p-6 rounded-xl relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 p-10 bg-yellow-500/10 blur-3xl rounded-full pointer-events-none"></div>
            
            <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                Role Intel
            </h4>
            
            <div className="space-y-5">
              <MetaRow icon={Briefcase} label="Department" value="Launch Operations" />
              <MetaRow icon={MapPin} label="Location" value="Sriharikota, India" />
              <MetaRow icon={Users} label="Openings" value="2 Positions Available" />
              <MetaRow icon={Wrench} label="Domain" value="Mechanical Systems" />
            </div>
          </div>

          {/* APPLY FORM */}
          <Apply role="Ground Support Equipment Engineer" />
          
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