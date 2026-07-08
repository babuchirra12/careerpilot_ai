"use client";

import { useRouter } from "next/navigation";

type ResumeItem = {
  id: string;
  name: string;
  updated: string;
};

export default function ResumeList({ resumes, onDownload }: { resumes?: ResumeItem[]; onDownload?: (item: ResumeItem) => void }) {
  const router = useRouter();

  const list = resumes || [
    { id: "product-manager", name: "Resume - Product Manager", updated: "2 days ago" },
    { id: "data-scientist", name: "Resume - Data Scientist", updated: "1 month ago" },
  ];

  const handleEdit = (id: string) => {
    router.push(`/resume/edit/${encodeURIComponent(id)}`);
  };

  const handleDownload = (item: ResumeItem) => {
    if (onDownload) {
      onDownload(item);
      return;
    }

    const content = `Resume: ${item.name}\nGenerated from CareerPilot AI\n`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${item.name.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      {list.map((r) => (
        <div key={r.id} className="rounded-2xl bg-slate-900/90 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-white">{r.name}</p>
              <p className="text-sm text-slate-400">Updated {r.updated}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleEdit(r.id)}
                className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/85 px-3 py-2 text-sm font-semibold text-white hover:border-sky-400"
                aria-label={`Edit ${r.name}`}
              >
                Edit
              </button>
              <button
                onClick={() => handleDownload(r)}
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400"
                aria-label={`Download ${r.name}`}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
