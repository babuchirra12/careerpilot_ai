import { getToken } from "../lib/auth";

function authHeader(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function sendAIMessage(message: string): Promise<string> {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error("AI service unavailable");
  const data = await res.json();
  return data.message ?? "No response from AI coach.";
}

export async function getCoachAction(action: "briefing" | "recommendations" | "resume" | "interview"): Promise<string> {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ action }),
  });
  if (!res.ok) throw new Error("AI service unavailable");
  const data = await res.json();
  return data.message ?? "No response from AI coach.";
}
