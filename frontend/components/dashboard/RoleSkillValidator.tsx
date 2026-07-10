"use client";

import { useMemo, useState } from "react";

// ── Role definitions ───────────────────────────────────────────────────────

type Tier = "essential" | "preferred" | "nice-to-have";

interface RoleDef {
  essential: string[];
  preferred: string[];
  niceToHave: string[];
}

export const ROLE_DEFINITIONS: Record<string, RoleDef> = {
  "Frontend Developer": {
    essential: ["JavaScript", "TypeScript", "React", "HTML", "CSS"],
    preferred: ["Next.js", "Tailwind CSS", "REST", "Git", "Webpack/Vite"],
    niceToHave: ["Jest/Cypress", "GraphQL", "Redux", "Accessibility", "Performance"],
  },
  "Java Backend Developer": {
    essential: ["Java", "Spring Boot", "REST", "PostgreSQL/MySQL/SQL", "Maven/Gradle"],
    preferred: ["JPA/Hibernate", "JUnit", "Git", "Microservices", "Docker"],
    niceToHave: ["Kafka/RabbitMQ", "Redis", "Spring Security", "Elasticsearch"],
  },
  "Full Stack Developer": {
    essential: ["JavaScript/TypeScript", "React/Vue/Angular", "Node.js/Java/Python", "SQL", "REST"],
    preferred: ["Git", "Docker", "CSS", "Testing", "CI/CD"],
    niceToHave: ["AWS/Azure/GCP", "GraphQL", "Redis", "Kubernetes"],
  },
  "Python Developer": {
    essential: ["Python", "Django/Flask/FastAPI", "REST", "PostgreSQL/MySQL/SQL", "Git"],
    preferred: ["Docker", "Celery", "Testing", "Linux", "ORM"],
    niceToHave: ["Redis", "AWS/GCP", "Kubernetes", "Asyncio", "Nginx"],
  },
  "Data Scientist": {
    essential: ["Python", "Machine Learning", "Statistics", "Pandas", "SQL"],
    preferred: ["NumPy", "Scikit-learn", "Data Visualization", "Jupyter", "R"],
    niceToHave: ["Deep Learning", "TensorFlow/PyTorch", "Spark", "Tableau", "Airflow"],
  },
  "DevOps Engineer": {
    essential: ["Docker", "Kubernetes", "CI/CD", "Linux", "Git"],
    preferred: ["AWS/Azure/GCP", "Terraform", "Prometheus/Grafana", "Ansible", "Bash"],
    niceToHave: ["Jenkins", "Istio", "Security", "Cost Optimization", "Helm"],
  },
  "React Native Developer": {
    essential: ["React Native", "JavaScript", "TypeScript", "iOS", "Android"],
    preferred: ["Redux", "REST", "Git", "Expo", "Navigation"],
    niceToHave: ["Native Modules", "App Store", "Jest/Detox", "Firebase", "Push Notifications"],
  },
  "Product Manager": {
    essential: ["Product Strategy", "Roadmapping", "Stakeholder Management", "Agile/Scrum"],
    preferred: ["Data Analysis", "User Research", "JIRA", "A/B Testing", "Analytics"],
    niceToHave: ["SQL", "Figma", "OKRs", "Metrics", "Competitor Analysis"],
  },
  "Cloud Engineer": {
    essential: ["AWS/Azure/GCP", "Docker", "Networking", "Linux", "Infrastructure as Code"],
    preferred: ["Kubernetes", "Terraform", "Security", "CI/CD", "Monitoring"],
    niceToHave: ["Serverless", "Cost Optimization", "Multi-cloud", "Istio"],
  },
  "Node.js Developer": {
    essential: ["Node.js", "JavaScript", "TypeScript", "REST", "SQL/NoSQL"],
    preferred: ["Express/Fastify", "PostgreSQL/MongoDB", "Git", "Docker", "Testing"],
    niceToHave: ["GraphQL", "Redis", "Kafka/RabbitMQ", "AWS/GCP", "Kubernetes"],
  },
};

export const ROLE_NAMES = Object.keys(ROLE_DEFINITIONS);

