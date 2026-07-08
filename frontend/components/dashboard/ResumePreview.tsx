"use client";

type ResumeData = {
  id: string;
  name: string;
  title: string;
  summary: string;
  skills: string[];
  experience: Array<{
    id: string;
    company: string;
    role: string;
    dates: string;
    description: string;
  }>;
};

type ResumeTemplate = "classic" | "modern" | "creative" | "professional" | "minimal" | "executive";

const templateStyles: Record<ResumeTemplate, string> = {
  classic: "bg-slate-950/95 border border-white/10 text-white",
  modern: "bg-white border border-slate-200 text-slate-900",
  creative: "bg-gradient-to-br from-slate-900 via-violet-950 to-sky-950 text-white shadow-[0_30px_80px_rgba(56,189,248,0.14)]",
  professional: "bg-slate-50 border border-slate-200 text-slate-900",
  minimal: "bg-white border border-slate-200 text-slate-900 shadow-sm",
  executive: "bg-slate-950 border border-slate-800 text-white shadow-[0_30px_60px_rgba(15,23,42,0.5)]",
};

const templateHeaders: Record<ResumeTemplate, { label: string; accent: string }> = {
  classic: { label: "Classic", accent: "bg-sky-500 text-slate-950" },
  modern: { label: "Modern", accent: "bg-slate-900 text-white" },
  creative: { label: "Creative", accent: "bg-rose-500 text-white" },
  professional: { label: "Professional", accent: "bg-emerald-700 text-white" },
  minimal: { label: "Minimal", accent: "bg-slate-400 text-slate-950" },
  executive: { label: "Executive", accent: "bg-amber-500 text-slate-950" },
};

export default function ResumePreview({ resume, template }: { resume: ResumeData; template: ResumeTemplate }) {
  const headerStyles = templateHeaders[template];

  return (
    <div className={`rounded-3xl p-6 shadow-lg ${templateStyles[template]}`}>
      {template === "classic" ? (
        <>
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-2xl font-semibold">{resume.name}</h2>
              <p className="text-slate-400">{resume.title}</p>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-200">
              {headerStyles.label}
            </span>
          </div>

          <div className="space-y-5 text-slate-200">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Summary</h3>
              <p className="mt-2 leading-7 text-slate-300">{resume.summary}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Skills</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {resume.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-slate-900/90 px-3 py-1 text-xs text-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Experience</h3>
              <div className="mt-4 space-y-4">
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="rounded-2xl bg-slate-900/90 p-4">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-semibold">{exp.role}</p>
                      <p className="text-sm text-slate-400">{exp.dates}</p>
                    </div>
                    <p className="text-sm text-slate-400">{exp.company}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : template === "modern" ? (
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold text-slate-900">{resume.name}</h2>
                <p className="mt-2 text-slate-500">{resume.title}</p>
              </div>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white">{headerStyles.label}</span>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
            <div className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div>
                <h3 className="text-sm uppercase tracking-[0.24em] text-slate-500">Summary</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{resume.summary}</p>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-[0.24em] text-slate-500">Skills</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {resume.skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-slate-900 px-3 py-1 text-xs text-white">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm uppercase tracking-[0.24em] text-slate-500">Experience</h3>
              {resume.experience.map((exp) => (
                <div key={exp.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">{exp.role}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{exp.dates}</p>
                  <p className="mt-1 text-sm text-slate-600">{exp.company}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : template === "creative" ? (
        <div className="grid gap-5 lg:grid-cols-[0.72fr_0.28fr]">
          <div className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="rounded-[28px] bg-slate-900/95 p-6">
              <h2 className="mt-3 text-3xl font-semibold">{resume.name}</h2>
              <p className="mt-2 text-sm text-slate-300">{resume.title}</p>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.24em] text-rose-200">About</p>
                <p className="mt-3 text-sm leading-7 text-slate-200">{resume.summary}</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.24em] text-rose-200">Skills</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {resume.skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-900/95 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Experience</p>
              <div className="mt-4 space-y-4">
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="rounded-3xl bg-slate-950/95 p-4 border border-white/10">
                    <p className="text-sm font-semibold text-white">{exp.role}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{exp.dates}</p>
                    <p className="mt-2 text-sm text-slate-300">{exp.company}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-rose-500/10 p-4 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-rose-200">Template</p>
              <p className="mt-2 text-sm font-semibold">{headerStyles.label} style</p>
            </div>
          </div>
        </div>
      ) : template === "professional" ? (
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm text-slate-900">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-3xl font-semibold">{resume.name}</h2>
              <p className="mt-2 text-slate-600">{resume.title}</p>
            </div>
            <span className="rounded-full bg-emerald-700 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white">{headerStyles.label}</span>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Summary</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">{resume.summary}</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Skills</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {resume.skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-700">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Experience</p>
                <div className="mt-3 space-y-3">
                  {resume.experience.map((exp) => (
                    <div key={exp.id} className="rounded-2xl bg-white p-3 border border-slate-200">
                      <p className="text-sm font-semibold text-slate-900">{exp.role}</p>
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{exp.dates}</p>
                      <p className="mt-1 text-sm text-slate-600">{exp.company}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : template === "minimal" ? (
        <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm text-slate-900">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">{resume.name}</h2>
              <p className="mt-2 text-slate-500">{resume.title}</p>
            </div>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-700">{headerStyles.label}</span>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Summary</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">{resume.summary}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Skills</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">{resume.skills.join(", ")}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Experience</p>
              <div className="mt-3 space-y-3">
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-sm font-semibold text-slate-900">{exp.role}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{exp.dates}</p>
                    <p className="mt-1 text-sm text-slate-700">{exp.company}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-950 p-5 shadow-[0_30px_60px_rgba(15,23,42,0.5)] text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">{resume.name}</h2>
              <p className="mt-2 text-slate-300">{resume.title}</p>
            </div>
            <span className="rounded-full bg-amber-500 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-950">{headerStyles.label}</span>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Summary</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{resume.summary}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Skills</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {resume.skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Experience</p>
            <div className="mt-4 space-y-4">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-sm font-semibold text-white">{exp.role}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{exp.dates}</p>
                  <p className="mt-2 text-sm text-slate-300">{exp.company}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
