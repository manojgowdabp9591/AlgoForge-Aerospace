"use client";
export const dynamic = "force-dynamic";

import { Eye, EyeOff, ShieldAlert, Lock, ScanLine, Loader2, KeyRound, Fingerprint, ShieldCheck, Binary } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scanComplete, setScanComplete] = useState(false);

  // Intro Animation Simulation
  useEffect(() => {
    const timer = setTimeout(() => setScanComplete(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        await new Promise(r => setTimeout(r, 1000));
        const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
        throw new Error("Invalid Credentials");
        }

        router.push("/admin/dashboard");
    } catch (err) {
        setError("ACCESS DENIED: Credentials Rejected");
        setLoading(false);
    }
  }

  // --- LOADING STATE (BIOMETRIC SCAN) ---
  if (!scanComplete) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-black text-cyan-500 overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]" />
              
              <div className="relative z-10 flex flex-col items-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                      <ScanLine size={100} strokeWidth={1} className="text-cyan-400" />
                      <motion.div 
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                        className="absolute left-0 right-0 h-1 bg-cyan-500 shadow-[0_0_20px_#06b6d4]"
                      />
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="font-mono text-xs tracking-[0.3em] uppercase mt-8 text-cyan-400/80"
                  >
                      Initiating Secure Handshake...
                  </motion.p>
                  
                  <div className="w-64 h-1 bg-white/10 mt-6 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                        className="h-full bg-cyan-500"
                      />
                  </div>
                  
                  <div className="mt-2 text-[10px] font-mono text-cyan-500/50 flex gap-4">
                    <span>BIO_METRICS: OK</span>
                    <span>NET_SEC: OK</span>
                  </div>
              </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-black p-4 overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_70%)] pointer-events-none" />

      {/* CARD CONTAINER */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-[#0a0a0a] border border-red-900/30 p-1 rounded-3xl shadow-2xl"
      >
        <div className="bg-[#0f0f0f] rounded-[20px] p-8 md:p-10 border border-white/5 relative overflow-hidden">
            
            {/* Top Security Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />
            
            {/* HEADER */}
            <div className="text-center mb-10">
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex p-4 bg-red-500/5 rounded-full text-red-500 mb-6 ring-1 ring-red-500/20 shadow-[0_0_30px_rgba(220,38,38,0.2)]"
                >
                    <ShieldAlert size={32} strokeWidth={1.5} />
                </motion.div>
                
                <h1 className="text-2xl font-black text-white tracking-[0.2em] uppercase mb-2">
                    Restricted Area
                </h1>
                <div className="flex items-center justify-center gap-2 text-[10px] text-red-500/60 font-mono tracking-widest uppercase">
                    <Lock size={10} />
                    AlgoForge Command Console
                </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                
                {/* EMAIL */}
                <div className="group space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-red-500 transition-colors">
                        <Fingerprint size={12} /> Command ID
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="officer@algoforge.space"
                            className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white focus:border-red-500/50 focus:bg-red-900/5 focus:ring-1 focus:ring-red-500/20 outline-none transition-all placeholder:text-white/10 font-mono text-sm tracking-wide pl-12"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-red-500 transition-colors">
                            <ShieldCheck size={18} />
                        </div>
                    </div>
                </div>

                {/* PASSWORD */}
                <div className="group space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-red-500 transition-colors">
                        <KeyRound size={12} /> Access Token
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white focus:border-red-500/50 focus:bg-red-900/5 focus:ring-1 focus:ring-red-500/20 outline-none transition-all placeholder:text-white/10 font-mono text-sm tracking-widest pl-12"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-red-500 transition-colors">
                            <Binary size={18} />
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* ERROR MESSAGE */}
                <AnimatePresence>
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-3 p-3 bg-red-950/30 border border-red-500/30 rounded-lg overflow-hidden"
                        >
                            <ShieldAlert className="text-red-500 shrink-0" size={16} />
                            <p className="text-red-400 text-[10px] font-bold uppercase tracking-wide">
                                {error}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="relative w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all duration-300 flex justify-center items-center gap-3 uppercase tracking-[0.2em] text-xs disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] active:scale-[0.98] group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={16} />
                            Verifying Identity...
                        </>
                    ) : (
                        <>
                            <Lock size={14} />
                            Authorize Access
                        </>
                    )}
                </button>
            </form>
            
            {/* FOOTER DECORATION */}
            <div className="mt-8 pt-6 border-t border-white/5 text-center flex flex-col items-center gap-2">
                <p className="text-[9px] text-white/20 uppercase tracking-widest font-mono">
                    System ID: VTX-SECURE-V9.2 // Encrypted 256-bit
                </p>
                <div className="flex gap-1.5">
                    <div className="w-1 h-1 bg-red-500/20 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-red-500/20 rounded-full animate-pulse delay-75"></div>
                    <div className="w-1 h-1 bg-red-500/20 rounded-full animate-pulse delay-150"></div>
                </div>
            </div>

        </div>
      </motion.div>
    </div>
  );
}
