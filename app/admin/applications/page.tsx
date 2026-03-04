"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../layout"; 
import { 
  RefreshCw, Search, Trash2, Mail, FileText, Lock, 
  Inbox, WifiOff, Activity, User, Calendar, Shield, 
  Terminal, AlertCircle, Clock, ChevronRight 
} from "lucide-react"; 
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced Data Shape
type Application = {
  _id: string;
  name: string;
  email: string;
  role: string;
  message: string;
  createdAt: string;
  status?: "pending" | "reviewed" | "rejected"; // Added for UI simulation
};

export default function AdminPage() {
  const router = useRouter();
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); 
  
  // Fake "Status" assignment for visual variety since DB might not have it yet
  const assignRandomStatus = (data: any[]) => {
    return data.map(app => ({
      ...app,
      status: ["pending", "pending", "reviewed"].sort(() => 0.5 - Math.random())[0]
    }));
  };

  async function fetchApplications() {
    setLoading(true);
    setErrorMsg(""); 

    try {
      // Simulate network delay for the "scanning" effect
      await new Promise(r => setTimeout(r, 800));

      const res = await fetch("/api/admin/applications", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 401) throw new Error("UNAUTHORIZED_ACCESS");
      if (!res.ok) throw new Error(`SERVER_FAULT_${res.status}`);

      const data = await res.json();
      setApps(assignRandomStatus(data));
    } catch (err: any) {
      console.error("Fetch Error:", err);
      setErrorMsg(err.message || "DATA_LINK_FAILURE");
      if(err.message === "UNAUTHORIZED_ACCESS") setTimeout(() => router.push("/admin/login"), 2000);
    } finally {
      setLoading(false);
    }
  }

  // Optimistic Delete Handler
  const handleDelete = async (id: string) => {
    if(!confirm("CONFIRM DELETION: This action cannot be undone.")) return;
    
    // 1. Optimistic UI update (remove immediately)
    setApps(prev => prev.filter(app => app._id !== id));

    // 2. Background API Call (Mocked here, replace with real endpoint)
    try {
        // await fetch(`/api/admin/applications/${id}`, { method: 'DELETE' });
        console.log(`Deleted dossier ${id}`);
    } catch (error) {
        alert("Deletion failed via uplink.");
        fetchApplications(); // Revert on fail
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApps = apps.filter(app => 
    (app.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || 
    (app.role?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="relative min-h-screen p-6 md:p-10 max-w-7xl mx-auto overflow-hidden">
        
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 space-y-10">
            
            {/* --- HEADER HUD --- */}
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-cyan-500/20 pb-6"
            >
              <div>
                <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-4 tracking-tighter">
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-50" />
                    <Activity className="relative z-10 text-cyan-400" size={32} />
                  </div>
                  VORTEX <span className="text-cyan-500">COMMAND</span>
                </h1>
                <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.2em] text-cyan-500/60 uppercase">
                  <span className="flex items-center gap-2"><Shield size={10} /> SECURE_UPLINK_ESTABLISHED</span>
                  <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" />
                  <span>v2.4.0-ADMIN</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                 <div className="hidden md:flex flex-col items-end mr-4">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">System Load</span>
                    <div className="w-32 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: "45%" }} 
                            className="h-full bg-cyan-500" 
                        />
                    </div>
                 </div>
                 
                 <button 
                   onClick={fetchApplications}
                   className="group relative p-3 rounded-xl border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-500/20 transition-all overflow-hidden"
                 >
                   <div className="absolute inset-0 bg-cyan-400/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                   <RefreshCw size={20} className={`text-cyan-400 relative z-10 transition-all duration-700 ${loading ? "animate-spin" : "group-hover:rotate-180"}`} />
                 </button>
              </div>
            </motion.div>

            {/* --- ERROR TERMINAL --- */}
            <AnimatePresence>
                {errorMsg && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div className="bg-red-950/30 border border-red-500/50 p-6 rounded-2xl flex items-start gap-4 backdrop-blur-md">
                        <AlertCircle className="text-red-500 shrink-0 animate-pulse" size={24} />
                        <div className="flex-1">
                            <h3 className="text-red-400 font-bold tracking-widest uppercase mb-1">Connection Failure</h3>
                            <p className="text-red-400/60 font-mono text-xs">{errorMsg}</p>
                        </div>
                        <button onClick={() => router.push("/admin/login")} className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold rounded uppercase tracking-wider transition">
                            Re-Authenticate
                        </button>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>

            {/* --- SEARCH BAR --- */}
            {!errorMsg && (
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                    <div className="relative flex items-center gap-4 bg-[#0a0a0f] p-4 rounded-xl border border-white/10">
                        <Terminal className="text-cyan-500/50" size={20} />
                        <input 
                            type="text"
                            placeholder="QUERY_DATABASE: Enter Personnel Name or Role ID..."
                            className="bg-transparent border-none focus:ring-0 text-white w-full placeholder:text-white/20 font-mono text-sm tracking-wide outline-none h-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="text-[10px] font-mono text-white/20 border border-white/10 px-2 py-1 rounded">
                            {filteredApps.length} RECORDS FOUND
                        </div>
                    </div>
                </div>
            )}

            {/* --- DATA GRID --- */}
            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-48 bg-white/5 rounded-2xl animate-pulse border border-white/5" />
                    ))}
                </div>
            ) : filteredApps.length === 0 && !errorMsg ? (
                <div className="flex flex-col items-center justify-center py-24 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                    <Inbox size={48} className="text-white/20 mb-4" />
                    <p className="text-white/40 font-mono text-sm uppercase tracking-widest">No Data Packets Found</p>
                </div>
            ) : (
                <motion.div 
                    layout 
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20"
                >
                    <AnimatePresence>
                    {filteredApps.map((app, i) => (
                        <DossierCard key={app._id} data={app} index={i} onDelete={() => handleDelete(app._id)} />
                    ))}
                    </AnimatePresence>
                </motion.div>
            )}

        </div>
      </div>
    </AdminLayout>
  );
}

// --- SUB-COMPONENT: DOSSIER CARD ---

function DossierCard({ data, index, onDelete }: { data: Application, index: number, onDelete: () => void }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative bg-[#0d0d12] border border-white/10 hover:border-cyan-500/50 p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] flex flex-col"
        >
            {/* Card Header */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${data.status === 'reviewed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
                        <User size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-cyan-400 transition-colors">
                            {data.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono text-white/40 uppercase bg-white/5 px-1.5 rounded">
                                {data.role}
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Time Ago (Mock logic) */}
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/30 bg-black px-2 py-1 rounded border border-white/10">
                    <Clock size={10} />
                    <span>
                        {new Date(data.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>

            {/* Message Body */}
            <div className="relative mb-6 flex-grow bg-white/[0.02] p-4 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-white/10 group-hover:bg-cyan-500/50 transition-colors rounded-l-xl" />
                <p className="text-sm text-white/70 font-light leading-relaxed line-clamp-3 italic">
                    "{data.message}"
                </p>
            </div>

            {/* Footer / Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                <a 
                    href={`mailto:${data.email}`}
                    className="flex items-center gap-2 text-xs font-bold text-white/60 hover:text-white bg-white/5 hover:bg-cyan-500 hover:border-cyan-400 border border-transparent px-4 py-2 rounded-lg transition-all"
                >
                    <Mail size={14} /> 
                    <span className="uppercase tracking-wider">Contact</span>
                </a>

                <button 
                    onClick={onDelete}
                    className="p-2 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Delete Record"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 border-t border-r border-cyan-500" />
            </div>
        </motion.div>
    )
}
