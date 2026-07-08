"use client";

import { useEffect, useState } from "react";
import type { Resume } from "../types/resume";
import { getResumes, deleteResume } from "../services/resume.service";

export function useResume() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResumes = () => {
    setLoading(true);
    getResumes()
      .then((data) => {
        setResumes(data);
        setError(null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const removeResume = async (id: number) => {
    await deleteResume(id);
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

  return { resumes, loading, error, refetch: fetchResumes, removeResume };
}
