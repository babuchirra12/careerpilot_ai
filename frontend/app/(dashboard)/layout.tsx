import type { ReactNode } from "react";
import ResponsiveNavbar from "../../components/ResponsiveNavbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Main navbar */}
      <header className="border-b border-white/8 bg-slate-900/80 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl">
          <ResponsiveNavbar />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
