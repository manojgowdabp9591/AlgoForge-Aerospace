"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (or wait for window load event)
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          {/* Pulsing Logo */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8"
          >
            <h1 className="text-4xl font-black tracking-widest text-white">
                SPACE <span className="text-cyan-400">GEN</span>
            </h1>
          </motion.div>

          {/* Loading Bar */}
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-cyan-400 box-shadow-[0_0_20px_#22d3ee]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          </div>

          <div className="mt-4 font-mono text-xs text-cyan-400 flex gap-2">
            <span>SYSTEM CHECK</span>
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
            >...</motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}