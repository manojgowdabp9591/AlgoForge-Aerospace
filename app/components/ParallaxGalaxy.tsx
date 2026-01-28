"use client";
import { useEffect, useState } from "react";

export default function ParallaxGalaxy() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.3);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
  <div className="fixed inset-0 -z-40 pointer-events-none bg-gradient-to-b from-black via-slate-900 to-black opacity-20"
      style={{ transform: `translateY(${offset}px)` }}
    />
  );
}
