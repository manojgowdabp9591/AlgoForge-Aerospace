"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PageLayout from "../components/PageLayout"; // Adjust path if needed
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Rocket,
  Cpu,
  Radio,
  Zap,
  Shield,
  Users,
  Globe,
  MapPin,
  Clock,
  Briefcase,
  GraduationCap
} from "lucide-react";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState<"careers" | "internships">("careers");

  // Load the saved tab state from sessionStorage when the page loads
  useEffect(() => {
    const savedTab = sessionStorage.getItem("algoforge_careers_tab");
    if (savedTab === "careers" || savedTab === "internships") {
      setActiveTab(savedTab);
    }
  }, []);

  // Update the state and save the choice to sessionStorage
  const handleTabSwitch = (tab: "careers" | "internships") => {
    setActiveTab(tab);
    sessionStorage.setItem("algoforge_careers_tab", tab);
  };

  return (
    <PageLayout
      title={
        <>
          Join the Mission at{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600">
             Algoforge Aerospace
          </span>
        </>
      }
      subtitle="We build real launch systems, test real hardware, and take responsibility for what flies. No passengers, only crew."
    >
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10">
        
        {/* --- STATS HUD --- */}
        <motion.div variants={itemVariants} className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-sm divide-x divide-y md:divide-y-0 divide-white/10 overflow-hidden">
                <Stat label="Open Roles" value="20" icon={Briefcase} />
                <Stat label="Active Sites" value="04" icon={MapPin} />
                <Stat label="Execution Tempo" value="HIGH" icon={Zap} color="text-yellow-400" />
                <Stat label="Work Model" value="HYBRID" icon={Globe} color="text-cyan-400" />
            </div>
        </motion.div>

        {/* --- TAB TOGGLE --- */}
        <motion.div variants={itemVariants} className="flex justify-center mb-16">
          <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl relative">
            <button
              onClick={() => handleTabSwitch("careers")}
              className={`px-8 py-3 rounded-lg text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "careers" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Briefcase size={16} />
              Full-Time Careers
            </button>
            <button
              onClick={() => handleTabSwitch("internships")}
              className={`px-8 py-3 rounded-lg text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "internships" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <GraduationCap size={16} />
              Internship Programs
            </button>
          </div>
        </motion.div>

        {/* --- DYNAMIC LISTINGS --- */}
        <div className="min-h-[800px]">
          <AnimatePresence mode="wait">
            
            {/* ========================================== */}
            {/* CAREERS LAYOUT                             */}
            {/* ========================================== */}
            {activeTab === "careers" && (
              <motion.div key="careers" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-20">
                
                <Category title="Propulsion Engineering" icon={Rocket} count="04">
                  <Job title="Combustion Devices Engineer" href="/careers/propulsion/combustion-engineer" location="Bengaluru, KA" type="Full-time" />
                  <Job title="Turbomachinery Specialist" href="/careers/propulsion/turbomachinery-specialist" location="Bengaluru, KA" type="Full-time" />
                  <Job title="Test Stand Operator" href="/careers/propulsion/test-stand-operator" location="Mahendragiri, TN" type="On-site" />
                  <Job title="Fluid Systems Engineer" href="/careers/propulsion/fluid-systems" location="Bengaluru, KA" type="Full-time" />
                </Category>

                <Category title="Structures & Materials" icon={Shield} count="03">
                  <Job title="Composite Manufacturing Engineer" href="/careers/structures/composite-manufacturing" location="Bengaluru, KA" type="Full-time" />
                  <Job title="Thermal Protection Systems Lead" href="/careers/structures/thermal-protection" location="Bengaluru, KA" type="Full-time" />
                  <Job title="Vehicle Dynamics Engineer" href="/careers/structures/vehicle-dynamics" location="Remote" type="Full-time" />
                </Category>

                <Category title="Avionics & Software" icon={Cpu} count="04">
                  <Job title="Flight Software Engineer (C++)" href="/careers/avionics/flight-software" location="Remote / Bengaluru" type="Full-time" />
                  <Job title="GNC Engineer" href="/careers/avionics/gnc-engineer" location="Bengaluru, KA" type="Full-time" />
                  <Job title="Embedded Systems Engineer" href="/careers/avionics/embedded-systems" location="Hyderabad, TS" type="Remote" />
                  <Job title="RF / Telemetry Engineer" href="/careers/avionics/rf-telemetry" location="Bengaluru, KA" type="Full-time" />
                </Category>

                <Category title="Launch Operations" icon={Radio} count="03">
                  <Job title="Mission Manager" href="/careers/operations/mission-manager" location="Sriharikota, AP" type="Full-time" />
                  <Job title="Ground Support Equipment Engineer" href="/careers/operations/ground-support" location="Sriharikota, AP" type="On-site" />
                  <Job title="Launch Safety Officer" href="/careers/operations/safety-officer" location="Sriharikota, AP" type="On-site" />
                </Category>

              </motion.div>
            )}

            {/* ========================================== */}
            {/* INTERNSHIPS LAYOUT                         */}
            {/* ========================================== */}
            {activeTab === "internships" && (
              <motion.div key="internships" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-20">
                
                {/* Intern Intro Banner */}
                <div className="text-center max-w-2xl mx-auto mb-12 border border-cyan-500/20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 to-transparent p-8 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-2">The Algoforge Academic Program</h3>
                    <p className="text-white/60 text-sm">
                      This is a high-intensity mentorship program for top-tier engineering students. You will be assigned critical path projects—flight software, simulation suites, or web infrastructure.
                    </p>
                    <div className="mt-4 inline-block px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-cyan-400 uppercase tracking-widest">
                      Unpaid Academic Track
                    </div>
                </div>

                <Category title="Software & Systems" icon={Cpu} count="03">
                  <Job title="Mission Control Full-Stack Intern" href="/internships/mission-control" location="Remote" type="3 Months" />
                  <Job title="Embedded Flight Software Intern" href="/internships/flight-software" location="Remote" type="3 Months" />
                  <Job title="IDE & Simulator Intern" href="/internships/ide-development" location="Remote" type="3 Months" />
                </Category>

                <Category title="Propulsion & Structures" icon={Rocket} count="02">
                  <Job title="Propulsion CFD Intern" href="/internships/cfd-simulation" location="Remote" type="3 Months" />
                  <Job title="Aerospace Mechanical Design Intern" href="/internships/cad-design" location="Remote" type="3 Months" />
                </Category>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* --- WHY ALGOFORGE --- */}
        <motion.div variants={itemVariants} className="mt-32 border-t border-white/10 pt-24">
          <h3 className="text-3xl font-bold mb-16 text-center flex items-center justify-center gap-3">
            <Zap className="text-cyan-400 fill-cyan-400/20" />
            <span className="text-white">Why</span>
            <span className="text-cyan-400">AlgoForge</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <Perk title="Ownership" desc="You own systems end-to-end. Decisions you make directly influence flight hardware." icon={Users} />
            <Perk title="Impact" desc="No busywork. Everything you design, code, or build directly advances the launch timeline." icon={Rocket} />
            <Perk title="Flexibility" desc="Hybrid where possible. Execution matters more than attendance theater." icon={Globe} />
          </div>
        </motion.div>

      </motion.div>
    </PageLayout>
  );
}

/* ================= HELPERS ================= */

function Stat({ label, value, icon: Icon, color = "text-white" }: any) {
    return (
        <div className="flex flex-col items-center justify-center p-8 hover:bg-white/[0.03] transition-colors group">
            <Icon className="text-white/20 mb-4 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300" size={24} />
            <span className={`text-4xl font-mono font-bold tracking-tighter ${color}`}>{value}</span>
            <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mt-2">{label}</span>
        </div>
    )
}

function Category({ title, children, icon: Icon, count }: any) {
  return (
    <div className="relative">
      <div className="flex items-end gap-4 mb-8 border-b border-white/10 pb-4">
        <div className="p-3 bg-white/5 rounded-lg text-cyan-400 border border-white/10">
          <Icon size={24} />
        </div>
        <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
            <p className="text-xs text-white/40 font-mono mt-1 uppercase tracking-wider">Department ID: {title.substring(0,3).toUpperCase()}-01</p>
        </div>
        <span className="ml-auto text-4xl font-black text-white/5 select-none">{count}</span>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>
    </div>
  );
}

function Job({ title, href, location, type }: any) {
  return (
    <motion.div whileHover={{ y: -4 }}>
      <Link href={href} className="group block h-full">
        <div className="relative bg-white/[0.03] border border-white/10 p-6 rounded-2xl overflow-hidden h-full hover:border-cyan-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col h-full">
            <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-4 leading-tight">{title}</h4>
            <div className="mt-auto space-y-3">
                <div className="flex items-center gap-2 text-white/50 text-sm group-hover:text-white/70 transition-colors">
                    <MapPin size={14} className="text-cyan-500" />
                    <span>{location}</span>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm group-hover:text-white/70 transition-colors">
                    <Clock size={14} className="text-cyan-500" />
                    <span>{type}</span>
                </div>
            </div>
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-cyan-400">
                <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Perk({ title, desc, icon: Icon }: any) {
  return (
    <motion.div whileHover={{ y: -4 }} className="bg-black/40 p-8 rounded-2xl border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-300 group">
      <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
        <Icon size={24} />
      </div>
      <h4 className="font-bold text-lg mb-3 text-white group-hover:text-cyan-400 transition-colors">{title}</h4>
      <p className="text-white/60 text-sm leading-relaxed font-light">{desc}</p>
    </motion.div>
  );
}
