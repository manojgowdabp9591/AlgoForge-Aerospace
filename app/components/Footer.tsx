"use client";
import Link from "next/link";
import { Twitter, Linkedin, Youtube, Instagram, Rocket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-transparent border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
                <div className="flex items-center gap-3 relative z-50">
            <img src="/Vortex-Aerospace-logo.png" alt="Vortex Aerospace Logo" className="h-9" />
                </div>
                <div>
                    <h2 className="text-xl font-black tracking-[0.2em] text-white leading-none">
                      VORTEX
                    </h2>
                    <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">Aerospace</span>
                </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed font-light">
              Redefining propulsion with detonation physics. Building the commercial highway to the stars. 
              <br /><span className="text-cyan-500 font-mono text-xs mt-2 block">AD ASTRA PER VORTEX.</span>
            </p>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Company</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-cyan-400 transition">Mission Log</Link></li>
              <li><Link href="/careers" className="hover:text-cyan-400 transition">Careers</Link></li>
              <li><Link href="/investors" className="hover:text-cyan-400 transition">Investors</Link></li>
              <li><Link href="/vehicles/orbiton" className="hover:text-cyan-400 transition">Vehicles</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Resources</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href="/technology" className="hover:text-cyan-400 transition">Technology</Link></li>
              <li><Link href="/dashboard" className="hover:text-cyan-400 transition">Mission Control</Link></li>
              <li><Link href="/admin/login" className="hover:text-cyan-400 transition">Admin Uplink</Link></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Press Kit</a></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Legal</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#" className="hover:text-cyan-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Export Control (ITAR/EAR)</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">
            © 2026 Vortex Aerospace Inc. Bengaluru, India. All rights reserved.
          </p>

          <div className="flex gap-6 text-white/60">
            <a href="#" className="hover:text-cyan-400 hover:scale-110 transition duration-300"><Twitter size={18} /></a>
            <a href="#" className="hover:text-cyan-400 hover:scale-110 transition duration-300"><Linkedin size={18} /></a>
            <a href="#" className="hover:text-cyan-400 hover:scale-110 transition duration-300"><Instagram size={18} /></a>
            <a href="#" className="hover:text-cyan-400 hover:scale-110 transition duration-300"><Youtube size={18} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}