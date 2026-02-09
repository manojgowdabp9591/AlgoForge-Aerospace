"use client";

import PageLayout from "../components/PageLayout";
import { motion } from "framer-motion";
import { Rocket, Cpu, Globe, Target, User, Zap, Flag, Flame, Wind } from "lucide-react";

export default function AboutPage() {
  return (
    <PageLayout 
      title="Mission Log: Origin" 
      subtitle="Redefining propulsion. Mastering detonation. Advancing humanity."
    >
      <div className="space-y-32 mt-10">

        {/* =========================================
            SECTION 1: THE FOUNDER (Personnel File 001)
           ========================================= */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* IMAGE / DOSSIER PHOTO */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center group"
          >
            {/* Holographic Glow */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-cyan-500/30 transition duration-1000" />
            
            {/* Image Frame */}
            <div className="relative w-80 h-96 rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_20px_rgba(34,211,238,0.2)] bg-black">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              
              {/* HUD Overlay */}
              <div className="absolute bottom-4 left-4 z-20">
                 <p className="text-xl font-bold text-white tracking-widest uppercase">Manoj Gowda B P</p>
                 <p className="text-xs text-cyan-400 font-mono">CMD // ID: VTX-001</p>
              </div>

              <img
                src="/founder.png"
                alt="Manoj Gowda B P - Founder"
                className="w-fit h-fit object-cover opacity-90 group-hover:scale-105 transition duration-700"
              />
            </div>
          </motion.div>

          {/* TEXT CONTENT */}
          <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
                    <Flag size={24} />
                </div>
                <h2 className="text-4xl font-extrabold text-white">The Propulsion Bottleneck.</h2>
            </div>

            <div className="space-y-6 text-lg text-white/70 leading-relaxed font-light">
              <p>
                For sixty years, rocket engines have been stuck in the era of deflagration—burning fuel at constant pressure. 
                I founded <span className="text-cyan-400 font-bold">Vortex Aerospace</span> to break this stagnation.
              </p>
              <p>
                We are not just building another launch vehicle; we are pioneering <strong>Rotary Detonation Engines (RDE)</strong>. 
                By harnessing the power of supersonic shockwaves, we extract more energy from every gram of fuel. 
                This isn't just an improvement; it's a phase shift in physics.
              </p>
              
              <div className="bg-white/5 border-l-4 border-cyan-400 p-6 my-8 rounded-r-xl backdrop-blur-sm">
                 <p className="italic text-white/90 font-medium">
                  "Conventional engines burn. Ours detonate. We are building the machinery to make spaceflight not just possible, but efficient."
                 </p>
              </div>
              
              <div className="flex gap-10 mt-8 border-t border-white/10 pt-6">
                 <Stat label="Role" value="Founder & CEO" />
                 <Stat label="Clearance" value="Level 5" />
                 <Stat label="Focus" value="Strategy" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* =========================================
            SECTION 2: THE CO-FOUNDER (Personnel File 002)
           ========================================= */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* TEXT CONTENT */}
          <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="order-2 md:order-1"
          >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
                    <Cpu size={24} />
                </div>
                <h2 className="text-4xl font-extrabold text-white">Taming the Chaos.</h2>
            </div>

            <div className="space-y-6 text-lg text-white/70 leading-relaxed font-light">
              <p>
                A detonation wave travels at 2,000 meters per second. Controlling that is like trying to bottle a lightning storm. 
                My focus is on the architecture that makes this possible: the <strong>VORTEX-1</strong> engine.
              </p>
              <p>
                We are combining advanced computational fluid dynamics with high-temperature alloy printing to build 
                combustion chambers that don't just survive the shockwaves—they thrive on them. 
                The result is a lighter, more powerful engine with fewer moving parts.
              </p>

              <div className="bg-white/5 border-l-4 border-purple-500 p-6 my-8 rounded-r-xl backdrop-blur-sm">
                 <p className="italic text-white/90 font-medium">
                  "Complexity is the enemy of reliability. By using detonation physics, we eliminate heavy turbomachinery and let the shockwaves do the work."
                 </p>
              </div>

              <div className="flex gap-10 mt-8 border-t border-white/10 pt-6">
                 <Stat label="Role" value="Co-Founder & CTO" />
                 <Stat label="System" value="Propulsion" />
                 <Stat label="Status" value="Active" />
              </div>
            </div>
          </motion.div>

          {/* IMAGE / DOSSIER PHOTO */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center order-1 md:order-2 group"
          >
            {/* Holographic Glow */}
            <div className="absolute inset-0 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-purple-500/30 transition duration-1000" />
            
            {/* Image Frame */}
            <div className="relative w-80 h-96 rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_20px_rgba(168,85,247,0.2)] bg-black">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              
              {/* HUD Overlay */}
              <div className="absolute bottom-4 left-4 z-20">
                 <p className="text-xl font-bold text-white tracking-widest uppercase">Sandeep S M</p>
                 <p className="text-xs text-purple-400 font-mono">CTO // ID: VTX-002</p>
              </div>

              <img
                src="/Co-founder.jpeg"
                alt="Sandeep S M - Co-Founder"
                className="w-fit h-fit object-cover opacity-90 group-hover:scale-105 transition duration-700"
              />
            </div>
          </motion.div>

        </div>

        {/* =========================================
            SECTION 3: CORE DIRECTIVES (Values)
           ========================================= */}
        <div className="grid md:grid-cols-3 gap-6 pt-20 border-t border-white/10">
            <ValueCard 
                title="Pressure Gain Combustion" 
                icon={Flame}
                desc="We don't just burn fuel; we detonate it. Harnessing pressure gain increases thermodynamic efficiency by 15%." 
            />
            <ValueCard 
                title="Rapid Reusability" 
                icon={Rocket}
                desc="Our Lifting Body architecture allows for aircraft-like operations. Land, refuel, and launch again within 24 hours." 
            />
            <ValueCard 
                title="Democratized Orbit" 
                icon={Globe}
                desc="By slashing the cost of propulsion, we are opening the door for students, startups, and scientists to access space." 
            />
        </div>

      </div>
    </PageLayout>
  );
}

// --- SUB-COMPONENTS ---

function Stat({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">{label}</p>
            <p className="text-sm font-mono text-white font-bold">{value}</p>
        </div>
    )
}

function ValueCard({ title, desc, icon: Icon }: any) {
    return (
        <div className="p-8 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition duration-300">
            <div className="mb-4 text-cyan-400">
                <Icon size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-white/60 leading-relaxed text-sm">{desc}</p>
        </div>
    )
}