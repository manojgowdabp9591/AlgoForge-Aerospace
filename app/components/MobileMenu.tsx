"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { X, ChevronRight, Github, Twitter, Linkedin, ExternalLink, Youtube, Instagram } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuVariants: Variants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
          />

          {/* DRAWER */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-[85%] max-w-[360px] bg-black/90 border-l border-white/10 z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* BACKGROUND NOISE */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-0" />
            
            {/* HEADER */}
            <div className="relative z-10 flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-wide text-white">
                   AlgoForge Aerospace
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-bold">
                  System Navigation
                </span>
              </div>

              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-colors group"
              >
                <X className="w-5 h-5 text-white/70 group-hover:text-cyan-400 transition-colors" />
              </button>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="relative z-10 flex-1 overflow-y-auto p-6 flex flex-col gap-8">
              
              {/* PRIMARY NAV */}
              <nav className="flex flex-col gap-2">
                <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-2">Main Menu</div>
                
                <MobileLink href="/programs" onClick={onClose} variants={itemVariants}>
                  Launch Programs
                </MobileLink>
                <MobileLink href="/technology/engine" onClick={onClose} variants={itemVariants}>
                  Propulsion Tech
                </MobileLink>
                <MobileLink href="/investors" onClick={onClose} variants={itemVariants}>
                  Investor Relations
                </MobileLink>
                <MobileLink href="/careers" onClick={onClose} variants={itemVariants}>
                  Careers
                </MobileLink>
                <MobileLink href="#/about" onClick={onClose} variants={itemVariants}>
                  About Us
                </MobileLink>
              </nav>

              {/* SECONDARY / DASHBOARD */}
              <motion.div variants={itemVariants} className="p-4 rounded-xl bg-gradient-to-br from-cyan-900/20 to-transparent border border-cyan-500/20">
                <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold mb-3">Internal Access</div>
                <Link
                   href="/dashboard"
                   onClick={onClose}
                   className="flex items-center justify-between group"
                >
                    <span className="text-white font-bold text-lg group-hover:text-cyan-400 transition-colors">Mission Control</span>
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                        <ExternalLink size={16} />
                    </div>
                </Link>
              </motion.div>

              {/* SOCIALS */}
              <motion.div variants={itemVariants} className="mt-auto pt-6 border-t border-white/10">
                 <div className="flex gap-4 justify-center">
                    <SocialLink href="https://x.com/AlgoForgeAero" icon={Twitter} />
                    <SocialLink href="https://www.linkedin.com/company/algoforge-aerospace/" icon={Linkedin} />
                    <SocialLink href="https://www.instagram.com/algoforgeaerospace/" icon={Instagram} />
                    <SocialLink href="https://www.youtube.com/@AlgoForgeAerospace" icon={Youtube} />
                 </div>
                 <p className="text-center text-[10px] text-white/20 mt-4 font-mono">
                    © 2026 AlgoForge Aerospace Inc. <br /> All Systems Nominal.
                 </p>
              </motion.div>

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------- SUB-COMPONENTS ---------- */

function MobileLink({
  href,
  onClick,
  children,
  variants
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  variants: Variants;
}) {
  return (
    <motion.div variants={variants}>
        <Link
        href={href}
        onClick={onClick}
        className="group flex items-center justify-between py-3 px-4 rounded-lg hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-white/5"
        >
        <span className="text-lg font-medium text-white/80 group-hover:text-white transition-colors">
            {children}
        </span>
        <ChevronRight size={16} className="text-white/20 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
        </Link>
    </motion.div>
  );
}

function SocialLink({ href, icon: Icon }: { href: string; icon: any }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-cyan-500/30 transition-all"
        >
            <Icon size={18} />
        </a>
    )
}
