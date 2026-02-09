"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle2,
  Loader2,
  User,
  Mail,
  FileText,
  ShieldCheck,
  Upload,
} from "lucide-react";

export default function Apply({ role }: { role: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: formData, // send multipart form data (supports file upload)
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch {
      alert("Network error. Please check your connection and retry.");
    }

    setLoading(false);
  }

  if (submitted) {
    const refId = `VTX-${Math.floor(Math.random() * 100000)}`;

    return (
      <div className="mt-16 p-10 border border-green-500/30 bg-green-900/10 rounded-2xl text-center backdrop-blur-md">
        <div className="inline-flex p-4 bg-green-500/10 rounded-full text-green-400 mb-6 ring-1 ring-green-500/30">
          <CheckCircle2 size={44} strokeWidth={1.5} />
        </div>

        <h3 className="text-xl text-white font-semibold mb-3">
          Application received
        </h3>

        <p className="text-white/60 max-w-sm mx-auto text-sm leading-relaxed">
          Thank you for your interest in joining Vortex Aerospace. Your
          application has been securely received and will be reviewed by our
          engineering team.
        </p>

        <p className="mt-4 text-[10px] font-mono text-green-400 tracking-widest">
          Reference ID: {refId}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16 space-y-14">
      {/* WHY WORK HERE */}
      <section className="max-w-3xl">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Why work at Vortex Aerospace
        </h2>

        <ul className="space-y-3 text-white/70 text-sm leading-relaxed">
          <li>
            • You will work on real propulsion hardware, not slide decks or
            concept art.
          </li>
          <li>
            • Small, highly technical team with direct ownership of critical
            systems.
          </li>
          <li>
            • Early-stage environment — your decisions materially shape the
            vehicle, architecture, and company.
          </li>
          <li>
            • Focused on physics, testing, and execution — not hype.
          </li>
        </ul>
      </section>

      {/* APPLICATION FORM */}
      <div className="bg-black/60 border border-white/10 p-8 md:p-10 rounded-2xl backdrop-blur-md shadow-xl">
        <div className="mb-8 border-b border-white/10 pb-6">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded border border-cyan-500/20 text-cyan-400">
              <ShieldCheck size={20} />
            </div>
            Application Form
          </h2>

          <p className="mt-3 text-sm text-white/50">
            Position:{" "}
            <span className="text-cyan-400 font-medium">{role}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* NAME */}
            <div>
              <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                <User size={12} /> Full Name
              </label>
              <input
                name="name"
                required
                type="text"
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:border-cyan-500/50 outline-none text-sm"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Mail size={12} /> Email Address
              </label>
              <input
                name="email"
                required
                type="email"
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:border-cyan-500/50 outline-none text-sm"
              />
            </div>
          </div>

          {/* RESUME UPLOAD */}
          <div>
            <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Upload size={12} /> Resume (PDF only)
            </label>
            <input
              name="resume"
              type="file"
              accept=".pdf"
              required
              className="w-full text-sm text-white/60 file:bg-white/10 file:border file:border-white/20 file:px-4 file:py-2 file:rounded file:text-white hover:file:bg-white/20 transition"
            />
          </div>

          {/* COVER LETTER */}
          <div>
            <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
              <FileText size={12} /> Cover Letter
            </label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:border-cyan-500/50 outline-none resize-none text-sm"
              placeholder={`Briefly describe your experience and interest in the ${role} role.`}
            />
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            type="submit"
            className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition flex justify-center items-center gap-3 uppercase tracking-widest text-sm disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Submitting…
              </>
            ) : (
              <>
                <Send size={16} />
                Submit Application
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
