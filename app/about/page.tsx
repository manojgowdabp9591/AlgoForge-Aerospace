"use client";

import PageLayout from "../components/PageLayout"; // Fixed casing here
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <PageLayout 
      title="Our Mission" 
      subtitle="Democratizing access to space for the next generation."
    >
      <div className="grid md:grid-cols-2 gap-16 items-center mt-10">

        {/* 1. FOUNDER IMAGE WITH GLOW EFFECT */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center"
        >
          {/* Cyan Glow behind image */}
          <div className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-full pointer-events-none" />
          
          <div className="relative w-80 h-80 rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(34,211,238,0.2)]">
            {/* Make sure you have a file named 'founder.jpg' in your 'public' folder.
               If not, this grey block acts as a placeholder.
            */}
            <img
              src="/founder.jpg"
              alt="Manoj Gowda B P - Founder"
              className="w-full h-full object-cover bg-neutral-900"
            />
          </div>
        </motion.div>

        {/* 2. FOUNDER MESSAGE */}
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-extrabold mb-8 text-white">
            Why We Look Up.
          </h2>

          <div className="space-y-6 text-lg text-white/70 leading-relaxed font-light">
            <p>
              For decades, space has been the province of superpowers and massive
              budgets. But I founded <span className="text-cyan-400 font-bold">Space Gen</span> with a different belief: 
              that space belongs to everyone.
            </p>

            <p>
              Growing up, I watched rockets climb into the sky and realized that
              the only thing holding us back was the immense cost of throwing away
              the vehicle after every trip. In no other mode of transportation—
              cars, planes, trains—do we discard the vehicle after a single
              journey. Why should space be different?
            </p>

            <p>
              At Space Gen, we are solving the hardest engineering problems to
              build a future where a ticket to orbit is as common as a plane
              ticket. We are leveraging India’s incredible engineering talent and
              frugal innovation to build the world’s most efficient reusable
              rockets.
            </p>

            <p className="italic border-l-2 border-cyan-400 pl-4 my-6 text-white/90">
              "We aren’t just building machines; we are building a highway to the
              stars for the next generation. The road is hard, but the view is
              worth it."
            </p>
          </div>

          <div className="mt-10">
            <p className="text-2xl font-handwriting text-cyan-400 font-bold glow-text">
              Manoj Gowda B P
            </p>
            <p className="text-sm text-white/40 uppercase tracking-widest mt-1">
              Founder & CEO
            </p>
          </div>
        </motion.div>

      </div>
    </PageLayout>
  );
}