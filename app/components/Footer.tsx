"use client";
import Link from "next/link";
import { Twitter, Linkedin, Youtube, Instagram } from "lucide-react"; // Make sure lucide-react is installed

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-black tracking-widest text-white mb-4">
              SPACE <span className="text-cyan-400">GEN</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Building the infrastructure for the next century of human history. Ad Astra.
            </p>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Company</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-cyan-400 transition">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-cyan-400 transition">Careers</Link></li>
              <li><Link href="/investors" className="hover:text-cyan-400 transition">Investors</Link></li>
              <li><Link href="/#mission" className="hover:text-cyan-400 transition">Mission</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Resources</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href="/#tech" className="hover:text-cyan-400 transition">Technology</Link></li>
              <li><Link href="/dashboard" className="hover:text-cyan-400 transition">Launch Dashboard</Link></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Press Kit</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Legal</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#" className="hover:text-cyan-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Export Control</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © 2026 Space Gen Inc. Bengaluru, India. All rights reserved.
          </p>

          <div className="flex gap-6 text-white/60">
            <a href="#" className="hover:text-cyan-400 transition"><Twitter size={18} /></a>
            <a href="#" className="hover:text-cyan-400 transition"><Linkedin size={18} /></a>
            <a href="#" className="hover:text-cyan-400 transition"><Instagram size={18} /></a>
            <a href="#" className="hover:text-cyan-400 transition"><Youtube size={18} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}