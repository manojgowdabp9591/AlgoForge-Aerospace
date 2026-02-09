"use client";

import { motion } from "framer-motion";

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
    <div className="relative z-10 text-white min-h-screen px-6 pt-28 pb-20 max-w-3xl mx-auto">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-14 border-b border-white/10 pb-8"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight text-white">
          {title}
        </h1>

        <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl">
          {intro}
        </p>
      </motion.header>

      {/* Content */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
        className="space-y-12"
      >
        {children}
      </motion.section>
    </div>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-white flex items-center gap-3 tracking-tight">
        <span className="w-1 h-5 bg-cyan-500 rounded-sm" />
        {title}
      </h2>

      <div className="text-white/70 leading-relaxed text-sm md:text-base">
        {children}
      </div>
    </section>
  );
}
