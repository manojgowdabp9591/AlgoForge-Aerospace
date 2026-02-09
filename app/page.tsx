"use client";

import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import TechSpec from "./components/TechSpec";
import LaunchNetwork from "./components/LaunchNetwork";
import Partners from "./components/Partners";
import HolographicCard from "./components/HolographicCard";
import Navbar from "./components/Navbar";
import { Zap, RefreshCw, ShieldCheck, Crosshair, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative z-10 inset-0 text-white overflow-x-hidden bg-transparent selection:bg-cyan-500/30 selection:text-cyan-100">
      {/* NAVIGATION */}
      <Navbar />

      {/* HERO */}
      <Hero />

      {/* TRUST SIGNALS */}
      <Partners />

      {/* VEHICLE OVERVIEW */}
      <TechSpec />

      {/* KEY METRICS */}
      <Metrics />

      {/* MISSION */}
      <section
        id="mission"
        className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5 relative"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
              Expanding Access
              <br />
              Beyond <span className="text-cyan-500">Earth Orbit</span>
            </h2>
            <div className="w-20 h-1 bg-cyan-500 mb-8" />
          </div>

          <div>
            <h3 className="text-lg md:text-xl text-cyan-400 mb-6 font-semibold tracking-wide">
              Building infrastructure for the next phase of space operations
            </h3>

            <p className="text-white/70 text-base md:text-lg leading-relaxed font-light mb-6">
              <strong className="text-white">Vortex Aerospace</strong> is an
              engineering-led launch company focused on reducing the cost and
              complexity of orbital access. Existing launch systems are
              constrained by low reuse, long turnaround times, and limited
              responsiveness.
            </p>

            <p className="text-white/70 text-base md:text-lg leading-relaxed font-light mb-8">
              Our approach combines reusable vehicle architecture with
              pressure-gain combustion through rotary detonation propulsion,
              enabling faster launch readiness and scalable operations.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-cyan-400 font-semibold uppercase tracking-widest hover:text-white transition-colors group"
            >
              Learn more about the team
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section
        id="tech"
        className="py-32 relative px-6 bg-transparent border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Reusability as a{" "}
              <span className="text-cyan-500">System</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Designed from the ground up for rapid recovery, inspection, and
              reflight.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HolographicCard
              title="Precision Landing"
              icon={Crosshair}
              text="Autonomous guidance and control systems designed for meter-level landing accuracy and rapid recovery."
            />
            <HolographicCard
              title="Rotary Detonation Propulsion"
              icon={Zap}
              text="Pressure-gain combustion architecture enabling higher efficiency, deep throttling, and multiple restarts."
            />
            <HolographicCard
              title="Lightweight Structures"
              icon={ShieldCheck}
              text="Composite tankage and load-bearing structures optimized for mass efficiency and reuse cycles."
            />
            <HolographicCard
              title="Rapid Turnaround"
              icon={RefreshCw}
              text="Vehicle systems designed for aircraft-like servicing and launch readiness within 24 hours."
            />
          </div>
        </div>
      </section>

      {/* LAUNCH NETWORK */}
      <LaunchNetwork />

      {/* ROADMAP */}
      <section id="roadmap" className="py-32 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
            Development Roadmap
          </h2>
          <p className="text-white/50">
            Engineering milestones toward operational launch capability
          </p>
        </div>

        <div className="space-y-12 border-l-2 border-white/10 pl-8 relative ml-4 md:ml-0">
          <RoadmapItem
            year="2026"
            title="VORTEX-1 Engine Static Fire"
            desc="Full-duration ground testing of a flight-weight rotary detonation propulsion system."
            status="complete"
          />
          <RoadmapItem
            year="2027"
            title="Suborbital VTVL Demonstration"
            desc="Low-altitude flight testing to validate guidance, navigation, control, and landing systems."
            status="active"
          />
          <RoadmapItem
            year="2028"
            title="Orbiton-1 First Orbital Attempt"
            desc="Initial orbital launch demonstration with payload delivery to low Earth orbit."
            status="pending"
          />
          <RoadmapItem
            year="2030"
            title="Commercial Launch Operations"
            desc="Scaled launch cadence with rapid turnaround and operational reusability."
            status="pending"
          />
        </div>
      </section>
    </div>
  );
}

/* ================= ROADMAP ITEM ================= */

function RoadmapItem({
  year,
  title,
  desc,
  status,
}: {
  year: string;
  title: string;
  desc: string;
  status: "complete" | "active" | "pending";
}) {
  let dotColor = "bg-white/20";
  let glow = "";

  if (status === "complete") {
    dotColor = "bg-cyan-500";
    glow = "shadow-[0_0_15px_#22d3ee]";
  } else if (status === "active") {
    dotColor = "bg-white";
    glow = "shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse";
  }

  return (
    <div className="relative group">
      <div
        className={`absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-black ${dotColor} ${glow}`}
      />
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
        <h3 className="text-2xl md:text-3xl font-bold font-mono text-white/80">
          {year}
        </h3>
        <div>
          <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
            {title}
          </h4>
          <p className="text-white/60 text-sm mt-2 max-w-lg font-light leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
