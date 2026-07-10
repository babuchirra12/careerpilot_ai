import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8081";

// ── Comprehensive AI prompt ────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are CareerPilot AI, an advanced AI Resume Analyzer, ATS Expert, and Career Coach.

Analyze ONLY the provided resume. Return ONLY valid JSON. No markdown. No explanation outside JSON.

###############################
CORE RULES
###############################
1. NEVER generate fake information.
2. NEVER use sample names, sample projects, or sample companies.
3. NEVER use hardcoded scores. Every score must be calculated from the actual resume.
4. NEVER assume experience not explicitly mentioned.
5. If information is missing return null or [].
6. Do not guess missing values.
7. Every resume must produce different results.
8. Return ONLY valid JSON.
9. All recommendations must reference actual resume content.

###############################
USER VALIDATION
###############################
Compare the loggedInUser credentials (name, email, phone) with the contact info extracted from the resume.
- If name matches → ownerMatched: true, confidence: HIGH
- If email matches → ownerMatched: true, confidence: HIGH
- If phone matches → ownerMatched: true, confidence: MEDIUM
- If none match → ownerMatched: false, confidence: HIGH, warning: "The uploaded resume appears to belong to another person."
Do NOT stop analysis if owner does not match. Always continue.

###############################
SCORING GUIDELINES
###############################
overallScore (0-100): weighted across ATS, skills, experience, projects, grammar, formatting, achievements, education, keywords.
atsScore (0-100): standard headings present, email + phone present, uses bullet points, no tables/images/columns, appropriate length (1-2 pages), no fancy fonts.
Section scores (each 0-10): contact, summary, skills, education, experience, projects, certifications, formatting.

###############################
RETURN THIS EXACT JSON
###############################
{
  "ownerValidation": {
    "ownerMatched": true,
    "confidence": "HIGH",
    "warning": ""
  },
  "candidate": {
    "name": null,
    "email": null,
    "phone": null,
    "linkedin": null,
    "github": null,
    "portfolio": null,
    "address": null
  },
  "overallScore": 0,
  "atsScore": 0,
  "atsFeedback": [],
  "sections": [
    { "name": "Contact", "score": 0, "maxScore": 10 },
    { "name": "Summary", "score": 0, "maxScore": 10 },
    { "name": "Skills", "score": 0, "maxScore": 10 },
    { "name": "Education", "score": 0, "maxScore": 10 },
    { "name": "Experience", "score": 0, "maxScore": 10 },
    { "name": "Projects", "score": 0, "maxScore": 10 },
    { "name": "Certifications", "score": 0, "maxScore": 10 },
    { "name": "Formatting", "score": 0, "maxScore": 10 }
  ],
  "skills": {
    "technical": [],
    "soft": [],
    "missing": []
  },
  "keywords": {
    "found": 0,
    "missing": 0,
    "matchScore": 0
  },
  "experience": {
    "totalYears": "0",
    "relevantYears": "0",
    "feedback": []
  },
  "projects": [
    {
      "name": "",
      "stars": 0,
      "techStack": [],
      "feedback": []
    }
  ],
  "education": {
    "degree": null,
    "college": null,
    "university": null,
    "cgpa": null,
    "percentage": null,
    "graduationYear": null
  },
  "certifications": [
    {
      "certification": "",
      "organization": null,
      "date": null
    }
  ],
  "formatting": {
    "score": 0,
    "suggestions": []
  },
  "grammar": {
    "grammarScore": 0,
    "spellingScore": 0,
    "readabilityScore": 0
  },
  "actionVerbs": {
    "good": [],
    "suggestions": []
  },
  "achievements": [],
  "missingInfo": [],
  "strengths": [],
  "weaknesses": [],
  "recommendations": [],
  "recruiterReadiness": {
    "interviewReady": false,
    "recruiterAppeal": 0,
    "atsFriendly": false,
    "recommendedRoles": [],
    "confidence": "MEDIUM",
    "reason": ""
  }
}

Fill every field using ONLY information present in the resume. Replace 0 / null / [] with real calculated values.`;

function buildUserMessage(
  resumeText: string,
  jobDescription: string,
  userName: string,
  userEmail: string,
  userPhone: string
): string {
  return `Logged In User:
