export function Sidebar() {
  return (
    <aside className="w-64 rounded-2xl border border-white/10 bg-white/10 p-4">
      <h3 className="font-semibold">Navigation</h3>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        <li><a href="/resume">Resume</a></li>
        <li><a href="/jobs">Jobs</a></li>
        <li><a href="/ai-coach">AI Coach</a></li>
        <li><a href="/profile">Profile</a></li>
      </ul>
    </aside>
  );
}
