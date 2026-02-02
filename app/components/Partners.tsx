"use client";

export default function Partners() {
  const partners = [
    "ISRO", "NASA", "ESA", "SPACEX", "BOEING", "AIRBUS"
  ];

  return (
    <section className="py-12 border-y border-white/10 bg-black relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-bold tracking-[0.3em] text-cyan-500 mb-10 uppercase opacity-90">
          Trusted by Industry Leaders
        </p>
        
        {/* REMOVED 'opacity-50' so they are actually visible now */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 grayscale">
          {partners.map((partner) => (
            <span 
              key={partner} 
              // CHANGED: text-white/40 -> text-white/80 (Much brighter)
              className="text-2xl md:text-3xl font-black text-white/80 hover:text-cyan-400 hover:scale-105 transition-all duration-300 cursor-default select-none"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}