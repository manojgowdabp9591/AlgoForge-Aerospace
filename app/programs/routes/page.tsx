"use client";

import { motion } from "framer-motion";
import { Clock, Globe2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { GLOBAL_ROUTES } from "../../lib/globalRoutes";
import Navbar from "@/app/components/Navbar";

export default function RoutesPage() {
  return (
    <>
        <Navbar />
    <section className="relative py-32 px-6 max-w-7xl mx-auto text-white">
      {/* ================= HEADER ================= */}
      <div className="relative text-center mb-24">
        <h1 className="text-cyan-400 text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Global Conceptual Routes
        </h1>
        <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
          A global overview of conceptual suborbital point-to-point routes
          derived from reusable launch system capabilities.
        </p>
      </div>

      {/* ================= ROUTE GRID ================= */}
      <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {GLOBAL_ROUTES.map((route, i) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
            className="relative group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-cyan-500/30 transition-all"
          >
            {/* Route Header */}
            <div className="relative flex items-center justify-between mb-6">
              <div className="relative flex items-center gap-3">
                <Globe2 className="text-cyan-400" size={18} />
                <h3 className="text-xl font-semibold tracking-wider">
                  {route.fromCode}{" "}
                  <span className="text-white/40 mx-1">→</span>{" "}
                  {route.toCode}
                </h3>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/20">
                {route.trajectoryType}
              </span>
            </div>

            {/* Cities */}
            <div className="relative text-white/70 text-sm leading-relaxed mb-4">
              {route.fromCity}, {route.fromCountry}
              <br />
              {route.toCity}, {route.toCountry}
            </div>

            {/* Metrics */}
            <div className="relative flex items-center justify-between pt-4 border-t border-white/10 mt-4">
              <div className="relative flex items-center gap-2 text-white/80">
                <Clock size={16} />
                <span className="font-mono text-sm">
                  ~{route.estimatedTimeMin} min
                </span>
              </div>

              <span className="text-white/40 text-xs uppercase tracking-widest">
                {route.altitudeClass.replace("_", " ")}
              </span>
            </div>

            {/* Notes */}
            <p className="relative text-white/40 text-xs leading-relaxed mt-4">
              {route.notes}
            </p>

            {/* Hover affordance */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-cyan-500/30 transition-all pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* ================= FOOTER DISCLAIMER ================= */}
      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-white/40 text-sm leading-relaxed mb-10">
          All routes displayed on this page are conceptual and non-commercial.
          Durations, trajectories, and profiles are illustrative only and do not
          represent operational services, schedules, or availability.
        </p>

        <Link
          href="/programs/point-to-point"
          className="inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold uppercase tracking-widest hover:text-white transition-colors"
        >
          Back to P2P overview
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
    </>
  );
}
