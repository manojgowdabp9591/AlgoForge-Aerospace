"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CircleDashed, Radio } from "lucide-react";

export default function Partners() {
  const partners = [
    { id: "01", name: "ISRO", url: "https://www.isro.gov.in", type: "Government", status: "Targeted" },
    { id: "02", name: "NASA", url: "https://www.nasa.gov", type: "Agency", status: "Seeking" },
    { id: "03", name: "ESA", url: "https://www.esa.int", type: "Agency", status: "Ongoing" },
    { id: "04", name: "SPACEX", url: "https://www.spacex.com", type: "Commercial", status: "Seeking" },
    { id: "05", name: "BOEING", url: "https://www.boeing.com", type: "Manufacturing", status: "Ongoing" },
    { id: "06", name: "AIRBUS", url: "https://www.airbus.com", type: "Aerospace", status: "Seeking" }
  ];

  return (
    <section className="py-24 relative z-20 bg-black border-y border-white/10 font-mono">
      
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tighter mb-2">
                    Future Alliances
                </h2>
                <p className="text-white/40 text-xs max-w-md">
                    / TARGET_LIST: Strategic organizations identified for future cooperation.
                </p>
            </div>
            <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-widest mt-4 md:mt-0">
                <Radio size={16} className="animate-pulse" />
                Broadcasting Signal
            </div>
        </div>

        {/* The Manifest List */}
        <div className="flex flex-col">
            
            {/* Table Header (Desktop) */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-[10px] text-white/30 uppercase tracking-widest border-b border-white/5">
                <div className="col-span-1">ID</div>
                <div className="col-span-5">Entity Name</div>
                <div className="col-span-3">Classification</div>
                <div className="col-span-2">Outreach Status</div>
                <div className="col-span-1 text-right">Action</div>
            </div>

            {/* Rows */}
            {partners.map((p, i) => (
                <motion.div 
                    key={p.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                >
                    <Link 
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-4 py-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                        {/* Hover Scan Effect */}
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                        />
                        
                        {/* ID */}
                        <div className="hidden md:block col-span-1 text-white/20 text-xs">
                            {p.id}
                        </div>

                        {/* Name */}
                        <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                            <span className="text-2xl md:text-3xl font-black text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight">
                                {p.name}
                            </span>
                        </div>

                        {/* Type */}
                        <div className="col-span-6 md:col-span-3 text-xs text-white/50 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1 h-1 bg-white/30 rounded-full" />
                            {p.type}
                        </div>

                        {/* Status */}
                        <div className="col-span-6 md:col-span-2 text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                            <CircleDashed size={12} className="animate-spin-slow" />
                            {p.status}
                        </div>

                        {/* Action Arrow */}
                        <div className="hidden md:flex col-span-1 justify-end text-white/20 group-hover:text-amber-400 transition-transform group-hover:translate-x-1">
                            <ArrowUpRight size={20} />
                        </div>

                    </Link>
                </motion.div>
            ))}

        </div>

      </div>
    </section>
  );
}
