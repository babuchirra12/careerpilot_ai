import Link from "next/link";
import type { Job } from "../../types/job";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const slug = job.id
    ? String(job.id)
    : encodeURIComponent(
        job.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-sky-500 hover:shadow-xl">

      {/* Company Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.company}
              className="h-12 w-12 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-700 text-lg font-bold text-white">
              {job.company.charAt(0)}
            </div>
          )}

          <div>
            <p className="text-sm text-sky-400">
              {job.company}
            </p>

            <h2 className="text-xl font-bold text-white">
              {job.title}
            </h2>
          </div>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            job.status === "ACTIVE"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {job.status}
        </span>

      </div>

      {/* Match Score */}
      {job.matchScore !== undefined && (
        <div className="mt-4">
          <span className="rounded-full bg-sky-500/20 px-3 py-1 text-sm font-semibold text-sky-300">
            ⭐ {job.matchScore}% Match
          </span>
        </div>
      )}

      {/* Job Details */}
      <div className="mt-5 space-y-2 text-sm text-slate-300">

        <p>📍 {job.location || "Remote"}</p>

        <p>💼 {job.jobType}</p>

        {job.employmentType && (
          <p>🏢 {job.employmentType}</p>
        )}

        {job.experience && (
          <p>👨‍💻 {job.experience}</p>
        )}

        {job.level && (
          <p>🎯 {job.level}</p>
        )}

        {job.salary && (
          <p>💰 {job.salary}</p>
        )}

      </div>

      {/* Skills */}
      {job.skills && (
        <div className="mt-4">
          <h4 className="mb-2 text-sm font-semibold text-white">
            Skills
          </h4>

          <div className="flex flex-wrap gap-2">
            {job.skills.split(",").map((skill) => (
              <span
                key={skill.trim()}
                className="rounded-full bg-slate-800 px-3 py-1 text-xs text-sky-300"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {job.description && (
        <p className="mt-5 line-clamp-3 text-sm text-slate-400">
          {job.description}
        </p>
      )}

      {/* Buttons */}
      <div className="mt-6 flex gap-3">

        <Link
          href={`/jobs/${slug}`}
          className="flex-1 rounded-xl bg-sky-500 px-4 py-3 text-center font-semibold text-slate-950 transition hover:bg-sky-400"
        >
          View Details
        </Link>

        {job.applyUrl && (
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-xl border border-sky-500 px-4 py-3 text-center font-semibold text-sky-400 transition hover:bg-sky-500 hover:text-white"
          >
            Apply Now
          </a>
        )}

      </div>

    </div>
  );
}