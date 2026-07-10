"use client";

import type { ResumeAnalysis } from "../../types/resume";

// ── helpers ────────────────────────────────────────────────────────────────

function ScoreRing({ score, max = 100, size = 96 }: { score: number; max?: number; size?: number }) {
    const pct = score / max;
    const r = size / 2 - 8;
    const circ = 2 * Math.PI * r;
    const dash = circ * pct;

    const color =
        pct >= 0.8 ? "#22d3ee" : pct >= 0.6 ? "#f59e0b" : "#f87171";

    return (
        <svg width={size} height={size} className="rotate-[-90deg]">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1e293b" strokeWidth="8" />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={color}
                strokeWidth="8"
                strokeDasharray={`${dash} ${circ}`}
                strokeLinecap="round"
            />
        </svg>
    );
}

function ScoreBar({ value, max = 100, color = "bg-sky-500" }: { value: number; max?: number; color?: string }) {
    const pct = Math.round((value / max) * 100);
    return (
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
            <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
        </div>
    );
}

function barColor(score: number, max: number) {
    const pct = score / max;
    if (pct >= 0.8) return "bg-emerald-500";
    if (pct >= 0.6) return "bg-amber-400";
    return "bg-red-400";
}

function StarRating({ stars }: { stars: number }) {
    return (
        <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < stars ? "text-amber-400" : "text-slate-600"}>
                    ★
                </span>
            ))}
        </span>
    );
}

