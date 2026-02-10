"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";

export default function Divisions() {
  return (
    <>
      <Navbar />

      <section className="py-32 px-6 max-w-7xl mx-auto text-white">

        {/* HEADER */}
        <div className="mb-24 text-center">
          <h1 className="text-4xl text-cyan-400 md:text-5xl font-extrabold tracking-tight mb-6">
            Programs
          </h1>
          <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
            Vortex Aerospace develops a unified family of reusable launch systems
            designed to support orbital missions today and advanced suborbital
            applications in the future.
          </p>
        </div>

        {/* PROGRAM GRID */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* ORBITAL LAUNCH */}
          <div className="relative border border-white/10 rounded-xl p-8 bg-white/[0.02] backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
            <h2 className="text-2xl font-bold mb-4">
              Orbital Launch Systems
            </h2>
            <div className="w-12 h-1 bg-cyan-500 mb-6" />
            <p className="text-white/70 leading-relaxed mb-6">
              Orbital launch services form the core of Vortex Aerospace’s mission.
              Our reusable launch vehicles are engineered for responsive, cost-
              efficient deployment of payloads to low Earth orbit.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              Primary focus · Operational priority · Commercial deployment
            </p>
          </div>

          {/* HUMAN SUBORBITAL */}
          <div className="relative border border-white/10 rounded-xl p-8 bg-white/[0.02] backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
            <h2 className="text-2xl font-bold mb-4">
              Human Suborbital Spaceflight
            </h2>
            <div className="w-12 h-1 bg-cyan-500 mb-6" />
            <p className="text-white/70 leading-relaxed mb-6">
              Human suborbital flight is a secondary capability derived directly
              from the same reusable launch architecture developed for orbital
              missions. These flights validate human-rated systems and operations.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              Derived capability · Validation-focused · Limited operations
            </p>
          </div>

          {/* POINT TO POINT */}
          <div className="relative border border-white/10 rounded-xl p-8 bg-white/[0.02] backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
            <h2 className="text-2xl font-bold mb-4">
              Point-to-Point Earth Travel{" "}
              <span className="text-white/40 text-base">(Future)</span>
            </h2>
            <div className="w-12 h-1 bg-cyan-500 mb-6" />
            <p className="text-white/70 leading-relaxed mb-6">
              Point-to-point Earth travel represents a long-term application of
              mature, human-rated suborbital systems. The program explores
              time-critical global transport using suborbital trajectories.
            </p>

            {/* LINK TO DERIVED PAGE */}
            <Link
              href="/programs/point-to-point"
              className="inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold uppercase tracking-widest hover:text-white transition-colors group"
            >
              Explore concept
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* FOOTNOTE */}
        <div className="mt-24 max-w-4xl mx-auto text-center">
          <p className="text-white/40 text-sm leading-relaxed">
            All programs are developed using a shared propulsion, guidance,
            thermal protection, and recovery architecture. Operational readiness
            and regulatory alignment determine the progression between programs.
          </p>
        </div>
      </section>
    </>
  );
}