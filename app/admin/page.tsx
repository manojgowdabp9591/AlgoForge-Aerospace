// app/admin/page.tsx

import { applications } from "@/app/lib/store";

export default function AdminPage() {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-32 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Applications</h1>

      {applications.length === 0 && (
        <p className="text-white/60">No applications yet.</p>
      )}

      {applications.map((a, i) => (
        <div
          key={i}
          className="border border-white/10 p-6 rounded-xl mb-4 bg-white/5"
        >
          <p><b>Name:</b> {a.name}</p>
          <p><b>Email:</b> {a.email}</p>
          <p><b>Role:</b> {a.role}</p>
          <p className="mt-2 text-white/80">{a.message}</p>
          <p className="text-white/40 text-sm mt-2">{a.time}</p>
        </div>
      ))}
    </div>
  );
}
