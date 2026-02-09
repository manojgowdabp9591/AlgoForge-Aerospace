"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

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
          bg-black/70 backdrop-blur-md border-b border-white/10`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3 relative z-50 group"
          >
            <img
              src="/Vortex-Aerospace-logo.png"
              alt="Vortex Aerospace Logo"
              className="h-9 w-auto"
            />
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-wide text-white">
                Vortex Aerospace
              </span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">
                Orbital Systems
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <Link
              href="/#mission"
              className="hover:text-cyan-400 transition-colors"
            >
              Mission
            </Link>
            <Link
              href="/technology/engine"
              className="hover:text-cyan-400 transition-colors"
            >
              Technology
            </Link>
            <Link
              href="/investors"
              className="hover:text-cyan-400 transition-colors"
            >
              Investors
            </Link>
            <Link
              href="/careers"
              className="hover:text-cyan-400 transition-colors"
            >
              Careers
            </Link>
            <Link
              href="/about"
              className="hover:text-cyan-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="/dashboard"
              className="text-cyan-400 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white p-2 rounded hover:bg-white/5 transition"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
