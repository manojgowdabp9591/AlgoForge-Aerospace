"use client";

import PageLayout from "@/app/components/PageLayout";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Newspaper, Megaphone, Terminal } from "lucide-react";
import Link from "next/link";

export default function Newsroom() {
  const newsItems = [
    {
      id: "pr-004",
      date: "February 15, 2026",
      category: "Engineering Milestone",
      title: "AlgoForge Completes Critical Sub-Scale VORTEX-1 Hotfire Test",
      excerpt: "The propulsion team successfully demonstrated stable detonation wave propagation in the sub-scale VORTEX-1 prototype, paving the way for full-scale 2027 static fires.",
      icon: <Terminal size={16} />,
      featured: true,
    },
    {
      id: "pr-003",
      date: "January 28, 2026",
      category: "Corporate",
      title: "AF-60 Heavy Architecture Revealed: Targeting 16.5t to LEO",
      excerpt: "AlgoForge officially expands its vehicle lineup with the AF-60 Heavy, featuring a 15-engine monolithic cluster and conformal aerodynamic landing legs.",
      icon: <Megaphone size={16} />,
      featured: false,
    },
    {
      id: "pr-002",
      date: "December 10, 2025",
      category: "Facilities",
      title: "Generative Manufacturing HQ Breaks Ground",
      excerpt: "Construction begins on our state-of-the-art DMLS (Direct Metal Laser Sintering) facility, capable of printing an entire AF-33 core in under 14 days.",
      icon: <Newspaper size={16} />,
      featured: false,
    },
    {
      id: "pr-001",
      date: "November 05, 2025",
      category: "Operations",
      title: "Launch Allocation Secured at SDSC for Suborbital Campaign",
      excerpt: "AlgoForge signs preliminary agreements to conduct its 2028 VTVL (Vertical Takeoff, Vertical Landing) suborbital demonstration flights from Test Pad Alpha.",
      icon: <Newspaper size={16} />,
      featured: false,
    }
  ];

  const featuredNews = newsItems.find(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  return (
    <PageLayout
      title="Newsroom"
      subtitle="Latest announcements, engineering updates, and press releases."
    >
      <div className="max-w-6xl mx-auto mt-12 pb-24 space-y-12">

        {/* FEATURED ARTICLE */}
        {featuredNews && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-[1px] bg-cyan-500" />
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
                Featured Press Release
              </span>
            </div>

            <Link href={`/newsroom/${featuredNews.id}`} className="group block">
              <div className="bg-[#050505] border border-white/10 group-hover:border-cyan-500/50 rounded-3xl overflow-hidden transition-all duration-500 relative">
                
                {/* Subtle Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="grid md:grid-cols-2">
                  {/* Image Placeholder */}
                  <div className="h-64 md:h-auto bg-black relative border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-center overflow-hidden">
                    {/* Placeholder Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent_70%)]" />
                    <Terminal size={48} className="text-white/10 group-hover:scale-110 group-hover:text-cyan-400/20 transition-all duration-700" />
                    
                    {/* Add real image here later */}
                    {/* <img src="/images/hotfire-test.jpg" alt={featuredNews.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" /> */}
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded text-[10px] font-mono uppercase tracking-widest">
                        {featuredNews.category}
                      </span>
                      <div className="flex items-center gap-2 text-white/40 text-xs font-mono uppercase tracking-widest">
                        <Calendar size={12} />
                        {featuredNews.date}
                      </div>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight group-hover:text-cyan-50 transition-colors">
                      {featuredNews.title}
                    </h2>
                    <p className="text-white/60 text-lg font-light leading-relaxed mb-8">
                      {featuredNews.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-xs">
                      Read Full Release
                      <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* LATEST NEWS GRID */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {regularNews.map((item, index) => (
              <Link key={item.id} href={`/newsroom/${item.id}`} className="group h-full">
                <div className="bg-[#0a0a0a] border border-white/5 group-hover:border-white/20 rounded-2xl p-8 h-full flex flex-col transition-colors duration-300">
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-white/40 group-hover:text-cyan-400 transition-colors">
                      {item.icon}
                    </span>
                    <div className="flex items-center gap-2 text-white/30 text-[10px] font-mono uppercase tracking-widest">
                      <Calendar size={10} />
                      {item.date}
                    </div>
                  </div>

                  <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-widest mb-3 block">
                    {item.category}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-4 leading-snug group-hover:text-cyan-50 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-white/50 text-sm font-light leading-relaxed mb-8 flex-grow">
                    {item.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest group-hover:text-cyan-400 transition-colors mt-auto">
                    View Article
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* PRESS INQUIRIES BANNER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 py-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-white font-bold mb-1">Media & Press Inquiries</h3>
            <p className="text-white/50 text-sm">Need official statements or technical clarification?</p>
          </div>
          <Link href="/media-kit" className="px-6 py-3 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/50 text-white hover:text-cyan-400 text-xs font-bold uppercase tracking-widest rounded-full transition-all">
            Access Media Kit
          </Link>
        </motion.div>

      </div>
    </PageLayout>
  );
}
