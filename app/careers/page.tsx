"use client";

import Link from "next/link";
import PageLayout from "../components/PageLayout";

export default function CareersPage() {
  return (
    <PageLayout
      title="Build the Future."
      subtitle="We don’t do easy. We do the impossible. If you want to see your work fly to space, you’re in the right place."
    >
      {/* 1. HERO / INTRO STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 border-b border-white/10 pb-12">
        <Stat label="Open Roles" value="12" />
        <Stat label="Locations" value="4" />
        <Stat label="Mission Pace" value="High" />
        <Stat label="Remote Friendly" value="Hybrid" />
      </div>

      {/* 2. JOB LISTINGS */}
      <div className="space-y-24">
        
        {/* ================= PROPULSION ================= */}
        <Category title="Propulsion Engineering">
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
        <Category title="Structures & Materials">
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
        <Category title="Avionics & Software">
          <Job
            title="Flight Software Engineer (C++ / Rust)"
            href="/careers/avionics/flight-software"
            location="Remote / Bengaluru, Karnataka"
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
        <Category title="Launch Operations">
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

      {/* 3. PERKS SECTION */}
      <div className="mt-32 border-t border-white/10 pt-20">
        <h3 className="text-3xl font-bold mb-10 text-center">Why Space Gen?</h3>
        <div className="grid md:grid-cols-3 gap-8">
            <Perk title="Equity Package" desc="Every employee is an owner. We offer competitive ESOPs." />
            <Perk title="Health & Wellness" desc="Comprehensive health insurance for you and your family." />
            <Perk title="Flexible Leave" desc="Work hard, rest hard. We focus on results, not hours clocked." />
        </div>
      </div>

    </PageLayout>
  );
}

/* ================= HELPERS ================= */

function Category({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center gap-3">
        <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
        {title}
      </h3>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function Job({ title, href, location, type }: { title: string; href: string; location: string, type: string }) {
  return (
    <Link href={href} className="group block relative">
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 flex justify-between items-center">
        
        <div>
          <h4 className="text-lg font-bold group-hover:text-cyan-400 transition-colors">
            {title}
          </h4>
          <div className="flex gap-4 mt-2 text-sm text-white/50">
             <span className="flex items-center gap-1">
               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
               {location}
             </span>
             <span>•</span>
             <span>{type}</span>
          </div>
        </div>

        {/* Arrow Icon */}
        <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-cyan-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </div>

      </div>
    </Link>
  );
}

function Stat({ label, value }: { label: string, value: string }) {
    return (
        <div className="text-center">
            <p className="text-3xl font-bold font-mono text-white">{value}</p>
            <p className="text-xs text-white/50 uppercase tracking-widest mt-1">{label}</p>
        </div>
    )
}

function Perk({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="bg-black/40 p-6 rounded-xl border border-white/10">
            <h4 className="font-bold text-lg mb-2 text-cyan-100">{title}</h4>
            <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
        </div>
    )
}