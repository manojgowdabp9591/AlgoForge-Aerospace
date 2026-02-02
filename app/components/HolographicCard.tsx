"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import { LucideIcon } from "lucide-react";

interface HolographicCardProps {
  title: string;
  text: string;
  icon: LucideIcon; // We will pass real icons
}

export default function HolographicCard({ title, text, icon: Icon }: HolographicCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative border border-white/10 bg-black/40 px-8 py-10 rounded-xl overflow-hidden backdrop-blur-sm"
      onMouseMove={handleMouseMove}
    >
      {/* 1. Moving Gradient Spotlight (The "Hologram" effect) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(34, 211, 238, 0.10),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* 2. Content */}
      <div className="relative z-10">
        <div className="mb-4 inline-block p-3 rounded-lg bg-white/5 text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition-colors duration-300">
          <Icon size={28} />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
          {title}
        </h3>
        
        <p className="text-white/60 leading-relaxed font-light text-sm">
          {text}
        </p>
      </div>

      {/* 3. Decorative HUD Corner Borders */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 rounded-tr-xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/10 rounded-bl-xl opacity-50" />
    </div>
  );
}