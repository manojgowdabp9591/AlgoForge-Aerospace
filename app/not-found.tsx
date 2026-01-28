"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden text-center px-6">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <h1 className="text-9xl font-black text-white/10 select-none">404</h1>
        
        <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 glow-text">
                Signal Lost
            </h2>
        </div>
      </motion.div>

      <p className="text-white/60 mt-6 max-w-md text-lg relative z-10">
        Houston, we have a problem. The trajectory you are looking for does not exist.
      </p>

      {/* THE FIX: Using <Link> instead of <button>.
          This is the standard Next.js method for navigation.
          It behaves exactly like a button visually but works like a standard HTML link.
      */}
      <Link 
        href="/"
        className="relative z-50 mt-8 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition hover:scale-105 active:scale-95 inline-block"
      >
        Return to Base
      </Link>

      {/* Rotating Debris Animation */}
      <motion.div
        animate={{ rotate: 360, x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-20 w-32 h-32 opacity-20 pointer-events-none"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
        </svg>
      </motion.div>

    </div>
  );
}