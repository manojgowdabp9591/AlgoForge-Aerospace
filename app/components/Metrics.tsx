"use client";

import { motion } from "framer-motion";
import { TrendingDown, Weight, CalendarClock } from "lucide-react";

export default function Metrics() {
  const metrics = [
    { 
      label: "Launch Cost Reduction", 
      value: "1/10th", 
      desc: "Targeting $2,500/kg to LEO",
      icon: TrendingDown 
    },
    { 
      label: "Payload Capacity", 
      value: "850 kg", 
      desc: "Optimized for Mega-Constellations",
      icon: Weight 
    },
    { 
      label: "Flight Readiness", 
      value: "2027", 
      desc: "Orbiton-1 Test Flight Schedule",
      icon: CalendarClock 
    },
  ];

  return (
    <section className="py-32 relative z-10 border-y border-white/10 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 text-center"
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-500"
    >
      {/* Background Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl pointer-events-none"></div>

      {/* Icon */}
      <div className="inline-flex p-4 bg-black/40 rounded-full mb-6 border border-white/10 group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition duration-300">
        <Icon size={32} />
      </div>

      {/* Value */}
      <h3 className="text-5xl font-black text-white mb-2 tracking-tight group-hover:text-cyan-400 transition duration-300">
        {value}
      </h3>

      {/* Label */}
      <p className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4">
        {label}
      </p>

      {/* Description */}
      <p className="text-white/40 font-light text-sm border-t border-white/5 pt-4">
        {desc}
      </p>
    </motion.div>
  );
}