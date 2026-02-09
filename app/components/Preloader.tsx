"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("INITIALIZING");
  const [animate, setAnimate] = useState(false);

  const bootSequence = [
    "INITIALIZING CORE",
    "LOADING ASSETS",
    "CALIBRATING SENSORS",
    "PRESSURIZING",
    "VORTEX ACTIVE",
  ];

  useEffect(() => {
    // Allow first paint + hydration before heavy animation
    const startAnimations = setTimeout(() => setAnimate(true), 150);

    let step = 0;
    const textInterval = setInterval(() => {
      step++;
      if (step < bootSequence.length) {
        setStatus(bootSequence[step]);
      }
    }, 500);

    const timer = setTimeout(() => {
      setLoading(false);
      clearInterval(textInterval);
    }, 2300);

    return () => {
      clearTimeout(timer);
      clearTimeout(startAnimations);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* LIGHT GRID (cheaper repaint) */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.035)_1px,transparent_1px)] bg-[size:48px_48px]" />

          <div className="relative z-10 flex flex-col items-center">
            {/* SPINNING RING (only after hydration) */}
            {animate && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-10 border border-t-cyan-500 border-b-cyan-500/30 border-r-transparent border-l-transparent rounded-full opacity-40"
              />
            )}

            {/* CORE */}
            <motion.div
              animate={
                animate
                  ? { opacity: [0.7, 1, 0.7], scale: [0.99, 1.01, 0.99] }
                  : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 2.2, repeat: Infinity }}
              className="mb-8 text-center"
            >
              <h1 className="text-5xl font-extrabold tracking-widest text-white mb-2">
                VORTEX
              </h1>
              <p className="text-[10px] text-cyan-400 tracking-[0.45em] font-mono uppercase">
                Aerospace
              </p>
            </motion.div>

            {/* LOADING BAR */}
            <div className="w-60 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-cyan-400"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "linear" }}
              />
            </div>

            {/* STATUS */}
            <div className="font-mono text-[10px] text-cyan-500/80 flex items-center gap-2 h-4">
              <Loader2 size={10} className="animate-spin" />
              <span className="tracking-widest">{status}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
