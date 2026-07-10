import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">

      {/* ── Navbar ── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png"
              alt="CareerPilot AI"
              width={100}
              height={100}
              priority
              className="h-12 w-12 object-contain"
            />
            {/* <span className="text-lg font-bold tracking-tight text-white">CareerPilot <span className="text-sky-400">AI</span></span> */}
          </Link>

          {/* Nav links */}
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-slate-400 transition hover:text-white">Features</a>
            <a href="#how-it-works" className="text-sm text-slate-400 transition hover:text-white">How it works</a>
            <a href="#stats" className="text-sm text-slate-400 transition hover:text-white">Why CareerPilot</a>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white">
              Log in
            </Link>
            <Link href="/register" className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400">
              Get started free
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[600px] rounded-full bg-sky-500/10 blur-[120px]" />
        </div>
        <div className="pointer-events-none absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-violet-500/8 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-300">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
            AI-Powered Career Platform
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Land your dream job<br />
            <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
              10× faster with AI
            </span>
          </h1>

          {/* Subtext */}
          <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-400">
            CareerPilot AI analyzes your resume, matches you with curated job opportunities, and
            provides personalized coaching — all in one intelligent platform built for modern job seekers.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="rounded-full bg-sky-500 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-sky-500/25 transition hover:bg-sky-400 hover:shadow-sky-400/30"
            >
              Start for free →
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-slate-700 px-8 py-3.5 text-base font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              Sign in to your account
            </Link>
          </div>

          {/* Social proof */}
          <p className="text-xs text-slate-600">
            No credit card required &nbsp;·&nbsp; Free forever plan available &nbsp;·&nbsp; 2 min setup
          </p>
        </div>

        {/* Dashboard preview card */}
        <div className="relative z-10 mx-auto mt-20 w-full max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-2 border-b border-white/5 bg-slate-900/80 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-4 text-xs text-slate-500">careerpilot.ai / dashboard</span>
            </div>
            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="col-span-1 space-y-3">
                <div className="h-4 w-24 rounded-full bg-slate-800" />
                <div className="h-3 w-full rounded-full bg-slate-800/70" />
                <div className="h-3 w-4/5 rounded-full bg-slate-800/70" />
                <div className="mt-4 h-24 rounded-xl bg-sky-500/10 border border-sky-500/20 p-3">
                  <div className="h-3 w-16 rounded-full bg-sky-400/40" />
                  <div className="mt-2 h-8 w-8 rounded-lg bg-sky-400/20" />
                </div>
              </div>
              <div className="col-span-2 space-y-3">
                <div className="h-4 w-32 rounded-full bg-slate-800" />
                <div className="grid grid-cols-2 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="rounded-xl border border-white/5 bg-slate-800/50 p-3 space-y-2">
                      <div className="h-3 w-20 rounded-full bg-slate-700" />
                      <div className="h-5 w-12 rounded-full bg-sky-400/20" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-28 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-400">Features</p>
            <h2 className="text-4xl font-bold text-white">Everything you need to get hired</h2>
            <p className="mt-4 text-slate-400">A complete toolkit from resume to offer letter.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "📄",
                title: "AI Resume Analysis",
                desc: "Instant feedback on your resume with ATS score, keyword gaps, and improvement suggestions.",
                color: "sky",
              },
              {
                icon: "🎯",
                title: "Smart Job Matching",
                desc: "Discover roles curated to your skills, career stage, and location preferences.",
                color: "violet",
              },
              {
                icon: "🤖",
                title: "AI Career Coach",
                desc: "Chat with your personal AI coach for interview prep, career advice, and goal planning.",
                color: "emerald",
              },
              {
                icon: "📊",
                title: "Career Analytics",
                desc: "Track application progress, skill growth, and market demand for your profile.",
                color: "amber",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-white/5 bg-slate-900/60 p-6 transition duration-300 hover:border-white/10 hover:bg-slate-900"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-2xl transition group-hover:scale-110">
                  {f.icon}
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">{f.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-28 px-6 bg-slate-900/40">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-400">Process</p>
            <h2 className="text-4xl font-bold text-white">Three steps to your next role</h2>
          </div>

          <div className="relative grid gap-12 md:grid-cols-3">
            {/* Connector line */}
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent md:block" />

            {[
              { step: "01", title: "Create your profile", desc: "Sign up and upload your resume. Our AI parses it instantly and builds your career profile." },
              { step: "02", title: "Get matched to jobs", desc: "Browse AI-curated job listings tailored to your skills, stage, and location." },
              { step: "03", title: "Apply with confidence", desc: "Use AI coaching, optimized resumes, and interview prep to land the offer." },
            ].map((s) => (
              <div key={s.step} className="relative text-center">
                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-sky-400/30 bg-sky-400/10 text-sm font-bold text-sky-400">
                  {s.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{s.title}</h3>
                <p className="text-sm leading-7 text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section id="stats" className="py-28 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-400">Why CareerPilot</p>
            <h2 className="text-4xl font-bold text-white">Trusted by job seekers worldwide</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "50K+", label: "Active job seekers" },
              { value: "3.2×", label: "More interview calls" },
              { value: "10K+", label: "Jobs matched daily" },
              { value: "94%", label: "User satisfaction" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/5 bg-slate-900/60 p-6 text-center">
                <p className="text-4xl font-extrabold text-sky-400">{s.value}</p>
                <p className="mt-2 text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-sky-400/20 bg-gradient-to-br from-sky-500/10 via-violet-500/5 to-transparent p-12 text-center shadow-2xl shadow-sky-500/5">
          <h2 className="text-4xl font-bold text-white">Ready to accelerate your career?</h2>
          <p className="mt-4 text-slate-400">Join thousands of professionals using CareerPilot AI to land better jobs, faster.</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="rounded-full bg-sky-500 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-sky-500/25 transition hover:bg-sky-400"
            >
              Create your free account →
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
             <Image  src="/logo.png"
                       alt="CareerPilot AI"
                       width={50}
                       height={50}
                       priority
                       className="h-12 w-12 object-contain"
                     />
            <span className="text-sm font-semibold text-white">CareerPilot AI</span>
          </div>
          <p className="text-xs text-slate-600">© 2026 CareerPilot AI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/login" className="text-xs text-slate-500 transition hover:text-white">Log in</Link>
            <Link href="/register" className="text-xs text-slate-500 transition hover:text-white">Sign up</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
