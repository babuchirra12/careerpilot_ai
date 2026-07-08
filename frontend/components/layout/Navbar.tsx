export function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <span className="font-semibold">CareerPilot AI</span>
        <nav className="flex gap-4 text-sm text-slate-300">
          <a href="/" className="hover:text-white">Home</a>
          <a href="/login" className="hover:text-white">Login</a>
          <a href="/register" className="hover:text-white">Register</a>
        </nav>
      </div>
    </header>
  );
}
