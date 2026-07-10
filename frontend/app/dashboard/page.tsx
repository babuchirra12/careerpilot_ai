"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
type DashboardData = {
  name: string;
  totalJobs: number;
  recommendedJobs: number;
  applications: number;
  resumeScore: number;
};

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8081/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        console.log("Status:", res.status);

        const text = await res.text();

        console.log("Response:", text);

        if (!res.ok) {
          throw new Error(text);
        }

        return JSON.parse(text);
      })
      .then((data) => {
        setDashboard(data);
      })
      .catch((err) => {
        console.log(err);
        setError("Dashboard loading failed");
      });
  }, []);

  if (error) {
    return <div className="text-red-400 p-10">Error: {error}</div>;
  }

  if (!dashboard) {
    return <div className="text-white p-10">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-[#050b1d] text-white p-8">
      <div
        className="
        rounded-3xl
        border border-slate-800
        bg-[#0c1429]
        p-10
        shadow-xl
      "
      >
        {/* Header */}

        <div
          className="
          flex 
          justify-between 
          items-center
          mb-10
        "
        >
          <div>
            <span
              className="
              inline-block
              px-4
              py-1
              rounded-full
              text-xs
              tracking-[4px]
              bg-blue-500/20
              text-blue-300
            "
            >
              DASHBOARD
            </span>

            <h1
              className="
              text-5xl
              font-bold
              mt-5
            "
            >
              Welcome back, {dashboard.name}.
            </h1>

            <p
              className="
              text-slate-400
              text-lg
              mt-3
            "
            >
              Your personalized career workspace is ready. Review recommended
              jobs, update your profile, and improve your career journey with
              AI.
            </p>
          </div>

          <div className="flex gap-5">
           <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/85 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:border-sky-400 hover:bg-slate-900"
              >
                View profile
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-sky-400"
              >
                Explore roles
              </Link>
          </div>
        </div>

        {/* Cards */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
        >
          {/* Progress */}

          <div
            className="
            rounded-3xl
            bg-[#050b1d]
            border border-slate-800
            p-8
          "
          >
            <p
              className="
              text-slate-400
              tracking-[4px]
              text-sm
            "
            >
              PROGRESS
            </p>

            <h2
              className="
              text-5xl
              font-bold
              mt-5
            "
            >
              {dashboard.resumeScore}%
            </h2>

            <div
              className="
              mt-8
              h-3
              bg-slate-800
              rounded-full
            "
            >
              <div
                className="
                h-3
                rounded-full
                bg-gradient-to-r
                from-cyan-400
                to-purple-500
                "
                style={{
                  width: `${dashboard.resumeScore}%`,
                }}
              />
            </div>

            <p
              className="
              text-slate-400
              mt-8
            "
            >
              Resume strength, interview preparation, and role matching are
              moving forward.
            </p>
          </div>

          {/* Next Step */}

          <div
            className="
            rounded-3xl
            bg-[#050b1d]
            border border-slate-800
            p-8
          "
          >
            <div className="flex justify-between">
              <p
                className="
                text-slate-400
                tracking-[4px]
                text-sm
              "
              >
                NEXT STEP
              </p>

              <span
                className="
                bg-purple-500/20
                px-4
                py-2
                rounded-full
                text-purple-300
                text-sm
              "
              >
                AI Tip
              </span>
            </div>

            <h2
              className="
              text-4xl
              font-bold
              mt-8
            "
            >
              Prepare your pitch
            </h2>

            <p
              className="
              text-slate-400
              mt-6
              text-lg
            "
            >
              Use AI role summary tools to align your experience with employer
              skills.
            </p>
          </div>

          {/* Alerts */}

          <div
            className="
            rounded-3xl
            bg-[#050b1d]
            border border-slate-800
            p-8
          "
          >
            <p
              className="
              text-slate-400
              tracking-[4px]
              text-sm
            "
            >
              UPCOMING
            </p>

            <h2
              className="
              text-4xl
              font-bold
              mt-5
            "
            >
              3 alerts
            </h2>

            <div
              className="
              mt-8
              space-y-4
            "
            >
              <div
                className="
                bg-[#111b34]
                rounded-2xl
                p-5
              "
              >
                <h3 className="font-semibold">Review suggested roles</h3>

                <p
                  className="
                  text-slate-400
                  mt-2
                "
                >
                  See new matches based on your profile.
                </p>
              </div>

              <div
                className="
                bg-[#111b34]
                rounded-2xl
                p-5
              "
              >
                <h3 className="font-semibold">Complete your skills quiz</h3>

                <p
                  className="
                  text-slate-400
                  mt-2
                "
                >
                  Unlock stronger recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}

        <div
          className="
          grid
          grid-cols-3
          gap-6
          mt-8
        "
        >
          <StatCard title="Total Jobs" value={dashboard.totalJobs} />

          <StatCard
            title="Recommended Jobs"
            value={dashboard.recommendedJobs}
          />

          <StatCard title="Applications" value={dashboard.applications} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div
      className="
rounded-3xl
bg-[#0c1429]
border border-slate-800
p-8
"
    >
      <p
        className="
text-slate-400
"
      >
        {title}
      </p>

      <h2
        className="
text-4xl
font-bold
mt-4
"
      >
        {value}
      </h2>
    </div>
  );
}
