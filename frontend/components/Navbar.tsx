export default function Navbar() {
  return (
    <nav className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/90 px-5 py-4 text-sm text-white shadow-lg">
      <div className="font-semibold">CareerPilot AI</div>
      <div className="flex items-center gap-4">
        <a href="/dashboard" className="hover:text-sky-300">Dashboard</a>
        <a href="/resume" className="hover:text-sky-300">Resume</a>
        <a href="/jobs" className="hover:text-sky-300">Jobs</a>
        <a href="/ai" className="hover:text-sky-300">AI</a>
      </div>
    </nav>
  );
}
