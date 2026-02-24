"use client";

import { motion } from "framer-motion";
import { ChevronRight, Hash } from "lucide-react";

// --- PARENT WRAPPER ---
export function PageWrapper({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full bg-black selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 1. Fixed Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* 2. Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-24">
        
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          {/* Breadcrumb / Kicker */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-500 uppercase tracking-widest mb-6">
            <span>AlgoForge Docs</span>
            <ChevronRight size={10} />
            <span>Reference</span>
          </div>

          {/* Title with Gradient */}
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 mb-6 leading-[1.1]">
            {title}
          </h1>

          {/* Intro Text */}
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl font-light border-l-2 border-white/10 pl-6">
            {intro}
          </p>

          {/* Technical Divider */}
          <div className="mt-12 w-full h-px bg-gradient-to-r from-cyan-500/50 via-white/10 to-transparent" />
        </motion.header>

        {/* Content Section */}
        <motion.main
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
          className="space-y-16"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

// --- SECTION COMPONENT ---
export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className="group relative"
    >
      {/* Title */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex items-center justify-center w-8 h-8 rounded bg-white/5 border border-white/10 text-cyan-400 group-hover:border-cyan-500/50 group-hover:text-cyan-300 transition-colors">
            <Hash size={14} />
            {/* Glow effect on icon box */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <h2 className="text-2xl font-bold text-white tracking-tight group-hover:text-cyan-100 transition-colors">
          {title}
        </h2>
      </div>

      {/* Content Container */}
      <div className="pl-2 md:pl-12">
        <div className="text-white/70 leading-8 text-base md:text-lg font-light space-y-4">
          {children}
        </div>
      </div>

    </motion.section>
  );
}
