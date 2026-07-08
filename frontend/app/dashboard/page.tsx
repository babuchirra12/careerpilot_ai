import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_40px_80px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <span className="inline-flex rounded-full bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
                Dashboard
              </span>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                  Welcome back, Alex.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                  Your personalized career workspace is ready. Review recommended jobs, update your profile, and see your AI coaching highlights.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:auto-cols-min sm:grid-flow-col">
              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/85 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:border-sky-400 hover:bg-slate-900"
              >
                View profile
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-sky-400"
              >
                Explore roles
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            <section className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Progress</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">82%</h2>
                </div>
                <div className="rounded-2xl bg-sky-500/10 px-3 py-2 text-xs font-semibold text-sky-200">
                  On track
                </div>
              </div>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />
              </div>
              <p className="mt-4 text-sm text-slate-400">
                Resume strength, interview prep, and role matching are all moving forward.
              </p>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Next step</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Prepare your pitch</h2>
                </div>
                <div className="rounded-2xl bg-indigo-500/10 px-3 py-2 text-xs font-semibold text-indigo-200">
                  AI tip
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-400">
                Use the role summary tool to align your experience with the top skills employers want.
              </p>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Upcoming</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">3 alerts</h2>
                </div>
                <div className="rounded-2xl bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300">
                  Today
                </div>
              </div>
              <ul className="mt-5 space-y-4 text-sm text-slate-400">
                <li className="rounded-2xl bg-slate-900/90 p-4">
                  <p className="font-medium text-white">Review suggested roles</p>
                  <p className="mt-1 text-slate-400">See new matches based on your latest profile.</p>
                </li>
                <li className="rounded-2xl bg-slate-900/90 p-4">
                  <p className="font-medium text-white">Complete your skills quiz</p>
                  <p className="mt-1 text-slate-400">Unlock stronger recommendations with one quick check.</p>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
