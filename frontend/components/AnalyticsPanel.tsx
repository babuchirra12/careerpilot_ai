import SkillBars from "./charts/SkillBars";

type AnalyticsPanelProps = {
  title?: string;
  skills?: { name: string; value: number }[];
};

export default function AnalyticsPanel({
  title = "Analytics",
  skills = [],
}: AnalyticsPanelProps) {
  const total = skills.reduce((s, k) => s + k.value, 0) || 1;

  return (
    <section className="rounded-2xl border border-white/8 bg-slate-950/90 p-5 text-white shadow">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="text-sm text-slate-400">Skills overview</div>
      </div>

      <div className="space-y-4">
        <SkillBars skills={skills} total={total} />
      </div>
    </section>
  );
}
