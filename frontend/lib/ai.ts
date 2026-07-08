export async function getAiResponse(input: string): Promise<{ message: string }> {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input }),
  });
  if (!res.ok) return { message: "AI service temporarily unavailable." };
  return res.json();
}
