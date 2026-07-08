export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-sm space-y-4 rounded-2xl border border-white/10 bg-white/10 p-8 text-center shadow-xl backdrop-blur">
        <div className="mx-auto h-3 w-24 animate-pulse rounded-full bg-sky-400/70" />
        <div className="mx-auto h-3 w-32 animate-pulse rounded-full bg-slate-400/50" />
        <div className="mx-auto h-3 w-20 animate-pulse rounded-full bg-slate-400/40" />
      </div>
    </main>
  );
}
