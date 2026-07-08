"use client";

import { useState } from "react";

export default function ResumeExport({ id }: { id: string }) {
  const [status, setStatus] = useState<string | null>(null);

  const downloadText = (text: string, filename: string) => {
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleExport = async () => {
    setStatus(null);
    try {
      const key = `resume:${id}`;
      const local = localStorage.getItem(key);
      if (local) {
        downloadText(local, `${id}-resume.json`);
        setStatus("Downloaded from local draft.");
        return;
      }

      // try public folder fallback
      const resp = await fetch(`/resumes/${id}.json`);
      if (resp.ok) {
        const text = await resp.text();
        downloadText(text, `${id}-resume.json`);
        setStatus("Downloaded from public/resumes.");
        return;
      }

      setStatus("No resume found to export.");
    } catch (err) {
      setStatus("Export failed.");
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button onClick={handleExport} className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-100">
        Export
      </button>
      {status ? <div className="text-xs text-slate-400">{status}</div> : null}
    </div>
  );
}
