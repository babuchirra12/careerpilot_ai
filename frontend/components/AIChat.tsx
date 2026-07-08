"use client";

import { useEffect, useRef, useState } from "react";
import { sendAIMessage } from "../services/ai.service";

export default function AIChat() {
  const [messages, setMessages] = useState<Array<{ role: string; text: string }>>([
    { role: "assistant", text: "Ask me anything about your resume, interview prep, or career strategy." },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim() || sending) return;
    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setSending(true);
    try {
      const reply = await sendAIMessage(userText);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Sorry, I'm temporarily unavailable. Please try again." },
      ]);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-slate-950/90 p-4 sm:p-5 text-white shadow-lg">
      <div className="mb-4 text-sm uppercase tracking-[0.24em] text-slate-400">AI Chat</div>
      <div ref={containerRef} className="space-y-3 rounded-3xl border border-white/10 bg-slate-900/80 p-3 sm:p-4 max-h-[42vh] sm:max-h-72 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`rounded-2xl p-3 ${message.role === "assistant" ? "bg-slate-800" : "bg-slate-950 text-slate-100"} max-w-full sm:max-w-[90%] ${message.role === "assistant" ? "ml-0" : "ml-auto"}`}
            role="article"
            aria-label={`${message.role} message`}
          >
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{message.role}</p>
            <p className="mt-1 text-sm text-slate-100">{message.text}</p>
          </div>
        ))}
        {sending && (
          <div className="rounded-2xl bg-slate-800 p-3 ml-0 max-w-[60%]">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">assistant</p>
            <p className="mt-1 text-sm text-slate-400 animate-pulse">Thinking…</p>
          </div>
        )}
      </div>
      <div className="mt-3 flex flex-col sm:flex-row gap-3">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={sending}
          className="flex-1 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-white outline-none disabled:opacity-50"
          placeholder="Type your question"
          aria-label="Type your question"
        />
        <button
          onClick={sendMessage}
          disabled={sending || !input.trim()}
          className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400 disabled:opacity-50"
        >
          {sending ? "…" : "Send"}
        </button>
      </div>
    </div>
  );
}


  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-slate-950/90 p-4 sm:p-5 text-white shadow-lg">
      <div className="mb-4 text-sm uppercase tracking-[0.24em] text-slate-400">AI Chat</div>
      <div ref={containerRef} className="space-y-3 rounded-3xl border border-white/10 bg-slate-900/80 p-3 sm:p-4 max-h-[42vh] sm:max-h-72 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`rounded-2xl p-3 ${message.role === "assistant" ? "bg-slate-800" : "bg-slate-950 text-slate-100"} max-w-full sm:max-w-[90%] ${message.role === "assistant" ? "ml-0" : "ml-auto"}`}
            role="article"
            aria-label={`${message.role} message`}
          >
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{message.role}</p>
            <p className="mt-1 text-sm text-slate-100">{message.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-col sm:flex-row gap-3">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-white outline-none"
          placeholder="Type your question"
        aria-label="Type your question"
        />
        <button
          onClick={sendMessage}
          className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400"
        >
          Send
        </button>
      </div>
    </div>
  );
}
