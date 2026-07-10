"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import ResumeAnalysisDashboard from "../../../../components/dashboard/ResumeAnalysisDashboard";
import RoleSkillValidator, { ROLE_NAMES } from "../../../../components/dashboard/RoleSkillValidator";
import { getAuthHeaders } from "../../../../lib/auth";
import type { ResumeAnalysis } from "../../../../types/resume";

type UploadState = "idle" | "reading" | "analyzing" | "done" | "error";

// Extract readable text from a plain-text file.
// For PDF we read raw bytes and strip binary junk to pull printable strings.
function extractTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      reader.onload = () => {
        const buffer = reader.result as ArrayBuffer;
        const bytes = new Uint8Array(buffer);
        // Decode as latin-1 then strip non-printable bytes
        let raw = "";
        for (let i = 0; i < bytes.length; i++) {
          const b = bytes[i];
          if (b >= 32 || b === 9 || b === 10 || b === 13) {
            raw += String.fromCharCode(b);
          }
        }
        // Pull out visible text runs (sequences of printable chars >= 4 long)
        const chunks = raw.match(/[ -~\t\n\r]{4,}/g) ?? [];
        resolve(chunks.join(" ").replace(/\s+/g, " ").trim());
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    } else {
      reader.onload = () => resolve((reader.result as string).trim());
      reader.onerror = reject;
      reader.readAsText(file);
    }
  });
}

