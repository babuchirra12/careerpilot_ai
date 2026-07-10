import type { Job } from "../types/job";
import { getToken } from "../lib/auth";

function authHeader(): Record<string, string> {
  const token = getToken();

  return token
    ? {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      }
    : {
        Accept: "application/json",
      };
}

async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, {
    cache: "no-store",
    ...options,
    headers: {
      ...authHeader(),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }

  const data = await res.json();

  return data.data;
}

// ===============================
// Get All Jobs / Search Jobs
// ===============================
export async function getJobs(search?: string): Promise<Job[]> {
  const url =
    search && search.trim().length > 0
      ? `/api/jobs?search=${encodeURIComponent(search.trim())}`
      : "/api/jobs";

  return request<Job[]>(url);
}

// ===============================
// Get Job By ID
// ===============================
export async function getJobById(id: number): Promise<Job> {
  return request<Job>(`/api/jobs/${id}`);
}

// ===============================
// Create Job
// ===============================
export async function createJob(
  job: Omit<Job, "id" | "createdAt">
): Promise<Job> {
  return request<Job>("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });
}

// ===============================
// Update Job
// ===============================
export async function updateJob(
  id: number,
  job: Partial<Job>
): Promise<Job> {
  return request<Job>(`/api/jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });
}

// ===============================
// Delete Job
// ===============================
export async function deleteJob(id: number): Promise<void> {
  await request<void>(`/api/jobs/${id}`, {
    method: "DELETE",
  });
}

// ===============================
// Active Jobs
// ===============================
export async function getActiveJobs(): Promise<Job[]> {
  return request<Job[]>("/api/jobs/active");
}

// ===============================
// Company Jobs
// ===============================
export async function getJobsByCompany(
  company: string
): Promise<Job[]> {
  return request<Job[]>(
    `/api/jobs/company/${encodeURIComponent(company)}`
  );
}

// ===============================
// Location Jobs
// ===============================
export async function getJobsByLocation(
  location: string
): Promise<Job[]> {
  return request<Job[]>(
    `/api/jobs/location/${encodeURIComponent(location)}`
  );
}

// ===============================
// Job Type Jobs
// ===============================
export async function getJobsByJobType(
  jobType: string
): Promise<Job[]> {
  return request<Job[]>(
    `/api/jobs/type/${encodeURIComponent(jobType)}`
  );
}