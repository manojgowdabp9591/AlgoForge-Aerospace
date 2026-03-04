"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Rocket, Target, LogOut,
  ChevronRight, Menu, X
} from "lucide-react";

const NAV = [
  {
    group: "Careers",
    items: [
      { label: "Applications", href: "/admin/applications", icon: Users },
    ],
  },
  {
    group: "Mission Control",
    items: [
      { label: "Director Dashboard", href: "/admin/mission", icon: Rocket },
      { label: "Launch Pad", href: "/admin/mission/launch", icon: Target },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const auth = sessionStorage.getItem("admin_auth");
    if (!auth && !isLoginPage) {
      router.replace("/admin/login");
    } else {
      setAuthed(true);
    }
  }, [pathname]);

  // Login page — keep your exact original layout, no sidebar
  if (isLoginPage) {
    return (
      <div className="relative min-h-screen w-full text-white">
        <div className="fixed inset-0 bg-black/60 pointer-events-none z-0" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  if (!authed) return null;

  return (
    <div className="relative min-h-screen w-full text-white">

      {/* ── YOUR ORIGINAL BACKGROUND ── */}
      <div className="fixed inset-0 bg-black/60 pointer-events-none z-0" />

      {/* ── SIDEBAR ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            key="sidebar"
            initial={{ x: -224, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -224, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-full w-56 z-30 flex flex-col
              bg-black/80 backdrop-blur-xl
              border-r border-white/[0.07]"
          >
            {/* Logo */}
            <div className="px-5 py-5 border-b border-white/[0.07]">
              <div className="text-cyan-400 font-mono font-bold text-sm tracking-widest">
                ⬡ ALGOFORGE
              </div>
              <div className="text-white/30 font-mono text-[10px] uppercase tracking-widest mt-0.5">
                Admin Panel
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
              {NAV.map((group) => (
                <div key={group.group}>
                  <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest px-2 mb-2">
                    {group.group}
                  </p>
                  {group.items.map((item) => {
                    const active =
                      pathname === item.href ||
                      (item.href !== "/admin" && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl
                          text-xs font-mono transition-all mb-1 group
                          ${
                            active
                              ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[inset_0_0_20px_rgba(34,211,238,0.03)]"
                              : "text-white/40 hover:text-white hover:bg-white/[0.04] border border-transparent"
                          }`}
                      >
                        <item.icon size={14} className={active ? "text-cyan-400" : "text-white/30 group-hover:text-white/60"} />
                        <span className="uppercase tracking-wider">{item.label}</span>
                        {active && (
                          <ChevronRight size={11} className="ml-auto text-cyan-400/60" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>

            {/* Logout */}
            <div className="px-3 py-4 border-t border-white/[0.07]">
              <button
                onClick={() => {
                  sessionStorage.clear();
                  router.replace("/admin/login");
                }}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
                  text-xs font-mono text-white/30 hover:text-white
                  hover:bg-white/[0.04] transition-all group"
              >
                <LogOut size={13} className="group-hover:text-red-400 transition-colors" />
                <span className="uppercase tracking-wider">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── TOGGLE BUTTON ── */}
      <button
        onClick={() => setSidebarOpen((p) => !p)}
        className={`fixed top-4 z-40 flex items-center justify-center
          w-8 h-8 rounded-lg bg-black/70 backdrop-blur-md
          border border-white/10 text-white/50 hover:text-white
          hover:border-white/20 transition-all
          ${sidebarOpen ? "left-[13.5rem]" : "left-4"}`}
      >
        {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
      </button>

      {/* ── MAIN CONTENT ── */}
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
