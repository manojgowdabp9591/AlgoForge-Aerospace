import { applications } from "@/app/lib/store";

export default function AdminPage() {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-32 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Applications</h1>

      {applications.length === 0 && (
        <p className="text-white/60">No applications yet.</p>
      )}

      {applications.map((a, i) => (
        <div key={i} className="border border-white/10 p-4 rounded mb-4">
          <p><b>Name:</b> {a.name}</p>
          <p><b>Email:</b> {a.email}</p>
          <p><b>Role:</b> {a.role}</p>
          <p className="text-white/40 text-sm">{a.time}</p>
        </div>
      ))}
    </div>
  );
}
