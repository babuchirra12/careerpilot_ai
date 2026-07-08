"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function AICoachPanel() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runCoachAction = async (action: "briefing" | "recommendations") => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (!res.ok) {
        throw new Error("Unable to reach the AI coach service.");
      }

      const data = await res.json();
      setResponse(data.message ?? "No response received.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">AI Career Coach</p>
      <h2 className="mt-3 text-2xl font-semibold text-white">Interview readiness made effortless</h2>
      <p className="mt-4 text-sm text-slate-400">Generate role-specific preparation guidance, refine your messaging, and focus on the skills that matter most for your next opportunity.</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button variant="primary" onClick={() => runCoachAction("briefing")} disabled={loading}>
          {loading ? "Loading…" : "Generate briefing"}
        </Button>
        <Button variant="secondary" onClick={() => runCoachAction("recommendations")} disabled={loading}>
          View recommendations
        </Button>
      </div>
      {(response || error) && (
        <div className="mt-5 rounded-3xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-200">
          {error ? <p className="text-rose-400">{error}</p> : <p>{response}</p>}
        </div>
      )}
    </div>
  );
}
