"use client";

import { useMemo, useState } from "react";
import ResumeList from "../../../components/dashboard/ResumeList";
import ResumePreview from "../../../components/dashboard/ResumePreview";
import ExportModal from "../../../components/dashboard/ExportModal";

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
  const selectedResume = useMemo(
    () => resumeModels.find((model) => model.id === selectedId) || resumeModels[0],
    [selectedId]
  );

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Resume center</p>
          <h1 className="mt-1 text-2xl font-bold text-white">Manage your resumes</h1>
          <p className="mt-1 text-sm text-slate-400">Select a resume, choose a design, and export in seconds.</p>
        </div>
        <button
          onClick={() => setShowExport(true)}
          className="shrink-0 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
        >
          Export resume →
        </button>
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
                  onClick={() => setSelectedId(model.id)}
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

          {/* ATS score */}
          <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">ATS score</p>
            <p className="mt-2 text-4xl font-bold text-white">78<span className="text-lg text-slate-500">/100</span></p>
            <div className="mt-3 h-1.5 w-full rounded-full bg-slate-800">
              <div className="h-1.5 w-[78%] rounded-full bg-sky-500" />
            </div>
            <p className="mt-2 text-xs text-slate-500">Good · Add more keywords to reach 90+</p>
          </div>

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
              resumes={resumeModels.map((m) => ({ id: m.id, name: m.name, updated: "just now" }))}
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
    </div>
  );
}
