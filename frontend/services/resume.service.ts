import type { Resume } from "../types/resume";
import { getToken } from "../lib/auth";

function authHeader(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getResumes(): Promise<Resume[]> {
  const res = await fetch("/api/resume", { headers: authHeader() });
  if (!res.ok) throw new Error("Failed to fetch resumes");
  const data = await res.json();
  return data.data ?? [];
}

export async function getResumeById(id: number): Promise<Resume> {
  const res = await fetch(`/api/resume/${id}`, { headers: authHeader() });
  if (!res.ok) throw new Error("Resume not found");
  const data = await res.json();
  return data.data;
}

export async function createResume(
  resume: Pick<Resume, "title"> & { contentJson?: string; status?: string }
): Promise<Resume> {
  const res = await fetch("/api/resume", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(resume),
  });
  if (!res.ok) throw new Error("Failed to create resume");
  const data = await res.json();
  return data.data;
}

export async function updateResume(
  id: number,
  resume: Partial<Pick<Resume, "title" | "status"> & { contentJson?: string }>
): Promise<Resume> {
  const res = await fetch(`/api/resume/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(resume),
  });
  if (!res.ok) throw new Error("Failed to update resume");
  const data = await res.json();
  return data.data;
}

export async function deleteResume(id: number): Promise<void> {
  const res = await fetch(`/api/resume/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("Failed to delete resume");
}
