"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
        setHidden(true);
    } else {
        setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        variants={{
            visible: { y: 0 },
            hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled 
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg" 
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3 relative z-50 group"
          >
            <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="relative"
            >
                <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                src="/AlgoForge-Aerospace-logo.png"
                alt="AlgoForge Aerospace Logo"
                className="h-10 w-auto relative z-10"
                />
            </motion.div>
            
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-wide text-white group-hover:text-cyan-400 transition-colors">
                AlgoForge Aerospace
              </span>
              <span className="text-[9px] text-white/40 uppercase tracking-[0.2em] group-hover:text-white/60 transition-colors">
                Orbital Systems
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/programs">Launch Programs</NavLink>
            <NavLink href="/technology/engine">Technology</NavLink>
            <NavLink href="/investors">Investors</NavLink>
            <NavLink href="/careers">Careers</NavLink>
            <NavLink href="#/about">About</NavLink>
            
            <div className="w-[1px] h-6 bg-white/10 mx-2" />
            
            <Link
              href="/dashboard"
              className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors group"
            >
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 group-hover:w-1/2 transition-all duration-300 ease-out" />
              Dashboard
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition active:scale-95"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors group"
        >
            {children}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 group-hover:w-1/2 transition-all duration-300 ease-out" />
        </Link>
    );
}
