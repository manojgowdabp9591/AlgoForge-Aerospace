"use client";

import Apply from "@/app/components/Apply";
import PageLayout from "@/app/components/PageLayout";
import { Shield, Activity, Target, CheckCircle2, MapPin, Briefcase, Zap, Layout, Terminal, Code, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function MissionControlInternPage() {
  return (
    <PageLayout
      title={<>Internship: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-500">Mission Control UI/UX</span></>}
      subtitle="Architect the Next.js Director Dashboard that renders live rocket telemetry into high-performance charts."
    >
      <div className="grid lg:grid-cols-12 gap-10 mt-12">
        <div className="lg:col-span-8 space-y-16">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative bg-white/[0.02] border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-md overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-500/30 transition-all duration-1000" />
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20"><Target size={24} /></div>
                    <h3 className="text-xl font-bold text-white tracking-wide">The Academic Project</h3>
                </div>
                <p className="text-white/70 leading-relaxed text-lg font-light">
                    If our hardware executes flawlessly but we can't read the data on the ground, the mission is a failure. 
                    <br/><br/>
                    As the Mission Control Web Intern at <strong className="text-white font-medium">Algoforge Aerospace</strong>, you will build the front-end nervous system for our launch operations. You will use Next.js, React, and Tailwind CSS to design the Director Dashboard. This UI must catch JSON telemetry streaming from our LoRa Ground Station and render it into smooth, real-time charts without lagging the browser.
                </p>
            </div>
          </motion.section>

          <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                 <div className="h-1 w-12 bg-purple-500 rounded-full" />
                 <h3 className="text-2xl font-bold text-white tracking-tight">Project Milestones</h3>
              </div>
              <div className="grid gap-4">
                 <ListItem text="Design a dark-mode, high-contrast UI tailored for Mission Control environments using Tailwind CSS." delay={0.1} />
                 <ListItem text="Implement high-performance charting libraries (Recharts, Chart.js) to plot 10Hz telemetry data smoothly." delay={0.2} />
                 <ListItem text="Build API routes in Next.js to handle incoming payloads from the Node 3 Ground Station." delay={0.3} />
                 <ListItem text="Create a secure 'Command Module' with Go/No-Go toggles and an Abort sequence interface." delay={0.4} />
              </div>
          </section>

          <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                 <div className="h-1 w-12 bg-cyan-500 rounded-full" />
                 <h3 className="text-2xl font-bold text-white tracking-tight">Prerequisites</h3>
              </div>
              <div className="grid gap-4">
                 <ListItem text="Pursuing a degree in Computer Science, Software Engineering, or a related field." delay={0.1} />
                 <ListItem text="Strong portfolio demonstrating modern React/Next.js and Tailwind CSS capabilities." delay={0.2} />
                 <ListItem text="Understanding of asynchronous JavaScript, REST APIs, and WebSockets." delay={0.3} />
              </div>
          </section>

          <section>
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-[0.2em] mb-8 text-center">— Program Benefits —</h3>
              <div className="grid md:grid-cols-2 gap-4">
                 <PerkItem icon={Layout} title="UI Ownership" text="You control how the entire company views its flight data." />
                 <PerkItem icon={Zap} title="High-Speed Data" text="Handle rapid real-time data streams without re-render lags." />
                 <PerkItem icon={Terminal} title="Aerospace Context" text="Apply web development skills to actual rocket science." />
                 <PerkItem icon={Code} title="Resume Highlight" text="Deploying a live Mission Control dashboard is the ultimate portfolio piece." />
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
              <MetaRow icon={Cpu} label="Core Stack" value="Next.js / React / Tailwind" />
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Actively Recruiting</span>
            </div>
          </motion.div>
          <div className="sticky top-24"><Apply role="Mission Control Full-Stack Intern" /></div>
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
