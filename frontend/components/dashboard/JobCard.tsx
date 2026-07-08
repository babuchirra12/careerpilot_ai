import Link from "next/link";

export default function JobCard({ job }: { job: any }) {
  const slug = encodeURIComponent(
    job.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  );

  return (
    <article className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.25)] transition duration-200 hover:-translate-y-1 hover:border-sky-400/30">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{job.company}</p>
          <h2 className="mt-3 text-xl font-semibold text-white">{job.title}</h2>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">{job.score}</span>
      </div>
      <p className="mt-4 text-sm text-slate-400">{job.location} · {job.level}</p>
      <div className="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-300">
        {job.tags.map((tag: string) => (
          <span key={tag} className="rounded-full bg-slate-900/90 px-3 py-1">{tag}</span>
        ))}
      </div>
      <Link href={`/jobs/${slug}`} className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-sky-400">
        View role
      </Link>
    </article>
  );
}
