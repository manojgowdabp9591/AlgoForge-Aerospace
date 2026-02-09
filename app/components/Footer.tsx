"use client";

import Link from "next/link";
import { Twitter, Linkedin, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-transparent border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* BRAND */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <img
                src="/Vortex-Aerospace-logo.png"
                alt="Vortex Aerospace Logo"
                className="h-9 w-auto"
              />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-semibold tracking-wide text-white">
                  Vortex Aerospace
                </span>
                <span className="text-[10px] text-cyan-500 uppercase tracking-widest font-mono">
                  Orbital Systems
                </span>
              </div>
            </Link>

            <p className="text-white/50 text-sm leading-relaxed font-light max-w-sm">
              Developing next-generation propulsion and reusable launch systems
              to expand reliable access to orbit.
            </p>

            <p className="text-cyan-500 font-mono text-[10px] tracking-widest mt-4">
              AD ASTRA · PER VORTEX
            </p>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-6">
              Company
            </h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-cyan-400 transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/investors" className="hover:text-cyan-400 transition">
                  Investors
                </Link>
              </li>
              <li>
                <Link
                  href="/vehicles/orbiton"
                  className="hover:text-cyan-400 transition"
                >
                  Vehicles
                </Link>
              </li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-6">
              Resources
            </h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li>
                <Link
                  href="/technology"
                  className="hover:text-cyan-400 transition"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-cyan-400 transition"
                >
                  Mission Control
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="hover:text-cyan-400 transition"
                >
                  Secure Access
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Press Kit
                </a>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-6">
              Legal
            </h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Export Compliance (ITAR / EAR)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono text-center md:text-left">
            © 2026 Vortex Aerospace Inc. · Bengaluru, India · All rights reserved
          </p>

          <div className="flex gap-5 text-white/60">
            <a href="#" className="hover:text-cyan-400 transition">
              <Twitter size={16} />
            </a>
            <a href="#" className="hover:text-cyan-400 transition">
              <Linkedin size={16} />
            </a>
            <a href="#" className="hover:text-cyan-400 transition">
              <Instagram size={16} />
            </a>
            <a href="#" className="hover:text-cyan-400 transition">
              <Youtube size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
