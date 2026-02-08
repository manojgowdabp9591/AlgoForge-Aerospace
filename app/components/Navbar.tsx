"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { Rocket, Menu, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Helper for active link styling
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out
          ${hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}
          bg-black/80 backdrop-blur-md border-b border-white/10`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group relative z-50">
            <div className="w-10 h-10 bg-cyan-900/20 border border-cyan-500/30 rounded flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all duration-300">
               <Rocket className="text-cyan-400 w-5 h-5 group-hover:-rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
                <h1 className="font-black tracking-[0.2em] text-xl text-white leading-none">VORTEX</h1>
                <span className="text-[8px] font-mono text-cyan-500 uppercase tracking-widest leading-none mt-1 group-hover:text-white transition-colors">Aerospace Systems</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-white/60">
            <NavLink href="/vehicles/orbiton" label="Vehicles" active={isActive("/vehicles/orbiton")} />
            <NavLink href="/technology/engine" label="Technology" active={isActive("/technology")} />
            <NavLink href="/careers" label="Careers" active={isActive("/careers")} />
            <NavLink href="/about" label="About" active={isActive("/about")} />
            
            {/* CTA Button */}
            <Link 
                href="/dashboard" 
                className="ml-4 px-5 py-2 bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 hover:border-cyan-400 rounded transition-all duration-300 flex items-center gap-2 group"
            >
                <span>Mission Control</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </nav>

          {/* MOBILE HAMBURGER BUTTON */}
          <button 
            className="md:hidden text-white/80 hover:text-cyan-400 transition p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={32} strokeWidth={1.5} />
          </button>

        </div>
      </header>

      {/* RENDER THE MOBILE MENU COMPONENT */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

// Sub-component for clean links
function NavLink({ href, label, active }: { href: string, label: string, active: boolean }) {
    return (
        <Link 
            href={href} 
            className={`relative transition-colors duration-300 hover:text-white group py-2
                ${active ? "text-white" : "text-white/60"}
            `}
        >
            {label}
            <span className={`absolute -bottom-1 left-0 h-[1px] bg-cyan-500 transition-all duration-300
                ${active ? "w-full" : "w-0 group-hover:w-1/2"}
            `}></span>
        </Link>
    )
}