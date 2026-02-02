"use client";

import Apply from "@/app/components/Apply";
import PageLayout from "@/app/components/PageLayout";
import { Cpu, Zap, Code, CheckCircle2, MapPin, Briefcase, Users, ArrowRight } from "lucide-react";

export default function EmbeddedSystemsDeveloperPage() {
  return (
    <PageLayout
      title="Mission Briefing: Embedded Systems"
      subtitle="Program the metal. Read the sensors. Close the loop."
    >
      <div className="grid md:grid-cols-3 gap-10 mt-10">
        
        {/* LEFT COLUMN: JOB DETAILS */}
        <div className="md:col-span-2 space-y-12">
          
          {/* ABOUT */}
          <section className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Cpu /> Mission Overview
            </h3>
            <p className="text-white/80 leading-relaxed text-lg font-light">
              As an Embedded Systems Developer, you will operate at the bare metal. You will 
              develop the low-level firmware that breathes life into our flight computers and 
              avionics hardware. From high-speed sensor polling to actuator control, your code 
              is the nervous system of the launch vehicle.
            </p>
          </section>

          {/* RESPONSIBILITIES */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Operational Objectives
             </h3>
             <ul className="space-y-4">
                <ListItem text="Develop highly efficient embedded firmware for flight computers and distributed avionics nodes." />
                <ListItem text="Interface directly with sensors (IMUs, PTs, TCs) and actuators over SPI, I2C, and CAN." />
                <ListItem text="Debug complex hardware-software interactions using oscilloscopes and logic analyzers." />
                <ListItem text="Optimize driver performance for strict real-time timing constraints." />
             </ul>
          </section>

          {/* QUALIFICATIONS */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Prerequisites
             </h3>
             <ul className="space-y-4">
                <ListItem text="Mastery of Embedded C/C++ programming for constrained environments." />
                <ListItem text="Solid knowledge of RTOS (Real-Time Operating Systems) principles." />
                <ListItem text="Ability to read schematics and datasheets to bring new boards up from scratch." />
             </ul>
          </section>

          {/* WHAT WE OFFER */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Perks
             </h3>
             <ul className="space-y-4">
                <ListItem text="Hands-on avionics development with custom flight hardware." />
                <ListItem text="Work on flight-critical systems where reliability is paramount." />
                <ListItem text="See your firmware control a rocket engine." />
             </ul>
          </section>

        </div>

        {/* RIGHT COLUMN: METADATA & APPLY */}
        <div className="space-y-8">
          
          {/* JOB META CARD */}
          <div className="bg-black/40 border border-white/20 p-6 rounded-xl relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 p-10 bg-purple-500/10 blur-3xl rounded-full pointer-events-none"></div>
            
            <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                Role Intel
            </h4>
            
            <div className="space-y-5">
              <MetaRow icon={Briefcase} label="Department" value="Avionics & Software" />
              <MetaRow icon={MapPin} label="Location" value="Hyderabad, India" />
              <MetaRow icon={Users} label="Openings" value="1 Position Available" />
              <MetaRow icon={Code} label="Stack" value="C / C++ / Assembly" />
            </div>
          </div>

          {/* APPLY FORM */}
          <Apply role="Embedded Systems Developer" />
          
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