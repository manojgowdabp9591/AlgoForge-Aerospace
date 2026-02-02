"use client";

import Apply from "@/app/components/Apply";
import PageLayout from "@/app/components/PageLayout";
import { Layers, Hammer, Hexagon, CheckCircle2, MapPin, Briefcase, Users, ArrowRight } from "lucide-react";

export default function CompositeManufacturingEngineerPage() {
  return (
    <PageLayout
      title="Mission Briefing: Composite Engineer"
      subtitle="Weave the future. Build lighter. Build stronger."
    >
      <div className="grid md:grid-cols-3 gap-10 mt-10">
        
        {/* LEFT COLUMN: JOB DETAILS */}
        <div className="md:col-span-2 space-y-12">
          
          {/* ABOUT */}
          <section className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Layers /> Mission Overview
            </h3>
            <p className="text-white/80 leading-relaxed text-lg font-light">
              As a Composite Manufacturing Engineer at Space Gen, you will design, fabricate, and 
              qualify the lightweight composite structures that form the backbone of our reusable 
              launch vehicles. In extreme environments where every gram counts, your ability to 
              optimize strength-to-weight ratios determines if we make it to orbit.
            </p>
          </section>

          {/* RESPONSIBILITIES */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Operational Objectives
             </h3>
             <ul className="space-y-4">
                <ListItem text="Develop advanced composite layup schedules and manufacturing processes (AFP / Hand Layup)." />
                <ListItem text="Support the design and fabrication of high-tolerance tooling and molds." />
                <ListItem text="Inspect and qualify flight hardware using NDT (Non-Destructive Testing) methods." />
                <ListItem text="Collaborate with propulsion and structures teams to integrate tanks and fairings." />
             </ul>
          </section>

          {/* QUALIFICATIONS */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Prerequisites
             </h3>
             <ul className="space-y-4">
                <ListItem text="Bachelor’s or Master’s in Mechanical, Aerospace, or Materials Engineering." />
                <ListItem text="Deep experience with carbon fiber reinforced polymers (CFRP) and resin systems." />
                <ListItem text="Hands-on manufacturing lab experience (Autoclave curing, Vacuum bagging)." />
             </ul>
          </section>

          {/* WHAT WE OFFER */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Perks
             </h3>
             <ul className="space-y-4">
                <ListItem text="Work directly on flight hardware that will cross the Kármán line." />
                <ListItem text="Fast-paced, high-ownership engineering environment." />
                <ListItem text="Opportunity to define manufacturing standards for an early-stage space company." />
             </ul>
          </section>

        </div>

        {/* RIGHT COLUMN: METADATA & APPLY */}
        <div className="space-y-8">
          
          {/* JOB META CARD */}
          <div className="bg-black/40 border border-white/20 p-6 rounded-xl relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 p-10 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>
            
            <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                Role Intel
            </h4>
            
            <div className="space-y-5">
              <MetaRow icon={Briefcase} label="Department" value="Structures & Materials" />
              <MetaRow icon={MapPin} label="Location" value="Bengaluru, India" />
              <MetaRow icon={Users} label="Openings" value="2 Positions Available" />
              <MetaRow icon={Hexagon} label="Material" value="Carbon Composites" />
            </div>
          </div>

          {/* APPLY FORM */}
          <Apply role="Composite Manufacturing Engineer" />
          
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