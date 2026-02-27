"use client";

import PageLayout from "@/app/components/PageLayout";
import { motion } from "framer-motion";
import { ShieldAlert, Globe, FileWarning, Scale, Ban, Mail } from "lucide-react";

export default function ExportControl() {
  const lastUpdated = "February 27, 2026";

  const sections = [
    {
      id: "regulatory-framework",
      title: "1. Regulatory Framework",
      icon: <Scale size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            AlgoForge Aerospace operates within the strict parameters of international non-proliferation treaties and national export control laws. Due to the dual-use nature of launch vehicles, propulsion systems, and aerospace materials, our technologies are highly regulated.
          </p>
          <p>
            Our operations comply with the relevant regional export control frameworks, including but not limited to India's SCOMET (Special Chemicals, Organisms, Materials, Equipment and Technologies) list, and align with the guidelines of the Wassenaar Arrangement and the Missile Technology Control Regime (MTCR).
          </p>
        </>
      ),
    },
    {
      id: "controlled-data",
      title: "2. Controlled Technical Data",
      icon: <FileWarning size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            "Technical Data" refers to blueprints, plans, diagrams, models, formulae, tables, engineering designs, and specifications. The following materials generated or hosted by AlgoForge Aerospace are considered controlled:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/60 mb-4 marker:text-cyan-500">
            <li>3D CAD models of the AF-33 and AF-60 vehicle architectures.</li>
            <li>Computational Fluid Dynamics (CFD) and Finite Element Analysis (FEA) simulation results.</li>
            <li>VORTEX-1 engine parameters, injector configurations, and cooling lattice algorithms.</li>
            <li>Flight telemetry, GNC (Guidance, Navigation, and Control) source code, and payload integration manuals.</li>
          </ul>
        </>
      ),
    },
    {
      id: "user-responsibilities",
      title: "3. User Responsibilities & Restrictions",
      icon: <ShieldAlert size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            By accessing the AlgoForge Aerospace platform, you acknowledge that you are responsible for complying with all applicable export and import laws. You strictly agree that you will not:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/60 mb-4 marker:text-cyan-500">
            <li>Download, transmit, or otherwise transfer controlled Technical Data to any foreign person or entity without obtaining the necessary government licenses.</li>
            <li>Use AlgoForge technologies in the design, development, production, or use of military missiles, biological weapons, or chemical weapons.</li>
            <li>Share login credentials or portal access with unauthorized foreign nationals.</li>
          </ul>
        </>
      ),
    },
    {
      id: "prohibited-destinations",
      title: "4. Embargoed Destinations & Entities",
      icon: <Ban size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            No technology, software, or Technical Data from AlgoForge Aerospace may be downloaded, exported, or re-exported to any country subject to a comprehensive national or international embargo.
          </p>
          <p>
            Furthermore, you verify that you are not listed on any government denied-party, unverified, or restricted entity lists. Access attempts originating from embargoed IPs or known VPN exit nodes bypassing these restrictions will be actively logged and blocked.
          </p>
        </>
      ),
    },
    {
      id: "enforcement",
      title: "5. Violations & Enforcement",
      icon: <Globe size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            Violations of aerospace export control laws carry severe civil and criminal penalties, including massive financial fines and imprisonment. 
          </p>
          <p>
            AlgoForge Aerospace cooperates fully with national and international law enforcement and intelligence agencies. Any suspected unauthorized transfer of proprietary propulsion or vehicle data will be immediately reported to the appropriate regulatory authorities.
          </p>
        </>
      ),
    },
    {
      id: "contact",
      title: "6. Export Compliance Office",
      icon: <Mail size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            If you require access to controlled technical data for academic research, government contracting, or commercial partnership, you must clear our internal compliance check. Direct all licensing and export inquiries to our compliance office:
          </p>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl inline-block mt-2">
            <p className="text-white font-mono text-sm">exportcompliance@algoforgeaero.com</p>
            <p className="text-white/60 text-xs mt-1">Global Trade & Compliance Department</p>
          </div>
        </>
      ),
    },
  ];

  return (
    <PageLayout
      title="Export Control"
      subtitle="Regulatory framework and technology transfer guidelines."
    >
      <div className="max-w-4xl mx-auto mt-12 pb-24">
        
        {/* Header Metadata */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4"
        >
          <div>
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
              Document Control
            </p>
            <p className="text-white/40 text-sm">
              Effective Date / Last Updated: <span className="text-white">{lastUpdated}</span>
            </p>
          </div>
          <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg inline-flex items-center gap-2">
             <ShieldAlert size={16} className="text-red-400" />
             <span className="text-red-400 text-xs font-mono uppercase tracking-widest">ITAR / SCOMET Aware</span>
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose prose-invert max-w-none mb-16"
        >
          <p className="text-white/70 text-lg leading-relaxed font-light">
            Due to the advanced nature of orbital launch vehicles, generative propulsion design, and high-performance aerospace materials, information hosted on the AlgoForge Aerospace network is strictly controlled.
          </p>
          <p className="text-white/70 text-lg leading-relaxed font-light mt-4">
            This policy outlines your legal responsibilities when accessing computational models, technical specifications, and mission architecture data provided by AlgoForge Aerospace.
          </p>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.02] transition-colors duration-500 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-black border border-white/10 rounded-xl group-hover:border-cyan-500/50 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {section.title}
                </h2>
              </div>
              
              <div className="text-white/70 leading-relaxed font-light text-base">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-white/30 text-xs font-mono tracking-widest uppercase">
            // END OF COMPLIANCE DOCUMENT //
          </p>
        </motion.div>

      </div>
    </PageLayout>
  );
}
