"use client";

import PageLayout from "@/app/components/PageLayout";
import { motion } from "framer-motion";
import { Calendar, MapPin, Rocket, Orbit, Package, Activity, Clock } from "lucide-react";

export default function LaunchSchedule() {
  const launches = [
    {
      id: "AF-TV1",
      mission: "VTVL Suborbital Demo",
      vehicle: "Orbiton Test Article",
      date: "Q3 2028",
      window: "TBD",
      location: "Test Pad Alpha, SDSC",
      orbit: "Suborbital (100km Apogee)",
      payload: "GNC Telemetry & Sensor Suite",
      status: "Hardware Integration",
      statusColor: "text-cyan-400",
      borderColor: "border-cyan-500/30",
      bgAccent: "bg-cyan-500/5",
      isNext: true,
    },
    {
      id: "AF-OFT1",
      mission: "Orbital Flight Test 1",
      vehicle: "AF-33 Medium",
      date: "NET 2030",
      window: "TBD",
      location: "Launch Complex 1, SDSC",
      orbit: "LEO (400km, 51.6°)",
      payload: "Mass Simulator & Flight Data Core",
      status: "In Development",
      statusColor: "text-blue-400",
      borderColor: "border-white/10",
      bgAccent: "bg-transparent",
      isNext: false,
    },
    {
      id: "AF-C01",
      mission: "Commercial Vanguard",
      vehicle: "AF-33 Medium",
      date: "2033",
      window: "TBD",
      location: "Launch Complex 1, SDSC",
      orbit: "SSO (500km, 97.4°)",
      payload: "Commercial Satellite Constellation (1,200 kg)",
      status: "Manifested",
      statusColor: "text-amber-400",
      borderColor: "border-white/10",
      bgAccent: "bg-transparent",
      isNext: false,
    },
    {
      id: "AF-P2P",
      mission: "Point-to-Point Pathfinder",
      vehicle: "AF-60 Heavy",
      date: "2036",
      window: "TBD",
      location: "Orbital Pad Beta, Kulasekharapatnam",
      orbit: "Suborbital Trajectory (Mach 20+)",
      payload: "P2P Cargo/Crew Test Module",
      status: "Conceptual",
      statusColor: "text-white/40",
      borderColor: "border-white/10",
      bgAccent: "bg-transparent",
      isNext: false,
    }
  ];

  return (
    <PageLayout
      title="Launch Manifest"
      subtitle="Upcoming orbital missions and vehicle deployment schedule."
    >
      <div className="max-w-5xl mx-auto mt-12 pb-24">
        
        {/* Header Metadata */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4"
        >
          <div>
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
              Flight Operations
            </p>
            <p className="text-white/40 text-sm">
              Schedule subject to change based on test campaign results and range readiness.
            </p>
          </div>
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg inline-flex items-center gap-2">
             <Activity size={16} className="text-cyan-400" />
             <span className="text-white text-xs font-mono uppercase tracking-widest">Active Manifest</span>
          </div>
        </motion.div>

        {/* Launch Cards */}
        <div className="space-y-8">
          {launches.map((launch, index) => (
            <motion.div
              key={launch.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative overflow-hidden border ${launch.borderColor} ${launch.bgAccent} rounded-3xl p-1`}
            >
              {/* If it's the next launch, add a glowing border effect */}
              {launch.isNext && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent opacity-50 blur-xl pointer-events-none" />
              )}

              <div className="relative bg-[#050505] rounded-[22px] p-6 md:p-8 flex flex-col md:flex-row gap-8">
                
                {/* Left Column: Date & Mission Name */}
                <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-white/10 text-white font-mono text-[10px] uppercase tracking-widest rounded">
                        {launch.id}
                      </span>
                      {launch.isNext && (
                        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 font-mono text-[10px] uppercase tracking-widest rounded border border-cyan-500/30 animate-pulse">
                          Next Flight
                        </span>
                      )}
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
                      {launch.mission}
                    </h2>
                    <p className="text-white/50 text-sm font-light">
                      Vehicle: <span className="text-white font-medium">{launch.vehicle}</span>
                    </p>
                  </div>

                  <div className="mt-8">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar size={16} className="text-cyan-400" />
                      <span className="text-white font-mono text-lg">{launch.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/40">
                      <Clock size={14} />
                      <span className="font-mono text-xs uppercase tracking-widest">Window: {launch.window}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Mission Details */}
                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Status */}
                  <div className="sm:col-span-2 flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Mission Status</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${launch.isNext ? 'bg-cyan-400 animate-pulse' : 'bg-white/20'}`} />
                      <span className={`text-sm font-mono uppercase tracking-wider font-bold ${launch.statusColor}`}>
                        {launch.status}
                      </span>
                    </div>
                  </div>

                  {/* Detail Items */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white/40 mb-1">
                      <MapPin size={14} />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Launch Site</span>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">{launch.location}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white/40 mb-1">
                      <Orbit size={14} />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Target Orbit</span>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">{launch.orbit}</p>
                  </div>

                  <div className="sm:col-span-2 space-y-1 border-t border-white/5 pt-4 mt-2">
                    <div className="flex items-center gap-2 text-white/40 mb-1">
                      <Package size={14} />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Payload Manifest</span>
                    </div>
                    <p className="text-sm text-white font-medium">{launch.payload}</p>
                  </div>

                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-white/30 text-xs font-mono tracking-widest uppercase">
            // MANIFEST SUBJECT TO REGULATORY APPROVAL //
          </p>
        </motion.div>

      </div>
    </PageLayout>
  );
}
