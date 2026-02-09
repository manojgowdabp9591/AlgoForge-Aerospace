"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuVariants: Variants = {
    closed: {
      x: "100%",
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 320,
        damping: 32,
      },
    },
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />

          {/* DRAWER */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-black border-l border-white/10 z-[70] shadow-[0_0_50px_rgba(56,189,248,0.25)] p-6 overflow-y-auto"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-wide text-white">
                  Vortex Aerospace
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">
                  Navigation
                </span>
              </div>

              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 rounded hover:bg-white/5 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-7 h-7 text-white/80"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* PRIMARY NAV */}
            <nav className="flex flex-col gap-5 text-base font-medium text-white/80">
              <MobileLink href="/#mission" onClick={onClose}>
                Mission
              </MobileLink>
              <MobileLink href="/#tech" onClick={onClose}>
                Technology
              </MobileLink>
              <MobileLink href="/investors" onClick={onClose}>
                Investors
              </MobileLink>
              <MobileLink href="/careers" onClick={onClose}>
                Careers
              </MobileLink>
              <MobileLink href="/about" onClick={onClose}>
                About
              </MobileLink>

              <div className="my-3 h-px bg-white/10" />

              {/* INTERNAL / ADVANCED */}
              <MobileLink href="/dashboard" onClick={onClose}>
                <span className="text-cyan-400 font-semibold">
                  Mission Dashboard
                </span>
              </MobileLink>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------- LINK ---------- */

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="py-1 hover:text-cyan-400 hover:pl-2 transition-all duration-200"
    >
      {children}
    </Link>
  );
}
