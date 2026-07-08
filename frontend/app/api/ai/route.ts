import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8081";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const SYSTEM_PROMPT = `You are CareerPilot AI, an expert career coach. You help users with resume review, interview preparation, job search strategy, and career path advice. Be concise, actionable, and encouraging.`;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { message, action } = body as { message?: string; action?: string };

  // Use OpenAI if configured
  if (OPENAI_API_KEY && (message || action)) {
    try {
      const userMessage = message ?? `Give me ${action} advice for my career.`;
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
            { role: "user", content: userMessage },
          ],
          max_tokens: 512,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({
          message: data.choices?.[0]?.message?.content ?? "No response.",
        });
      }
    } catch {
      // Fall through to static responses
    }
  }

  // Try forwarding to backend
  const token = request.headers.get("Authorization");
  if (token) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/ai/coach`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(body),
      });
      if (res.ok) return NextResponse.json(await res.json());
    } catch {
      // Fall through
    }
  }

  // Intelligent static responses
  const staticResponses: Record<string, string> = {
    briefing:
      "Interview briefing: Research the company's mission and recent news. Prepare STAR-format answers for behavioral questions. Match your experience to every requirement in the job description. Bring questions that show strategic thinking.",
    recommendations:
      "Top recommendations: (1) Quantify your achievements — 'increased revenue by 25%' beats 'improved sales'. (2) Tailor your resume for each application. (3) Grow your network — most roles are filled through referrals. (4) Upskill in tools relevant to your target role.",
    resume:
      "Resume tips: Use strong action verbs, quantify impact, keep it to 1-2 pages, tailor for each job, and add keywords from the job posting to pass ATS screening.",
    interview:
      "Interview advice: Use the STAR method for behavioral questions. Always prepare 2-3 insightful questions for the interviewer. Practice out loud, not just in your head.",
  };

  const key =
    action ??
    (message?.toLowerCase().includes("resume")
      ? "resume"
      : message?.toLowerCase().includes("interview")
      ? "interview"
      : "recommendations");

  return NextResponse.json({
    message:
      staticResponses[key] ??
      "Focus on showcasing measurable achievements and aligning your experience with the role's core requirements.",
  });
}

