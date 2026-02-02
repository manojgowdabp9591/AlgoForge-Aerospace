"use client";

import Apply from "@/app/components/Apply";
import PageLayout from "@/app/components/PageLayout";
import { Radio, Target, ClipboardCheck, CheckCircle2, MapPin, Briefcase, Users, ArrowRight } from "lucide-react";

export default function MissionManagerPage() {
  return (
    <PageLayout
      title="Mission Briefing: Mission Manager"
      subtitle="Orchestrate the countdown. Clear the range. Go for launch."
    >
      <div className="grid md:grid-cols-3 gap-10 mt-10">
        
        {/* LEFT COLUMN: JOB DETAILS */}
        <div className="md:col-span-2 space-y-12">
          
          {/* ABOUT */}
          <section className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Radio /> Mission Overview
            </h3>
            <p className="text-white/80 leading-relaxed text-lg font-light">
              As a Mission Manager, you are the conductor of the symphony of fire. You will lead 
              mission planning and execution across all launch operations at Sriharikota. From 
              payload integration to the final T-0 count, you hold the playbook that ensures 
              Space Gen delivers payloads to orbit safely and on schedule.
            </p>
          </section>

          {/* RESPONSIBILITIES */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Operational Objectives
             </h3>
             <ul className="space-y-4">
                <ListItem text="Plan and execute end-to-end launch campaigns, from vehicle rollout to liftoff." />
                <ListItem text="Coordinate cross-functional teams (Avionics, Propulsion, GNC) during critical countdown phases." />
                <ListItem text="Serve as the primary point of contact for payload customers and range safety officers." />
                <ListItem text="Exercise Go/No-Go authority based on vehicle health and weather criteria." />
             </ul>
          </section>

          {/* QUALIFICATIONS */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Prerequisites
             </h3>
             <ul className="space-y-4">
                <ListItem text="5+ years of aerospace operations experience (Launch control or Mission control)." />
                <ListItem text="Strong leadership skills with the ability to make split-second decisions under pressure." />
                <ListItem text="Deep understanding of launch vehicle systems and range safety protocols." />
             </ul>
          </section>

          {/* WHAT WE OFFER */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Perks
             </h3>
             <ul className="space-y-4">
                <ListItem text="Mission-level ownership of the launch timeline." />
                <ListItem text="Leadership role defining the operational cadence of a new space power." />
                <ListItem text="A front-row seat to history." />
             </ul>
          </section>

        </div>

        {/* RIGHT COLUMN: METADATA & APPLY */}
        <div className="space-y-8">
          
          {/* JOB META CARD */}
          <div className="bg-black/40 border border-white/20 p-6 rounded-xl relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 p-10 bg-green-500/10 blur-3xl rounded-full pointer-events-none"></div>
            
            <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                Role Intel
            </h4>
            
            <div className="space-y-5">
              <MetaRow icon={Briefcase} label="Department" value="Launch Operations" />
              <MetaRow icon={MapPin} label="Location" value="Sriharikota, India" />
              <MetaRow icon={Users} label="Openings" value="1 Position Available" />
              <MetaRow icon={Target} label="Clearance" value="Mission Critical" />
            </div>
          </div>

          {/* APPLY FORM */}
          <Apply role="Mission Manager" />
          
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