export default function ResumeUploadPage() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch logged-in user info for owner validation
  useEffect(() => {
    fetch("/api/users/me", { headers: getAuthHeaders() })
      .then((r) => (r.ok ? r.json() : null))
      .then((u: { name?: string; email?: string } | null) => {
        if (u) {
          setUserName(u.name ?? "");
          setUserEmail(u.email ?? "");
        }
      })
      .catch(() => {});
  }, []);

  const processFile = useCallback(
    async (file: File) => {
      setFileName(file.name);
      setUploadState("reading");
      setAnalysis(null);
      setErrorMsg("");

      let resumeText = "";
      try {
        resumeText = await extractTextFromFile(file);
      } catch {
        setErrorMsg("Could not read the file. Please try a .txt, .pdf, or .docx file.");
        setUploadState("error");
        return;
      }

      if (resumeText.length < 50) {
        setErrorMsg("The file appears to be empty or unreadable. Please try a text-based PDF or .txt file.");
        setUploadState("error");
        return;
      }

      setUploadState("analyzing");

      try {
        const res = await fetch("/api/resume/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resumeText,
            targetRole: targetRole.trim() || undefined,
            jobDescription: jobDescription.trim() || undefined,
            userName: userName || undefined,
            userEmail: userEmail || undefined,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as { error?: string }).error ?? "Analysis failed");
        }

        const data = await res.json() as { analysis: ResumeAnalysis };
        setAnalysis(data.analysis);
        setUploadState("done");
      } catch (e) {
        setErrorMsg(e instanceof Error ? e.message : "Unexpected error during analysis.");
        setUploadState("error");
      }
    },
    [targetRole]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleReset = () => {
    setUploadState("idle");
    setAnalysis(null);
    setErrorMsg("");
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const isLoading = uploadState === "reading" || uploadState === "analyzing";

  return (
    <div className="space-y-8">

      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/resume" className="transition hover:text-slate-300">Resume Center</Link>
        <span>/</span>
        <span className="text-slate-400">AI Analysis</span>
      </nav>

      {/* ── Page header ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Resume Analyzer</p>
          <h1 className="mt-1 text-2xl font-bold text-white">AI-Powered Resume Analysis</h1>
          <p className="mt-1 text-sm text-slate-400">
            Upload your resume to get a detailed score, ATS compatibility check, and actionable feedback.
          </p>
        </div>
        {uploadState === "done" && (
          <button
            onClick={handleReset}
            className="shrink-0 rounded-full border border-slate-600 px-5 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
          >
            Analyze another →
          </button>
        )}
      </div>

      {/* ── Upload zone (hidden once done) ── */}
      {uploadState !== "done" && (
        <div className="space-y-4">

          {/* Target role selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-slate-400">
              Target Role <span className="text-slate-600">(optional — unlocks role-based skill validation)</span>
            </label>
            {/* Quick-pick chips */}
            <div className="flex flex-wrap gap-1.5">
              {ROLE_NAMES.map((role) => (
                <button
                  key={role}
                  type="button"
                  disabled={isLoading}
                  onClick={() => setTargetRole((prev) => (prev === role ? "" : role))}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition disabled:opacity-50 ${
                    targetRole === role
                      ? "bg-sky-500 text-white shadow shadow-sky-500/20"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
            {/* Free-text fallback */}
            <input
              id="targetRole"
              type="text"
              placeholder="Or type a custom role…"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              disabled={isLoading}
              className="w-full max-w-md rounded-xl border border-white/8 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:opacity-50"
            />
          </div>

          {/* Job Description (optional) */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-400">
              Job Description <span className="text-slate-600">(optional — enables keyword match & targeted gap analysis)</span>
            </label>
            <textarea
              rows={5}
              placeholder="Paste the job description here for ATS keyword matching and targeted skill gap analysis…"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-xl border border-white/8 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 resize-y focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:opacity-50"
            />
          </div>

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => !isLoading && inputRef.current?.click()}
            className={`relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed transition
              ${dragOver ? "border-sky-400 bg-sky-500/5" : "border-slate-700 bg-slate-900/50 hover:border-slate-500"}
              ${isLoading ? "pointer-events-none opacity-70" : ""}
            `}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.txt,.doc,.docx,.rtf"
              onChange={handleFileChange}
              className="hidden"
            />

            {isLoading ? (
              <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-sky-400" />
                <p className="text-sm font-medium text-slate-300">
                  {uploadState === "reading" ? "Reading your resume…" : "Analyzing with AI…"}
                </p>
                {fileName && <p className="text-xs text-slate-500">{fileName}</p>}
              </div>
            ) : uploadState === "error" ? (
              <div className="flex flex-col items-center gap-3 px-6 text-center">
                <span className="text-3xl">⚠️</span>
                <p className="text-sm font-medium text-red-400">{errorMsg}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); handleReset(); }}
                  className="rounded-lg bg-slate-800 px-4 py-1.5 text-xs text-slate-300 hover:bg-slate-700"
                >
                  Try again
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-3xl">
                  📄
                </div>
                <div>
                  <p className="font-semibold text-white">Drop your resume here</p>
                  <p className="mt-1 text-sm text-slate-400">or click to browse — PDF, TXT, DOC, DOCX, RTF</p>
                </div>
                <p className="text-xs text-slate-600">Your file is processed securely and never stored permanently.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Analysis results ── */}
      {uploadState === "done" && analysis && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
            <span className="text-lg">✅</span>
            <div>
              <p className="text-sm font-semibold text-emerald-300">Analysis complete for <span className="text-white">{fileName}</span></p>
              <p className="text-xs text-emerald-400/70">Scroll down to explore your detailed resume scorecard.</p>
            </div>
          </div>

          <ResumeAnalysisDashboard analysis={analysis} />

          {/* ── Role Skill Validator ── */}
          <RoleSkillValidator skills={analysis.skills} initialRole={targetRole} />

          {/* ── Next steps ── */}
          <div className="rounded-2xl border border-white/8 bg-slate-900/80 p-6">
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-slate-400">Next Steps</h3>
            <p className="mb-5 text-xs text-slate-500">
              Use the insights above to improve your resume. Apply the suggestions directly in the editor.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                href="/resume/edit/product-manager"
                className="flex items-center gap-3 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm font-semibold text-sky-300 transition hover:bg-sky-500/20"
              >
                <span className="text-xl">✏️</span>
                <div>
                  <p>Edit My Resume</p>
                  <p className="text-xs font-normal text-sky-400/70">Apply AI suggestions</p>
                </div>
              </Link>
              <Link
                href="/jobs"
                className="flex items-center gap-3 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/20"
              >
                <span className="text-xl">💼</span>
                <div>
                  <p>Browse Matching Jobs</p>
                  <p className="text-xs font-normal text-violet-400/70">Based on recommended roles</p>
                </div>
              </Link>
              <button
                onClick={handleReset}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-slate-800/60 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
              >
                <span className="text-xl">🔄</span>
                <div className="text-left">
                  <p>Analyze Another</p>
                  <p className="text-xs font-normal text-slate-500">Upload a different resume</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

