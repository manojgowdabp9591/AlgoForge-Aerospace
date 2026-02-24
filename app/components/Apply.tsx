"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle2,
  Loader2,
  User,
  Mail,
  FileText,
  ShieldCheck,
  Upload,
  Cpu,
  Users,
  Rocket,
  Zap,
  Paperclip
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Apply({ role }: { role: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // Simulate API delay for effect
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
        // Mock success (Replace with your actual fetch)
        setSubmitted(true);
    } catch {
       alert("Network error. Please check your connection and retry.");
    }

    setLoading(false);
  }

  // Handle file selection to show name
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setFileName(e.target.files[0].name);
    }
  };

  if (submitted) {
    const refId = `AFA-${Math.floor(Math.random() * 100000)}-${new Date().getFullYear()}`;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-16 p-12 border border-emerald-500/30 bg-emerald-950/20 rounded-3xl text-center backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-[gradient_3s_infinite]" />
        
        <div className="relative z-10">
            <div className="inline-flex p-5 bg-emerald-500/10 rounded-full text-emerald-400 mb-6 ring-1 ring-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <CheckCircle2 size={48} strokeWidth={1.5} />
            </div>

            <h3 className="text-2xl text-white font-bold mb-3 tracking-tight">
                Transmission Received
            </h3>

            <p className="text-white/60 max-w-md mx-auto text-base leading-relaxed mb-8">
                Your dossier has been securely uploaded to our candidate database. 
                Our engineering leads will review your qualifications for the <span className="text-emerald-300">{role}</span> position shortly.
            </p>

            <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/40 rounded border border-emerald-500/20 font-mono text-xs text-emerald-400 tracking-widest uppercase">
                <span>Ref ID:</span>
                <span className="font-bold select-all">{refId}</span>
            </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mt-20 space-y-16">
      
      {/* 1. WHY WORK HERE (Grid Layout) */}
      <section className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-white/10 flex-1" />
            <h2 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">Mission Parameters</h2>
            <div className="h-px bg-white/10 flex-1" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
            <PerkCard 
                icon={Cpu} 
                title="Hardware First" 
                desc="Work on real propulsion hardware, not just slide decks or concept art." 
            />
            <PerkCard 
                icon={Users} 
                title="Elite Team" 
                desc="Small, highly technical unit with direct ownership of critical systems." 
            />
            <PerkCard 
                icon={Rocket} 
                title="High Impact" 
                desc="Your decisions materially shape the vehicle architecture and company trajectory." 
            />
            <PerkCard 
                icon={Zap} 
                title="No Hype" 
                desc="Focused purely on physics, testing, and execution. We build, we launch." 
            />
        </div>
      </section>

      {/* 2. APPLICATION FORM */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-2xl mx-auto bg-black/40 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-cyan-500 blur-[2px]" />
        
        <div className="mb-10 border-b border-white/5 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-cyan-400">
              <ShieldCheck size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Candidate Application
            </h2>
          </div>

          <p className="text-sm text-white/50 pl-[52px]">
            Applying for: <span className="text-cyan-400 font-mono tracking-wider bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-500/10">{role}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* NAME */}
            <div className="space-y-3 group">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-cyan-400 transition-colors">
                <User size={12} /> Full Name
              </label>
              <input
                name="name"
                required
                type="text"
                placeholder="John Glenn"
                className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white placeholder:text-white/20 focus:border-cyan-500/50 focus:bg-cyan-950/10 focus:ring-1 focus:ring-cyan-500/20 outline-none text-sm transition-all"
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-3 group">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-cyan-400 transition-colors">
                <Mail size={12} /> Email Uplink
              </label>
              <input
                name="email"
                required
                type="email"
                placeholder="contact@example.com"
                className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white placeholder:text-white/20 focus:border-cyan-500/50 focus:bg-cyan-950/10 focus:ring-1 focus:ring-cyan-500/20 outline-none text-sm transition-all"
              />
            </div>
          </div>

          {/* RESUME UPLOAD (Custom UI) */}
          <div className="space-y-3 group">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-cyan-400 transition-colors">
              <Upload size={12} /> Technical CV (PDF)
            </label>
            <div className="relative">
                <input
                    name="resume"
                    type="file"
                    accept=".pdf"
                    required
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full bg-white/[0.03] border border-dashed border-white/20 p-6 rounded-xl text-white/40 flex flex-col items-center justify-center gap-2 group-hover:border-cyan-500/40 group-hover:bg-cyan-950/5 transition-all">
                    {fileName ? (
                        <div className="flex items-center gap-2 text-cyan-400 bg-cyan-950/30 px-4 py-2 rounded-lg border border-cyan-500/20">
                            <Paperclip size={14} />
                            <span className="text-sm font-mono">{fileName}</span>
                        </div>
                    ) : (
                        <>
                            <Upload size={20} className="mb-1" />
                            <span className="text-xs tracking-wide">Click to upload or drag file here</span>
                        </>
                    )}
                </div>
            </div>
          </div>

          {/* COVER LETTER */}
          <div className="space-y-3 group">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-cyan-400 transition-colors">
              <FileText size={12} /> Mission Statement / Cover Letter
            </label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white placeholder:text-white/20 focus:border-cyan-500/50 focus:bg-cyan-950/10 focus:ring-1 focus:ring-cyan-500/20 outline-none resize-none text-sm transition-all"
              placeholder={`Tell us why you want to build the future of reusable flight...`}
            />
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            type="submit"
            className="group relative w-full py-5 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-xl overflow-hidden hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70 disabled:hover:scale-100"
          >
            {/* Button Gradient Hover */}
            <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            
            <span className="relative z-10 flex justify-center items-center gap-3">
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Initiating Upload...
                </>
              ) : (
                <>
                  Submit Application <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function PerkCard({ icon: Icon, title, desc }: any) {
    return (
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
            <div className="p-2 bg-black rounded-lg border border-white/10 text-white/80">
                <Icon size={18} />
            </div>
            <div>
                <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}
