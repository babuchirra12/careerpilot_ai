"use client";

import { useState } from "react";

export default function ResumeImport({ id }: { id: string }) {
  const [status, setStatus] = useState<string | null>(null);

  const handleFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        const parsed = JSON.parse(text);
        localStorage.setItem(`resume:${id}`, JSON.stringify(parsed));
        setStatus("Imported to local draft.");
      } catch (e) {
        setStatus("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-slate-800 px-3 py-1 text-sm text-slate-100">
        Import
        <input
          type="file"
          accept="application/json,.json"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          className="hidden"
        />
      </label>
      {status ? <div className="text-xs text-slate-400">{status}</div> : null}
    </div>
  );
}
