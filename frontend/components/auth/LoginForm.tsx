"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setToken } from "../../lib/auth";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [message, setMessage] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      setMessage("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        setMessage("Login successful! Redirecting...");
        const redirect = searchParams.get("redirect") ?? "/dashboard";
        router.push(redirect);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Invalid email or password.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-white/8 bg-slate-900/70 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl ring-1 ring-white/5">

      {/* Header */}
      <div className="mb-8 space-y-1">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-300">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          Sign in
        </div>
        <h2 className="text-2xl font-bold text-white">Welcome back</h2>
        <p className="text-sm leading-6 text-slate-400">
          Continue your career journey with CareerPilot AI.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Work email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="alex.morgan@example.com"
            className="w-full rounded-2xl border border-slate-700/60 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-slate-600 focus:border-sky-500 focus:bg-slate-950 focus:ring-1 focus:ring-sky-500/30"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
            <a href="#" className="text-xs font-medium text-sky-400 transition hover:text-sky-300">Forgot password?</a>
          </div>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full rounded-2xl border border-slate-700/60 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-slate-600 focus:border-sky-500 focus:bg-slate-950 focus:ring-1 focus:ring-sky-500/30"
          />
        </div>

        {/* Remember me */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="rememberMe"
            checked={form.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-600 bg-slate-900 accent-sky-500"
          />
          <span className="text-sm text-slate-400">Remember me for 30 days</span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-full bg-sky-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition duration-200 hover:bg-sky-400 hover:shadow-sky-400/30 active:scale-[0.98]"
        >
          Sign in to CareerPilot →
        </button>
      </form>

      {/* Message */}
      {message && (
        <div className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
          message.toLowerCase().includes("success")
            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
            : "border-red-400/20 bg-red-400/10 text-red-300"
        }`}>
          {message}
        </div>
      )}

      {/* Footer link */}
      <p className="mt-7 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <a href="/register" className="font-semibold text-sky-400 transition hover:text-sky-300">
          Create one free
        </a>
      </p>
    </div>
  );
}
