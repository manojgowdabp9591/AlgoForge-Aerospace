"use client";

import { useEffect, useRef } from "react";

export default function ParallaxGalaxy() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const offset = window.scrollY * 0.25; // slightly calmer than 0.3
        if (layerRef.current) {
          layerRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className="fixed inset-0 -z-40 pointer-events-none
                 bg-gradient-to-b from-black via-slate-900 to-black
                 opacity-20 will-change-transform"
    />
  );
}
