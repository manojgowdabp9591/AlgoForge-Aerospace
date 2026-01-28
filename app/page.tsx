"use client";

import Rocket3D from "./components/Rocket3D";
import EarthOrbit from "./components/EarthOrbit";
import Metrics from "./components/Metrics";
import Hero from "./components/Hero";
import TechSpec from "./components/TechSpec";
import LaunchNetwork from "./components/LaunchNetwork";
import { Instagram, Twitter, Facebook, Youtube, } from "lucide-react";

export default function Home() {
  return (
    <div className="relative z-10 inset-0 text-white overflow-x-hidden">

      {/* HERO */}
      <Hero />
      
      {/* TECHNOLOGY SPECIFICATIONS */}
      <TechSpec />

      {/* INVESTOR METRICS */}
      <Metrics />

      {/* LAUNCH NETWORK */}
      <LaunchNetwork />

      {/* MISSION */}
      <section id="mission" className="py-32 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Democratizing the Cosmos
        </h2>

        <h3 className="text-xl md:text-2xl text-cyan-400 mb-6">
          We are building the bridge to the future of humanity in space.
        </h3>

        <p className="text-white/80 text-lg leading-relaxed max-w-4xl">
          At Space Gen, we believe that space is not just a destination for governments,
          but a domain for human expansion. Our mission is to dismantle the cost barriers
          to orbit through fully reusable launch architectures.
        </p>

        <p className="text-white/80 text-lg leading-relaxed mt-6 max-w-4xl">
          By turning rockets into reliable, aircraft-like transport, we are enabling a
          new era of connectivity, exploration, and discovery. We don’t just launch
          satellites; we launch dreams.
        </p>
      </section>

      {/* TECHNOLOGY */}
      {/* CHANGED: semi-transparent black for readability */}
      <section id="tech" className="py-32 bg-transparent px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">
            Reusability Is Evolution
          </h2>

          <p className="text-center text-cyan-400 text-xl mb-16">
            Flight-proven hardware. Rapid turnaround. Unmatched reliability.
          </p>

      <div className="grid md:grid-cols-2 gap-10">
      
      <TechBlock
        title="Vertical Landing Capability"
        text="Unlike traditional expendable rockets that burn up in the atmosphere,
        Space Gen vehicles are designed to return home. Our proprietary guidance
        algorithms and landing legs allow for pinpoint precision landings on both
        land and sea."
      />

      <TechBlock
        title="The Gen-1 Engine"
        text="Powered by clean-burning liquid propellant, our in-house engines are
        built for durability and extreme thermal resilience, enabling minimal
        refurbishment between flights."
      />

      <TechBlock
        title="Composite Structure"
        text="We utilize advanced carbon-composite materials to reduce vehicle mass
        without compromising structural integrity, maximizing payload capacity
        to orbit."
      />

      <TechBlock
        title="Rapid Reflight"
        text="Our goal is not just recovery, but rapid reuse. By designing for
        maintenance-friendly operations, we aim to reduce turnaround time from
        months to days."
          />
        </div>
      </div>
      </section>


      {/* ROADMAP */}
      <section id="roadmap" className="py-32 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-10">Roadmap</h2>
        <Roadmap year="2028" text="Prototype Engine Testing" />
        <Roadmap year="2030" text="Suborbital Demonstration Vehicle" />
        <Roadmap year="2032" text="Commercial Orbital Launch Capability" />
      </section>


      {/* FOOTER */}
    <footer className="border-t border-white/10 bg-black/80 backdrop-blur-md text-white/60">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* CONTACT SUPPORT */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm">
            Contact Support:&nbsp;
            <a
              href="mailto:support@spacegen.com"
              className="text-cyan-400 hover:underline"
            >
              support@spacegen.com
            </a>
          </p>

          {/* SOCIAL MEDIA */}
          <div className="flex gap-5">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
              aria-label="X"
            >
              <Twitter size={20} />
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>

            <a
              href="https://www.youtube.com/@"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-xs text-white/40">
          © 2026 Space Gen — Orbital Launch Systems

        <p className="text-xs text-white/40 mt-2">
          Privacy · Terms · Security
        </p>
        </div>

      </div>
    </footer>
    </div>
  );
}

/* ================== COMPONENTS ================== */

function Roadmap({ year, text }: any) {
  return (
    <div className="border-l border-cyan-400 pl-6 mb-8">
      <h3 className="text-cyan-400 font-bold text-lg">{year}</h3>
      <p className="text-white/80">{text}</p>
    </div>
  );
}

function TechBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-cyan-400 transition">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-white/70 leading-relaxed">{text}</p>
    </div>
  );
}