"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // FIXED: TypeScript error with Framer Motion variants
  const menuVariants: Variants = {
    closed: { 
      x: "100%", 
      opacity: 0 
    },
    open: { 
      x: 0, 
      opacity: 1, 
      transition: { 
        type: "spring",
        stiffness: 300, 
        damping: 30 
      } 
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. Backdrop (Clicking outside closes the menu) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* 2. Slide-out Drawer */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            // ADDED: overflow-y-auto prevents menu items from being cut off on small screens
            className="fixed top-0 right-0 h-full w-[85%] max-w-[300px] bg-black border-l border-white/10 z-[70] shadow-[0_0_50px_rgba(56,189,248,0.2)] p-6 overflow-y-auto"
          >
            {/* Header with Close Button */}
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold tracking-widest text-cyan-400">MENU</h2>
              <button onClick={onClose} className="p-2 text-white/70 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links Stack */}
            <nav className="flex flex-col gap-6 text-lg font-medium text-white/80">
              <MobileLink href="/#mission" onClick={onClose}>Mission</MobileLink>
              <MobileLink href="/technology/engine" onClick={onClose}>Technology</MobileLink>
              <MobileLink href="/investors" onClick={onClose}>Investors</MobileLink>
              <MobileLink href="/careers" onClick={onClose}>Careers</MobileLink>
              <MobileLink href="/about" onClick={onClose}>About</MobileLink>
              
              <hr className="border-white/10 my-2" />
              
              <MobileLink href="/dashboard" onClick={onClose}>
                <span className="text-cyan-400">Launch Dashboard</span>
              </MobileLink>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Helper component
function MobileLink({ href, onClick, children }: { href: string, onClick: () => void, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      onClick={onClick} 
      className="hover:text-cyan-400 hover:pl-2 transition-all duration-200"
    >
      {children}
    </Link>
  );
}