// ── Skill matching ─────────────────────────────────────────────────────────

/**
 * Match one required skill (which may be "A/B/C" alternatives) against a user's skill string.
 * Length guard >= 5 prevents short tokens like "java" from matching "javascript".
 */
function matchSkill(userSkill: string, requiredSkill: string): boolean {
  const user = userSkill.toLowerCase().trim();
  const alternatives = requiredSkill.split("/").map((s) => s.trim().toLowerCase());

  return alternatives.some((alt) => {
    if (user === alt) return true;
    if (alt.length >= 5 && user.includes(alt)) return true;
    if (user.length >= 5 && alt.includes(user)) return true;
    return false;
  });
}

function hasSkill(
  userSkills: string[],
  requiredSkill: string
): boolean {
  return userSkills.some((us) => matchSkill(us, requiredSkill));
}

// ── Sub-components ─────────────────────────────────────────────────────────

const tierStyle: Record<Tier, { pill: string; label: string }> = {
  essential: {
    pill: "bg-red-500/10 text-red-300 border border-red-500/25",
    label: "Essential",
  },
  preferred: {
    pill: "bg-amber-500/10 text-amber-300 border border-amber-500/25",
    label: "Preferred",
  },
  "nice-to-have": {
    pill: "bg-slate-700/60 text-slate-400 border border-slate-600/30",
    label: "Nice",
  },
};

