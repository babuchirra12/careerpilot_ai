import JobCard from "./JobCard";

export default function JobList({ jobs }: { jobs: any[] }) {
  return (
    <div className="mt-8 grid gap-4 xl:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job.title} job={job} />
      ))}
    </div>
  );
}
