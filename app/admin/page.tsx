"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/applications")
      .then(res => res.json())
      .then(setApps);
  }, []);

  return (
    <div className="px-6 py-32 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Applications</h1>

      {apps.map(a => (
        <div key={a._id} className="border p-4 rounded mb-4">
          <p><b>{a.name}</b> — {a.role}</p>
          <p>{a.email}</p>
          <p className="text-white/70">{a.message}</p>
          <p className="text-cyan-400 text-sm">{a.status}</p>
        </div>
      ))}
    </div>
  );
}
