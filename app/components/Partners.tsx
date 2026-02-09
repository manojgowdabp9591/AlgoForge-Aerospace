"use client";

import Link from "next/link";

export default function Partners() {
  // 1. Updated data structure to include URLs
  const partners = [
    { name: "ISRO", url: "https://www.isro.gov.in" },
    { name: "NASA", url: "https://www.nasa.gov" },
    { name: "ESA", url: "https://www.esa.int" },
    { name: "SPACEX", url: "https://www.spacex.com" },
    { name: "BOEING", url: "https://www.boeing.com" },
    { name: "AIRBUS", url: "https://www.airbus.com" }
  ];

  return (
    <section className="py-0 border-y border-white/10 bg-transparent relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-bold tracking-[0.3em] text-cyan-500 mb-10 uppercase opacity-90">
          Trusted by Industry Leaders
        </p>
      
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 grayscale">
          {partners.map((partner) => (
            <Link
              key={partner.name}
              href={partner.url}
              target="_blank" // Opens in a new tab
              rel="noopener noreferrer" // Security best practice for external links
              className="text-2xl md:text-3xl font-black text-white/80 hover:text-cyan-400 hover:scale-105 transition-all duration-300 cursor-pointer select-none no-underline"
            >
              {partner.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}