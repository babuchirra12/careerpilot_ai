"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "../../lib/auth";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Job seeker",
    location: "",
    agreeToTerms: false,
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const target = event.target as HTMLInputElement;
      setForm((prev) => ({ ...prev, [name]: target.checked }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      setMessage("Please fill in all required fields.");
      return;
    }

    if (form.password.length < 8) {
      setMessage("Password should be at least 8 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!form.location.trim()) {
      setMessage("Please enter your location.");
      return;
    }

    if (!form.agreeToTerms) {
      setMessage("Please accept the terms and privacy policy.");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          password: form.password,
          careerStage: form.role,
          location: form.location,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          setToken(data.token);
          setMessage("Registration successful! Redirecting to dashboard...");
          router.push("/dashboard");
        } else {
          setMessage("Registration successful! Redirecting to login...");
          setTimeout(() => router.push("/login"), 1500);
        }
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-white/8 bg-slate-900/70 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl ring-1 ring-white/5">

      {/* Header */}
      <div className="mb-8 space-y-1">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-300">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          Create account
        </div>
        <h2 className="text-2xl font-bold text-white">Build your career with confidence</h2>
        <p className="text-sm leading-6 text-slate-400">
          Upload resumes, discover curated roles, and get AI coaching tailored to your goals.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Full name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Alex Morgan"
              className="w-full rounded-2xl border border-slate-700/60 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-slate-600 focus:border-sky-500 focus:bg-slate-950 focus:ring-1 focus:ring-sky-500/30"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Work email</label>
              <span className="group relative inline-flex cursor-pointer items-center rounded-full bg-slate-800 px-2 py-0.5 text-[10px] tracking-widest text-sky-400 ring-1 ring-slate-700 transition hover:bg-slate-700">
                info
                <span className="pointer-events-none absolute left-1/2 top-full z-10 -translate-x-1/2 mt-2 hidden w-60 rounded-2xl border border-slate-700/90 bg-slate-950 px-3 py-2 text-xs text-slate-300 shadow-xl ring-1 ring-white/10 group-hover:block">
                  Used for login, account updates, and password resets.
                </span>
              </span>
            </div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="alex.morgan@example.com"
              className="w-full rounded-2xl border border-slate-700/60 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-slate-600 focus:border-sky-500 focus:bg-slate-950 focus:ring-1 focus:ring-sky-500/30"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min. 8 characters"
              className="w-full rounded-2xl border border-slate-700/60 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-slate-600 focus:border-sky-500 focus:bg-slate-950 focus:ring-1 focus:ring-sky-500/30"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat password"
              className="w-full rounded-2xl border border-slate-700/60 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-slate-600 focus:border-sky-500 focus:bg-slate-950 focus:ring-1 focus:ring-sky-500/30"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Career stage</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-700/60 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition duration-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30"
            >
              <option>Job seeker</option>
              <option>Student</option>
              <option>Career changer</option>
              <option>Experienced professional</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="New York, NY"
              className="w-full rounded-2xl border border-slate-700/60 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-slate-600 focus:border-sky-500 focus:bg-slate-950 focus:ring-1 focus:ring-sky-500/30"
            />
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-700/60 bg-slate-950/40 p-4 text-sm text-slate-300 transition duration-200 hover:border-sky-500/40 hover:bg-slate-950/60">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={form.agreeToTerms}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-900 accent-sky-500"
          />
          <span>
            I agree to the <strong className="text-sky-400">Terms of Service</strong> and <strong className="text-sky-400">Privacy Policy</strong>.
          </span>
        </label>

        <button
          type="submit"
          className="w-full rounded-full bg-sky-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition duration-200 hover:bg-sky-400 hover:shadow-sky-400/30 active:scale-[0.98]"
        >
          Create my account →
        </button>
      </form>

      {message && (
        <div className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
          message.toLowerCase().includes("success")
            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
            : "border-red-400/20 bg-red-400/10 text-red-300"
        }`}>
          {message}
        </div>
      )}

      <p className="mt-7 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <a href="/login" className="font-semibold text-sky-400 transition hover:text-sky-300">
          Sign in
        </a>
      </p>
    </div>
  );
}
