"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ResumeList from "../../../components/dashboard/ResumeList";
import ResumePreview from "../../../components/dashboard/ResumePreview";
import ExportModal from "../../../components/dashboard/ExportModal";
import ResumeAnalysisDashboard from "../../../components/dashboard/ResumeAnalysisDashboard";
import RoleSkillValidator from "../../../components/dashboard/RoleSkillValidator";
import { getAuthHeaders } from "../../../lib/auth";
import type { ResumeAnalysis } from "../../../types/resume";

const resumeModels = [
  {
    id: "product-manager",
    name: "Product Manager Resume",
    title: "Product Manager",
    summary: "Product leader focused on AI-driven platforms and cross-functional delivery.",
    skills: ["Product Strategy", "AI", "Roadmapping", "Stakeholder Management"],
    experience: [
      {
        id: "pm-1",
        company: "Lumina Labs",
        role: "Senior Product Manager",
        dates: "2022 - Present",
        description: "Led AI platform features and improved matching accuracy by 23%.",
      },
      {
        id: "pm-2",
        company: "Nexa Insights",
        role: "Product Manager",
        dates: "2020 - 2022",
        description: "Owned roadmap delivery for analytics products used by enterprise teams.",
      },
    ],
  },
  {
    id: "data-scientist",
    name: "Data Scientist Resume",
    title: "Data Scientist",
    summary: "Analytical data scientist specializing in modeling, experimentation, and scalable ML solutions.",
    skills: ["Machine Learning", "Python", "Statistics", "Data Visualization"],
    experience: [
      {
        id: "ds-1",
        company: "Quantive",
        role: "Data Scientist",
        dates: "2023 - Present",
        description: "Built recommendation pipelines and performance dashboards for customer insights.",
      },
      {
        id: "ds-2",
        company: "OptiMetrics",
        role: "Junior Data Scientist",
        dates: "2021 - 2023",
        description: "Developed forecasting models to improve operations planning by 18%.",
      },
    ],
  },
];

type ResumeTemplate = "classic" | "modern" | "creative" | "professional" | "minimal" | "executive";
type AnalyzeState = "idle" | "analyzing" | "done" | "error";

const resumeTemplates: Array<{ id: ResumeTemplate; name: string }> = [
  { id: "classic", name: "Classic" },
  { id: "modern", name: "Modern" },
  { id: "creative", name: "Creative" },
  { id: "professional", name: "Professional" },
  { id: "minimal", name: "Minimal" },
  { id: "executive", name: "Executive" },
];

