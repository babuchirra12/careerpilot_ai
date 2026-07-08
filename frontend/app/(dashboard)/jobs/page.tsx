"use client";

import Link from "next/link";
import { useState } from "react";
import { useJobs } from "../../../hooks/useJobs";
import type { Job } from "../../../types/job";

function JobCard({ job }: { job: Job }) {
  const slug = job.id
    ? `${job.id}`
    : encodeURIComponent(job.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"));

  return (
    <article className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.25)] transition duration-200 hover:-translate-y-1 hover:border-sky-400/30">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{job.company}</p>
          <h2 className="mt-3 text-xl font-semibold text-white">{job.title}</h2>
        </div>
        {job.jobType && (
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
            {job.jobType}
          </span>
        )}
      </div>
      <p className="mt-4 text-sm text-slate-400">
        {job.location ?? "Remote"}
        {job.salary ? ` · ${job.salary}` : ""}
      </p>
      {job.description && (
        <p className="mt-3 line-clamp-2 text-sm text-slate-500">{job.description}</p>
      )}
      <Link
        href={`/jobs/${slug}`}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-sky-400"
      >
        View role
      </Link>
    </article>
  );
}

const FALLBACK_JOBS: Job[] = [
  {
    id: 0,
    title: "Senior Product Manager, AI Platform",
    company: "Lumina Labs",
    location: "Remote",
    jobType: "FULL_TIME",
    salary: "$130k–$160k",
    description: "Lead product strategy for a cutting-edge AI platform. Work with cross-functional teams to deliver impactful features.",
    status: "ACTIVE",
  },
  {
    id: 0,
    title: "Growth Marketing Lead",
    company: "CareerPilot",
    location: "New York, NY",
    jobType: "FULL_TIME",
    salary: "$110k–$140k",
    description: "Drive user acquisition and retention strategies. Own the full marketing funnel across digital channels.",
    status: "ACTIVE",
  },
  {
    id: 0,
    title: "Data Science Manager",
    company: "NovaHire",
    location: "San Francisco, CA",
    jobType: "FULL_TIME",
    salary: "$150k–$180k",
    description: "Build and lead a data science team. Develop ML models that power our recommendation engine.",
    status: "ACTIVE",
  },
];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { jobs, loading, error } = useJobs(debouncedSearch || undefined);

  const displayJobs = jobs.length > 0 ? jobs : FALLBACK_JOBS;

  const handleSearch = (value: string) => {
    setSearch(value);
    clearTimeout((handleSearch as any)._timer);
    (handleSearch as any)._timer = setTimeout(() => setDebouncedSearch(value), 400);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_40px_80px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <span className="inline-flex rounded-full bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
                Explore roles
              </span>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                  Recommended roles for you
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                  A handpicked selection of roles based on your profile, goals, and AI-driven career preferences.
                </p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/85 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:border-sky-400 hover:bg-slate-900"
            >
              Back to dashboard
            </Link>
          </div>

          <div className="mt-6">
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search jobs by title or company..."
              className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/50"
            />
          </div>

          {error && (
            <p className="mt-4 text-sm text-amber-400">
              Could not load jobs from server — showing sample roles.
            </p>
          )}

          {loading ? (
            <div className="mt-8 grid gap-4 xl:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-48 animate-pulse rounded-[28px] border border-white/5 bg-slate-900/60"
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 grid gap-4 xl:grid-cols-3">
              {displayJobs.map((job, idx) => (
                <JobCard key={job.id || idx} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}


// export default function JobsPage() {
//   return (
//     <main className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-10">
//       <div className="mx-auto max-w-6xl">
//         <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_40px_80px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:p-8">
//           <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
//             <div className="space-y-3">
//               <span className="inline-flex rounded-full bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
//                 Explore roles
//               </span>
//               <div className="space-y-2">
//                 <h1 className="text-3xl font-semibold text-white sm:text-4xl">
//                   Recommended roles for you
//                 </h1>
//                 <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
//                   A handpicked selection of roles based on your profile, goals, and AI-driven career preferences.
//                 </p>
//               </div>
//             </div>
//             <Link
//               href="/dashboard"
//               className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/85 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:border-sky-400 hover:bg-slate-900"
//             >
//               Back to dashboard
//             </Link>
//           </div>

//           <JobList jobs={jobs} />
//         </div>
//       </div>
//     </main>
//   );
// }
