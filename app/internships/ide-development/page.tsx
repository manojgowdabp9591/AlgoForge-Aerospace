"use client";

import Apply from "@/app/components/Apply";
import PageLayout from "@/app/components/PageLayout";
import { Shield, Activity, Target, CheckCircle2, MapPin, Briefcase, Code, MonitorPlay, Zap, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function IDESimulatorInternPage() {
  return (
    <PageLayout
      title={<>Internship: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">IDE & Simulator Developer</span></>}
      subtitle="Build the unified cross-platform environment for compiling ESP32 code and simulating circuit logic."
    >
      <div className="grid lg:grid-cols-12 gap-10 mt-12">
        <div className="lg:col-span-8 space-y-16">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative bg-white/[0.02] border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-md overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-emerald-500/30 transition-all duration-1000" />
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20"><Target size={24} /></div>
                    <h3 className="text-xl font-bold text-white tracking-wide">The Academic Project</h3>
                </div>
                <p className="text-white/70 leading-relaxed text-lg font-light">
                    At <strong className="text-white font-medium">Algoforge Aerospace</strong>, we don't just build hardware; we build the tools to master it. 
                    <br/><br/>
                    We are developing a unified, web-based IDE and circuit simulator to streamline ESP32 development. As the IDE & Simulator Intern, you will architect the bridge between web interfaces and raw serial ports, allowing engineers to write C++ code in the browser, test logic in a virtual circuit simulator, and flash it directly to physical hardware.
                </p>
            </div>
          </motion.section>

          <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                 <div className="h-1 w-12 bg-emerald-500 rounded-full" />
                 <h3 className="text-2xl font-bold text-white tracking-tight">Project Milestones</h3>
              </div>
              <div className="grid gap-4">
                 <ListItem text="Integrate Monaco Editor (VS Code's core) into a React frontend with C++ syntax highlighting and linting." delay={0.1} />
                 <ListItem text="Implement Web Serial API / WebSockets to allow the browser IDE to detect, monitor, and flash ESP32 boards over USB." delay={0.2} />
                 <ListItem text="Develop the foundational logic for a drag-and-drop circuit simulator (breadboards, sensors, logic gates)." delay={0.3} />
                 <ListItem text="Package the web app into a cross-platform desktop application using Electron or Tauri." delay={0.4} />
              </div>
          </section>

          <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                 <div className="h-1 w-12 bg-teal-500 rounded-full" />
                 <h3 className="text-2xl font-bold text-white tracking-tight">Prerequisites</h3>
              </div>
              <div className="grid gap-4">
                 <ListItem text="Pursuing a B.S. or M.S. in Computer Science or Software Engineering." delay={0.1} />
                 <ListItem text="Strong JavaScript/TypeScript fundamentals and experience with React or similar frameworks." delay={0.2} />
                 <ListItem text="Familiarity with how compilers work (specifically GCC for microcontrollers)." delay={0.3} />
                 <ListItem text="Understanding of basic electronics (VCC, GND, GPIOs, Pull-up resistors)." delay={0.4} />
              </div>
          </section>

          <section>
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-[0.2em] mb-8 text-center">— Program Benefits —</h3>
              <div className="grid md:grid-cols-2 gap-4">
                 <PerkItem icon={Code} title="Tooling Architecture" text="Learn how the tools that software engineers use are actually built." />
                 <PerkItem icon={MonitorPlay} title="Web-to-Hardware" text="Master the bridge between high-level web tech and low-level embedded hardware." />
                 <PerkItem icon={Zap} title="Open Source Potential" text="Contribute to a platform that could revolutionize hardware education." />
                 <PerkItem icon={Cpu} title="Deep Systems Logic" text="Understand the math behind circuit simulation and electronic state." />
              </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-black/40 border border-white/10 p-6 rounded-2xl relative overflow-hidden backdrop-blur-xl">
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2"><Briefcase size={14} /> Program Intelligence</h4>
            <div className="space-y-6">
              <MetaRow icon={Shield} label="Department" value="Software & Systems" />
              <MetaRow icon={MapPin} label="Location" value="Remote" />
              <MetaRow icon={Activity} label="Duration" value="3 Months" />
              <MetaRow icon={Code} label="Core Stack" value="React / Web Serial API / Tauri" />
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Actively Recruiting</span>
            </div>
          </motion.div>
          <div className="sticky top-24"><Apply role="IDE & Simulator Intern" /></div>
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
