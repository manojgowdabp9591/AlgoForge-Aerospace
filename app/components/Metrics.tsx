"use client";

import { motion } from "framer-motion";
import { TrendingDown, Weight, CalendarClock } from "lucide-react";

export default function Metrics() {
  const metrics = [
    {
      label: "Cost Efficiency Target",
      value: "≤ 1/10",
      desc: "Target cost below $2,500 per kg to low Earth orbit",
      icon: TrendingDown,
    },
    {
      label: "Payload Class",
      value: "Up to 850 kg",
      desc: "Designed for smallsat and constellation-class missions",
      icon: Weight,
    },
    {
      label: "First Orbital Attempt",
      value: "2027",
      desc: "Orbiton-1 technology demonstration timeline",
      icon: CalendarClock,
    },
  ];

  return (
    <section className="py-28 relative z-10 border-y border-white/10 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10 text-center"
        >
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function MetricCard({ label, value, desc, icon: Icon, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      viewport={{ once: true }}
      className="group relative bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-500"
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/6 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl pointer-events-none" />

      {/* Icon */}
      <div className="inline-flex p-4 bg-black/40 rounded-full mb-6 border border-white/10 group-hover:border-cyan-500/40 group-hover:text-cyan-400 transition duration-300">
        <Icon size={30} />
      </div>

      {/* Metric Value */}
      <h3 className="text-[3.25rem] font-extrabold text-white mb-1 tracking-tight group-hover:text-cyan-400 transition duration-300">
        {value}
      </h3>

      {/* Metric Label */}
      <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">
        {label}
      </p>

      {/* Context / Description */}
      <p className="text-white/45 font-light text-sm leading-relaxed border-t border-white/5 pt-4">
        {desc}
      </p>
    </motion.div>
  );
}
