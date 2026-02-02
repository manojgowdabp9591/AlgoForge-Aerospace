"use client";

import Apply from "@/app/components/Apply";
import PageLayout from "@/app/components/PageLayout";
import { Compass, Crosshair, Cpu, CheckCircle2, MapPin, Briefcase, Users, ArrowRight } from "lucide-react";

export default function GNCEngineerPage() {
  return (
    <PageLayout
      title="Mission Briefing: GNC Engineer"
      subtitle="Steer the vehicle. Thread the needle. Stick the landing."
    >
      <div className="grid md:grid-cols-3 gap-10 mt-10">
        
        {/* LEFT COLUMN: JOB DETAILS */}
        <div className="md:col-span-2 space-y-12">
          
          {/* ABOUT */}
          <section className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Compass /> Mission Overview
            </h3>
            <p className="text-white/80 leading-relaxed text-lg font-light">
              As a Guidance, Navigation, and Control (GNC) Engineer, you will design the brain of the vehicle. 
              Your algorithms will pilot the rocket autonomously through the chaotic atmosphere, ensuring 
              it reaches orbit with precision and returns home for a pinpoint landing. You turn physics into code.
            </p>
          </section>

          {/* RESPONSIBILITIES */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Operational Objectives
             </h3>
             <ul className="space-y-4">
                <ListItem text="Develop robust 6-DOF control laws and state estimators for ascent and descent phases." />
                <ListItem text="Build high-fidelity simulations to validate vehicle performance under monte-carlo dispersions." />
                <ListItem text="Implement sensor fusion algorithms (Kalman Filtering) for IMU and GPS integration." />
                <ListItem text="Support flight testing and post-flight data analysis to refine GNC models." />
             </ul>
          </section>

          {/* QUALIFICATIONS */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Prerequisites
             </h3>
             <ul className="space-y-4">
                <ListItem text="Master’s or PhD in Aerospace, Electrical, or Mechanical Engineering (Control Theory focus)." />
                <ListItem text="Deep understanding of classical and modern control techniques (PID, LQR, H-infinity)." />
                <ListItem text="Proficiency in C++, MATLAB/Simulink, and Python." />
                <ListItem text="Experience with state estimation (EKF/UKF) and orbital mechanics." />
             </ul>
          </section>

          {/* WHAT WE OFFER */}
          <section>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <ArrowRight className="text-cyan-500" /> Mission Perks
             </h3>
             <ul className="space-y-4">
                <ListItem text="Work on fully autonomous flight systems that push the boundaries of control theory." />
                <ListItem text="High-impact algorithm development where your code directly controls the vehicle." />
                <ListItem text="See your math fly." />
             </ul>
          </section>

        </div>

        {/* RIGHT COLUMN: METADATA & APPLY */}
        <div className="space-y-8">
          
          {/* JOB META CARD */}
          <div className="bg-black/40 border border-white/20 p-6 rounded-xl relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 p-10 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
            
            <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                Role Intel
            </h4>
            
            <div className="space-y-5">
              <MetaRow icon={Briefcase} label="Department" value="Avionics & Software" />
              <MetaRow icon={MapPin} label="Location" value="Bengaluru, India" />
              <MetaRow icon={Users} label="Openings" value="1 Position Available" />
              <MetaRow icon={Crosshair} label="Domain" value="Control Theory" />
            </div>
          </div>

          {/* APPLY FORM */}
          <Apply role="GNC Engineer" />
          
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