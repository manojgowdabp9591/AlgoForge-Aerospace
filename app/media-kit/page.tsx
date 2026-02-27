"use client";

import PageLayout from "@/app/components/PageLayout";
import { motion } from "framer-motion";
import { Download, ImageIcon, Film, FileText, Mail, ArrowUpRight } from "lucide-react";

export default function MediaKit() {
  const photoPlaceholders = [
    { id: 1, title: "AF-60 Heavy on Pad", category: "Vehicle" },
    { id: 2, title: "VORTEX-1 Hotfire", category: "Propulsion" },
    { id: 3, title: "Conformal Leg Deployment", category: "Hardware" },
    { id: 4, title: "Generative Lattice Interstage", category: "Manufacturing" },
    { id: 5, title: "AF-33 Flight Profile", category: "Vehicle" },
    { id: 6, title: "AlgoForge HQ & Cleanroom", category: "Facilities" },
  ];

  const videoPlaceholders = [
    { id: 1, title: "Orbiton-1 Mission Animation", duration: "01:45" },
    { id: 2, title: "VORTEX-1 Engine B-Roll", duration: "03:20" },
  ];

  return (
    <PageLayout
      title="Press & Media Kit"
      subtitle="Official brand assets, high-resolution imagery, and company overview."
    >
      <div className="max-w-6xl mx-auto mt-12 pb-24 space-y-20">
        
        {/* 1. COMPANY BOILERPLATE */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <FileText className="text-cyan-400" size={20} />
              About AlgoForge
            </h2>
            <p className="text-xs text-white/40 font-mono uppercase tracking-widest">Official Boilerplate</p>
          </div>
          <div className="md:col-span-2 bg-[#050505] border border-white/10 rounded-2xl p-8 relative group">
            <p className="text-white/70 leading-relaxed font-light mb-6">
              AlgoForge Aerospace is a next-generation launch provider dedicated to revolutionizing orbital access through computational design and generative manufacturing. By leveraging proprietary VORTEX detonation engines and mathematically optimized airframes, AlgoForge develops fully reusable, high-cadence launch vehicles. Headquartered in India, the company aims to drastically lower the cost of deploying heavy orbital infrastructure, including space data centers and satellite constellations.
            </p>
            <button className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
              <Download size={14} />
              Download as PDF
            </button>
          </div>
        </motion.section>

        {/* 2. BRAND ASSETS */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Brand Guidelines & Logos</h2>
            <p className="text-white/50">Please adhere to our clear space and color guidelines when using AlgoForge assets.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Logo Dark Mode */}
            <div className="bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors rounded-2xl p-8 flex flex-col justify-between group">
              <div className="h-32 flex items-center justify-center border border-dashed border-white/20 rounded-lg mb-6 group-hover:bg-black/50 transition-colors">
                {/* REPLACE WITH YOUR LOGO */}
                <span className="text-white/30 font-mono text-sm uppercase tracking-widest">Logo_Dark_Horizontal.svg</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold">Primary Logo (Dark)</h3>
                  <p className="text-white/40 text-xs">For use on dark backgrounds.</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all">
                  <Download size={16} />
                </button>
              </div>
            </div>

            {/* Logo Light Mode */}
            <div className="bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors rounded-2xl p-8 flex flex-col justify-between group">
              <div className="h-32 flex items-center justify-center bg-white/90 border border-dashed border-black/20 rounded-lg mb-6">
                {/* REPLACE WITH YOUR LOGO */}
                <span className="text-black/50 font-mono text-sm uppercase tracking-widest">Logo_Light_Horizontal.svg</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold">Primary Logo (Light)</h3>
                  <p className="text-white/40 text-xs">For use on white/light backgrounds.</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 3. IMAGE GALLERY (PLACEHOLDERS) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <ImageIcon className="text-cyan-400" size={24} />
                High-Resolution Imagery
              </h2>
              <p className="text-white/50">Approved renders and hardware photography for press use.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
              <Download size={14} /> Download All (ZIP)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {photoPlaceholders.map((photo) => (
              <div key={photo.id} className="group cursor-pointer">
                {/* Image Box Placeholder */}
                <div className="aspect-video bg-black border border-white/10 rounded-xl mb-3 overflow-hidden relative flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_linear_infinite]" />
                  <ImageIcon size={32} className="text-white/10 group-hover:scale-110 transition-transform duration-500" />
                  
                  {/* Future Image Tag goes here: */}
                  {/* <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" /> */}
                  
                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[9px] font-mono uppercase tracking-widest text-white/60">
                    {photo.category}
                  </div>
                </div>
                {/* Caption */}
                <div className="flex items-start justify-between gap-2 px-1">
                  <h4 className="text-sm font-medium text-white/90 group-hover:text-cyan-400 transition-colors">{photo.title}</h4>
                  <ArrowUpRight size={14} className="text-white/30 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 4. VIDEO B-ROLL (PLACEHOLDERS) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Film className="text-cyan-400" size={24} />
              Broadcast B-Roll
            </h2>
            <p className="text-white/50">Unwatermarked 4K/60fps video assets for broadcast and editorial use.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {videoPlaceholders.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                {/* Video Box Placeholder */}
                <div className="aspect-[21/9] bg-black border border-white/10 rounded-xl mb-3 overflow-hidden relative flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300 z-10">
                    <div className="ml-1 w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-current border-b-[6px] border-b-transparent" />
                  </div>
                  
                  {/* Future Video Tag goes here: */}
                  {/* <video src={video.src} muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" /> */}

                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 backdrop-blur-md rounded text-[10px] font-mono text-white/80">
                    {video.duration}
                  </div>
                </div>
                <h4 className="text-sm font-medium text-white/90 px-1">{video.title}</h4>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 5. PRESS CONTACT */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-8 md:p-12 text-center"
        >
          <Mail className="mx-auto text-cyan-400 mb-4" size={32} />
          <h2 className="text-2xl font-bold text-white mb-2">Media & Press Inquiries</h2>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">
            For interview requests, technical clarifications, or to be added to our press release distribution list, please contact our communications team.
          </p>
          <a href="mailto:press@algoforgeaero.com" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]">
            press@algoforgeaero.com
          </a>
        </motion.section>

      </div>
    </PageLayout>
  );
}