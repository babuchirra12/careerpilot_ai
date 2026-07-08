import AnalyticsPanel from "../../../components/AnalyticsPanel";

const sampleSkills = [
  { name: "AI", value: 40 },
  { name: "Data Visualization", value: 25 },
  { name: "Product Strategy", value: 20 },
  { name: "Leadership", value: 15 },
];

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_40px_80px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Analytics</h1>
              <p className="mt-1 text-sm text-slate-400">Skill-level breakdown and simple charts for your profile.</p>
            </div>
          </div>

          <div className="mt-6">
            <AnalyticsPanel skills={sampleSkills} />
          </div>
        </div>
      </div>
    </main>
  );
}
