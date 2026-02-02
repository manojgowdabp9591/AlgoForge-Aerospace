"use client";

import { useEffect, useState } from "react";

// Update type to match Mongoose timestamps
type Application = {
  _id: string;
  name: string;
  email: string;
  role: string;
  message: string;
  createdAt: string; // Mongoose timestamps are strings in JSON
};

export default function AdminPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/applications")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setApps(data))
      .catch((err) => console.error(err)) // Catch auth errors
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="px-6 py-32 max-w-6xl mx-auto text-white relative z-10">
      <h1 className="text-4xl font-bold mb-10 flex items-center gap-3">
        <span className="w-3 h-8 bg-cyan-400 rounded-full"></span>
        Mission Control // Applications
      </h1>

      {loading && (
        <div className="text-cyan-400 animate-pulse font-mono">
          Downloading Encrypted Dossiers...
        </div>
      )}

      {!loading && apps.length === 0 && (
        <p className="text-white/40 italic">No incoming transmissions found.</p>
      )}

      <div className="space-y-4">
        {apps.map((app) => (
          <div
            key={app._id}
            className="border border-white/10 p-6 rounded-xl bg-white/5 hover:border-cyan-500/30 transition backdrop-blur-md"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xl font-bold text-white">{app.name}</p>
                <p className="text-sm text-cyan-400 font-mono mb-2">{app.role}</p>
              </div>
              <span className="text-xs text-white/30 font-mono border border-white/10 px-2 py-1 rounded">
                {new Date(app.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="bg-black/40 p-4 rounded border border-white/5">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Mission Statement:</p>
                <p className="text-white/80 italic">"{app.message}"</p>
            </div>
            
            <div className="mt-3 text-xs text-white/40 font-mono">
               CONTACT: {app.email}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}