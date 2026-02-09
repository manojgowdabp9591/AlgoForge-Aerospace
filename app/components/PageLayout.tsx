"use client";

import Galaxy from "./Galaxy";
import Navbar from "./Navbar";

export default function PageLayout({
  title,
  subtitle,
  children,
}: {
  title: React.ReactNode; // ✅ FIXED
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen text-white">
      {/* Background */}
      <Galaxy />

      {/* Content */}
      <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Page Content */}
        <div className="text-white/80">{children}</div>
      </main>

      <Navbar />
    </div>
  );
}
