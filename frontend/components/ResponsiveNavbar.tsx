"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { removeToken } from "../lib/auth";
import Image from "next/image";
const navLinks = [
  { href: "/dashboard", label: "Overview", icon: "▦" },
  { href: "/resume", label: "Resume", icon: "📄" },
  { href: "/jobs", label: "Jobs", icon: "🎯" },
  { href: "/analytics", label: "Analytics", icon: "📊" },
  { href: "/ai-coach", label: "AI Coach", icon: "🤖" },
  { href: "/profile", label: "Profile", icon: "👤" },
];

export default function ResponsiveNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <nav className="w-full">
      <div className="flex items-center justify-between">

        {/* Logo — links back to landing */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.png"
            alt="CareerPilot AI"
            width={50}
            height={50}
            priority
            className="h-12 w-12 object-contain"
          />

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-xl font-extrabold tracking-tight text-white">
              Career<span className="text-sky-400">Pilot</span>
            </span>
            <span className="text-xs text-slate-400">
              AI
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 sm:flex">
          {/* Home link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-slate-400 transition duration-150 hover:bg-white/5 hover:text-white"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Home
          </Link>
          <span className="mx-1 h-4 w-px bg-white/10" />
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition duration-150 ${active
                    ? "bg-sky-500/15 text-sky-400"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <span className="text-xs">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: user avatar */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setUserMenuOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-violet-500 text-xs font-bold text-white shadow shadow-sky-500/20 transition hover:opacity-90"
            aria-label="User menu"
          >
            U
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 top-10 z-50 w-48 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl">
              <Link href="/profile" onClick={() => setUserMenuOpen(false)}
                className="block px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white">
                My Profile
              </Link>
              <Link href="/" onClick={() => setUserMenuOpen(false)}
                className="block px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">
                ← Back to site
              </Link>
              <hr className="border-white/5" />
              <button onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-sm text-red-400 transition hover:bg-white/5">
                Log out
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-800/60 text-slate-300 transition hover:bg-slate-700 sm:hidden"
        >
          {menuOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mt-3 space-y-1 rounded-2xl border border-white/8 bg-slate-900/95 p-3 sm:hidden">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Home
          </Link>
          <hr className="border-white/5 my-1" />
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${active
                    ? "bg-sky-500/15 text-sky-400"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
          <hr className="border-white/5 my-1" />
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-white/5"
          >
            <span>↩</span> Log out
          </button>
        </div>
      )}
    </nav>
  );
}
