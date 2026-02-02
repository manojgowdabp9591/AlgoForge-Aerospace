"use client";

import Link from "next/link";
import PageLayout from "../components/PageLayout";
import { ArrowRight, Rocket, Cpu, Hammer, Radio, Zap, Shield, MousePointer2 } from "lucide-react";

export default function CareersPage() {
  return (
    <PageLayout
      title="Build the Future."
      subtitle="We don’t do easy. We do the impossible. If you want to see your work fly to space, you’re in the right place."
    >
      {/* 1. HERO / INTRO STATS (Futuristic HUD Style) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 border-b border-white/10 pb-12">
        <Stat label="Open Roles" value="12" />
        <Stat label="Locations" value="4" />
        <Stat label="Mission Pace" value="High" />
        <Stat label="Remote Friendly" value="Hybrid" />
      </div>

      {/* 2. JOB LISTINGS ( categorized by system ) */}
      <div className="space-y-24">
        
        {/* ================= PROPULSION ================= */}
        <Category title="Propulsion Engineering" icon={Rocket}>
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

        {/* ================= STRUCTURES ================= */}
        <Category title="Structures & Materials" icon={Shield}>
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

        {/* ================= AVIONICS ================= */}
        <Category title="Avionics & Software" icon={Cpu}>
          <Job
            title="Flight Software Engineer (C++ / Rust)"
            href="/careers/avionics/flight-software"
            location="Remote / Bengaluru"
            type="Full-time"
          />
          <Job
            title="GNC Engineer (Guidance, Nav, Control)"
            href="/careers/avionics/gnc-engineer"
            location="Bengaluru, Karnataka"
            type="Full-time"
          />
          <Job
            title="Embedded Systems Developer"
            href="/careers/avionics/embedded-systems"
            location="Hyderabad, Telangana"
            type="Remote"
          />
        </Category>

        {/* ================= OPERATIONS ================= */}
        <Category title="Launch Operations" icon={Radio}>
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

      {/* 3. PERKS SECTION (Glass Cards) */}
      <div className="mt-32 border-t border-white/10 pt-20">
        <h3 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3">
            <Zap className="text-cyan-400" fill="currentColor" />
            Why Space Gen?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
            <Perk title="Equity Package" desc="Every employee is an owner. We offer competitive ESOPs for early crew members." icon={Rocket} />
            <Perk title="Health & Wellness" desc="Comprehensive health insurance covering you and your immediate family." icon={Shield} />
            <Perk title="Flexible Leave" desc="Work hard, rest hard. We focus on results delivered, not hours clocked." icon={MousePointer2} />
        </div>
      </div>

    </PageLayout>
  );
}

/* ================= HELPERS (PROFESSIONALLY UPGRADED) ================= */

function Category({ title, children, icon: Icon }: any) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
          <Icon size={24} />
        </div>
        <h3 className="text-2xl font-bold text-white tracking-wide">{title}</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Job({ title, href, location, type }: { title: string; href: string; location: string, type: string }) {
  return (
    <Link href={href} className="group block relative">
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 flex justify-between items-start backdrop-blur-sm">
        
        <div>
          <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
            {title}
          </h4>
          <div className="flex flex-wrap gap-y-2 gap-x-4 mt-3 text-sm text-white/50 font-mono">
             <span className="flex items-center gap-1.5">
               <svg className="w-3 h-3 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
               {location}
             </span>
             <span className="hidden md:inline text-white/20">|</span>
             <span className="px-2 py-0.5 bg-white/5 rounded text-white/70 border border-white/5 text-xs uppercase tracking-wider font-bold">
                {type}
             </span>
          </div>
        </div>

        {/* Animated Arrow Icon */}
        <div className="text-white/20 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300">
          <ArrowRight size={24} />
        </div>

      </div>
    </Link>
  );
}

function Stat({ label, value }: { label: string, value: string }) {
    return (
        <div className="text-center p-4 rounded-lg hover:bg-white/5 transition duration-300">
            <p className="text-3xl font-bold font-mono text-white mb-1">{value}</p>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">{label}</p>
        </div>
    )
}

function Perk({ title, desc, icon: Icon }: any) {
    return (
        <div className="bg-black/40 p-8 rounded-xl border border-white/10 hover:border-cyan-500/30 transition duration-300 group">
            <div className="mb-4 text-white/30 group-hover:text-cyan-400 transition-colors">
                <Icon size={32} />
            </div>
            <h4 className="font-bold text-lg mb-3 text-white group-hover:text-cyan-100 transition">{title}</h4>
            <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
        </div>
    )
}