Name: ${userName || "Unknown"}
Email: ${userEmail || "Unknown"}
Phone: ${userPhone || "Unknown"}

Resume:
${resumeText}

Job Description:
${jobDescription || "Not provided — base missing skills on the role inferred from the resume."}

Analyze the resume above. Return ONLY the JSON.`.trim();
}

// ── Normalize raw AI output to match ResumeAnalysis shape ─────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeAnalysis(raw: Record<string, any>): Record<string, unknown> {
  const out = { ...raw };

  // sectionScores object → sections array (alternate shape some models return)
  if (raw.sectionScores && !Array.isArray(raw.sections)) {
    out.sections = Object.entries(raw.sectionScores).map(
      ([name, val]: [string, unknown]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        score: typeof val === "object" && val !== null ? ((val as Record<string, number>).score ?? 5) : (val as number),
        maxScore: typeof val === "object" && val !== null ? ((val as Record<string, number>).max ?? 10) : 10,
      })
    );
  }

  // missingInformation → missingInfo
  if (raw.missingInformation && !raw.missingInfo) {
    out.missingInfo = raw.missingInformation;
  }

  // recruiterReadiness score field aliases
  if (raw.recruiterReadiness) {
    const rr = raw.recruiterReadiness as Record<string, unknown>;
    out.recruiterReadiness = {
      ...rr,
      recruiterAppeal:
        (rr.recruiterAppeal as number) ??
        (rr.recruiterScore as number) ??
        (rr.score as number) ??
        0,
    };
  }

  // keywords: if the AI returned a string ("Not Available") normalize it
  if (typeof raw.keywords === "string") {
    out.keywords = { found: 0, missing: 0, matchScore: 0 };
  }

  // Ensure arrays are always arrays
  out.sections = Array.isArray(out.sections) ? out.sections : [];
  out.atsFeedback = Array.isArray(out.atsFeedback) ? out.atsFeedback : [];
  out.certifications = Array.isArray(out.certifications) ? out.certifications : [];
  out.achievements = Array.isArray(out.achievements) ? out.achievements : [];
  out.strengths = Array.isArray(out.strengths) ? out.strengths : [];
  out.weaknesses = Array.isArray(out.weaknesses) ? out.weaknesses : [];
  out.recommendations = Array.isArray(out.recommendations) ? out.recommendations : [];
  out.missingInfo = Array.isArray(out.missingInfo) ? out.missingInfo : [];

  return out;
}

// ── Route handler ─────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({})) as Record<string, string>;
    const {
      resumeText = "",
      targetRole = "",
      jobDescription = "",
      userName = "",
      userEmail = "",
      userPhone = "",
    } = body;

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: "Resume text is too short or missing." },
        { status: 400 }
      );
    }

    const jd = jobDescription || targetRole;

    // ── 1. Try OpenAI ─────────────────────────────────────────────────────
    if (OPENAI_API_KEY) {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              {
                role: "user",
                content: buildUserMessage(resumeText, jd, userName, userEmail, userPhone),
              },
            ],
            max_tokens: 3500,
            temperature: 0.2,
            response_format: { type: "json_object" },
          }),
        });

        if (res.ok) {
          const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
          const raw = data.choices?.[0]?.message?.content ?? "{}";
          const parsed = JSON.parse(raw) as Record<string, unknown>;
          const normalized = normalizeAnalysis(parsed);
          return NextResponse.json({ analysis: normalized });
        }
      } catch {
        // fall through to Java backend
      }
    }

    // ── 2. Try Java backend ───────────────────────────────────────────────
    try {
      const token = request.headers.get("Authorization");
      const res = await fetch(`${BACKEND_URL}/api/ai/resume/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
        body: JSON.stringify({ resumeText, targetRole: jd, userName, userEmail }),
      });
      if (res.ok) {
        return NextResponse.json(await res.json());
      }
    } catch {
      // fall through
    }

    // ── 3. No AI available ────────────────────────────────────────────────
    return NextResponse.json(
      { error: "AI service unavailable. Please add OPENAI_API_KEY to your environment." },
      { status: 503 }
    );
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
