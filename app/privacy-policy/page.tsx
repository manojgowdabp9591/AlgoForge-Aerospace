"use client";

import PageLayout from "@/app/components/PageLayout";
import { motion } from "framer-motion";
import { Shield, Lock, Database, Eye, Server, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  const lastUpdated = "February 27, 2026";

  const sections = [
    {
      id: "information-collection",
      title: "1. Information We Collect",
      icon: <Database size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            At AlgoForge Aerospace, we collect information to provide better services to all our users, clients, and partners. The types of information we collect include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/60 mb-4 marker:text-cyan-500">
            <li><strong className="text-white/80">Personal Identification Information:</strong> Name, email address, phone number, and professional affiliations when you contact us, request a quote, or subscribe to our updates.</li>
            <li><strong className="text-white/80">Technical Data:</strong> IP addresses, browser types, operating systems, and device identifiers collected automatically when you interact with our platform.</li>
            <li><strong className="text-white/80">Usage Data:</strong> Information about how you navigate and interact with our 3D models, technical specifications, and web applications.</li>
          </ul>
        </>
      ),
    },
    {
      id: "use-of-data",
      title: "2. How We Use Your Data",
      icon: <Server size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            The data we collect is utilized strictly to enhance your experience and facilitate our aerospace engineering and manufacturing services. We use this information to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/60 mb-4 marker:text-cyan-500">
            <li>Respond to your inquiries and provide technical support.</li>
            <li>Improve the performance, rendering speeds, and user interface of our interactive 3D web applications.</li>
            <li>Send periodic updates regarding new vehicle architectures, launch schedules, and corporate milestones (only if opted-in).</li>
            <li>Detect, prevent, and address technical issues or malicious activity on our servers.</li>
          </ul>
        </>
      ),
    },
    {
      id: "data-security",
      title: "3. Data Security Architecture",
      icon: <Shield size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            Security is critical in the aerospace sector. We implement commercially reasonable, industry-standard security protocols to protect your personal information from unauthorized access, alteration, disclosure, or destruction. 
          </p>
          <p>
            While we strive to use commercially acceptable means to protect your Personal Data, including end-to-end encryption (TLS/SSL) for web traffic, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </>
      ),
    },
    {
      id: "third-party",
      title: "4. Third-Party Services",
      icon: <Eye size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            We may employ third-party companies and individuals to facilitate our Website ("Service Providers"), provide the Website on our behalf, perform Website-related services, or assist us in analyzing how our Website is used.
          </p>
          <p>
            These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>
        </>
      ),
    },
    {
      id: "your-rights",
      title: "5. Your Privacy Rights",
      icon: <Lock size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            Depending on your location (such as under the GDPR or CCPA), you may have the following rights regarding your personal data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/60 mb-4 marker:text-cyan-500">
            <li>The right to access, update, or delete the information we have on you.</li>
            <li>The right of rectification (to fix inaccurate data).</li>
            <li>The right to object to our processing of your Personal Data.</li>
            <li>The right to data portability.</li>
          </ul>
        </>
      ),
    },
    {
      id: "contact",
      title: "6. Contact Us",
      icon: <Mail size={20} className="text-cyan-400" />,
      content: (
        <>
          <p className="mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact our administrative team:
          </p>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl inline-block">
            <p className="text-white font-mono text-sm">legal@algoforgeaero.com</p>
            <p className="text-white/60 text-xs mt-1">AlgoForge Aerospace HQ</p>
          </div>
        </>
      ),
    },
  ];

  return (
    <PageLayout
      title="Privacy Policy"
      subtitle="Data protection and privacy protocols for AlgoForge Aerospace."
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
            AlgoForge Aerospace ("us", "we", or "our") operates the <a href="https://www.algoforgeaero.com" className="text-cyan-400 hover:underline">algoforgeaero.com</a> website. 
            This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>
          <p className="text-white/70 text-lg leading-relaxed font-light mt-4">
            By using the Service, you agree to the collection and use of information in accordance with this policy.
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