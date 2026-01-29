"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError("Invalid admin credentials");
      setLoading(false);
      return;
    }

    // JWT cookie is set by backend
    router.push("/admin");
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-widest text-cyan-400">
            ADMIN ACCESS
          </h1>
          <p className="text-white/50 text-sm mt-2">
            Space Gen Internal Systems
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm text-white/60 block mb-1">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@spacegen.com"
              className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          <div>
            <label className="text-sm text-white/60 block mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 rounded-full bg-cyan-400 text-black font-bold tracking-widest hover:bg-cyan-300 transition disabled:opacity-50"
          >
            {loading ? "AUTHENTICATING..." : "LOGIN"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-white/30 text-center mt-6">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
