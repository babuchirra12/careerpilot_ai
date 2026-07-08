type Skill = { name: string; value: number };

export default function SkillBars({
  skills,
  total,
}: {
  skills: Skill[];
  total: number;
}) {
  if (!skills || skills.length === 0) {
    return <div className="text-sm text-slate-400">No skill data available</div>;
  }

  return (
    <div className="space-y-3">
      {skills.map((s) => {
        const pct = Math.round((s.value / total) * 100);
        return (
          <div key={s.name}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <div className="font-medium">{s.name}</div>
              <div className="text-slate-400">{pct}%</div>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-800">
              <div
                className="h-3 rounded-full bg-emerald-400"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
