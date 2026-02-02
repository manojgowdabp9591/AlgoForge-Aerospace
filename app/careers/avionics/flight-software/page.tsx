"use client";

import Apply from "@/app/components/Apply";
import PageLayout from "@/app/components/PageLayout";
import { Terminal, Cpu, Code, CheckCircle2, MapPin, Briefcase, Users, ArrowRight } from "lucide-react";

export default function FlightSoftwareEngineerPage() {
  return (
    <PageLayout
      title="Mission Briefing: Flight Software"
      subtitle="Code the brain. Control the descent. execute(launch)."
    >
      <div className="grid md:grid-cols-3 gap-10 mt-10">
        
        {/* LEFT COLUMN: JOB DETAILS */}
        <div className="md:col-span-2 space-y-12">
          
          {/* ABOUT */}
          <section className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Terminal /> Mission Overview
            </h3>
            <p className="text-white/80 leading-relaxed text-lg font-light">
              As a Flight Software Engineer, you will write the code that keeps the rocket pointed 
              at the stars—and brings it back safely. You will develop real-time, safety-critical 
              software that runs on the metal, controlling everything from engine throttling to 
              grid fin actuation. In this role, a segmentation fault isn't just an error; it's a mission failure.
            </p>
          </section>

          {/* RESPONSIBILITIES */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Operational Objectives
             </h3>
             <ul className="space-y-4">
                <ListItem text="Write high-performance, safety-critical flight software in C++ and Rust." />
                <ListItem text="Develop Hardware-in-the-Loop (HITL) simulation frameworks to validate logic before flight." />
                <ListItem text="Design fault-tolerant state machines for autonomous launch and recovery sequences." />
                <ListItem text="Support flight testing operations and analyze real-time telemetry data." />
             </ul>
          </section>

          {/* QUALIFICATIONS */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Prerequisites
             </h3>
             <ul className="space-y-4">
                <ListItem text="Strong proficiency in Modern C++ (17/20) or Rust (Memory safety focus)." />
                <ListItem text="Deep understanding of embedded systems, RTOS (FreeRTOS/RTEMS), and bare-metal programming." />
                <ListItem text="Experience with low-level communication protocols (CAN, Ethernet, SPI, UART)." />
             </ul>
          </section>

          {/* WHAT WE OFFER */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Perks
             </h3>
             <ul className="space-y-4">
                <ListItem text="Direct impact on autonomous flight logic." />
                <ListItem text="Exposure to real launch missions and flight hardware." />
                <ListItem text="Code that leaves the atmosphere." />
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
              <MetaRow icon={Briefcase} label="Department" value="Avionics & Software" />
              <MetaRow icon={MapPin} label="Location" value="Bengaluru, India" />
              <MetaRow icon={Users} label="Openings" value="2 Positions Available" />
              <MetaRow icon={Code} label="Stack" value="C++ / Rust / RTOS" />
            </div>
          </div>

          {/* APPLY FORM */}
          <Apply role="Flight Software Engineer" />
          
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