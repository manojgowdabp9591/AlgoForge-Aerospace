"use client";

import PageLayout from "../components/PageLayout";
import { motion } from "framer-motion";
import { Rocket, Cpu, Globe, Target, User, Zap, Flag } from "lucide-react";

export default function AboutPage() {
  return (
    <PageLayout 
      title="Mission Log: Origin" 
      subtitle="Democratizing access to space for the next generation."
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
                 <p className="text-xl font-bold text-white tracking-widest uppercase">Manoj Gowda</p>
                 <p className="text-xs text-cyan-400 font-mono">CMD // ID: SG-001</p>
              </div>

              <img
                src="/founder.jpeg"
                alt="Manoj Gowda B P - Founder"
                className="w-full h-fit object-cover opacity-90 group-hover:scale-105 transition duration-700"
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
                <h2 className="text-4xl font-extrabold text-white">Why We Look Up.</h2>
            </div>

            <div className="space-y-6 text-lg text-white/70 leading-relaxed font-light">
              <p>
                For decades, space has been the province of superpowers. But I founded 
                <span className="text-cyan-400 font-bold"> Space Gen</span> with a 
                single directive: <span className="text-white">space belongs to everyone.</span>
              </p>
              <p>
                In no other mode of transportation—cars, planes, trains—do we discard the 
                vehicle after a single journey. Why should space be different? We are solving 
                the hardest engineering problems to make a ticket to orbit as common as a plane ticket.
              </p>
              
              <div className="bg-white/5 border-l-4 border-cyan-400 p-6 my-8 rounded-r-xl backdrop-blur-sm">
                 <p className="italic text-white/90 font-medium">
                  "We aren’t just building machines; we are building a highway to the 
                  stars. The road is hard, but the view is worth it."
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
                <h2 className="text-4xl font-extrabold text-white">How We Get There.</h2>
            </div>

            <div className="space-y-6 text-lg text-white/70 leading-relaxed font-light">
              <p>
                Vision is the spark, but engineering is the fuel. My focus is turning the 
                impossible physics of reusability into a repeatable, reliable reality.
              </p>
              <p>
                We are building engines that thrive in the inferno of reentry. By combining 
                advanced avionics with lightweight alloy structures, we are shaving off the 
                kilograms that matter most. The next Silicon Valley isn't on the ground—it's 
                in Low Earth Orbit.
              </p>

              <div className="bg-white/5 border-l-4 border-purple-500 p-6 my-8 rounded-r-xl backdrop-blur-sm">
                 <p className="italic text-white/90 font-medium">
                  "Gravity is a formidable opponent, but it is not unbeatable. With the 
                  right math and the right team, we make spaceflight routine."
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
                 <p className="text-xs text-purple-400 font-mono">CTO // ID: SG-002</p>
              </div>

              <img
                src="/cofounder.jpeg"
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
                title="Radical Reusability" 
                icon={Rocket}
                desc="We don't build throwaway machines. Every stage, every engine, every fairing returns home." 
            />
            <ValueCard 
                title="Frugal Innovation" 
                icon={Zap}
                desc="We leverage smart engineering to reduce costs by orders of magnitude, not just percentages." 
            />
            <ValueCard 
                title="Global Access" 
                icon={Globe}
                desc="Space is for all of humanity. We are building the infrastructure to open the frontier to everyone." 
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