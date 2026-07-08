import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row">

      {/* ── Left branding panel (desktop only) ── */}
      <div className="relative hidden lg:flex lg:w-[46%] flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-12">
        {/* Glow blobs */}
        <div className="pointer-events-none absolute -left-24 top-1/4 h-[400px] w-[400px] rounded-full bg-sky-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-[90px]" />

        {/* Logo + back */}
        <Link href="/" className="relative z-10 flex items-center gap-2 w-fit">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-sm font-bold text-white shadow-lg shadow-sky-500/30">CP</span>
          <span className="text-lg font-bold tracking-tight text-white">CareerPilot <span className="text-sky-400">AI</span></span>
        </Link>

        {/* Tagline */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight text-white">
              Your career,<br />
              <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
                supercharged by AI
              </span>
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              Join thousands of professionals who use CareerPilot AI to land better jobs, faster.
            </p>
          </div>

          {/* Feature bullets */}
          <ul className="space-y-4">
            {[
              { icon: "📄", text: "AI-powered resume analysis & optimization" },
              { icon: "🎯", text: "Curated job matches based on your profile" },
              { icon: "🤖", text: "Personal AI career coach, always available" },
              { icon: "📊", text: "Track applications & skill growth analytics" },
            ].map((f) => (
              <li key={f.text} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800/80 text-base">
                  {f.icon}
                </span>
                {f.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10 rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm">
          <p className="text-sm italic leading-6 text-slate-300">
            "CareerPilot AI helped me land 3× more interviews in just two weeks. The AI coach is a game changer."
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/20 text-xs font-bold text-sky-300">AM</div>
            <div>
              <p className="text-xs font-semibold text-white">Alex Morgan</p>
              <p className="text-xs text-slate-500">Software Engineer · Hired at Google</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="relative flex flex-1 flex-col">
        {/* Top bar: mobile-only logo linking back to home */}
        <div className="flex items-center justify-between px-6 py-5 lg:hidden">
          <Link href="/" className="group flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white">
            <span className="transition group-hover:-translate-x-0.5">←</span>
            Home
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500 text-xs font-bold text-white">CP</span>
            <span className="text-sm font-bold text-white">CareerPilot <span className="text-sky-400">AI</span></span>
          </Link>
        </div>

        {/* Centered form */}
        <div className="flex flex-1 items-center justify-center px-4 py-8">
          {children}
        </div>
      </div>

    </div>
  );
}