function Pill({ label, variant = "neutral" }: { label: string; variant?: "green" | "amber" | "red" | "neutral" }) {
    const cls = {
        green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
        amber: "bg-amber-500/15 text-amber-300 border-amber-500/30",
        red: "bg-red-500/15 text-red-300 border-red-500/30",
        neutral: "bg-slate-700/60 text-slate-300 border-slate-600/40",
    }[variant];
    return (
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${cls}`}>{label}</span>
    );
}

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
    return (
        <div className={`rounded-2xl border border-white/8 bg-slate-900 p-5 ${className}`}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">{title}</h3>
            {children}
        </div>
    );
}

// ── main component ─────────────────────────────────────────────────────────

export default function ResumeAnalysisDashboard({ analysis }: { analysis: ResumeAnalysis }) {
   const {
  overallScore = 0,
  atsScore = 0,
  atsFeedback = [],
  sections = [],
  skills = { technical: [], soft: [], missing: [] },
  keywords = { found: 0, missing: 0, matchScore: 0 },
  experience = { totalYears: "0 Years", feedback: [] },
  projects = [],
  formatting = { score: 0, suggestions: [] },
  grammar = { grammarScore: 0, spellingScore: 0, readabilityScore: 0 },
  actionVerbs = { good: [], suggestions: [] },
  missingInfo = [],
  recruiterReadiness = {
    recruiterAppeal: 0,
    interviewReady: false,
    atsFriendly: false,
    recommendedRoles: [],
  },
  ownerValidation,
  candidate,
  education,
  certifications = [],
  achievements = [],
  strengths = [],
  weaknesses = [],
  recommendations = [],
} = analysis;

    const scoreColor =
        overallScore >= 80 ? "text-emerald-400" : overallScore >= 60 ? "text-amber-400" : "text-red-400";

    return (
        <div className="space-y-6">

            {/* ── Owner Validation Banner ── */}
            {ownerValidation && (
                <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${
                    ownerValidation.ownerMatched
                        ? "border-emerald-500/30 bg-emerald-500/10"
                        : "border-amber-500/30 bg-amber-500/10"
                }`}>
                    <span className="mt-0.5 shrink-0 text-lg">
                        {ownerValidation.ownerMatched ? "✅" : "⚠️"}
                    </span>
                    <div>
                        <p className={`text-sm font-semibold ${ownerValidation.ownerMatched ? "text-emerald-300" : "text-amber-300"}`}>
                            {ownerValidation.ownerMatched
                                ? "Resume Owner Verified"
                                : "Resume Owner Mismatch"}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">
                            {ownerValidation.warning || `Confidence: ${ownerValidation.confidence}`}
                        </p>
                    </div>
                </div>
            )}

            {/* ── Candidate Info + Education ── */}
            {(candidate?.name || education?.degree) && (
                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Candidate */}
                    {candidate?.name && (
                        <Card title="Candidate Information">
                            <div className="space-y-2 text-sm">
                                {candidate.name && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-500 w-20 shrink-0">Name</span>
                                        <span className="font-semibold text-white">{candidate.name}</span>
                                    </div>
                                )}
                                {candidate.email && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-500 w-20 shrink-0">Email</span>
                                        <span className="text-slate-300">{candidate.email}</span>
                                    </div>
                                )}
                                {candidate.phone && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-500 w-20 shrink-0">Phone</span>
                                        <span className="text-slate-300">{candidate.phone}</span>
                                    </div>
                                )}
                                {candidate.linkedin && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-500 w-20 shrink-0">LinkedIn</span>
                                        <span className="truncate text-sky-400">{candidate.linkedin}</span>
                                    </div>
                                )}
                                {candidate.github && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-500 w-20 shrink-0">GitHub</span>
                                        <span className="truncate text-sky-400">{candidate.github}</span>
                                    </div>
                                )}
                                {candidate.portfolio && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-500 w-20 shrink-0">Portfolio</span>
                                        <span className="truncate text-sky-400">{candidate.portfolio}</span>
                                    </div>
                                )}
                                {candidate.address && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-500 w-20 shrink-0">Location</span>
                                        <span className="text-slate-300">{candidate.address}</span>
                                    </div>
                                )}
                            </div>
                        </Card>
                    )}

                    {/* Education */}
                    {education?.degree && (
                        <Card title="Education">
                            <div className="space-y-2 text-sm">
                                {education.degree && (
                                    <p className="font-semibold text-white">{education.degree}</p>
                                )}
                                {(education.college || education.university) && (
                                    <p className="text-slate-300">{education.college || education.university}</p>
                                )}
                                <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-400">
                                    {education.graduationYear && (
                                        <span className="rounded-full bg-slate-800 px-2.5 py-0.5">
                                            Graduated {education.graduationYear}
                                        </span>
                                    )}
                                    {education.cgpa && (
                                        <span className="rounded-full bg-emerald-500/10 text-emerald-300 px-2.5 py-0.5">
                                            CGPA {education.cgpa}
                                        </span>
                                    )}
                                    {education.percentage && (
                                        <span className="rounded-full bg-emerald-500/10 text-emerald-300 px-2.5 py-0.5">
                                            {education.percentage}%
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            )}

            {/* ── Row 1: hero scores ── */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {/* Overall */}
                <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-slate-900 p-5">
                    <div className="relative shrink-0">
                        <ScoreRing score={overallScore} />
                        <span className={`absolute inset-0 flex items-center justify-center text-lg font-bold rotate-90 ${scoreColor}`}>
                            {overallScore}
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Overall Score</p>
                        <p className={`mt-0.5 text-3xl font-extrabold ${scoreColor}`}>{overallScore}<span className="text-sm text-slate-500">/100</span></p>
                    </div>
                </div>

                {/* ATS */}
                <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-slate-900 p-5">
                    <div className="relative shrink-0">
                        <ScoreRing score={atsScore} size={80} />
                        <span className="absolute inset-0 flex items-center justify-center text-base font-bold rotate-90 text-cyan-400">
                            {atsScore}
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">ATS Score</p>
                        <p className="mt-0.5 text-2xl font-extrabold text-cyan-400">{atsScore}<span className="text-sm text-slate-500">/100</span></p>
                    </div>
                </div>

                {/* Keyword match */}
                <div className="rounded-2xl border border-white/8 bg-slate-900 p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Keyword Match</p>
                    <p className="mt-1 text-2xl font-extrabold text-violet-400">
                        {keywords?.matchScore ?? 0}%
                    </p>

                    <div className="mt-2 space-y-1 text-xs text-slate-400">
                        <span className="inline-block rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-300">
                            {keywords?.found ?? 0} found
                        </span>

                        <span className="ml-2 inline-block rounded-full bg-red-500/15 px-2 py-0.5 text-red-300">
                            {keywords?.missing ?? 0} missing
                        </span>
                    </div>
                </div>

                {/* Recruiter readiness */}
                <div className="rounded-2xl border border-white/8 bg-slate-900 p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Recruiter Readiness</p>
                    <p className="mt-1 text-2xl font-extrabold text-amber-400">{recruiterReadiness.recruiterAppeal.toFixed(1)}<span className="text-sm text-slate-500">/10</span></p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                        <Pill label={recruiterReadiness?.interviewReady ? "✅ Interview Ready" : "⚠ Not Ready"} variant={recruiterReadiness.interviewReady ? "green" : "amber"} />
                        <Pill label={recruiterReadiness.atsFriendly ? "ATS Friendly" : "ATS Issues"} variant={recruiterReadiness?.atsFriendly ? "green" : "red"} />
                    </div>
                </div>
            </div>

            {/* ── Row 2: sections + ATS feedback ── */}
            <div className="grid gap-4 lg:grid-cols-2">

                <Card title="Section-wise Ratings">
                    <div className="space-y-3">
                        {sections.map((s) => (
                            <div key={s.name}>
                                <div className="mb-1 flex items-center justify-between text-xs">
                                    <span className="text-slate-300">{s.name}</span>
                                    <span className="font-semibold text-white">{s.score}/{s.maxScore}</span>
                                </div>
                                <ScoreBar value={s.score} max={s.maxScore} color={barColor(s.score, s.maxScore)} />
                            </div>
                        ))}
                    </div>
                </Card>

                <Card title="ATS Compatibility">
                    <div className="mb-4 flex items-center gap-4">
                        <div className="relative shrink-0">
                            <ScoreRing score={atsScore} size={80} />
                            <span className="absolute inset-0 flex items-center justify-center text-base font-bold rotate-90 text-cyan-400">{atsScore}</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-cyan-400">{atsScore}/100</p>
                            <p className="text-xs text-slate-400">ATS Compatibility Score</p>
                        </div>
                    </div>
                    <ul className="space-y-2">
                        {atsFeedback.map((fb, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <span className="mt-0.5 shrink-0 text-emerald-400">✓</span>
                                {fb}
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            {/* ── Row 3: skills ── */}
            <Card title="Skills Analysis">
                <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                        <p className="mb-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">Technical Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                            {skills.technical.map((s) => <Pill key={s} label={s} variant="green" />)}
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">Soft Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                            {skills.soft.map((s) => <Pill key={s} label={s} variant="neutral" />)}
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 text-xs font-semibold text-red-400 uppercase tracking-wider">Missing Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                            {skills.missing.map((s) => <Pill key={s} label={s} variant="red" />)}
                        </div>
                    </div>
                </div>
            </Card>

            {/* ── Row 4: experience + grammar ── */}
            <div className="grid gap-4 lg:grid-cols-2">

                <Card title="Experience Analysis">
                    <p className="mb-3 text-xl font-bold text-white">{experience.totalYears}</p>
                    <ul className="space-y-2">
                        {experience.feedback.map((fb, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <span className="mt-0.5 shrink-0 text-amber-400">→</span>
                                {fb}
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card title="Grammar & Language">
                    <div className="space-y-3">
                        {[
                            { label: "Grammar", value: grammar.grammarScore },
                            { label: "Spelling", value: grammar.spellingScore },
                            { label: "Readability", value: grammar.readabilityScore },
                        ].map(({ label, value }) => (
                            <div key={label}>
                                <div className="mb-1 flex justify-between text-xs">
                                    <span className="text-slate-300">{label}</span>
                                    <span className="font-semibold text-white">{value}%</span>
                                </div>
                                <ScoreBar value={value} color={barColor(value, 100)} />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* ── Row 5: projects ── */}
            {projects.length > 0 && (
                <Card title="Project Evaluation">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {projects.map((p) => (
                            <div key={p.name} className="rounded-xl border border-white/8 bg-slate-800/60 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <p className="font-semibold text-white">{p.name}</p>
                                    <StarRating stars={p.stars} />
                                </div>
                                <div className="mb-2 flex flex-wrap gap-1">
                                    {p.techStack.map((t) => <Pill key={t} label={t} variant="neutral" />)}
                                </div>
                                <ul className="space-y-1">
                                    {p.feedback.map((fb, i) => (
                                        <li key={i} className="text-xs text-slate-400">• {fb}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* ── Row 6: formatting + action verbs ── */}
            <div className="grid gap-4 lg:grid-cols-2">

                <Card title="Formatting">
                    <div className="mb-4 flex items-center gap-3">
                        <span className="text-3xl font-extrabold text-sky-400">{formatting.score}<span className="text-sm text-slate-500">/10</span></span>
                        <ScoreBar value={formatting.score} max={10} color={barColor(formatting.score, 10)} />
                    </div>
                    <ul className="space-y-2">
                        {formatting.suggestions.map((s, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <span className="mt-0.5 shrink-0 text-sky-400">•</span>
                                {s}
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card title="Action Verbs">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">Strong Verbs Detected</p>
                    <div className="mb-4 flex flex-wrap gap-1.5">
                        {actionVerbs.good.map((v) => <Pill key={v} label={v} variant="green" />)}
                    </div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400">Improvement Suggestions</p>
                    <ul className="space-y-1">
                        {actionVerbs.suggestions.map((s, i) => (
                            <li key={i} className="text-xs text-slate-400">• {s}</li>
                        ))}
                    </ul>
                </Card>
            </div>

            {/* ── Row 7: missing info + recommended roles ── */}
            <div className="grid gap-4 lg:grid-cols-2">

                <Card title="Missing Information">
                    {missingInfo.length === 0 ? (
                        <p className="text-sm text-emerald-400">✅ No missing information detected.</p>
                    ) : (
                        <ul className="space-y-2">
                            {missingInfo.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                    <span className="mt-0.5 shrink-0 text-red-400">⚠</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>

                <Card title="Recommended Roles">
                    <div className="mb-3 flex flex-wrap gap-2">
                        {(recruiterReadiness?.recommendedRoles ?? []).map((role) => (
                            <Pill key={role} label={role} variant="green" />
                        ))}
                    </div>
                    <div className="mt-3 space-y-1 text-sm text-slate-400">
                        <p>Recruiter Appeal: <span className="font-semibold text-white">{(recruiterReadiness?.recruiterAppeal ?? 0).toFixed(1)}/10</span></p>
                        <p>Interview Ready: <span className={recruiterReadiness.interviewReady ? "text-emerald-400" : "text-amber-400"}>{recruiterReadiness.interviewReady ? "✅ Yes" : "⚠ Not Yet"}</span></p>
                        <p>ATS Friendly: <span className={recruiterReadiness?.atsFriendly ? "text-emerald-400" : "text-red-400"}>{recruiterReadiness?.atsFriendly ? "✅ Yes" : "❌ No"}</span></p>
                        {recruiterReadiness.reason && (
                            <p className="mt-2 text-xs italic text-slate-500">{recruiterReadiness.reason}</p>
                        )}
                    </div>
                </Card>
            </div>

            {/* ── Achievements ── */}
            {achievements.length > 0 && (
                <Card title="Key Achievements">
                    <ul className="space-y-2">
                        {achievements.map((a, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <span className="mt-0.5 shrink-0 text-amber-400">🏆</span>
                                {a}
                            </li>
                        ))}
                    </ul>
                </Card>
            )}

            {/* ── Certifications ── */}
            {certifications.length > 0 && (
                <Card title="Certifications">
                    <div className="grid gap-3 sm:grid-cols-2">
                        {certifications.map((c, i) => (
                            <div key={i} className="rounded-xl border border-white/8 bg-slate-800/50 px-4 py-3">
                                <p className="font-semibold text-white text-sm">{c.certification}</p>
                                {c.organization && <p className="text-xs text-slate-400 mt-0.5">{c.organization}</p>}
                                {c.date && <p className="text-xs text-slate-500 mt-0.5">{c.date}</p>}
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* ── Strengths & Weaknesses ── */}
            {(strengths.length > 0 || weaknesses.length > 0) && (
                <div className="grid gap-4 lg:grid-cols-2">
                    {strengths.length > 0 && (
                        <Card title="Top Strengths">
                            <ul className="space-y-2">
                                {strengths.map((s, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                        <span className="mt-0.5 shrink-0 text-emerald-400">✅</span>
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    )}
                    {weaknesses.length > 0 && (
                        <Card title="Areas to Improve">
                            <ul className="space-y-2">
                                {weaknesses.map((w, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                        <span className="mt-0.5 shrink-0 text-red-400">⚠️</span>
                                        {w}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    )}
                </div>
            )}

            {/* ── Priority Recommendations ── */}
            {recommendations.length > 0 && (
                <Card title="Priority Recommendations">
                    <ol className="space-y-3">
                        {recommendations.map((r, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-xs font-bold text-sky-400">
                                    {i + 1}
                                </span>
                                {r}
                            </li>
                        ))}
                    </ol>
                </Card>
            )}

        </div>
    );
}