export default function ResumePage() {
  const [selectedId, setSelectedId] = useState(resumeModels[0].id);
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>("classic");
  const [showExport, setShowExport] = useState(false);
  const [analyzeState, setAnalyzeState] = useState<AnalyzeState>("idle");
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [analyzeError, setAnalyzeError] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

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

  const selectedResume = useMemo(
    () => resumeModels.find((model) => model.id === selectedId) || resumeModels[0],
    [selectedId]
  );

  // Reset analysis when a different resume is selected
  const handleSelectResume = (id: string) => {
    setSelectedId(id);
    setAnalysis(null);
    setAnalyzeState("idle");
    setAnalyzeError("");
  };

  const analyzeResume = async () => {
    setAnalyzeState("analyzing");
    setAnalysis(null);
    setAnalyzeError("");

    // Build a plain-text representation of the selected resume
    const resumeText = [
      `Name: ${selectedResume.name}`,
      `Title: ${selectedResume.title}`,
      `Summary: ${selectedResume.summary}`,
      `Skills: ${selectedResume.skills.join(", ")}`,
      "Experience:",
      ...selectedResume.experience.map(
        (e) => `  ${e.role} at ${e.company} (${e.dates}): ${e.description}`
      ),
    ].join("\n");

    try {
      const res = await fetch("/api/resume/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          targetRole: selectedResume.title,
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
      setAnalyzeState("done");
    } catch (e) {
      setAnalyzeError(e instanceof Error ? e.message : "Unexpected error.");
      setAnalyzeState("error");
    }
  };

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Resume center</p>
          <h1 className="mt-1 text-2xl font-bold text-white">Manage your resumes</h1>
          <p className="mt-1 text-sm text-slate-400">Select a resume, choose a design, and export in seconds.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/resume/upload"
            className="shrink-0 rounded-full border border-violet-500/40 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-violet-300 shadow-lg shadow-violet-500/10 transition hover:bg-violet-500/20"
          >
            ⬆ Upload & Analyze
          </Link>
          <button
            onClick={() => setShowExport(true)}
            className="shrink-0 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
          >
            Export resume →
          </button>
        </div>
      </div>

      {/* Main layout: left sidebar | preview | right actions */}
      <div className="grid gap-5 lg:grid-cols-[260px_1fr_220px]">

        {/* ── Left: resume selection + template picker ── */}
        <div className="space-y-4">

          {/* Resume selector */}
          <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Your resumes</p>
            <div className="space-y-2">
              {resumeModels.map((model) => (
                <button
                  key={model.id}
                  onClick={() => handleSelectResume(model.id)}
                  className={`w-full rounded-xl px-3 py-3 text-left text-sm transition duration-150 ${
                    selectedId === model.id
                      ? "bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/30"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="block font-semibold">{model.name}</span>
                  <span className="block text-xs text-slate-500 mt-0.5">{model.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Template picker */}
          <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Design template</p>
            <div className="grid grid-cols-2 gap-2">
              {resumeTemplates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`rounded-xl py-2 text-xs font-semibold transition duration-150 ${
                    selectedTemplate === t.id
                      ? "bg-sky-500 text-white shadow-sm shadow-sky-500/30"
                      : "bg-slate-800/70 text-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Center: live preview ── */}
        <div className="min-h-[500px] overflow-hidden rounded-2xl border border-white/8">
          <ResumePreview resume={selectedResume} template={selectedTemplate} />
        </div>

        {/* ── Right: actions ── */}
        <div className="space-y-4">

          {/* ATS score — dynamic once analyzed, placeholder before */}
          <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">ATS score</p>
            {analysis ? (
              <>
                <p className="mt-2 text-4xl font-bold text-white">
                  {analysis.atsScore}
                  <span className="text-lg text-slate-500">/100</span>
                </p>
                <div className="mt-3 h-1.5 w-full rounded-full bg-slate-800">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-700 ${
                      analysis.atsScore >= 80 ? "bg-emerald-500" : analysis.atsScore >= 60 ? "bg-amber-400" : "bg-red-400"
                    }`}
                    style={{ width: `${analysis.atsScore}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Overall score: <span className="font-semibold text-white">{analysis.overallScore}/100</span>
                </p>
              </>
            ) : (
              <>
                <p className="mt-2 text-4xl font-bold text-slate-600">—</p>
                <p className="mt-2 text-xs text-slate-600">Run analysis to see your score</p>
              </>
            )}
          </div>

          {/* Upload resume */}
          <Link
            href="/resume/upload"
            className="flex w-full items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/20"
          >
            <span className="text-base">⬆</span>
            <div className="text-left">
              <p>Upload Resume</p>
              <p className="text-xs font-normal text-violet-400/70">AI analysis & ATS score</p>
            </div>
          </Link>

          {/* Analyze with AI — dynamic button */}
          {analyzeState === "done" && analysis ? (
            <button
              onClick={() => { setAnalysis(null); setAnalyzeState("idle"); }}
              className="flex w-full items-center gap-2 rounded-xl border border-white/8 bg-slate-800/60 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
            >
              <span className="text-base">🔄</span>
              <div className="text-left">
                <p>Re-analyze</p>
                <p className="text-xs font-normal text-slate-500">Run AI analysis again</p>
              </div>
            </button>
          ) : (
            <button
              onClick={analyzeResume}
              disabled={analyzeState === "analyzing"}
              className="flex w-full items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {analyzeState === "analyzing" ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-violet-400/40 border-t-violet-400" />
                  <div>
                    <p>Analyzing…</p>
                    <p className="text-xs font-normal text-violet-400/70">AI is reading your resume</p>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-base">🔍</span>
                  <div>
                    <p>Analyze with AI →</p>
                    <p className="text-xs font-normal text-violet-400/70">
                      {analyzeState === "error" ? "Failed — click to retry" : "Get score, ATS check & tips"}
                    </p>
                  </div>
                </>
              )}
            </button>
          )}

          {analyzeState === "error" && (
            <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">{analyzeError}</p>
          )}

          {/* Export actions */}
          <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Export</p>
            <button
              onClick={() => setShowExport(true)}
              className="w-full rounded-xl bg-sky-500 py-2.5 text-sm font-semibold text-white shadow shadow-sky-500/20 transition hover:bg-sky-400"
            >
              PDF / DOCX
            </button>
            <a
              href={`/resume/edit/${selectedResume.id}`}
              className="block w-full rounded-xl border border-white/8 bg-slate-800/60 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Customize
            </a>
          </div>

          {/* Saved list */}
          <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Saved resumes</p>
            <ResumeList
              resumes={resumeModels.map((m) => ({ id: m.id, name: m.name, title: m.title, updated: "just now" }))}
              onDownload={(item) => { setSelectedId(item.id); setShowExport(true); }}
            />
          </div>
        </div>
      </div>

      {showExport && (
        <ExportModal
          id={selectedResume.id}
          name={selectedResume.name}
          title={selectedResume.title}
          summary={selectedResume.summary}
          skills={selectedResume.skills}
          experience={selectedResume.experience}
          template={selectedTemplate}
          onClose={() => setShowExport(false)}
        />
      )}

      {/* ── Inline AI Analysis Results ── */}
      {analyzeState === "done" && analysis && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 flex-1 mr-3">
              <span className="text-lg">✅</span>
              <div>
                <p className="text-sm font-semibold text-emerald-300">
                  Analysis complete — <span className="text-white">{selectedResume.name}</span>
                </p>
                <p className="text-xs text-emerald-400/70">Scroll down to explore your detailed resume scorecard.</p>
              </div>
            </div>
            <a
              href={`/resume/edit/${selectedResume.id}`}
              className="shrink-0 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-300 transition hover:bg-sky-500/20"
            >
              Edit Resume →
            </a>
          </div>
          <ResumeAnalysisDashboard analysis={analysis} />
          <RoleSkillValidator skills={analysis.skills} initialRole={selectedResume.title} />
        </div>
      )}
    </div>
  );
}
