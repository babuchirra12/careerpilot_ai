"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DownloadButton from "../common/DownloadButton";
import ResumeExport from "./ResumeExport";
import ResumeImport from "./ResumeImport";
import ExportModal from "./ExportModal";

type Experience = {
  id: string;
  company: string;
  role: string;
  dates: string;
  description: string;
};

export default function ResumeEditor({ id }: { id: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [message, setMessage] = useState("");
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    // load from localStorage if present, otherwise seed for known id
    const raw = localStorage.getItem(`resume:${id}`);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setName(parsed.name || "");
        setTitle(parsed.title || "");
        setSummary(parsed.summary || "");
        setSkills(parsed.skills || []);
        setExperience(parsed.experience || []);
        return;
      } catch (e) {
        // ignore
      }
    }

    if (id === "product-manager") {
      setName("Alex Morgan");
      setTitle("Product Manager");
      setSummary(
        "Product leader focused on AI-driven platforms, experienced in cross-functional delivery and data-informed strategy."
      );
      setSkills(["Product", "AI", "Roadmapping", "Stakeholder Management"]);
      setExperience([
        {
          id: "exp-1",
          company: "Lumina Labs",
          role: "Senior Product Manager",
          dates: "2022 - Present",
          description: "Led AI platform features, improved matching accuracy by 23%.",
        },
      ]);
    }
  }, [id]);

  const save = () => {
    const payload = { name, title, summary, skills, experience };
    localStorage.setItem(`resume:${id}`, JSON.stringify(payload));
    setMessage("Saved locally.");
    // also try to persist to server (public/resumes/{id}.json)
    (async () => {
      try {
        const resp = await fetch("/api/resumes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, data: payload }),
        });
        if (resp.ok) {
          setMessage("Saved locally and to project public/resumes.");
        } else {
          setMessage("Saved locally; server save failed.");
        }
      } catch (e) {
        setMessage("Saved locally; server save failed.");
      }
      setTimeout(() => setMessage(""), 3000);
    })();
  };

  const downloadAsWord = () => {
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${name} - Resume</title></head><body><h1>${name}</h1><h2>${title}</h2><p>${summary}</p><h3>Skills</h3><p>${skills.join(", ")}</p><h3>Experience</h3>${experience.map((e) => `<p><strong>${e.role}</strong> — ${e.company} (${e.dates})<br/>${e.description}</p>`).join("")}</body></html>`;
    const blob = new Blob([html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${id}-resume.doc`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadAsImage = () => {
    // generate a simple PNG representation using canvas
    const padding = 40;
    const lineHeight = 22;
    const canvasWidth = 1200;
    // estimate height
    const lines = [] as string[];
    lines.push(name);
    lines.push(title);
    lines.push('');
    const summaryLines = summary.match(/.{1,100}(?:\s|$)/g) || [summary];
    lines.push(...summaryLines);
    lines.push('');
    lines.push('Skills: ' + skills.join(', '));
    lines.push('');
    experience.forEach((e) => {
      lines.push(`${e.role} — ${e.company} (${e.dates})`);
      const descLines = e.description.match(/.{1,100}(?:\s|$)/g) || [e.description];
      lines.push(...descLines);
      lines.push('');
    });

    const canvasHeight = padding * 2 + lines.length * lineHeight;
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.font = '28px Inter, sans-serif';
    ctx.fillText(name, padding, padding + 24);
    ctx.font = '18px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(title, padding, padding + 24 + 28);

    ctx.fillStyle = '#e2e8f0';
    let y = padding + 24 + 28 + 28;
    ctx.font = '14px Inter, sans-serif';
    lines.slice(2).forEach((line) => {
      ctx.fillText(line, padding, y);
      y += lineHeight;
    });

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${id}-resume.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  const download = () => {
    const payload = { name, title, summary, skills, experience };
    const text = JSON.stringify(payload, null, 2);
    // use DownloadButton via programmatic download here
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${id}-resume.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const addExperience = () => {
    setExperience((prev) => [
      ...prev,
      { id: `exp-${Date.now()}`, company: "", role: "", dates: "", description: "" },
    ]);
  };

  const updateExperience = (idx: number, key: keyof Experience, value: string) => {
    setExperience((prev) => {
      const next = [...prev];
      // @ts-ignore
      next[idx][key] = value;
      return next;
    });
  };

  const removeExperience = (idx: number) => {
    setExperience((prev) => prev.filter((_, i) => i !== idx));
  };

  const addSkill = (raw: string) => {
    const parts = raw.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length) setSkills((prev) => Array.from(new Set([...prev, ...parts])));
  };

  return (
    <>
      {message ? (
        <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-sky-600/95 px-4 py-2 text-sm font-medium text-white shadow-lg">
          {message}
        </div>
      ) : null}

      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-lg">
        <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Edit resume</h1>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <ResumeImport id={id} />
            <ResumeExport id={id} />
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push('/resume')} className="rounded-full border border-slate-700/80 bg-slate-950/85 px-4 py-2 text-sm text-white">Cancel</button>
            <button onClick={save} className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950">Save</button>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4 text-sm text-slate-200">
        <label className="block">
          <div className="pb-1 text-slate-300">Full name</div>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md bg-slate-950/85 px-3 py-2 text-white outline-none" />
        </label>

        <label className="block">
          <div className="pb-1 text-slate-300">Title</div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-md bg-slate-950/85 px-3 py-2 text-white outline-none" />
        </label>

        <label className="block">
          <div className="pb-1 text-slate-300">Summary</div>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full rounded-md bg-slate-950/85 px-3 py-2 text-white outline-none" />
        </label>

        <label className="block">
          <div className="pb-1 text-slate-300">Skills (comma separated)</div>
          <input onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill((e.target as HTMLInputElement).value); (e.target as HTMLInputElement).value = ''; } }} placeholder="Add skills and press Enter" className="w-full rounded-md bg-slate-950/85 px-3 py-2 text-white outline-none" />
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">
                {s}
                <button onClick={() => setSkills((prev) => prev.filter((x) => x !== s))} className="ml-1 text-slate-400">✕</button>
              </span>
            ))}
          </div>
        </label>

        <div>
          <div className="flex items-center justify-between">
            <div className="text-slate-300">Experience</div>
            <button onClick={addExperience} className="rounded-full bg-slate-950/85 px-3 py-1 text-sm">Add experience</button>
          </div>

          <div className="mt-3 space-y-3">
            {experience.map((exp, idx) => (
              <div key={exp.id} className="rounded-2xl bg-slate-900/90 p-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-white">{exp.company || 'New company'}</div>
                  <div className="flex gap-2">
                    <button onClick={() => removeExperience(idx)} className="text-sm text-slate-400">Remove</button>
                  </div>
                </div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <input value={exp.role} onChange={(e) => updateExperience(idx, 'role', e.target.value)} placeholder="Role" className="rounded-md bg-slate-950/85 px-2 py-2 text-white outline-none" />
                  <input value={exp.dates} onChange={(e) => updateExperience(idx, 'dates', e.target.value)} placeholder="Dates" className="rounded-md bg-slate-950/85 px-2 py-2 text-white outline-none" />
                </div>
                <textarea value={exp.description} onChange={(e) => updateExperience(idx, 'description', e.target.value)} placeholder="Short description" className="mt-2 w-full rounded-md bg-slate-950/85 px-2 py-2 text-white outline-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-400">Export</div>
          <div className="flex gap-3">
            <DownloadButton filename={`${id}-resume.json`} content={JSON.stringify({ name, title, summary, skills, experience }, null, 2)} mimeType="application/json" className="rounded-full bg-slate-950/85 px-4 py-2 text-sm text-white">
              Download JSON
            </DownloadButton>
            <DownloadButton filename={`${id}-resume.json`} onClick={() => { save(); /* save triggers server upload */ return new Promise<void>((res) => { setTimeout(res, 300); }); }} className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950">
              Save + Download
            </DownloadButton>
            <button onClick={() => setShowExport(true)} className="rounded-full bg-emerald-600 px-4 py-2 text-sm text-white">Export</button>
          </div>
        </div>

        {/* top toast handles messages now */}
      </div>
    </div>
    {showExport ? (
      <ExportModal id={id} name={name} title={title} summary={summary} skills={skills} experience={experience} onClose={() => setShowExport(false)} />
    ) : null}
  </>
  );
}
