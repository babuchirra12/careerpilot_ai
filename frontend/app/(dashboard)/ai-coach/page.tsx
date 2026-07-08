import AICoachPanel from "../../../components/dashboard/AICoachPanel";

export default function AiCoachPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_40px_80px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:p-8">
          <AICoachPanel />
        </div>
      </div>
    </main>
  );
}
