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
} from "lucide-react";

export default function CareersPage() {
  return (
    <PageLayout
      title={
        <>
          Careers at{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
            Vortex Aerospace
          </span>
        </>
      }
      subtitle="We build real launch systems, test real hardware, and take responsibility for what flies."
    >
      {/* STATS BAR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 border-b border-white/10 pb-12"
      >
        <Stat label="Open Roles" value="12" />
        <Stat label="Active Sites" value="4" />
        <Stat label="Execution Tempo" value="High" />
        <Stat label="Work Model" value="Hybrid" />
      </motion.div>

      {/* JOB CATEGORIES */}
      <div className="space-y-24">
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

        <Category title="Avionics & Software" icon={Cpu}>
          <Job
            title="Flight Software Engineer (C++ / Rust)"
            href="/careers/avionics/flight-software"
            location="Remote / Bengaluru"
            type="Full-time"
          />
          <Job
            title="GNC Engineer (Guidance, Navigation, Control)"
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

      {/* WHY VORTEX */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mt-32 border-t border-white/10 pt-20"
      >
        <h3 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3">
          <Zap className="text-cyan-400" />
          Why{" "}
          <span className="text-cyan-400">Vortex</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <Perk
            title="Ownership & Responsibility"
            desc="You own systems end-to-end. Decisions you make directly influence flight hardware."
            icon={Users}
          />
          <Perk
            title="Health & Sustainability"
            desc="Comprehensive health coverage with strong emphasis on long-term well-being."
            icon={Shield}
          />
          <Perk
            title="Flexible Work Model"
            desc="Hybrid where possible. Execution matters more than attendance theater."
            icon={Globe}
          />
        </div>
      </motion.div>
    </PageLayout>
  );
}

/* ================= HELPERS ================= */

function Category({ title, children, icon: Icon }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
          <Icon size={24} />
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {title}
        </h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">{children}</div>
    </motion.div>
  );
}

function Job({
  title,
  href,
  location,
  type,
}: {
  title: string;
  href: string;
  location: string;
  type: string;
}) {
  return (
    <motion.div whileHover={{ y: -4 }}>
      <Link href={href} className="group block">
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 hover:border-cyan-400/50 transition flex justify-between items-start">
          <div>
            <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition">
              {title}
            </h4>

            <div className="flex flex-wrap gap-3 mt-3 text-sm text-white/50 font-mono">
              <span className="flex items-center gap-1.5">
                {/* LOCATION PIN */}
                <svg
                  className="w-3.5 h-3.5 text-cyan-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {location}
              </span>

              <span className="text-white/20">|</span>

              <span className="px-2 py-0.5 bg-white/5 rounded border border-white/10 text-xs uppercase tracking-wider font-bold text-white/70">
                {type}
              </span>
            </div>
          </div>

          <div className="text-white/30 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all">
            <ArrowRight size={22} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center p-4 rounded-lg hover:bg-white/5 transition">
      <p className="text-3xl font-mono font-bold text-white mb-1">
        {value}
      </p>
      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-semibold">
        {label}
      </p>
    </div>
  );
}

function Perk({ title, desc, icon: Icon }: any) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-black/40 p-8 rounded-xl border border-white/10 hover:border-cyan-500/30 transition"
    >
      <div className="mb-4 text-cyan-400">
        <Icon size={28} />
      </div>
      <h4 className="font-bold text-lg mb-3 text-white">
        {title}
      </h4>
      <p className="text-white/60 text-sm leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}
