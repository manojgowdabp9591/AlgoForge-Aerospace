"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="relative z-10 bg-black border-t border-white/10 pt-24 pb-12 overflow-hidden">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* BRAND COLUMN */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                <img
                  src="/AlgoForge-Aerospace-logo.png"
                  alt="AlgoForge Aerospace Logo"
                  className="h-10 w-auto relative z-10"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-wide text-white group-hover:text-cyan-400 transition-colors">
                  AlgoForge Aerospace
                </span>
                <span className="text-[10px] text-white/40 uppercase tracking-[0.2em]">
                  Orbital Systems
                </span>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed font-light max-w-sm mb-8">
              Developing next-generation propulsion and reusable launch systems
              to expand reliable access to orbit. Accelerating the future of
              human spaceflight.
            </p>

            {/* Newsletter Input (hydration-safe) */}
            <div className="w-full max-w-xs mb-8">
              <p className="text-[10px] uppercase font-bold text-white/40 mb-2 tracking-widest">
                Flight Updates
              </p>

              {mounted && (
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter email..."
                    className="bg-white/5 border border-white/10 border-r-0 rounded-l px-4 py-2 text-sm text-white focus:outline-none focus:bg-white/10 w-full placeholder:text-white/20"
                  />
                  <button className="bg-white/10 border border-white/10 border-l-0 rounded-r px-3 hover:bg-cyan-500 hover:text-black transition-all">
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-emerald-500/80 font-mono text-[10px] tracking-widest bg-emerald-900/10 px-3 py-1.5 rounded border border-emerald-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              SYSTEMS OPERATIONAL
            </div>
          </div>

          {/* LINKS COLUMN */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Company */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-cyan-500 rounded-full" /> Company
              </h3>
              <ul className="space-y-4 text-sm text-white/50 font-medium">
                <li>
                  <Link href="/about" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-block">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-block">
                    Careers{" "}
                    <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded ml-2 text-white/70">
                      HIRING
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/investors" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-block">
                    Investors
                  </Link>
                </li>
                <li>
                  <Link href="/vehicles/orbiton" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-block">
                    Vehicles
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-block">
                    Newsroom
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-purple-500 rounded-full" /> Resources
              </h3>
              <ul className="space-y-4 text-sm text-white/50 font-medium">
                <li>
                  <Link href="/technology/engine" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-block">
                    Technology Stack
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-block">
                    Mission Control
                  </Link>
                </li>
                <li>
                  <Link href="/media-kit" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-block">
                    Media Kit
                  </Link>
                </li>
                <li>
                  <Link href="/launch-schedule" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-block">
                    Launch Schedule
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-gray-500 rounded-full" /> Legal
              </h3>
              <ul className="space-y-4 text-sm text-white/50 font-medium">
                <li>
                  <Link href="/privacy-policy" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-block">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-block">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/export-control" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-block flex items-center gap-2">
                    <ShieldCheck size={14} /> Export Control
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono text-center md:text-left">
              © 2026  AlgoForge Aerospace Inc.
            </p>
            <span className="hidden md:block text-white/10">|</span>
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">
              Bengaluru · Cape Canaveral
            </p>
          </div>

          <div className="flex gap-6">
            <SocialIcon href="#" icon={Twitter} />
            <SocialIcon href="https://www.linkedin.com/company/algoforge-aerospace/" icon={Linkedin} />
            <SocialIcon href="#" icon={Instagram} />
            <SocialIcon href="#" icon={Youtube} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon: Icon }: any) {
  return (
    <a
      href={href}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-cyan-500 hover:border-cyan-400 transition-all duration-300"
    >
      <Icon size={14} />
    </a>
  );
}
