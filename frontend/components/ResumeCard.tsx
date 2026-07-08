type ResumeCardProps = {
  title: string;
  subtitle: string;
  tags?: string[];
};

export default function ResumeCard({ title, subtitle, tags = [] }: ResumeCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5 text-white shadow-lg">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{subtitle}</p>
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
