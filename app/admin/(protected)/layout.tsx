"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Rocket, Target, LogOut,
  ChevronRight, Menu, X, ShieldAlert, Lock,
} from "lucide-react";

const NAV = [
  {
    group: "Careers",
    items: [{ label: "Applications", href: "/admin/applications", icon: Users }],
  },
  {
    group: "Mission Control",
    items: [
      { label: "Director Dashboard", href: "/admin/mission", icon: Rocket },
      { label: "Launch Pad",         href: "/admin/mission/launch", icon: Target },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ── Login page: passthrough only ──────────────────────────
  if (pathname?.startsWith("/admin/login")) {
    return (
      <div className="relative min-h-screen w-full text-white bg-black">
        {children}
      </div>
    );
  }

  // ── Logout: clears cookie via API ─────────────────────────
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  // ── Protected layout ──────────────────────────────────────
  return (
    <div className="relative min-h-screen w-full text-white">

      <div className="fixed inset-0 bg-black/60 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(220,38,38,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            key="sidebar"
            initial={{ x: -240, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -240, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-full w-56 z-30 flex flex-col bg-[#0a0a0a] border-r border-red-900/30"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />

            <div className="px-5 py-5 border-b border-white/[0.05]">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-red-500/5 rounded-lg ring-1 ring-red-500/20 shadow-[0_0_12px_rgba(220,38,38,0.15)]">
                  <ShieldAlert size={16} className="text-red-500" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-white font-mono font-black text-sm tracking-[0.15em] uppercase">AlgoForge</div>
                  <div className="text-red-500/50 font-mono text-[9px] uppercase tracking-widest flex items-center gap-1">
                    <Lock size={8} /> Command Console
                  </div>
                </div>
              </div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
              {NAV.map((group) => (
                <div key={group.group}>
                  <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest px-2 mb-2">
                    {group.group}
                  </p>
                  {group.items.map((item) => {
                    const active =
                      pathname === item.href ||
                      (item.href !== "/admin" && pathname?.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-mono uppercase tracking-wider transition-all duration-200 mb-1 group relative overflow-hidden
                          ${active
                            ? "bg-red-500/[0.08] text-red-400 border border-red-900/50"
                            : "text-white/30 hover:text-white/70 hover:bg-white/[0.03] border border-transparent"
                          }`}
                      >
                        {active && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent" />}
                        <item.icon size={13} className={`shrink-0 ${active ? "text-red-400" : "text-white/20 group-hover:text-white/50"}`} />
                        <span className="relative z-10">{item.label}</span>
                        {active && <ChevronRight size={11} className="ml-auto text-red-500/40 relative z-10" />}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>

            <div className="px-5 py-3 border-t border-white/[0.05]">
              <p className="text-[9px] text-white/20 uppercase tracking-widest font-mono text-center">SYS: VTX-SECURE-V9.2</p>
              <div className="flex justify-center gap-1.5 mt-2">
                <div className="w-1 h-1 bg-red-500/30 rounded-full animate-pulse" />
                <div className="w-1 h-1 bg-red-500/30 rounded-full animate-pulse delay-75" />
                <div className="w-1 h-1 bg-red-500/30 rounded-full animate-pulse delay-150" />
              </div>
            </div>

            <div className="px-3 pb-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[11px] font-mono uppercase tracking-wider text-white/20 hover:text-red-400 hover:bg-red-500/[0.06] border border-transparent hover:border-red-900/40 transition-all duration-200 group"
              >
                <LogOut size={13} className="group-hover:text-red-400 transition-colors" />
                Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <button
        onClick={() => setSidebarOpen((p) => !p)}
        className={`fixed top-4 z-40 flex items-center justify-center w-8 h-8 rounded-lg bg-[#0a0a0a] border border-red-900/30 text-white/30 hover:text-red-400 hover:border-red-900/60 hover:shadow-[0_0_12px_rgba(220,38,38,0.15)] transition-all duration-200 ${sidebarOpen ? "left-[13.5rem]" : "left-4"}`}
      >
        {sidebarOpen ? <X size={13} /> : <Menu size={13} />}
      </button>

      <motion.div
        animate={{ marginLeft: sidebarOpen ? "14rem" : "0rem" }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="relative z-10 min-h-screen"
      >
        {children}
      </motion.div>

    </div>
  );
}
