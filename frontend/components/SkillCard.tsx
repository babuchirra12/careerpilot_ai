type SkillCardProps = {
  skill: string;
  level?: string;
};

export default function SkillCard({ skill, level = "Intermediate" }: SkillCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-white shadow-lg">
      <div className="text-sm font-semibold">{skill}</div>
      <div className="mt-2 text-xs text-slate-400">{level}</div>
    </div>
  );
}
