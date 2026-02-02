"use client";

import Apply from "@/app/components/Apply";
import PageLayout from "@/app/components/PageLayout";
import { Flame, Wrench, AlertTriangle, CheckCircle2, MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";

export default function TestStandOperatorPage() {
  return (
    <PageLayout
      title="Mission Briefing: Test Stand Operator"
      subtitle="Command the firing line. Verify performance. Ensure safety."
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
              You will operate and maintain the propulsion test stands used for hot-fire 
              testing of Space Gen’s rocket engines. This is a hands-on, high-stakes role 
              where you are the final checkpoint between a static engine and flight hardware. 
              You ensure that when we light the candle, it burns exactly as predicted.
            </p>
          </section>

          {/* RESPONSIBILITIES */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Operational Objectives
             </h3>
             <ul className="space-y-4">
                <ListItem text="Prepare and execute propulsion hot-fire test operations." />
                <ListItem text="Monitor real-time test data and manage safety abort systems." />
                <ListItem text="Maintain and troubleshoot high-pressure fluid infrastructure (GSE)." />
                <ListItem text="Conduct post-test data review and hardware inspection." />
             </ul>
          </section>

          {/* QUALIFICATIONS */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Prerequisites
             </h3>
             <ul className="space-y-4">
                <ListItem text="Hands-on mechanical experience with pumps, valves, or heavy machinery." />
                <ListItem text="Uncompromising safety mindset in hazardous environments." />
                <ListItem text="Ability to read P&ID schematics and follow strict procedures." />
                <ListItem text="Willingness to work in shifts at the Mahendragiri complex." />
             </ul>
          </section>

          {/* WHAT WE OFFER */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Perks
             </h3>
             <ul className="space-y-4">
                <ListItem text="Direct involvement in engine ignition and testing." />
                <ListItem text="Work in a mission-critical environment powering India's next launch vehicle." />
                <ListItem text="Competitive compensation and hazardous duty allowance." />
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
              <MetaRow icon={Briefcase} label="Department" value="Propulsion Ops" />
              <MetaRow icon={MapPin} label="Location" value="Mahendragiri, TN" />
              <MetaRow icon={Clock} label="Type" value="On-Site / Full-Time" />
              <MetaRow icon={AlertTriangle} label="Clearance" value="Level 2 Safety" />
            </div>
          </div>

          {/* APPLY FORM */}
          <Apply role="Test Stand Operator" />
          
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