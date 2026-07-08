import Link from "next/link";

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">

      {/* ── Welcome banner ── */}
      <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8">
        {/* Background glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-500/8 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 right-1/3 h-48 w-48 rounded-full bg-violet-500/6 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: greeting */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/8 bg-slate-800/60 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Dashboard</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Welcome back, Alex.
            </h1>
            <p className="max-w-lg text-sm leading-7 text-slate-400">
              Your personalized career workspace is ready. Review recommended jobs,
              update your profile, and see your AI coaching highlights.
            </p>
          </div>

          {/* Right: CTA buttons */}
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-slate-800/70 px-3 py-1.5 text-xs font-medium text-slate-300 whitespace-nowrap transition hover:bg-slate-700 hover:text-white"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to home
            </Link>
            <Link
              href="/profile"
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-slate-800 px-3 py-1.5 text-xs font-medium text-white whitespace-nowrap transition hover:bg-slate-700"
            >
              <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
              </svg>
              View profile
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 rounded-md bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white whitespace-nowrap transition hover:bg-sky-400"
            >
              Explore roles
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L21 10.5m0 0l-3.75 3.75M21 10.5H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Three info cards inside the banner ── */}
        <div className="relative mt-8 grid gap-4 sm:grid-cols-3">

          {/* Progress */}
          <div className="group rounded-xl border border-white/8 bg-slate-950/50 p-5 transition hover:border-sky-500/20">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Progress</span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">On track</span>
            </div>
            <p className="mt-3 text-5xl font-black tracking-tighter text-white">82<span className="text-2xl text-slate-500">%</span></p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-sky-500 to-violet-500" />
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Resume strength, interview prep, and role matching moving forward.
            </p>
            <Link href="/analytics" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300">
              Full report →
            </Link>
          </div>

          {/* Next step */}
          <div className="group rounded-xl border border-white/8 bg-slate-950/50 p-5 transition hover:border-violet-500/20">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Next step</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-bold text-violet-400">
                🤖 AI tip
              </span>
            </div>
            <h3 className="mt-3 text-xl font-bold leading-snug text-white">Prepare your pitch</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Use the role summary tool to align your experience with the top skills employers want.
            </p>
            <Link href="/ai-coach" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300">
              Start with AI Coach →
            </Link>
          </div>

          {/* Upcoming alerts */}
          <div className="group rounded-xl border border-white/8 bg-slate-950/50 p-5 transition hover:border-amber-500/20">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Upcoming</span>
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-400">Today</span>
            </div>
            <p className="mt-3 text-4xl font-black tracking-tighter text-white">3 <span className="text-xl font-semibold text-slate-400">alerts</span></p>
            <div className="mt-3 space-y-2">
              <Link href="/jobs" className="flex items-start gap-2 rounded-lg border border-white/5 bg-slate-900/60 px-3 py-2 transition hover:border-sky-500/20">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                <div>
                  <p className="text-xs font-semibold text-white">Review suggested roles</p>
                  <p className="text-[10px] text-slate-600">New matches based on your profile</p>
                </div>
              </Link>
              <Link href="/profile" className="flex items-start gap-2 rounded-lg border border-white/5 bg-slate-900/60 px-3 py-2 transition hover:border-sky-500/20">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                <div>
                  <p className="text-xs font-semibold text-white">Complete your skills quiz</p>
                  <p className="text-[10px] text-slate-600">Unlock stronger recommendations</p>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Resume score", value: "78", unit: "/100", sub: "+12 this week",  icon: "📄", href: "/resume",   accent: "group-hover:text-sky-400" },
          { label: "Saved jobs",   value: "14",  unit: "",    sub: "3 new matches",  icon: "🎯", href: "/jobs",     accent: "group-hover:text-violet-400" },
          { label: "AI sessions",  value: "6",   unit: "",    sub: "Last: today",    icon: "🤖", href: "/ai-coach", accent: "group-hover:text-emerald-400" },
        ].map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group flex items-center gap-4 rounded-xl border border-white/8 bg-slate-900/60 px-5 py-4 transition hover:border-white/14 hover:bg-slate-900"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800/80 text-xl transition group-hover:scale-105">{s.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{s.label}</p>
              <p className={`mt-0.5 text-2xl font-extrabold text-white transition ${s.accent}`}>
                {s.value}<span className="text-sm font-normal text-slate-500">{s.unit}</span>
              </p>
              <p className="text-[10px] text-slate-600">{s.sub}</p>
            </div>
            <svg className="h-4 w-4 text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      {/* ── Bottom row: Quick actions + Activity ── */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">

        {/* Quick actions */}
        <div className="rounded-xl border border-white/8 bg-slate-900/60 p-5">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">Quick actions</p>
          <div className="space-y-2">
            {[
              { label: "Upload & analyze resume",    href: "/resume",    icon: "📄", desc: "AI-powered optimization" },
              { label: "Browse job matches",          href: "/jobs",      icon: "🎯", desc: "Curated for your profile" },
              { label: "Chat with AI career coach",  href: "/ai-coach",  icon: "🤖", desc: "Personalized advice" },
              { label: "View skill analytics",        href: "/analytics", icon: "📊", desc: "Track your growth" },
            ].map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 transition hover:border-white/8 hover:bg-slate-800/60"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-sm transition group-hover:bg-sky-500/15">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{a.label}</p>
                  <p className="text-[10px] text-slate-600">{a.desc}</p>
                </div>
                <svg className="h-3.5 w-3.5 text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl border border-white/8 bg-slate-900/60 p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Recent activity</p>
            <span className="rounded-full border border-white/8 bg-slate-800/60 px-2 py-0.5 text-[10px] text-slate-500">Last 7 days</span>
          </div>
          <div className="space-y-1">
            {[
              { text: "Resume analyzed — ATS score improved to 78",  time: "2h ago",  dot: "bg-sky-400",     tag: "Resume",   tagColor: "text-sky-400 bg-sky-400/10 border-sky-400/20" },
              { text: "3 new job matches found for your profile",     time: "5h ago",  dot: "bg-violet-400",  tag: "Jobs",     tagColor: "text-violet-400 bg-violet-400/10 border-violet-400/20" },
              { text: "AI Coach session completed — Interview prep",  time: "1d ago",  dot: "bg-emerald-400", tag: "Coach",    tagColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
              { text: "Profile viewed by 4 recruiters",               time: "2d ago",  dot: "bg-amber-400",   tag: "Profile",  tagColor: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
              { text: "Resume template updated to Professional",      time: "3d ago",  dot: "bg-slate-400",   tag: "Resume",   tagColor: "text-slate-400 bg-slate-400/10 border-slate-400/20" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition hover:bg-slate-800/40">
                <span className={`h-2 w-2 shrink-0 rounded-full ${item.dot}`} />
                <p className="flex-1 text-xs text-slate-300">{item.text}</p>
                <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold ${item.tagColor}`}>{item.tag}</span>
                <span className="shrink-0 text-[10px] text-slate-600">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}


      {/* ── Welcome header ── */}
      <div className="rounded-3xl border border-white/8 bg-slate-900/70 px-8 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-slate-800/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-300">
              Dashboard
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              Welcome back, Alex.
            </h1>
            <p className="text-sm leading-7 text-slate-400">
              Your personalized career workspace is ready. Review recommended jobs,
              update your profile, and see your AI coaching highlights.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/profile"
              className="flex h-16 w-16 flex-col items-center justify-center rounded-full border border-white/10 bg-slate-800 text-center text-[10px] font-semibold leading-tight text-white transition hover:bg-slate-700"
            >
              View<br />profile
            </Link>
            <Link
              href="/jobs"
              className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-sky-500 text-center text-[10px] font-semibold leading-tight text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
            >
              Explore<br />roles
            </Link>
          </div>
        </div>

        {/* ── Three main cards ── */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          {/* Progress card */}
          <div className="rounded-2xl border border-white/8 bg-slate-950/60 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Progress</span>
              <span className="rounded-full bg-sky-500/20 px-2.5 py-0.5 text-xs font-semibold text-sky-300">On track</span>
            </div>
            <div>
              <p className="text-5xl font-extrabold text-white tracking-tight">82%</p>
            </div>
            {/* Gradient progress bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-violet-500"
                style={{ width: "82%" }}
              />
            </div>
            <p className="text-sm leading-6 text-slate-400">
              Resume strength, interview prep, and role matching are all moving forward.
            </p>
            <Link href="/analytics" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 transition hover:text-sky-300">
              View full report →
            </Link>
          </div>

          {/* Next step card */}
          <div className="rounded-2xl border border-white/8 bg-slate-950/60 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Next step</span>
              <span className="flex h-9 w-9 flex-col items-center justify-center rounded-full bg-slate-800 text-center text-[9px] font-bold leading-tight text-slate-300">
                AI<br />tip
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold leading-tight text-white">Prepare your pitch</h3>
            </div>
            <p className="text-sm leading-6 text-slate-400">
              Use the role summary tool to align your experience with the top skills employers want.
            </p>
            <Link href="/ai-coach" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 transition hover:text-sky-300">
              Start with AI Coach →
            </Link>
          </div>

          {/* Upcoming / alerts card */}
          <div className="rounded-2xl border border-white/8 bg-slate-950/60 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Upcoming</span>
              <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-300">Today</span>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-white">3 alerts</h3>
            </div>
            <div className="space-y-2">
              <Link
                href="/jobs"
                className="block rounded-xl border border-white/5 bg-slate-900/60 px-4 py-3 transition hover:border-sky-500/20 hover:bg-slate-900"
              >
                <p className="text-sm font-semibold text-white">Review suggested roles</p>
                <p className="mt-0.5 text-xs text-slate-500">See new matches based on your latest profile.</p>
              </Link>
              <Link
                href="/profile"
                className="block rounded-xl border border-white/5 bg-slate-900/60 px-4 py-3 transition hover:border-sky-500/20 hover:bg-slate-900"
              >
                <p className="text-sm font-semibold text-white">Complete your skills quiz</p>
                <p className="mt-0.5 text-xs text-slate-500">Unlock stronger recommendations with one quick check.</p>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── Quick stats row ── */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Resume score",  value: "78",  unit: "/100", sub: "+12 this week",  icon: "📄", href: "/resume" },
          { label: "Saved jobs",    value: "14",  unit: "",     sub: "3 new matches",  icon: "🎯", href: "/jobs" },
          { label: "AI sessions",   value: "6",   unit: "",     sub: "Last: today",    icon: "🤖", href: "/ai-coach" },
        ].map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-slate-900/70 px-5 py-4 transition hover:border-white/15 hover:bg-slate-900"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800/80 text-xl transition group-hover:scale-110">{s.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{s.label}</p>
              <p className="mt-0.5 text-2xl font-bold text-white">
                {s.value}<span className="text-sm text-slate-500">{s.unit}</span>
              </p>
              <p className="text-xs text-slate-500">{s.sub}</p>
            </div>
            <span className="text-slate-600 transition group-hover:text-slate-400">→</span>
          </Link>
        ))}
      </div>

      {/* ── Recent activity ── */}
      <div className="rounded-2xl border border-white/8 bg-slate-900/60 px-6 py-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Recent activity</h2>
          <span className="text-xs text-slate-500">Last 7 days</span>
        </div>
        <div className="space-y-4">
          {[
            { text: "Resume analyzed — ATS score improved to 78",  time: "2h ago",  dot: "bg-sky-400",     tag: "Resume" },
            { text: "3 new job matches found for your profile",     time: "5h ago",  dot: "bg-violet-400",  tag: "Jobs" },
            { text: "AI Coach session completed — Interview prep",  time: "1d ago",  dot: "bg-emerald-400", tag: "Coach" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-4">
              <span className={`h-2 w-2 shrink-0 rounded-full ${item.dot}`} />
              <p className="flex-1 text-sm text-slate-300">{item.text}</p>
              <span className="rounded-full border border-white/8 bg-slate-800/60 px-2 py-0.5 text-[10px] font-semibold text-slate-400">{item.tag}</span>
              <span className="shrink-0 text-xs text-slate-600">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

