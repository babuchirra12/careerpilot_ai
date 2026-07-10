"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useJobs } from "@/hooks/useJobs";
import type { Job } from "@/types/job";

function JobCard({ job }: { job: Job }) {
  const slug = job.id
    ? String(job.id)
    : encodeURIComponent(
      job.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    );

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg transition hover:border-sky-500 hover:shadow-sky-500/20">
      <p className="text-sm text-sky-400">{job.company}</p>

      <h3 className="mt-2 text-xl font-bold text-white">
        {job.title}
      </h3>

      {job.jobType && (
        <span className="mt-3 inline-block rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-300">
          {job.jobType}
        </span>
      )}

      <p className="mt-4 text-sm text-slate-300">
        📍 {job.location || "Remote"}
      </p>

      {job.salary && (
        <p className="text-sm text-green-400">
          💰 {job.salary}
        </p>
      )}

      {job.description && (
        <p className="mt-4 line-clamp-3 text-sm text-slate-400">
          {job.description}
        </p>
      )}

      <Link
        href={`/jobs/${slug}`}
        className="mt-6 inline-flex w-full justify-center rounded-xl bg-sky-500 px-4 py-3 font-semibold text-slate-900 hover:bg-sky-400"
      >
        View Role
      </Link>
    </div>
  );
}

const FALLBACK_JOBS: Job[] = [
  {
    id: 0,
    title: "Senior Product Manager, AI Platform",
    company: "Lumina Labs",
    location: "Remote",
    jobType: "FULL_TIME",
    salary: "$130k-$160k",
    description:
      "Lead product strategy for our AI platform.",
    status: "ACTIVE",
    createdAt: "",
  },
  {
    id: 0,
    title: "Growth Marketing Lead",
    company: "CareerPilot AI",
    location: "New York",
    jobType: "FULL_TIME",
    salary: "$110k-$140k",
    description:
      "Drive user acquisition across digital channels.",
    status: "ACTIVE",
    createdAt: "",
  },
  {
    id: 0,
    title: "Java Spring Boot Developer",
    company: "Infosys",
    location: "Hyderabad",
    jobType: "FULL_TIME",
    salary: "₹10-15 LPA",
    description:
      "Develop scalable REST APIs using Spring Boot.",
    status: "ACTIVE",
    createdAt: "",
  },
];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { jobs, loading, error } = useJobs(
    debouncedSearch || undefined
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const displayJobs = error ? FALLBACK_JOBS : jobs;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sky-400">
              Explore Roles
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Recommended Jobs
            </h1>

            <p className="mt-3 text-slate-400">
              AI-powered job recommendations based on your
              resume and profile.
            </p>

          </div>

          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-700 px-5 py-3 hover:border-sky-500"
          >
            Dashboard
          </Link>

        </div>

        <div className="mt-8">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-sky-500"
          />
        </div>

        {error && (
          <p className="mt-4 text-amber-400">
            Unable to connect to the server. Showing sample jobs.
          </p>
        )}

        {loading ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-3xl bg-slate-800"
              />
            ))}
          </div>
        ) : displayJobs.length === 0 ? (
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-white">
              No jobs found
            </h2>

            <p className="mt-3 text-slate-400">
              Try searching with another keyword.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {displayJobs.map((job, index) => (
              <JobCard
                key={`${job.id}-${index}`}
                job={job}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
