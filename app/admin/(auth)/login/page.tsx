"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

import { 
  Shield, Terminal, Lock, AlertCircle, 
  ArrowRight, Eye, EyeOff, Loader2, Wifi, Fingerprint 
} from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push(data.redirectTo); 
      } else {
        setError(data.message || "AUTHENTICATION_FAILED");
        triggerShake();
      }
    } catch (err) {
      setError("UPLINK_DISCONNECTED");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  // --- ANIMATION VARIANTS ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const shakeAnimation = {
    x: shake ? [-10, 10, -10, 10, -5, 5, 0] : 0,
    transition: { duration: 0.4 }
  };

  return (
    <div className="min-h-screen bg-[#030305] flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* --- BACKGROUND ATMOSPHERE --- */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030305_100%)] pointer-events-none" />

      {/* Animated glowing orb in background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/40 rounded-full blur-[150px] pointer-events-none" 
      />

      {/* --- TOP HUD INDICATORS --- */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none opacity-60">
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-cyan-500 font-mono text-[10px] uppercase tracking-widest">
                <Wifi size={12} className="animate-pulse" /> Uplink Active
            </div>
            <div className="text-white/30 font-mono text-[9px] uppercase tracking-widest pl-5">
                Latency: 24ms
            </div>
        </div>
        <div className="text-right flex flex-col items-end gap-1">
             <div className="flex items-center gap-2 text-emerald-500 font-mono text-[10px] uppercase tracking-widest">
                <Lock size={12} /> 256-bit Encrypted
            </div>
            <div className="text-white/30 font-mono text-[9px] uppercase tracking-widest pr-5">
                VORTEX OS v3.1.4
            </div>
        </div>
      </div>

      {/* --- LOGIN CARD --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1, ...shakeAnimation }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#0a0a0f]/90 backdrop-blur-2xl border border-white/5 p-8 sm:p-10 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.07)] relative overflow-hidden group">
          
          {/* Holographic Scan Line (Loops infinitely) */}
          <motion.div 
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent blur-[1px] opacity-50 z-50 pointer-events-none" 
          />

          {/* HUD Corner Brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-3xl transition-colors group-hover:border-cyan-500/60" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-3xl transition-colors group-hover:border-cyan-500/60" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-3xl transition-colors group-hover:border-cyan-500/60" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 rounded-br-3xl transition-colors group-hover:border-cyan-500/60" />

          {/* --- HEADER --- */}
          <div className="flex flex-col items-center mb-10 mt-2">
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative mb-6"
            >
              <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-30 rounded-full" />
              <div className="relative z-10 p-4 bg-[#050508] border border-white/10 rounded-2xl shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]">
                <Shield className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" size={42} />
              </div>
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter mb-2 drop-shadow-lg">
              VORTEX <span className="text-cyan-500">COMMAND</span>
            </h1>
            <div className="flex items-center gap-2 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                <p className="text-[9px] font-mono tracking-[0.25em] text-cyan-300 font-bold uppercase">
                Awaiting Clearance
                </p>
            </div>
          </div>

          {/* --- FORM --- */}
          <motion.form 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            onSubmit={handleLogin} 
            className="space-y-5"
          >
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: -10 }} 
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  className="overflow-hidden"
                >
                  <div className="bg-red-950/40 border border-red-500/50 p-3.5 rounded-xl flex items-center gap-3 mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(220,38,38,0.15)] relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 animate-pulse" />
                    <AlertCircle className="text-red-500 shrink-0" size={18} />
                    <span className="text-red-400 text-xs font-mono font-bold uppercase tracking-wider">{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              
              {/* Username Input */}
              <motion.div variants={itemVariants} className="relative group/input">
                {/* Active Focus Indicator Line */}
                <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-cyan-500 rounded-r-full scale-y-0 group-focus-within/input:scale-y-100 transition-transform duration-300 origin-center z-20" />
                
                <div className="relative">
                    <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-cyan-400 transition-colors duration-300 z-10" size={18} />
                    <input
                        type="text"
                        placeholder="OPERATIVE_ID"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-[#050508]/80 border border-white/5 focus:border-cyan-500/40 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 font-mono text-sm outline-none transition-all shadow-inner focus:bg-white/[0.03] focus:shadow-[0_0_20px_rgba(6,182,212,0.05)] relative z-0"
                    />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div variants={itemVariants} className="relative group/input">

                {/* Active Focus Indicator Line */}
                <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-cyan-500 rounded-r-full scale-y-0 group-focus-within/input:scale-y-100 transition-transform duration-300 origin-center z-20" />
                
                <div className="relative flex items-center">
                    <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-cyan-400 transition-colors duration-300 z-10" size={18} />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="AUTHORIZATION_CODE"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#050508]/80 border border-white/5 focus:border-cyan-500/40 rounded-xl py-4 pl-12 pr-14 text-white placeholder:text-white/20 font-mono text-sm outline-none transition-all shadow-inner focus:bg-white/[0.03] focus:shadow-[0_0_20px_rgba(6,182,212,0.05)] relative z-0"
                    />
                    
                    {/* ENHANCED EYE BUTTON */}
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-black hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200 z-10 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                        title={showPassword ? "Hide Password" : "Show Password"}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-4">
                <button
                type="submit"
                disabled={loading}
                className="relative w-full group overflow-hidden rounded-xl p-[1px] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                {/* Button Animated Border */}
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 bg-[length:200%_auto] animate-[gradient_2s_linear_infinite] opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Button Inner */}
                <div className="relative bg-[#050508] px-4 py-4 rounded-xl flex items-center justify-center gap-3 group-hover:bg-transparent transition-colors duration-500">
                    {loading ? (
                        <>
                            <Loader2 size={18} className="text-cyan-400 animate-spin" />
                            <span className="text-white font-bold tracking-widest text-sm uppercase">
                                Establishing Uplink...
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="text-white font-black tracking-widest text-sm uppercase drop-shadow-md">
                                Authenticate Profile
                            </span>
                            <ArrowRight size={18} className="text-cyan-400 group-hover:text-white group-hover:translate-x-1.5 transition-all" />
                        </>
                    )}
                </div>
                </button>
            </motion.div>

          </motion.form>

        </div>
        
        {/* Footer security text */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 flex flex-col items-center justify-center gap-2"
        >
            <div className="h-[1px] w-12 bg-white/10" />
            <p className="text-[9px] font-mono tracking-widest text-white/30 uppercase text-center">
              Restricted Aerospace Infrastructure<br/>
              <span className="text-white/20">UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED</span>
            </p>
        </motion.div>

      </motion.div>
    </div>
  );
}