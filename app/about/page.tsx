"use client";

import PageLayout from "../components/PageLayout";
import { motion } from "framer-motion";
import { Rocket, Cpu, Globe, Flag, Flame } from "lucide-react";

export default function AboutPage() {
  return (
    <PageLayout
      title="About VSpace"
      subtitle="Advancing propulsion physics to make space access faster, cheaper, and repeatable."
    >
      <div className="space-y-32 mt-10">
        {/* ================= FOUNDER ================= */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative w-80 h-96 rounded-2xl overflow-hidden border border-white/20 bg-black">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
              <div className="absolute bottom-4 left-4 z-20">
                <p className="text-lg font-semibold text-white">
                  Manoj Gowda B P
                </p>
                <p className="text-xs text-cyan-400 font-mono">
                  Founder & CEO
                </p>
              </div>
              <img
                src="/founder.png"
                alt="Manoj Gowda B P"
                className="w-fit h-fit object-cover opacity-90"
              />
            </div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
                <Flag size={20} />
              </div>
              <h2 className="text-3xl font-semibold text-white">
                Breaking the Propulsion Plateau
              </h2>
            </div>

            <div className="space-y-6 text-base text-white/70 leading-relaxed">
              <p>
                For decades, chemical rocket propulsion has advanced
                incrementally. Traditional engines rely on constant-pressure
                combustion, which imposes fundamental efficiency limits.
              </p>

              <p>
                I founded <span className="text-cyan-400 font-semibold">
                Vortex Aerospace</span> to challenge that assumption by pursuing
                pressure-gain combustion through rotary detonation engines.
                This approach has the potential to extract more usable energy
                from the same propellant mass.
              </p>

              <blockquote className="border-l-2 border-cyan-400 pl-6 text-white/80 italic">
                “Our objective is not novelty. It’s efficiency, repeatability,
                and systems that scale into real launch operations.”
              </blockquote>

              <div className="flex gap-10 pt-6 border-t border-white/10">
                <Stat label="Role" value="Founder & CEO" />
                <Stat label="Focus" value="Strategy & Execution" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================= CO-FOUNDER ================= */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
                <Cpu size={20} />
              </div>
              <h2 className="text-3xl font-semibold text-white">
                Engineering for Control and Reliability
              </h2>
            </div>

            <div className="space-y-6 text-base text-white/70 leading-relaxed">
              <p>
                Detonation-based propulsion introduces extreme thermal and
                pressure environments. Making it viable requires disciplined
                system architecture and careful control of instabilities.
              </p>

              <p>
                My work focuses on the <strong>VORTEX-1</strong> engine
                architecture — combining high-fidelity simulation, materials
                engineering, and test-driven iteration to achieve reliable,
                repeatable operation.
              </p>

              <blockquote className="border-l-2 border-purple-400 pl-6 text-white/80 italic">
                “Simplicity improves reliability. The goal is fewer failure
                modes, not more complexity.”
              </blockquote>

              <div className="flex gap-10 pt-6 border-t border-white/10">
                <Stat label="Role" value="Co-Founder & CTO" />
                <Stat label="System" value="Propulsion" />
              </div>
            </div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center order-1 md:order-2"
          >
            <div className="relative w-80 h-96 rounded-2xl overflow-hidden border border-white/20 bg-black">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
              <div className="absolute bottom-4 left-4 z-20">
                <p className="text-lg font-semibold text-white">
                  Sandeep S M
                </p>
                <p className="text-xs text-purple-400 font-mono">
                  Co-Founder & CTO
                </p>
              </div>
              <img
                src="/Co-founder.jpeg"
                alt="Sandeep S M"
                className="w-fit h-fit object-cover opacity-90"
              />
            </div>
          </motion.div>
        </div>

        {/* ================= PRINCIPLES ================= */}
        <div className="grid md:grid-cols-3 gap-6 pt-20 border-t border-white/10">
          <ValueCard
            title="Pressure-Gain Combustion"
            icon={Flame}
            desc="Rotary detonation enables higher thermodynamic efficiency by increasing chamber pressure during combustion."
          />
          <ValueCard
            title="Rapid Reusability"
            icon={Rocket}
            desc="Vehicle architecture designed for fast inspection, minimal refurbishment, and high launch cadence."
          />
          <ValueCard
            title="Accessible Orbit"
            icon={Globe}
            desc="Lowering launch cost unlocks scientific, commercial, and educational access to space."
          />
        </div>
      </div>
    </PageLayout>
  );
}

/* ---------- HELPERS ---------- */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-1">
        {label}
      </p>
      <p className="text-sm font-mono text-white font-bold">{value}</p>
    </div>
  );
}

function ValueCard({ title, desc, icon: Icon }: any) {
  return (
    <div className="p-8 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition">
      <div className="mb-4 text-cyan-400">
        <Icon size={28} />
      </div>
      <h3 className="text-base font-semibold text-white mb-3">{title}</h3>
      <p className="text-white/60 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}
