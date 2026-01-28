"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu"; // Import the new component

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

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

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-transform duration-300
          ${hidden ? "-translate-y-full" : "translate-y-0"}
          bg-black/70 backdrop-blur border-b border-white/10`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 relative z-50">
            <img src="/spacegen-logo.png" alt="Space Gen Logo" className="h-9" />
            <h1 className="font-extrabold tracking-widest text-xl">SPACE GEN</h1>
          </Link>

          {/* DESKTOP NAV (Hidden on Mobile) */}
          <nav className="hidden md:flex gap-6 text-sm text-white/70">
            <Link href="/#mission" className="hover:text-cyan-400 transition">Mission</Link>
            <Link href="/#tech" className="hover:text-cyan-400 transition">Technology</Link>
            <Link href="/investors" className="hover:text-cyan-400 transition">Investors</Link>
            <Link href="/careers" className="hover:text-cyan-400 transition">Careers</Link>
            <Link href="/about" className="hover:text-cyan-400">About</Link>
            <Link href="/dashboard" className="hover:text-cyan-400 transition">Dashboard</Link>
            
          </nav>

          {/* MOBILE HAMBURGER BUTTON (Visible only on Mobile) */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

        </div>
      </header>

      {/* RENDER THE MOBILE MENU COMPONENT */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}