import JobCard from "./JobCard";
import type { Job } from "../../types/job";

interface JobListProps {
  jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-10 text-center">
        <h3 className="text-xl font-semibold text-white">
          No jobs found
        </h3>
        <p className="mt-2 text-slate-400">
          Try searching with a different keyword.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
        />
      ))}
    </div>
  );
}