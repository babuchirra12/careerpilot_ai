import AIChat from "../../../components/AIChat";

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_40px_80px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Chat</h1>
              <p className="mt-1 text-sm text-slate-400">Ask the AI Career Coach for help.</p>
            </div>
          </div>

          <div className="mt-6">
            <AIChat />
          </div>
        </div>
      </div>
    </main>
  );
}