function SkillRow({
  skill,
  present,
  tier,
}: {
  skill: string;
  present: boolean;
  tier: Tier;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 ${
        present ? "bg-emerald-500/5" : "bg-slate-800/40"
      }`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="shrink-0 text-sm">{present ? "✅" : "❌"}</span>
        <span
          className={`truncate text-sm font-medium ${
            present ? "text-slate-200" : "text-slate-500"
          }`}
        >
          {skill}
        </span>
      </div>
      <span
        className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${tierStyle[tier].pill}`}
      >
        {tierStyle[tier].label}
      </span>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

interface Props {
  skills: { technical: string[]; soft: string[]; missing: string[] };
  /** Pre-select this role on mount (ignored if not in ROLE_DEFINITIONS) */
  initialRole?: string;
}

const fitMeta = {
  strong: { label: "Strong Fit ✅", cls: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
  good:   { label: "Good Fit 👍",   cls: "text-sky-400 bg-sky-500/10 border-sky-500/30" },
  fair:   { label: "Fair Fit ⚠️",   cls: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
  weak:   { label: "Weak Fit ❌",   cls: "text-red-400 bg-red-500/10 border-red-500/30" },
};

export default function RoleSkillValidator({ skills, initialRole }: Props) {
  // normalise initialRole to a known key
  const resolvedInitial = initialRole
    ? ROLE_NAMES.find(
        (n) => n.toLowerCase() === initialRole.toLowerCase()
      ) ?? ""
    : "";

  const [selectedRole, setSelectedRole] = useState<string>(resolvedInitial);

  const allUserSkills = useMemo(
    () => [...skills.technical, ...skills.soft],
    [skills]
  );

  const result = useMemo(() => {
    const def = ROLE_DEFINITIONS[selectedRole];
    if (!def) return null;

    const essential = def.essential.map((s) => ({
      skill: s,
      present: hasSkill(allUserSkills, s),
      tier: "essential" as Tier,
    }));
    const preferred = def.preferred.map((s) => ({
      skill: s,
      present: hasSkill(allUserSkills, s),
      tier: "preferred" as Tier,
    }));
    const nice = def.niceToHave.map((s) => ({
      skill: s,
      present: hasSkill(allUserSkills, s),
      tier: "nice-to-have" as Tier,
    }));

    const all = [...essential, ...preferred, ...nice];
    const presentCount = all.filter((s) => s.present).length;
    const matchScore = Math.round((presentCount / all.length) * 100);

    const essentialPresent = essential.filter((s) => s.present).length;

    const fitLevel: keyof typeof fitMeta =
      matchScore >= 75
        ? "strong"
        : matchScore >= 55
        ? "good"
        : matchScore >= 35
        ? "fair"
        : "weak";

    const topGaps = all
      .filter((s) => !s.present && s.tier !== "nice-to-have")
      .slice(0, 6)
      .map((s) => s.skill);

    return {
      essential,
      preferred,
      nice,
      matchScore,
      essentialPresent,
      essentialTotal: essential.length,
      fitLevel,
      topGaps,
      presentCount,
      totalCount: all.length,
    };
  }, [selectedRole, allUserSkills]);

  return (
    <div className="rounded-2xl border border-white/8 bg-slate-900 p-5 space-y-5">
      {/* Header */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          Role Skill Validator
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">
          Select a target role to see which required skills your resume covers and what's missing.
        </p>
      </div>

      {/* Role chips */}
      <div className="flex flex-wrap gap-2">
        {ROLE_NAMES.map((role) => (
          <button
            key={role}
            onClick={() =>
              setSelectedRole((prev) => (prev === role ? "" : role))
            }
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              selectedRole === role
                ? "bg-sky-500 text-white shadow shadow-sky-500/20"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Results */}
      {result ? (
        <div className="space-y-4">
          {/* Score bar + fit badge */}
          <div className="rounded-xl border border-white/8 bg-slate-800/50 p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-4">
              {/* Match % */}
              <div className="text-center">
                <p
                  className={`text-4xl font-extrabold ${
                    result.matchScore >= 75
                      ? "text-emerald-400"
                      : result.matchScore >= 55
                      ? "text-sky-400"
                      : result.matchScore >= 35
                      ? "text-amber-400"
                      : "text-red-400"
                  }`}
                >
                  {result.matchScore}%
                </p>
                <p className="text-xs text-slate-500">Skill Match</p>
              </div>

              <div className="h-10 w-px bg-slate-700 hidden sm:block" />

              {/* Essential count */}
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {result.essentialPresent}
                  <span className="text-sm text-slate-500">/{result.essentialTotal}</span>
                </p>
                <p className="text-xs text-slate-500">Essential Skills</p>
              </div>

              <div className="h-10 w-px bg-slate-700 hidden sm:block" />

              {/* Fit badge */}
              <div
                className={`rounded-xl border px-4 py-2 ${fitMeta[result.fitLevel].cls}`}
              >
                <p className="text-sm font-bold">{fitMeta[result.fitLevel].label}</p>
                <p className="text-xs opacity-70">{selectedRole}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="mb-1 flex justify-between text-xs text-slate-500">
                <span>Skill coverage</span>
                <span className="font-medium text-white">
                  {result.presentCount}/{result.totalCount} matched
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-700">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    result.matchScore >= 75
                      ? "bg-emerald-500"
                      : result.matchScore >= 55
                      ? "bg-sky-500"
                      : result.matchScore >= 35
                      ? "bg-amber-400"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${result.matchScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Top gaps callout */}
          {result.topGaps.length > 0 && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                ⚡ Priority Skills to Add
              </p>
              <div className="flex flex-wrap gap-1.5">
                {result.topGaps.map((g) => (
                  <span
                    key={g}
                    className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-300"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Skill breakdown — 3 columns */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Essential */}
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-red-400">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 inline-block" />
                Essential
              </p>
              <div className="space-y-1.5">
                {result.essential.map((s) => (
                  <SkillRow key={s.skill} skill={s.skill} present={s.present} tier={s.tier} />
                ))}
              </div>
            </div>

            {/* Preferred */}
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 inline-block" />
                Preferred
              </p>
              <div className="space-y-1.5">
                {result.preferred.map((s) => (
                  <SkillRow key={s.skill} skill={s.skill} present={s.present} tier={s.tier} />
                ))}
              </div>
            </div>

            {/* Nice to Have */}
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500 inline-block" />
                Nice to Have
              </p>
              <div className="space-y-1.5">
                {result.nice.map((s) => (
                  <SkillRow key={s.skill} skill={s.skill} present={s.present} tier={s.tier} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="py-6 text-center text-sm text-slate-600">
          Select a role above to validate your skills against its requirements.
        </p>
      )}
    </div>
  );
}
