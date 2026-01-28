"use client";

import { useState } from "react";

export default function Apply({ role }: { role: string }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="mt-10 text-cyan-400 text-lg">
        ✔ Application submitted. Our team will contact you.
      </p>
    );
  }

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-6">
        Apply for this role
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="grid gap-4 max-w-xl"
      >
        <input
          required
          placeholder="Full Name"
          className="bg-black/60 border border-white/10 rounded px-4 py-3 text-white"
        />

        <input
          required
          type="email"
          placeholder="Email"
          className="bg-black/60 border border-white/10 rounded px-4 py-3 text-white"
        />

        <input
          placeholder="LinkedIn / Portfolio URL"
          className="bg-black/60 border border-white/10 rounded px-4 py-3 text-white"
        />

        <input
          placeholder="Resume Upload"
          required
          type="file"
          accept="application/pdf"
          className="bg-black/60 border border-white/10 rounded px-4 py-3 text-white"
        />

        <textarea
          required
          rows={5}
          placeholder={`Why do you want to join Space Gen as a ${role}?`}
          className="bg-black/60 border border-white/10 rounded px-4 py-3 text-white resize-none"
        />

        <button
          type="submit"
          className="mt-4 px-8 py-3 bg-cyan-400 text-black font-bold rounded-full hover:bg-cyan-300"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
