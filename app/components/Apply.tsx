"use client";

import { useState } from "react";

export default function Apply({ role }: { role: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // 1. Get data from the form
    const formData = new FormData(e.currentTarget);
    
    // 2. Convert to JSON object
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      role: role, // Add the role automatically
    };

    try {
      // 3. Send as JSON
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Transmission failed. Please try again.");
      }
    } catch (err) {
      alert("Error connecting to server.");
    }
    
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="mt-16 p-8 border border-cyan-500/30 bg-cyan-500/10 rounded-xl text-center animate-pulse">
        <h3 className="text-2xl text-cyan-400 font-bold mb-2">✓ Transmission Received</h3>
        <p className="text-white/70">Stand by for communication from Mission Control.</p>
      </div>
    );
  }

  return (
    <div className="mt-16 max-w-xl">
      <h2 className="text-3xl font-bold mb-6 border-l-4 border-cyan-500 pl-4">
        Apply for Mission: <span className="text-cyan-400">{role}</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-white/60 mb-1">Full Name</label>
          <input 
            name="name" 
            required 
            type="text" 
            className="w-full bg-white/5 border border-white/10 p-3 rounded text-white focus:border-cyan-500 outline-none transition"
            placeholder="Astronaut Name"
          />
        </div>
        
        <div>
          <label className="block text-sm text-white/60 mb-1">Email Coordinates</label>
          <input 
            name="email" 
            required 
            type="email" 
            className="w-full bg-white/5 border border-white/10 p-3 rounded text-white focus:border-cyan-500 outline-none transition"
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-1">Mission Statement</label>
          <textarea
            name="message"
            required
            rows={4}
            className="w-full bg-white/5 border border-white/10 p-3 rounded text-white focus:border-cyan-500 outline-none transition resize-none"
            placeholder={`Why are you the right fit for the ${role} position?`}
          />
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-cyan-400 hover:scale-105 transition-all w-full disabled:opacity-50"
        >
          {loading ? "Transmitting..." : "Initiate Application"}
        </button>
      </form>
    </div>
  );
}