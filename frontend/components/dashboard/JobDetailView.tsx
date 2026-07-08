export default function JobDetailView({ job }: { job: any }) {
  return (
    <div>
      <div className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Role summary</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{job.title}</h2>
          </div>
          <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-200">Score {job.score}</span>
        </div>

        <div className="mt-6 space-y-5 text-sm leading-7 text-slate-400">
          <p>{job.summary}</p>
          <div className="rounded-3xl bg-slate-900/90 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Why this role fits</p>
            <p className="mt-3 text-slate-200">{job.matchReason}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
