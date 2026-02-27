"use client";

import PageLayout from "@/app/components/PageLayout";
import { motion } from "framer-motion";
import { Scale, FileCode, Rocket, AlertOctagon, Globe, Terminal } from "lucide-react";

export default function TermsOfService() {
  const lastUpdated = "February 27, 2026";

  const sections = [
    {
      id: "use-license",
      title: "1. Use License & Access",
      icon: <Terminal size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            Permission is granted to temporarily access and view the materials (including 3D geometries, computational models, and technical data) on AlgoForge Aerospace's website for personal, non-commercial transitory viewing only.
          </p>
          <p className="mb-4">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul className="list-disc pl-6 space-y-2 text-white/60 mb-4 marker:text-cyan-500">
            <li>Modify, copy, or reverse-engineer any 3D models, generative algorithms, or vehicle specifications.</li>
            <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial) without explicit written consent.</li>
            <li>Attempt to decompile or extract the source code of any software contained on the AlgoForge Aerospace web platform.</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>
        </>
      ),
    },
    {
      id: "intellectual-property",
      title: "2. Intellectual Property (IP)",
      icon: <Rocket size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            All content on this website, including but not limited to the AF-33, AF-60, and Orbiton-1 vehicle architectures, VORTEX-1 engine designs, generative lattice structures, text, graphics, logos, and digital downloads, is the exclusive property of AlgoForge Aerospace and protected by international copyright and trademark laws.
          </p>
          <p>
            Unauthorized reproduction, distribution, or manufacturing based on our proprietary computational blueprints is strictly prohibited and will be subject to legal action.
          </p>
        </>
      ),
    },
    {
      id: "disclaimer",
      title: "3. Disclaimer of Warranties",
      icon: <FileCode size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            The materials on AlgoForge Aerospace's website are provided on an 'as is' basis. AlgoForge Aerospace makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular aerospace application, or non-infringement of intellectual property.
          </p>
          <p>
            Further, AlgoForge Aerospace does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the computational models or payload calculations on its website.
          </p>
        </>
      ),
    },
    {
      id: "limitations",
      title: "4. Limitations of Liability",
      icon: <AlertOctagon size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            In no event shall AlgoForge Aerospace or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AlgoForge Aerospace's website, even if AlgoForge Aerospace or an authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
        </>
      ),
    },
    {
      id: "governing-law",
      title: "5. Governing Law & Jurisdiction",
      icon: <Globe size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            These terms and conditions are governed by and construed in accordance with the laws of India. You irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
          <p>
            Any export of technical data or 3D models must comply with applicable international aerospace and defense export control regulations.
          </p>
        </>
      ),
    },
    {
      id: "modifications",
      title: "6. Terms of Use Modifications",
      icon: <Scale size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            AlgoForge Aerospace may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then-current version of these Terms and Conditions.
          </p>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl inline-block mt-2">
            <p className="text-white font-mono text-sm">legal@algoforgeaero.com</p>
            <p className="text-white/60 text-xs mt-1">Direct inquiries to the Legal Department</p>
          </div>
        </>
      ),
    },
  ];

  return (
    <PageLayout
      title="Terms of Service"
      subtitle="Legal agreements and usage licenses for the AlgoForge platform."
    >
      <div className="max-w-4xl mx-auto mt-12 pb-24">
        
        {/* Header Metadata */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 border-b border-white/10 pb-8"
        >
          <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
            Document Control
          </p>
          <p className="text-white/40 text-sm">
            Effective Date / Last Updated: <span className="text-white">{lastUpdated}</span>
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose prose-invert max-w-none mb-16"
        >
          <p className="text-white/70 text-lg leading-relaxed font-light">
            Welcome to AlgoForge Aerospace. By accessing the <a href="https://www.algoforgeaero.com" className="text-cyan-400 hover:underline">algoforgeaero.com</a> network, computational interfaces, and 3D vehicle visualizers, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </p>
          <p className="text-white/70 text-lg leading-relaxed font-light mt-4">
            If you do not agree with any of these terms, you are prohibited from using or accessing this site and its proprietary aerospace models.
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
            // END OF DOCUMENT //
          </p>
        </motion.div>

      </div>
    </PageLayout>
  );
}