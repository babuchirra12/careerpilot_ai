import type { Job } from "../types/job";
import { getToken } from "../lib/auth";

function authHeader(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getJobs(search?: string): Promise<Job[]> {
  const url = search ? `/api/jobs?search=${encodeURIComponent(search)}` : "/api/jobs";
  const res = await fetch(url, { headers: authHeader() });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  const data = await res.json();
  return data.data ?? [];
}

export async function getJobById(id: number): Promise<Job> {
  const res = await fetch(`/api/jobs/${id}`, { headers: authHeader() });
  if (!res.ok) throw new Error("Job not found");
  const data = await res.json();
  return data.data;
}

export async function createJob(job: Omit<Job, "id" | "createdAt">): Promise<Job> {
  const res = await fetch("/api/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(job),
  });
  if (!res.ok) throw new Error("Failed to create job");
  const data = await res.json();
  return data.data;
}
