"use client";

import Apply from "@/app/components/Apply";
import PageLayout from "@/app/components/PageLayout";
import { Shield, Activity, Target, CheckCircle2, MapPin, Briefcase, Box, PenTool, Ruler, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function MechanicalDesignInternPage() {
  return (
    <PageLayout
      title={<>Internship: <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Mechanical Design Intern</span></>}
      subtitle="Draft the high-tolerance CAD components that make up our launch vehicles and ground support equipment."
    >
      <div className="grid lg:grid-cols-12 gap-10 mt-12">
        <div className="lg:col-span-8 space-y-16">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative bg-white/[0.02] border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-md overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-yellow-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-yellow-500/30 transition-all duration-1000" />
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400 border border-yellow-500/20"><Box size={24} /></div>
                    <h3 className="text-xl font-bold text-white tracking-wide">The Academic Project</h3>
                </div>
                <p className="text-white/70 leading-relaxed text-lg font-light">
                    Every piece of software requires a physical body to execute its mission. 
                    <br/><br/>
                    As the Mechanical Design Intern at <strong className="text-white font-medium">Algoforge Aerospace</strong>, you will turn theoretical concepts into manufacturable reality. You will draft and finalize the 3D CAD models for the launch vehicle airframe, the VORTEX-1 engine carriage, the avionics bay mountings, and the launch pad strongback retention arms. 
                </p>
            </div>
          </motion.section>

          <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                 <div className="h-1 w-12 bg-yellow-500 rounded-full" />
                 <h3 className="text-2xl font-bold text-white tracking-tight">Project Milestones</h3>
              </div>
              <div className="grid gap-4">
                 <ListItem text="Design lightweight, high-strength structural components using SolidWorks or Fusion360." delay={0.1} />
                 <ListItem text="Apply Design for Manufacturing (DFM) principles, optimizing parts for 3D printing, CNC machining, and carbon-fiber wrapping." delay={0.2} />
                 <ListItem text="Model the intricate mechanical linkages for the launch pad's dual-redundant servo strongback arms." delay={0.3} />
                 <ListItem text="Create strict GD&T (Geometric Dimensioning and Tolerancing) technical drawings to send to our manufacturing partners." delay={0.4} />
              </div>
          </section>

          <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                 <div className="h-1 w-12 bg-amber-500 rounded-full" />
                 <h3 className="text-2xl font-bold text-white tracking-tight">Prerequisites</h3>
              </div>
              <div className="grid gap-4">
                 <ListItem text="Pursuing a degree in Mechanical Engineering, Aerospace Engineering, or Industrial Design." delay={0.1} />
                 <ListItem text="High proficiency in parametric 3D CAD software (SolidWorks, Fusion360, NX, or CATIA)." delay={0.2} />
                 <ListItem text="Understanding of material science, specifically stresses in plastics, aluminum, and composites." delay={0.3} />
                 <ListItem text="A portfolio of past physical builds, robotics projects, or complex CAD assemblies is strictly required." delay={0.4} />
              </div>
          </section>

          <section>
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-[0.2em] mb-8 text-center">— Program Benefits —</h3>
              <div className="grid md:grid-cols-2 gap-4">
                 <PerkItem icon={Box} title="End-to-End Build" text="Watch your CAD models get printed, machined, and attached to a real rocket." />
                 <PerkItem icon={PenTool} title="DFM Mastery" text="Learn how to design parts that can actually be built in the real world." />
                 <PerkItem icon={Ruler} title="Precision Engineering" text="Understand the strict tolerances required to survive launch vibrations." />
                 <PerkItem icon={Layers} title="Cross-Discipline" text="Work with Avionics to ensure your avionics bays fit their PCBs perfectly." />
              </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-black/40 border border-white/10 p-6 rounded-2xl relative overflow-hidden backdrop-blur-xl">
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2"><Briefcase size={14} /> Program Intelligence</h4>
            <div className="space-y-6">
              <MetaRow icon={Shield} label="Department" value="Propulsion & Structures" />
              <MetaRow icon={MapPin} label="Location" value="Remote" />
              <MetaRow icon={Activity} label="Duration" value="3 Months" />
              <MetaRow icon={Box} label="Core Stack" value="SolidWorks / Fusion360 / DFM" />
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest">Actively Recruiting</span>
            </div>
          </motion.div>
          <div className="sticky top-24"><Apply role="Aerospace Mechanical Design Intern" /></div>
        </div>
      </div>
    </PageLayout>
  );
}


function ListItem({ text, delay }: 
    { text: string, delay: number }) 
        { return ( <motion.div initial={{ opacity: 0, x: -10 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay, duration: 0.5 }} 
            className="flex items-start gap-4 group p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div 
            className="mt-1 min-w-[20px]"><CheckCircle2 
                className="text-emerald-500/50 group-hover:text-emerald-400" size={20} />
                </div>
                <span 
                className="text-white/80 leading-relaxed font-light text-sm md:text-base">{text}</span></motion.div> 
            ); 
        }
function PerkItem({ icon: Icon, title, text }: any) 
    { return ( 
        <div className="flex items-start gap-4 bg-white/[0.03] p-4 rounded-xl border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.06] transition-all group">
            <div className="p-2 bg-black rounded-lg text-white/60 group-hover:text-emerald-400 border border-white/10"><Icon size={18} 
                />
                </div>
            <div>
                <h4 className="text-sm font-bold text-white mb-1">{title}</h4><p 
                className="text-xs text-white/50 leading-relaxed">{text}</p>
                </div>
                </div> 
            ) 
    }
function MetaRow({ icon: Icon, label, value }: any) 
    { return ( 
        <div className="flex items-center gap-4 group">
            <div className="p-2.5 bg-white/5 rounded-lg text-white/40 border border-white/5 group-hover:border-emerald-500/30 group-hover:text-emerald-400"><Icon size={18} />
                </div>
                <div>
                    <p className="text-[9px] text-white/30 uppercase font-bold tracking-wider mb-0.5">{label}</p>
                    <p className="text-white font-mono text-sm tracking-tight">{value}</p>
                    </div>
                    </div> 
            ); 
    }
