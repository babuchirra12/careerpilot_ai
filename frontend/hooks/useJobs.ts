"use client";

import { useCallback, useEffect, useState } from "react";
import type { Job } from "../types/job";
import { getJobs } from "../services/job.service";

export function useJobs(search?: string) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getJobs(search);

      setJobs(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load jobs.");
      }
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    loading,
    error,
    refresh: fetchJobs,
  };
}