"use client";

import Link from "next/link";
import PageLayout from "../components/PageLayout";
import { motion } from "framer-motion";
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
  Briefcase
} from "lucide-react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function CareersPage() {
  return (
    <PageLayout
      title={
        <>
          Join the Mission at{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600">
             AlgoForge Aerospace
          </span>
        </>
      }
      subtitle="We build real launch systems, test real hardware, and take responsibility for what flies. No passengers, only crew."
    >
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        
        {/* STATS HUD */}
        <motion.div variants={itemVariants} className="mb-24">
            <div className="grid grid-cols-2 md:grid-cols-4 border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-sm divide-x divide-y md:divide-y-0 divide-white/10 overflow-hidden">
                <Stat label="Open Roles" value="12" icon={Briefcase} />
                <Stat label="Active Sites" value="04" icon={MapPin} />
                <Stat label="Execution Tempo" value="HIGH" icon={Zap} color="text-yellow-400" />
                <Stat label="Work Model" value="HYBRID" icon={Globe} color="text-cyan-400" />
            </div>
        </motion.div>

        {/* JOB CATEGORIES */}
        <div className="space-y-20">
          <Category title="Propulsion Engineering" icon={Rocket} count="03">
            <Job
              title="Combustion Devices Engineer"
              href="/careers/propulsion/combustion-engineer"
              location="Bengaluru, Karnataka"
              type="Full-time"
            />
            <Job
              title="Turbomachinery Specialist"
              href="/careers/propulsion/turbomachinery-specialist"
              location="Bengaluru, Karnataka"
              type="Full-time"
            />
            <Job
              title="Test Stand Operator"
              href="/careers/propulsion/test-stand-operator"
              location="Mahendragiri, Tamil Nadu"
              type="On-site"
            />
          </Category>

          <Category title="Structures & Materials" icon={Shield} count="02">
            <Job
              title="Composite Manufacturing Engineer"
              href="/careers/structures/composite-manufacturing"
              location="Bengaluru, Karnataka"
              type="Full-time"
            />
            <Job
              title="Thermal Protection Systems Lead"
              href="/careers/structures/thermal-protection"
              location="Bengaluru, Karnataka"
              type="Full-time"
            />
          </Category>

          <Category title="Avionics & Software" icon={Cpu} count="03">
            <Job
              title="Flight Software Engineer (C++ / Rust)"
              href="/careers/avionics/flight-software"
              location="Remote / Bengaluru"
              type="Full-time"
            />
            <Job
              title="GNC Engineer"
              href="/careers/avionics/gnc-engineer"
              location="Bengaluru, Karnataka"
              type="Full-time"
            />
            <Job
              title="Embedded Systems Engineer"
              href="/careers/avionics/embedded-systems"
              location="Hyderabad, Telangana"
              type="Remote"
            />
          </Category>

          <Category title="Launch Operations" icon={Radio} count="02">
            <Job
              title="Mission Manager"
              href="/careers/operations/mission-manager"
              location="Sriharikota, Andhra Pradesh"
              type="Full-time"
            />
            <Job
              title="Ground Support Equipment Engineer"
              href="/careers/operations/ground-support"
              location="Sriharikota, Andhra Pradesh"
              type="On-site"
            />
          </Category>
        </div>

        {/* WHY VORTEX */}
        <motion.div variants={itemVariants} className="mt-32 border-t border-white/10 pt-24">
          <h3 className="text-3xl font-bold mb-16 text-center flex items-center justify-center gap-3">
            <Zap className="text-cyan-400 fill-cyan-400/20" />
            <span className="text-white">Why</span>
            <span className="text-cyan-400">AlgoForge</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <Perk
              title="Ownership"
              desc="You own systems end-to-end. Decisions you make directly influence flight hardware."
              icon={Users}
            />
            <Perk
              title="Longevity"
              desc="Comprehensive health coverage with strong emphasis on long-term well-being."
              icon={Shield}
            />
            <Perk
              title="Flexibility"
              desc="Hybrid where possible. Execution matters more than attendance theater."
              icon={Globe}
            />
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
    <motion.div variants={itemVariants} className="relative">
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
    </motion.div>
  );
}

function Job({ title, href, location, type }: any) {
  return (
    <motion.div whileHover={{ y: -4 }}>
      <Link href={href} className="group block h-full">
        <div className="relative bg-white/[0.03] border border-white/10 p-6 rounded-2xl overflow-hidden h-full hover:border-cyan-500/30 transition-all duration-300">
          
          {/* Hover Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 flex flex-col h-full">
            <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-4 leading-tight">
              {title}
            </h4>

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
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-black/40 p-8 rounded-2xl border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-300 group"
    >
      <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
        <Icon size={24} />
      </div>
      <h4 className="font-bold text-lg mb-3 text-white group-hover:text-cyan-400 transition-colors">
        {title}
      </h4>
      <p className="text-white/60 text-sm leading-relaxed font-light">
        {desc}
      </p>
    </motion.div>
  );
}
