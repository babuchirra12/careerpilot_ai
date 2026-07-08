"use client";

import { useEffect, useState } from "react";
import ProfileSummary from "../../../components/dashboard/ProfileSummary";
import { getToken } from "../../../lib/auth";
import type { User } from "../../../types/user";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) { setLoading(false); return; }
    fetch("/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.data) setUser(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_40px_80px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:p-8">
          <div className="space-y-4">
            {loading ? (
              <div className="h-40 animate-pulse rounded-[28px] bg-slate-900/60" />
            ) : (
              <ProfileSummary profile={user} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

