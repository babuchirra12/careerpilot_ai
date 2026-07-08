type Props = {
  params: Promise<{ jobId: string }>;
};

export default async function JobDetailPage({ params }: Props) {
  const { jobId } = await params;

  return (
    <main className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_40px_80px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <span className="inline-flex rounded-full bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
                Role details
              </span>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                {jobId.replace(/-/g, " ")}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                A deep-dive view of this role, including responsibilities, team impact, and how it aligns with your career path.
              </p>
            </div>
            <a
              href="/jobs"
              className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/85 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:border-sky-400 hover:bg-slate-900"
            >
              Back to roles
            </a>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            <section className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Company</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Lumina Labs</h2>
              <p className="mt-4 text-sm text-slate-400">AI-first team building intelligent career products for modern teams.</p>
              <div className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-300">
                <span className="rounded-full bg-slate-900/90 px-3 py-1">Remote</span>
                <span className="rounded-full bg-slate-900/90 px-3 py-1">Senior</span>
                <span className="rounded-full bg-slate-900/90 px-3 py-1">AI</span>
              </div>
            </section>

            <section className="xl:col-span-2 rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Role summary</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Senior Product Manager, AI Platform</h2>
                </div>
                <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-200">Score 9.2</span>
              </div>

              <div className="mt-6 space-y-5 text-sm leading-7 text-slate-400">
                <p>
                  Lead cross-functional product initiatives for AI platform innovations, working closely with engineering, research, and go-to-market teams to shape product strategy and roadmap.
                </p>
                <div className="rounded-3xl bg-slate-900/90 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Why this role fits</p>
                  <p className="mt-3 text-slate-200">
                    Strong match if you want to combine AI product vision with measurable business outcomes and help teams scale intelligent hiring solutions.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <section className="mt-8 rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Key responsibilities</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-400">
                  <li>Define product strategy and roadmap for AI-based career solutions.</li>
                  <li>Partner with design and research to deliver user-first experiences.</li>
                  <li>Measure and iterate on product performance with data-driven metrics.</li>
                </ul>
              </div>
              <div className="rounded-3xl bg-slate-900/90 p-5 text-sm text-slate-300">
                <p className="font-semibold text-white">Location</p>
                <p className="mt-2">Remote</p>
                <p className="mt-4 font-semibold text-white">Team</p>
                <p className="mt-2">Product & AI</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
